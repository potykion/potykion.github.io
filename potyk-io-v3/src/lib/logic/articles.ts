export interface Article {
  title: string;
  desc?: string;
  draft?: boolean;
}

interface Articles {
  [route: string]: Article;
}

export const articles: Articles = {
  ["travel/ekat"]: { title: 'Екат', desc: 'Что смотреть, где есть и пить в Екб' },
  tools: { title: "Инструментарий 🔨🪚🪓🔧🪛⛏️", desc: "Тулзы для дизайна, разработки и прочего креатива" },
  regex: { title: "Регулярки", desc: "Особо не нужны" },
  ["travel/nizhny"]: { title: "Нижний", desc: "Мини-фото-отчет" },

  beer: { title: "Пиво", draft: true },
  ["goty/2023"]: { title: "Итоги 2023", desc: "🍺👨‍💻🍟", draft: true },
  wishlist: { title: "Вишлист", draft: true },
  fun: { title: "Отдых и развлечения", desc: "Чем заниматься кроме работы", draft: true },

  ["n/cv"]: { title: "Резюме", desc: "Меня можно нанять", draft: true },
};