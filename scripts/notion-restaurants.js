import {Client} from "@notionhq/client";
import fs from "fs";
import path from "path";

const notionRestaurants = new Client({auth: process.env.NOTION_API_KEY});

(async () => {
    const databaseId = process.env.NOTION_DATABASE_ID;
    const response = await notionRestaurants.databases.query({
        database_id: databaseId,
    });

    const restaurants = response.results
        .map(
            page => Object.fromEntries(
                Object.entries(page.properties)
                    .map(([key, val]) => {
                        let parsedVal = val[val.type]

                        switch (key ) {
                            case "Город (не МСК)":
                            case "Цены":
                                parsedVal = parsedVal?.name;
                                break;
                            case "Метро / Доставка":
                            case "Tags":
                                parsedVal = parsedVal.map(tag => tag.name);
                                break;
                            case "Коммент":
                            case "Name":
                                parsedVal = parsedVal.length ? parsedVal[0].plain_text : null
                                break;
                        }

                        return [key, parsedVal];
                    })
            )
        )

    // Output the data to a JSON file
    fs.writeFileSync('restaurants.json', JSON.stringify(restaurants, null, 2));
})();