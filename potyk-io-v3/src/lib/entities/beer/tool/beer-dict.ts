export type Translation = ({ key: string, def: string })[];


export interface Definition {
  def: string;
  synonyms?: string[];
}

export const beerDict = {
  "lager": {
    def: "Светлый пивас",
    synonyms: ["лагер"]
  },
  "pilsner": {
    def: "Светлый пивас с горчинкой",
    synonyms: ["пильзнер", "пилзнер"]
  },
  "stout": {
    def: "Темный пивас на основе жженого солода",
    synonyms: ["стаут"]
  },
  "hazelnut": {
    def: "С запахом/нотками ореха",
    synonyms: ["nut", "nutty", "ореховый"]
  },
  "weisse": {
    def: "Пшеничный пивас"
  },
  "passion fruit": {
    def: "Пиво с маракуей, очевидно кисленькое",
    synonyms: ["маракуйя"]
  },
  "berliner": {
    def: "Кисленькая пшеничка"
  },
  "ipa": {
    def: "Indian Pale Ale - охмеленный эль, обычно горький на вкус и пахнет цитрусовыми",
    synonyms: ["ипа", "ипашка"]
  }
};