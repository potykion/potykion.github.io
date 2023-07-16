export interface Article {
  title: string;
  desc?: string;
  draft?: boolean;
  status?: "new" | "wip";
}

interface Articles {
  [route: string]: Article;
}

export const articles: Articles = {
  ["goty/2023"]: { title: "Итоги 2023", desc: "🍺👨‍💻🍟", draft: true },

  ["a/travel/ekat"]: { title: "Екат", desc: "Что смотреть, где есть и пить в Екб" },

  ["a/travel/nizhny"]: { title: "Нижний", desc: "Мини-фото-отчет" },
  tools: { title: "Инструментарий 🔨🪚🪓🔧🪛⛏️", desc: "Тулзы для дизайна, разработки и прочего" },

  ["tools/beer"]: { title: "Пивной переводчик", desc: "Помогает выбрать пиво", status: "wip" },

  ["a/regex"]: { title: "Регулярки", desc: "Особо не нужны" },
  ["a/mvp"]: { title: "Как делать свои проекты?", desc: "Прототипами", status: "new" },
  ["a/bad-work"]: { title: "Бинго хуевой работы", desc: "Где работать не стоит", status: "new" },
  ["a/how-to-code"]: {
    title: "Как писать код на Python",
    desc: "Структура папочек, код-стайл и как это автоматизировать",
    status: "wip"
  },

  ["a/beer"]: { title: "Пиво", draft: true },
  ["n/wishlist"]: { title: "Вишлист", draft: true },
  ["a/fun"]: { title: "Отдых и развлечения", desc: "Чем заниматься кроме работы", draft: true },

  ["n/cv"]: { title: "Резюме", desc: "Меня можно нанять", draft: true }
};