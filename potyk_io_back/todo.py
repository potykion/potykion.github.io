from pydantic import BaseModel, ConfigDict
from tinydb import TinyDB, Query


class Task(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    category: str = ""
    done: bool = False


class TodoRepo:
    def __init__(self, db: TinyDB):
        self.db = db
        self.table = db.table("todos")

    def list_all(self) -> list[Task]:
        raw_tasks = self.table.all()
        return [Task.model_validate(task) for task in raw_tasks]

    def create(self, title, category):
        try:
            last_id = self.table.all()[-1]["id"]
        except IndexError:
            last_id = 0
        task = Task(id=last_id + 1, title=title, category=category)
        self.table.insert(task.model_dump())
        return task

    def get_by_id(self, task_id):
        q = Query()
        return Task.model_validate(self.table.get(q.id == task_id))

    def update(self, task):
        q = Query()
        self.table.update(task.model_dump(), q.id == task.id)

    def delete(self, task):
        q = Query()
        self.table.remove(q.id == task.id)
