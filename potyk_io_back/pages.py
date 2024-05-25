import enum
from enum import auto

from pydantic import BaseModel, Field

from potyk_io_back.lazy import SimpleStorage
from potyk_io_back.q import Q


class BlogPageSection(enum.StrEnum):
    fun = auto()
    work = auto()
    food = auto()

    recipes_sweet = auto()
    recipes_asian = auto()
    recipes_main = auto()
    recipes_breakfast = auto()
    recipes_pasta = auto()
    recipes_soup = auto()
    recipes_salad = auto()

    def to_str(self):
        match self:
            case BlogPageSection.fun:
                return "Развлекуха"
            case BlogPageSection.work:
                return "Работка"
            case BlogPageSection.food:
                return "Еда"

            case BlogPageSection.recipes_sweet:
                return 'Сладости'
            case BlogPageSection.recipes_asian:
                return 'Азиатка'
            case BlogPageSection.recipes_main:
                return 'Основное'
            case BlogPageSection.recipes_breakfast:
                return 'Завтрак'
            case BlogPageSection.recipes_pasta:
                return 'Паста'
            case BlogPageSection.recipes_soup:
                return 'Суп'
            case BlogPageSection.recipes_salad:
                return 'Салат'



class BlogPage(BaseModel):
    url: str
    html_path: str
    title: str
    desc: str | None = ""
    section: BlogPageSection | None = None

    breadcrumbs: list["BlogPage"] = Field(default_factory=list)
    breadcrumbs_title: str | None = ""


def generate_breadcrumbs(path):
    """
    >>> generate_breadcrumbs('/recipes/banh-mi')
    ['/', '/recipes', '/recipes/banh-mi']
    """
    subpaths = ["/"]
    current_path = ""
    for segment in path.split("/"):
        if segment:  # Ignore empty segments
            current_path += "/" + segment
            subpaths.append(current_path)
    return subpaths


class BlogPageStore:
    def __init__(self, sqlite_cursor):
        self.sqlite_cursor = sqlite_cursor
        self.store = SimpleStorage(self.sqlite_cursor, "blog_pages", BlogPage)
        self.q = Q(self.sqlite_cursor, select_all_as=BlogPage)

    def list_index(self):
        return self.q.select_all("select * from blog_pages where include_in_index = 1 order by section")

    def list_recipe_pages(self) -> list[BlogPage]:
        return self.q.select_all("select * from blog_pages where url like '/recipes/%' order by section")

    def list_all(self, breadcrumbs=False, **kwargs):
        pages = self.store.list_all(**kwargs)
        return [self._row_to_page(page, breadcrumbs=breadcrumbs) for page in pages]

    def list_where_url_in(self, urls, breadcrumbs=False):
        placeholders = ", ".join("?" for _ in urls)
        where = f"url in ({placeholders})"
        pages = self.list_all(where=where, where_params=urls, order_by="url", breadcrumbs=breadcrumbs)
        return pages

    def get_by_url(self, url) -> BlogPage:
        page: BlogPage = self.list_where_url_in([url], breadcrumbs=True)[0]
        return page

    def _row_to_page(self, row_or_page, *, breadcrumbs=False):
        page = row_or_page

        if breadcrumbs:
            subpaths = generate_breadcrumbs(page.url)
            page.breadcrumbs = self.list_where_url_in(urls=subpaths)

        page.breadcrumbs_title = page.breadcrumbs_title or page.title

        return page
