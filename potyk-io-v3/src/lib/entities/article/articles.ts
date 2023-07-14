export interface Article {
  title: string;
  desc?: string;
  draft?: boolean;
  status?: 'new' | 'wip';
}

interface Articles {
  [route: string]: Article;
}

export const articles: Articles = {
  ["a/travel/ekat"]: { title: "Екат", desc: "Что смотреть, где есть и пить в Екб" },
  tools: { title: "Инструментарий 🔨🪚🪓🔧🪛⛏️", desc: "Тулзы для дизайна, разработки и прочего" },
  ["tools/beer"]: { title: "Пивной переводчик", desc: "Помогает выбрать пиво", status: "wip" },
  ["a/regex"]: { title: "Регулярки", desc: "Особо не нужны" },
  ["a/travel/nizhny"]: { title: "Нижний", desc: "Мини-фото-отчет" },

  ["a/beer"]: { title: "Пиво", draft: true },
  ["goty/2023"]: { title: "Итоги 2023", desc: "🍺👨‍💻🍟", draft: true },
  ["n/wishlist"]: { title: "Вишлист", draft: true },
  ["a/fun"]: { title: "Отдых и развлечения", desc: "Чем заниматься кроме работы", draft: true },
  ["a/mvp"]: { title: "Как делать свои проекты?", desc: "Прототипами", status: 'new' },
  ["a/bad-work"]: { title: "Бинго хуевой работы", desc: "Где работать не стоит", status: 'new' },

  ["n/cv"]: { title: "Резюме", desc: "Меня можно нанять", draft: true }
};