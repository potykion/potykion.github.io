

export interface GotyCardData {
  extraClass?: string;
  extraStyle?: string;
  icon?: string;
  faIcon?: "twitter" | "windows" | "github" | "chrome";
  imgIcon?: string;
  img?: string;
  title: string;
  subtitle?: string;
  music?: "tsygun" | "garden";
  bg?: string;
  to?: string;
  rows?: number;
  cols?: number;
  tags?: Tag[];
}


export const tags = {
  image: "Картинки",
  multi: "Мультитул",
  win: "Винда",
  design: "Деcигн",
  vpn: "VPN",
  mock: "Заглушки",
  ai: "AI",
  dev: "Разработка",
  text: "Текст",
  diagrams: "Диаграммы",
  editor: "Редакторы",
  ext: "Расширения",
  cli: "CLI",
  yt: "YouTube"
};

export type Tag = keyof typeof tags;
