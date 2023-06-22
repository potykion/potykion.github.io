export interface Article {
  title: string;
  desc?: string;
}

interface Articles {
  [route: string]: Article;
}

export const articles: Articles = {
  beer: { title: "Пиво" },
  ["goty/2023"]: { title: "Итоги 2023", desc: "🍺👨‍💻🍟" },
  wishlist: { title: "Вишлист" },
  ["travel/nizhny"]: { title: "Нижний", desc: "Мини-фото-отчет" },
  tools: { title: "Инструментарий 🔨🪚🪓🔧🪛⛏️", desc: "Тулзы для дизайна, разработки и прочего креатива" },
  cv: { title: "Резюме", desc: "Пацан-фулстак" },
  regex: { title: "Регулярки", desc: "Особо не нужны" },
  fun: { title: "Отдых и развлечения", desc: "Чем заниматься кроме работы" },
  ["travel/ekat"]: { title: 'Екат', desc: 'Что смотреть, где есть и пить в Екб' }
};