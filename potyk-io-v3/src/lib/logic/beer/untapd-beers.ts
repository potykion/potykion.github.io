// Click on Show More
// document.querySelector("#slide > div > div > div.box.beer-list.distinct-list.filterable-page > div > a").click()

import { cutBeerTitle, type Beer } from "./beer"




function parseUntappdBeers(doc: Document) {
    return [...doc.querySelectorAll('.beer-item')]
        .map(
            el => {
                const title = el.querySelector('.name').innerText
                const url = el.querySelector('.name a').href
                const rating = parseFloat(el.querySelector('span.num').innerText.slice(1, -1))
                const type = el.querySelector('.style').innerText
                return { title, type, rating, url }

            }
        )

}

interface UntappdBeer {
    title: string;
    type: string;
    rating: number | null;
    url: string;
}

interface BeerDict {
    [key: string]: UntappdBeer[]
}


export const untapdBeers: BeerDict  = {
    "Stamm Brewing": [
        {
            "title": "Nevermont Magic Dust",
            "type": "IPA - New England / Hazy",
            "rating": 4.07,
            "url": "https://untappd.com/b/stamm-brewing-nevermont-magic-dust/2345721"
        },
        {
            "title": "Blowing Up: Pineapple & Mango",
            "type": "Sour - Fruited",
            "rating": 4.06,
            "url": "https://untappd.com/b/stamm-brewing-blowing-up-pineapple-and-mango/3397051"
        },
        {
            "title": "Sour Passion Party",
            "type": "Sour - Fruited",
            "rating": 4.13,
            "url": "https://untappd.com/b/stamm-brewing-sour-passion-party/1432017"
        },
        {
            "title": "Daenerys",
            "type": "Sour - Fruited",
            "rating": 4.24,
            "url": "https://untappd.com/b/stamm-brewing-daenerys/3169381"
        },
        {
            "title": "3 in 1 Super Sour",
            "type": "Sour - Fruited",
            "rating": 4.18,
            "url": "https://untappd.com/b/stamm-brewing-3-in-1-super-sour/3582917"
        },
        {
            "title": "American Pale Ale",
            "type": "Pale Ale - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/stamm-brewing-american-pale-ale/427778"
        },
        {
            "title": "Hoppy Milk",
            "type": "Pale Ale - Milkshake",
            "rating": 3.86,
            "url": "https://untappd.com/b/stamm-beer-hoppy-milk/2231677"
        },
        {
            "title": "My Three Hops",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.13,
            "url": "https://untappd.com/b/stamm-brewing-my-three-hops/3373783"
        },
        {
            "title": "4 In 1 Super Sour",
            "type": "Sour - Fruited",
            "rating": 4.22,
            "url": "https://untappd.com/b/stamm-brewing-4-in-1-super-sour/3640169"
        },
        {
            "title": "Limit Break",
            "type": "IPA - Triple New England / Hazy",
            "rating": 4.24,
            "url": "https://untappd.com/b/stamm-brewing-limit-break/3425915"
        },
        {
            "title": "Monoplay Sabro",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.11,
            "url": "https://untappd.com/b/stamm-brewing-monoplay-sabro/3752025"
        },
        {
            "title": "Forbidden Union",
            "type": "Sour - Fruited",
            "rating": 4.1,
            "url": "https://untappd.com/b/stamm-brewing-forbidden-union/3732015"
        },
        {
            "title": "Hop Gun Multiplayer",
            "type": "IPA - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/stamm-brewing-hop-gun-multiplayer/3766932"
        },
        {
            "title": "Monoplay Mosaic",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.09,
            "url": "https://untappd.com/b/stamm-brewing-monoplay-mosaic/3548549"
        },
        {
            "title": "Juice & Juice Blood Orange",
            "type": "IPA - Milkshake",
            "rating": 4.03,
            "url": "https://untappd.com/b/stamm-brewing-juice-and-juice-blood-orange/2550794"
        },
        {
            "title": "Hop Gun Citra & Mosaic",
            "type": "IPA - American",
            "rating": 3.98,
            "url": "https://untappd.com/b/stamm-beer-hop-gun-citra-mosaic/1048765"
        },
        {
            "title": "Hoppymilk Milkshake Mango",
            "type": "Pale Ale - Milkshake",
            "rating": 3.97,
            "url": "https://untappd.com/b/stamm-beer-hoppymilk-milkshake-mango/2248649"
        },
        {
            "title": "Monoplay Simcoe",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.06,
            "url": "https://untappd.com/b/stamm-brewing-monoplay-simcoe/3452383"
        },
        {
            "title": "Videoclub",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.98,
            "url": "https://untappd.com/b/stamm-brewing-videoclub/3828618"
        },
        {
            "title": "Monoplay Citra",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.04,
            "url": "https://untappd.com/b/stamm-brewing-monoplay-citra/3449503"
        },
        {
            "title": "Blowing Up: Strawberry Chokeberry",
            "type": "Sour - Fruited",
            "rating": 4.01,
            "url": "https://untappd.com/b/stamm-brewing-blowing-up-strawberry-chokeberry/3916340"
        },
        {
            "title": "The Vibes",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.91,
            "url": "https://untappd.com/b/stamm-brewing-the-vibes/4400184"
        },
        {
            "title": "Story Mode",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.06,
            "url": "https://untappd.com/b/stamm-brewing-story-mode/3849684"
        },
        {
            "title": "Juice & Juice Mandarina Jugosa",
            "type": "IPA - Milkshake",
            "rating": 4.01,
            "url": "https://untappd.com/b/stamm-beer-juice-and-juice-mandarina-jugosa/2617735"
        },
        {
            "title": "Hoppymilk Milkshake Guava",
            "type": "Pale Ale - Milkshake",
            "rating": 4,
            "url": "https://untappd.com/b/stamm-brewing-hoppymilk-milkshake-guava/2401357"
        },
        {
            "title": "Botanical Definition of Berry",
            "type": "Sour - Fruited",
            "rating": 4.17,
            "url": "https://untappd.com/b/stamm-brewing-botanical-definition-of-berry/4174757"
        },
        {
            "title": "Drop by Drop",
            "type": "IPA - New England / Hazy",
            "rating": 3.94,
            "url": "https://untappd.com/b/stamm-brewing-drop-by-drop/3955859"
        },
        {
            "title": "Beyond the Pale",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.88,
            "url": "https://untappd.com/b/stamm-brewing-beyond-the-pale/3640183"
        },
        {
            "title": "Double Hoppy Milk Mango",
            "type": "IPA - Milkshake",
            "rating": 3.95,
            "url": "https://untappd.com/b/stamm-brewing-double-hoppy-milk-mango/3262703"
        },
        {
            "title": "Party Maker",
            "type": "Sour - Fruited",
            "rating": 4.09,
            "url": "https://untappd.com/b/stamm-brewing-party-maker/4172893"
        },
        {
            "title": "Your Young Lordship",
            "type": "Pilsner - Other",
            "rating": 3.86,
            "url": "https://untappd.com/b/stamm-brewing-your-young-lordship/4174764"
        },
        {
            "title": "Conversation Juice",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.9,
            "url": "https://untappd.com/b/stamm-beer-conversation-juice/3169380"
        },
        {
            "title": "Sour Guava Party",
            "type": "Sour - Fruited",
            "rating": 4.05,
            "url": "https://untappd.com/b/stamm-beer-sour-guava-party/2681122"
        },
        {
            "title": "Nøørden",
            "type": "Belgian Blonde",
            "rating": 3.55,
            "url": "https://untappd.com/b/stamm-beer-noorden/1961401"
        },
        {
            "title": "Refresh IPA Mosaic",
            "type": "IPA - New England / Hazy",
            "rating": 4.05,
            "url": "https://untappd.com/b/stamm-beer-refresh-ipa-mosaic/2732172"
        },
        {
            "title": "Red Pahra Hops",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.01,
            "url": "https://untappd.com/b/stamm-brewing-red-pahra-hops/4376807"
        },
        {
            "title": "Dipapticon",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.13,
            "url": "https://untappd.com/b/stamm-brewing-dipapticon/3628627"
        },
        {
            "title": "Heat Line",
            "type": "Sour - Fruited",
            "rating": 4,
            "url": "https://untappd.com/b/stamm-brewing-heat-line/4473543"
        },
        {
            "title": "Refresh IPA Citra",
            "type": "IPA - New England / Hazy",
            "rating": 3.99,
            "url": "https://untappd.com/b/stamm-beer-refresh-ipa-citra/2705141"
        },
        {
            "title": "Hop Gun Galaxy & Mosaic",
            "type": "IPA - American",
            "rating": 3.96,
            "url": "https://untappd.com/b/stamm-beer-hop-gun-galaxy-mosaic/1293820"
        },
        {
            "title": "Your Dark Lordship",
            "type": "Lager - Dark",
            "rating": 3.67,
            "url": "https://untappd.com/b/stamm-brewing-your-dark-lordship/4069368"
        },
        {
            "title": "Monoplay Talus",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.13,
            "url": "https://untappd.com/b/stamm-brewing-monoplay-talus/3933311"
        },
        {
            "title": "Sour Raspberry Party",
            "type": "Sour - Fruited",
            "rating": 3.95,
            "url": "https://untappd.com/b/stamm-brewing-sour-raspberry-party/1528857"
        },
        {
            "title": "DISTRICT",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.84,
            "url": "https://untappd.com/b/stamm-brewing-district/3238529"
        },
        {
            "title": "Retro Future",
            "type": "IPA - Imperial / Double",
            "rating": 3.9,
            "url": "https://untappd.com/b/stamm-brewing-retro-future/3582911"
        },
        {
            "title": "Your Lordship",
            "type": "Lager - Pale",
            "rating": 3.81,
            "url": "https://untappd.com/b/stamm-brewing-your-lordship/3769383"
        },
        {
            "title": "Wishbringer",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.04,
            "url": "https://untappd.com/b/stamm-brewing-wishbringer/4775189"
        },
        {
            "title": "Arms Race",
            "type": "IPA - Triple New England / Hazy",
            "rating": 3.92,
            "url": "https://untappd.com/b/stamm-brewing-arms-race/4020108"
        },
        {
            "title": "Stylo",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.06,
            "url": "https://untappd.com/b/stamm-brewing-stylo/3550906"
        },
        {
            "title": "Alpaca Juice",
            "type": "Sour - Fruited",
            "rating": 4.18,
            "url": "https://untappd.com/b/stamm-brewing-alpaca-juice/4907196"
        },
        {
            "title": "Foggy Strawberry And Vanilla Milkshake IPA",
            "type": "IPA - Milkshake",
            "rating": 3.98,
            "url": "https://untappd.com/b/stamm-beer-foggy-strawberry-and-vanilla-milkshake-ipa/2541131"
        },
        {
            "title": "Blanche De Marocco",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.75,
            "url": "https://untappd.com/b/stamm-beer-blanche-de-maroc-co/1402605"
        },
        {
            "title": "Five Bucks Shake",
            "type": "IPA - Sour",
            "rating": 4.13,
            "url": "https://untappd.com/b/stamm-brewing-five-bucks-shake/3072018"
        },
        {
            "title": "URALS (B.A. Bourbon Coconut & Vanilla)",
            "type": "Stout - Imperial / Double",
            "rating": 4.3,
            "url": "https://untappd.com/b/stamm-brewing-urals-b-a-bourbon-coconut-and-vanilla/2874229"
        },
        {
            "title": "Blue Collar Workers",
            "type": "Sour - Fruited",
            "rating": 4.29,
            "url": "https://untappd.com/b/stamm-brewing-blue-collar-workers/3523103"
        },
        {
            "title": "Pattern Interrupt",
            "type": "IPA - Farmhouse",
            "rating": 3.8,
            "url": "https://untappd.com/b/stamm-brewing-pattern-interrupt/4109824"
        },
        {
            "title": "Monoplay Amarillo",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.14,
            "url": "https://untappd.com/b/stamm-brewing-monoplay-amarillo/3667167"
        },
        {
            "title": "Magic Drop",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.04,
            "url": "https://untappd.com/b/stamm-beer-magic-drop/2576596"
        },
        {
            "title": "Jungle Look",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.05,
            "url": "https://untappd.com/b/stamm-brewing-jungle-look/3907633"
        },
        {
            "title": "Foggy Vanilla And Coconut Milkshake IPA",
            "type": "IPA - Milkshake",
            "rating": 3.94,
            "url": "https://untappd.com/b/stamm-brewing-foggy-vanilla-and-coconut-milkshake-ipa/2629859"
        },
        {
            "title": "Double Hoppymilk Milkshake Guava",
            "type": "IPA - Milkshake",
            "rating": 3.98,
            "url": "https://untappd.com/b/stamm-brewing-double-hoppymilk-milkshake-guava/3407782"
        },
        {
            "title": "Straßenbahn",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.71,
            "url": "https://untappd.com/b/stamm-brewing-strassenbahn/4597639"
        },
        {
            "title": "Red Pahra Tropics",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.14,
            "url": "https://untappd.com/b/stamm-brewing-red-pahra-tropics/4729477"
        },
        {
            "title": "Winterfell Cherry",
            "type": "Sour - Flanders Red Ale",
            "rating": 4.18,
            "url": "https://untappd.com/b/stamm-brewing-winterfell-cherry/2108401"
        },
        {
            "title": "Proto Skills: Cocoa Empire",
            "type": "Stout - Imperial / Double Milk",
            "rating": 4.11,
            "url": "https://untappd.com/b/stamm-brewing-proto-skills-cocoa-empire/3846462"
        },
        {
            "title": "Go Right",
            "type": "IPA - New England / Hazy",
            "rating": 3.94,
            "url": "https://untappd.com/b/stamm-brewing-go-right/4328463"
        },
        {
            "title": "Magic Dust Boosted",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.08,
            "url": "https://untappd.com/b/stamm-beer-magic-dust-boosted/2652311"
        },
        {
            "title": "Warp Effect",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.02,
            "url": "https://untappd.com/b/stamm-brewing-warp-effect/3695234"
        },
        {
            "title": "Winterfell Extra Blueberry",
            "type": "Wild Ale - Other",
            "rating": 4.31,
            "url": "https://untappd.com/b/stamm-brewing-winterfell-extra-blueberry/3070344"
        },
        {
            "title": "ReFresh Nelson Sauvin & Citra",
            "type": "IPA - New England / Hazy",
            "rating": 3.98,
            "url": "https://untappd.com/b/stamm-beer-refresh-nelson-sauvin-and-citra/3144742"
        },
        {
            "title": "Everyday Adventure",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4,
            "url": "https://untappd.com/b/stamm-brewing-everyday-adventure/4183708"
        },
        {
            "title": "Dark Mentor: Purple Doctrine",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.07,
            "url": "https://untappd.com/b/stamm-brewing-dark-mentor-purple-doctrine/3670595"
        },
        {
            "title": "Monoplay Galaxy",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.89,
            "url": "https://untappd.com/b/stamm-brewing-monoplay-galaxy/4007035"
        },
        {
            "title": "Achievement Mosaic",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.92,
            "url": "https://untappd.com/b/stamm-brewing-achievement-mosaic/4590053"
        },
        {
            "title": "Open World",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.97,
            "url": "https://untappd.com/b/stamm-brewing-open-world/3933314"
        },
        {
            "title": "Seven Shinobi",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.9,
            "url": "https://untappd.com/b/stamm-brewing-seven-shinobi/4046565"
        },
        {
            "title": "Drop the Pressure",
            "type": "Pale Ale - New England / Hazy",
            "rating": 4.05,
            "url": "https://untappd.com/b/stamm-brewing-drop-the-pressure/4808041"
        },
        {
            "title": "Lime On Mars(hmallow)",
            "type": "Sour - Fruited",
            "rating": 3.97,
            "url": "https://untappd.com/b/stamm-brewing-lime-on-mars-hmallow/4100820"
        },
        {
            "title": "Cloudland",
            "type": "IPA - New England / Hazy",
            "rating": 4.05,
            "url": "https://untappd.com/b/stamm-brewing-cloudland/4847846"
        },
        {
            "title": "Ghostly Caravan",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.15,
            "url": "https://untappd.com/b/stamm-brewing-ghostly-caravan/4857981"
        },
        {
            "title": "VAREZHKI",
            "type": "IPA - New England / Hazy",
            "rating": 3.9,
            "url": "https://untappd.com/b/stamm-beer-varezhki/3007296"
        },
        {
            "title": "Solarmatic",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.94,
            "url": "https://untappd.com/b/stamm-brewing-solarmatic/4082721"
        },
        {
            "title": "Refresh IPA Idaho7",
            "type": "IPA - New England / Hazy",
            "rating": 3.94,
            "url": "https://untappd.com/b/stamm-beer-refresh-ipa-idaho7/3126246"
        },
        {
            "title": "Winterfell Extra Blackberry & Chokeberry",
            "type": "Wild Ale - Other",
            "rating": 4.39,
            "url": "https://untappd.com/b/stamm-brewing-winterfell-extra-blackberry-and-chokeberry/4187013"
        },
        {
            "title": "Deuterium",
            "type": "IPA - Triple New England / Hazy",
            "rating": 4.08,
            "url": "https://untappd.com/b/stamm-brewing-deuterium/3713903"
        },
        {
            "title": "Juice & Juice Orange",
            "type": "IPA - Milkshake",
            "rating": 4.02,
            "url": "https://untappd.com/b/stamm-beer-juice-and-juice-orange/2765314"
        },
        {
            "title": "Winterfell Extra Cherry",
            "type": "Sour - Flanders Red Ale",
            "rating": 4.42,
            "url": "https://untappd.com/b/stamm-brewing-winterfell-extra-cherry/4375311"
        },
        {
            "title": "Blowing Up: Peach & Passion Fruit",
            "type": "Sour - Fruited",
            "rating": 4.09,
            "url": "https://untappd.com/b/stamm-brewing-blowing-up-peach-and-passion-fruit/3452371"
        },
        {
            "title": "Groove Collective",
            "type": "IPA - New England / Hazy",
            "rating": 4.07,
            "url": "https://untappd.com/b/stamm-brewing-groove-collective/4756303"
        },
        {
            "title": "Funky Berry Bomb",
            "type": "Wild Ale - Other",
            "rating": 4.2,
            "url": "https://untappd.com/b/stamm-brewing-funky-berry-bomb/3470343"
        },
        {
            "title": "UpBeat",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.88,
            "url": "https://untappd.com/b/stamm-brewing-upbeat/4289875"
        },
        {
            "title": "Journey To Ixtlan",
            "type": "IPA - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/stamm-brewing-journey-to-ixtlan/4847834"
        },
        {
            "title": "Silk Supersonic",
            "type": "Pale Ale - New England / Hazy",
            "rating": 4.13,
            "url": "https://untappd.com/b/stamm-brewing-silk-supersonic/4889265"
        },
        {
            "title": "Next Gen",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.05,
            "url": "https://untappd.com/b/stamm-brewing-next-gen/4557497"
        },
        {
            "title": "Fernweh",
            "type": "Lager - Helles",
            "rating": 3.75,
            "url": "https://untappd.com/b/stamm-brewing-fernweh/4818052"
        },
        {
            "title": "Tsunami",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.16,
            "url": "https://untappd.com/b/stamm-brewing-tsunami/4729474"
        },
        {
            "title": "Photographic Film",
            "type": "IPA - New England / Hazy",
            "rating": 3.98,
            "url": "https://untappd.com/b/stamm-brewing-photographic-film/5012662"
        },
        {
            "title": "Achievement Riwaka",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.22,
            "url": "https://untappd.com/b/stamm-brewing-achievement-riwaka/5181890"
        },
        {
            "title": "Cherry Beer (Вишневое)",
            "type": "Fruit Beer",
            "rating": 3.61,
            "url": "https://untappd.com/b/stamm-beer-cherry-beer-vishnevoe/347830"
        },
        {
            "title": "Beastie",
            "type": "IPA - New England / Hazy",
            "rating": 4.05,
            "url": "https://untappd.com/b/stamm-brewing-beastie/4688964"
        },
        {
            "title": "Achievement Simcoe",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.11,
            "url": "https://untappd.com/b/stamm-brewing-achievement-simcoe/4706496"
        },
        {
            "title": "Achievement Idaho7",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.12,
            "url": "https://untappd.com/b/stamm-brewing-achievement-idaho7/4829004"
        },
        {
            "title": "Whitehaven",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.01,
            "url": "https://untappd.com/b/stamm-beer-whitehaven/3144749"
        },
        {
            "title": "Startipple",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.09,
            "url": "https://untappd.com/b/stamm-brewing-startipple/4907198"
        },
        {
            "title": "Polymer",
            "type": "IPA - New England / Hazy",
            "rating": 3.88,
            "url": "https://untappd.com/b/stamm-brewing-polymer/4758416"
        },
        {
            "title": "Achievement BRU-1",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.99,
            "url": "https://untappd.com/b/stamm-brewing-achievement-bru-1/4877607"
        },
        {
            "title": "Refresh IPA Simcoe&Mosaic",
            "type": "IPA - New England / Hazy",
            "rating": 3.92,
            "url": "https://untappd.com/b/stamm-beer-refresh-ipa-simcoe-and-mosaic/2617009"
        },
        {
            "title": "Achievement Citra",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.99,
            "url": "https://untappd.com/b/stamm-brewing-achievement-citra/4640497"
        },
        {
            "title": "Tales of Power",
            "type": "IPA - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/stamm-brewing-tales-of-power/4947848"
        },
        {
            "title": "Laser Loop",
            "type": "IPA - Triple New England / Hazy",
            "rating": 4.28,
            "url": "https://untappd.com/b/stamm-brewing-laser-loop/4857984"
        },
        {
            "title": "Magic Nebula",
            "type": "IPA - New England / Hazy",
            "rating": 3.91,
            "url": "https://untappd.com/b/stamm-brewing-magic-nebula/4982230"
        },
        {
            "title": "URALS Maple Barrel Edition",
            "type": "Stout - Imperial / Double",
            "rating": 4.34,
            "url": "https://untappd.com/b/stamm-brewing-urals-maple-barrel-edition/5149799"
        },
        {
            "title": "Achievement Strata",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.18,
            "url": "https://untappd.com/b/stamm-brewing-achievement-strata/4927810"
        },
        {
            "title": "Sun In Stone Jungle",
            "type": "Pale Ale - New England / Hazy",
            "rating": 4.01,
            "url": "https://untappd.com/b/stamm-brewing-sun-in-stone-jungle/4963586"
        },
        {
            "title": "Atlantic Meets Pacific",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.02,
            "url": "https://untappd.com/b/stamm-brewing-atlantic-meets-pacific/4758407"
        },
        {
            "title": "Cherrytonin",
            "type": "Sour - Fruited",
            "rating": 4.02,
            "url": "https://untappd.com/b/stamm-brewing-cherrytonin/4989056"
        },
        {
            "title": "Indie Pop",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4,
            "url": "https://untappd.com/b/stamm-brewing-indie-pop/4486526"
        },
        {
            "title": "Fantastic Hills",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.11,
            "url": "https://untappd.com/b/stamm-brewing-fantastic-hills/5157662"
        },
        {
            "title": "Grani Apricot",
            "type": "Wild Ale - Other",
            "rating": 4.05,
            "url": "https://untappd.com/b/stamm-brewing-grani-apricot/3397035"
        },
        {
            "title": "Achievement Platinum",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.21,
            "url": "https://untappd.com/b/stamm-brewing-achievement-platinum/4900097"
        },
        {
            "title": "Murky Treasure",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.05,
            "url": "https://untappd.com/b/stamm-brewing-murky-treasure/5111564"
        },
        {
            "title": "Consider Me With Tropical Fruits",
            "type": "Wild Ale - Other",
            "rating": 4.29,
            "url": "https://untappd.com/b/stamm-brewing-consider-me-with-tropical-fruits/3846456"
        },
        {
            "title": "Refresh IPA Galaxy & Mosaic",
            "type": "IPA - New England / Hazy",
            "rating": 3.96,
            "url": "https://untappd.com/b/stamm-beer-refresh-ipa-galaxy-and-mosaic/2652314"
        },
        {
            "title": "Unwind Timeline",
            "type": "IPA - New England / Hazy",
            "rating": 4.02,
            "url": "https://untappd.com/b/stamm-brewing-unwind-timeline/5157664"
        },
        {
            "title": "Greenworks",
            "type": "IPA - New England / Hazy",
            "rating": 4.04,
            "url": "https://untappd.com/b/stamm-brewing-greenworks/4816536"
        },
        {
            "title": "Your Young Lordship Oak Barrel Edition",
            "type": "Pilsner - Other",
            "rating": 4.04,
            "url": "https://untappd.com/b/stamm-brewing-your-young-lordship-oak-barrel-edition/4174759"
        },
        {
            "title": "Grani Berries",
            "type": "Wild Ale - Other",
            "rating": 4.14,
            "url": "https://untappd.com/b/stamm-brewing-grani-berries/3821476"
        },
        {
            "title": "Canned Summer",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.95,
            "url": "https://untappd.com/b/stamm-brewing-canned-summer/4808043"
        },
        {
            "title": "Liquid Dust",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.11,
            "url": "https://untappd.com/b/stamm-brewing-liquid-dust/5157668"
        },
        {
            "title": "Lunar Sound Club",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.95,
            "url": "https://untappd.com/b/stamm-brewing-lunar-sound-club/5092923"
        },
        {
            "title": "Achievement Nelson Sauvin",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.98,
            "url": "https://untappd.com/b/stamm-brewing-achievement-nelson-sauvin/4720191"
        },
        {
            "title": "Equilibre",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.74,
            "url": "https://untappd.com/b/stamm-brewing-equilibre/4947844"
        },
        {
            "title": "Thiolized Punch",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.07,
            "url": "https://untappd.com/b/stamm-brewing-thiolized-punch/4927798"
        },
        {
            "title": "Achievement Talus",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.24,
            "url": "https://untappd.com/b/stamm-brewing-achievement-talus/4748167"
        },
        {
            "title": "My Oceania Hops",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.15,
            "url": "https://untappd.com/b/stamm-brewing-my-oceania-hops/3536453"
        },
        {
            "title": "ReFresh Galaxy&Nelson Sauvin",
            "type": "IPA - New England / Hazy",
            "rating": 3.96,
            "url": "https://untappd.com/b/stamm-beer-refresh-galaxy-and-nelson-sauvin/3007303"
        },
        {
            "title": "Photosynthesis",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.05,
            "url": "https://untappd.com/b/stamm-brewing-photosynthesis/5236307"
        },
        {
            "title": "Tropic Gene",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.1,
            "url": "https://untappd.com/b/stamm-brewing-tropic-gene/5221742"
        },
        {
            "title": "Achievement Galaxy",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.06,
            "url": "https://untappd.com/b/stamm-brewing-achievement-galaxy/4808026"
        },
        {
            "title": "A Separate Reality",
            "type": "IPA - American",
            "rating": 3.87,
            "url": "https://untappd.com/b/stamm-brewing-a-separate-reality/5012667"
        },
        {
            "title": "Another Angle",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.09,
            "url": "https://untappd.com/b/stamm-brewing-another-angle/5236305"
        },
        {
            "title": "Forest Punk",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.04,
            "url": "https://untappd.com/b/stamm-brewing-forest-punk/5040457"
        },
        {
            "title": "Hangout",
            "type": "IPA - Triple New England / Hazy",
            "rating": 4.09,
            "url": "https://untappd.com/b/stamm-brewing-hangout/5181896"
        },
        {
            "title": "Dream Nectar",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.11,
            "url": "https://untappd.com/b/stamm-brewing-dream-nectar/5211789"
        },
        {
            "title": "Wildalechik Stolovoe",
            "type": "Wild Ale - Other",
            "rating": 3.83,
            "url": "https://untappd.com/b/stamm-brewing-wildalechik-stolovoe/4486528"
        },
        {
            "title": "Urals Mighty X",
            "type": "Stout - Imperial / Double",
            "rating": 4.29,
            "url": "https://untappd.com/b/stamm-brewing-urals-mighty-x/4375319"
        },
        {
            "title": "Sunbreaker",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.74,
            "url": "https://untappd.com/b/stamm-brewing-sunbreaker/4557498"
        },
        {
            "title": "Winterfell Extra Pomegranate & Cherry",
            "type": "Wild Ale - Other",
            "rating": 4.47,
            "url": "https://untappd.com/b/stamm-brewing-winterfell-extra-pomegranate-and-cherry/4900093"
        },
        {
            "title": "Waloon",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.69,
            "url": "https://untappd.com/b/stamm-brewing-waloon/4866152"
        },
        {
            "title": "Fusion Colada",
            "type": "IPA - Sour",
            "rating": 3.76,
            "url": "https://untappd.com/b/stamm-brewing-fusion-colada/4947851"
        },
        {
            "title": "Winterfell Raspberry",
            "type": "Sour - Flanders Red Ale",
            "rating": 4.04,
            "url": "https://untappd.com/b/stamm-brewing-winterfell-raspberry/1591918"
        },
        {
            "title": "Coastal Mirage",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.83,
            "url": "https://untappd.com/b/stamm-brewing-coastal-mirage/5110252"
        },
        {
            "title": "Final Stop",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.08,
            "url": "https://untappd.com/b/stamm-brewing-final-stop/5256588"
        },
        {
            "title": "Brett’s Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 4,
            "url": "https://untappd.com/b/stamm-beer-brett-s-saison/1591920"
        },
        {
            "title": "The Eagle’s Gift",
            "type": "IPA - American",
            "rating": 3.7,
            "url": "https://untappd.com/b/stamm-brewing-the-eagle-s-gift/5115802"
        },
        {
            "title": "Multiverse",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.04,
            "url": "https://untappd.com/b/stamm-brewing-multiverse/5256586"
        },
        {
            "title": "Thunder Flash",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.01,
            "url": "https://untappd.com/b/stamm-brewing-thunder-flash/5068753"
        },
        {
            "title": "Enenra",
            "type": "Stout - Imperial / Double",
            "rating": 4.17,
            "url": "https://untappd.com/b/stamm-brewing-enenra/4900101"
        },
        {
            "title": "Hefeweizen (Пшеничное)",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.69,
            "url": "https://untappd.com/b/stamm-beer-hefeweizen-pshenichnoe/427731"
        },
        {
            "title": "Tahiti Brunch",
            "type": "Stout - Milk / Sweet",
            "rating": 3.6,
            "url": "https://untappd.com/b/stamm-brewing-tahiti-brunch/4847856"
        },
        {
            "title": "Grani Woodbine",
            "type": "Wild Ale - Other",
            "rating": 4.03,
            "url": "https://untappd.com/b/stamm-brewing-grani-woodbine/4982249"
        },
        {
            "title": "Dark Mentor Tonka Beans & Coconut",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.35,
            "url": "https://untappd.com/b/stamm-brewing-dark-mentor-tonka-beans-and-coconut/3599044"
        },
        {
            "title": "WINTERFELL",
            "type": "Sour - Other",
            "rating": 4.04,
            "url": "https://untappd.com/b/stamm-beer-winterfell/1049686"
        },
        {
            "title": "Enenra Barrel-aged",
            "type": "Stout - Imperial / Double",
            "rating": 4.23,
            "url": "https://untappd.com/b/stamm-brewing-enenra-barrel-aged/4982264"
        },
        {
            "title": "Lager",
            "type": "Pilsner - Czech / Bohemian",
            "rating": 3.78,
            "url": "https://untappd.com/b/stamm-brewing-lager/261681"
        },
        {
            "title": "ReFresh IPA Citra&Idaho7&Sabro",
            "type": "IPA - New England / Hazy",
            "rating": 4.15,
            "url": "https://untappd.com/b/stamm-brewing-refresh-ipa-citra-and-idaho7-and-sabro/3350199"
        },
        {
            "title": "Skyfall",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.03,
            "url": "https://untappd.com/b/stamm-brewing-skyfall/5294636"
        },
        {
            "title": "Frosty Towers",
            "type": "IPA - New England / Hazy",
            "rating": 4.11,
            "url": "https://untappd.com/b/stamm-brewing-frosty-towers/5301036"
        },
        {
            "title": "Time Will Show",
            "type": "Porter - Baltic",
            "rating": 3.86,
            "url": "https://untappd.com/b/stamm-brewing-time-will-show/5226629"
        },
        {
            "title": "Fall",
            "type": "Wild Ale - Other",
            "rating": 4.22,
            "url": "https://untappd.com/b/stamm-brewing-fall/4717377"
        },
        {
            "title": "Winterfell Vintage",
            "type": "Sour - Flanders Red Ale",
            "rating": 4.18,
            "url": "https://untappd.com/b/stamm-brewing-winterfell-vintage/3383784"
        },
        {
            "title": "Your Lordship Oak Barrel Edition",
            "type": "Lager - Pale",
            "rating": 3.89,
            "url": "https://untappd.com/b/stamm-brewing-your-lordship-oak-barrel-edition/4375315"
        },
        {
            "title": "Feral Roots",
            "type": "Wild Ale - Other",
            "rating": 4.25,
            "url": "https://untappd.com/b/stamm-brewing-feral-roots/5275375"
        },
        {
            "title": "ReFresh IPA Citra&Idaho7",
            "type": "IPA - New England / Hazy",
            "rating": 4,
            "url": "https://untappd.com/b/stamm-beer-refresh-ipa-citra-and-idaho7/3254383"
        },
        {
            "title": "Funky Glasshouse",
            "type": "Wild Ale - Other",
            "rating": 4.06,
            "url": "https://untappd.com/b/stamm-brewing-funky-glasshouse/5131675"
        },
        {
            "title": "Belgian Blonde (Бельгийский Блонд)",
            "type": "Belgian Blonde",
            "rating": 3.56,
            "url": "https://untappd.com/b/stamm-beer-belgian-blonde-belgijskij-blond/706385"
        },
        {
            "title": "Your Young Lordship '23 Barrel Edition",
            "type": "Pilsner - Other",
            "rating": 3.86,
            "url": "https://untappd.com/b/stamm-brewing-your-young-lordship-23-barrel-edition/5236304"
        },
        {
            "title": "Helles (Светлое Нефильтрованное)",
            "type": "Lager - Helles",
            "rating": 3.71,
            "url": "https://untappd.com/b/stamm-brewing-helles-svetloe-nefiltrovannoe/261738"
        },
        {
            "title": "Retroid Routine",
            "type": "IPA - New England / Hazy",
            "rating": 4.03,
            "url": "https://untappd.com/b/stamm-brewing-retroid-routine/5304242"
        },
        {
            "title": "Dust On Crust",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.07,
            "url": "https://untappd.com/b/stamm-brewing-dust-on-crust/5304243"
        },
        {
            "title": "WoodWood",
            "type": "Stout - Milk / Sweet",
            "rating": 3.92,
            "url": "https://untappd.com/b/stamm-beer-woodwood/3039537"
        },
        {
            "title": "Grani Cherry",
            "type": "Wild Ale - American",
            "rating": 4.14,
            "url": "https://untappd.com/b/stamm-brewing-grani-cherry/3448426"
        },
        {
            "title": "Grani Cherry & Raspberry",
            "type": "Wild Ale - American",
            "rating": 4.06,
            "url": "https://untappd.com/b/stamm-brewing-grani-cherry-and-raspberry/3478249"
        },
        {
            "title": "Hidden Tape [Woodbine & Mango & Passion Fruit]",
            "type": "Sour - Fruited",
            "rating": 4.18,
            "url": "https://untappd.com/b/stamm-brewing-hidden-tape-woodbine-and-mango-and-passion-fruit/4375321"
        },
        {
            "title": "Fraise à La Vanille",
            "type": "Sour - Fruited",
            "rating": 4.17,
            "url": "https://untappd.com/b/stamm-brewing-fraise-a-la-vanille/4267131"
        },
        {
            "title": "Kvass Blueberry & Mint",
            "type": "Kvass",
            "rating": 4.17,
            "url": "https://untappd.com/b/stamm-brewing-kvass-blueberry-and-mint/4900100"
        },
        {
            "title": "Your Young Lordship Kellerbier",
            "type": "Kellerbier / Zwickelbier",
            "rating": 3.82,
            "url": "https://untappd.com/b/stamm-brewing-your-young-lordship-kellerbier/4872682"
        },
        {
            "title": "Black Orange",
            "type": "Stout - Milk / Sweet",
            "rating": 3.88,
            "url": "https://untappd.com/b/stamm-brewing-black-orange/4916405"
        },
        {
            "title": "Boozy Bioms",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": null,
            "url": "https://untappd.com/b/stamm-brewing-boozy-bioms/5323609"
        }
    ],
    "AF Brew": [
        {
            "title": "Mosaic IPA",
            "type": "IPA - American",
            "rating": 3.89,
            "url": "https://untappd.com/b/af-brew-mosaic-ipa/309806"
        },
        {
            "title": "Redrum IPA Special Edition",
            "type": "IPA - Imperial / Double",
            "rating": 3.94,
            "url": "https://untappd.com/b/af-brew-redrum-ipa-special-edition/915280"
        },
        {
            "title": "Passion Is My Confession",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.93,
            "url": "https://untappd.com/b/af-brew-passion-is-my-confession/1722897"
        },
        {
            "title": "Big Black Mash",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.14,
            "url": "https://untappd.com/b/af-brew-big-black-mash/2588712"
        },
        {
            "title": "Зимняя Меланхолия (Winter Melancholy)",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.04,
            "url": "https://untappd.com/b/af-brew-zimnyaya-melanholiya-winter-melancholy/1361616"
        },
        {
            "title": "Eat the Dust! DDH Mosaic",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.02,
            "url": "https://untappd.com/b/af-brew-eat-the-dust-ddh-mosaic/2065074"
        },
        {
            "title": "Ingria Pale Ale",
            "type": "IPA - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/af-brew-ingria-pale-ale/222101"
        },
        {
            "title": "Oodles of Labradoodles",
            "type": "IPA - New England / Hazy",
            "rating": 3.93,
            "url": "https://untappd.com/b/af-brew-oodles-of-labradoodles/2366528"
        },
        {
            "title": "Raspberry Is My Sanctuary",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.86,
            "url": "https://untappd.com/b/af-brew-raspberry-is-my-sanctuary/2042006"
        },
        {
            "title": "Eat the Dust! DDH Citra",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.01,
            "url": "https://untappd.com/b/af-brew-eat-the-dust-ddh-citra/2180082"
        },
        {
            "title": "Breeder Reactor",
            "type": "IPA - New England / Hazy",
            "rating": 3.86,
            "url": "https://untappd.com/b/af-brew-breeder-reactor/2484830"
        },
        {
            "title": "Hoppy Surf",
            "type": "Pale Ale - American",
            "rating": 3.76,
            "url": "https://untappd.com/b/af-brew-hoppy-surf/418241"
        },
        {
            "title": "Quad Hopper",
            "type": "IPA - Quadruple",
            "rating": 4.1,
            "url": "https://untappd.com/b/af-brew-quad-hopper/2701284"
        },
        {
            "title": "Old Sparky",
            "type": "IPA - Triple",
            "rating": 3.97,
            "url": "https://untappd.com/b/af-brew-old-sparky/1345728"
        },
        {
            "title": "Candyman! Candyman! Candyman! Candyman! Candyman!",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.11,
            "url": "https://untappd.com/b/af-brew-candyman-candyman-candyman-candyman-candyman/2955294"
        },
        {
            "title": "Black Magic",
            "type": "Porter - American",
            "rating": 3.7,
            "url": "https://untappd.com/b/af-brew-black-magic/463804"
        },
        {
            "title": "It’s Over 9000! Raspberry • Cherry • Lime",
            "type": "Sour - Fruited Gose",
            "rating": 3.96,
            "url": "https://untappd.com/b/af-brew-it-s-over-9000-raspberry-cherry-lime/3113439"
        },
        {
            "title": "Popcorn Pimp",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.08,
            "url": "https://untappd.com/b/af-brew-popcorn-pimp/2879438"
        },
        {
            "title": "Serotonin Syndrome",
            "type": "Stout - Imperial / Double Oatmeal",
            "rating": 4.03,
            "url": "https://untappd.com/b/af-brew-serotonin-syndrome/2038885"
        },
        {
            "title": "Kiss the Dust! DDH Mosaic+Citra",
            "type": "IPA - Sour",
            "rating": 3.99,
            "url": "https://untappd.com/b/af-brew-kiss-the-dust-ddh-mosaic-citra/3133446"
        },
        {
            "title": "Hentai",
            "type": "IPA - American",
            "rating": 3.72,
            "url": "https://untappd.com/b/af-brew-hentai/678907"
        },
        {
            "title": "Redneck Ale",
            "type": "Pumpkin / Yam Beer",
            "rating": 3.68,
            "url": "https://untappd.com/b/af-brew-redneck-ale/257189"
        },
        {
            "title": "F*ck the Dust! DDH Citra",
            "type": "IPA - Triple New England / Hazy",
            "rating": 4.12,
            "url": "https://untappd.com/b/af-brew-f-ck-the-dust-ddh-citra/3217815"
        },
        {
            "title": "Bounty Killer",
            "type": "Stout - Milk / Sweet",
            "rating": 3.8,
            "url": "https://untappd.com/b/af-brew-bounty-killer/1498332"
        },
        {
            "title": "Fat Nelson",
            "type": "IPA - Triple New England / Hazy",
            "rating": 3.95,
            "url": "https://untappd.com/b/af-brew-fat-nelson/2943649"
        },
        {
            "title": "It’s Over 9000! Mango • Pineapple • Lime",
            "type": "Sour - Fruited Gose",
            "rating": 3.88,
            "url": "https://untappd.com/b/af-brew-it-s-over-9000-mango-pineapple-lime/3301683"
        },
        {
            "title": "Sangre Fresca",
            "type": "Sour - Other Gose",
            "rating": 3.72,
            "url": "https://untappd.com/b/af-brew-sangre-fresca/3607569"
        },
        {
            "title": "I Got Guava Worms",
            "type": "IPA - Sour",
            "rating": 4.11,
            "url": "https://untappd.com/b/af-brew-i-got-guava-worms/3436793"
        },
        {
            "title": "F*ck the Dust! DDH Mosaic",
            "type": "IPA - Triple New England / Hazy",
            "rating": 4.1,
            "url": "https://untappd.com/b/af-brew-f-ck-the-dust-ddh-mosaic/3250642"
        },
        {
            "title": "Sour Diesel Therapy: Pineapple ∙ Mango ∙ Passion Fruit",
            "type": "Sour - Fruited",
            "rating": 4.11,
            "url": "https://untappd.com/b/af-brew-sour-diesel-therapy-pineapple-mango-passion-fruit/3454737"
        },
        {
            "title": "Kiss the Dust! DDH Citra+Simcoe",
            "type": "IPA - Sour",
            "rating": 3.89,
            "url": "https://untappd.com/b/af-brew-kiss-the-dust-ddh-citra-simcoe/3250632"
        },
        {
            "title": "Goseline Pump: Blueberry",
            "type": "Sour - Fruited Gose",
            "rating": 3.79,
            "url": "https://untappd.com/b/af-brew-goseline-pump-blueberry/1592076"
        },
        {
            "title": "I Got Mango Worms",
            "type": "IPA - Sour",
            "rating": 4.02,
            "url": "https://untappd.com/b/af-brew-i-got-mango-worms/3500423"
        },
        {
            "title": "Merry Xmas Ya Filthy Animal!",
            "type": "Sour - Fruited",
            "rating": 3.82,
            "url": "https://untappd.com/b/af-brew-merry-xmas-ya-filthy-animal/4103979"
        },
        {
            "title": "Эйфория (Euphoria)",
            "type": "IPA - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/af-brew-ejforiya-euphoria/1057968"
        },
        {
            "title": "Greenhouse Fresh",
            "type": "Sour - Other Gose",
            "rating": 3.64,
            "url": "https://untappd.com/b/af-brew-greenhouse-fresh/3313855"
        },
        {
            "title": "Hip Hop Milk",
            "type": "Pale Ale - Milkshake",
            "rating": 3.97,
            "url": "https://untappd.com/b/af-brew-hip-hop-milk/1663296"
        },
        {
            "title": "ABV Not IBU: Amarillo",
            "type": "IPA - Imperial / Double",
            "rating": 3.9,
            "url": "https://untappd.com/b/af-brew-abv-not-ibu-amarillo/885555"
        },
        {
            "title": "Highs And Lows",
            "type": "IPA - American",
            "rating": 3.81,
            "url": "https://untappd.com/b/af-brew-highs-and-lows/3027684"
        },
        {
            "title": "It’s Over 9000! Passion Fruit • Peach • Lime",
            "type": "Sour - Fruited Gose",
            "rating": 4.02,
            "url": "https://untappd.com/b/af-brew-it-s-over-9000-passion-fruit-peach-lime/3168503"
        },
        {
            "title": "Lobotomy PX",
            "type": "Stout - Imperial / Double",
            "rating": 4.28,
            "url": "https://untappd.com/b/af-brew-lobotomy-px/4380992"
        },
        {
            "title": "Zoom Boom",
            "type": "IPA - Imperial / Double Black",
            "rating": 3.79,
            "url": "https://untappd.com/b/af-brew-zoom-boom/4222110"
        },
        {
            "title": "Bus 22",
            "type": "Pilsner - Czech / Bohemian",
            "rating": 3.68,
            "url": "https://untappd.com/b/af-brew-bus-22/2620029"
        },
        {
            "title": "FFFiga Tonka!",
            "type": "Sour - Fruited",
            "rating": 4.25,
            "url": "https://untappd.com/b/af-brew-fffiga-tonka/4424952"
        },
        {
            "title": "Goseline Pump: Sea Buckthorn",
            "type": "Sour - Fruited Gose",
            "rating": 3.96,
            "url": "https://untappd.com/b/af-brew-goseline-pump-sea-buckthorn/1624042"
        },
        {
            "title": "Dark Side of the Overhype",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.14,
            "url": "https://untappd.com/b/af-brew-dark-side-of-the-overhype/3552894"
        },
        {
            "title": "Crossover Milk",
            "type": "Pale Ale - Milkshake",
            "rating": 3.95,
            "url": "https://untappd.com/b/af-brew-crossover-milk/2410515"
        },
        {
            "title": "Running Talus",
            "type": "IPA - New England / Hazy",
            "rating": 3.91,
            "url": "https://untappd.com/b/af-brew-running-talus/3955812"
        },
        {
            "title": "Sweat, Tears And Swamp Dew",
            "type": "Sour - Fruited Gose",
            "rating": 3.93,
            "url": "https://untappd.com/b/af-brew-sweat-tears-and-swamp-dew/2366537"
        },
        {
            "title": "Eat the Dust! DDH Simcoe",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.01,
            "url": "https://untappd.com/b/af-brew-eat-the-dust-ddh-simcoe/2790770"
        },
        {
            "title": "My Wheatberry Nights",
            "type": "Wheat Beer - American Pale Wheat",
            "rating": 3.76,
            "url": "https://untappd.com/b/af-brew-my-wheatberry-nights/1094107"
        },
        {
            "title": "Лоботомия 2018 Фронтальная (Lobotomy 2018 Frontal) Triple-Bourbon BA",
            "type": "Stout - Imperial / Double",
            "rating": 4.39,
            "url": "https://untappd.com/b/af-brew-lobotomiya-2018-frontalnaya-lobotomy-2018-frontal-triple-bourbon-ba/2618937"
        },
        {
            "title": "13 Weeks And What?!",
            "type": "IPA - Triple New England / Hazy",
            "rating": 3.86,
            "url": "https://untappd.com/b/af-brew-13-weeks-and-what/3842685"
        },
        {
            "title": "Fear of Zefir",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.04,
            "url": "https://untappd.com/b/af-brew-fear-of-zefir/3362305"
        },
        {
            "title": "It’s Over 9000! Blackberry • Strawberry • Lime",
            "type": "Sour - Fruited Gose",
            "rating": 3.87,
            "url": "https://untappd.com/b/af-brew-it-s-over-9000-blackberry-strawberry-lime/3306258"
        },
        {
            "title": "Kveik Me Up When September Ends",
            "type": "IPA - Farmhouse",
            "rating": 3.84,
            "url": "https://untappd.com/b/af-brew-kveik-me-up-when-september-ends/3987713"
        },
        {
            "title": "Grape Peel Session",
            "type": "IPA - Session",
            "rating": 3.85,
            "url": "https://untappd.com/b/af-brew-grape-peel-session/1321980"
        },
        {
            "title": "Eat the Dust! DDH Amarillo",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.98,
            "url": "https://untappd.com/b/af-brew-eat-the-dust-ddh-amarillo/2872614"
        },
        {
            "title": "Black Mass Is My Cassis",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.85,
            "url": "https://untappd.com/b/af-brew-black-mass-is-my-cassis/2271318"
        },
        {
            "title": "Annual Farewell Freak Show",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 3.89,
            "url": "https://untappd.com/b/af-brew-annual-farewell-freak-show/3637188"
        },
        {
            "title": "Sweat, Tears And Strawberry Fields",
            "type": "Sour - Fruited Gose",
            "rating": 3.87,
            "url": "https://untappd.com/b/af-brew-sweat-tears-and-strawberry-fields/2544221"
        },
        {
            "title": "ABV Not IBU: Motueka",
            "type": "IPA - New Zealand",
            "rating": 3.79,
            "url": "https://untappd.com/b/af-brew-abv-not-ibu-motueka/1853604"
        },
        {
            "title": "Peach Is My Preach",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.65,
            "url": "https://untappd.com/b/af-brew-peach-is-my-preach/2522338"
        },
        {
            "title": "ALL • GR • AIN • CORE",
            "type": "Stout - Other",
            "rating": 3.72,
            "url": "https://untappd.com/b/af-brew-all-gr-ain-core/3557493"
        },
        {
            "title": "I Remember My First Check-In",
            "type": "Sour - Fruited",
            "rating": 3.65,
            "url": "https://untappd.com/b/af-brew-i-remember-my-first-check-in/4012249"
        },
        {
            "title": "Three Identical Strangers: ADHA 483",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.87,
            "url": "https://untappd.com/b/af-brew-three-identical-strangers-adha-483/3697721"
        },
        {
            "title": "Chori Chori Chupke Chupke",
            "type": "IPA - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/af-brew-chori-chori-chupke-chupke/4072595"
        },
        {
            "title": "Goseline Pump: Gooseberry",
            "type": "Sour - Fruited Gose",
            "rating": 3.83,
            "url": "https://untappd.com/b/af-brew-goseline-pump-gooseberry/2193004"
        },
        {
            "title": "Golden Balls",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.97,
            "url": "https://untappd.com/b/af-brew-golden-balls/3148067"
        },
        {
            "title": "Sour Diesel Therapy: Raspberry ∙ Blueberry ∙ Blackberry",
            "type": "Sour - Fruited",
            "rating": 3.77,
            "url": "https://untappd.com/b/af-brew-sour-diesel-therapy-raspberry-blueberry-blackberry/3683577"
        },
        {
            "title": "Multimicrodots",
            "type": "IPA - New England / Hazy",
            "rating": 3.78,
            "url": "https://untappd.com/b/af-brew-multimicrodots/3286160"
        },
        {
            "title": "Hoek Van Nieuw Holland",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.6,
            "url": "https://untappd.com/b/af-brew-hoek-van-nieuw-holland/2248906"
        },
        {
            "title": "Bold In Gold",
            "type": "IPA - Triple New England / Hazy",
            "rating": 3.79,
            "url": "https://untappd.com/b/af-brew-bold-in-gold/3731157"
        },
        {
            "title": "RSSCRTC",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.81,
            "url": "https://untappd.com/b/af-brew-rsscrtc/4311070"
        },
        {
            "title": "Three Identical Strangers: HBC 472",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.77,
            "url": "https://untappd.com/b/af-brew-three-identical-strangers-hbc-472/3724367"
        },
        {
            "title": "Deep Soul Milk",
            "type": "Pale Ale - Milkshake",
            "rating": 3.91,
            "url": "https://untappd.com/b/af-brew-deep-soul-milk/1846033"
        },
        {
            "title": "Ruby Noobie",
            "type": "Fruit Beer",
            "rating": 3.78,
            "url": "https://untappd.com/b/af-brew-ruby-noobie/4254737"
        },
        {
            "title": "Three Identical Strangers: HBC 438",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.83,
            "url": "https://untappd.com/b/af-brew-three-identical-strangers-hbc-438/3724365"
        },
        {
            "title": "Love And Squalor",
            "type": "Barleywine - American",
            "rating": 4.11,
            "url": "https://untappd.com/b/af-brew-love-and-squalor/2605644"
        },
        {
            "title": "Fortune Cookie Policy",
            "type": "Sour - Fruited",
            "rating": 3.93,
            "url": "https://untappd.com/b/af-brew-fortune-cookie-policy/3674886"
        },
        {
            "title": "Tram 16",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.67,
            "url": "https://untappd.com/b/af-brew-tram-16/3739343"
        },
        {
            "title": "Babauhaus",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.81,
            "url": "https://untappd.com/b/af-brew-babauhaus/3683487"
        },
        {
            "title": "Mash. Boil. Beans. Repeat.",
            "type": "Stout - Imperial / Double",
            "rating": 3.76,
            "url": "https://untappd.com/b/af-brew-mash-boil-beans-repeat/3793442"
        },
        {
            "title": "Lemon Gummy Bears",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.75,
            "url": "https://untappd.com/b/af-brew-lemon-gummy-bears/3916433"
        },
        {
            "title": "Love And Squalor MMXXI",
            "type": "Barleywine - American",
            "rating": 4.2,
            "url": "https://untappd.com/b/af-brew-love-and-squalor-mmxxi/4188941"
        },
        {
            "title": "Piña Collabo",
            "type": "Sour - Fruited",
            "rating": 3.97,
            "url": "https://untappd.com/b/af-brew-pina-collabo/3348503"
        },
        {
            "title": "Green Supremacy!",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.86,
            "url": "https://untappd.com/b/af-brew-green-supremacy/4169817"
        },
        {
            "title": "The Seven Year Itch",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.03,
            "url": "https://untappd.com/b/af-brew-the-seven-year-itch/3410263"
        },
        {
            "title": "So Glitchy Lychee!",
            "type": "IPA - Milkshake",
            "rating": 3.81,
            "url": "https://untappd.com/b/af-brew-so-glitchy-lychee/2768301"
        },
        {
            "title": "Blown Agent Orange",
            "type": "IPA - Milkshake",
            "rating": 3.91,
            "url": "https://untappd.com/b/af-brew-blown-agent-orange/3133452"
        },
        {
            "title": "I Got Dragon Worms",
            "type": "IPA - Sour",
            "rating": 3.68,
            "url": "https://untappd.com/b/af-brew-i-got-dragon-worms/3561165"
        },
        {
            "title": "Malt Factoid",
            "type": "IPA - New England / Hazy",
            "rating": 3.85,
            "url": "https://untappd.com/b/af-brew-malt-factoid/3345898"
        },
        {
            "title": "Lobotomy X",
            "type": "Stout - Imperial / Double",
            "rating": 4.23,
            "url": "https://untappd.com/b/af-brew-lobotomy-x/4903873"
        },
        {
            "title": "Double Chocolate Banana Cake",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 3.86,
            "url": "https://untappd.com/b/af-brew-double-chocolate-banana-cake/3516467"
        },
        {
            "title": "Multiacidmicrodots",
            "type": "IPA - Sour",
            "rating": 3.78,
            "url": "https://untappd.com/b/af-brew-multiacidmicrodots/3373826"
        },
        {
            "title": "Goseline Pump: Watermelon",
            "type": "Sour - Fruited Gose",
            "rating": 3.43,
            "url": "https://untappd.com/b/af-brew-goseline-pump-watermelon/2778066"
        },
        {
            "title": "The Hops of Wrath",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.81,
            "url": "https://untappd.com/b/af-brew-the-hops-of-wrath/4424995"
        },
        {
            "title": "Hangover Sap",
            "type": "IPA - New England / Hazy",
            "rating": 3.81,
            "url": "https://untappd.com/b/af-brew-hangover-sap/3348506"
        },
        {
            "title": "Neighbors In Crime",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.04,
            "url": "https://untappd.com/b/af-brew-neighbors-in-crime/4537316"
        },
        {
            "title": "Kupola & Pastila",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.07,
            "url": "https://untappd.com/b/af-brew-kupola-and-pastila/2724120"
        },
        {
            "title": "Do You Know the Muffin Man?",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.09,
            "url": "https://untappd.com/b/af-brew-do-you-know-the-muffin-man/2993853"
        },
        {
            "title": "99 Luftballons",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.84,
            "url": "https://untappd.com/b/af-brew-99-luftballons/4480122"
        },
        {
            "title": "Zero-Zero Takeoff",
            "type": "Non-Alcoholic Beer - IPA",
            "rating": 3.54,
            "url": "https://untappd.com/b/af-brew-zero-zero-takeoff/3885296"
        },
        {
            "title": "Do You Know the Blueberry Man?",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.15,
            "url": "https://untappd.com/b/af-brew-do-you-know-the-blueberry-man/3203144"
        },
        {
            "title": "Pop the Dust! DDH Cryo Pop™",
            "type": "IPA - Triple New England / Hazy",
            "rating": 3.71,
            "url": "https://untappd.com/b/af-brew-pop-the-dust-ddh-cryo-pop/4331893"
        },
        {
            "title": "Eat the Dust! DDH Talus",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.98,
            "url": "https://untappd.com/b/af-brew-eat-the-dust-ddh-talus/4314022"
        },
        {
            "title": "Year of Fear. Kentucky",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.17,
            "url": "https://untappd.com/b/af-brew-year-of-fear-kentucky/3886426"
        },
        {
            "title": "Lemon Haze",
            "type": "Pale Ale - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/af-brew-lemon-haze/2149415"
        },
        {
            "title": "Blown Agent Purple",
            "type": "IPA - Milkshake",
            "rating": 3.67,
            "url": "https://untappd.com/b/af-brew-blown-agent-purple/3110024"
        },
        {
            "title": "Supercandyman!",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.22,
            "url": "https://untappd.com/b/af-brew-supercandyman/3227526"
        },
        {
            "title": "La Virgen De Moscú",
            "type": "Lager - Mexican",
            "rating": 3.7,
            "url": "https://untappd.com/b/af-brew-la-virgen-de-moscu/4768617"
        },
        {
            "title": "200",
            "type": "Barleywine - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/af-brew-200/4158980"
        },
        {
            "title": "Liquid Cargo Cult",
            "type": "IPA - New England / Hazy",
            "rating": 3.79,
            "url": "https://untappd.com/b/af-brew-liquid-cargo-cult/4378906"
        },
        {
            "title": "Ol' Filthy Popcorn Pimp",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.2,
            "url": "https://untappd.com/b/af-brew-ol-filthy-popcorn-pimp/3194575"
        },
        {
            "title": "Fake Mocktail Part 2 of 2: Rhubarb",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.4,
            "url": "https://untappd.com/b/af-brew-fake-mocktail-part-2-of-2-rhubarb/3862630"
        },
        {
            "title": "Stereo Vario: Calamansi And Mint",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.82,
            "url": "https://untappd.com/b/af-brew-stereo-vario-calamansi-and-mint/2752952"
        },
        {
            "title": "Pomme De Sodome",
            "type": "Cider - Graff",
            "rating": 4.13,
            "url": "https://untappd.com/b/af-brew-pomme-de-sodome/3588530"
        },
        {
            "title": "Fake Mocktail Part 1 of 2: Strawberry",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.37,
            "url": "https://untappd.com/b/af-brew-fake-mocktail-part-1-of-2-strawberry/3862628"
        },
        {
            "title": "Big Black Maple Mash",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.09,
            "url": "https://untappd.com/b/af-brew-big-black-maple-mash/2833611"
        },
        {
            "title": "Star 14",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.03,
            "url": "https://untappd.com/b/af-brew-star-14/1914946"
        },
        {
            "title": "Меланхолия (Melancholy)",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.08,
            "url": "https://untappd.com/b/af-brew-melanholiya-melancholy/1034462"
        },
        {
            "title": "Unholy Melancholy",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 3.92,
            "url": "https://untappd.com/b/af-brew-unholy-melancholy/3649365"
        },
        {
            "title": "Murder IPA Birthday Edition",
            "type": "IPA - Triple",
            "rating": 4.03,
            "url": "https://untappd.com/b/af-brew-murder-ipa-birthday-edition/4693605"
        },
        {
            "title": "Trolley 10",
            "type": "Kölsch",
            "rating": 3.76,
            "url": "https://untappd.com/b/af-brew-trolley-10/4311056"
        },
        {
            "title": "Goseline Pump: Rhubarb",
            "type": "Sour - Fruited Gose",
            "rating": 3.84,
            "url": "https://untappd.com/b/af-brew-goseline-pump-rhubarb/1665976"
        },
        {
            "title": "ABV Not IBU: Nelson Sauvin",
            "type": "IPA - New Zealand",
            "rating": 3.49,
            "url": "https://untappd.com/b/af-brew-abv-not-ibu-nelson-sauvin/3793347"
        },
        {
            "title": "Sourrealism Citra+Equinox",
            "type": "Sour - Other",
            "rating": 3.93,
            "url": "https://untappd.com/b/af-brew-sourrealism-citra-equinox/1315567"
        },
        {
            "title": "Goseline Pump: Apricot",
            "type": "Sour - Fruited Gose",
            "rating": 3.87,
            "url": "https://untappd.com/b/af-brew-goseline-pump-apricot/2708473"
        },
        {
            "title": "Black Raspberry",
            "type": "Porter - Imperial / Double",
            "rating": 4.07,
            "url": "https://untappd.com/b/af-brew-black-raspberry/4187349"
        },
        {
            "title": "Hopscotch",
            "type": "IPA - Imperial / Double",
            "rating": 3.98,
            "url": "https://untappd.com/b/af-brew-hopscotch/4963563"
        },
        {
            "title": "- all - grain -",
            "type": "Stout - English",
            "rating": 3.72,
            "url": "https://untappd.com/b/af-brew-all-grain/4555186"
        },
        {
            "title": "Brewer's Profile: Sahti",
            "type": "Farmhouse Ale - Sahti",
            "rating": 3.55,
            "url": "https://untappd.com/b/af-brew-brewer-s-profile-sahti/4140376"
        },
        {
            "title": "Ingria 8",
            "type": "IPA - American",
            "rating": 3.66,
            "url": "https://untappd.com/b/af-brew-ingria-8/3940268"
        },
        {
            "title": "Black Blossom",
            "type": "Porter - Imperial / Double",
            "rating": 3.95,
            "url": "https://untappd.com/b/af-brew-black-blossom/4565777"
        },
        {
            "title": "Postoverhype",
            "type": "Stout - Imperial / Double",
            "rating": 4.08,
            "url": "https://untappd.com/b/af-brew-postoverhype/4982157"
        },
        {
            "title": "Spring Fever Dreams: February",
            "type": "Sour - Fruited",
            "rating": 3.88,
            "url": "https://untappd.com/b/af-brew-spring-fever-dreams-february/4195255"
        },
        {
            "title": "ABV Not IBU: Citra",
            "type": "IPA - Imperial / Double",
            "rating": 3.55,
            "url": "https://untappd.com/b/af-brew-abv-not-ibu-citra/3793348"
        },
        {
            "title": "Má Là Equinox",
            "type": "Spiced / Herbed Beer",
            "rating": 3.81,
            "url": "https://untappd.com/b/af-brew-ma-la-equinox/1943466"
        },
        {
            "title": "München Verstehen",
            "type": "Lager - Helles",
            "rating": 3.65,
            "url": "https://untappd.com/b/af-brew-munchen-verstehen/4020202"
        },
        {
            "title": "S.M.S.C.",
            "type": "IPA - New England / Hazy",
            "rating": 3.91,
            "url": "https://untappd.com/b/af-brew-s-m-s-c/4768609"
        },
        {
            "title": "Манго Освобожденный (Mango Unchained)",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.67,
            "url": "https://untappd.com/b/af-brew-mango-osvobozhdennyj-mango-unchained/1183288"
        },
        {
            "title": "Yuzu Nembutsu",
            "type": "Sour - Fruited",
            "rating": 4.01,
            "url": "https://untappd.com/b/af-brew-yuzu-nembutsu/4457821"
        },
        {
            "title": "It Could Be Lupus",
            "type": "IPA - New England / Hazy",
            "rating": 3.95,
            "url": "https://untappd.com/b/af-brew-it-could-be-lupus/4849796"
        },
        {
            "title": "Spanglish Breakfast",
            "type": "Porter - Imperial / Double",
            "rating": 3.76,
            "url": "https://untappd.com/b/af-brew-spanglish-breakfast/3168592"
        },
        {
            "title": "Sourrealism Sorachi+Mosaic",
            "type": "Sour - Other",
            "rating": 3.99,
            "url": "https://untappd.com/b/af-brew-sourrealism-sorachi-mosaic/1396778"
        },
        {
            "title": "This Is Houston. Say Again, Please.",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.94,
            "url": "https://untappd.com/b/af-brew-this-is-houston-say-again-please/4720147"
        },
        {
            "title": "Goseline Pump: Raspberry",
            "type": "Sour - Fruited Gose",
            "rating": 4.02,
            "url": "https://untappd.com/b/af-brew-goseline-pump-raspberry/1582550"
        },
        {
            "title": "Black February",
            "type": "Porter - Imperial / Double",
            "rating": 4.13,
            "url": "https://untappd.com/b/af-brew-black-february/4596442"
        },
        {
            "title": "Joy of Lollipopping",
            "type": "Sour - Fruited",
            "rating": 3.98,
            "url": "https://untappd.com/b/af-brew-joy-of-lollipopping/4903861"
        },
        {
            "title": "Elementary Operations",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.03,
            "url": "https://untappd.com/b/af-brew-elementary-operations/2801720"
        },
        {
            "title": "Kiss the Dust! DDH Simcoe+Amarillo",
            "type": "IPA - Sour",
            "rating": 3.95,
            "url": "https://untappd.com/b/af-brew-kiss-the-dust-ddh-simcoe-amarillo/3275016"
        },
        {
            "title": "Spoonful of Summer",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.92,
            "url": "https://untappd.com/b/af-brew-spoonful-of-summer/2754001"
        },
        {
            "title": "Kiss Kiss Bang Bang",
            "type": "IPA - Sour",
            "rating": 4.02,
            "url": "https://untappd.com/b/af-brew-kiss-kiss-bang-bang/3920198"
        },
        {
            "title": "Ingria X",
            "type": "IPA - Imperial / Double",
            "rating": 3.87,
            "url": "https://untappd.com/b/af-brew-ingria-x/4993493"
        },
        {
            "title": "Rhubauhaus",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.9,
            "url": "https://untappd.com/b/af-brew-rhubauhaus/3892074"
        },
        {
            "title": "Year of Fear. Jalisco",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.1,
            "url": "https://untappd.com/b/af-brew-year-of-fear-jalisco/3886428"
        },
        {
            "title": "Spring Fever Dreams: March",
            "type": "Sour - Fruited",
            "rating": 3.95,
            "url": "https://untappd.com/b/af-brew-spring-fever-dreams-march/4218754"
        },
        {
            "title": "Bomb Release Unit",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.06,
            "url": "https://untappd.com/b/af-brew-bomb-release-unit/2558569"
        },
        {
            "title": "Stereo Vario: Raspberry And Coffee",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.78,
            "url": "https://untappd.com/b/af-brew-stereo-vario-raspberry-and-coffee/2752950"
        },
        {
            "title": "It Could Be Lupus Too",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.95,
            "url": "https://untappd.com/b/af-brew-it-could-be-lupus-too/4849799"
        },
        {
            "title": "Carousel Pie",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.82,
            "url": "https://untappd.com/b/af-brew-carousel-pie/2681079"
        },
        {
            "title": "Overnight Oatmeal",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.8,
            "url": "https://untappd.com/b/af-brew-overnight-oatmeal/2993848"
        },
        {
            "title": "So Bloody Pink!",
            "type": "IPA - New England / Hazy",
            "rating": 4.17,
            "url": "https://untappd.com/b/af-brew-so-bloody-pink/2608945"
        },
        {
            "title": "Thiolize This! Thiolize That!",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.01,
            "url": "https://untappd.com/b/af-brew-thiolize-this-thiolize-that/5011314"
        },
        {
            "title": "Nero Di Seppia",
            "type": "IPA - Black / Cascadian Dark Ale",
            "rating": 3.75,
            "url": "https://untappd.com/b/af-brew-nero-di-seppia/1673806"
        },
        {
            "title": "Super Double Big Pulp",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.97,
            "url": "https://untappd.com/b/af-brew-super-double-big-pulp/4982154"
        },
        {
            "title": "Autumn Fever Dreams: November",
            "type": "Sour - Fruited",
            "rating": 3.76,
            "url": "https://untappd.com/b/af-brew-autumn-fever-dreams-november/4565757"
        },
        {
            "title": "Serotonin Syndrome ⚡️Convulsive Attack⚡️",
            "type": "Stout - Imperial / Double Oatmeal",
            "rating": 4.21,
            "url": "https://untappd.com/b/af-brew-serotonin-syndrome-convulsive-attack/2389200"
        },
        {
            "title": "Do You Know the Muffin Man Who Went to Bourbon Land?",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.13,
            "url": "https://untappd.com/b/af-brew-do-you-know-the-muffin-man-who-went-to-bourbon-land/3475246"
        },
        {
            "title": "I Got Lychee Worms",
            "type": "IPA - Sour",
            "rating": 3.92,
            "url": "https://untappd.com/b/af-brew-i-got-lychee-worms/4328755"
        },
        {
            "title": "Metro",
            "type": "Lager - Dark",
            "rating": 3.64,
            "url": "https://untappd.com/b/af-brew-metro/4565568"
        },
        {
            "title": "Slavic Squat",
            "type": "Pale Ale - American",
            "rating": 3.71,
            "url": "https://untappd.com/b/af-brew-slavic-squat/2006324"
        },
        {
            "title": "Sea My Cucumber?",
            "type": "Sour - Fruited Gose",
            "rating": 3.69,
            "url": "https://untappd.com/b/af-brew-sea-my-cucumber/4424984"
        },
        {
            "title": "Summer's Almost Gone",
            "type": "IPA - New England / Hazy",
            "rating": 3.97,
            "url": "https://untappd.com/b/af-brew-summer-s-almost-gone/4903866"
        },
        {
            "title": "Up the Masts!",
            "type": "Sour - Traditional Gose",
            "rating": 3.85,
            "url": "https://untappd.com/b/af-brew-up-the-masts/2798794"
        },
        {
            "title": "A Perfect Day For Bananadine",
            "type": "Sour - Fruited",
            "rating": 3.59,
            "url": "https://untappd.com/b/af-brew-a-perfect-day-for-bananadine/4378910"
        },
        {
            "title": "Eat the Dust! DDH Centennial",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.94,
            "url": "https://untappd.com/b/af-brew-eat-the-dust-ddh-centennial/2993852"
        },
        {
            "title": "Sourrealism Galaxy+Vic Secret",
            "type": "Sour - Other",
            "rating": 3.79,
            "url": "https://untappd.com/b/af-brew-sourrealism-galaxy-vic-secret/1430597"
        },
        {
            "title": "Jump the Line",
            "type": "IPA - Triple",
            "rating": 3.99,
            "url": "https://untappd.com/b/af-brew-jump-the-line/2107375"
        },
        {
            "title": "Da Camorra Con Amore",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.56,
            "url": "https://untappd.com/b/af-brew-da-camorra-con-amore/4183571"
        },
        {
            "title": "Espressourrealism",
            "type": "Sour - Other",
            "rating": 3.88,
            "url": "https://untappd.com/b/af-brew-espressourrealism/1983870"
        },
        {
            "title": "I Got Pineapple Worms",
            "type": "IPA - Sour",
            "rating": 3.92,
            "url": "https://untappd.com/b/af-brew-i-got-pineapple-worms/4328758"
        },
        {
            "title": "Neodekadents",
            "type": "Stout - Imperial / Double",
            "rating": 4.02,
            "url": "https://untappd.com/b/af-brew-neodekadents/2191406"
        },
        {
            "title": "8 Weeks And Counting",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4,
            "url": "https://untappd.com/b/af-brew-8-weeks-and-counting/3802626"
        },
        {
            "title": "Can You Sea?",
            "type": "Sour - Other Gose",
            "rating": 3.69,
            "url": "https://untappd.com/b/af-brew-can-you-sea/4104002"
        },
        {
            "title": "Passion RAF",
            "type": "IPA - New England / Hazy",
            "rating": 3.87,
            "url": "https://untappd.com/b/af-brew-passion-raf/2135499"
        },
        {
            "title": "Screw U, Freaks",
            "type": "Pumpkin / Yam Beer",
            "rating": 3.58,
            "url": "https://untappd.com/b/af-brew-screw-u-freaks/4565745"
        },
        {
            "title": "Another Million Minutes On Cherry",
            "type": "Wild Ale - American",
            "rating": 4.04,
            "url": "https://untappd.com/b/af-brew-another-million-minutes-on-cherry/3718068"
        },
        {
            "title": "Beethouse Fresh",
            "type": "Sour - Other Gose",
            "rating": 3.45,
            "url": "https://untappd.com/b/af-brew-beethouse-fresh/4827371"
        },
        {
            "title": "Tour De Hobo",
            "type": "IPA - Session",
            "rating": 3.82,
            "url": "https://untappd.com/b/af-brew-tour-de-hobo/2267070"
        },
        {
            "title": "Another Million Minutes On Raspberry",
            "type": "Wild Ale - American",
            "rating": 3.99,
            "url": "https://untappd.com/b/af-brew-another-million-minutes-on-raspberry/3718062"
        },
        {
            "title": "Generation Snowflake",
            "type": "IPA - Session",
            "rating": 3.79,
            "url": "https://untappd.com/b/af-brew-generation-snowflake/2452805"
        },
        {
            "title": "Rice And Shine",
            "type": "Lager - Japanese Rice",
            "rating": 3.64,
            "url": "https://untappd.com/b/af-brew-rice-and-shine/4244028"
        },
        {
            "title": "Neodekadents BA",
            "type": "Stout - Imperial / Double",
            "rating": 3.91,
            "url": "https://untappd.com/b/af-brew-neodekadents-ba/2585149"
        },
        {
            "title": "Eat the Dust! DDH HBC 630",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.79,
            "url": "https://untappd.com/b/af-brew-eat-the-dust-ddh-hbc-630/4555183"
        },
        {
            "title": "Brewer's Profile: Brut IPA",
            "type": "IPA - Brut",
            "rating": 3.68,
            "url": "https://untappd.com/b/af-brew-brewer-s-profile-brut-ipa/4473347"
        },
        {
            "title": "Eat the Dust! DDH Ekuanot",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.8,
            "url": "https://untappd.com/b/af-brew-eat-the-dust-ddh-ekuanot/2522340"
        },
        {
            "title": "OverHypeBeast",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.29,
            "url": "https://untappd.com/b/af-brew-overhypebeast/3940270"
        },
        {
            "title": "Mead Grinder Frederiksdal BA",
            "type": "Mead - Melomel",
            "rating": 4.21,
            "url": "https://untappd.com/b/af-brew-mead-grinder-frederiksdal-ba/4903869"
        },
        {
            "title": "Piss Off Season",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.51,
            "url": "https://untappd.com/b/af-brew-piss-off-season/4706560"
        },
        {
            "title": "Kochere Espresso",
            "type": "IPA - Black / Cascadian Dark Ale",
            "rating": 4.09,
            "url": "https://untappd.com/b/af-brew-kochere-espresso/1334279"
        },
        {
            "title": "Another Million Minutes On Peach",
            "type": "Wild Ale - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/af-brew-another-million-minutes-on-peach/3718066"
        },
        {
            "title": "Oh, Mein Radler",
            "type": "Shandy / Radler",
            "rating": 3.44,
            "url": "https://untappd.com/b/af-brew-oh-mein-radler/4360177"
        },
        {
            "title": "Mead Grinder",
            "type": "Mead - Melomel",
            "rating": 4.29,
            "url": "https://untappd.com/b/af-brew-mead-grinder/4380865"
        },
        {
            "title": "ABV Not IBU: Polaris",
            "type": "IPA - Imperial / Double",
            "rating": 4,
            "url": "https://untappd.com/b/af-brew-abv-not-ibu-polaris/845444"
        },
        {
            "title": "Mezga",
            "type": "Fruit Beer",
            "rating": 4.04,
            "url": "https://untappd.com/b/af-brew-mezga/5098526"
        },
        {
            "title": "Lemon Pills",
            "type": "Pilsner - Other",
            "rating": 3.64,
            "url": "https://untappd.com/b/af-brew-lemon-pills/2257271"
        },
        {
            "title": "Fruit Sour IPA",
            "type": "IPA - Sour",
            "rating": 4.02,
            "url": "https://untappd.com/b/af-brew-fruit-sour-ipa/1565160"
        },
        {
            "title": "China Equinox",
            "type": "Belgian Strong Golden Ale",
            "rating": 3.83,
            "url": "https://untappd.com/b/af-brew-china-equinox/1818574"
        },
        {
            "title": "235",
            "type": "Barleywine - American",
            "rating": 3.97,
            "url": "https://untappd.com/b/af-brew-235/4565783"
        },
        {
            "title": "Eat No Dust! DDH Nelson Sauvin",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.82,
            "url": "https://untappd.com/b/af-brew-eat-no-dust-ddh-nelson-sauvin/2255386"
        },
        {
            "title": "Gingerzilla vs. Sourobot",
            "type": "Sour - Other",
            "rating": 3.82,
            "url": "https://untappd.com/b/af-brew-gingerzilla-vs-sourobot/4870091"
        },
        {
            "title": "Million Minutes of Nothing",
            "type": "Wild Ale - American",
            "rating": 4.01,
            "url": "https://untappd.com/b/af-brew-million-minutes-of-nothing/3084365"
        },
        {
            "title": "Thiolize Here! Thiolize There!",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.94,
            "url": "https://untappd.com/b/af-brew-thiolize-here-thiolize-there/5144122"
        },
        {
            "title": "Шоколадная Антифабрика",
            "type": "Stout - Imperial / Double Oatmeal",
            "rating": 4.02,
            "url": "https://untappd.com/b/af-brew-shokoladnaya-antifabrika/837557"
        },
        {
            "title": "Brewer’s Profile: Gose with Olives",
            "type": "Sour - Other Gose",
            "rating": 3.59,
            "url": "https://untappd.com/b/af-brew-brewer-s-profile-gose-with-olives/4849284"
        },
        {
            "title": "Summer Fever Dreams: June",
            "type": "Sour - Fruited",
            "rating": 3.88,
            "url": "https://untappd.com/b/af-brew-summer-fever-dreams-june/4322395"
        },
        {
            "title": "Black Equinox",
            "type": "Spiced / Herbed Beer",
            "rating": 3.81,
            "url": "https://untappd.com/b/af-brew-black-equinox/1126429"
        },
        {
            "title": "Electro Bus 22",
            "type": "Non-Alcoholic Beer - Lager",
            "rating": 3.32,
            "url": "https://untappd.com/b/af-brew-electro-bus-22/4877903"
        },
        {
            "title": "Equinox",
            "type": "Belgian Strong Golden Ale",
            "rating": 4.05,
            "url": "https://untappd.com/b/af-brew-equinox/1005434"
        },
        {
            "title": "Ванильная Икра (Vanilla Caviar)",
            "type": "Porter - Other",
            "rating": 3.82,
            "url": "https://untappd.com/b/af-brew-vanilnaya-ikra-vanilla-caviar/1868681"
        },
        {
            "title": "...And Happy New Year!",
            "type": "Sour - Fruited",
            "rating": 3.77,
            "url": "https://untappd.com/b/af-brew-and-happy-new-year/5144284"
        },
        {
            "title": "Million Minutes On Raspberry",
            "type": "Wild Ale - American",
            "rating": 4.06,
            "url": "https://untappd.com/b/af-brew-million-minutes-on-raspberry/3084368"
        },
        {
            "title": "Flatpicking Day",
            "type": "IPA - American",
            "rating": 3.53,
            "url": "https://untappd.com/b/af-brew-flatpicking-day/3367186"
        },
        {
            "title": "Grape Peel Session: Sour Side",
            "type": "Sour - Fruited",
            "rating": 3.9,
            "url": "https://untappd.com/b/af-brew-grape-peel-session-sour-side/1685482"
        },
        {
            "title": "Belka+Strelka",
            "type": "IPA - American",
            "rating": 3.74,
            "url": "https://untappd.com/b/af-brew-belka-strelka/1529937"
        },
        {
            "title": "Baltic Sea Buckthorn Tripel",
            "type": "Belgian Tripel",
            "rating": 3.93,
            "url": "https://untappd.com/b/af-brew-baltic-sea-buckthorn-tripel/1231315"
        },
        {
            "title": "Triple Vista",
            "type": "IPA - Triple New England / Hazy",
            "rating": 3.81,
            "url": "https://untappd.com/b/af-brew-triple-vista/5209937"
        },
        {
            "title": "Renaissance",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.72,
            "url": "https://untappd.com/b/af-brew-renaissance/2812848"
        },
        {
            "title": "Goseline Pump: Blackberry",
            "type": "Sour - Fruited Gose",
            "rating": 3.88,
            "url": "https://untappd.com/b/af-brew-goseline-pump-blackberry/1643332"
        },
        {
            "title": "Million Minutes On Cloudberry",
            "type": "Wild Ale - American",
            "rating": 3.99,
            "url": "https://untappd.com/b/af-brew-million-minutes-on-cloudberry/3084371"
        },
        {
            "title": "ABV Not IBU: Kazbek",
            "type": "IPA - Imperial / Double",
            "rating": 3.91,
            "url": "https://untappd.com/b/af-brew-abv-not-ibu-kazbek/967628"
        },
        {
            "title": "Brewer's Profile: Doppelbock",
            "type": "Bock - Doppelbock",
            "rating": 3.43,
            "url": "https://untappd.com/b/af-brew-brewer-s-profile-doppelbock/5080517"
        },
        {
            "title": "ABV Not IBU: Mandarina Bavaria",
            "type": "IPA - Imperial / Double",
            "rating": 3.79,
            "url": "https://untappd.com/b/af-brew-abv-not-ibu-mandarina-bavaria/1016152"
        },
        {
            "title": "ABV Not IBU: Azacca",
            "type": "IPA - Imperial / Double",
            "rating": 3.82,
            "url": "https://untappd.com/b/af-brew-abv-not-ibu-azacca/1040478"
        },
        {
            "title": "ABV Not IBU: Waimea",
            "type": "IPA - Imperial / Double",
            "rating": 3.85,
            "url": "https://untappd.com/b/af-brew-abv-not-ibu-waimea/951035"
        },
        {
            "title": "ABV Not IBU: Belma",
            "type": "IPA - Imperial / Double",
            "rating": 4.08,
            "url": "https://untappd.com/b/af-brew-abv-not-ibu-belma/919802"
        },
        {
            "title": "Brewer’s Profile: Matbucha Gose",
            "type": "Sour - Other Gose",
            "rating": 3.45,
            "url": "https://untappd.com/b/af-brew-brewer-s-profile-matbucha-gose/4849289"
        },
        {
            "title": "Black Kiwi",
            "type": "Schwarzbier",
            "rating": 3.97,
            "url": "https://untappd.com/b/af-brew-black-kiwi/898538"
        },
        {
            "title": "Sudden Breakthru At Checkpoint Charlie",
            "type": "IPA - Imperial / Double",
            "rating": 4.05,
            "url": "https://untappd.com/b/af-brew-sudden-breakthru-at-checkpoint-charlie/1204170"
        },
        {
            "title": "This Is England, Honey!",
            "type": "Pale Ale - English",
            "rating": 3.74,
            "url": "https://untappd.com/b/af-brew-this-is-england-honey/708885"
        },
        {
            "title": "White Kiwi",
            "type": "Pilsner - Imperial / Double",
            "rating": 4.06,
            "url": "https://untappd.com/b/af-brew-white-kiwi/873356"
        },
        {
            "title": "Animal Farm",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.79,
            "url": "https://untappd.com/b/af-brew-animal-farm/728358"
        },
        {
            "title": "Tu Vuò Fà L’Americano",
            "type": "Red Ale - American Amber / Red",
            "rating": 3.9,
            "url": "https://untappd.com/b/af-brew-tu-vuo-fa-l-americano/619326"
        },
        {
            "title": "Double Vista",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.86,
            "url": "https://untappd.com/b/af-brew-double-vista/5209938"
        },
        {
            "title": "Ninja Bavarese",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.94,
            "url": "https://untappd.com/b/af-brew-ninja-bavarese/619398"
        },
        {
            "title": "Breaking Bad | Первый Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 4.15,
            "url": "https://untappd.com/b/af-brew-breaking-bad-pervyj-saison/457370"
        },
        {
            "title": "Зимняя Меланхолия (Winter Melancholy) BA Chivas",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.06,
            "url": "https://untappd.com/b/af-brew-zimnyaya-melanholiya-winter-melancholy-ba-chivas/1990751"
        },
        {
            "title": "33 cl",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.35,
            "url": "https://untappd.com/b/af-brew-33-cl/5161023"
        },
        {
            "title": "Half Million Minutes On Rowanberry",
            "type": "Wild Ale - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/af-brew-half-million-minutes-on-rowanberry/5097452"
        },
        {
            "title": "Half Million Minutes On Sea Buckthorn",
            "type": "Wild Ale - American",
            "rating": 3.93,
            "url": "https://untappd.com/b/af-brew-half-million-minutes-on-sea-buckthorn/5097454"
        },
        {
            "title": "Half Million Minutes On Cranberry",
            "type": "Wild Ale - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/af-brew-half-million-minutes-on-cranberry/5097451"
        },
        {
            "title": "Burton Ale | Citra Edition",
            "type": "Historical Beer - Burton Ale",
            "rating": 4.2,
            "url": "https://untappd.com/b/af-brew-burton-ale-citra-edition/383155"
        },
        {
            "title": "Burton Ale | Warrior Edition",
            "type": "Historical Beer - Burton Ale",
            "rating": 3.96,
            "url": "https://untappd.com/b/af-brew-burton-ale-warrior-edition/379612"
        },
        {
            "title": "Burton Ale | Willamette Edition",
            "type": "Historical Beer - Burton Ale",
            "rating": 3.89,
            "url": "https://untappd.com/b/af-brew-burton-ale-willamette-edition/376349"
        },
        {
            "title": "Breaking Bad | Director's Cut",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.99,
            "url": "https://untappd.com/b/af-brew-breaking-bad-director-s-cut/541631"
        },
        {
            "title": "Заводной Апельсин",
            "type": "Pale Ale - American",
            "rating": 4.22,
            "url": "https://untappd.com/b/af-brew-zavodnoj-apelsin/460335"
        },
        {
            "title": "Old Sparky BA on Death Row",
            "type": "Strong Ale - American",
            "rating": 3.97,
            "url": "https://untappd.com/b/af-brew-old-sparky-ba-on-death-row/2269378"
        },
        {
            "title": "Burov Stout",
            "type": "Stout - Other",
            "rating": 4.17,
            "url": "https://untappd.com/b/af-brew-burov-stout/533965"
        },
        {
            "title": "Hard Seltzer. Blueberry × Lassi",
            "type": "Hard Seltzer",
            "rating": 3.49,
            "url": "https://untappd.com/b/af-brew-hard-seltzer-blueberry-lassi/5238301"
        },
        {
            "title": "Redneck Ale Vintage",
            "type": "Pumpkin / Yam Beer",
            "rating": 3.66,
            "url": "https://untappd.com/b/af-brew-redneck-ale-vintage/339190"
        },
        {
            "title": "Tintin Blond",
            "type": "Belgian Strong Golden Ale",
            "rating": 4.06,
            "url": "https://untappd.com/b/af-brew-tintin-blond/504117"
        },
        {
            "title": "Sour Diesel Therapy: Guava ∙ Pineapple ∙ Peach",
            "type": "Sour - Fruited",
            "rating": 3.57,
            "url": "https://untappd.com/b/af-brew-sour-diesel-therapy-guava-pineapple-peach/5273107"
        },
        {
            "title": "Black Raspberry + Peanut Butter",
            "type": "Porter - Imperial / Double",
            "rating": 4.01,
            "url": "https://untappd.com/b/af-brew-black-raspberry-peanut-butter/4188938"
        },
        {
            "title": "Balalager",
            "type": "Lager - Helles",
            "rating": 3.8,
            "url": "https://untappd.com/b/af-brew-balalager/5017915"
        },
        {
            "title": "Frecciarossa",
            "type": "Sour - Fruited",
            "rating": null,
            "url": "https://untappd.com/b/af-brew-frecciarossa/5320904"
        }
    ],
    "4BREWERS": [
        {
            "title": "Острая зависимость",
            "type": "Sour - Other Gose",
            "rating": 4.15,
            "url": "https://untappd.com/b/4brewers-ostraya-zavisimost/3009896"
        },
        {
            "title": "Зависимость",
            "type": "Sour - Other Gose",
            "rating": 4.1,
            "url": "https://untappd.com/b/4brewers-zavisimost/2913906"
        },
        {
            "title": "Доза [Mango + Passion Fruit]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.26,
            "url": "https://untappd.com/b/4brewers-doza-mango-passion-fruit/3459729"
        },
        {
            "title": "Похищение человеков инопланетянами",
            "type": "IPA - White / Wheat",
            "rating": 3.87,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-pohishenie-chelovekov-inoplanetyanami/1790286"
        },
        {
            "title": "Вторая личность",
            "type": "Porter - Other",
            "rating": 3.91,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-vtoraya-lichnost/2016091"
        },
        {
            "title": "Искажение",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.17,
            "url": "https://untappd.com/b/4brewers-iskazhenie/4081266"
        },
        {
            "title": "Большой брат",
            "type": "IPA - Imperial / Double",
            "rating": 3.87,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-bolshoj-brat/1790292"
        },
        {
            "title": "Darknet",
            "type": "Stout - Other",
            "rating": 3.95,
            "url": "https://untappd.com/b/4brewers-darknet/4039521"
        },
        {
            "title": "Santa Muerte",
            "type": "Stout - Coffee",
            "rating": 3.8,
            "url": "https://untappd.com/b/4brewers-santa-muerte/1803160"
        },
        {
            "title": "Ничего святого",
            "type": "Sour - Fruited",
            "rating": 3.93,
            "url": "https://untappd.com/b/4brewers-nichego-svyatogo/3334047"
        },
        {
            "title": "Зависимость [CURRY]",
            "type": "Sour - Other Gose",
            "rating": 4.12,
            "url": "https://untappd.com/b/4brewers-zavisimost-curry/3495271"
        },
        {
            "title": "Pale Blue Dot",
            "type": "IPA - Imperial / Double",
            "rating": 3.88,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-pale-blue-dot/1771799"
        },
        {
            "title": "Ether [Passion Fruit]",
            "type": "IPA - Sour",
            "rating": 3.95,
            "url": "https://untappd.com/b/4brewers-ether-passion-fruit/3134771"
        },
        {
            "title": "Иштар",
            "type": "Sour - Fruited",
            "rating": 4.18,
            "url": "https://untappd.com/b/4brewers-ishtar/4544136"
        },
        {
            "title": "Копоть Черной Пантеры",
            "type": "Smoked Beer",
            "rating": 3.76,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-kopot-chernoj-pantery/1051772"
        },
        {
            "title": "Broken Pattern",
            "type": "Sour - Fruited",
            "rating": 4.06,
            "url": "https://untappd.com/b/4brewers-broken-pattern/3427039"
        },
        {
            "title": "Магия [Blackcurrant + Cherry + Chocolate & Date Syrup]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.13,
            "url": "https://untappd.com/b/4brewers-magiya-blackcurrant-cherry-chocolate-and-date-syrup/3975031"
        },
        {
            "title": "Доза [Orange Pulp + Mango + Pineapple]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.25,
            "url": "https://untappd.com/b/4brewers-doza-orange-pulp-mango-pineapple/4025829"
        },
        {
            "title": "Жажда [LIME]",
            "type": "Sour - Fruited Gose",
            "rating": 3.87,
            "url": "https://untappd.com/b/4brewers-zhazhda-lime/2169938"
        },
        {
            "title": "Доза [Blackcurrant + Strawberry + Cranberry + Raspberry + Cherry]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.21,
            "url": "https://untappd.com/b/4brewers-doza-blackcurrant-strawberry-cranberry-raspberry-cherry/4114522"
        },
        {
            "title": "ЗОЖ",
            "type": "Sour - Other Gose",
            "rating": 3.82,
            "url": "https://untappd.com/b/4brewers-zozh/3235080"
        },
        {
            "title": "Унесенные витом (Gone With the Wit)",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.6,
            "url": "https://untappd.com/b/4brewers-unesennye-vitom-gone-with-the-wit/1701250"
        },
        {
            "title": "TURN [Pineapple+Mint]",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 4.09,
            "url": "https://untappd.com/b/4brewers-turn-pineapple-mint/4287071"
        },
        {
            "title": "Доза [Banana + Blueberry]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.12,
            "url": "https://untappd.com/b/4brewers-doza-banana-blueberry/3954788"
        },
        {
            "title": "Прятки",
            "type": "IPA - Triple",
            "rating": 3.91,
            "url": "https://untappd.com/b/4brewers-ru-pryatki/2619968"
        },
        {
            "title": "Rave",
            "type": "IPA - New England / Hazy",
            "rating": 3.88,
            "url": "https://untappd.com/b/4brewers-rave/4114507"
        },
        {
            "title": "Вброс [Citra]",
            "type": "Pale Ale - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-vbros-citra/1875410"
        },
        {
            "title": "Emergency Exit",
            "type": "IPA - Quadruple",
            "rating": 4.01,
            "url": "https://untappd.com/b/4brewers-emergency-exit/4182892"
        },
        {
            "title": "Шум",
            "type": "IPA - Milkshake",
            "rating": 3.84,
            "url": "https://untappd.com/b/4brewers-ru-shum/2523410"
        },
        {
            "title": "Зависимость Укропная",
            "type": "Sour - Other Gose",
            "rating": 4.11,
            "url": "https://untappd.com/b/4brewers-zavisimost-ukropnaya/4725101"
        },
        {
            "title": "Двойная Доза [Banana + Strawberry]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.12,
            "url": "https://untappd.com/b/4brewers-dvojnaya-doza-banana-strawberry/3954786"
        },
        {
            "title": "Двойная доза [Banana + Guava + Mango]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.21,
            "url": "https://untappd.com/b/4brewers-dvojnaya-doza-banana-guava-mango/3904620"
        },
        {
            "title": "Salsa",
            "type": "Chilli / Chile Beer",
            "rating": 3.25,
            "url": "https://untappd.com/b/4brewers-ru-salsa/2070267"
        },
        {
            "title": "Удар Дзюдо",
            "type": "Sour - Fruited",
            "rating": 3.76,
            "url": "https://untappd.com/b/4brewers-udar-dzyudo/1733172"
        },
        {
            "title": "BODYPOSITIVE",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.12,
            "url": "https://untappd.com/b/4brewers-bodypositive/4355600"
        },
        {
            "title": "Hot Shot [Mango+Passion Fruit+Habanero+Curry]",
            "type": "Chilli / Chile Beer",
            "rating": 4.11,
            "url": "https://untappd.com/b/4brewers-hot-shot-mango-passion-fruit-habanero-curry/4627561"
        },
        {
            "title": "Зависимость [MUSTARD]",
            "type": "Sour - Other Gose",
            "rating": 3.91,
            "url": "https://untappd.com/b/4brewers-zavisimost-mustard/4114504"
        },
        {
            "title": "Зависимость [Болгарский перец]",
            "type": "Sour - Other Gose",
            "rating": 4.22,
            "url": "https://untappd.com/b/4brewers-zavisimost-bolgarskij-perec/5061562"
        },
        {
            "title": "Доза [Apple + Pear + Goosberry + Vanilla]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.09,
            "url": "https://untappd.com/b/4brewers-doza-apple-pear-goosberry-vanilla/4355606"
        },
        {
            "title": "Доза [Black Currant]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.16,
            "url": "https://untappd.com/b/4brewers-doza-black-currant/3380906"
        },
        {
            "title": "Доза [Banana + Strawberry]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.15,
            "url": "https://untappd.com/b/4brewers-doza-banana-strawberry/3850904"
        },
        {
            "title": "Жажда [Облепиха]",
            "type": "Sour - Fruited Gose",
            "rating": 3.88,
            "url": "https://untappd.com/b/4brewers-zhazhda-oblepiha/2575473"
        },
        {
            "title": "Магия [Blackcurrant + Date Syrup & Mint]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.13,
            "url": "https://untappd.com/b/4brewers-magiya-blackcurrant-date-syrup-and-mint/3728026"
        },
        {
            "title": "Вброс [Mosaic]",
            "type": "Pale Ale - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/4brewers-vbros-mosaic/1622895"
        },
        {
            "title": "GIRAFFE MILK",
            "type": "Sour - Fruited",
            "rating": 3.95,
            "url": "https://untappd.com/b/4brewers-giraffe-milk/4355602"
        },
        {
            "title": "Santa Muerte Pasteleria",
            "type": "Stout - Coffee",
            "rating": 3.88,
            "url": "https://untappd.com/b/4brewers-santa-muerte-pasteleria/4433684"
        },
        {
            "title": "DANGER MUSIC",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.82,
            "url": "https://untappd.com/b/4brewers-danger-music/4355601"
        },
        {
            "title": "Не Кричи На Кимчи",
            "type": "Sour - Other Gose",
            "rating": 4.26,
            "url": "https://untappd.com/b/4brewers-ne-krichi-na-kimchi/5171197"
        },
        {
            "title": "Splash Up",
            "type": "Pale Ale - Milkshake",
            "rating": 3.73,
            "url": "https://untappd.com/b/4brewers-splash-up/3251746"
        },
        {
            "title": "Cooking Guide [Lemon Pie]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.95,
            "url": "https://untappd.com/b/4brewers-cooking-guide-lemon-pie/4627556"
        },
        {
            "title": "Monday Breakfast Stout",
            "type": "Stout - Milk / Sweet",
            "rating": 3.72,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-monday-breakfast-stout/1051758"
        },
        {
            "title": "Удар дзюдо [двойной]",
            "type": "Sour - Other",
            "rating": 3.97,
            "url": "https://untappd.com/b/4brewers-udar-dzyudo-dvojnoj/3071540"
        },
        {
            "title": "Дистанция",
            "type": "Stout - Pastry",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-distanciya/4039519"
        },
        {
            "title": "Anonymous Cookie Lovers Club",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.05,
            "url": "https://untappd.com/b/4brewers-anonymous-cookie-lovers-club/4544137"
        },
        {
            "title": "Доза [Peach+Apricot+Pineapple+Vanilla]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.24,
            "url": "https://untappd.com/b/4brewers-doza-peach-apricot-pineapple-vanilla/4627565"
        },
        {
            "title": "Доза [Blackcurrant + Raspberry]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.13,
            "url": "https://untappd.com/b/4brewers-doza-blackcurrant-raspberry/3360415"
        },
        {
            "title": "Зависимость [Красный Базилик]",
            "type": "Sour - Other Gose",
            "rating": 4.19,
            "url": "https://untappd.com/b/4brewers-zavisimost-krasnyj-bazilik/4919632"
        },
        {
            "title": "Жажда [Малина]",
            "type": "Sour - Fruited Gose",
            "rating": 3.85,
            "url": "https://untappd.com/b/4brewers-zhazhda-malina/2678767"
        },
        {
            "title": "Доза [Mango]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.12,
            "url": "https://untappd.com/b/4brewers-doza-mango/3360420"
        },
        {
            "title": "Drink Eat Sleep Repeat",
            "type": "Sour - Other Gose",
            "rating": 3.93,
            "url": "https://untappd.com/b/4brewers-drink-eat-sleep-repeat/4918539"
        },
        {
            "title": "Возмездие",
            "type": "Porter - Other",
            "rating": 3.82,
            "url": "https://untappd.com/b/4brewers-vozmezdie/3009898"
        },
        {
            "title": "Neuro Juice",
            "type": "Sour - Fruited",
            "rating": 4.19,
            "url": "https://untappd.com/b/4brewers-neuro-juice/5061563"
        },
        {
            "title": "Two Tickets In the First Row",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 3.88,
            "url": "https://untappd.com/b/4brewers-two-tickets-in-the-first-row/4647816"
        },
        {
            "title": "Ether [Peach]",
            "type": "IPA - Sour",
            "rating": 3.93,
            "url": "https://untappd.com/b/4brewers-ether-peach/3215577"
        },
        {
            "title": "Зависимость [Кинза]",
            "type": "Sour - Other Gose",
            "rating": 4.05,
            "url": "https://untappd.com/b/4brewers-zavisimost-kinza/4919630"
        },
        {
            "title": "Рацион",
            "type": "Sour - Fruited",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-racion/4109947"
        },
        {
            "title": "C is for Cookie",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 3.89,
            "url": "https://untappd.com/b/4brewers-c-is-for-cookie/4627559"
        },
        {
            "title": "Изыди",
            "type": "Stout - Imperial / Double",
            "rating": 3.92,
            "url": "https://untappd.com/b/4brewers-ru-izydi/2610577"
        },
        {
            "title": "Вторая личность [Pastry]",
            "type": "Porter - Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/4brewers-vtoraya-lichnost-pastry/3428176"
        },
        {
            "title": "Гипноз",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.09,
            "url": "https://untappd.com/b/4brewers-gipnoz/4753094"
        },
        {
            "title": "Верность",
            "type": "IPA - American",
            "rating": 3.77,
            "url": "https://untappd.com/b/4brewers-vernost/4545973"
        },
        {
            "title": "Lucha Fighter",
            "type": "IPA - Rye",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-lucha-fighter/1790290"
        },
        {
            "title": "Доза [Mango + Strawberry]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.23,
            "url": "https://untappd.com/b/4brewers-doza-mango-strawberry/4725104"
        },
        {
            "title": "Двойная доза [Mango + Pineapple]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.22,
            "url": "https://untappd.com/b/4brewers-dvojnaya-doza-mango-pineapple/3622471"
        },
        {
            "title": "Страна лентяев 2022 [BA Blend]",
            "type": "Mead - Braggot",
            "rating": 4.25,
            "url": "https://untappd.com/b/4brewers-strana-lentyaev-2022-ba-blend/4808132"
        },
        {
            "title": "Cooking Guide [Blueberry Pie]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.25,
            "url": "https://untappd.com/b/4brewers-cooking-guide-blueberry-pie/5054541"
        },
        {
            "title": "Mental Health [Black Currant]",
            "type": "Sour - Fruited",
            "rating": 3.97,
            "url": "https://untappd.com/b/4brewers-mental-health-black-currant/3274046"
        },
        {
            "title": "ILOVEYOU",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/4brewers-ru-iloveyou/2896271"
        },
        {
            "title": "Динозаврический магнетизм",
            "type": "IPA - Imperial / Double",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-ru-dinozavricheskij-magnetizm/2103758"
        },
        {
            "title": "Игла / IGLA",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/4brewers-ru-igla-igla/1896286"
        },
        {
            "title": "Копоть кислой пантеры",
            "type": "Sour - Other",
            "rating": 3.69,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-kopot-kisloj-pantery/1733171"
        },
        {
            "title": "Стереотип",
            "type": "Sour - Fruited",
            "rating": 3.9,
            "url": "https://untappd.com/b/4brewers-stereotip/4473302"
        },
        {
            "title": "Pure Ether [Passion Fruit]",
            "type": "IPA - Sour",
            "rating": 4.07,
            "url": "https://untappd.com/b/4brewers-pure-ether-passion-fruit/3251749"
        },
        {
            "title": "Splash Up [Mango]",
            "type": "Pale Ale - Milkshake",
            "rating": 3.93,
            "url": "https://untappd.com/b/4brewers-splash-up-mango/3360668"
        },
        {
            "title": "Двойная Доза [Kiwi + Strawberry]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.7,
            "url": "https://untappd.com/b/4brewers-dvojnaya-doza-kiwi-strawberry/3954787"
        },
        {
            "title": "OUOUOU",
            "type": "Sour - Fruited",
            "rating": 3.87,
            "url": "https://untappd.com/b/4brewers-ououou/4375342"
        },
        {
            "title": "Splash Up [Melon]",
            "type": "Pale Ale - Milkshake",
            "rating": 3.77,
            "url": "https://untappd.com/b/4brewers-splash-up-melon/3251747"
        },
        {
            "title": "Cooking Guide [Cherry Cheesecake]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.1,
            "url": "https://untappd.com/b/4brewers-cooking-guide-cherry-cheesecake/4753098"
        },
        {
            "title": "Рехаб",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.61,
            "url": "https://untappd.com/b/4brewers-rehab/4483492"
        },
        {
            "title": "Доза [Mango + Pineapple]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.2,
            "url": "https://untappd.com/b/4brewers-doza-mango-pineapple/3871886"
        },
        {
            "title": "СУДЬБА",
            "type": "Stout - Imperial / Double",
            "rating": 4.28,
            "url": "https://untappd.com/b/4brewers-sudba/4753099"
        },
        {
            "title": "Жажда [Грейпфрут]",
            "type": "Sour - Fruited Gose",
            "rating": 3.83,
            "url": "https://untappd.com/b/4brewers-zhazhda-grejpfrut/4457541"
        },
        {
            "title": "Update",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.13,
            "url": "https://untappd.com/b/4brewers-update/4979052"
        },
        {
            "title": "Вброс [Galaxy]",
            "type": "Pale Ale - American",
            "rating": 3.71,
            "url": "https://untappd.com/b/4brewers-vbros-galaxy/2301539"
        },
        {
            "title": "Kiki & Bouba",
            "type": "Sour - Other",
            "rating": 3.5,
            "url": "https://untappd.com/b/4brewers-kiki-and-bouba/4498131"
        },
        {
            "title": "High Dispersion [Citra + Mosaic]",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-high-dispersion/3496177"
        },
        {
            "title": "Двойная Доза [Melon + Strawberry]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.62,
            "url": "https://untappd.com/b/4brewers-dvojnaya-doza-melon-strawberry/3954785"
        },
        {
            "title": "ШУМ [Citra + Mosaic]",
            "type": "IPA - Milkshake",
            "rating": 3.9,
            "url": "https://untappd.com/b/4brewers-shum-citra-mosaic/3008902"
        },
        {
            "title": "Oh My Juice [ORANGE]",
            "type": "IPA - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-ru-oh-my-juice-orange/2033711"
        },
        {
            "title": "Super Neuro Juice",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.32,
            "url": "https://untappd.com/b/4brewers-super-neuro-juice/5202056"
        },
        {
            "title": "Безмятежность",
            "type": "IPA - Session",
            "rating": 3.68,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-bezmyatezhnost/1622899"
        },
        {
            "title": "Доза [Orange Pulp+Guava+Mango]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.1,
            "url": "https://untappd.com/b/4brewers-doza-orange-pulp-guava-mango/4154705"
        },
        {
            "title": "Доза [Mango + Peach + Orange]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.2,
            "url": "https://untappd.com/b/4brewers-doza-mango-peach-orange/3871898"
        },
        {
            "title": "Фрагмент",
            "type": "Wild Ale - Other",
            "rating": 3.87,
            "url": "https://untappd.com/b/4brewers-fragment/4486690"
        },
        {
            "title": "Доза [Mango + Raspberry]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.03,
            "url": "https://untappd.com/b/4brewers-doza-mango-raspberry/4546066"
        },
        {
            "title": "Принеси Подай",
            "type": "Sour - Other Gose",
            "rating": 4.18,
            "url": "https://untappd.com/b/4brewers-prinesi-podaj/5167594"
        },
        {
            "title": "Жажда [Чёрная смородина]",
            "type": "Sour - Fruited Gose",
            "rating": 3.81,
            "url": "https://untappd.com/b/4brewers-zhazhda-chyornaya-smorodina/2746440"
        },
        {
            "title": "Доза [Banana + Mango + Passion Fruit]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.24,
            "url": "https://untappd.com/b/4brewers-doza-banana-mango-passion-fruit/4433434"
        },
        {
            "title": "1/2",
            "type": "Sour - Fruited",
            "rating": 3.6,
            "url": "https://untappd.com/b/4brewers-1-2/4725102"
        },
        {
            "title": "ЗОЖ [Cucumber + Lime + Mint]",
            "type": "Sour - Other Gose",
            "rating": 3.75,
            "url": "https://untappd.com/b/4brewers-zozh-cucumber-lime-mint/4958365"
        },
        {
            "title": "Ребус",
            "type": "IPA - New England / Hazy",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-rebus/4753091"
        },
        {
            "title": "Turn [Basil+Lime]",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.91,
            "url": "https://untappd.com/b/4brewers-turn-basil-lime/5000653"
        },
        {
            "title": "Чёткость [Wai-iti]",
            "type": "IPA - American",
            "rating": 3.67,
            "url": "https://untappd.com/b/4brewers-chyotkost-wai-iti/4918547"
        },
        {
            "title": "Доза [Mango + Pineapple + Grapefruit]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.31,
            "url": "https://untappd.com/b/4brewers-doza-mango-pineapple-grapefruit/4989686"
        },
        {
            "title": "Мир Дружба Жвачка",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.08,
            "url": "https://untappd.com/b/4brewers-mir-druzhba-zhvachka/4958368"
        },
        {
            "title": "Cooking Guide [Forest Berry Pie]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.24,
            "url": "https://untappd.com/b/4brewers-cooking-guide-forest-berry-pie/5202057"
        },
        {
            "title": "Страна лентяев 2019 [BA Glendronach Single Malt Whisky]",
            "type": "Mead - Braggot",
            "rating": 4.24,
            "url": "https://untappd.com/b/4brewers-ru-strana-lentyaev-2019-ba-glendronach-single-malt-whisky/3167300"
        },
        {
            "title": "ЗОЖ HOT",
            "type": "Sour - Other Gose",
            "rating": 3.76,
            "url": "https://untappd.com/b/4brewers-zozh-hot/3918020"
        },
        {
            "title": "Silky",
            "type": "Sour - Fruited",
            "rating": 3.96,
            "url": "https://untappd.com/b/4brewers-silky/5228184"
        },
        {
            "title": "Роксана и бесконечная вселенная (Roksana And Endless Universe)",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.73,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-roksana-i-beskonechnaya-vselennaya-roksana-and-endless-universe/1593079"
        },
        {
            "title": "Тщеславие",
            "type": "Stout - Coffee",
            "rating": 3.84,
            "url": "https://untappd.com/b/4brewers-tsheslavie/3975033"
        },
        {
            "title": "Зависимость [Базилик]",
            "type": "Sour - Other Gose",
            "rating": 4.22,
            "url": "https://untappd.com/b/4brewers-zavisimost-bazilik/4940897"
        },
        {
            "title": "Доза [Multifruit]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.29,
            "url": "https://untappd.com/b/4brewers-doza-multifruit/5087654"
        },
        {
            "title": "Моя жизнь никогда не станет прежней",
            "type": "Wild Ale - American",
            "rating": 4.2,
            "url": "https://untappd.com/b/4brewers-moya-zhizn-nikogda-ne-stanet-prezhnej/4709316"
        },
        {
            "title": "Air Ether",
            "type": "IPA - Sour",
            "rating": 3.97,
            "url": "https://untappd.com/b/4brewers-air-ether/4268584"
        },
        {
            "title": "Nutster",
            "type": "Brown Ale - Other",
            "rating": 3.69,
            "url": "https://untappd.com/b/4brewers-ru-nutster/2070268"
        },
        {
            "title": "Элементарно",
            "type": "Stout - Oatmeal",
            "rating": 3.74,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-elementarno/1622901"
        },
        {
            "title": "Мир, в котором не существует даже намека на гуманизм со стороны человекоподобных роботов",
            "type": "IPA - New England / Hazy",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-mir-v-kotorom-ne-sushestvuet-dazhe-nameka-na-gumanizm-so-storony-chelovekopodobnyh-robotov/5040458"
        },
        {
            "title": "Жажда [Малина, лайм, мята, ваниль]",
            "type": "Sour - Fruited Gose",
            "rating": 3.84,
            "url": "https://untappd.com/b/4brewers-zhazhda-malina-lajm-myata-vanil/2861173"
        },
        {
            "title": "Дружба",
            "type": "IPA - Sour",
            "rating": 3.86,
            "url": "https://untappd.com/b/4brewers-druzhba/4545978"
        },
        {
            "title": "Вброс [Simcoe]",
            "type": "Pale Ale - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/4brewers-vbros-simcoe/2644047"
        },
        {
            "title": "Пилигрим",
            "type": "Belgian Blonde",
            "rating": 3.65,
            "url": "https://untappd.com/b/4brewers-ru-piligrim/2410310"
        },
        {
            "title": "Вброс [Sabro+Mosaic]",
            "type": "Pale Ale - American",
            "rating": 3.81,
            "url": "https://untappd.com/b/4brewers-vbros-sabro-mosaic/4336278"
        },
        {
            "title": "Фора",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.7,
            "url": "https://untappd.com/b/4brewers-fora/4958366"
        },
        {
            "title": "Двойная доза [Banana + Raspberry]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.04,
            "url": "https://untappd.com/b/4brewers-dvojnaya-doza-banana-raspberry/3974290"
        },
        {
            "title": "Характер [с облепихой]",
            "type": "Sour - Fruited",
            "rating": 3.99,
            "url": "https://untappd.com/b/4brewers-harakter-s-oblepihoj/2823668"
        },
        {
            "title": "Dispersion [Citra + Lemondrop]",
            "type": "IPA - New England / Hazy",
            "rating": 3.73,
            "url": "https://untappd.com/b/4brewers-dispersion-citra-lemondrop/3427045"
        },
        {
            "title": "Вброс [Galaxy + Mosaic]",
            "type": "Pale Ale - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/4brewers-vbros-galaxy-mosaic/3636575"
        },
        {
            "title": "Жажда [Красная смородина]",
            "type": "Sour - Fruited Gose",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-zhazhda-krasnaya-smorodina/2596200"
        },
        {
            "title": "Взлом",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 3.99,
            "url": "https://untappd.com/b/4brewers-vzlom/4918543"
        },
        {
            "title": "TURN [Pomegranate+Cranberry]",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 4.02,
            "url": "https://untappd.com/b/4brewers-turn-pomegranate-cranberry/4288217"
        },
        {
            "title": "Dispersion [Citra + Mosaic + African Queen]",
            "type": "IPA - New England / Hazy",
            "rating": 3.83,
            "url": "https://untappd.com/b/4brewers-dispersion-citra-mosaic-african-queen/3427042"
        },
        {
            "title": "Жажда [MELON]",
            "type": "Sour - Fruited Gose",
            "rating": 3.71,
            "url": "https://untappd.com/b/4brewers-zhazhda-melon/2266212"
        },
        {
            "title": "А вы точно из бухгалтерии?",
            "type": "IPA - New England / Hazy",
            "rating": 3.93,
            "url": "https://untappd.com/b/4brewers-a-vy-tochno-iz-buhgalterii/5235433"
        },
        {
            "title": "Sweet Deal X2",
            "type": "Stout - Imperial / Double",
            "rating": 3.92,
            "url": "https://untappd.com/b/4brewers-sweet-deal-x2/3926561"
        },
        {
            "title": "Аффирмация",
            "type": "IPA - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-affirmaciya/4627563"
        },
        {
            "title": "Адаптация",
            "type": "Sour - Fruited",
            "rating": 4.1,
            "url": "https://untappd.com/b/4brewers-adaptaciya/5263525"
        },
        {
            "title": "Доза [Pineapple+Passionfruit+Pink Guava+Mango]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.24,
            "url": "https://untappd.com/b/4brewers-doza-pineapple-passionfruit-pink-guava-mango/4254554"
        },
        {
            "title": "Доза [Guava + Mango]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.04,
            "url": "https://untappd.com/b/4brewers-doza-guava-mango/3718268"
        },
        {
            "title": "Вброс [Idaho Gem]",
            "type": "Pale Ale - American",
            "rating": 3.65,
            "url": "https://untappd.com/b/4brewers-vbros-idaho-gem/3577499"
        },
        {
            "title": "Страна Лентяев 2020 [BA Cabernet Sauvignon]",
            "type": "Mead - Braggot",
            "rating": 4.26,
            "url": "https://untappd.com/b/4brewers-strana-lentyaev-2020-ba-cabernet-sauvignon/4218971"
        },
        {
            "title": "Паранойя [Raspberry]",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.25,
            "url": "https://untappd.com/b/4brewers-paranojya-raspberry/4627571"
        },
        {
            "title": "Доза [Raspberry, Mango & Lime]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.16,
            "url": "https://untappd.com/b/4brewers-doza-raspberry-mango-and-lime/3380908"
        },
        {
            "title": "Kiss My Soul",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4,
            "url": "https://untappd.com/b/4brewers-kiss-my-soul/5171196"
        },
        {
            "title": "Pure Ether [Pineapple]",
            "type": "IPA - Sour",
            "rating": 3.88,
            "url": "https://untappd.com/b/4brewers-pure-ether-pineapple/3235108"
        },
        {
            "title": "Вброс [Idaho 7+Azacca+Citra]",
            "type": "Pale Ale - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-vbros-idaho-7-azacca-citra/4268627"
        },
        {
            "title": "Характер [BA 2020]",
            "type": "Sour - Other",
            "rating": 4.04,
            "url": "https://untappd.com/b/4brewers-harakter-ba-2020/4072488"
        },
        {
            "title": "TURN [Strawberry]",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.57,
            "url": "https://untappd.com/b/4brewers-turn-strawberry/4958367"
        },
        {
            "title": "Вброс [HBC 735]",
            "type": "Pale Ale - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-vbros-hbc-735/4537052"
        },
        {
            "title": "Тайна",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.84,
            "url": "https://untappd.com/b/4brewers-ru-tajna/2650774"
        },
        {
            "title": "TURN [Raspberry + Lime]",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.64,
            "url": "https://untappd.com/b/4brewers-turn-raspberry-lime/4409987"
        },
        {
            "title": "Доза [Peach]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.92,
            "url": "https://untappd.com/b/4brewers-doza-peach/3380909"
        },
        {
            "title": "Доза [Mango + Orange]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.09,
            "url": "https://untappd.com/b/4brewers-doza-mango-orange/3902741"
        },
        {
            "title": "Decomposition",
            "type": "IPA - Sour",
            "rating": 3.86,
            "url": "https://untappd.com/b/4brewers-decomposition/4375340"
        },
        {
            "title": "Разум",
            "type": "IPA - White / Wheat",
            "rating": 3.76,
            "url": "https://untappd.com/b/4brewers-razum/4753095"
        },
        {
            "title": "Точка J",
            "type": "Sour - Fruited",
            "rating": 3.76,
            "url": "https://untappd.com/b/4brewers-tochka-j/2108268"
        },
        {
            "title": "ДАО",
            "type": "Barleywine - Other",
            "rating": 3.88,
            "url": "https://untappd.com/b/4brewers-dao/4419756"
        },
        {
            "title": "Жажда [Апельсин + Грейпфрут]",
            "type": "Sour - Fruited Gose",
            "rating": 3.63,
            "url": "https://untappd.com/b/4brewers-zhazhda-apelsin-grejpfrut/4627568"
        },
        {
            "title": "Грех",
            "type": "Stout - Imperial / Double",
            "rating": 3.88,
            "url": "https://untappd.com/b/4brewers-greh/3647820"
        },
        {
            "title": "Скрытый смысл [Blueberry Coconut]",
            "type": "Sour - Fruited",
            "rating": 3.74,
            "url": "https://untappd.com/b/4brewers-skrytyj-smysl-blueberry-coconut/3274050"
        },
        {
            "title": "Вброс [Lemondrop + Idaho 7]",
            "type": "Pale Ale - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-vbros-lemondrop-idaho-7/3183152"
        },
        {
            "title": "Cooking Guide [Key Lime Pie]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.88,
            "url": "https://untappd.com/b/4brewers-cooking-guide-key-lime-pie/5272313"
        },
        {
            "title": "Black Jesus White Pepper",
            "type": "Porter - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-black-jesus-white-pepper/1794399"
        },
        {
            "title": "Оккультизм",
            "type": "Barleywine - Other",
            "rating": 4.18,
            "url": "https://untappd.com/b/4brewers-okkultizm/4391383"
        },
        {
            "title": "Кредо",
            "type": "IPA - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/4brewers-ru-kredo/3071538"
        },
        {
            "title": "Кислый парень [BCD]",
            "type": "Sour - Other",
            "rating": 4.15,
            "url": "https://untappd.com/b/4brewers-kislyj-paren-bcd/2650772"
        },
        {
            "title": "Жажда [APRICOT]",
            "type": "Sour - Fruited Gose",
            "rating": 3.99,
            "url": "https://untappd.com/b/4brewers-zhazhda-apricot/2302981"
        },
        {
            "title": "Вброс [Idaho Gem, Mosaic, Ariana]",
            "type": "Pale Ale - American",
            "rating": 3.89,
            "url": "https://untappd.com/b/4brewers-vbros-idaho-gem-mosaic-ariana/3414383"
        },
        {
            "title": "Страна лентяев 2019 [BA Rum]",
            "type": "Mead - Braggot",
            "rating": 4.26,
            "url": "https://untappd.com/b/4brewers-strana-lentyaev-2019-ba-rum/3459731"
        },
        {
            "title": "Пиньята V2",
            "type": "Pumpkin / Yam Beer",
            "rating": 3.67,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-pinyata-v2/1702176"
        },
        {
            "title": "Вброс [Amarillo + Sabro]",
            "type": "Pale Ale - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-vbros-amarillo-sabro/3681269"
        },
        {
            "title": "Бессонница",
            "type": "Brown Ale - Other",
            "rating": 3.67,
            "url": "https://untappd.com/b/4brewers-ru-bessonnica/2592204"
        },
        {
            "title": "Забвение [BA Witbier]",
            "type": "Wheat Beer - Other",
            "rating": 3.89,
            "url": "https://untappd.com/b/4brewers-zabvenie-ba-witbier/4098713"
        },
        {
            "title": "Доза [Banana + Grapefruit]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.16,
            "url": "https://untappd.com/b/4brewers-doza-banana-grapefruit/5220354"
        },
        {
            "title": "Страна лентяев 2018",
            "type": "Mead - Braggot",
            "rating": 3.98,
            "url": "https://untappd.com/b/4brewers-ru-strana-lentyaev-2018/2491324"
        },
        {
            "title": "Вброс [Cashmere + Idaho 7 + Simcoe]",
            "type": "Pale Ale - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/4brewers-vbros-cashmere-idaho-7-simcoe/3728024"
        },
        {
            "title": "Вброс [Talus]",
            "type": "Pale Ale - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/4brewers-vbros-talus/5087655"
        },
        {
            "title": "Теплообмен",
            "type": "Sour - Other",
            "rating": 3.61,
            "url": "https://untappd.com/b/4brewers-ru-teploobmen/3071536"
        },
        {
            "title": "Вброс [Vista]",
            "type": "Pale Ale - American",
            "rating": 3.63,
            "url": "https://untappd.com/b/4brewers-vbros-vista/5054546"
        },
        {
            "title": "Вброс [Simcoe + Citra]",
            "type": "Pale Ale - American",
            "rating": 3.58,
            "url": "https://untappd.com/b/4brewers-vbros-simcoe-citra/4725108"
        },
        {
            "title": "Унесенные Витом [Зимняя версия]",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.61,
            "url": "https://untappd.com/b/4brewers-unesennye-vitom-zimnyaya-versiya/4154702"
        },
        {
            "title": "Pourqoi Pas [BA Cabernet Sauvignon]",
            "type": "Sour - Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/4brewers-ru-pourqoi-pas-ba-cabernet-sauvignon/2908668"
        },
        {
            "title": "Доза [Apricot+Passion Fruit]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.09,
            "url": "https://untappd.com/b/4brewers-doza-apricot-passion-fruit/4876643"
        },
        {
            "title": "Скрытый смысл [Strawberry Coconut]",
            "type": "Sour - Fruited",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-skrytyj-smysl-strawberry-coconut/3318148"
        },
        {
            "title": "Идея Фикс",
            "type": "IPA - Milkshake",
            "rating": 3.77,
            "url": "https://untappd.com/b/4brewers-ideya-fiks/4688931"
        },
        {
            "title": "Ether [Melon]",
            "type": "IPA - Sour",
            "rating": 3.92,
            "url": "https://untappd.com/b/4brewers-ether-melon/3215578"
        },
        {
            "title": "Вброс [Amarillo Denali]",
            "type": "Pale Ale - American",
            "rating": 3.72,
            "url": "https://untappd.com/b/4brewers-vbros-amarillo-denali/3274052"
        },
        {
            "title": "Make Me Russian",
            "type": "Stout - Russian Imperial",
            "rating": 4.11,
            "url": "https://untappd.com/b/4brewers-make-me-russian/3918006"
        },
        {
            "title": "Старуха и медведь 2019",
            "type": "Belgian Quadrupel",
            "rating": 3.88,
            "url": "https://untappd.com/b/4brewers-ru-staruha-i-medved-2019/3235062"
        },
        {
            "title": "Скрытый смысл [Raspberry Coconut]",
            "type": "Sour - Fruited",
            "rating": 3.98,
            "url": "https://untappd.com/b/4brewers-skrytyj-smysl-raspberry-coconut/3334048"
        },
        {
            "title": "Каждый хочет стать космонавтом",
            "type": "IPA - New England / Hazy",
            "rating": 3.7,
            "url": "https://untappd.com/b/4brewers-ru-kazhdyj-hochet-stat-kosmonavtom/2924496"
        },
        {
            "title": "Зависимость [Мята]",
            "type": "Sour - Other Gose",
            "rating": 3.92,
            "url": "https://untappd.com/b/4brewers-zavisimost-myata/5283210"
        },
        {
            "title": "Dispersion [Citra + Comet]",
            "type": "IPA - New England / Hazy",
            "rating": 3.84,
            "url": "https://untappd.com/b/4brewers-dispersion-citra-comet/3475092"
        },
        {
            "title": "Coffee Breaker",
            "type": "Sour - Fruited",
            "rating": 3.62,
            "url": "https://untappd.com/b/4brewers-coffee-breaker/5263504"
        },
        {
            "title": "Страна Лентяев 2020 [BA Whiskey]",
            "type": "Mead - Braggot",
            "rating": 4.22,
            "url": "https://untappd.com/b/4brewers-strana-lentyaev-2020-ba-whiskey/3979115"
        },
        {
            "title": "Шабаш",
            "type": "Pumpkin / Yam Beer",
            "rating": 3.71,
            "url": "https://untappd.com/b/4brewers-ru-shabash/2322562"
        },
        {
            "title": "Вброс [HBC 472+Galaxy]",
            "type": "Pale Ale - American",
            "rating": 3.71,
            "url": "https://untappd.com/b/4brewers-vbros-hbc-472-galaxy/4307385"
        },
        {
            "title": "СУДЬБА 2021 [BA Whiskey]",
            "type": "Stout - Imperial / Double",
            "rating": 4.27,
            "url": "https://untappd.com/b/4brewers-sudba-2021-ba-whiskey/4983676"
        },
        {
            "title": "Вброс [HBC 630+Simcoe]",
            "type": "Pale Ale - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-vbros-hbc-630-simcoe/4373167"
        },
        {
            "title": "Mental Health [Raspberry]",
            "type": "Sour - Fruited",
            "rating": 3.86,
            "url": "https://untappd.com/b/4brewers-mental-health-raspberry/3415676"
        },
        {
            "title": "Santa Muerte Dulce",
            "type": "Stout - Coffee",
            "rating": 3.89,
            "url": "https://untappd.com/b/4brewers-santa-muerte-dulce/3350253"
        },
        {
            "title": "Скрытый смысл [Feijoa Coconut]",
            "type": "Sour - Fruited",
            "rating": 3.94,
            "url": "https://untappd.com/b/4brewers-skrytyj-smysl-feijoa-coconut/3009897"
        },
        {
            "title": "Вброс [Citra Incognito]",
            "type": "Pale Ale - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-vbros-citra-incognito/5008380"
        },
        {
            "title": "Шум [Citra + Mosaic + Idaho7 + Idaho Gem]",
            "type": "IPA - Milkshake",
            "rating": 3.82,
            "url": "https://untappd.com/b/4brewers-shum-citra-mosaic-idaho7-idaho-gem/3139116"
        },
        {
            "title": "High Dispersion [Idaho Gem + Mosaic]",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.73,
            "url": "https://untappd.com/b/4brewers-high-dispersion-idaho-gem-mosaic/3728025"
        },
        {
            "title": "Жажда [Фейхоа]",
            "type": "Sour - Fruited Gose",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-zhazhda-fejhoa/3541227"
        },
        {
            "title": "Характер [с красной смородиной]",
            "type": "Sour - Fruited",
            "rating": 3.74,
            "url": "https://untappd.com/b/4brewers-harakter-s-krasnoj-smorodinoj/3647908"
        },
        {
            "title": "Вброс [Triumph]",
            "type": "Pale Ale - American",
            "rating": 3.66,
            "url": "https://untappd.com/b/4brewers-vbros-triumph/5099426"
        },
        {
            "title": "Страна Лентяев 2020 [BA Bourbon]",
            "type": "Mead - Braggot",
            "rating": 4.24,
            "url": "https://untappd.com/b/4brewers-strana-lentyaev-2020-ba-bourbon/3979121"
        },
        {
            "title": "Mental Health [Citrus Mint]",
            "type": "Sour - Fruited",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-mental-health-citrus-mint/3274048"
        },
        {
            "title": "Характер [BA с вишней]",
            "type": "Sour - Fruited",
            "rating": 3.74,
            "url": "https://untappd.com/b/4brewers-harakter-ba-s-vishnej/4182909"
        },
        {
            "title": "Вброс [Simcoe+Galaxy]",
            "type": "Pale Ale - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/4brewers-vbros-simcoe-galaxy/4205059"
        },
        {
            "title": "Dispersion [Sabro + Lemondrop]",
            "type": "IPA - New England / Hazy",
            "rating": 3.73,
            "url": "https://untappd.com/b/4brewers-dispersion-sabro-lemondrop/3694001"
        },
        {
            "title": "Pure Ether [Mango + Passion Fruit]",
            "type": "IPA - Sour",
            "rating": 4.03,
            "url": "https://untappd.com/b/4brewers-pure-ether-mango-passion-fruit/3541491"
        },
        {
            "title": "Pure Ether [Raspberry + Blackberry]",
            "type": "IPA - Sour",
            "rating": 3.94,
            "url": "https://untappd.com/b/4brewers-pure-ether-raspberry-blackberry/3334053"
        },
        {
            "title": "High Dispersion [Mosaic + Centennial + Idaho Gem]",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.86,
            "url": "https://untappd.com/b/4brewers-high-dispersion-mosaic-centennial-idaho-gem/3694013"
        },
        {
            "title": "Dispersion [Lemondrop]",
            "type": "IPA - New England / Hazy",
            "rating": 3.69,
            "url": "https://untappd.com/b/4brewers-dispersion-lemondrop/3496180"
        },
        {
            "title": "Вброс [Zappa+Idaho Gem]",
            "type": "Pale Ale - American",
            "rating": 3.71,
            "url": "https://untappd.com/b/4brewers-vbros-zappa-idaho-gem/4013087"
        },
        {
            "title": "Изыди 2021 [BA Whiskey]",
            "type": "Stout - Imperial / Double",
            "rating": 4.16,
            "url": "https://untappd.com/b/4brewers-izydi-2021-ba-whiskey/4585317"
        },
        {
            "title": "Dispersion [Azacca + Citra + Centennial]",
            "type": "IPA - New England / Hazy",
            "rating": 3.85,
            "url": "https://untappd.com/b/4brewers-dispersion-azacca-citra-centennial/3577072"
        },
        {
            "title": "Ночь [COCONUT]",
            "type": "Stout - Imperial / Double",
            "rating": 4.07,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-noch-coconut/2019022"
        },
        {
            "title": "Dispersion [Citra + Cashmere]",
            "type": "IPA - New England / Hazy",
            "rating": 3.64,
            "url": "https://untappd.com/b/4brewers-dispersion-citra-cashmere/3728452"
        },
        {
            "title": "Dispersion [Amarillo + Idaho Gem + Citra]",
            "type": "IPA - New England / Hazy",
            "rating": 3.8,
            "url": "https://untappd.com/b/4brewers-dispersion-amarillo-idaho-gem-citra/3694038"
        },
        {
            "title": "Аскеза",
            "type": "Pale Ale - American",
            "rating": 3.62,
            "url": "https://untappd.com/b/4brewers-ru-askeza/2798836"
        },
        {
            "title": "Ярмарка",
            "type": "Porter - Other",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-ru-yarmarka/3057470"
        },
        {
            "title": "AGR-R-R",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.98,
            "url": "https://untappd.com/b/4brewers-agr-r-r/4990853"
        },
        {
            "title": "Вброс [Citra+ Azacca]",
            "type": "Pale Ale - American",
            "rating": 3.72,
            "url": "https://untappd.com/b/4brewers-vbros-citra-azacca/4888102"
        },
        {
            "title": "Вброс [Citra+Cashmere]",
            "type": "Pale Ale - American",
            "rating": 3.87,
            "url": "https://untappd.com/b/4brewers-vbros-citra-cashmere/4025825"
        },
        {
            "title": "Чёткость [Vic Secret + Galaxy]",
            "type": "IPA - American",
            "rating": 3.54,
            "url": "https://untappd.com/b/4brewers-chyotkost-vic-secret-galaxy/5028684"
        },
        {
            "title": "СУДЬБА 2022 [BA Whiskey]",
            "type": "Stout - Imperial / Double",
            "rating": 4.32,
            "url": "https://untappd.com/b/4brewers-sudba-2022-ba-whiskey/5138206"
        },
        {
            "title": "Вброс [Simcoe + Amarillo]",
            "type": "Pale Ale - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/4brewers-vbros-simcoe-amarillo/4725106"
        },
        {
            "title": "Удивительные приключения в Стране Лентяев",
            "type": "Mead - Braggot",
            "rating": 4.25,
            "url": "https://untappd.com/b/4brewers-udivitelnye-priklyucheniya-v-strane-lentyaev/4993890"
        },
        {
            "title": "Вброс [Vic Secret + Mosaic]",
            "type": "Pale Ale - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-vbros-vic-secret-mosaic/5235432"
        },
        {
            "title": "Жажда [Вишня, Малина]",
            "type": "Sour - Fruited Gose",
            "rating": 3.66,
            "url": "https://untappd.com/b/4brewers-zhazhda-vishnya-malina/4433436"
        },
        {
            "title": "Вброс [Columbus + Simcoe]",
            "type": "Pale Ale - American",
            "rating": 3.71,
            "url": "https://untappd.com/b/4brewers-vbros-columbus-simcoe/3525687"
        },
        {
            "title": "Splash Up [Peach]",
            "type": "Pale Ale - Milkshake",
            "rating": 3.72,
            "url": "https://untappd.com/b/4brewers-splash-up-peach/3334050"
        },
        {
            "title": "Ночь",
            "type": "Stout - Imperial / Double Milk",
            "rating": 4.05,
            "url": "https://untappd.com/b/4brewers-ru-noch/3227609"
        },
        {
            "title": "Доза [Red Papaya + Mango]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.06,
            "url": "https://untappd.com/b/4brewers-doza-red-papaya-mango/4972227"
        },
        {
            "title": "Вброс [Sabro Incognito]",
            "type": "Pale Ale - American",
            "rating": 3.6,
            "url": "https://untappd.com/b/4brewers-vbros-sabro-incognito/5000652"
        },
        {
            "title": "Страна Лентяев 2021 [BA Rum]",
            "type": "Mead - Braggot",
            "rating": 4.25,
            "url": "https://untappd.com/b/4brewers-strana-lentyaev-2021-ba-rum/4545042"
        },
        {
            "title": "Вброс [Idaho 7]",
            "type": "Pale Ale - American",
            "rating": 3.71,
            "url": "https://untappd.com/b/4brewers-vbros-idaho-7/3625655"
        },
        {
            "title": "Pure Ether [Raspberry + Mango]",
            "type": "IPA - Sour",
            "rating": 4.07,
            "url": "https://untappd.com/b/4brewers-pure-ether-raspberry-mango/3523960"
        },
        {
            "title": "Ночь [VANILLA]",
            "type": "Stout - Imperial / Double",
            "rating": 3.97,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-noch-vanilla/2019024"
        },
        {
            "title": "High Dispersion [Idaho Gem]",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.56,
            "url": "https://untappd.com/b/4brewers-high-dispersion-idaho-gem/3664998"
        },
        {
            "title": "Mental Health [Extra Black Currant]",
            "type": "Sour - Fruited",
            "rating": 3.93,
            "url": "https://untappd.com/b/4brewers-mental-health-extra-black-currant/4514443"
        },
        {
            "title": "Профилактика",
            "type": "IPA - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/4brewers-ru-profilaktika/2707587"
        },
        {
            "title": "Старуха и медведь 2018 [BA]",
            "type": "Belgian Quadrupel",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-ru-staruha-i-medved-2018-ba/2798878"
        },
        {
            "title": "Шум [Idaho 7+Mosaic]",
            "type": "IPA - Milkshake",
            "rating": 3.89,
            "url": "https://untappd.com/b/4brewers-shum-idaho-7-mosaic/4205060"
        },
        {
            "title": "Ether [Pineapple]",
            "type": "IPA - Sour",
            "rating": 3.76,
            "url": "https://untappd.com/b/4brewers-ether-pineapple/4328484"
        },
        {
            "title": "Шум [PEACH]",
            "type": "IPA - Milkshake",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-ru-shum-peach/2596198"
        },
        {
            "title": "Ночь [BOURBON BARREL]",
            "type": "Stout - Imperial / Double",
            "rating": 4.03,
            "url": "https://untappd.com/b/4brewers-ru-noch-bourbon-barrel/2266210"
        },
        {
            "title": "Шум [DDH Citra + Lemondrop]",
            "type": "IPA - Milkshake",
            "rating": 3.76,
            "url": "https://untappd.com/b/4brewers-shum-ddh-citra-lemondrop/2916947"
        },
        {
            "title": "Колдовство [Apricot]",
            "type": "Sour - Other",
            "rating": 3.96,
            "url": "https://untappd.com/b/4brewers-koldovstvo-apricot/4726926"
        },
        {
            "title": "Santa Muerte Double",
            "type": "Stout - Coffee",
            "rating": 3.79,
            "url": "https://untappd.com/b/4brewers-santa-muerte-double/4091610"
        },
        {
            "title": "Старуха и медведь 2018",
            "type": "Belgian Quadrupel",
            "rating": 3.7,
            "url": "https://untappd.com/b/4brewers-ru-staruha-i-medved-2018/2542861"
        },
        {
            "title": "Доза [Orange Pulp+Mango+Pineapple+Passionfruit]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.27,
            "url": "https://untappd.com/b/4brewers-doza-orange-pulp-mango-pineapple-passionfruit/4498136"
        },
        {
            "title": "Oh My Juice [PEACH]",
            "type": "IPA - American",
            "rating": 3.56,
            "url": "https://untappd.com/b/4brewers-ru-oh-my-juice-peach/2262255"
        },
        {
            "title": "Pourqoi Pas [BA Shiraz]",
            "type": "Sour - Other",
            "rating": 3.99,
            "url": "https://untappd.com/b/4brewers-ru-pourqoi-pas-ba-shiraz/3015335"
        },
        {
            "title": "Salsa [HOT EDITION]",
            "type": "Chilli / Chile Beer",
            "rating": 3.52,
            "url": "https://untappd.com/b/4brewers-salsa-hot-edition/2266211"
        },
        {
            "title": "Зависимость [BA]",
            "type": "Sour - Other Gose",
            "rating": 4.24,
            "url": "https://untappd.com/b/4brewers-zavisimost-ba/4982499"
        },
        {
            "title": "Oh My Juice [MANGO]",
            "type": "IPA - American",
            "rating": 3.62,
            "url": "https://untappd.com/b/4brewers-ru-oh-my-juice-mango/2337261"
        },
        {
            "title": "Structure",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.51,
            "url": "https://untappd.com/b/4brewers-structure/3274054"
        },
        {
            "title": "Унесённые витом [Осенняя версия]",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.69,
            "url": "https://untappd.com/b/4brewers-ru-unesyonnye-vitom-osennyaya-versiya/2866486"
        },
        {
            "title": "Шум [Pineapple]",
            "type": "IPA - Milkshake",
            "rating": 3.92,
            "url": "https://untappd.com/b/4brewers-ru-shum-pineapple/2844218"
        },
        {
            "title": "Dispersion [Citra + Mosaic]",
            "type": "IPA - New England / Hazy",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-dispersion-citra-mosaic/3619756"
        },
        {
            "title": "Шум [Idaho Gem + Mosaic]",
            "type": "IPA - Milkshake",
            "rating": 3.9,
            "url": "https://untappd.com/b/4brewers-shum-idaho-gem-mosaic/3734297"
        },
        {
            "title": "Доза [Crushed Blueberry+Banana]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.85,
            "url": "https://untappd.com/b/4brewers-doza-crushed-blueberry-banana/4116636"
        },
        {
            "title": "Potato Day",
            "type": "Sour - Other Gose",
            "rating": 4.21,
            "url": "https://untappd.com/b/4brewers-potato-day/4900143"
        },
        {
            "title": "Шум [MELON]",
            "type": "IPA - Milkshake",
            "rating": 3.73,
            "url": "https://untappd.com/b/4brewers-ru-shum-melon/2640858"
        },
        {
            "title": "Старуха и медведь 2018 [BA: Griotte Morello]",
            "type": "Belgian Quadrupel",
            "rating": 3.88,
            "url": "https://untappd.com/b/4brewers-ru-staruha-i-medved-2018-ba-griotte-morello/2884462"
        },
        {
            "title": "Жажда [PINEAPPLE]",
            "type": "Sour - Fruited Gose",
            "rating": 3.75,
            "url": "https://untappd.com/b/4brewers-zhazhda-pineapple/2692486"
        },
        {
            "title": "Pourqoi Pas [BA Chardonnay]",
            "type": "Sour - Other",
            "rating": 4.04,
            "url": "https://untappd.com/b/4brewers-pourqoi-pas-ba-chardonnay/2923041"
        },
        {
            "title": "Update [Pink]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.71,
            "url": "https://untappd.com/b/4brewers-update-pink/5302058"
        },
        {
            "title": "Ночь [TONKA]",
            "type": "Stout - Imperial / Double",
            "rating": 4.09,
            "url": "https://untappd.com/b/4brewers-noch-tonka/3262395"
        },
        {
            "title": "Жажда",
            "type": "Sour - Traditional Gose",
            "rating": 3.91,
            "url": "https://untappd.com/b/4brewers-zhazhda/2698126"
        },
        {
            "title": "Воздействие",
            "type": "Wild Ale - Other",
            "rating": 3.91,
            "url": "https://untappd.com/b/4brewers-vozdejstvie/4900145"
        },
        {
            "title": "Блеск",
            "type": "Sour - Fruited",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-blesk/5311382"
        },
        {
            "title": "ДОРОГО БОГАТО СЛИВА ГРАНАТ АБРИКОС",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.09,
            "url": "https://untappd.com/b/4brewers-dorogo-bogato-sliva-granat-abrikos/4900141"
        },
        {
            "title": "Шум [Azacca + Mosaic + Cashmere]",
            "type": "IPA - Milkshake",
            "rating": 3.86,
            "url": "https://untappd.com/b/4brewers-shum-azacca-mosaic-cashmere/3575698"
        },
        {
            "title": "СУДЬБА Lobotomy Ed.",
            "type": "Stout - Imperial / Double",
            "rating": 4.15,
            "url": "https://untappd.com/b/4brewers-sudba-lobotomy-ed/4900146"
        },
        {
            "title": "Кислый Парень [Raspberry+Strawberry+Passionfruit]",
            "type": "Sour - Fruited",
            "rating": 4.26,
            "url": "https://untappd.com/b/4brewers-kislyj-paren-raspberry-strawberry-passionfruit/3918154"
        },
        {
            "title": "Шум [Citra + Galaxy]",
            "type": "IPA - Milkshake",
            "rating": 3.94,
            "url": "https://untappd.com/b/4brewers-shum-citra-galaxy/3529230"
        },
        {
            "title": "Ночь [Caucasian Oak]",
            "type": "Stout - Russian Imperial",
            "rating": 4.01,
            "url": "https://untappd.com/b/4brewers-ru-noch-caucasian-oak/2294172"
        },
        {
            "title": "Шум [DDH EKUANOT]",
            "type": "IPA - Milkshake",
            "rating": 3.49,
            "url": "https://untappd.com/b/4brewers-ru-shum-ddh-ekuanot/2771411"
        },
        {
            "title": "Доза [Mango + Sea Buckthorn]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.12,
            "url": "https://untappd.com/b/4brewers-doza-mango-sea-buckthorn/5302056"
        },
        {
            "title": "Страна Лентяев 2021 [BA Merlot]",
            "type": "Mead - Braggot",
            "rating": 4.37,
            "url": "https://untappd.com/b/4brewers-strana-lentyaev-2021-ba-merlot/4545044"
        },
        {
            "title": "Кислый Парень [Raspberry+Blackberry+Blueberry]",
            "type": "Sour - Fruited",
            "rating": 4.18,
            "url": "https://untappd.com/b/4brewers-kislyj-paren-raspberry-blackberry-blueberry/3918139"
        },
        {
            "title": "Вброс [Cashmere + Equanot + Citra]",
            "type": "Pale Ale - American",
            "rating": 3.66,
            "url": "https://untappd.com/b/4brewers-vbros-cashmere-equanot-citra/5291759"
        },
        {
            "title": "Винтаж",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.52,
            "url": "https://untappd.com/b/4brewers-vintazh/5286714"
        },
        {
            "title": "Кислый Парень [Black Currant+Raspberry+Blackberry]",
            "type": "Sour - Fruited",
            "rating": 4.1,
            "url": "https://untappd.com/b/4brewers-kislyj-paren-black-currant-raspberry-blackberry/3926629"
        },
        {
            "title": "Шабаш [BOURBON BARREL]",
            "type": "Pumpkin / Yam Beer",
            "rating": 3.6,
            "url": "https://untappd.com/b/4brewers-shabash-bourbon-barrel/2992575"
        },
        {
            "title": "Супер-Эго",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.18,
            "url": "https://untappd.com/b/4brewers-super-ego/5311384"
        },
        {
            "title": "Русское поле",
            "type": "Farmhouse Ale - Saison",
            "rating": 4.21,
            "url": "https://untappd.com/b/4brewers-russkoe-pole/2669465"
        },
        {
            "title": "Изыди [BCD Hot Edition]",
            "type": "Stout - Imperial / Double",
            "rating": 4.23,
            "url": "https://untappd.com/b/4brewers-ru-izydi-bcd-hot-edition/2650764"
        },
        {
            "title": "Поколение одиночек",
            "type": "IPA - White / Wheat",
            "rating": 3.78,
            "url": "https://untappd.com/b/4brewers-pokolenie-odinochek/4759535"
        },
        {
            "title": "Soppris",
            "type": "Stout - Other",
            "rating": 4.02,
            "url": "https://untappd.com/b/4brewers-soppris/3196823"
        },
        {
            "title": "Stauris (American Oak Edition)",
            "type": "Stout - Russian Imperial",
            "rating": 4.52,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-stauris-american-oak-edition/1421796"
        },
        {
            "title": "Friendly Fire",
            "type": "Smoked Beer",
            "rating": 4.36,
            "url": "https://untappd.com/b/4brewers-ru-friendly-fire/2150124"
        },
        {
            "title": "Доза [Guava + Passion Fruit + Pineapple]",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.96,
            "url": "https://untappd.com/b/4brewers-doza-guava-passion-fruit-pineapple/5311379"
        },
        {
            "title": "Stauris (French Oak Edition)",
            "type": "Stout - Russian Imperial",
            "rating": 4.32,
            "url": "https://untappd.com/b/4brewers-chetyre-pivovara-stauris-french-oak-edition/1421792"
        },
        {
            "title": "Кшиштоф Крыжеч",
            "type": "Lager - Pale",
            "rating": null,
            "url": "https://untappd.com/b/4brewers-ru-kshishtof-kryzhech/1939914"
        },
        {
            "title": "Bitter Girl [Peach + Banana]",
            "type": "IPA - Sour",
            "rating": null,
            "url": "https://untappd.com/b/4brewers-bitter-girl-peach-banana/3547480"
        },
        {
            "title": "Нежный парень",
            "type": "Sour - Other",
            "rating": null,
            "url": "https://untappd.com/b/4brewers-ru-nezhnyj-paren/2210007"
        },
        {
            "title": "Томный парень",
            "type": "Sour - Other",
            "rating": null,
            "url": "https://untappd.com/b/4brewers-ru-tomnyj-paren/2522522"
        },
        {
            "title": "Колдовство [Cranberry]",
            "type": "Sour - Other",
            "rating": null,
            "url": "https://untappd.com/b/4brewers-koldovstvo-cranberry/4607870"
        },
        {
            "title": "Постмодерн",
            "type": "IPA - Triple New England / Hazy",
            "rating": null,
            "url": "https://untappd.com/b/4brewers-postmodern/5321950"
        }
    ],
    "ALASKA": [
        {
            "title": "Ипатерапия",
            "type": "IPA - Imperial / Double",
            "rating": 3.88,
            "url": "https://untappd.com/b/alaska-brewery-ipaterapiya/1921119"
        },
        {
            "title": "Novichok (Новичок)",
            "type": "IPA - Milkshake",
            "rating": 3.73,
            "url": "https://untappd.com/b/alaska-brewery-novichok-novichok/2652096"
        },
        {
            "title": "Эйяфьядлайёкюдль",
            "type": "Porter - Imperial / Double",
            "rating": 3.93,
            "url": "https://untappd.com/b/alaska-brewery-ejyafyadlajyokyudl/2155620"
        },
        {
            "title": "Стаутский советник",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.9,
            "url": "https://untappd.com/b/alaska-brewery-stautskij-sovetnik/1930817"
        },
        {
            "title": "Ипатаж",
            "type": "IPA - American",
            "rating": 3.77,
            "url": "https://untappd.com/b/alaska-brewery-ipatazh/1951618"
        },
        {
            "title": "Фейхоа / Feijoa",
            "type": "Sour - Fruited",
            "rating": 3.94,
            "url": "https://untappd.com/b/alaska-brewery-fejhoa-feijoa/3860629"
        },
        {
            "title": "Гравитация",
            "type": "Stout - Russian Imperial",
            "rating": 3.88,
            "url": "https://untappd.com/b/alaska-brewery-gravitaciya/2007371"
        },
        {
            "title": "Железнодорожная вода",
            "type": "Stout - Russian Imperial",
            "rating": 3.95,
            "url": "https://untappd.com/b/alaska-brewery-zheleznodorozhnaya-voda/2994590"
        },
        {
            "title": "Эквилибриум",
            "type": "Stout - Pastry",
            "rating": 3.77,
            "url": "https://untappd.com/b/alaska-brewery-ekvilibrium/3048104"
        },
        {
            "title": "Джем / Gem",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.81,
            "url": "https://untappd.com/b/alaska-brewery-dzhem-gem/3138258"
        },
        {
            "title": "Таити",
            "type": "Pale Ale - American",
            "rating": 3.69,
            "url": "https://untappd.com/b/alaska-brewery-taiti/3160914"
        },
        {
            "title": "Пьяные слезы",
            "type": "Sour - Other Gose",
            "rating": 3.77,
            "url": "https://untappd.com/b/alaska-brewery-pyanye-slezy/3155897"
        },
        {
            "title": "Кухни мира: Таиланд",
            "type": "Sour - Other Gose",
            "rating": 3.89,
            "url": "https://untappd.com/b/alaska-brewery-kuhni-mira-tailand/4452190"
        },
        {
            "title": "Железнодорожная вода",
            "type": "Stout - Imperial / Double",
            "rating": 4.04,
            "url": "https://untappd.com/b/alaska-brewery-zheleznodorozhnaya-voda/3561239"
        },
        {
            "title": "Еретичка / Heretic",
            "type": "Sour - Other Gose",
            "rating": 3.97,
            "url": "https://untappd.com/b/alaska-brewery-eretichka-heretic/4653962"
        },
        {
            "title": "Индульгенция",
            "type": "Sour - Other Gose",
            "rating": 3.74,
            "url": "https://untappd.com/b/alaska-brewery-indulgenciya/4193176"
        },
        {
            "title": "Самоизоляция",
            "type": "IPA - Sour",
            "rating": 3.77,
            "url": "https://untappd.com/b/alaska-brewery-samoizolyaciya/3756478"
        },
        {
            "title": "Киберпанк",
            "type": "IPA - Imperial / Double",
            "rating": 3.85,
            "url": "https://untappd.com/b/alaska-brewery-kiberpank/4093166"
        },
        {
            "title": "Ипадром",
            "type": "IPA - American",
            "rating": 3.69,
            "url": "https://untappd.com/b/alaska-brewery-ipadrom/1851546"
        },
        {
            "title": "Кухни мира: Корея",
            "type": "Sour - Other Gose",
            "rating": 4.25,
            "url": "https://untappd.com/b/alaska-brewery-kuhni-mira-koreya/4818079"
        },
        {
            "title": "Адюльтер",
            "type": "Sour - Fruited",
            "rating": 3.89,
            "url": "https://untappd.com/b/alaska-brewery-adyulter/3228754"
        },
        {
            "title": "Инквизитор",
            "type": "Sour - Other Gose",
            "rating": 3.53,
            "url": "https://untappd.com/b/alaska-brewery-inkvizitor/3840378"
        },
        {
            "title": "Кухни мира: Перу",
            "type": "Sour - Other Gose",
            "rating": 4,
            "url": "https://untappd.com/b/alaska-brewery-kuhni-mira-peru/4758719"
        },
        {
            "title": "Переговорщик",
            "type": "IPA - New England / Hazy",
            "rating": 3.51,
            "url": "https://untappd.com/b/alaska-brewery-peregovorshik/3491591"
        },
        {
            "title": "Кухни мира: Украина",
            "type": "Sour - Other Gose",
            "rating": 3.86,
            "url": "https://untappd.com/b/alaska-brewery-kuhni-mira-ukraina/4868367"
        },
        {
            "title": "1984",
            "type": "Lager - Pale",
            "rating": 3.53,
            "url": "https://untappd.com/b/alaska-brewery-1984/3828118"
        },
        {
            "title": "Кукловод",
            "type": "IPA - Imperial / Double",
            "rating": 3.72,
            "url": "https://untappd.com/b/alaska-brewery-kuklovod/3459832"
        },
        {
            "title": "Отец Гаспачо",
            "type": "Sour - Other Gose",
            "rating": 3.67,
            "url": "https://untappd.com/b/alaska-brewery-otec-gaspacho/3723940"
        },
        {
            "title": "Ипахондрик",
            "type": "IPA - American",
            "rating": 3.81,
            "url": "https://untappd.com/b/alaska-brewery-ipahondrik/2247154"
        },
        {
            "title": "Альманах",
            "type": "Mead - Melomel",
            "rating": 4.02,
            "url": "https://untappd.com/b/alaska-brewery-almanah/4112601"
        },
        {
            "title": "Психотерапевт",
            "type": "Stout - Milk / Sweet",
            "rating": 3.82,
            "url": "https://untappd.com/b/alaska-brewery-psihoterapevt/4114536"
        },
        {
            "title": "Маркиз де Сад",
            "type": "Sour - Other",
            "rating": 3.56,
            "url": "https://untappd.com/b/alaska-brewery-markiz-de-sad/2484525"
        },
        {
            "title": "Катарсис",
            "type": "Barleywine - English",
            "rating": 3.79,
            "url": "https://untappd.com/b/alaska-brewery-katarsis/2535436"
        },
        {
            "title": "Винтаж 2019",
            "type": "Grape Ale - Italian",
            "rating": 3.71,
            "url": "https://untappd.com/b/alaska-brewery-vintazh-2019/3542794"
        },
        {
            "title": "ИПАПЕЯ",
            "type": "IPA - Triple",
            "rating": 3.92,
            "url": "https://untappd.com/b/alaska-brewery-ipapeya/3415485"
        },
        {
            "title": "Кухни мира: Япония",
            "type": "Sour - Other Gose",
            "rating": 3.65,
            "url": "https://untappd.com/b/alaska-brewery-kuhni-mira-yaponiya/4962044"
        },
        {
            "title": "Адвокат",
            "type": "Stout - Milk / Sweet",
            "rating": 3.82,
            "url": "https://untappd.com/b/alaska-brewery-advokat/3957061"
        },
        {
            "title": "Корсар",
            "type": "Porter - Baltic",
            "rating": 3.75,
            "url": "https://untappd.com/b/alaska-brewery-korsar/4149094"
        },
        {
            "title": "Дипломат / Diplomat",
            "type": "Stout - American",
            "rating": 3.91,
            "url": "https://untappd.com/b/alaska-brewery-diplomat-diplomat/2312737"
        },
        {
            "title": "Moscow 2042 / Москва 2042",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.7,
            "url": "https://untappd.com/b/alaska-brewery-moscow-2042-moskva-2042/4149089"
        },
        {
            "title": "Фантасмагория / Phantasmagoria",
            "type": "Barleywine - Other",
            "rating": 3.73,
            "url": "https://untappd.com/b/alaska-brewery-fantasmagoriya-phantasmagoria/4535965"
        },
        {
            "title": "Эрос / Eros",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.91,
            "url": "https://untappd.com/b/alaska-brewery-eros-eros/4480618"
        },
        {
            "title": "Супер Эго",
            "type": "IPA - Imperial / Double",
            "rating": 3.85,
            "url": "https://untappd.com/b/alaska-brewery-super-ego/2235579"
        },
        {
            "title": "ТОМАТНЫЙ ПАПА",
            "type": "Sour - Other Gose",
            "rating": 3.62,
            "url": "https://untappd.com/b/alaska-brewery-tomatnyj-papa/3288763"
        },
        {
            "title": "Кухни мира: Китай",
            "type": "Sour - Other Gose",
            "rating": 4.14,
            "url": "https://untappd.com/b/alaska-brewery-kuhni-mira-kitaj/5075155"
        },
        {
            "title": "Кухни мира: на Руси",
            "type": "Sour - Other Gose",
            "rating": 3.33,
            "url": "https://untappd.com/b/alaska-brewery-kuhni-mira-na-rusi/4804197"
        },
        {
            "title": "Диссидент / Dissident",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 3.93,
            "url": "https://untappd.com/b/alaska-brewery-dissident-dissident/5040879"
        },
        {
            "title": "Кухни мира: Индия",
            "type": "Sour - Other Gose",
            "rating": 3.8,
            "url": "https://untappd.com/b/alaska-brewery-kuhni-mira-indiya/4909115"
        },
        {
            "title": "Рефлексия",
            "type": "Barleywine - Other",
            "rating": 3.31,
            "url": "https://untappd.com/b/alaska-brewery-refleksiya/3542791"
        },
        {
            "title": "Кухни мира: Узбекистан",
            "type": "Sour - Other Gose",
            "rating": 3.26,
            "url": "https://untappd.com/b/alaska-brewery-kuhni-mira-uzbekistan/4998039"
        },
        {
            "title": "Карелия / Karelia",
            "type": "Mead - Melomel",
            "rating": 3.85,
            "url": "https://untappd.com/b/alaska-brewery-kareliya-karelia/4400526"
        },
        {
            "title": "бутлегер: Peated Whisky",
            "type": "Stout - Russian Imperial",
            "rating": 4.05,
            "url": "https://untappd.com/b/alaska-brewery-butleger-peated-whisky/5201248"
        },
        {
            "title": "Темная гавань / Dark Haven",
            "type": "Sour - Other Gose",
            "rating": 3.64,
            "url": "https://untappd.com/b/alaska-brewery-temnaya-gavan-dark-haven/4856600"
        },
        {
            "title": "Ботаник",
            "type": "Sour - Other Gose",
            "rating": 3.92,
            "url": "https://untappd.com/b/alaska-brewery-botanik/3417617"
        },
        {
            "title": "Антитела / Antibodies",
            "type": "Sour - Fruited",
            "rating": 3.44,
            "url": "https://untappd.com/b/alaska-brewery-antitela-antibodies/3852088"
        },
        {
            "title": "Эфиры",
            "type": "Sour - Fruited",
            "rating": 3.74,
            "url": "https://untappd.com/b/alaska-brewery-efiry/4376830"
        },
        {
            "title": "Метаморфозы",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.69,
            "url": "https://untappd.com/b/alaska-brewery-metamorfozy/4019291"
        },
        {
            "title": "Сакура",
            "type": "Sour - Fruited",
            "rating": 3.95,
            "url": "https://untappd.com/b/alaska-brewery-sakura/4917590"
        },
        {
            "title": "Племена /Tribes",
            "type": "IPA - American",
            "rating": 3.67,
            "url": "https://untappd.com/b/alaska-brewery-plemena-tribes/4429881"
        },
        {
            "title": "Кухни Мира: Грузия",
            "type": "Sour - Other Gose",
            "rating": 3.7,
            "url": "https://untappd.com/b/alaska-brewery-kuhni-mira-gruziya/5197000"
        },
        {
            "title": "Нигилист",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.65,
            "url": "https://untappd.com/b/alaska-brewery-nigilist/3746341"
        },
        {
            "title": "Занзибар",
            "type": "Pale Ale - American",
            "rating": 3.74,
            "url": "https://untappd.com/b/alaska-brewery-zanzibar/4193171"
        },
        {
            "title": "СТАРЕЦ ФУРА",
            "type": "Belgian Tripel",
            "rating": 3.62,
            "url": "https://untappd.com/b/alaska-brewery-starec-fura/3649059"
        },
        {
            "title": "Феромоны",
            "type": "IPA - New England / Hazy",
            "rating": 3.4,
            "url": "https://untappd.com/b/alaska-brewery-feromony/4149091"
        },
        {
            "title": "бутлегер: Jäger",
            "type": "Stout - Other",
            "rating": 3.95,
            "url": "https://untappd.com/b/alaska-brewery-butleger-jager/5180326"
        },
        {
            "title": "Номад",
            "type": "IPA - American",
            "rating": 3.73,
            "url": "https://untappd.com/b/alaska-brewery-nomad/4349499"
        },
        {
            "title": "Подражатели / Imitators",
            "type": "Sour - Fruited Gose",
            "rating": 3.94,
            "url": "https://untappd.com/b/alaska-brewery-podrazhateli-imitators/4508492"
        },
        {
            "title": "Одержимость",
            "type": "Sour - Fruited Gose",
            "rating": 3.94,
            "url": "https://untappd.com/b/alaska-brewery-oderzhimost/4711353"
        },
        {
            "title": "Лаура",
            "type": "Cider - Graff",
            "rating": 3.36,
            "url": "https://untappd.com/b/alaska-brewery-laura/3933359"
        },
        {
            "title": "Манифест",
            "type": "Mead - Melomel",
            "rating": 3.85,
            "url": "https://untappd.com/b/alaska-brewery-manifest/4253452"
        },
        {
            "title": "СОЛЯРИС",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.29,
            "url": "https://untappd.com/b/alaska-brewery-solyaris/3668234"
        },
        {
            "title": "Пир во время чумы",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.71,
            "url": "https://untappd.com/b/alaska-brewery-pir-vo-vremya-chumy/4324846"
        },
        {
            "title": "Тюремный стаут / Jailhouse Brew",
            "type": "Stout - Other",
            "rating": 3.93,
            "url": "https://untappd.com/b/alaska-brewery-tyuremnyj-staut-jailhouse-brew/4658555"
        },
        {
            "title": "Кухни мира: Болонья",
            "type": "Sour - Other Gose",
            "rating": 3.99,
            "url": "https://untappd.com/b/alaska-brewery-kuhni-mira-bolonya/5022285"
        },
        {
            "title": "Доктор / Doctor",
            "type": "IPA - American",
            "rating": 3.81,
            "url": "https://untappd.com/b/alaska-brewery-doktor-doctor/4886951"
        },
        {
            "title": "Губы / Lips",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.8,
            "url": "https://untappd.com/b/alaska-brewery-guby-lips/4385754"
        },
        {
            "title": "Арт дилер / Art dealer",
            "type": "IPA - Imperial / Double",
            "rating": 3.84,
            "url": "https://untappd.com/b/alaska-brewery-art-diler-art-dealer/4606631"
        },
        {
            "title": "Грог / Grog",
            "type": "Hard Ginger Beer",
            "rating": 3.51,
            "url": "https://untappd.com/b/alaska-brewery-grog-grog/4695967"
        },
        {
            "title": "Шаман / Shaman",
            "type": "IPA - American",
            "rating": 3.73,
            "url": "https://untappd.com/b/alaska-brewery-shaman-shaman/5100452"
        },
        {
            "title": "Декаданс",
            "type": "IPA - American",
            "rating": 3.72,
            "url": "https://untappd.com/b/alaska-brewery-dekadans/4183856"
        },
        {
            "title": "Танцующая с Волками",
            "type": "Stout - Other",
            "rating": 3.63,
            "url": "https://untappd.com/b/alaska-brewery-tancuyushaya-s-volkami/3627324"
        },
        {
            "title": "Макиавелли / Machiavelli",
            "type": "Stout - Imperial / Double",
            "rating": 3.43,
            "url": "https://untappd.com/b/alaska-brewery-makiavelli-machiavelli/4476509"
        },
        {
            "title": "Пятница / Friday",
            "type": "Sour - Fruited",
            "rating": 4.15,
            "url": "https://untappd.com/b/alaska-brewery-pyatnica-friday/4922453"
        },
        {
            "title": "Черничные Ночи / Blueberry Nights",
            "type": "Hard Seltzer",
            "rating": 3.27,
            "url": "https://untappd.com/b/alaska-brewery-chernichnye-nochi-blueberry-nights/4232990"
        },
        {
            "title": "Консильери",
            "type": "Stout - Oatmeal",
            "rating": 3.73,
            "url": "https://untappd.com/b/alaska-brewery-konsileri/3008521"
        },
        {
            "title": "Нимфомания / Nimphomania",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.54,
            "url": "https://untappd.com/b/alaska-brewery-nimfomaniya-nimphomania/4776493"
        },
        {
            "title": "Династия / Dynasty",
            "type": "IPA - American",
            "rating": 3.76,
            "url": "https://untappd.com/b/alaska-brewery-dinastiya-dynasty/5149605"
        },
        {
            "title": "Стаутский советник (лесной орех)",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.95,
            "url": "https://untappd.com/b/alaska-brewery-stautskij-sovetnik-lesnoj-oreh/4707284"
        },
        {
            "title": "Jam: малина, голубика",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.6,
            "url": "https://untappd.com/b/alaska-brewery-jam-malina-golubika/5052139"
        },
        {
            "title": "Кухни мира: Италия",
            "type": "Mead - Melomel",
            "rating": 3.71,
            "url": "https://untappd.com/b/alaska-brewery-kuhni-mira-italiya/4944661"
        },
        {
            "title": "Кондитер | Pastryman",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.85,
            "url": "https://untappd.com/b/alaska-brewery-konditer-pastryman/5201242"
        },
        {
            "title": "Бутлегер",
            "type": "Stout - Russian Imperial",
            "rating": 3.84,
            "url": "https://untappd.com/b/alaska-brewery-butleger/5171383"
        },
        {
            "title": "Шарлотта",
            "type": "Cider - Graff",
            "rating": 3.15,
            "url": "https://untappd.com/b/alaska-brewery-sharlotta/3987966"
        },
        {
            "title": "Импичмент / Impeachment",
            "type": "Stout - Russian Imperial",
            "rating": 3.79,
            "url": "https://untappd.com/b/alaska-brewery-impichment-impeachment/4798147"
        },
        {
            "title": "Конкистадор / Conquistador",
            "type": "Stout - Milk / Sweet",
            "rating": 3.7,
            "url": "https://untappd.com/b/alaska-brewery-konkistador-conquistador/4649001"
        },
        {
            "title": "APPLE STORY: ГОЛУБИКА",
            "type": "Cider - Other Fruit",
            "rating": 3.87,
            "url": "https://untappd.com/b/alaska-brewery-apple-story-golubika/4844489"
        },
        {
            "title": "Honeymood: Дыня",
            "type": "Mead - Melomel",
            "rating": 3.77,
            "url": "https://untappd.com/b/alaska-brewery-honeymood-dynya/5013126"
        },
        {
            "title": "Грешница",
            "type": "Stout - Russian Imperial",
            "rating": 3.85,
            "url": "https://untappd.com/b/alaska-brewery-greshnica/2655590"
        },
        {
            "title": "Юленька",
            "type": "Sour - Fruited",
            "rating": 3.37,
            "url": "https://untappd.com/b/alaska-brewery-yulenka/2733619"
        },
        {
            "title": "Jam: клубника, банан",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.99,
            "url": "https://untappd.com/b/alaska-brewery-jam-klubnika-banan/5062402"
        },
        {
            "title": "Sour: Черешня, Бузина",
            "type": "Sour - Fruited",
            "rating": 3.78,
            "url": "https://untappd.com/b/alaska-brewery-sour-chereshnya-buzina/5149606"
        },
        {
            "title": "Афродизиак",
            "type": "Fruit Beer",
            "rating": 3.92,
            "url": "https://untappd.com/b/alaska-brewery-afrodiziak/3907851"
        },
        {
            "title": "Альманах",
            "type": "Mead - Metheglin",
            "rating": 4.02,
            "url": "https://untappd.com/b/alaska-brewery-almanah/4592479"
        },
        {
            "title": "APPLE STORY: БАНАН",
            "type": "Cider - Other Fruit",
            "rating": 3.93,
            "url": "https://untappd.com/b/alaska-brewery-apple-story-banan/4917594"
        },
        {
            "title": "APPLE STORY: АРБУЗ",
            "type": "Cider - Other Fruit",
            "rating": 3.55,
            "url": "https://untappd.com/b/alaska-brewery-apple-story-arbuz/4959571"
        },
        {
            "title": "Провокация",
            "type": "Fruit Beer",
            "rating": 3.31,
            "url": "https://untappd.com/b/alaska-brewery-provokaciya/3964022"
        },
        {
            "title": "Груша, Банан",
            "type": "Sour - Fruited",
            "rating": 3.74,
            "url": "https://untappd.com/b/alaska-brewery-grusha-banan/5285264"
        },
        {
            "title": "бутлегер: BRANDY",
            "type": "Barleywine - Other",
            "rating": 3.53,
            "url": "https://untappd.com/b/alaska-brewery-butleger-brandy/5313574"
        },
        {
            "title": "Эпатаж",
            "type": "IPA - American",
            "rating": null,
            "url": "https://untappd.com/b/alaska-brewery-epatazh/5301027"
        },
        {
            "title": "бутлегер: Limoncello",
            "type": "Mead - Other",
            "rating": null,
            "url": "https://untappd.com/b/alaska-brewery-butleger-limoncello/5323573"
        }
    ],
    "BREWLOK": [
        {
            "title": "Likho / Лихо",
            "type": "IPA - Imperial / Double",
            "rating": 3.85,
            "url": "https://untappd.com/b/brewlok-brewery-likho-liho/1802346"
        },
        {
            "title": "Jimbo",
            "type": "IPA - Milkshake",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-jimbo/2063205"
        },
        {
            "title": "Baba Yaga / Баба Яга",
            "type": "Stout - Milk / Sweet",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-baba-yaga-baba-yaga/1673847"
        },
        {
            "title": "Leshy / Леший",
            "type": "IPA - American",
            "rating": 3.77,
            "url": "https://untappd.com/b/brewlok-brewery-leshy-leshij/2260907"
        },
        {
            "title": "Caramba",
            "type": "IPA - Milkshake",
            "rating": 3.69,
            "url": "https://untappd.com/b/brewlok-brewery-caramba/2654974"
        },
        {
            "title": "Koshey / Кощей",
            "type": "Stout - Coffee",
            "rating": 3.85,
            "url": "https://untappd.com/b/brewlok-brewery-koshey-koshej/1731404"
        },
        {
            "title": "Kikimora / Кикимора",
            "type": "Stout - Milk / Sweet",
            "rating": 3.79,
            "url": "https://untappd.com/b/brewlok-brewery-kikimora-kikimora/1924784"
        },
        {
            "title": "Дом 40 Скелетов",
            "type": "Stout - Oatmeal",
            "rating": 3.66,
            "url": "https://untappd.com/b/brewlok-brewery-dom-40-skeletov/1297780"
        },
        {
            "title": "Wolf's Shepherd / Волчий Пастырь",
            "type": "IPA - Triple",
            "rating": 3.92,
            "url": "https://untappd.com/b/brewlok-brewery-wolf-s-shepherd-volchij-pastyr/2321101"
        },
        {
            "title": "Rusalka / Русалка",
            "type": "Sour - Fruited",
            "rating": 3.75,
            "url": "https://untappd.com/b/brewlok-brewery-rusalka-rusalka/2027746"
        },
        {
            "title": "Ivan Tsarevich / Иван Царевич",
            "type": "Pale Ale - American",
            "rating": 3.6,
            "url": "https://untappd.com/b/brewlok-brewery-ivan-tsarevich-ivan-carevich/3500303"
        },
        {
            "title": "Адская Пляска",
            "type": "IPA - Imperial / Double Black",
            "rating": 3.94,
            "url": "https://untappd.com/b/brewlok-brewery-adskaya-plyaska/3036457"
        },
        {
            "title": "DOS Chocolate Edition",
            "type": "Stout - Imperial / Double Oatmeal",
            "rating": 3.98,
            "url": "https://untappd.com/b/brewlok-brewery-dos-chocolate-edition/2641260"
        },
        {
            "title": "Веневитинская Дева",
            "type": "IPA - Black / Cascadian Dark Ale",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewlok-brewery-venevitinskaya-deva/1434483"
        },
        {
            "title": "Гармония",
            "type": "Sour - Fruited",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-garmoniya/3168288"
        },
        {
            "title": "Dicha Passion Fruit",
            "type": "Sour - Fruited",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewlok-brewery-dicha-passion-fruit/2597147"
        },
        {
            "title": "Трёхлинейка",
            "type": "Porter - Other",
            "rating": 3.84,
            "url": "https://untappd.com/b/brewlok-brewery-tryohlinejka/1448833"
        },
        {
            "title": "1915 Raspberry Edition",
            "type": "Stout - Other",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-1915-raspberry-edition/1924788"
        },
        {
            "title": "Варяг",
            "type": "Porter - Baltic",
            "rating": 3.76,
            "url": "https://untappd.com/b/brewlok-brewery-varyag/1743327"
        },
        {
            "title": "Рамонский Туман",
            "type": "Stout - Other",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-ramonskij-tuman/1387427"
        },
        {
            "title": "Палитра #1 Pineapple & Guava",
            "type": "IPA - Milkshake",
            "rating": 3.71,
            "url": "https://untappd.com/b/brewlok-brewery-palitra-1-pineapple-and-guava/3262735"
        },
        {
            "title": "Шмыг \\ Shmyg",
            "type": "IPA - Other",
            "rating": 3.43,
            "url": "https://untappd.com/b/brewlok-brewery-shmyg-shmyg/3989162"
        },
        {
            "title": "Палитра #2 Raspberry & Vanilla",
            "type": "IPA - Milkshake",
            "rating": 3.69,
            "url": "https://untappd.com/b/brewlok-brewery-palitra-2-raspberry-and-vanilla/3262736"
        },
        {
            "title": "Темная лошадка \\ Temnaja Loshadka",
            "type": "Sour - Fruited",
            "rating": 3.74,
            "url": "https://untappd.com/b/brewlok-brewery-temnaya-loshadka-temnaja-loshadka/3914042"
        },
        {
            "title": "Маленькая Лошадка (malenkaya loshadka)",
            "type": "Sour - Fruited",
            "rating": 3.9,
            "url": "https://untappd.com/b/brewlok-brewery-malenkaya-loshadka-malenkaya-loshadka/3776565"
        },
        {
            "title": "Gorynych / Горыныч",
            "type": "Stout - Other",
            "rating": 3.87,
            "url": "https://untappd.com/b/brewlok-brewery-gorynych-gorynych/2053548"
        },
        {
            "title": "LOVE SWEET TEARS (Cherry Edition)",
            "type": "Mead - Melomel",
            "rating": 4,
            "url": "https://untappd.com/b/brewlok-brewery-love-sweet-tears-cherry-edition/3917919"
        },
        {
            "title": "Дисгармония",
            "type": "Sour - Fruited",
            "rating": 3.96,
            "url": "https://untappd.com/b/brewlok-brewery-disgarmoniya/2955342"
        },
        {
            "title": "Достоевский. Том 5",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.23,
            "url": "https://untappd.com/b/brewlok-brewery-dostoevskij-tom-5/3805936"
        },
        {
            "title": "1915",
            "type": "Stout - Other",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-1915/1214575"
        },
        {
            "title": "Сотня / Sotnya",
            "type": "Porter - Other",
            "rating": 3.86,
            "url": "https://untappd.com/b/brewlok-brewery-sotnya-sotnya/4457463"
        },
        {
            "title": "Бесобой \\ Besoboj",
            "type": "Stout - Milk / Sweet",
            "rating": 3.7,
            "url": "https://untappd.com/b/brewlok-brewery-besoboj-besoboj/3989160"
        },
        {
            "title": "Iggy Hop",
            "type": "IPA - Imperial / Double",
            "rating": 3.79,
            "url": "https://untappd.com/b/brewlok-brewery-iggy-hop/3547371"
        },
        {
            "title": "Нога Бога DDH Citra",
            "type": "IPA - New England / Hazy",
            "rating": 3.91,
            "url": "https://untappd.com/b/brewlok-brewery-noga-boga-ddh-citra/2822925"
        },
        {
            "title": "Гумилёв \\ Gumilyov",
            "type": "Stout - Russian Imperial",
            "rating": 4.11,
            "url": "https://untappd.com/b/brewlok-brewery-gumilyov-gumilyov/3917909"
        },
        {
            "title": "Хармс \\ Harms",
            "type": "Stout - Russian Imperial",
            "rating": 4.09,
            "url": "https://untappd.com/b/brewlok-brewery-harms-harms/3917913"
        },
        {
            "title": "7 Вершин / 7 Summits",
            "type": "IPA - Imperial / Double",
            "rating": 3.78,
            "url": "https://untappd.com/b/brewlok-brewery-7-vershin-7-summits/4353984"
        },
        {
            "title": "Маяковский Том 1",
            "type": "Porter - Imperial / Double",
            "rating": 4.16,
            "url": "https://untappd.com/b/brewlok-brewery-mayakovskij-tom-1/2800418"
        },
        {
            "title": "Северянин / Severyanin Том 1",
            "type": "Barleywine - Other",
            "rating": 4.06,
            "url": "https://untappd.com/b/brewlok-brewery-severyanin-severyanin-tom-1/4119481"
        },
        {
            "title": "DOS",
            "type": "Stout - Imperial / Double Oatmeal",
            "rating": 3.99,
            "url": "https://untappd.com/b/brewlok-brewery-dos/2468448"
        },
        {
            "title": "Якуб Колас",
            "type": "Stout - Russian Imperial",
            "rating": 4.22,
            "url": "https://untappd.com/b/brewlok-brewery-yakub-kolas/3301938"
        },
        {
            "title": "Бунинъ. Том 7 / Bunin. Volume 7",
            "type": "Stout - Russian Imperial",
            "rating": 4.21,
            "url": "https://untappd.com/b/brewlok-brewery-bunin-tom-7-bunin-volume-7/4621399"
        },
        {
            "title": "Диковинка / Dikovinka",
            "type": "IPA - Imperial / Double",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewlok-brewery-dikovinka-dikovinka/3782480"
        },
        {
            "title": "Pilsen",
            "type": "Pilsner - German",
            "rating": 3.43,
            "url": "https://untappd.com/b/brewlok-brewery-pilsen/1793224"
        },
        {
            "title": "LOVE SWEET TEARS (Black Currant Edition)",
            "type": "Mead - Other",
            "rating": 4.11,
            "url": "https://untappd.com/b/brewlok-brewery-love-sweet-tears-black-currant-edition/3917917"
        },
        {
            "title": "Release The Bats",
            "type": "Stout - Other",
            "rating": 3.87,
            "url": "https://untappd.com/b/brewlok-brewery-release-the-bats/2566054"
        },
        {
            "title": "Шиворот-навыворот / Shivorot-Navyvorot",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewlok-brewery-shivorot-navyvorot-shivorot-navyvorot/3647806"
        },
        {
            "title": "Цветаева",
            "type": "Barleywine - Other",
            "rating": 4.09,
            "url": "https://untappd.com/b/brewlok-brewery-cvetaeva/3100268"
        },
        {
            "title": "Утопия",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.69,
            "url": "https://untappd.com/b/brewlok-brewery-utopiya/4788224"
        },
        {
            "title": "Бунинъ. Том 4 / Bunin. Volume 4",
            "type": "Stout - Russian Imperial",
            "rating": 4.29,
            "url": "https://untappd.com/b/brewlok-brewery-bunin-tom-4-bunin-4/3587359"
        },
        {
            "title": "Пропеллер",
            "type": "Stout - Russian Imperial",
            "rating": 4.11,
            "url": "https://untappd.com/b/brewlok-brewery-propeller/3168291"
        },
        {
            "title": "Бунинъ. Том 5 / Bunin. Volume 5",
            "type": "Stout - Russian Imperial",
            "rating": 4.18,
            "url": "https://untappd.com/b/brewlok-brewery-bunin-tom-5-bunin-volume-5/3894175"
        },
        {
            "title": "Гарафена / Garafena",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-garafena-garafena/4476562"
        },
        {
            "title": "Жидкое мясо / Zhidkoe myaso",
            "type": "Stout - Other",
            "rating": 3.45,
            "url": "https://untappd.com/b/brewlok-brewery-zhidkoe-myaso-zhidkoe-myaso/4147867"
        },
        {
            "title": "Vasilisa / Василиса",
            "type": "Stout - Imperial / Double Oatmeal",
            "rating": 4.06,
            "url": "https://untappd.com/b/brewlok-brewery-vasilisa-vasilisa/4585406"
        },
        {
            "title": "Тигррр | Tigerrr",
            "type": "Bock - Doppelbock",
            "rating": 3.79,
            "url": "https://untappd.com/b/brewlok-brewery-tigrrr-tigerrr/4629971"
        },
        {
            "title": "Виражи / Virazhi",
            "type": "IPA - Imperial / Double Black",
            "rating": 3.88,
            "url": "https://untappd.com/b/brewlok-brewery-virazhi-virazhi/4147865"
        },
        {
            "title": "Sourdept Guava",
            "type": "Sour - Fruited",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-sourdept-guava/3241935"
        },
        {
            "title": "Naked Lunch",
            "type": "IPA - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-naked-lunch/2853527"
        },
        {
            "title": "Illusion",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.65,
            "url": "https://untappd.com/b/brewlok-brewery-illusion/4284737"
        },
        {
            "title": "SoS Stay One Stout",
            "type": "Stout - American",
            "rating": 3.92,
            "url": "https://untappd.com/b/brewlok-brewery-sos-stay-one-stout/1469973"
        },
        {
            "title": "Блок. Том 2. Глава 1",
            "type": "Barleywine - English",
            "rating": 4.16,
            "url": "https://untappd.com/b/brewlok-brewery-blok-tom-2-glava-1/4677567"
        },
        {
            "title": "Зощенко",
            "type": "Stout - Russian Imperial",
            "rating": 4.02,
            "url": "https://untappd.com/b/brewlok-brewery-zoshenko/3262732"
        },
        {
            "title": "Есенин. Том 2 / Esenin. Volume 2",
            "type": "Stout - Russian Imperial",
            "rating": 4.1,
            "url": "https://untappd.com/b/brewlok-brewery-esenin-tom-2-esenin-volume-2/3828610"
        },
        {
            "title": "Огни над Воронежем | Lights Over Voronezh",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.96,
            "url": "https://untappd.com/b/brewlok-brewery-ogni-nad-voronezhem-lights-over-voronezh/4534090"
        },
        {
            "title": "Хармс. Том 2 / Harms. Volume 2",
            "type": "Stout - Russian Imperial",
            "rating": 4.22,
            "url": "https://untappd.com/b/brewlok-brewery-harms-tom-2-harms-volume-2/4119485"
        },
        {
            "title": "Тип-топ / Tip-top",
            "type": "Sour - Fruited",
            "rating": 3.63,
            "url": "https://untappd.com/b/brewlok-brewery-tip-top-tip-top/3691095"
        },
        {
            "title": "La Petite Fleur",
            "type": "Wild Ale - Other",
            "rating": 4.25,
            "url": "https://untappd.com/b/brewlok-brewery-la-petite-fleur/4093513"
        },
        {
            "title": "Достоевский. Том 3",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.22,
            "url": "https://untappd.com/b/brewlok-brewery-dostoevskij-tom-3/2410453"
        },
        {
            "title": "Дисгармония #4 Passion Fruit & Raspberry",
            "type": "Sour - Fruited",
            "rating": 3.96,
            "url": "https://untappd.com/b/brewlok-brewery-disgarmoniya-4-passion-fruit-and-raspberry/3121006"
        },
        {
            "title": "Волошин. Том 1",
            "type": "Barleywine - Other",
            "rating": 4.18,
            "url": "https://untappd.com/b/brewlok-brewery-voloshin-tom-1/4896680"
        },
        {
            "title": "Ой, всё!? / Oy, Vsyo!?",
            "type": "IPA - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/brewlok-brewery-oj-vse-oj-vse/3782478"
        },
        {
            "title": "Texture 1",
            "type": "Stout - Russian Imperial",
            "rating": 4.07,
            "url": "https://untappd.com/b/brewlok-brewery-texture-1/2950766"
        },
        {
            "title": "Морской Волк",
            "type": "Porter - Baltic",
            "rating": 3.89,
            "url": "https://untappd.com/b/brewlok-brewery-morskoj-volk/2420300"
        },
        {
            "title": "Vanilla",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.49,
            "url": "https://untappd.com/b/brewlok-brewery-vanilla/4268701"
        },
        {
            "title": "Платонов. Том 2",
            "type": "Stout - Russian Imperial",
            "rating": 4.14,
            "url": "https://untappd.com/b/brewlok-brewery-platonov-tom-2/3136802"
        },
        {
            "title": "Холодное пламя",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.9,
            "url": "https://untappd.com/b/brewlok-brewery-holodnoe-plamya/4534842"
        },
        {
            "title": "Авангард / Vanguard",
            "type": "Mead - Melomel",
            "rating": 3.84,
            "url": "https://untappd.com/b/brewlok-brewery-avangard-vanguard/4206424"
        },
        {
            "title": "Платонов. Том 3",
            "type": "Stout - Russian Imperial",
            "rating": 4.13,
            "url": "https://untappd.com/b/brewlok-brewery-platonov-tom-3/3575354"
        },
        {
            "title": "Нехороший лес",
            "type": "IPA - Imperial / Double Black",
            "rating": 3.84,
            "url": "https://untappd.com/b/brewlok-brewery-nehoroshij-les/4685669"
        },
        {
            "title": "A R.I.S. Like This",
            "type": "Stout - Russian Imperial",
            "rating": 4.12,
            "url": "https://untappd.com/b/brewlok-brewery-a-r-i-s-like-this/3362378"
        },
        {
            "title": "За Тридевять Земель / Za Trıdevyat Zemel",
            "type": "Sour - Fruited",
            "rating": 4.02,
            "url": "https://untappd.com/b/brewlok-brewery-za-tridevyat-zemel-za-tridevyat-zemel/3703570"
        },
        {
            "title": "Достоевский. Том 6",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.07,
            "url": "https://untappd.com/b/brewlok-brewery-dostoevskij-tom-6/4088316"
        },
        {
            "title": "Flashback",
            "type": "IPA - Milkshake",
            "rating": 3.71,
            "url": "https://untappd.com/b/brewlok-brewery-flashback/3369501"
        },
        {
            "title": "Connais-Toi Toi-Même",
            "type": "Belgian Quadrupel",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewlok-brewery-connais-toi-toi-meme/3692173"
        },
        {
            "title": "Gose Mango & Lychee & Guava",
            "type": "Sour - Fruited Gose",
            "rating": 3.75,
            "url": "https://untappd.com/b/brewlok-brewery-gose-mango-and-lychee-and-guava/4378601"
        },
        {
            "title": "Here Comes the Hops!",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.75,
            "url": "https://untappd.com/b/brewlok-brewery-here-comes-the-hops/4476558"
        },
        {
            "title": "Конфитюр",
            "type": "Sour - Fruited",
            "rating": 3.73,
            "url": "https://untappd.com/b/brewlok-brewery-konfityur/4296448"
        },
        {
            "title": "Вихрь\\Vihr",
            "type": "IPA - New England / Hazy",
            "rating": 3.64,
            "url": "https://untappd.com/b/brewlok-brewery-vihr-vihr/3974125"
        },
        {
            "title": "Babaev",
            "type": "IPA - Quadruple",
            "rating": 3.87,
            "url": "https://untappd.com/b/brewlok-brewery-babaev/4753171"
        },
        {
            "title": "Pils",
            "type": "Pilsner - German",
            "rating": 3.56,
            "url": "https://untappd.com/b/brewlok-brewery-pils/4201880"
        },
        {
            "title": "Лють. Невымороженная",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.22,
            "url": "https://untappd.com/b/brewlok-brewery-lyut-nevymorozhennaya/2918534"
        },
        {
            "title": "Sunday Drive",
            "type": "IPA - American",
            "rating": 3.81,
            "url": "https://untappd.com/b/brewlok-brewery-sunday-drive/1652043"
        },
        {
            "title": "Сибирская тьма",
            "type": "Stout - Milk / Sweet",
            "rating": 4.03,
            "url": "https://untappd.com/b/brewlok-brewery-sibirskaya-tma/4689880"
        },
        {
            "title": "Sommer In Berlin",
            "type": "Sour - Berliner Weisse",
            "rating": 3.96,
            "url": "https://untappd.com/b/brewlok-brewery-sommer-in-berlin/1694492"
        },
        {
            "title": "Броневик",
            "type": "Stout - Russian Imperial",
            "rating": 3.94,
            "url": "https://untappd.com/b/brewlok-brewery-bronevik/3706557"
        },
        {
            "title": "Цап-царап \\ Tsap-tsarap",
            "type": "IPA - Imperial / Double",
            "rating": 3.71,
            "url": "https://untappd.com/b/brewlok-brewery-cap-carap-tsap-tsarap/3935333"
        },
        {
            "title": "Чехов. Том 1.",
            "type": "Porter - Other",
            "rating": 4.23,
            "url": "https://untappd.com/b/brewlok-brewery-chehov-tom-1/4962003"
        },
        {
            "title": "Goa IPA",
            "type": "IPA - Red",
            "rating": 3.68,
            "url": "https://untappd.com/b/brewlok-brewery-goa-ipa/2496979"
        },
        {
            "title": "Арап Петра Великого",
            "type": "Stout - Russian Imperial",
            "rating": 3.95,
            "url": "https://untappd.com/b/brewlok-brewery-arap-petra-velikogo/2178841"
        },
        {
            "title": "Firestarter",
            "type": "Sour - Fruited",
            "rating": 3.96,
            "url": "https://untappd.com/b/brewlok-brewery-firestarter/3471102"
        },
        {
            "title": "Гренадер",
            "type": "Barleywine - Other",
            "rating": 3.85,
            "url": "https://untappd.com/b/brewlok-brewery-grenader/3361050"
        },
        {
            "title": "Ночной дозор",
            "type": "Barleywine - Other",
            "rating": 3.97,
            "url": "https://untappd.com/b/brewlok-brewery-nochnoj-dozor/3361046"
        },
        {
            "title": "Chaos In the New England",
            "type": "IPA - New England / Hazy",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-chaos-in-the-new-england/3471100"
        },
        {
            "title": "Berliner Weisse Pomegranate & Blueberry",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.85,
            "url": "https://untappd.com/b/brewlok-brewery-berliner-weisse-pomegranate-and-blueberry/4345033"
        },
        {
            "title": "Evil Fruits",
            "type": "Sour - Fruited",
            "rating": 4.1,
            "url": "https://untappd.com/b/brewlok-brewery-evil-fruits/3168298"
        },
        {
            "title": "Достоевский. Том 8",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.21,
            "url": "https://untappd.com/b/brewlok-brewery-dostoevskij-tom-8/5150970"
        },
        {
            "title": "Мандельштам. Том 1. Глава 2",
            "type": "Stout - Russian Imperial",
            "rating": 4.14,
            "url": "https://untappd.com/b/brewlok-brewery-mandelshtam-tom-1-glava-2/4715559"
        },
        {
            "title": "Feel Good",
            "type": "IPA - American",
            "rating": 3.9,
            "url": "https://untappd.com/b/brewlok-brewery-feel-good/1652042"
        },
        {
            "title": "5 из 5",
            "type": "Bock - Doppelbock",
            "rating": 3.53,
            "url": "https://untappd.com/b/brewlok-brewery-5-iz-5/4112595"
        },
        {
            "title": "Mikser",
            "type": "IPA - New England / Hazy",
            "rating": 3.82,
            "url": "https://untappd.com/b/brewlok-brewery-mikser/3262733"
        },
        {
            "title": "Волнительный / Volnitel'nyj",
            "type": "IPA - New England / Hazy",
            "rating": 3.27,
            "url": "https://untappd.com/b/brewlok-brewery-volnitelnyj-volnitel-nyj/3828604"
        },
        {
            "title": "CRANBERRY DREAMS",
            "type": "Sour - Fruited Gose",
            "rating": 3.64,
            "url": "https://untappd.com/b/brewlok-brewery-cranberry-dreams/2587112"
        },
        {
            "title": "Fruit Surfin",
            "type": "IPA - Milkshake",
            "rating": 3.78,
            "url": "https://untappd.com/b/brewlok-brewery-fruit-surfin/3470243"
        },
        {
            "title": "Rediscovering Thyself",
            "type": "IPA - Other",
            "rating": 3.78,
            "url": "https://untappd.com/b/brewlok-brewery-rediscovering-thyself/5021023"
        },
        {
            "title": "Sourdept Kalamansi",
            "type": "Sour - Fruited",
            "rating": 3.69,
            "url": "https://untappd.com/b/brewlok-brewery-sourdept-kalamansi/3362329"
        },
        {
            "title": "Сильфиды",
            "type": "Wild Ale - Other",
            "rating": 3.85,
            "url": "https://untappd.com/b/brewlok-brewery-silfidy/4889410"
        },
        {
            "title": "Дисгармония #2 Passion Fruit",
            "type": "Sour - Fruited",
            "rating": 3.87,
            "url": "https://untappd.com/b/brewlok-brewery-disgarmoniya-2-passion-fruit/3093606"
        },
        {
            "title": "Мамин-Сибиряк. Глава 3. Том 1",
            "type": "Stout - Russian Imperial",
            "rating": 4.24,
            "url": "https://untappd.com/b/brewlok-brewery-mamin-sibiryak-glava-3-tom-1/4715562"
        },
        {
            "title": "Le Baiser De Cassis",
            "type": "Wild Ale - American",
            "rating": 4.03,
            "url": "https://untappd.com/b/brewlok-brewery-le-baiser-de-cassis/3585074"
        },
        {
            "title": "Будьте добры ипу",
            "type": "IPA - Other",
            "rating": 3.84,
            "url": "https://untappd.com/b/brewlok-brewery-budte-dobry-ipu/5147820"
        },
        {
            "title": "Садко",
            "type": "Lager - Helles",
            "rating": 3.63,
            "url": "https://untappd.com/b/brewlok-brewery-sadko/4953181"
        },
        {
            "title": "Достоевский. Том 7",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.23,
            "url": "https://untappd.com/b/brewlok-brewery-dostoevskij-tom-7/4831148"
        },
        {
            "title": "Le Baiser De Cerise",
            "type": "Wild Ale - American",
            "rating": 4.05,
            "url": "https://untappd.com/b/brewlok-brewery-le-baiser-de-cerise/3585072"
        },
        {
            "title": "Splash",
            "type": "IPA - Sour",
            "rating": 3.79,
            "url": "https://untappd.com/b/brewlok-brewery-splash/3562720"
        },
        {
            "title": "Мамин-Сибиряк. Глава 2. Том 1",
            "type": "Stout - Russian Imperial",
            "rating": 4.23,
            "url": "https://untappd.com/b/brewlok-brewery-mamin-sibiryak-glava-2-tom-1/4715561"
        },
        {
            "title": "Hopland",
            "type": "IPA - New England / Hazy",
            "rating": 3.56,
            "url": "https://untappd.com/b/brewlok-brewery-hopland/3140777"
        },
        {
            "title": "Fruit Dealer Apricot Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.76,
            "url": "https://untappd.com/b/brewlok-brewery-fruit-dealer-apricot-saison/1593443"
        },
        {
            "title": "Дисгармония #3 Raspberry",
            "type": "Sour - Fruited",
            "rating": 3.86,
            "url": "https://untappd.com/b/brewlok-brewery-disgarmoniya-3-raspberry/3129327"
        },
        {
            "title": "Trip To Grandma",
            "type": "Sour - Other",
            "rating": 3.68,
            "url": "https://untappd.com/b/brewlok-brewery-trip-to-grandma/4969936"
        },
        {
            "title": "Шебутуй \\ SHebutuj",
            "type": "Sour - Fruited",
            "rating": 3.75,
            "url": "https://untappd.com/b/brewlok-brewery-shebutuj-shebutuj/3935318"
        },
        {
            "title": "Волошин. Том 1. Глава 2",
            "type": "Barleywine - Other",
            "rating": 4.13,
            "url": "https://untappd.com/b/brewlok-brewery-voloshin-tom-1-glava-2/5045086"
        },
        {
            "title": "DOS Barrel Aged",
            "type": "Stout - Imperial / Double Oatmeal",
            "rating": 3.98,
            "url": "https://untappd.com/b/brewlok-brewery-dos-barrel-aged/2779863"
        },
        {
            "title": "Simple Joy",
            "type": "IPA - Triple",
            "rating": 3.9,
            "url": "https://untappd.com/b/brewlok-brewery-simple-joy/2976891"
        },
        {
            "title": "Садовод",
            "type": "Sour - Fruited",
            "rating": 3.64,
            "url": "https://untappd.com/b/brewlok-brewery-sadovod/2378880"
        },
        {
            "title": "Цыганочка \\ Cyganochka",
            "type": "Stout - Milk / Sweet",
            "rating": 3.76,
            "url": "https://untappd.com/b/brewlok-brewery-cyganochka-cyganochka/4154699"
        },
        {
            "title": "Лысый Шарлатан",
            "type": "IPA - Black / Cascadian Dark Ale",
            "rating": 3.76,
            "url": "https://untappd.com/b/brewlok-brewery-lysyj-sharlatan/5239659"
        },
        {
            "title": "Платонов. Том 1",
            "type": "Stout - Russian Imperial",
            "rating": 4.21,
            "url": "https://untappd.com/b/brewlok-brewery-platonov-tom-1/2831838"
        },
        {
            "title": "Мамин-Сибиряк. Глава 4. Том 1",
            "type": "Stout - Russian Imperial",
            "rating": 4.23,
            "url": "https://untappd.com/b/brewlok-brewery-mamin-sibiryak-glava-4-tom-1/4715564"
        },
        {
            "title": "Brewmistry S01E01: Blueberry Dark Sour",
            "type": "Sour - Fruited",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewlok-brewery-brewmistry-s01e01-blueberry-dark-sour/2215008"
        },
        {
            "title": "Leshak / Лешак",
            "type": "IPA - American",
            "rating": 3.71,
            "url": "https://untappd.com/b/brewlok-brewery-leshak-leshak/2345988"
        },
        {
            "title": "Черный флаг \\ Chernyj Flag",
            "type": "Porter - English",
            "rating": 3.63,
            "url": "https://untappd.com/b/brewlok-brewery-chernyj-flag-chernyj-flag/4148887"
        },
        {
            "title": "African Pale Ale #14",
            "type": "Pale Ale - Other",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewlok-brewery-african-pale-ale-14/2038743"
        },
        {
            "title": "Чернолесье / Chernoles'e",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-chernolese-chernoles-e/4446665"
        },
        {
            "title": "Gosedept Black Currant",
            "type": "Sour - Fruited Gose",
            "rating": 3.98,
            "url": "https://untappd.com/b/brewlok-brewery-gosedept-black-currant/3327351"
        },
        {
            "title": "Армида",
            "type": "Wild Ale - Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/brewlok-brewery-armida/4889398"
        },
        {
            "title": "Если Бы Да Кабы",
            "type": "Sour - Fruited",
            "rating": 3.78,
            "url": "https://untappd.com/b/brewlok-brewery-esli-by-da-kaby/3585081"
        },
        {
            "title": "Ziggy Hopdust",
            "type": "IPA - New England / Hazy",
            "rating": 3.51,
            "url": "https://untappd.com/b/brewlok-brewery-ziggy-hopdust/3413355"
        },
        {
            "title": "Декабрь",
            "type": "Sour - Other",
            "rating": 3.85,
            "url": "https://untappd.com/b/brewlok-brewery-dekabr/4677626"
        },
        {
            "title": "Баюшки-баю / Bayushki-Bayu",
            "type": "IPA - Triple New England / Hazy",
            "rating": 3.6,
            "url": "https://untappd.com/b/brewlok-brewery-bayushki-bayu-bayushki-bayu/3647805"
        },
        {
            "title": "Колхозный панк",
            "type": "Red Ale - Irish",
            "rating": 3.57,
            "url": "https://untappd.com/b/brewlok-brewery-kolhoznyj-pank/5171296"
        },
        {
            "title": "Хой",
            "type": "Pale Ale - American",
            "rating": 3.51,
            "url": "https://untappd.com/b/brewlok-brewery-hoj/5167732"
        },
        {
            "title": "Атолла",
            "type": "Stout - Milk / Sweet",
            "rating": 3.76,
            "url": "https://untappd.com/b/brewlok-brewery-atolla/4815288"
        },
        {
            "title": "Дюжий \\ Dyuzhij",
            "type": "IPA - Imperial / Double",
            "rating": 3.68,
            "url": "https://untappd.com/b/brewlok-brewery-dyuzhij-dyuzhij/4008290"
        },
        {
            "title": "Мамин-Сибиряк. Глава 1. Том 1",
            "type": "Stout - Russian Imperial",
            "rating": 4.29,
            "url": "https://untappd.com/b/brewlok-brewery-mamin-sibiryak-glava-1-tom-1/4715560"
        },
        {
            "title": "IPA 70",
            "type": "IPA - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/brewlok-brewery-ipa-70/1448834"
        },
        {
            "title": "Уже",
            "type": "IPA - New England / Hazy",
            "rating": 3.74,
            "url": "https://untappd.com/b/brewlok-brewery-uzhe/4595524"
        },
        {
            "title": "Psycho",
            "type": "Sour - Fruited Gose",
            "rating": 3.66,
            "url": "https://untappd.com/b/brewlok-brewery-psycho/2855112"
        },
        {
            "title": "Berliner Weisse Малина & Черника / Berliner Weisse Raspberry & Blueberry",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.73,
            "url": "https://untappd.com/b/brewlok-brewery-berliner-weisse-malina-and-chernika-berliner-weisse-raspberry-and-blueberry/4467692"
        },
        {
            "title": "Top Secret Double Black IPA",
            "type": "IPA - Imperial / Double Black",
            "rating": 3.88,
            "url": "https://untappd.com/b/brewlok-brewery-top-secret-double-black-ipa/2497008"
        },
        {
            "title": "Ни Че Го \\ Ni Che Go",
            "type": "Non-Alcoholic Beer - IPA",
            "rating": 3.26,
            "url": "https://untappd.com/b/brewlok-brewery-ni-che-go-ni-che-go/4343008"
        },
        {
            "title": "Юность Ломоносова \\ Junost Lomonosova",
            "type": "Cider - Sweet",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewlok-brewery-yunost-lomonosova-junost-lomonosova/4017354"
        },
        {
            "title": "Berlinier Weisse Blackberry & Raspberry",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.78,
            "url": "https://untappd.com/b/brewlok-brewery-berlinier-weisse-blackberry-and-raspberry/4401983"
        },
        {
            "title": "Банка",
            "type": "Lager - Vienna",
            "rating": 3.68,
            "url": "https://untappd.com/b/brewlok-brewery-banka/5171290"
        },
        {
            "title": "Full Ahead RGS",
            "type": "Stout - Other",
            "rating": 3.93,
            "url": "https://untappd.com/b/brewlok-brewery-full-ahead-rgs/1469975"
        },
        {
            "title": "Bambula",
            "type": "IPA - Milkshake",
            "rating": 3.97,
            "url": "https://untappd.com/b/brewlok-brewery-bambula/2638988"
        },
        {
            "title": "7 Вершин | 7 Summits Damavand",
            "type": "Stout - Russian Imperial",
            "rating": 4.05,
            "url": "https://untappd.com/b/brewlok-brewery-7-vershin-7-summits-damavand/5205052"
        },
        {
            "title": "Aloha!",
            "type": "IPA - Milkshake",
            "rating": 3.74,
            "url": "https://untappd.com/b/brewlok-brewery-aloha/3047222"
        },
        {
            "title": "Sour For the Masses",
            "type": "Sour - Fruited",
            "rating": 3.52,
            "url": "https://untappd.com/b/brewlok-brewery-sour-for-the-masses/3401039"
        },
        {
            "title": "Dicha Buckthorn & Raspberry",
            "type": "Sour - Fruited",
            "rating": 3.81,
            "url": "https://untappd.com/b/brewlok-brewery-dicha-buckthorn-and-raspberry/2801530"
        },
        {
            "title": "Волошин. Том 1. Глава 3",
            "type": "Barleywine - Other",
            "rating": 4.07,
            "url": "https://untappd.com/b/brewlok-brewery-voloshin-tom-1-glava-3/5056340"
        },
        {
            "title": "Маяковский. Том 2. Глава 1",
            "type": "Stout - Russian Imperial",
            "rating": 4.1,
            "url": "https://untappd.com/b/brewlok-brewery-mayakovskij-tom-2-glava-1/5122580"
        },
        {
            "title": "Hungry",
            "type": "IPA - New England / Hazy",
            "rating": 3.77,
            "url": "https://untappd.com/b/brewlok-brewery-hungry/4610790"
        },
        {
            "title": "Gosedept Blueberry",
            "type": "Sour - Fruited Gose",
            "rating": 3.73,
            "url": "https://untappd.com/b/brewlok-brewery-gosedept-blueberry/3368650"
        },
        {
            "title": "Souredept",
            "type": "Sour - Berliner Weisse",
            "rating": 3.78,
            "url": "https://untappd.com/b/brewlok-brewery-souredept/3322368"
        },
        {
            "title": "Viy / Вий",
            "type": "IPA - Imperial / Double",
            "rating": 3.68,
            "url": "https://untappd.com/b/brewlok-brewery-viy-vij/2468447"
        },
        {
            "title": "Public Enemy",
            "type": "Pale Ale - American",
            "rating": 3.77,
            "url": "https://untappd.com/b/brewlok-brewery-public-enemy/2566057"
        },
        {
            "title": "Hopland #2",
            "type": "IPA - New England / Hazy",
            "rating": 3.78,
            "url": "https://untappd.com/b/brewlok-brewery-hopland-2/3234204"
        },
        {
            "title": "Приди в себя",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.59,
            "url": "https://untappd.com/b/brewlok-brewery-pridi-v-sebya/4626619"
        },
        {
            "title": "Местные",
            "type": "Brown Ale - Other",
            "rating": 3.71,
            "url": "https://untappd.com/b/brewlok-brewery-mestnye/5171291"
        },
        {
            "title": "Мандельштам. Том 1. Глава 1",
            "type": "Stout - Russian Imperial",
            "rating": 4.11,
            "url": "https://untappd.com/b/brewlok-brewery-mandelshtam-tom-1-glava-1/4715556"
        },
        {
            "title": "Northberry",
            "type": "Sour - Fruited Gose",
            "rating": 3.71,
            "url": "https://untappd.com/b/brewlok-brewery-northberry/2711088"
        },
        {
            "title": "Нога Бога DDH Mosaic",
            "type": "IPA - New England / Hazy",
            "rating": 3.86,
            "url": "https://untappd.com/b/brewlok-brewery-noga-boga-ddh-mosaic/2833683"
        },
        {
            "title": "Da Da Da",
            "type": "Sour - Traditional Gose",
            "rating": 3.54,
            "url": "https://untappd.com/b/brewlok-brewery-da-da-da/2621567"
        },
        {
            "title": "Достоевский. Том 2",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.35,
            "url": "https://untappd.com/b/brewlok-brewery-dostoevskij-tom-2/2113795"
        },
        {
            "title": "Тишь Да Гладь / Tish Da Glad",
            "type": "Non-Alcoholic Beer - IPA",
            "rating": 2.8,
            "url": "https://untappd.com/b/brewlok-brewery-tish-da-glad-tish-da-glad/3682426"
        },
        {
            "title": "Воронежская личность",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.69,
            "url": "https://untappd.com/b/brewlok-brewery-voronezhskaya-lichnost/4677637"
        },
        {
            "title": "Drunk Deer",
            "type": "IPA - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/brewlok-brewery-drunk-deer/1879231"
        },
        {
            "title": "Булгаков. Том 3. Глава 1",
            "type": "Stout - Russian Imperial",
            "rating": 4.34,
            "url": "https://untappd.com/b/brewlok-brewery-bulgakov-tom-3-glava-1/4896683"
        },
        {
            "title": "Наглецы из Воронежа Pils",
            "type": "Pilsner - Other",
            "rating": 3.51,
            "url": "https://untappd.com/b/brewlok-brewery-naglecy-iz-voronezha-pills/4963605"
        },
        {
            "title": "Milkshake IPA Mango & White Chocolate",
            "type": "IPA - Milkshake",
            "rating": 3.72,
            "url": "https://untappd.com/b/brewlok-brewery-milkshake-ipa-mango-and-white-chocolate/4488017"
        },
        {
            "title": "Gosedept Lemongrass",
            "type": "Sour - Fruited Gose",
            "rating": 3.9,
            "url": "https://untappd.com/b/brewlok-brewery-gosedept-lemongrass/2108439"
        },
        {
            "title": "Достоевский. Том 4",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.28,
            "url": "https://untappd.com/b/brewlok-brewery-dostoevskij-tom-4/2410451"
        },
        {
            "title": "Красная Баронесса",
            "type": "Stout - Russian Imperial",
            "rating": 4.07,
            "url": "https://untappd.com/b/brewlok-brewery-krasnaya-baronessa/5209896"
        },
        {
            "title": "Lounge",
            "type": "Sour - Other",
            "rating": 3.6,
            "url": "https://untappd.com/b/brewlok-brewery-lounge/2667095"
        },
        {
            "title": "Double Black IPA #12",
            "type": "IPA - Imperial / Double Black",
            "rating": 3.87,
            "url": "https://untappd.com/b/brewlok-brewery-double-black-ipa-12/2017930"
        },
        {
            "title": "Dicha Buckthorn",
            "type": "Sour - Fruited",
            "rating": 3.67,
            "url": "https://untappd.com/b/brewlok-brewery-dicha-buckthorn/2801529"
        },
        {
            "title": "Бенгальские огни",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.63,
            "url": "https://untappd.com/b/brewlok-brewery-bengalskie-ogni/5197018"
        },
        {
            "title": "Call Me Later!",
            "type": "Brown Ale - Imperial / Double",
            "rating": 3.77,
            "url": "https://untappd.com/b/brewlok-brewery-call-me-later/2757144"
        },
        {
            "title": "[Un] Happy New Year",
            "type": "Bock - Doppelbock",
            "rating": 2.98,
            "url": "https://untappd.com/b/brewlok-brewery-un-happy-new-year/5162558"
        },
        {
            "title": "Дисгармония #5",
            "type": "Sour - Fruited",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-disgarmoniya-5/4141689"
        },
        {
            "title": "Нога Бога DDH Citra & Simcoe",
            "type": "IPA - New England / Hazy",
            "rating": 3.79,
            "url": "https://untappd.com/b/brewlok-brewery-noga-boga-ddh-citra-and-simcoe/2833636"
        },
        {
            "title": "Chocolate Stout #3",
            "type": "Stout - Other",
            "rating": 3.92,
            "url": "https://untappd.com/b/brewlok-brewery-chocolate-stout-3/1962410"
        },
        {
            "title": "Rye IPA",
            "type": "IPA - Rye",
            "rating": 3.74,
            "url": "https://untappd.com/b/brewlok-brewery-rye-ipa/1553695"
        },
        {
            "title": "Matryoshka",
            "type": "Porter - Other",
            "rating": 3.76,
            "url": "https://untappd.com/b/brewlok-brewery-matryoshka/2964219"
        },
        {
            "title": "Белый кот",
            "type": "Sour - Fruited",
            "rating": 3.57,
            "url": "https://untappd.com/b/brewlok-brewery-belyj-kot/4766869"
        },
        {
            "title": "Milk Stout #16",
            "type": "Stout - Milk / Sweet",
            "rating": 3.99,
            "url": "https://untappd.com/b/brewlok-brewery-milk-stout-16/2063207"
        },
        {
            "title": "Мошенник чувств и шантажист страданий",
            "type": "Sour - Fruited",
            "rating": 3.58,
            "url": "https://untappd.com/b/brewlok-brewery-moshennik-chuvstv-i-shantazhist-stradanij/4592581"
        },
        {
            "title": "New Heaven",
            "type": "IPA - New England / Hazy",
            "rating": 3.72,
            "url": "https://untappd.com/b/brewlok-brewery-new-heaven/2682232"
        },
        {
            "title": "Coconut NEIPA #28",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.84,
            "url": "https://untappd.com/b/brewlok-brewery-coconut-neipa-28/2178844"
        },
        {
            "title": "Voronezh Overshake | Грейпфрут, Каламанси, Мандарин",
            "type": "IPA - Milkshake",
            "rating": 3.47,
            "url": "https://untappd.com/b/brewlok-brewery-voronezh-overshake-grejpfrut-kalamansi-mandarin/5132906"
        },
        {
            "title": "Session Sour Ale #4",
            "type": "Sour - Other",
            "rating": 3.82,
            "url": "https://untappd.com/b/brewlok-brewery-session-sour-ale-4/1962417"
        },
        {
            "title": "На велосипеде",
            "type": "Sour - Fruited",
            "rating": 3.6,
            "url": "https://untappd.com/b/brewlok-brewery-na-velosipede/4775208"
        },
        {
            "title": "Житие мое / Zhitie moe",
            "type": "Sour - Fruited Gose",
            "rating": 3.71,
            "url": "https://untappd.com/b/brewlok-brewery-zhitie-moe-zhitie-moe/3855012"
        },
        {
            "title": "Pils",
            "type": "Pilsner - German",
            "rating": 3.48,
            "url": "https://untappd.com/b/brewlok-brewery-pils/1534204"
        },
        {
            "title": "Christmas Ale",
            "type": "Strong Ale - Other",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewlok-brewery-christmas-ale/3008557"
        },
        {
            "title": "I'm A Bird",
            "type": "Sour - Other",
            "rating": 3.57,
            "url": "https://untappd.com/b/brewlok-brewery-i-m-a-bird/4808535"
        },
        {
            "title": "Hopping Morning",
            "type": "Pilsner - Other",
            "rating": 3.68,
            "url": "https://untappd.com/b/brewlok-brewery-hopping-morning/3368655"
        },
        {
            "title": "OtiuqsoM | рамоК",
            "type": "IPA - Milkshake",
            "rating": 3.75,
            "url": "https://untappd.com/b/brewlok-brewery-otiuqsom-ramok/4507974"
        },
        {
            "title": "Horned Death",
            "type": "IPA - Other",
            "rating": 3.86,
            "url": "https://untappd.com/b/brewlok-brewery-horned-death/1895252"
        },
        {
            "title": "Red Dots",
            "type": "Sour - Fruited",
            "rating": 3.86,
            "url": "https://untappd.com/b/brewlok-brewery-red-dots/2686044"
        },
        {
            "title": "Kikimora Coconut Story | Кикимора с кокосом",
            "type": "Stout - Milk / Sweet",
            "rating": 3.79,
            "url": "https://untappd.com/b/brewlok-brewery-kikimora-coconut-story-kikimora-s-kokosom/5112975"
        },
        {
            "title": "Маяковский. Том 2. Глава 2",
            "type": "Stout - Russian Imperial",
            "rating": 4.14,
            "url": "https://untappd.com/b/brewlok-brewery-mayakovskij-tom-2-glava-2/5197002"
        },
        {
            "title": "Stoned Deer",
            "type": "IPA - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/brewlok-brewery-stoned-deer/1886900"
        },
        {
            "title": "Sour Ale Mango & Passion Fruit & Pear",
            "type": "Sour - Fruited",
            "rating": 3.72,
            "url": "https://untappd.com/b/brewlok-brewery-sour-ale-mango-and-passion-fruit-and-pear/4343003"
        },
        {
            "title": "Mosaic IPA #18",
            "type": "IPA - Other",
            "rating": 3.82,
            "url": "https://untappd.com/b/brewlok-brewery-mosaic-ipa-18/2077407"
        },
        {
            "title": "Milkshake IPA Mango & Lychee & Pink Guava",
            "type": "IPA - Milkshake",
            "rating": 3.7,
            "url": "https://untappd.com/b/brewlok-brewery-milkshake-ipa-mango-and-lychee-and-pink-guava/4378960"
        },
        {
            "title": "7 Вершин | 7 Summits Orizaba",
            "type": "Stout - Imperial / Double Milk",
            "rating": 4,
            "url": "https://untappd.com/b/brewlok-brewery-7-vershin-7-summits-orizaba/5205054"
        },
        {
            "title": "IPA 100",
            "type": "IPA - Imperial / Double",
            "rating": 3.97,
            "url": "https://untappd.com/b/brewlok-brewery-ipa-100/1514554"
        },
        {
            "title": "Tripple IPA #7",
            "type": "IPA - Imperial / Double",
            "rating": 3.97,
            "url": "https://untappd.com/b/brewlok-brewery-tripple-ipa-7/2017942"
        },
        {
            "title": "Gussar",
            "type": "IPA - Imperial / Double",
            "rating": 3.81,
            "url": "https://untappd.com/b/brewlok-brewery-gussar/1903510"
        },
        {
            "title": "Grenadier",
            "type": "IPA - Imperial / Double",
            "rating": 3.88,
            "url": "https://untappd.com/b/brewlok-brewery-grenadier/1903521"
        },
        {
            "title": "Бунинъ. Том 6 / Bunin. Volume 6",
            "type": "Stout - Russian Imperial",
            "rating": 3.85,
            "url": "https://untappd.com/b/brewlok-brewery-bunin-tom-6-bunin-volume-6/4523836"
        },
        {
            "title": "IPA 45",
            "type": "IPA - American",
            "rating": 3.91,
            "url": "https://untappd.com/b/brewlok-brewery-ipa-45/1334855"
        },
        {
            "title": "Призрак у дороги",
            "type": "Porter - Other",
            "rating": 3.77,
            "url": "https://untappd.com/b/brewlok-brewery-prizrak-u-dorogi/5239656"
        },
        {
            "title": "DIPA #2",
            "type": "IPA - Imperial / Double",
            "rating": 3.87,
            "url": "https://untappd.com/b/brewlok-brewery-dipa-2/1942185"
        },
        {
            "title": "1915 Blueberry Edition",
            "type": "Stout - Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/brewlok-brewery-1915-blueberry-edition/1974766"
        },
        {
            "title": "Belma Session IPA #29",
            "type": "IPA - Session",
            "rating": 3.78,
            "url": "https://untappd.com/b/brewlok-brewery-belma-session-ipa-29/2194802"
        },
        {
            "title": "Северянин. Том 2",
            "type": "Barleywine - Other",
            "rating": 3.59,
            "url": "https://untappd.com/b/brewlok-brewery-severyanin-tom-2/5176132"
        },
        {
            "title": "Достоевский. Том 7. Глава 2",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.23,
            "url": "https://untappd.com/b/brewlok-brewery-dostoevskij-tom-7-glava-2/4880711"
        },
        {
            "title": "Голуби",
            "type": "Sour - Other",
            "rating": 3.43,
            "url": "https://untappd.com/b/brewlok-brewery-golubi/4798473"
        },
        {
            "title": "Пропеллер Barrel Aged",
            "type": "Stout - Imperial / Double",
            "rating": 4.02,
            "url": "https://untappd.com/b/brewlok-brewery-propeller-barrel-aged/3324383"
        },
        {
            "title": "Булгаков. Том 3. Глава 2",
            "type": "Stout - Russian Imperial",
            "rating": 4.27,
            "url": "https://untappd.com/b/brewlok-brewery-bulgakov-tom-3-glava-2/4912301"
        },
        {
            "title": "Chinook IPA #19",
            "type": "IPA - Other",
            "rating": 3.72,
            "url": "https://untappd.com/b/brewlok-brewery-chinook-ipa-19/2101019"
        },
        {
            "title": "American Pilsner",
            "type": "Pilsner - Other",
            "rating": 3.64,
            "url": "https://untappd.com/b/brewlok-brewery-american-pilsner/4093503"
        },
        {
            "title": "New World Hops IPA #21",
            "type": "IPA - Session",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-new-world-hops-ipa-21/2113951"
        },
        {
            "title": "DIPA #5",
            "type": "IPA - Imperial / Double",
            "rating": 3.84,
            "url": "https://untappd.com/b/brewlok-brewery-dipa-5/2009788"
        },
        {
            "title": "Sappy",
            "type": "Pale Ale - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/brewlok-brewery-sappy/2587200"
        },
        {
            "title": "DIPA #6",
            "type": "IPA - Imperial / Double",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewlok-brewery-dipa-6/2009789"
        },
        {
            "title": "Tomato Gose Cilantro",
            "type": "Sour - Other Gose",
            "rating": 3.21,
            "url": "https://untappd.com/b/brewlok-brewery-tomato-gose-cilantro/4912078"
        },
        {
            "title": "Belgian Fruit Ale Kriek",
            "type": "Fruit Beer",
            "rating": 3.7,
            "url": "https://untappd.com/b/brewlok-brewery-belgian-fruit-ale-kriek/5100433"
        },
        {
            "title": "Sourdept Kalamansi & Raspberry",
            "type": "Sour - Fruited",
            "rating": 4.03,
            "url": "https://untappd.com/b/brewlok-brewery-sourdept-kalamansi-and-raspberry/3392592"
        },
        {
            "title": "Weissbier",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.6,
            "url": "https://untappd.com/b/brewlok-brewery-weissbier/1134119"
        },
        {
            "title": "The Model",
            "type": "Sour - Other",
            "rating": 3.36,
            "url": "https://untappd.com/b/brewlok-brewery-the-model/5021019"
        },
        {
            "title": "Бунинъ. Том 3 / Bunin. Volume 3",
            "type": "Stout - Russian Imperial",
            "rating": 4.34,
            "url": "https://untappd.com/b/brewlok-brewery-bunin-tom-3-bunin-3/2831837"
        },
        {
            "title": "American Strong Ale",
            "type": "Strong Ale - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-american-strong-ale/1593432"
        },
        {
            "title": "Session IPA #10",
            "type": "IPA - Session",
            "rating": 3.79,
            "url": "https://untappd.com/b/brewlok-brewery-session-ipa-10/2027753"
        },
        {
            "title": "IPA 75",
            "type": "IPA - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/brewlok-brewery-ipa-75/1495466"
        },
        {
            "title": "Doppelbock Winter Edition",
            "type": "Bock - Doppelbock",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewlok-brewery-doppelbock-winter-edition/1895365"
        },
        {
            "title": "Наглецы из Воронежа Stout",
            "type": "Stout - Other",
            "rating": 3.55,
            "url": "https://untappd.com/b/brewlok-brewery-naglecy-iz-voronezha-stout/4963607"
        },
        {
            "title": "Воскресение Helles",
            "type": "Lager - Helles",
            "rating": 3.62,
            "url": "https://untappd.com/b/brewlok-brewery-voskresene-helles/5140028"
        },
        {
            "title": "IPA 60",
            "type": "IPA - American",
            "rating": 3.95,
            "url": "https://untappd.com/b/brewlok-brewery-ipa-60/1404946"
        },
        {
            "title": "Где я пройду",
            "type": "Sour - Other Gose",
            "rating": 2.97,
            "url": "https://untappd.com/b/brewlok-brewery-gde-ya-projdu/4597566"
        },
        {
            "title": "Tomato Gose Basil",
            "type": "Sour - Other Gose",
            "rating": 3.57,
            "url": "https://untappd.com/b/brewlok-brewery-tomato-gose-basil/4912075"
        },
        {
            "title": "IPA 49",
            "type": "IPA - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/brewlok-brewery-ipa-49/1586474"
        },
        {
            "title": "DIPA #1",
            "type": "IPA - Imperial / Double",
            "rating": 3.77,
            "url": "https://untappd.com/b/brewlok-brewery-dipa-1/1924796"
        },
        {
            "title": "Simple IPA #15",
            "type": "IPA - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewlok-brewery-simple-ipa-15/2053552"
        },
        {
            "title": "Арап Петра Великого Barrel Aged",
            "type": "Stout - Russian Imperial",
            "rating": 3.85,
            "url": "https://untappd.com/b/brewlok-brewery-arap-petra-velikogo-barrel-aged/2402510"
        },
        {
            "title": "Feelini",
            "type": "IPA - Other",
            "rating": 3.59,
            "url": "https://untappd.com/b/brewlok-brewery-feelini/2686832"
        },
        {
            "title": "Эфириум",
            "type": "IPA - New England / Hazy",
            "rating": 3.7,
            "url": "https://untappd.com/b/brewlok-brewery-efirium/5267287"
        },
        {
            "title": "Таран",
            "type": "Porter - Other",
            "rating": 3.75,
            "url": "https://untappd.com/b/brewlok-brewery-taran/1297778"
        },
        {
            "title": "IPA 65",
            "type": "IPA - American",
            "rating": 3.95,
            "url": "https://untappd.com/b/brewlok-brewery-ipa-65/1495465"
        },
        {
            "title": "Так Так Так",
            "type": "Non-Alcoholic Beer - IPA",
            "rating": 2.82,
            "url": "https://untappd.com/b/brewlok-brewery-tak-tak-tak/4755000"
        },
        {
            "title": "Voronezh Overshake Белый шоколад - Манго",
            "type": "IPA - Milkshake",
            "rating": 3.53,
            "url": "https://untappd.com/b/brewlok-brewery-voronezh-overshake-belyj-shokolad-mango/5132901"
        },
        {
            "title": "APA",
            "type": "Pale Ale - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/brewlok-brewery-apa/1526195"
        },
        {
            "title": "Rusalka Raspberry & Strawberry",
            "type": "Sour - Fruited",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewlok-brewery-rusalka-raspberry-and-strawberry/2853559"
        },
        {
            "title": "Texture 1. Non BA",
            "type": "Stout - Russian Imperial",
            "rating": 4.13,
            "url": "https://untappd.com/b/brewlok-brewery-texture-1-non-ba/2987291"
        },
        {
            "title": "IPA 50",
            "type": "IPA - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/brewlok-brewery-ipa-50/1387438"
        },
        {
            "title": "Bad Spring BA Rioja",
            "type": "Sour - Other",
            "rating": 3.81,
            "url": "https://untappd.com/b/brewlok-brewery-bad-spring-ba-rioja/2640886"
        },
        {
            "title": "Wild Ale W/raspberry Lobo Day Batch",
            "type": "Wild Ale - Other",
            "rating": 4,
            "url": "https://untappd.com/b/brewlok-brewery-wild-ale-w-raspberry-lobo-day-batch/4896682"
        },
        {
            "title": "Блаженство Бытия / Blazhenstvo Bytiya",
            "type": "Sour - Fruited Gose",
            "rating": 3.82,
            "url": "https://untappd.com/b/brewlok-brewery-blazhenstvo-bytiya-blazhenstvo-bytiya/3855014"
        },
        {
            "title": "Блок. Том 2. Глава 2",
            "type": "Barleywine - English",
            "rating": 4.17,
            "url": "https://untappd.com/b/brewlok-brewery-blok-tom-2-glava-2/4677569"
        },
        {
            "title": "Булгаков. Том 2",
            "type": "Stout - Russian Imperial",
            "rating": 4.36,
            "url": "https://untappd.com/b/brewlok-brewery-bulgakov-tom-2/2862054"
        },
        {
            "title": "LOVE SWEET DREAMS (Cherry Edition)",
            "type": "Mead - Melomel",
            "rating": 3.45,
            "url": "https://untappd.com/b/brewlok-brewery-love-sweet-dreams-cherry-edition/4077868"
        },
        {
            "title": "IPA 120",
            "type": "IPA - American",
            "rating": 3.73,
            "url": "https://untappd.com/b/brewlok-brewery-ipa-120/1260253"
        },
        {
            "title": "Сенсация",
            "type": "Sour - Fruited Gose",
            "rating": 3.29,
            "url": "https://untappd.com/b/brewlok-brewery-sensaciya/5109346"
        },
        {
            "title": "Воскресение IPA",
            "type": "IPA - Other",
            "rating": 3.54,
            "url": "https://untappd.com/b/brewlok-brewery-voskresenie-ipa/5052280"
        },
        {
            "title": "Wild Wild Cherry (BA)",
            "type": "Sour - Other",
            "rating": 3.85,
            "url": "https://untappd.com/b/brewlok-brewery-wild-wild-cherry-ba/2113785"
        },
        {
            "title": "Садовод Версия 2.0",
            "type": "Sour - Other",
            "rating": 3.72,
            "url": "https://untappd.com/b/brewlok-brewery-sadovod-versiya-2-0/2596483"
        },
        {
            "title": "Чудь / Chud",
            "type": "Sour - Fruited Gose",
            "rating": 3.54,
            "url": "https://untappd.com/b/brewlok-brewery-chud-chud/3861586"
        },
        {
            "title": "IPA наверное...",
            "type": "IPA - American",
            "rating": 3.54,
            "url": "https://untappd.com/b/brewlok-brewery-ipa-navernoe/1214546"
        },
        {
            "title": "Endspiel | Эндшпиль",
            "type": "Altbier",
            "rating": 4.05,
            "url": "https://untappd.com/b/brewlok-brewery-endspiel-endshpil/5267280"
        },
        {
            "title": "LOVE SWEET TEARS Mango & Tequila Barrel Aged",
            "type": "Mead - Melomel",
            "rating": 2.9,
            "url": "https://untappd.com/b/brewlok-brewery-love-sweet-tears-mango-and-tequila-barrel-aged/4353950"
        },
        {
            "title": "Russian Imperial Stout W/Molasses Lobo Day Batch",
            "type": "Stout - Russian Imperial",
            "rating": 3.81,
            "url": "https://untappd.com/b/brewlok-brewery-russian-imperial-stout-w-molasses-lobo-day-batch/4896677"
        },
        {
            "title": "Brown Ale возможно...",
            "type": "Brown Ale - English",
            "rating": 3.75,
            "url": "https://untappd.com/b/brewlok-brewery-brown-ale-vozmozhno/1242587"
        },
        {
            "title": "This Is Fakel",
            "type": "Brown Ale - Belgian",
            "rating": 3.55,
            "url": "https://untappd.com/b/brewlok-brewery-this-is-fakel/5051377"
        },
        {
            "title": "BA Imperial Rye Porter Lobo Day Batch",
            "type": "Porter - Imperial / Double",
            "rating": 4.13,
            "url": "https://untappd.com/b/brewlok-brewery-ba-imperial-rye-porter-lobo-day-batch/4896679"
        },
        {
            "title": "Altbier",
            "type": "Altbier",
            "rating": 3.86,
            "url": "https://untappd.com/b/brewlok-brewery-altbier/1422538"
        },
        {
            "title": "This Charming Ale",
            "type": "Sour - Other",
            "rating": 3.87,
            "url": "https://untappd.com/b/brewlok-brewery-this-charming-ale/3470246"
        },
        {
            "title": "Wild Ale Cherry",
            "type": "Wild Ale - Other",
            "rating": 3.75,
            "url": "https://untappd.com/b/brewlok-brewery-wild-ale-cherry/5098633"
        },
        {
            "title": "Extra Stout",
            "type": "Stout - Other",
            "rating": 3.97,
            "url": "https://untappd.com/b/brewlok-brewery-extra-stout/1258506"
        },
        {
            "title": "LOVE SWEET DREAMS (Black Currant Edition)",
            "type": "Mead - Melomel",
            "rating": 3.61,
            "url": "https://untappd.com/b/brewlok-brewery-love-sweet-dreams-black-currant-edition/4077869"
        },
        {
            "title": "Strong Product",
            "type": "Bock - Doppelbock",
            "rating": 3.59,
            "url": "https://untappd.com/b/brewlok-brewery-strong-product/1900793"
        },
        {
            "title": "Штопор",
            "type": "IPA - New England / Hazy",
            "rating": 3.6,
            "url": "https://untappd.com/b/brewlok-brewery-shtopor/5272226"
        },
        {
            "title": "Specialty Cherry Beer",
            "type": "Fruit Beer",
            "rating": 4.02,
            "url": "https://untappd.com/b/brewlok-brewery-specialty-cherry-beer/4855622"
        },
        {
            "title": "Christmas",
            "type": "Bock - Doppelbock",
            "rating": 3.77,
            "url": "https://untappd.com/b/brewlok-brewery-christmas/1378828"
        },
        {
            "title": "Festival",
            "type": "Bock - Doppelbock",
            "rating": 4.03,
            "url": "https://untappd.com/b/brewlok-brewery-festival/1258512"
        },
        {
            "title": "APA Rosemary Edition ( Festival ВСD2016)",
            "type": "Pale Ale - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/brewlok-brewery-apa-rosemary-edition-festival-vsd2016/1593480"
        },
        {
            "title": "Bohemian Pilsener",
            "type": "Pilsner - Other",
            "rating": 3.57,
            "url": "https://untappd.com/b/brewlok-brewery-bohemian-pilsener/4839076"
        },
        {
            "title": "Le Caprice De La Nature",
            "type": "Cider - Dry",
            "rating": 3.45,
            "url": "https://untappd.com/b/brewlok-brewery-le-caprice-de-la-nature/4942498"
        },
        {
            "title": "Маяковский Том 2",
            "type": "Porter - Imperial / Double",
            "rating": 4.24,
            "url": "https://untappd.com/b/brewlok-brewery-mayakovskij-tom-2/5012760"
        },
        {
            "title": "Wild Ale",
            "type": "Wild Ale - Other",
            "rating": 3.84,
            "url": "https://untappd.com/b/brewlok-brewery-wild-ale/4826084"
        },
        {
            "title": "Pale Ale",
            "type": "Pale Ale - American",
            "rating": 3.95,
            "url": "https://untappd.com/b/brewlok-brewery-pale-ale/1304142"
        },
        {
            "title": "Бунинъ. Том 5.5 / Bunin. Volume 5.5",
            "type": "Stout - Russian Imperial",
            "rating": 3.93,
            "url": "https://untappd.com/b/brewlok-brewery-bunin-tom-5-5-bunin-volume-5-5/4485456"
        },
        {
            "title": "Baltic Ice",
            "type": "Freeze-Distilled Beer",
            "rating": 4.21,
            "url": "https://untappd.com/b/brewlok-brewery-baltic-ice/3606120"
        },
        {
            "title": "SOUPCULTURE",
            "type": "Non-Alcoholic Beer - IPA",
            "rating": 2.7,
            "url": "https://untappd.com/b/brewlok-brewery-soupculture/5267395"
        },
        {
            "title": "BA Barleywine Sib Fest Batch",
            "type": "Barleywine - Other",
            "rating": 4.11,
            "url": "https://untappd.com/b/brewlok-brewery-ba-barleywine-sib-fest-batch/4866351"
        },
        {
            "title": "Тихо-тихо",
            "type": "Non-Alcoholic Beer - IPA",
            "rating": 2.46,
            "url": "https://untappd.com/b/brewlok-brewery-tiho-tiho/5168686"
        },
        {
            "title": "Pale Ale Iggy Hop",
            "type": "Pale Ale - American",
            "rating": 3.59,
            "url": "https://untappd.com/b/brewlok-brewery-pale-ale-iggy-hop/3494157"
        },
        {
            "title": "BA Imperial Rye Porter Sib Fest Batch",
            "type": "Porter - Imperial / Double",
            "rating": 4.03,
            "url": "https://untappd.com/b/brewlok-brewery-ba-imperial-rye-porter-sib-fest-batch/4866356"
        },
        {
            "title": "Поздняя Осень",
            "type": "Belgian Quadrupel",
            "rating": 3.87,
            "url": "https://untappd.com/b/brewlok-brewery-pozdnyaya-osen/2910321"
        },
        {
            "title": "Wild Ale W/cherry & Blackcurrant Sib Fest Batch",
            "type": "Wild Ale - Other",
            "rating": 3.73,
            "url": "https://untappd.com/b/brewlok-brewery-wild-ale-w-cherry-and-blackcurrant-sib-fest-batch/4866353"
        },
        {
            "title": "Russian Imperial Stout #Fest Batch",
            "type": "Stout - Russian Imperial",
            "rating": 4.03,
            "url": "https://untappd.com/b/brewlok-brewery-russian-imperial-stout-fest-batch/4485477"
        },
        {
            "title": "Объект-Д",
            "type": "IPA - Triple New England / Hazy",
            "rating": 3.71,
            "url": "https://untappd.com/b/brewlok-brewery-obekt-d/5305770"
        },
        {
            "title": "Extra Stout 6 Months",
            "type": "Stout - Other",
            "rating": 4.52,
            "url": "https://untappd.com/b/brewlok-brewery-extra-stout-6-months/1374028"
        },
        {
            "title": "Helles",
            "type": "Lager - Helles",
            "rating": 3.89,
            "url": "https://untappd.com/b/brewlok-brewery-helles/4839080"
        },
        {
            "title": "Milkshake Черника & Лесные Ягоды",
            "type": "IPA - Milkshake",
            "rating": null,
            "url": "https://untappd.com/b/brewlok-brewery-milkshake-chernika-and-lesnye-yagody/3606123"
        },
        {
            "title": "Hazy",
            "type": "Stout - Imperial / Double",
            "rating": null,
            "url": "https://untappd.com/b/brewlok-brewery-hazy/2197255"
        },
        {
            "title": "Экспериментальное #48",
            "type": "Barleywine - Other",
            "rating": null,
            "url": "https://untappd.com/b/brewlok-brewery-eksperimentalnoe-48/3811212"
        },
        {
            "title": "Булгаков. Том 3. Глава 3",
            "type": "Stout - Russian Imperial",
            "rating": null,
            "url": "https://untappd.com/b/brewlok-brewery-bulgakov-tom-3-glava-3/4922628"
        },
        {
            "title": "Триппель",
            "type": "Belgian Tripel",
            "rating": null,
            "url": "https://untappd.com/b/brewlok-brewery-trippel/3010163"
        },
        {
            "title": "Медитирующий",
            "type": "Sour - Other",
            "rating": null,
            "url": "https://untappd.com/b/brewlok-brewery-meditiruyushij/4798476"
        },
        {
            "title": "Wild Ale (Raspberry / Cherry / Black Currant)",
            "type": "Wild Ale - Other",
            "rating": null,
            "url": "https://untappd.com/b/brewlok-brewery-wild-ale-raspberry-cherry-black-currant/5098648"
        },
        {
            "title": "Belgian Fruit Ale Cassis",
            "type": "Fruit Beer",
            "rating": null,
            "url": "https://untappd.com/b/brewlok-brewery-belgian-fruit-ale-cassis/5100432"
        },
        {
            "title": "Belgian Fruit Ale Framboise",
            "type": "Fruit Beer",
            "rating": null,
            "url": "https://untappd.com/b/brewlok-brewery-belgian-fruit-ale-framboise/5100434"
        },
        {
            "title": "Mangay",
            "type": "IPA - New England / Hazy",
            "rating": null,
            "url": "https://untappd.com/b/brewlok-brewery-mangay/5315169"
        }
    ],
    "BREWMEN": [
        {
            "title": "HOPPY LIBERTY",
            "type": "IPA - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/brewmen-hoppy-liberty/3140863"
        },
        {
            "title": "Tomato Soul",
            "type": "Sour - Other Gose",
            "rating": 3.82,
            "url": "https://untappd.com/b/brewmen-tomato-soul/4037407"
        },
        {
            "title": "Tomato Soul Spicy Edition",
            "type": "Sour - Other Gose",
            "rating": 3.87,
            "url": "https://untappd.com/b/brewmen-tomato-soul-spicy-edition/4007076"
        },
        {
            "title": "Tomato Soul Smoked Edition",
            "type": "Sour - Other Gose",
            "rating": 4.03,
            "url": "https://untappd.com/b/brewmen-tomato-soul-smoked-edition/4362370"
        },
        {
            "title": "Харизма Passion Fruit",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.9,
            "url": "https://untappd.com/b/brewmen-harizma-passion-fruit/3781982"
        },
        {
            "title": "Харизма Black Currant",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 4,
            "url": "https://untappd.com/b/brewmen-harizma-black-currant/4225742"
        },
        {
            "title": "MANGO SMOOTHIE",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.93,
            "url": "https://untappd.com/b/brewmen-mango-smoothie/3909926"
        },
        {
            "title": "Maybe Milk?",
            "type": "Stout - Milk / Sweet",
            "rating": 3.68,
            "url": "https://untappd.com/b/brewmen-may-be-milk/3510150"
        },
        {
            "title": "Харизма Raspberry",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.84,
            "url": "https://untappd.com/b/brewmen-harizma-raspberry/3510200"
        },
        {
            "title": "HOLY MILK",
            "type": "IPA - Milkshake",
            "rating": 3.74,
            "url": "https://untappd.com/b/brewmen-holy-milk/3173438"
        },
        {
            "title": "BANANA & PASSION FRUIT SMOOTHIE",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.99,
            "url": "https://untappd.com/b/brewmen-banana-and-passion-fruit-smoothie/4296450"
        },
        {
            "title": "Tsar",
            "type": "Stout - Russian Imperial",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewmen-tsar/3596818"
        },
        {
            "title": "Tomato Soul Tkemali Edition",
            "type": "Sour - Other Gose",
            "rating": 4.15,
            "url": "https://untappd.com/b/brewmen-tomato-soul-tkemali-edition/4659846"
        },
        {
            "title": "Эксперимент Brewmen&Paradox",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.95,
            "url": "https://untappd.com/b/brewmen-eksperiment-brewmen-and-paradox/4099178"
        },
        {
            "title": "Wildberries And Herbs",
            "type": "Sour - Fruited",
            "rating": 3.95,
            "url": "https://untappd.com/b/brewmen-wildberries-and-herbs/4376998"
        },
        {
            "title": "Tropic Smoothie / Banana & Pineapple",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.93,
            "url": "https://untappd.com/b/brewmen-tropic-smoothie-banana-and-pineapple/4277680"
        },
        {
            "title": "Black code HBC 472",
            "type": "Stout - Imperial / Double",
            "rating": 4,
            "url": "https://untappd.com/b/brewmen-black-code-hbc-472/4242989"
        },
        {
            "title": "TSAR & JAGER",
            "type": "Stout - Russian Imperial",
            "rating": 3.84,
            "url": "https://untappd.com/b/brewmen-tsar-and-jager/3674877"
        },
        {
            "title": "Smoked Salsa Roja",
            "type": "Sour - Other Gose",
            "rating": 4.08,
            "url": "https://untappd.com/b/brewmen-smoked-salsa-roja/4172928"
        },
        {
            "title": "Нижний 801",
            "type": "IPA - Imperial / Double",
            "rating": 3.82,
            "url": "https://untappd.com/b/brewmen-nizhnij-801/4748020"
        },
        {
            "title": "CCM",
            "type": "IPA - Imperial / Double",
            "rating": 3.86,
            "url": "https://untappd.com/b/brewmen-ccm/4586143"
        },
        {
            "title": "Pizza Gose",
            "type": "Sour - Other Gose",
            "rating": 3.65,
            "url": "https://untappd.com/b/brewmen-pizza-gose/3331518"
        },
        {
            "title": "LAGER",
            "type": "Lager - Pale",
            "rating": 3.52,
            "url": "https://untappd.com/b/brewmen-lager/3219059"
        },
        {
            "title": "MJ NEIPA",
            "type": "IPA - New England / Hazy",
            "rating": 3.82,
            "url": "https://untappd.com/b/brewmen-mj-neipa/4805149"
        },
        {
            "title": "Maplenut",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 3.85,
            "url": "https://untappd.com/b/brewmen-maplenut/4194149"
        },
        {
            "title": "Квадратура круга",
            "type": "Pilsner - Other",
            "rating": 3.75,
            "url": "https://untappd.com/b/brewmen-kvadratura-kruga/4483507"
        },
        {
            "title": "OMG! DIPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.66,
            "url": "https://untappd.com/b/brewmen-omg-dipa/5032664"
        },
        {
            "title": "Wild Sour Ale",
            "type": "Wild Ale - Other",
            "rating": 3.84,
            "url": "https://untappd.com/b/brewmen-wild-sour-ale/3956106"
        },
        {
            "title": "ANGEL'S SHARE / Доля ангела",
            "type": "Barleywine - English",
            "rating": 3.8,
            "url": "https://untappd.com/b/brewmen-angel-s-share-dolya-angela/3510217"
        },
        {
            "title": "ECHO'22",
            "type": "IPA - Other",
            "rating": 3.67,
            "url": "https://untappd.com/b/brewmen-echo-22/5195710"
        },
        {
            "title": "D!DDL / DRINK! DON’T LOAD",
            "type": "Porter - American",
            "rating": 3.69,
            "url": "https://untappd.com/b/brewmen-d-ddl-drink-don-t-load/3173455"
        },
        {
            "title": "Cloudy Aroma",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.73,
            "url": "https://untappd.com/b/brewmen-cloudy-aroma/4296453"
        },
        {
            "title": "Weizen",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.41,
            "url": "https://untappd.com/b/brewmen-weizen/3219048"
        },
        {
            "title": "SKLOFT",
            "type": "IPA - Imperial / Double",
            "rating": 3.69,
            "url": "https://untappd.com/b/brewmen-skloft/4146874"
        },
        {
            "title": "Talus & Sabro",
            "type": "IPA - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/brewmen-talus-and-sabro/4426732"
        },
        {
            "title": "It’s Raining Men",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.62,
            "url": "https://untappd.com/b/brewmen-it-s-raining-men/5031160"
        },
        {
            "title": "Blanche Framboise",
            "type": "Fruit Beer",
            "rating": 3.77,
            "url": "https://untappd.com/b/brewmen-blanche-framboise/4390481"
        },
        {
            "title": "WILD SOUR Red Ale",
            "type": "Sour - Flanders Red Ale",
            "rating": 3.61,
            "url": "https://untappd.com/b/brewmen-wild-sour-red-ale/3956116"
        },
        {
            "title": "Tsar & Jack",
            "type": "Stout - Russian Imperial",
            "rating": 3.87,
            "url": "https://untappd.com/b/brewmen-tsar-and-jack/3510147"
        },
        {
            "title": "Высокомерный",
            "type": "Stout - Pastry",
            "rating": 4.07,
            "url": "https://untappd.com/b/brewmen-vysokomernyj/5133051"
        },
        {
            "title": "Talus",
            "type": "IPA - American",
            "rating": 3.77,
            "url": "https://untappd.com/b/brewmen-talus/4225745"
        },
        {
            "title": "Харизма Cherry",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.56,
            "url": "https://untappd.com/b/brewmen-harizma-cherry/3689230"
        },
        {
            "title": "Tomato Soul Sangrita Edition",
            "type": "Sour - Other Gose",
            "rating": 4.06,
            "url": "https://untappd.com/b/brewmen-tomato-soul-sangrita-edition/5172885"
        },
        {
            "title": "Mutim Chilim",
            "type": "IPA - Milkshake",
            "rating": 3.4,
            "url": "https://untappd.com/b/brewmen-mutim-chilim/4796614"
        },
        {
            "title": "Tanergy",
            "type": "Sour - Fruited",
            "rating": 3.99,
            "url": "https://untappd.com/b/brewmen-tanergy/4165461"
        },
        {
            "title": "Dark Smoothie",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.05,
            "url": "https://untappd.com/b/brewmen-dark-smoothie/4788357"
        },
        {
            "title": "Never Say Never",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.62,
            "url": "https://untappd.com/b/brewmen-never-say-never/5039144"
        },
        {
            "title": "Wild Sour Ale",
            "type": "Wild Ale - Other",
            "rating": 4.09,
            "url": "https://untappd.com/b/brewmen-wild-sour-ale/4480199"
        },
        {
            "title": "White Smoothie",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.67,
            "url": "https://untappd.com/b/brewmen-white-smoothie/4788352"
        },
        {
            "title": "Заносчивый",
            "type": "Stout - Pastry",
            "rating": 4.11,
            "url": "https://untappd.com/b/brewmen-zanoschivyj/5133045"
        },
        {
            "title": "Smoothie Banana Watermelon Lime",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.83,
            "url": "https://untappd.com/b/brewmen-smoothie-banana-watermelon-lime/4528275"
        },
        {
            "title": "BLANCHE",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.62,
            "url": "https://untappd.com/b/brewmen-blanche/3219056"
        },
        {
            "title": "Wildberries & Herbs Orange-quinine",
            "type": "Sour - Fruited",
            "rating": 3.87,
            "url": "https://untappd.com/b/brewmen-wildberries-and-herbs-orange-quinine/4443476"
        },
        {
            "title": "Tropic Smoothie / Banana & Blueberry & Cream",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.1,
            "url": "https://untappd.com/b/brewmen-tropic-smoothie-banana-and-blueberry-and-cream/4985690"
        },
        {
            "title": "DOMME DE FLANDERUS PUSSION FRUIT",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 4,
            "url": "https://untappd.com/b/brewmen-domme-de-flanderus-pussion-fruit/4855956"
        },
        {
            "title": "Tropic Smoothie / Banana & Kiwi Fruit",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.17,
            "url": "https://untappd.com/b/brewmen-tropic-smoothie-banana-and-kiwi-fruit/4985676"
        },
        {
            "title": "Maybe Milk с Манго",
            "type": "Stout - Milk / Sweet",
            "rating": 3.58,
            "url": "https://untappd.com/b/brewmen-maybe-milk-s-mango/4618333"
        },
        {
            "title": "Symphony #1",
            "type": "Sour - Fruited",
            "rating": 3.85,
            "url": "https://untappd.com/b/brewmen-symphony-1/4296454"
        },
        {
            "title": "Wildberries & Herbs Cranberries Rosemary",
            "type": "Sour - Other",
            "rating": 3.98,
            "url": "https://untappd.com/b/brewmen-wildberries-and-herbs-cranberries-rosemary/4566452"
        },
        {
            "title": "Moto Moto",
            "type": "IPA - Milkshake",
            "rating": 3.64,
            "url": "https://untappd.com/b/brewmen-moto-moto/5258015"
        },
        {
            "title": "Tropic Smoothie / Banana & Strawberries & Lime",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.02,
            "url": "https://untappd.com/b/brewmen-tropic-smoothie-banana-and-strawberries-and-lime/5064999"
        },
        {
            "title": "Надменный",
            "type": "Stout - Pastry",
            "rating": 4.15,
            "url": "https://untappd.com/b/brewmen-nadmennyj/5218448"
        },
        {
            "title": "Beach Peach",
            "type": "IPA - Milkshake",
            "rating": 3.59,
            "url": "https://untappd.com/b/brewmen-beach-peach/4676287"
        },
        {
            "title": "Cyser Mango & Passion Fruit",
            "type": "Cider - Other Fruit",
            "rating": 3.95,
            "url": "https://untappd.com/b/brewmen-cyser-mango-and-passion-fruit/4796611"
        },
        {
            "title": "Tomato Soul Satsebeli Edition",
            "type": "Sour - Other Gose",
            "rating": 3.94,
            "url": "https://untappd.com/b/brewmen-tomato-soul-satsebeli-edition/5133027"
        },
        {
            "title": "Tropic Smoothie / Banana & Strawberry",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.2,
            "url": "https://untappd.com/b/brewmen-tropic-smoothie-banana-and-strawberry/4985681"
        },
        {
            "title": "KNIFER",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.51,
            "url": "https://untappd.com/b/brewmen-knifer/3173369"
        },
        {
            "title": "Empire",
            "type": "Stout - Russian Imperial",
            "rating": 3.97,
            "url": "https://untappd.com/b/brewmen-empire/4277667"
        },
        {
            "title": "Juice & Coconut",
            "type": "IPA - Milkshake",
            "rating": 3.66,
            "url": "https://untappd.com/b/brewmen-juice-and-coconut/4277675"
        },
        {
            "title": "DOMME DE FLANDERUS RASPBERRY",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.91,
            "url": "https://untappd.com/b/brewmen-domme-de-flanderus-raspberry/4855967"
        },
        {
            "title": "Харизма Orange & Grapefruit",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.98,
            "url": "https://untappd.com/b/brewmen-harizma-orange-and-grapefruit/4285680"
        },
        {
            "title": "BATTY FRÄU / BERLINER WEISSE PASSION FRUIT",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.96,
            "url": "https://untappd.com/b/brewmen-batty-frau-berliner-weisse-passion-fruit/3173292"
        },
        {
            "title": "Wildberries & Herbs Star-anise",
            "type": "Sour - Fruited",
            "rating": 3.89,
            "url": "https://untappd.com/b/brewmen-wildberries-and-herbs-star-anise/4443465"
        },
        {
            "title": "BRUTALICA",
            "type": "IPA - New England / Hazy",
            "rating": 3.89,
            "url": "https://untappd.com/b/brewmen-brutalica/3510227"
        },
        {
            "title": "Wild Sour Ale Cherry",
            "type": "Wild Ale - Other",
            "rating": 4,
            "url": "https://untappd.com/b/brewmen-wild-sour-ale-cherry/4887987"
        },
        {
            "title": "Mead / Медовуха",
            "type": "Mead - Other",
            "rating": 3.42,
            "url": "https://untappd.com/b/brewmen-mead-medovuha/3381188"
        },
        {
            "title": "Wild Sour Ale Plum",
            "type": "Wild Ale - Other",
            "rating": 4.11,
            "url": "https://untappd.com/b/brewmen-wild-sour-ale-plum/5088860"
        },
        {
            "title": "Fine Edge",
            "type": "Sour - Fruited Gose",
            "rating": 3.6,
            "url": "https://untappd.com/b/brewmen-fine-edge/4636661"
        },
        {
            "title": "Харизма Cherry Vs Black Currant",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 4.16,
            "url": "https://untappd.com/b/brewmen-harizma-cherry-vs-black-currant/5172890"
        },
        {
            "title": "Харизма Raspberry Vs Passion Fruit",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.97,
            "url": "https://untappd.com/b/brewmen-harizma-raspberry-vs-passion-fruit/5172891"
        },
        {
            "title": "Скипасс",
            "type": "IPA - American",
            "rating": 3.67,
            "url": "https://untappd.com/b/brewmen-skipass/5262827"
        },
        {
            "title": "Wildberries & Herbs Sweet Cherry Basil",
            "type": "Sour - Fruited",
            "rating": 3.88,
            "url": "https://untappd.com/b/brewmen-wildberries-and-herbs-sweet-cherry-basil/4559151"
        },
        {
            "title": "Domme De Flanderus Black Currant",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 4.03,
            "url": "https://untappd.com/b/brewmen-domme-de-flanderus-black-currant/4951634"
        },
        {
            "title": "Солебуз",
            "type": "Sour - Other Gose",
            "rating": 3.39,
            "url": "https://untappd.com/b/brewmen-solebuz/5133002"
        },
        {
            "title": "Strawberry And Melon",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.42,
            "url": "https://untappd.com/b/brewmen-strawberry-and-melon/4496661"
        },
        {
            "title": "Imperial Pastry Sour",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.11,
            "url": "https://untappd.com/b/brewmen-imperial-pastry-sour/4498237"
        },
        {
            "title": "Virgin",
            "type": "Non-Alcoholic Beer - Pale Ale",
            "rating": 3.58,
            "url": "https://untappd.com/b/brewmen-virgin/4376992"
        },
        {
            "title": "APA",
            "type": "Pale Ale - American",
            "rating": 3.72,
            "url": "https://untappd.com/b/brewmen-apa/3381224"
        },
        {
            "title": "Дункель",
            "type": "Lager - Munich Dunkel",
            "rating": 3.72,
            "url": "https://untappd.com/b/brewmen-dunkel/3441567"
        },
        {
            "title": "Oatmeal Stout",
            "type": "Stout - Oatmeal",
            "rating": 3.82,
            "url": "https://untappd.com/b/brewmen-oatmeal-stout/2697316"
        },
        {
            "title": "Rockdilla Street Fighter",
            "type": "IPA - Triple New England / Hazy",
            "rating": 3.97,
            "url": "https://untappd.com/b/brewmen-rockdilla-street-fighter/3624579"
        },
        {
            "title": "Rockdilla IPA",
            "type": "IPA - American",
            "rating": 4.12,
            "url": "https://untappd.com/b/brewmen-rockdilla-ipa/3758051"
        },
        {
            "title": "DOCTOR HOPPER",
            "type": "Pale Ale - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/brewmen-doctor-hopper/3173582"
        },
        {
            "title": "Buckwheat & Caramel",
            "type": "Porter - Other",
            "rating": 3.87,
            "url": "https://untappd.com/b/brewmen-buckwheat-and-caramel/2506707"
        },
        {
            "title": "Brewmen Nitro",
            "type": "Stout - Coffee",
            "rating": 3.99,
            "url": "https://untappd.com/b/brewmen-brewmen-nitro/3334265"
        },
        {
            "title": "NE IPA",
            "type": "IPA - New England / Hazy",
            "rating": 4.03,
            "url": "https://untappd.com/b/brewmen-ne-ipa/2940772"
        },
        {
            "title": "Strawberry NEIPA",
            "type": "IPA - New England / Hazy",
            "rating": 4.04,
            "url": "https://untappd.com/b/brewmen-strawberry-neipa/3376909"
        },
        {
            "title": "The Irony of Fate",
            "type": "IPA - Sour",
            "rating": 4.13,
            "url": "https://untappd.com/b/brewmen-the-irony-of-fate/3686681"
        },
        {
            "title": "Heaven Ale",
            "type": "Blonde Ale",
            "rating": 3.89,
            "url": "https://untappd.com/b/brewmen-heaven-ale/2506746"
        },
        {
            "title": "Smoked Pineapple",
            "type": "Sour - Other",
            "rating": 4.46,
            "url": "https://untappd.com/b/brewmen-smoked-pineapple/4686157"
        },
        {
            "title": "Британский Браун Эль",
            "type": "Brown Ale - English",
            "rating": 4.55,
            "url": "https://untappd.com/b/brewmen-britanskij-braun-el/3952630"
        },
        {
            "title": "Pen Pineapple Milk",
            "type": "IPA - Milkshake",
            "rating": 4.39,
            "url": "https://untappd.com/b/brewmen-pen-pineapple-milk/4182869"
        },
        {
            "title": "Golden Ale",
            "type": "Golden Ale - Other",
            "rating": 4.48,
            "url": "https://untappd.com/b/brewmen-golden-ale/4295838"
        },
        {
            "title": "Пряный Мёд",
            "type": "Mead - Traditional",
            "rating": 3.88,
            "url": "https://untappd.com/b/brewmen-pryanyj-myod/5138327"
        },
        {
            "title": "Extra Virgin",
            "type": "Pale Ale - American",
            "rating": 4.52,
            "url": "https://untappd.com/b/brewmen-extra-virgin/4154828"
        },
        {
            "title": "Top Hop: West Coast IPA",
            "type": "IPA - American",
            "rating": null,
            "url": "https://untappd.com/b/brewmen-top-hop-west-coast-ipa/5255879"
        },
        {
            "title": "Smoothie 3 Banana & Pineapple",
            "type": "Sour - Smoothie / Pastry",
            "rating": null,
            "url": "https://untappd.com/b/brewmen-smoothie-3-banana-and-pineapple/5322060"
        }
    ],
    "COVEN": [
        {
            "title": "Bloody Roots",
            "type": "Sour - Other Gose",
            "rating": 3.92,
            "url": "https://untappd.com/b/coven-brewery-bloody-roots/3203956"
        },
        {
            "title": "Hell Awaits",
            "type": "Sour - Other Gose",
            "rating": 4.07,
            "url": "https://untappd.com/b/coven-brewery-hell-awaits/3435903"
        },
        {
            "title": "TEARS DON'T FALL",
            "type": "Sour - Fruited",
            "rating": 4.07,
            "url": "https://untappd.com/b/coven-brewery-tears-don-t-fall/3829679"
        },
        {
            "title": "Arise",
            "type": "IPA - Other",
            "rating": 3.81,
            "url": "https://untappd.com/b/coven-brewery-arise/3214410"
        },
        {
            "title": "LAST RESORT",
            "type": "Sour - Other Gose",
            "rating": 3.9,
            "url": "https://untappd.com/b/coven-brewery-last-resort/3859299"
        },
        {
            "title": "Utsukushiki Hitobito No Uta",
            "type": "Sour - Other Gose",
            "rating": 4.07,
            "url": "https://untappd.com/b/coven-brewery-utsukushiki-hitobito-no-uta/4277704"
        },
        {
            "title": "Before I Forget",
            "type": "IPA - Imperial / Double",
            "rating": 3.8,
            "url": "https://untappd.com/b/coven-brewery-before-i-forget/3585320"
        },
        {
            "title": "UNDER THE BRIDGE",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.13,
            "url": "https://untappd.com/b/coven-brewery-under-the-bridge/4526757"
        },
        {
            "title": "Gazing At the Blasphemous Moon While Perched Atop A Very Very Very Very Very Very Very Forsaken Slope of the Northern Mountain",
            "type": "IPA - New England / Hazy",
            "rating": 3.75,
            "url": "https://untappd.com/b/coven-brewery-gazing-at-the-blasphemous-moon-while-perched-atop-a-very-very-very-very-very-very-very-forsaken-slope-of-the-northern-mountain/4148919"
        },
        {
            "title": "FAR BEYOND DRIVEN",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.2,
            "url": "https://untappd.com/b/coven-brewery-far-beyond-driven/4400264"
        },
        {
            "title": "BRING ME TO LIFE",
            "type": "Sour - Other Gose",
            "rating": 3.82,
            "url": "https://untappd.com/b/coven-brewery-bring-me-to-life/3683755"
        },
        {
            "title": "Nocturnal Cauldrons Aflame Amidst The Nothern Hellwitch's Perpetual Blasphemy",
            "type": "IPA - New England / Hazy",
            "rating": 3.88,
            "url": "https://untappd.com/b/coven-brewery-nocturnal-cauldrons-aflame-amidst-the-nothern-hellwitch-s-perpetual-blasphemy/4331711"
        },
        {
            "title": "Grim And Frostbitten Moongoats of the North",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.82,
            "url": "https://untappd.com/b/coven-brewery-grim-and-frostbitten-moongoats-of-the-north/4526911"
        },
        {
            "title": "Forbidden Waters",
            "type": "IPA - Milkshake",
            "rating": 3.86,
            "url": "https://untappd.com/b/coven-brewery-forbidden-waters/3214406"
        },
        {
            "title": "Meteora",
            "type": "Stout - Other",
            "rating": 3.81,
            "url": "https://untappd.com/b/coven-brewery-meteora/2541125"
        },
        {
            "title": "ReArranged",
            "type": "IPA - New England / Hazy",
            "rating": 3.83,
            "url": "https://untappd.com/b/coven-brewery-rearranged/3435909"
        },
        {
            "title": "IN THE END",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.85,
            "url": "https://untappd.com/b/coven-brewery-in-the-end/3683763"
        },
        {
            "title": "Smoked Bloody Roots",
            "type": "Sour - Other Gose",
            "rating": 3.87,
            "url": "https://untappd.com/b/coven-brewery-smoked-bloody-roots/3899226"
        },
        {
            "title": "Violet",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.17,
            "url": "https://untappd.com/b/coven-brewery-violet/4702107"
        },
        {
            "title": "Spicy Bloody Roots",
            "type": "Sour - Other Gose",
            "rating": 4.03,
            "url": "https://untappd.com/b/coven-brewery-spicy-bloody-roots/4277689"
        },
        {
            "title": "I REMEMBER YOU",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.68,
            "url": "https://untappd.com/b/coven-brewery-i-remember-you/3649045"
        },
        {
            "title": "TEN THOUSAND FEET",
            "type": "IPA - Triple New England / Hazy",
            "rating": 3.8,
            "url": "https://untappd.com/b/coven-brewery-ten-thousand-feet/4332018"
        },
        {
            "title": "Aerials",
            "type": "Sour - Fruited Gose",
            "rating": 3.95,
            "url": "https://untappd.com/b/coven-brewery-aerials/4400343"
        },
        {
            "title": "Aura",
            "type": "IPA - Milkshake",
            "rating": 3.8,
            "url": "https://untappd.com/b/coven-brewery-aura/3302146"
        },
        {
            "title": "VENUS DOOM",
            "type": "Stout - Imperial / Double",
            "rating": 4.1,
            "url": "https://untappd.com/b/coven-brewery-venus-doom/4065949"
        },
        {
            "title": "LEFT BEHIND",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.17,
            "url": "https://untappd.com/b/coven-brewery-left-behind/4495670"
        },
        {
            "title": "In Joy And Sorrow",
            "type": "Belgian Strong Dark Ale",
            "rating": 3.76,
            "url": "https://untappd.com/b/coven-brewery-in-joy-and-sorrow/3557075"
        },
        {
            "title": "The First Seal",
            "type": "Stout - Russian Imperial",
            "rating": 3.89,
            "url": "https://untappd.com/b/coven-brewery-the-first-seal/3461304"
        },
        {
            "title": "MEIN HERZ BRENNT",
            "type": "Mead - Melomel",
            "rating": 3.91,
            "url": "https://untappd.com/b/coven-brewery-mein-herz-brennt/4331962"
        },
        {
            "title": "DECODE",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.27,
            "url": "https://untappd.com/b/coven-brewery-decode/4495538"
        },
        {
            "title": "Ich Will",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.77,
            "url": "https://untappd.com/b/coven-brewery-ich-will/3779389"
        },
        {
            "title": "CAN YOU FEEL MY HEART",
            "type": "Sour - Other Gose",
            "rating": 4.09,
            "url": "https://untappd.com/b/coven-brewery-can-you-feel-my-heart/4808638"
        },
        {
            "title": "FROM YESTERDAY",
            "type": "Sour - Fruited Gose",
            "rating": 3.83,
            "url": "https://untappd.com/b/coven-brewery-from-yesterday/3987436"
        },
        {
            "title": "GLAM",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.56,
            "url": "https://untappd.com/b/coven-brewery-glam/4526760"
        },
        {
            "title": "Minerva",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.3,
            "url": "https://untappd.com/b/coven-brewery-minerva/4718438"
        },
        {
            "title": "Sacrament",
            "type": "IPA - New England / Hazy",
            "rating": 3.67,
            "url": "https://untappd.com/b/coven-brewery-sacrament/3435914"
        },
        {
            "title": "SECRET DESIRE",
            "type": "Fruit Beer",
            "rating": 3.8,
            "url": "https://untappd.com/b/coven-brewery-secret-desire/3829676"
        },
        {
            "title": "HURT And VIRTUE",
            "type": "IPA - Sour",
            "rating": 3.8,
            "url": "https://untappd.com/b/coven-brewery-hurt-and-virtue/3326591"
        },
        {
            "title": "UNTIL IT SLEEPS",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 3.77,
            "url": "https://untappd.com/b/coven-brewery-until-it-sleeps/3649037"
        },
        {
            "title": "PRETTY IN SCARLET",
            "type": "Sour - Other Gose",
            "rating": 4.19,
            "url": "https://untappd.com/b/coven-brewery-pretty-in-scarlet/4857905"
        },
        {
            "title": "Shadow Moses",
            "type": "IPA - New England / Hazy",
            "rating": 3.68,
            "url": "https://untappd.com/b/coven-brewery-shadow-moses/4098624"
        },
        {
            "title": "Walking With Strangers",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.59,
            "url": "https://untappd.com/b/coven-brewery-walking-with-strangers/4575188"
        },
        {
            "title": "THE ONLY",
            "type": "Stout - Russian Imperial",
            "rating": 3.89,
            "url": "https://untappd.com/b/coven-brewery-the-only/3683759"
        },
        {
            "title": "YOUTH OF THE NATION",
            "type": "Sour - Fruited",
            "rating": 3.82,
            "url": "https://untappd.com/b/coven-brewery-youth-of-the-nation/3952688"
        },
        {
            "title": "BOHEMIAN GROVE",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 4.24,
            "url": "https://untappd.com/b/coven-brewery-bohemian-grove/4472314"
        },
        {
            "title": "BREAKING THE HABIT",
            "type": "Sour - Fruited Gose",
            "rating": 3.69,
            "url": "https://untappd.com/b/coven-brewery-breaking-the-habit/3829681"
        },
        {
            "title": "WITHOUT YOU I'M NOTHING",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.1,
            "url": "https://untappd.com/b/coven-brewery-without-you-i-m-nothing/4635962"
        },
        {
            "title": "SAFE IN A DREAM",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.91,
            "url": "https://untappd.com/b/coven-brewery-safe-in-a-dream/4330826"
        },
        {
            "title": "BLACKNED",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.79,
            "url": "https://untappd.com/b/coven-brewery-blackned/4065948"
        },
        {
            "title": "Innervision",
            "type": "Sour - Fruited Gose",
            "rating": 3.9,
            "url": "https://untappd.com/b/coven-brewery-innervision/3649041"
        },
        {
            "title": "WHERE DID THE ANGELS GO?",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.17,
            "url": "https://untappd.com/b/coven-brewery-where-did-the-angels-go/4808652"
        },
        {
            "title": "EVERY YOU EVERY ME",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.24,
            "url": "https://untappd.com/b/coven-brewery-every-you-every-me/5012617"
        },
        {
            "title": "CARRY ME",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.18,
            "url": "https://untappd.com/b/coven-brewery-carry-me/4850188"
        },
        {
            "title": "A PROPHECY",
            "type": "Barleywine - Other",
            "rating": 3.65,
            "url": "https://untappd.com/b/coven-brewery-a-prophecy/4606896"
        },
        {
            "title": "ENJOY THE SILENCE",
            "type": "Sour - Other Gose",
            "rating": 3.95,
            "url": "https://untappd.com/b/coven-brewery-enjoy-the-silence/4855810"
        },
        {
            "title": "HER GHOST IN THE FOG",
            "type": "Sour - Fruited",
            "rating": 4.11,
            "url": "https://untappd.com/b/coven-brewery-her-ghost-in-the-fog/4433650"
        },
        {
            "title": "DUSK AND HER EMBRACE",
            "type": "Stout - Imperial / Double",
            "rating": 3.95,
            "url": "https://untappd.com/b/coven-brewery-dusk-and-her-embrace/4606887"
        },
        {
            "title": "GIVE ME A SIGN",
            "type": "IPA - Milkshake",
            "rating": 3.71,
            "url": "https://untappd.com/b/coven-brewery-give-me-a-sign/3683761"
        },
        {
            "title": "VERMILION",
            "type": "Mead - Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/coven-brewery-vermilion/4793470"
        },
        {
            "title": "BITTERSWEET MEMORIES",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.31,
            "url": "https://untappd.com/b/coven-brewery-bittersweet-memories/4930710"
        },
        {
            "title": "IN THE SHADOWS",
            "type": "IPA - New Zealand",
            "rating": 3.65,
            "url": "https://untappd.com/b/coven-brewery-in-the-shadows/4606893"
        },
        {
            "title": "SHE LOVES ME NOT",
            "type": "Belgian Tripel",
            "rating": 3.74,
            "url": "https://untappd.com/b/coven-brewery-she-loves-me-not/3683765"
        },
        {
            "title": "STANDING STILL",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.1,
            "url": "https://untappd.com/b/coven-brewery-standing-still/4433645"
        },
        {
            "title": "HELENA",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.21,
            "url": "https://untappd.com/b/coven-brewery-helena/5040394"
        },
        {
            "title": "FINAL EPISODE",
            "type": "IPA - Imperial / Double Black",
            "rating": 3.73,
            "url": "https://untappd.com/b/coven-brewery-final-episode/4606883"
        },
        {
            "title": "Pure Morning",
            "type": "IPA - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/coven-brewery-pure-morning/3443473"
        },
        {
            "title": "WHAT LIES BENEATH",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.15,
            "url": "https://untappd.com/b/coven-brewery-what-lies-beneath/4728493"
        },
        {
            "title": "CLOSE TO THE FLAME",
            "type": "Sour - Other Gose",
            "rating": 3.95,
            "url": "https://untappd.com/b/coven-brewery-close-to-the-flame/4330838"
        },
        {
            "title": "Ghost of You",
            "type": "Sour - Other Gose",
            "rating": 3.83,
            "url": "https://untappd.com/b/coven-brewery-ghost-of-you/4277735"
        },
        {
            "title": "One Step Closer",
            "type": "Sour - Fruited",
            "rating": 3.79,
            "url": "https://untappd.com/b/coven-brewery-one-step-closer/4277717"
        },
        {
            "title": "Discovering the Waterfront",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.78,
            "url": "https://untappd.com/b/coven-brewery-discovering-the-waterfront/4718411"
        },
        {
            "title": "Sonne",
            "type": "Pilsner - Other",
            "rating": 3.69,
            "url": "https://untappd.com/b/coven-brewery-sonne/4808627"
        },
        {
            "title": "TRUE BELIEF",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.81,
            "url": "https://untappd.com/b/coven-brewery-true-belief/4375240"
        },
        {
            "title": "Boulevard of Broken Dreams",
            "type": "Sour - Fruited",
            "rating": 3.79,
            "url": "https://untappd.com/b/coven-brewery-boulevard-of-broken-dreams/4277692"
        },
        {
            "title": "HERE TO STAY",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.45,
            "url": "https://untappd.com/b/coven-brewery-here-to-stay/4746485"
        },
        {
            "title": "Morgenstern",
            "type": "IPA - Milkshake",
            "rating": 3.78,
            "url": "https://untappd.com/b/coven-brewery-morgenstern/3518856"
        },
        {
            "title": "MY OWN SUMMER",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.22,
            "url": "https://untappd.com/b/coven-brewery-my-own-summer/5142715"
        },
        {
            "title": "NE IPA Беру Выходной",
            "type": "IPA - New England / Hazy",
            "rating": 3.61,
            "url": "https://untappd.com/b/coven-brewery-ne-ipa-beru-vyhodnoj/4873974"
        },
        {
            "title": "Cloud Connected",
            "type": "IPA - New England / Hazy",
            "rating": 3.58,
            "url": "https://untappd.com/b/coven-brewery-cloud-connected/5032829"
        },
        {
            "title": "ONE MORE LIGHT",
            "type": "IPA - Milkshake",
            "rating": 3.94,
            "url": "https://untappd.com/b/coven-brewery-one-more-light/4400302"
        },
        {
            "title": "AUGEN AUF",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.58,
            "url": "https://untappd.com/b/coven-brewery-augen-auf/4834295"
        },
        {
            "title": "SOLAR FLARE",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.71,
            "url": "https://untappd.com/b/coven-brewery-solar-flare/4330891"
        },
        {
            "title": "DARK STORMS",
            "type": "Mead - Melomel",
            "rating": 3.52,
            "url": "https://untappd.com/b/coven-brewery-dark-storms/4834299"
        },
        {
            "title": "Goth",
            "type": "Stout - Oatmeal",
            "rating": 3.67,
            "url": "https://untappd.com/b/coven-brewery-goth/4718434"
        },
        {
            "title": "NEVER TOO LATE",
            "type": "Sour - Fruited Gose",
            "rating": 4.12,
            "url": "https://untappd.com/b/coven-brewery-never-too-late/4930755"
        },
        {
            "title": "CURRY BLOODY ROOTS",
            "type": "Sour - Other Gose",
            "rating": 3.64,
            "url": "https://untappd.com/b/coven-brewery-curry-bloody-roots/4742758"
        },
        {
            "title": "FALLING AWAY FROM ME",
            "type": "Mead - Other",
            "rating": 4.12,
            "url": "https://untappd.com/b/coven-brewery-falling-away-from-me/5142709"
        },
        {
            "title": "FROM DEATH TO DESTINY",
            "type": "Mead - Other",
            "rating": 3.97,
            "url": "https://untappd.com/b/coven-brewery-from-death-to-destiny/5040422"
        },
        {
            "title": "IPA West Coast Беру Выходной",
            "type": "IPA - American",
            "rating": 3.68,
            "url": "https://untappd.com/b/coven-brewery-ipa-west-coast-beru-vyhodnoj/4874736"
        },
        {
            "title": "IMAGINARY",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.35,
            "url": "https://untappd.com/b/coven-brewery-imaginary/4911215"
        },
        {
            "title": "AWAKE AND ALIVE",
            "type": "Mead - Other",
            "rating": 3.31,
            "url": "https://untappd.com/b/coven-brewery-awake-and-alive/4765545"
        },
        {
            "title": "MAKE IT PRECIOUS",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 4.02,
            "url": "https://untappd.com/b/coven-brewery-make-it-precious/5012618"
        },
        {
            "title": "TEMPEST",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.94,
            "url": "https://untappd.com/b/coven-brewery-tempest/4930717"
        },
        {
            "title": "SEVEN WORDS",
            "type": "Stout - Milk / Sweet",
            "rating": 3.58,
            "url": "https://untappd.com/b/coven-brewery-seven-words/4331706"
        },
        {
            "title": "CIRCLE WITH ME",
            "type": "Mead - Melomel",
            "rating": 4.02,
            "url": "https://untappd.com/b/coven-brewery-circle-with-me/5211213"
        },
        {
            "title": "Tomato Gose Беру Выходной",
            "type": "Sour - Other Gose",
            "rating": 3.73,
            "url": "https://untappd.com/b/coven-brewery-tomato-gose-beru-vyhodnoj/4874735"
        },
        {
            "title": "TO THE HELLFIRE",
            "type": "Stout - Imperial / Double Milk",
            "rating": 4.02,
            "url": "https://untappd.com/b/coven-brewery-to-the-hellfire/5142712"
        },
        {
            "title": "ALONE IN A ROOM",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.34,
            "url": "https://untappd.com/b/coven-brewery-alone-in-a-room/5252726"
        },
        {
            "title": "SLEEPING SUN",
            "type": "Cider - Dry",
            "rating": 3.46,
            "url": "https://untappd.com/b/coven-brewery-sleeping-sun/5142717"
        },
        {
            "title": "A MILLION LITTLE PIECES",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.07,
            "url": "https://untappd.com/b/coven-brewery-a-million-little-pieces/5250943"
        },
        {
            "title": "Hefeweizen",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.43,
            "url": "https://untappd.com/b/coven-brewery-hefeweizen/3326593"
        },
        {
            "title": "FAMOUS LAST WORDS",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.11,
            "url": "https://untappd.com/b/coven-brewery-famous-last-words/5250946"
        },
        {
            "title": "Tomato Gose BBQ с перцем чили Беру Выходной",
            "type": "Sour - Other Gose",
            "rating": 3.89,
            "url": "https://untappd.com/b/coven-brewery-tomato-gose-bbq-s-percem-chili-beru-vyhodnoj/5142719"
        },
        {
            "title": "MEET ME ON THE ROOF",
            "type": "IPA - Triple",
            "rating": 4.02,
            "url": "https://untappd.com/b/coven-brewery-meet-me-on-the-roof/5276846"
        },
        {
            "title": "BACK TO THE PRIMITIVE",
            "type": "IPA - American",
            "rating": 3.92,
            "url": "https://untappd.com/b/coven-brewery-back-to-the-primitive/5263476"
        },
        {
            "title": "SAFERWATERS",
            "type": "Sour - Other Gose",
            "rating": 4.22,
            "url": "https://untappd.com/b/coven-brewery-saferwaters/5250947"
        },
        {
            "title": "THE LEGACY",
            "type": "Barleywine - English",
            "rating": 3.62,
            "url": "https://untappd.com/b/coven-brewery-the-legacy/5276847"
        },
        {
            "title": "Lager",
            "type": "Lager - Pale",
            "rating": 3.35,
            "url": "https://untappd.com/b/coven-brewery-lager/3734082"
        },
        {
            "title": "Helles",
            "type": "Lager - Helles",
            "rating": 3.58,
            "url": "https://untappd.com/b/coven-brewery-helles/3435910"
        },
        {
            "title": "ANGELS FALL",
            "type": "Sour - Smoothie / Pastry",
            "rating": null,
            "url": "https://untappd.com/b/coven-brewery-angels-fall/5300387"
        },
        {
            "title": "AVALANCHE",
            "type": "Lager - Helles",
            "rating": null,
            "url": "https://untappd.com/b/coven-brewery-avalanche/5301379"
        },
        {
            "title": "SLEEPWALKING",
            "type": "Sour - Smoothie / Pastry",
            "rating": null,
            "url": "https://untappd.com/b/coven-brewery-sleepwalking/5300419"
        },
        {
            "title": "UNTIL THE WORLD GOES COLD",
            "type": "Sour - Fruited",
            "rating": null,
            "url": "https://untappd.com/b/coven-brewery-until-the-world-goes-cold/5322066"
        }
    ],
    "JAWS": [
        {
            "title": "Nuclear Laundry (Атомная Прачечная)",
            "type": "IPA - American",
            "rating": 4.12,
            "url": "https://untappd.com/b/jaws-brewery-nuclear-laundry-atomnaya-prachechnaya/631746"
        },
        {
            "title": "Jaws APA",
            "type": "Pale Ale - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/jaws-brewery-jaws-apa/480265"
        },
        {
            "title": "Ищу Человека / Looking for a Human",
            "type": "Sour - Flanders Red Ale",
            "rating": 3.9,
            "url": "https://untappd.com/b/jaws-brewery-ishu-cheloveka-looking-for-a-human/1423132"
        },
        {
            "title": "Citraizen",
            "type": "Wheat Beer - Kristallweizen",
            "rating": 3.8,
            "url": "https://untappd.com/b/jaws-brewery-citraizen/1164073"
        },
        {
            "title": "Jazz & Juice",
            "type": "IPA - American",
            "rating": 3.96,
            "url": "https://untappd.com/b/jaws-brewery-jazz-and-juice/2532151"
        },
        {
            "title": "Oatmeal Stout",
            "type": "Stout - Oatmeal",
            "rating": 3.75,
            "url": "https://untappd.com/b/jaws-brewery-oatmeal-stout/431371"
        },
        {
            "title": "Somnambula",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.87,
            "url": "https://untappd.com/b/jaws-brewery-somnambula/1752341"
        },
        {
            "title": "Sour Breeze Mango",
            "type": "Sour - Fruited Gose",
            "rating": 3.92,
            "url": "https://untappd.com/b/jaws-brewery-sour-breeze-mango/3039523"
        },
        {
            "title": "Russian Imperial Stout V.I",
            "type": "Stout - Russian Imperial",
            "rating": 3.98,
            "url": "https://untappd.com/b/jaws-brewery-russian-imperial-stout-v-i/1645657"
        },
        {
            "title": "Weizen",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.75,
            "url": "https://untappd.com/b/jaws-brewery-weizen/839739"
        },
        {
            "title": "Jaws Lager",
            "type": "Pilsner - Other",
            "rating": 3.69,
            "url": "https://untappd.com/b/jaws-brewery-jaws-lager/601856"
        },
        {
            "title": "Nuclear Laundry (Атомная Прачечная) Black IPA",
            "type": "IPA - Black / Cascadian Dark Ale",
            "rating": 3.95,
            "url": "https://untappd.com/b/jaws-brewery-nuclear-laundry-atomnaya-prachechnaya-black-ipa/1904356"
        },
        {
            "title": "Sour Breeze Grapefruit",
            "type": "Sour - Fruited Gose",
            "rating": 3.87,
            "url": "https://untappd.com/b/jaws-brewery-sour-breeze-grapefruit/2569494"
        },
        {
            "title": "Maui Porter",
            "type": "Porter - Other",
            "rating": 3.8,
            "url": "https://untappd.com/b/jaws-brewery-maui-porter/1472143"
        },
        {
            "title": "Tshawytscha",
            "type": "IPA - Imperial / Double",
            "rating": 3.92,
            "url": "https://untappd.com/b/jaws-brewery-tshawytscha/1569960"
        },
        {
            "title": "Ищу Человека / Looking for a Human (Red Edition)",
            "type": "Sour - Flanders Red Ale",
            "rating": 4.12,
            "url": "https://untappd.com/b/jaws-brewery-ishu-cheloveka-red-edition/2626154"
        },
        {
            "title": "Nitro Stout",
            "type": "Stout - Milk / Sweet",
            "rating": 3.84,
            "url": "https://untappd.com/b/jaws-brewery-nitro-stout/2657767"
        },
        {
            "title": "Nuclear Laundry Chili Infused (Атомная Прачечная Чили) Red IPA",
            "type": "Chilli / Chile Beer",
            "rating": 3.76,
            "url": "https://untappd.com/b/jaws-brewery-nuclear-laundry-chili-infused-atomnaya-prachechnaya-chili-red-ipa/3070479"
        },
        {
            "title": "Red Widow",
            "type": "Belgian Strong Dark Ale",
            "rating": 3.92,
            "url": "https://untappd.com/b/jaws-brewery-red-widow/3636212"
        },
        {
            "title": "Populism Mosaic Edition",
            "type": "IPA - New England / Hazy",
            "rating": 3.91,
            "url": "https://untappd.com/b/jaws-brewery-populism-mosaic-edition/2655214"
        },
        {
            "title": "Pale Ale",
            "type": "Pale Ale - English",
            "rating": 3.7,
            "url": "https://untappd.com/b/jaws-brewery-pale-ale/312663"
        },
        {
            "title": "Ищу Человека White",
            "type": "Sour - Flanders Oud Bruin",
            "rating": 3.97,
            "url": "https://untappd.com/b/jaws-brewery-ishu-cheloveka-white/4026767"
        },
        {
            "title": "Lost Pumpkins",
            "type": "Pumpkin / Yam Beer",
            "rating": 3.7,
            "url": "https://untappd.com/b/jaws-brewery-lost-pumpkins/2897680"
        },
        {
            "title": "Open Minded",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.82,
            "url": "https://untappd.com/b/jaws-brewery-open-minded/3164082"
        },
        {
            "title": "Durak",
            "type": "Porter - Imperial / Double",
            "rating": 3.81,
            "url": "https://untappd.com/b/jaws-brewery-durak/3100981"
        },
        {
            "title": "Vova",
            "type": "Stout - Russian Imperial",
            "rating": 4.06,
            "url": "https://untappd.com/b/jaws-brewery-vova/2995766"
        },
        {
            "title": "Populism",
            "type": "IPA - New England / Hazy",
            "rating": 3.84,
            "url": "https://untappd.com/b/jaws-brewery-populism/2258386"
        },
        {
            "title": "Don't Worry Baby",
            "type": "Non-Alcoholic Beer - Pale Ale",
            "rating": 3.48,
            "url": "https://untappd.com/b/jaws-brewery-don-t-worry-baby/2152086"
        },
        {
            "title": "Hyper India DIPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.88,
            "url": "https://untappd.com/b/jaws-brewery-hyper-india-dipa/2976970"
        },
        {
            "title": "Populism Vic Secret Edition",
            "type": "IPA - New England / Hazy",
            "rating": 3.79,
            "url": "https://untappd.com/b/jaws-brewery-populism-vic-secret-edition/3196953"
        },
        {
            "title": "Jazz & Juice Grapefruit",
            "type": "IPA - Other",
            "rating": 3.8,
            "url": "https://untappd.com/b/jaws-brewery-jazz-and-juice-grapefruit/3560233"
        },
        {
            "title": "Check Out",
            "type": "IPA - Brut",
            "rating": 3.71,
            "url": "https://untappd.com/b/jaws-brewery-check-out/2943812"
        },
        {
            "title": "Squat & Spot",
            "type": "IPA - New England / Hazy",
            "rating": 3.94,
            "url": "https://untappd.com/b/jaws-brewery-squat-and-spot/2738099"
        },
        {
            "title": "Pilsner",
            "type": "Pilsner - Czech / Bohemian",
            "rating": 3.66,
            "url": "https://untappd.com/b/jaws-brewery-pilsner/1611763"
        },
        {
            "title": "Holy Trip",
            "type": "Belgian Tripel",
            "rating": 3.64,
            "url": "https://untappd.com/b/jaws-brewery-holy-trip/2932523"
        },
        {
            "title": "Brown Ale",
            "type": "Brown Ale - English",
            "rating": 3.75,
            "url": "https://untappd.com/b/jaws-brewery-brown-ale/409792"
        },
        {
            "title": "Sour Storm",
            "type": "Sour - Fruited Gose",
            "rating": 3.81,
            "url": "https://untappd.com/b/jaws-brewery-sour-storm/2943785"
        },
        {
            "title": "Cherry Swing",
            "type": "Fruit Beer",
            "rating": 3.37,
            "url": "https://untappd.com/b/jaws-brewery-cherry-swing/2477076"
        },
        {
            "title": "Spot IPA",
            "type": "IPA - Session",
            "rating": 3.68,
            "url": "https://untappd.com/b/jaws-brewery-spot-ipa/2050708"
        },
        {
            "title": "Holy Dark",
            "type": "Belgian Strong Dark Ale",
            "rating": 3.58,
            "url": "https://untappd.com/b/jaws-brewery-holy-dark/3217721"
        },
        {
            "title": "Gordian Knot (Гордиев Узел)",
            "type": "Sour - Flanders Oud Bruin",
            "rating": 3.73,
            "url": "https://untappd.com/b/jaws-brewery-gordian-knot-gordiev-uzel/1890094"
        },
        {
            "title": "My Apricot Morning",
            "type": "Non-Alcoholic Beer - Pale Ale",
            "rating": 3.59,
            "url": "https://untappd.com/b/jaws-brewery-my-apricot-morning/3310956"
        },
        {
            "title": "Sour Swing",
            "type": "Sour - Fruited",
            "rating": 3.81,
            "url": "https://untappd.com/b/jaws-brewery-sour-swing/3634435"
        },
        {
            "title": "Singularity Single Hop IPA (Centennial)",
            "type": "IPA - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/jaws-brewery-singularity-single-hop-ipa-centennial/1903334"
        },
        {
            "title": "Populism Zappa Edition",
            "type": "IPA - New England / Hazy",
            "rating": 3.79,
            "url": "https://untappd.com/b/jaws-brewery-populism-zappa-edition/3855425"
        },
        {
            "title": "Helles",
            "type": "Lager - Helles",
            "rating": 3.69,
            "url": "https://untappd.com/b/jaws-brewery-helles/4308822"
        },
        {
            "title": "Chomolungma",
            "type": "Roggenbier",
            "rating": 3.72,
            "url": "https://untappd.com/b/jaws-brewery-chomolungma/1879253"
        },
        {
            "title": "Гордиев Узел / Малина и Вишня",
            "type": "Sour - Flanders Oud Bruin",
            "rating": 3.85,
            "url": "https://untappd.com/b/jaws-brewery-gordiev-uzel-malina-i-vishnya/4225930"
        },
        {
            "title": "Distortion",
            "type": "Barleywine - American",
            "rating": 3.87,
            "url": "https://untappd.com/b/jaws-brewery-distortion/2673462"
        },
        {
            "title": "Russian Imperial Stout V.II",
            "type": "Stout - Russian Imperial",
            "rating": 4.02,
            "url": "https://untappd.com/b/jaws-brewery-russian-imperial-stout-v-ii/1974604"
        },
        {
            "title": "Saison Raspberry Edition",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.57,
            "url": "https://untappd.com/b/jaws-brewery-saison-raspberry-edition/2428018"
        },
        {
            "title": "Cynic / Red Edition",
            "type": "Sour - Flanders Oud Bruin",
            "rating": 3.59,
            "url": "https://untappd.com/b/jaws-brewery-cynic/2746029"
        },
        {
            "title": "Sour Flex",
            "type": "Sour - Fruited Gose",
            "rating": 3.75,
            "url": "https://untappd.com/b/jaws-brewery-sour-flex/3678977"
        },
        {
            "title": "I Am Sourry Sweetie",
            "type": "Non-Alcoholic Beer - Sour",
            "rating": 3.92,
            "url": "https://untappd.com/b/jaws-brewery-i-am-sourry-sweetie/3959136"
        },
        {
            "title": "Jazz & Juice Mango",
            "type": "IPA - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/jaws-brewery-jazz-and-juice-mango/4227221"
        },
        {
            "title": "Berry Mary Lingonberry (Брусника)",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.48,
            "url": "https://untappd.com/b/jaws-brewery-berry-mary-lingonberry-brusnika/3538713"
        },
        {
            "title": "Dvanáctka.ale",
            "type": "Pilsner - Other",
            "rating": 3.47,
            "url": "https://untappd.com/b/jaws-brewery-dvanactka-ale/1911696"
        },
        {
            "title": "Poltergeist",
            "type": "Belgian Strong Dark Ale",
            "rating": 3.77,
            "url": "https://untappd.com/b/jaws-brewery-poltergeist/562715"
        },
        {
            "title": "Smoky Island",
            "type": "Stout - Russian Imperial",
            "rating": 3.83,
            "url": "https://untappd.com/b/jaws-brewery-smoky-island/2701203"
        },
        {
            "title": "Holiness",
            "type": "Belgian Dubbel",
            "rating": 3.61,
            "url": "https://untappd.com/b/jaws-brewery-holiness/3636349"
        },
        {
            "title": "Asteroid",
            "type": "Stout - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/jaws-brewery-asteroid/409820"
        },
        {
            "title": "Macro Series: Raspberry bourbon",
            "type": "Stout - Imperial / Double",
            "rating": 4.03,
            "url": "https://untappd.com/b/jaws-brewery-macro-series-raspberry-bourbon/3716610"
        },
        {
            "title": "Russian Imperial Stout V.III",
            "type": "Stout - Russian Imperial",
            "rating": 3.98,
            "url": "https://untappd.com/b/jaws-brewery-russian-imperial-stout-v-iii/3407938"
        },
        {
            "title": "Macro Series: Berries Barrels Broken Beans",
            "type": "Stout - Russian Imperial",
            "rating": 4.03,
            "url": "https://untappd.com/b/jaws-brewery-macro-series-berries-barrels-broken-beans/4642447"
        },
        {
            "title": "Marzen",
            "type": "Märzen",
            "rating": 3.69,
            "url": "https://untappd.com/b/jaws-brewery-marzen/3959084"
        },
        {
            "title": "Bravada Xmas Bock",
            "type": "Bock - Single / Traditional",
            "rating": 3.56,
            "url": "https://untappd.com/b/jaws-brewery-bravada-xmas-bock/4083347"
        },
        {
            "title": "Macro Series: Salty Chocolate",
            "type": "Stout - Imperial / Double",
            "rating": 3.92,
            "url": "https://untappd.com/b/jaws-brewery-macro-series-salty-chocolate/3793714"
        },
        {
            "title": "Гордиев Узел / Oud Blonde",
            "type": "Sour - Flanders Oud Bruin",
            "rating": 3.86,
            "url": "https://untappd.com/b/jaws-brewery-gordiev-uzel-oud-blonde/4319817"
        },
        {
            "title": "Sour Storm / Pineapple + Basil",
            "type": "Sour - Fruited Gose",
            "rating": 3.9,
            "url": "https://untappd.com/b/jaws-brewery-sour-storm-pineapple-basil/4209188"
        },
        {
            "title": "Bravada",
            "type": "Wheat Beer - Hopfenweisse",
            "rating": 3.7,
            "url": "https://untappd.com/b/jaws-brewery-bravada/3650556"
        },
        {
            "title": "Mousson",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.71,
            "url": "https://untappd.com/b/jaws-brewery-mousson/2387056"
        },
        {
            "title": "Singularity Single Hop IPA (Cashmere)",
            "type": "IPA - American",
            "rating": 3.73,
            "url": "https://untappd.com/b/jaws-brewery-singularity-single-hop-ipa-cashmere/4379541"
        },
        {
            "title": "Singularity Single Hop IPA (Simcoe)",
            "type": "IPA - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/jaws-brewery-singularity-single-hop-ipa-simcoe/2629310"
        },
        {
            "title": "Macro Series: Spicy Pumpkin",
            "type": "Pumpkin / Yam Beer",
            "rating": 3.93,
            "url": "https://untappd.com/b/jaws-brewery-macro-series-spicy-pumpkin/4020725"
        },
        {
            "title": "(REMIX) Tiki Jazz",
            "type": "Sour - Fruited",
            "rating": 3.86,
            "url": "https://untappd.com/b/jaws-brewery-remix-tiki-jazz/3724443"
        },
        {
            "title": "Cynic / Blue Edition",
            "type": "Sour - Flanders Oud Bruin",
            "rating": 3.72,
            "url": "https://untappd.com/b/jaws-brewery-cynic-sinyaya-redakciya/4648144"
        },
        {
            "title": "Hop Matter",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.74,
            "url": "https://untappd.com/b/jaws-brewery-hop-matter/3821472"
        },
        {
            "title": "Одиннадцать",
            "type": "Sour - Flanders Oud Bruin",
            "rating": 4,
            "url": "https://untappd.com/b/jaws-brewery-odinnadcat/3406079"
        },
        {
            "title": "Buffonata",
            "type": "IPA - Imperial / Double",
            "rating": 3.78,
            "url": "https://untappd.com/b/jaws-brewery-buffonata/4764737"
        },
        {
            "title": "Macro Series: Smoky Peppers",
            "type": "Stout - Imperial / Double",
            "rating": 3.85,
            "url": "https://untappd.com/b/jaws-brewery-macro-series-smoky-peppers/4102296"
        },
        {
            "title": "Cafe Racer",
            "type": "Brown Ale - Belgian",
            "rating": 3.47,
            "url": "https://untappd.com/b/jaws-brewery-cafe-racer/2037890"
        },
        {
            "title": "Конёк-Горбунок / NEIPA",
            "type": "IPA - New England / Hazy",
            "rating": 3.42,
            "url": "https://untappd.com/b/jaws-brewery-konyok-gorbunok-neipa/4312020"
        },
        {
            "title": "Singularity Single Hop IPA (Comet)",
            "type": "IPA - American",
            "rating": 3.69,
            "url": "https://untappd.com/b/jaws-brewery-singularity-single-hop-ipa-comet/4264898"
        },
        {
            "title": "Rye Matter",
            "type": "IPA - Rye",
            "rating": 3.67,
            "url": "https://untappd.com/b/jaws-brewery-rye-matter/3844596"
        },
        {
            "title": "Mlk Matter",
            "type": "Stout - Milk / Sweet",
            "rating": 3.78,
            "url": "https://untappd.com/b/jaws-brewery-mlk-matter/3795042"
        },
        {
            "title": "Ogni Pale Ale",
            "type": "Pale Ale - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/jaws-brewery-ogni-pale-ale/1561399"
        },
        {
            "title": "Happy New Breeze",
            "type": "Sour - Fruited Gose",
            "rating": 4.03,
            "url": "https://untappd.com/b/jaws-brewery-happy-new-breeze/4647934"
        },
        {
            "title": "Celebration Amber Ale",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.54,
            "url": "https://untappd.com/b/jaws-brewery-celebration-amber-ale/2422285"
        },
        {
            "title": "Peach Matter",
            "type": "IPA - Sour",
            "rating": 3.62,
            "url": "https://untappd.com/b/jaws-brewery-peach-matter/3928773"
        },
        {
            "title": "Smoky Island / Впадина у мельницы",
            "type": "Stout - Russian Imperial",
            "rating": 4.16,
            "url": "https://untappd.com/b/jaws-brewery-smoky-island-vpadina-u-melnicy/4849456"
        },
        {
            "title": "Thaiberia.gse",
            "type": "Sour - Fruited Gose",
            "rating": 3.7,
            "url": "https://untappd.com/b/jaws-brewery-thaiberia-gse/1561376"
        },
        {
            "title": "Smoky Island / Небольшой Мыс",
            "type": "Stout - Russian Imperial",
            "rating": 4.17,
            "url": "https://untappd.com/b/jaws-brewery-smoky-island-nebolshoj-mys/4849425"
        },
        {
            "title": "Quadroletta",
            "type": "Belgian Strong Dark Ale",
            "rating": 4.15,
            "url": "https://untappd.com/b/jaws-brewery-quadroletta/4650504"
        },
        {
            "title": "Anteater Pale Ale",
            "type": "Pale Ale - American",
            "rating": 4,
            "url": "https://untappd.com/b/jaws-brewery-anteater-pale-ale/968829"
        },
        {
            "title": "Smoky Island / Долина у широкой бухты",
            "type": "Stout - Russian Imperial",
            "rating": 4.17,
            "url": "https://untappd.com/b/jaws-brewery-smoky-island-dolina-u-shirokoj-buhty/4849403"
        },
        {
            "title": "I Am Sourry Baby",
            "type": "Non-Alcoholic Beer - Sour",
            "rating": 3.4,
            "url": "https://untappd.com/b/jaws-brewery-i-am-sourry-baby/1993159"
        },
        {
            "title": "Populism Random Hops",
            "type": "IPA - New England / Hazy",
            "rating": 3.67,
            "url": "https://untappd.com/b/jaws-brewery-populism-random-hops/3082179"
        },
        {
            "title": "Overdrive",
            "type": "Barleywine - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/jaws-brewery-overdrive/4587176"
        },
        {
            "title": "(REMIX) Malibu ZEN",
            "type": "Wheat Beer - Kristallweizen",
            "rating": 3.33,
            "url": "https://untappd.com/b/jaws-brewery-remix-malibu-zen/3895592"
        },
        {
            "title": "Out of the Stout",
            "type": "Stout - Milk / Sweet",
            "rating": 3.7,
            "url": "https://untappd.com/b/jaws-brewery-out-of-the-stout/4244915"
        },
        {
            "title": "Populism Sabro Edition",
            "type": "IPA - New England / Hazy",
            "rating": 3.84,
            "url": "https://untappd.com/b/jaws-brewery-populism-sabro-edition/4207588"
        },
        {
            "title": "Sour Storm / Orange + Maracuja",
            "type": "Sour - Fruited Gose",
            "rating": 3.85,
            "url": "https://untappd.com/b/jaws-brewery-sour-storm-orange-maracuja/4422841"
        },
        {
            "title": "Quadrolia",
            "type": "Belgian Strong Dark Ale",
            "rating": 3.97,
            "url": "https://untappd.com/b/jaws-brewery-quadrolia/2408978"
        },
        {
            "title": "Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.54,
            "url": "https://untappd.com/b/jaws-brewery-saison/2113204"
        },
        {
            "title": "(REMIX) Highball Storm",
            "type": "Sour - Other Gose",
            "rating": 3.18,
            "url": "https://untappd.com/b/jaws-brewery-remix-highball-storm/3987854"
        },
        {
            "title": "Amelie",
            "type": "Blonde Ale",
            "rating": 3.59,
            "url": "https://untappd.com/b/jaws-brewery-amelie/2868743"
        },
        {
            "title": "Berry Mary Cranberries (Клюква)",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.55,
            "url": "https://untappd.com/b/jaws-brewery-berry-mary-cranberries-klyukva/3575092"
        },
        {
            "title": "Chantage / Шантаж",
            "type": "Belgian Strong Dark Ale",
            "rating": 4.07,
            "url": "https://untappd.com/b/jaws-brewery-chantage-shantazh/3960526"
        },
        {
            "title": "Quetzalcoatl.ale",
            "type": "IPA - Black / Cascadian Dark Ale",
            "rating": 3.89,
            "url": "https://untappd.com/b/jaws-brewery-quetzalcoatl-ale/1422397"
        },
        {
            "title": "Конёк-Горбунок / Stout",
            "type": "Stout - Other",
            "rating": 3.61,
            "url": "https://untappd.com/b/jaws-brewery-konyok-gorbunok-stout/4316553"
        },
        {
            "title": "JJ & J",
            "type": "Porter - Imperial / Double",
            "rating": 3.91,
            "url": "https://untappd.com/b/jaws-brewery-jj-and-j/2812207"
        },
        {
            "title": "Durak из бочки",
            "type": "Porter - Imperial / Double",
            "rating": 4.04,
            "url": "https://untappd.com/b/jaws-brewery-durak-iz-bochki/4693541"
        },
        {
            "title": "Double_oatmeal_stout.ale",
            "type": "Stout - Imperial / Double Oatmeal",
            "rating": 4.01,
            "url": "https://untappd.com/b/jaws-brewery-double_oatmeal_stout-ale/1635771"
        },
        {
            "title": "Cuvee XIV",
            "type": "Barleywine - Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/jaws-brewery-cuvee-xiv/4968048"
        },
        {
            "title": "Russian Imperial Stout V.IV",
            "type": "Stout - Russian Imperial",
            "rating": 4.01,
            "url": "https://untappd.com/b/jaws-brewery-russian-imperial-stout-v-iv/4098746"
        },
        {
            "title": "Populism Galaxy Edition",
            "type": "IPA - New England / Hazy",
            "rating": 3.64,
            "url": "https://untappd.com/b/jaws-brewery-populism-galaxy-edition/2554810"
        },
        {
            "title": "Nectar Noir",
            "type": "Stout - Russian Imperial",
            "rating": 4.1,
            "url": "https://untappd.com/b/jaws-brewery-nectar-noir/4926857"
        },
        {
            "title": "Jazz & Juice Tiki",
            "type": "IPA - American",
            "rating": 3.63,
            "url": "https://untappd.com/b/jaws-brewery-jazz-and-juice-tiki/4457747"
        },
        {
            "title": "IPA Blind Tiger Style",
            "type": "IPA - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/jaws-brewery-ipa-blind-tiger-style/1309311"
        },
        {
            "title": "Out of the Stout: Ежевика",
            "type": "Stout - Milk / Sweet",
            "rating": 3.79,
            "url": "https://untappd.com/b/jaws-brewery-out-of-the-stout-ezhevika/4508116"
        },
        {
            "title": "Saison Leto Edition",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.49,
            "url": "https://untappd.com/b/jaws-brewery-saison-leto-edition/2833524"
        },
        {
            "title": "(REMIX) Mauki",
            "type": "Porter - Other",
            "rating": 3.84,
            "url": "https://untappd.com/b/jaws-brewery-remix-mauki/4091650"
        },
        {
            "title": "Double Wheat Flip",
            "type": "Bock - Weizenbock",
            "rating": 3.57,
            "url": "https://untappd.com/b/jaws-brewery-double-wheat-flip/2109496"
        },
        {
            "title": "IPA Dog Style",
            "type": "IPA - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/jaws-brewery-ipa-dog-style/1309310"
        },
        {
            "title": "Russian Imperial Stout / Bourbon",
            "type": "Stout - Russian Imperial",
            "rating": 4.06,
            "url": "https://untappd.com/b/jaws-brewery-russian-imperial-stout-bourbon/4827377"
        },
        {
            "title": "Populism Citraxy Edition",
            "type": "IPA - New England / Hazy",
            "rating": 3.74,
            "url": "https://untappd.com/b/jaws-brewery-populism-citraxy-edition/2632448"
        },
        {
            "title": "Cynic / Green Edition",
            "type": "Sour - Flanders Oud Bruin",
            "rating": 3.88,
            "url": "https://untappd.com/b/jaws-brewery-cynic-green-edition/4829172"
        },
        {
            "title": "Blanche",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.59,
            "url": "https://untappd.com/b/jaws-brewery-blanche/4904047"
        },
        {
            "title": "Coconut_porter.ale",
            "type": "Porter - Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/jaws-brewery-coconut_porter-ale/1075090"
        },
        {
            "title": "Populism Hop Cannon 20222",
            "type": "IPA - New England / Hazy",
            "rating": 3.81,
            "url": "https://untappd.com/b/jaws-brewery-populism-hop-cannon-20222/4750246"
        },
        {
            "title": "Populism Idarado Edition",
            "type": "IPA - New England / Hazy",
            "rating": 3.99,
            "url": "https://untappd.com/b/jaws-brewery-populism-idarado-edition/2765441"
        },
        {
            "title": "Wheat_flip.ale",
            "type": "Wheat Beer - Dunkelweizen",
            "rating": 3.51,
            "url": "https://untappd.com/b/jaws-brewery-wheat_flip-ale/1940391"
        },
        {
            "title": "Out of the Stout: Арахис / Банан / Ваниль",
            "type": "Stout - Milk / Sweet",
            "rating": 3.79,
            "url": "https://untappd.com/b/jaws-brewery-out-of-the-stout-arahis-banan-vanil/4371787"
        },
        {
            "title": "Out of the Stout: Апельсин / Острый перец",
            "type": "Stout - Milk / Sweet",
            "rating": 3.72,
            "url": "https://untappd.com/b/jaws-brewery-out-of-the-stout-apelsin-chili/4644545"
        },
        {
            "title": "Chimera",
            "type": "Wild Ale - Other",
            "rating": 3.82,
            "url": "https://untappd.com/b/jaws-brewery-chimera/4655467"
        },
        {
            "title": "IPA Monkey Style",
            "type": "IPA - American",
            "rating": 3.9,
            "url": "https://untappd.com/b/jaws-brewery-ipa-monkey-style/1309024"
        },
        {
            "title": "Populism Idaho Gem + Sabro",
            "type": "IPA - New England / Hazy",
            "rating": 3.88,
            "url": "https://untappd.com/b/jaws-brewery-populism-idaho-gem-sabro/4912147"
        },
        {
            "title": "Berry Mary Currant & Raspberry (Смородина и Малина)",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.54,
            "url": "https://untappd.com/b/jaws-brewery-berry-mary-currant-and-raspberry-smorodina-i-malina/3964321"
        },
        {
            "title": "Populism Talus + Mosaic",
            "type": "IPA - New England / Hazy",
            "rating": 3.93,
            "url": "https://untappd.com/b/jaws-brewery-populism-talus-mosaic/5003570"
        },
        {
            "title": "IPA Crane Style",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/jaws-brewery-ipa-crane-style/1309309"
        },
        {
            "title": "Populism Pluralism",
            "type": "IPA - New England / Hazy",
            "rating": 3.86,
            "url": "https://untappd.com/b/jaws-brewery-populism-pluralism/4963851"
        },
        {
            "title": "White Brett Berry",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.71,
            "url": "https://untappd.com/b/jaws-brewery-white-brett-berry/1930701"
        },
        {
            "title": "I Am Sourry Stormy",
            "type": "Non-Alcoholic Beer - Sour",
            "rating": 3.75,
            "url": "https://untappd.com/b/jaws-brewery-i-am-sourry-stormy/4588689"
        },
        {
            "title": "Don't Panic",
            "type": "Sour - Fruited",
            "rating": 3.86,
            "url": "https://untappd.com/b/jaws-brewery-don-t-panic/3408002"
        },
        {
            "title": "Amber Ale",
            "type": "Pale Ale - Belgian",
            "rating": 3.63,
            "url": "https://untappd.com/b/jaws-brewery-amber-ale/529679"
        },
        {
            "title": "Blue Brett Berry",
            "type": "Brett Beer",
            "rating": 3.5,
            "url": "https://untappd.com/b/jaws-brewery-blue-brett-berry/3627508"
        },
        {
            "title": "Bonom",
            "type": "Sour - Flanders Oud Bruin",
            "rating": 3.85,
            "url": "https://untappd.com/b/jaws-brewery-bonom/5122645"
        },
        {
            "title": "EXP4",
            "type": "Barleywine - Other",
            "rating": 3.91,
            "url": "https://untappd.com/b/jaws-brewery-exp4/2910126"
        },
        {
            "title": "Jaws(8).bsa",
            "type": "Belgian Strong Golden Ale",
            "rating": 3.61,
            "url": "https://untappd.com/b/jaws-brewery-jaws-8-bsa/1635752"
        },
        {
            "title": "Hysteria",
            "type": "Belgian Quadrupel",
            "rating": 4.2,
            "url": "https://untappd.com/b/jaws-brewery-hysteria/3732005"
        },
        {
            "title": "HOPFENBOCK",
            "type": "Bock - Doppelbock",
            "rating": 3.81,
            "url": "https://untappd.com/b/jaws-brewery-hopfenbock/5162628"
        },
        {
            "title": "Witbier",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.43,
            "url": "https://untappd.com/b/jaws-brewery-witbier/3357364"
        },
        {
            "title": "Sour Storm / Dry-Hopped Nelson Sauvin",
            "type": "Sour - Fruited Gose",
            "rating": 3.77,
            "url": "https://untappd.com/b/jaws-brewery-sour-storm-dry-hopped-nelson-sauvin/3538658"
        },
        {
            "title": "Populism Strata + Cashmere",
            "type": "IPA - New England / Hazy",
            "rating": 3.85,
            "url": "https://untappd.com/b/jaws-brewery-populism-strata-cashmere/5061635"
        },
        {
            "title": "(REMIX) Amberinez",
            "type": "Sour - Other",
            "rating": 3.54,
            "url": "https://untappd.com/b/jaws-brewery-remix-amberinez/4327205"
        },
        {
            "title": "Populism NEO-POP",
            "type": "IPA - New England / Hazy",
            "rating": 3.82,
            "url": "https://untappd.com/b/jaws-brewery-populism-neo-pop/5213394"
        },
        {
            "title": "Smoky Island Light Blend",
            "type": "Stout - Russian Imperial",
            "rating": 3.92,
            "url": "https://untappd.com/b/jaws-brewery-smoky-island-light-blend/2882326"
        },
        {
            "title": "Уральский Дикий (Ural'skiy Dikiy)",
            "type": "Sour - Other",
            "rating": 3.77,
            "url": "https://untappd.com/b/jaws-brewery-uralskij-dikij-ural-skiy-dikiy/2192625"
        },
        {
            "title": "Розэ.gse",
            "type": "Sour - Other Gose",
            "rating": 3.51,
            "url": "https://untappd.com/b/jaws-brewery-roze-gse/1450470"
        },
        {
            "title": "New_gose(1).gse",
            "type": "Sour - Other Gose",
            "rating": 3.26,
            "url": "https://untappd.com/b/jaws-brewery-new-gose-1-gse/1449726"
        },
        {
            "title": "Wild Beer",
            "type": "Wild Ale - American",
            "rating": 3.44,
            "url": "https://untappd.com/b/jaws-brewery-wild-beer/3187013"
        },
        {
            "title": "Wild Specialty Beer Blueberry",
            "type": "Sour - Fruited",
            "rating": 3.67,
            "url": "https://untappd.com/b/jaws-brewery-wild-specialty-beer-blueberry/3191879"
        },
        {
            "title": "Populism Numerology HBC 586",
            "type": "IPA - New England / Hazy",
            "rating": 3.86,
            "url": "https://untappd.com/b/jaws-brewery-populism-numerology-hbc-586/5254614"
        },
        {
            "title": "Berliner Weisse",
            "type": "Sour - Berliner Weisse",
            "rating": 3.51,
            "url": "https://untappd.com/b/jaws-brewery-berliner-weisse/2655290"
        },
        {
            "title": "Contrabandian's Pale Ale",
            "type": "Pale Ale - American",
            "rating": 3.55,
            "url": "https://untappd.com/b/jaws-brewery-contrabandian-s-pale-ale/1692469"
        },
        {
            "title": "Abbey Ale",
            "type": "Belgian Blonde",
            "rating": 3.51,
            "url": "https://untappd.com/b/jaws-brewery-abbey-ale/2965969"
        },
        {
            "title": "Double Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.73,
            "url": "https://untappd.com/b/jaws-brewery-double-saison/2275572"
        },
        {
            "title": "Jaws_bock.lgr",
            "type": "Bock - Single / Traditional",
            "rating": 3.65,
            "url": "https://untappd.com/b/jaws-brewery-jaws_bock-lgr/968826"
        },
        {
            "title": "Karingahtanum",
            "type": "Red Ale - American Amber / Red",
            "rating": 3.91,
            "url": "https://untappd.com/b/jaws-brewery-karingahtanum/968804"
        },
        {
            "title": "Red Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.47,
            "url": "https://untappd.com/b/jaws-brewery-red-saison/1258323"
        },
        {
            "title": "EN Barley Wine",
            "type": "Barleywine - English",
            "rating": 3.86,
            "url": "https://untappd.com/b/jaws-brewery-en-barley-wine/4822973"
        },
        {
            "title": "Солнечный Удар",
            "type": "Bock - Eisbock",
            "rating": 4.14,
            "url": "https://untappd.com/b/jaws-brewery-solnechnyj-udar/1164156"
        },
        {
            "title": "Buffonata (Talus)",
            "type": "IPA - Imperial / Double",
            "rating": 3.81,
            "url": "https://untappd.com/b/jaws-brewery-buffonata-talus/5133608"
        },
        {
            "title": "Uppercut",
            "type": "Scotch Ale / Wee Heavy",
            "rating": 3.63,
            "url": "https://untappd.com/b/jaws-brewery-uppercut/968822"
        },
        {
            "title": "Buffonata (McKenzie)",
            "type": "IPA - Imperial / Double",
            "rating": 3.84,
            "url": "https://untappd.com/b/jaws-brewery-buffonata-single-hop-mckenzie/5259980"
        },
        {
            "title": "Farmhouse",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.41,
            "url": "https://untappd.com/b/jaws-brewery-farmhouse/3199249"
        },
        {
            "title": "New_black(2).ale",
            "type": "IPA - Black / Cascadian Dark Ale",
            "rating": 3.88,
            "url": "https://untappd.com/b/jaws-brewery-new_black-2-ale/1194127"
        },
        {
            "title": "Oktoberfest",
            "type": "Märzen",
            "rating": 3.7,
            "url": "https://untappd.com/b/jaws-brewery-oktoberfest/1229004"
        },
        {
            "title": "US Barley Wine",
            "type": "Barleywine - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/jaws-brewery-us-barley-wine/4317481"
        },
        {
            "title": "Chinook Single Hop",
            "type": "Pale Ale - American",
            "rating": 3.92,
            "url": "https://untappd.com/b/jaws-brewery-chinook-single-hop/1194129"
        },
        {
            "title": "10 Years Anniversary Beer Card",
            "type": "Pilsner - Other",
            "rating": 3.54,
            "url": "https://untappd.com/b/jaws-brewery-10-years-anniversary-beer-card/2790658"
        },
        {
            "title": "Blonde Ale",
            "type": "Belgian Blonde",
            "rating": 3.7,
            "url": "https://untappd.com/b/jaws-brewery-blonde-ale/806840"
        },
        {
            "title": "Tomahawk.lgr",
            "type": "Lager - Dark",
            "rating": 3.55,
            "url": "https://untappd.com/b/jaws-brewery-tomahawk-lgr/870970"
        },
        {
            "title": "Dunkel Spice",
            "type": "Wheat Beer - Dunkelweizen",
            "rating": 3.54,
            "url": "https://untappd.com/b/jaws-brewery-dunkel-spice/1367383"
        },
        {
            "title": "2Pac",
            "type": "Stout - Other",
            "rating": 3.68,
            "url": "https://untappd.com/b/jaws-brewery-2pac/1367514"
        },
        {
            "title": "Easy Brett Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.38,
            "url": "https://untappd.com/b/jaws-brewery-easy-brett-saison/1222781"
        },
        {
            "title": "Peach Brett Punch",
            "type": "Brett Beer",
            "rating": 3.91,
            "url": "https://untappd.com/b/jaws-brewery-peach-brett-punch/3729204"
        },
        {
            "title": "MIX: New_gose(1).gse & Розэ.gse",
            "type": "Sour - Fruited Gose",
            "rating": 3.36,
            "url": "https://untappd.com/b/jaws-brewery-mix-new-gose-1-gse-and-roze-gse/1487232"
        },
        {
            "title": "Hoppy Brett Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.7,
            "url": "https://untappd.com/b/jaws-brewery-hoppy-brett-saison/1245817"
        },
        {
            "title": "Breison",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.92,
            "url": "https://untappd.com/b/jaws-brewery-breison/2192676"
        },
        {
            "title": "Easy Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.96,
            "url": "https://untappd.com/b/jaws-brewery-easy-saison/1147085"
        },
        {
            "title": "Destructive",
            "type": "Farmhouse Ale - Saison",
            "rating": null,
            "url": "https://untappd.com/b/jaws-brewery-destructive/4955283"
        }
    ],
    "KONIX": [
        {
            "title": "OVERFALL",
            "type": "IPA - American",
            "rating": 3.68,
            "url": "https://untappd.com/b/konix-brewery-overfall/1451436"
        },
        {
            "title": "Crazy Moose",
            "type": "Pale Ale - American",
            "rating": 3.65,
            "url": "https://untappd.com/b/konix-brewery-crazy-moose/1421700"
        },
        {
            "title": "Mon Cher Cassis",
            "type": "Fruit Beer",
            "rating": 3.7,
            "url": "https://untappd.com/b/konix-brewery-mon-cher-cassis/2048717"
        },
        {
            "title": "Chérie Cherry",
            "type": "Fruit Beer",
            "rating": 3.62,
            "url": "https://untappd.com/b/konix-brewery-cherie-cherry/1422373"
        },
        {
            "title": "Ice Cream Porter Plombeer",
            "type": "Porter - Baltic",
            "rating": 3.62,
            "url": "https://untappd.com/b/konix-brewery-ice-cream-porter-plombeer/2995901"
        },
        {
            "title": "Blanche Ma Cherie",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.51,
            "url": "https://untappd.com/b/konix-brewery-blanche-ma-cherie/1434224"
        },
        {
            "title": "Mary, Go Home!",
            "type": "Sour - Other Gose",
            "rating": 3.76,
            "url": "https://untappd.com/b/konix-brewery-mary-go-home/2952006"
        },
        {
            "title": "Ice Cream Porter Chocolate",
            "type": "Porter - Baltic",
            "rating": 3.68,
            "url": "https://untappd.com/b/konix-brewery-ice-cream-porter-chocolate/2995910"
        },
        {
            "title": "Russian Imperial Stout (barrel # Whisky)",
            "type": "Stout - Russian Imperial",
            "rating": 4.13,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-barrel-whisky/2019152"
        },
        {
            "title": "Hefeweizen Banana",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.56,
            "url": "https://untappd.com/b/konix-brewery-hefeweizen-banana/3226525"
        },
        {
            "title": "Cherry Ruby",
            "type": "Fruit Beer",
            "rating": 4.09,
            "url": "https://untappd.com/b/konix-brewery-cherry-ruby/3158806"
        },
        {
            "title": "Singing Birds",
            "type": "Stout - Oatmeal",
            "rating": 3.5,
            "url": "https://untappd.com/b/konix-brewery-singing-birds/1507639"
        },
        {
            "title": "Черная Мамба",
            "type": "Porter - Baltic",
            "rating": 3.58,
            "url": "https://untappd.com/b/konix-brewery-chernaya-mamba/2288438"
        },
        {
            "title": "CZECH PILSNER",
            "type": "Pilsner - Czech / Bohemian",
            "rating": 3.57,
            "url": "https://untappd.com/b/konix-brewery-konix-czech-pilsner/4274318"
        },
        {
            "title": "Ma Chere Framboise",
            "type": "Fruit Beer",
            "rating": 3.66,
            "url": "https://untappd.com/b/konix-brewery-ma-chere-framboise/2111623"
        },
        {
            "title": "Russian Imperial Stout (barrel #2)",
            "type": "Stout - Russian Imperial",
            "rating": 4.01,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-barrel-2/1751769"
        },
        {
            "title": "Moose, Just Moose",
            "type": "Non-Alcoholic Beer - Lager",
            "rating": 3.56,
            "url": "https://untappd.com/b/konix-brewery-moose-just-moose/2587179"
        },
        {
            "title": "Russian Imperial Stout (barrel #3)",
            "type": "Stout - Russian Imperial",
            "rating": 4.05,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-barrel-3/1862617"
        },
        {
            "title": "Hefeweizen",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.8,
            "url": "https://untappd.com/b/konix-brewery-konix-hefeweizen/2523298"
        },
        {
            "title": "Christmas Ale",
            "type": "Winter Ale",
            "rating": 3.58,
            "url": "https://untappd.com/b/konix-brewery-christmas-ale/2410427"
        },
        {
            "title": "Fiery Pumpkin",
            "type": "Pumpkin / Yam Beer",
            "rating": 3.55,
            "url": "https://untappd.com/b/konix-brewery-fiery-pumpkin/1793141"
        },
        {
            "title": "Mary, Stay Home!",
            "type": "Sour - Other Gose",
            "rating": 3.98,
            "url": "https://untappd.com/b/konix-brewery-mary-stay-home/4140426"
        },
        {
            "title": "Два Путя",
            "type": "Lager - Helles",
            "rating": 3.25,
            "url": "https://untappd.com/b/konix-brewery-dva-putya/1975828"
        },
        {
            "title": "Russian Imperial Stout (barrel #Otmorozok)",
            "type": "Freeze-Distilled Beer",
            "rating": 4.08,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-barrel-otmorozok/2114988"
        },
        {
            "title": "Monsieur L'Abricot",
            "type": "Fruit Beer",
            "rating": 3.64,
            "url": "https://untappd.com/b/konix-brewery-monsieur-l-abricot/2696370"
        },
        {
            "title": "Milkshake Mango#2",
            "type": "IPA - Milkshake",
            "rating": 3.29,
            "url": "https://untappd.com/b/konix-brewery-milkshake-mango-2/3680930"
        },
        {
            "title": "Cassis Ruby",
            "type": "Fruit Beer",
            "rating": 4.11,
            "url": "https://untappd.com/b/konix-brewery-cassis-ruby/3539672"
        },
        {
            "title": "Mary’s Breakfast",
            "type": "Sour - Other Gose",
            "rating": 3.48,
            "url": "https://untappd.com/b/konix-brewery-mary-s-breakfast/3439116"
        },
        {
            "title": "Munich Helles",
            "type": "Lager - Helles",
            "rating": 3.57,
            "url": "https://untappd.com/b/konix-brewery-munich-helles/4753121"
        },
        {
            "title": "Point Break",
            "type": "IPA - Imperial / Double",
            "rating": 3.86,
            "url": "https://untappd.com/b/konix-brewery-point-break/3540811"
        },
        {
            "title": "Hemoglobin",
            "type": "Sour - Fruited",
            "rating": 3.6,
            "url": "https://untappd.com/b/konix-brewery-hemoglobin/3507579"
        },
        {
            "title": "Styrsudden",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.05,
            "url": "https://untappd.com/b/konix-brewery-styrsudden/4071561"
        },
        {
            "title": "Russian Imperial Stout #Tiramisu",
            "type": "Stout - Russian Imperial",
            "rating": 3.82,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-tiramisu/3182433"
        },
        {
            "title": "The Lost Secret",
            "type": "IPA - New England / Hazy",
            "rating": 3.69,
            "url": "https://untappd.com/b/konix-brewery-the-lost-secret/3717982"
        },
        {
            "title": "Russian Imperial Stout #Chocolate",
            "type": "Stout - Russian Imperial",
            "rating": 3.84,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-chocolate/3182432"
        },
        {
            "title": "Belgian Dubbel",
            "type": "Belgian Dubbel",
            "rating": 3.52,
            "url": "https://untappd.com/b/konix-brewery-belgian-dubbel/2377991"
        },
        {
            "title": "TOP SECRET",
            "type": "IPA - New England / Hazy",
            "rating": 3.76,
            "url": "https://untappd.com/b/konix-brewery-top-secret/3683718"
        },
        {
            "title": "Very Happy Cider",
            "type": "Cider - Herbed / Spiced / Hopped",
            "rating": 3.54,
            "url": "https://untappd.com/b/konix-brewery-very-happy-cider/2028438"
        },
        {
            "title": "Russian Imperial Stout (barrel # Madeira)",
            "type": "Stout - Russian Imperial",
            "rating": 4.11,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-barrel-madeira/1862618"
        },
        {
            "title": "SAMPLE SET PASSION FRUIT & MANGO & GRAPEFRUIT",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.06,
            "url": "https://untappd.com/b/konix-brewery-sample-set-passion-fruit-and-mango-and-grapefruit/4355520"
        },
        {
            "title": "Mary's Friend",
            "type": "Sour - Other Gose",
            "rating": 4.09,
            "url": "https://untappd.com/b/konix-brewery-mary-s-friend/4648871"
        },
        {
            "title": "GrapeFruit IPA",
            "type": "IPA - American",
            "rating": 3.7,
            "url": "https://untappd.com/b/konix-brewery-grapefruit-ipa/3819251"
        },
        {
            "title": "No Caller ID",
            "type": "IPA - Triple New England / Hazy",
            "rating": 3.8,
            "url": "https://untappd.com/b/konix-brewery-no-caller-id/4222160"
        },
        {
            "title": "The Mix of Taste Peach & Passion Fruit",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.78,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-peach-and-passion-fruit/4212604"
        },
        {
            "title": "El Grecho",
            "type": "Barleywine - Other",
            "rating": 3.82,
            "url": "https://untappd.com/b/konix-brewery-el-grecho/4067094"
        },
        {
            "title": "Sample Set Strawberry & Banana & Blackberry",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.66,
            "url": "https://untappd.com/b/konix-brewery-sample-set-strawberry-and-banana-and-blackberry/4331745"
        },
        {
            "title": "Black Illusion",
            "type": "Stout - Milk / Sweet",
            "rating": 3.79,
            "url": "https://untappd.com/b/konix-brewery-black-illusion/3650412"
        },
        {
            "title": "Russian Imperial Stout 1 Year Anniversary (barrel #Whisky)",
            "type": "Stout - Russian Imperial",
            "rating": 3.92,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-1-year-anniversary-barrel-whisky/2983410"
        },
        {
            "title": "Ice Cream Porter Hazelnut",
            "type": "Porter - Baltic",
            "rating": 3.85,
            "url": "https://untappd.com/b/konix-brewery-ice-cream-porter-hazelnut/4637119"
        },
        {
            "title": "NE KVAS Malina",
            "type": "Kvass",
            "rating": 3.83,
            "url": "https://untappd.com/b/konix-brewery-ne-kvas-malina/3288279"
        },
        {
            "title": "Vincent Van Coc",
            "type": "Barleywine - Other",
            "rating": 3.69,
            "url": "https://untappd.com/b/konix-brewery-vincent-van-coc/3680933"
        },
        {
            "title": "SAMPLE SET CHERRY & BLACKBERRY",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.5,
            "url": "https://untappd.com/b/konix-brewery-sample-set-cherry-and-blackberry/4317462"
        },
        {
            "title": "NOT Found",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.84,
            "url": "https://untappd.com/b/konix-brewery-not-found/4027698"
        },
        {
            "title": "Patrick",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.69,
            "url": "https://untappd.com/b/konix-brewery-patrick/4212605"
        },
        {
            "title": "The Mix of Taste / Banana & Calamansi",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.95,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-banana-and-calamansi/4202650"
        },
        {
            "title": "Lava Lake",
            "type": "Barleywine - Other",
            "rating": 3.91,
            "url": "https://untappd.com/b/konix-brewery-lava-lake/4195139"
        },
        {
            "title": "IPA ТОВАРИЩИ!",
            "type": "IPA - American",
            "rating": 3.48,
            "url": "https://untappd.com/b/konix-brewery-ipa-tovarishi/4387134"
        },
        {
            "title": "Milk Imperial Penguin",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.79,
            "url": "https://untappd.com/b/konix-brewery-milk-imperial-penguin/3548595"
        },
        {
            "title": "Russian Imperial Stout #Biscuit",
            "type": "Stout - Russian Imperial",
            "rating": 4,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-biscuit/4637324"
        },
        {
            "title": "Russian Imperial Stout (barrel #Porto)",
            "type": "Stout - Russian Imperial",
            "rating": 3.97,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-barrel-porto/3633947"
        },
        {
            "title": "BEACH BREAK",
            "type": "IPA - Imperial / Double",
            "rating": 3.69,
            "url": "https://untappd.com/b/konix-brewery-beach-break/4274319"
        },
        {
            "title": "OVERFLIGHT",
            "type": "IPA - Session",
            "rating": 3.61,
            "url": "https://untappd.com/b/konix-brewery-overflight/3784453"
        },
        {
            "title": "FURCIFER SABRO & FALCONER",
            "type": "IPA - Sour",
            "rating": 3.66,
            "url": "https://untappd.com/b/konix-brewery-furcifer-sabro-and-falconer/4290127"
        },
        {
            "title": "Orange Splash",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 3.84,
            "url": "https://untappd.com/b/konix-brewery-orange-splash/4637316"
        },
        {
            "title": "The Burst",
            "type": "Stout - Russian Imperial",
            "rating": 3.83,
            "url": "https://untappd.com/b/konix-brewery-the-burst/4060727"
        },
        {
            "title": "Russian Imperial Stout 1 Year Anniversary (barrel #Madeira)",
            "type": "Stout - Russian Imperial",
            "rating": 3.97,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-1-year-anniversary-barrel-madeira/4068083"
        },
        {
            "title": "Skyline Mosaic Crio & Galaxy & Azacca",
            "type": "IPA - New England / Hazy",
            "rating": 3.74,
            "url": "https://untappd.com/b/konix-brewery-skyline-mosaic-crio-and-galaxy-and-azacca/4227151"
        },
        {
            "title": "Russian Imperial Stout 1 Year Anniversary (barrel #Porto)",
            "type": "Stout - Russian Imperial",
            "rating": 3.9,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-1-year-anniversary-barrel-porto/4068081"
        },
        {
            "title": "Micro Secret",
            "type": "IPA - Session",
            "rating": 3.67,
            "url": "https://untappd.com/b/konix-brewery-micro-secret/3809653"
        },
        {
            "title": "Skyline Citra Cryo & Simcoe & Cashmere",
            "type": "IPA - New England / Hazy",
            "rating": 3.71,
            "url": "https://untappd.com/b/konix-brewery-skyline-citra-cryo-and-simcoe-and-cashmere/4279229"
        },
        {
            "title": "STRATASPHERE",
            "type": "IPA - Imperial / Double",
            "rating": 3.65,
            "url": "https://untappd.com/b/konix-brewery-stratasphere/4232746"
        },
        {
            "title": "Candy Oil",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 3.43,
            "url": "https://untappd.com/b/konix-brewery-candy-oil/4057685"
        },
        {
            "title": "The Mix of Taste / Gooseberry & Passion Fruit",
            "type": "Sour - Fruited",
            "rating": 3.38,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-gooseberry-and-passion-fruit/4172898"
        },
        {
            "title": "Escape",
            "type": "Stout - Milk / Sweet",
            "rating": 3.73,
            "url": "https://untappd.com/b/konix-brewery-escape/4637118"
        },
        {
            "title": "Ice Cream Porter Fruit",
            "type": "Porter - Baltic",
            "rating": 3.22,
            "url": "https://untappd.com/b/konix-brewery-ice-cream-porter-fruit/2995907"
        },
        {
            "title": "Plein Air",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.55,
            "url": "https://untappd.com/b/konix-brewery-plein-air/4365060"
        },
        {
            "title": "Wonder World Beaten Cucumber",
            "type": "Sour - Other Gose",
            "rating": 3.47,
            "url": "https://untappd.com/b/konix-brewery-wonder-world-beaten-cucumber/4467776"
        },
        {
            "title": "Old New World",
            "type": "Bock - Weizenbock",
            "rating": 3.78,
            "url": "https://untappd.com/b/konix-brewery-old-new-world/4637328"
        },
        {
            "title": "Saturn’s Rings",
            "type": "Stout - Milk / Sweet",
            "rating": 3.8,
            "url": "https://untappd.com/b/konix-brewery-saturn-s-rings/4806483"
        },
        {
            "title": "Non Alcoholic Witbier",
            "type": "Non-Alcoholic Beer - Wheat Beer",
            "rating": 3.43,
            "url": "https://untappd.com/b/konix-brewery-non-alcoholic-witbier/3751555"
        },
        {
            "title": "The Mix Of Taste / Strawberry & Lime",
            "type": "Sour - Fruited",
            "rating": 3.68,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-strawberry-and-lime/3910006"
        },
        {
            "title": "Weizen",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.56,
            "url": "https://untappd.com/b/konix-brewery-weizen/2114989"
        },
        {
            "title": "Wonder World Cucumber & Celery",
            "type": "Sour - Other Gose",
            "rating": 3.27,
            "url": "https://untappd.com/b/konix-brewery-wonder-world-cucumber-and-celery/4441142"
        },
        {
            "title": "Sweet Splash",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 3.73,
            "url": "https://untappd.com/b/konix-brewery-sweet-splash/4637321"
        },
        {
            "title": "The Mix Of Taste / Strawberry & Nectarine & Black Currant",
            "type": "Sour - Fruited",
            "rating": 3.53,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-strawberry-and-nectarine-and-black-currant/3885199"
        },
        {
            "title": "SAMPLE SET RASPBERRY & BLACK CURRANT",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.78,
            "url": "https://untappd.com/b/konix-brewery-sample-set-raspberry-and-black-currant/4355523"
        },
        {
            "title": "EXPLOSION",
            "type": "IPA - New England / Hazy",
            "rating": 3.8,
            "url": "https://untappd.com/b/konix-brewery-explosion/4806487"
        },
        {
            "title": "Switch Here",
            "type": "Hard Seltzer",
            "rating": 3.91,
            "url": "https://untappd.com/b/konix-brewery-switch-here/4595569"
        },
        {
            "title": "SAMPLE SET MANGO & GUAVA & PLUM",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.5,
            "url": "https://untappd.com/b/konix-brewery-sample-set-mango-and-guava-and-plum/4258423"
        },
        {
            "title": "Hit the Beat",
            "type": "Mead - Other",
            "rating": 3.91,
            "url": "https://untappd.com/b/konix-brewery-hit-the-beat/4595574"
        },
        {
            "title": "Bloomy Day Apricot & Passion Fruit",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.63,
            "url": "https://untappd.com/b/konix-brewery-bloomy-day-apricot-and-passion-fruit/4328494"
        },
        {
            "title": "Warrior’s Way",
            "type": "IPA - Triple",
            "rating": 3.58,
            "url": "https://untappd.com/b/konix-brewery-warrior-s-way/4806489"
        },
        {
            "title": "Philtre",
            "type": "IPA - New England / Hazy",
            "rating": 3.45,
            "url": "https://untappd.com/b/konix-brewery-philtre/4286768"
        },
        {
            "title": "Styrsudden Barrel Aged",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 3.64,
            "url": "https://untappd.com/b/konix-brewery-styrsudden-barrel-aged/4195138"
        },
        {
            "title": "Sample Set Banana & Pineapple & Mango",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.66,
            "url": "https://untappd.com/b/konix-brewery-sample-set-banana-and-pineapple-and-mango/4256767"
        },
        {
            "title": "Skyline Simcoe Cryo & Pekko & Azacca",
            "type": "IPA - New England / Hazy",
            "rating": 3.39,
            "url": "https://untappd.com/b/konix-brewery-skyline-simcoe-cryo-and-pekko-and-azacca/4330429"
        },
        {
            "title": "SAMPLE SET GUAVA & STRAWBERRY & RED CURRANT",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.56,
            "url": "https://untappd.com/b/konix-brewery-sample-set-guava-and-strawberry-and-red-currant/4290133"
        },
        {
            "title": "Russian Imperial Stout Whiskey Barrel Aged 2 Years",
            "type": "Stout - Russian Imperial",
            "rating": 4.04,
            "url": "https://untappd.com/b/konix-brewery-russian-imperial-stout-whiskey-barrel-aged-2-years/4658475"
        },
        {
            "title": "Bloomy Day Blueberry & Cherry",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.49,
            "url": "https://untappd.com/b/konix-brewery-bloomy-day-blueberry-and-cherry/4284775"
        },
        {
            "title": "Sample Set Banana & Strawberry",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.43,
            "url": "https://untappd.com/b/konix-brewery-sample-set-banana-and-strawberry/4256764"
        },
        {
            "title": "The Mix of Taste: Mango & Lime",
            "type": "Sour - Fruited",
            "rating": 3.62,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-mango-and-lime/3995651"
        },
        {
            "title": "Пиво, и точка!",
            "type": "Strong Ale - Other",
            "rating": 3.34,
            "url": "https://untappd.com/b/konix-brewery-pivo-i-tochka/5093893"
        },
        {
            "title": "#НароднаяИПА",
            "type": "IPA - American",
            "rating": 3.61,
            "url": "https://untappd.com/b/konix-brewery-narodnayaipa/4242895"
        },
        {
            "title": "The Mix of Taste / Pineapple & Strawberry & Vanilla",
            "type": "Sour - Fruited",
            "rating": 3.56,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-pineapple-and-strawberry-and-vanilla/3973978"
        },
        {
            "title": "SAMPLE SET MANGO & GUAVA & CHERRY & MAPLE SYRUP",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.49,
            "url": "https://untappd.com/b/konix-brewery-sample-set-mango-and-guava-and-cherry-and-maple-syrup/4429820"
        },
        {
            "title": "Reef Break",
            "type": "IPA - Imperial / Double",
            "rating": 3.64,
            "url": "https://untappd.com/b/konix-brewery-reef-break/4504183"
        },
        {
            "title": "SAMPLE SET MANGO & CHILI",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.79,
            "url": "https://untappd.com/b/konix-brewery-sample-set-mango-and-chili/4526722"
        },
        {
            "title": "SAMPLE SET GUAVA & ORANGE & LIME",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.74,
            "url": "https://untappd.com/b/konix-brewery-sample-set-guava-and-orange-and-lime/4318442"
        },
        {
            "title": "Labyrinth",
            "type": "IPA - Milkshake",
            "rating": 2.99,
            "url": "https://untappd.com/b/konix-brewery-labyrinth/4467775"
        },
        {
            "title": "Wonder World Peach & Passion Fruit",
            "type": "Sour - Fruited Gose",
            "rating": 3.37,
            "url": "https://untappd.com/b/konix-brewery-wonder-world-peach-and-passion-fruit/4387131"
        },
        {
            "title": "SAMPLE SET MELON & GUAVA & PINEAPPLE",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.06,
            "url": "https://untappd.com/b/konix-brewery-sample-set-melon-and-guava-and-pineapple/4353869"
        },
        {
            "title": "SAMPLE SET BLACKBERRY & BLACK CURRANT",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.81,
            "url": "https://untappd.com/b/konix-brewery-sample-set-blackberry-and-black-currant/4658468"
        },
        {
            "title": "The Mix of Taste / Pear",
            "type": "Sour - Fruited",
            "rating": 3.32,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-pear/4027697"
        },
        {
            "title": "Siren Melody",
            "type": "Sour - Fruited Gose",
            "rating": 3.9,
            "url": "https://untappd.com/b/konix-brewery-siren-melody/4929384"
        },
        {
            "title": "SAMPLE SET BANANA & PASSION FRUIT & GUAVA",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.75,
            "url": "https://untappd.com/b/konix-brewery-sample-set-banana-and-passion-fruit-and-guava/4284899"
        },
        {
            "title": "SAMPLE SET BANANA & PEAR & STRAWBERRY & VANILLA",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.97,
            "url": "https://untappd.com/b/konix-brewery-sample-set-banana-and-pear-and-strawberry-and-vanilla/4400185"
        },
        {
            "title": "Con Mucho Gusto",
            "type": "Lager - Pale",
            "rating": 3.24,
            "url": "https://untappd.com/b/konix-brewery-con-mucho-gusto/4331736"
        },
        {
            "title": "The Mix of Taste / Orange & Banana",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.79,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-orange-and-banana/4098641"
        },
        {
            "title": "Skyline Mosaic & Idaho 7 & Citra Cryo",
            "type": "IPA - New England / Hazy",
            "rating": 3.44,
            "url": "https://untappd.com/b/konix-brewery-skyline-mosaic-and-idaho-7-and-citra-cryo/4400186"
        },
        {
            "title": "Village Lyrics",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.44,
            "url": "https://untappd.com/b/konix-brewery-village-lyrics/4929381"
        },
        {
            "title": "Pineapple Express",
            "type": "IPA - New England / Hazy",
            "rating": 3.81,
            "url": "https://untappd.com/b/konix-brewery-pineapple-express/5213554"
        },
        {
            "title": "Butterfly Effect",
            "type": "Sour - Fruited",
            "rating": 3.33,
            "url": "https://untappd.com/b/konix-brewery-butterfly-effect/4467774"
        },
        {
            "title": "SAMPLE SET MANGO & PINEAPPLE",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.66,
            "url": "https://untappd.com/b/konix-brewery-sample-set-mango-and-pineapple/4279245"
        },
        {
            "title": "Hummingbird Effect",
            "type": "Sour - Fruited",
            "rating": 3.52,
            "url": "https://untappd.com/b/konix-brewery-hummingbird-effect/4513461"
        },
        {
            "title": "The Mix of Taste / Raspberry & Mango & Vanilla",
            "type": "Sour - Fruited",
            "rating": 3.71,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-raspberry-and-mango-and-vanilla/3956056"
        },
        {
            "title": "Drought City",
            "type": "Pilsner - Other",
            "rating": 3.71,
            "url": "https://untappd.com/b/konix-brewery-drought-city/4328497"
        },
        {
            "title": "Skyline Mosaic Cryo & Citra & Idaho 7",
            "type": "IPA - New England / Hazy",
            "rating": 3.75,
            "url": "https://untappd.com/b/konix-brewery-skyline-mosaic-cryo-and-citra-and-idaho-7/4692461"
        },
        {
            "title": "Deep Blur Passion Fruit",
            "type": "IPA - Sour",
            "rating": 3.6,
            "url": "https://untappd.com/b/konix-brewery-deep-blur-passion-fruit/4328496"
        },
        {
            "title": "Deep Blur Cherry & Blackberry",
            "type": "IPA - Sour",
            "rating": 3.23,
            "url": "https://untappd.com/b/konix-brewery-deep-blur-cherry-and-blackberry/4355518"
        },
        {
            "title": "The Mix of Taste / Black Currant & Strawberry & Raspberry",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.69,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-black-currant-and-strawberry-and-raspberry/4098644"
        },
        {
            "title": "Halo Effect",
            "type": "Pale Ale - Milkshake",
            "rating": 2.86,
            "url": "https://untappd.com/b/konix-brewery-halo-effect/4737214"
        },
        {
            "title": "Morning Fresh",
            "type": "Non-Alcoholic Beer - Sour",
            "rating": 3.43,
            "url": "https://untappd.com/b/konix-brewery-morning-fresh/4806488"
        },
        {
            "title": "Tropical Splash",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.04,
            "url": "https://untappd.com/b/konix-brewery-tropical-splash/5105339"
        },
        {
            "title": "Black Bear",
            "type": "Honey Beer",
            "rating": 3.29,
            "url": "https://untappd.com/b/konix-brewery-black-bear/5129092"
        },
        {
            "title": "Bloomy Day Raspberry",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.45,
            "url": "https://untappd.com/b/konix-brewery-bloomy-day-raspberry/4441140"
        },
        {
            "title": "Tornado",
            "type": "Sour - Fruited",
            "rating": 3.68,
            "url": "https://untappd.com/b/konix-brewery-tornado/5123396"
        },
        {
            "title": "The Mix of Taste Raspberry & Blueberry",
            "type": "Sour - Fruited",
            "rating": 3.41,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-raspberry-and-blueberry/4422286"
        },
        {
            "title": "Чешское Светлое",
            "type": "Lager - Pale",
            "rating": 3.46,
            "url": "https://untappd.com/b/konix-brewery-cheshskoe-svetloe/4153790"
        },
        {
            "title": "Milkshake Apricot & Orange",
            "type": "IPA - Milkshake",
            "rating": 2.94,
            "url": "https://untappd.com/b/konix-brewery-milkshake-apricot-and-orange/4931260"
        },
        {
            "title": "Matai Bay",
            "type": "IPA - New England / Hazy",
            "rating": 3.67,
            "url": "https://untappd.com/b/konix-brewery-matai-bay/5265999"
        },
        {
            "title": "Milkshake Mango & Pineapple",
            "type": "IPA - Milkshake",
            "rating": 3.28,
            "url": "https://untappd.com/b/konix-brewery-milkshake-mango-and-pineapple/5018900"
        },
        {
            "title": "Tangerine Balls",
            "type": "Sour - Fruited",
            "rating": 3.24,
            "url": "https://untappd.com/b/konix-brewery-tangerine-balls/5205133"
        },
        {
            "title": "Немецкое Светлое",
            "type": "Lager - Pale",
            "rating": null,
            "url": "https://untappd.com/b/konix-brewery-nemeckoe-svetloe/4153795"
        },
        {
            "title": "Fire of Love",
            "type": "IPA - Imperial / Double",
            "rating": null,
            "url": "https://untappd.com/b/konix-brewery-fire-of-love/5292514"
        },
        {
            "title": "The Mix of Taste Orange & Grapefruit & Rosemary",
            "type": "Sour - Fruited",
            "rating": null,
            "url": "https://untappd.com/b/konix-brewery-the-mix-of-taste-orange-and-grapefruit-and-rosemary/5305740"
        },
        {
            "title": "Kaleidoscope",
            "type": "IPA - Milkshake",
            "rating": null,
            "url": "https://untappd.com/b/konix-brewery-kaleidoscope/5323356"
        },
        {
            "title": "Attention",
            "type": "IPA - New England / Hazy",
            "rating": null,
            "url": "https://untappd.com/b/konix-brewery-attention/5323360"
        },
        {
            "title": "Молоко убежало",
            "type": "Stout - Milk / Sweet",
            "rating": null,
            "url": "https://untappd.com/b/konix-brewery-moloko-ubezhalo/5323362"
        }
    ],
    "PANZER": [
        {
            "title": "Могиканин \\ Mohican",
            "type": "IPA - New England / Hazy",
            "rating": 3.75,
            "url": "https://untappd.com/b/panzer-brewery-mogikanin-mohican/3370926"
        },
        {
            "title": "Banana Kraken",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.45,
            "url": "https://untappd.com/b/panzer-brewery-banana-kraken/738596"
        },
        {
            "title": "Мякоть (Манго, Маракуйя, Мандарин) \\ Pulp (Mango, Passionfruit, Tangerine)",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.98,
            "url": "https://untappd.com/b/panzer-brewery-myakot-mango-marakujya-mandarin-pulp-mango-passionfruit-tangerine/4030755"
        },
        {
            "title": "Black Cat",
            "type": "Stout - Milk / Sweet",
            "rating": 3.73,
            "url": "https://untappd.com/b/panzer-brewery-black-cat/1002313"
        },
        {
            "title": "Рисовый Самурай \\ Rice Samurai",
            "type": "Sour - Other Gose",
            "rating": 3.64,
            "url": "https://untappd.com/b/panzer-brewery-risovyj-samuraj-rice-samurai/2652015"
        },
        {
            "title": "Starlight",
            "type": "Pale Ale - American",
            "rating": 3.62,
            "url": "https://untappd.com/b/panzer-brewery-starlight/920813"
        },
        {
            "title": "CATCH UP!",
            "type": "Sour - Other Gose",
            "rating": 3.78,
            "url": "https://untappd.com/b/panzer-brewery-catch-up/3878434"
        },
        {
            "title": "IPA",
            "type": "IPA - American",
            "rating": 3.74,
            "url": "https://untappd.com/b/panzer-brewery-ipa/3794938"
        },
        {
            "title": "Super Mango",
            "type": "Pale Ale - Milkshake",
            "rating": 3.7,
            "url": "https://untappd.com/b/panzer-brewery-super-mango/3136115"
        },
        {
            "title": "Михаил \\ Mikhail",
            "type": "Lager - Pale",
            "rating": 3.47,
            "url": "https://untappd.com/b/panzer-brewery-mihail-mikhail/738594"
        },
        {
            "title": "Sour Flow (брусника\\клюква)",
            "type": "Sour - Fruited",
            "rating": 3.78,
            "url": "https://untappd.com/b/panzer-brewery-sour-flow-brusnika-klyukva/2067276"
        },
        {
            "title": "Nitro Charger",
            "type": "IPA - Milkshake",
            "rating": 3.76,
            "url": "https://untappd.com/b/panzer-brewery-nitro-charger/2262082"
        },
        {
            "title": "Малинуа \\ Malinois",
            "type": "Porter - Other",
            "rating": 3.83,
            "url": "https://untappd.com/b/panzer-brewery-malinua-malinois/3484783"
        },
        {
            "title": "Sour Flow (малина\\смородина)",
            "type": "Sour - Fruited",
            "rating": 3.76,
            "url": "https://untappd.com/b/panzer-brewery-sour-flow-malina-smorodina/2744278"
        },
        {
            "title": "Sour Flow (Гуава,Лемонграсс,Маракуйя)",
            "type": "Sour - Fruited",
            "rating": 3.88,
            "url": "https://untappd.com/b/panzer-brewery-sour-flow-guava-lemongrass-marakujya/3883621"
        },
        {
            "title": "Medusa",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.91,
            "url": "https://untappd.com/b/panzer-brewery-medusa/4367021"
        },
        {
            "title": "Янтарь \\ Amber",
            "type": "Mead - Melomel",
            "rating": 4.01,
            "url": "https://untappd.com/b/panzer-brewery-yantar-amber/4362446"
        },
        {
            "title": "Акварель Mosaic & Citra\\ Aquarelle Mosaic & Citra",
            "type": "IPA - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-mosaic-and-citra-aquarelle-mosaic-and-citra/2632445"
        },
        {
            "title": "Яшма \\ Jasper",
            "type": "Mead - Melomel",
            "rating": 3.9,
            "url": "https://untappd.com/b/panzer-brewery-yashma-jasper/4621173"
        },
        {
            "title": "Focus Shift",
            "type": "Sour - Fruited",
            "rating": 4.05,
            "url": "https://untappd.com/b/panzer-brewery-focus-shift/4642260"
        },
        {
            "title": "Tales of Coconut",
            "type": "Porter - Other",
            "rating": 3.96,
            "url": "https://untappd.com/b/panzer-brewery-tales-of-coconut/3574859"
        },
        {
            "title": "CALLISTA",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.91,
            "url": "https://untappd.com/b/panzer-brewery-callista/4525779"
        },
        {
            "title": "Акварель CITRA/IDAHO 7/BRU-1 Aquarelle CITRA/IDAHO 7/BRU-1",
            "type": "IPA - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-citra-idaho-7-bru-1-aquarelle-citra-idaho-7-bru-1/4557429"
        },
        {
            "title": "Акварель Simcoe & Idaho 7",
            "type": "IPA - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-simcoe-and-idaho-7/2521571"
        },
        {
            "title": "Sour Flow (Цитрус) \\ Sour Flow (Citrus)",
            "type": "Sour - Fruited",
            "rating": 3.72,
            "url": "https://untappd.com/b/panzer-brewery-sour-flow-citrus-sour-flow-citrus/3574857"
        },
        {
            "title": "Акварель Strata & Talus \\ Aquarelle Strata&Talus",
            "type": "IPA - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-strata-and-talus-aquarelle-strata-and-talus/4308388"
        },
        {
            "title": "The Suspect",
            "type": "IPA - New England / Hazy",
            "rating": 3.88,
            "url": "https://untappd.com/b/panzer-brewery-the-suspect/3370924"
        },
        {
            "title": "Sour Flow (свекла\\смородина)",
            "type": "Sour - Fruited",
            "rating": 3.81,
            "url": "https://untappd.com/b/panzer-brewery-sour-flow-svekla-smorodina/3765583"
        },
        {
            "title": "Pelengas",
            "type": "IPA - Imperial / Double",
            "rating": 3.7,
            "url": "https://untappd.com/b/panzer-brewery-pelengas/1458703"
        },
        {
            "title": "Sour Flow (персик)",
            "type": "Sour - Fruited",
            "rating": 3.77,
            "url": "https://untappd.com/b/panzer-brewery-sour-flow-persik/2932710"
        },
        {
            "title": "Акварель Nelson Sauvin & Hallertau Blanc \\ Aquarelle Nelson Sauvin & Hallertau Blanc",
            "type": "IPA - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-nelson-sauvin-and-hallertau-blanc-aquarelle-nelson-sauvin-and-hallertau-blanc/4213663"
        },
        {
            "title": "Sour Flow (Черника+Лайм) \\ Sour Flow (Черника+Lime)",
            "type": "Sour - Fruited",
            "rating": 3.76,
            "url": "https://untappd.com/b/panzer-brewery-sour-flow-chernika-lajm-sour-flow-chernika-lime/4398887"
        },
        {
            "title": "Tales of Hazelnut",
            "type": "Porter - Other",
            "rating": 3.73,
            "url": "https://untappd.com/b/panzer-brewery-tales-of-hazelnut/2469516"
        },
        {
            "title": "Maverick",
            "type": "IPA - New England / Hazy",
            "rating": 3.77,
            "url": "https://untappd.com/b/panzer-brewery-maverick/3679977"
        },
        {
            "title": "БОНДАРЬ",
            "type": "Barleywine - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/panzer-brewery-bondar/4071111"
        },
        {
            "title": "Акварель Simcoe & Mosaic",
            "type": "IPA - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-simcoe-and-mosaic/2712709"
        },
        {
            "title": "DIPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.81,
            "url": "https://untappd.com/b/panzer-brewery-dipa/3935290"
        },
        {
            "title": "Акварель Sequoia Columbus Lupomax \\ Aquarelle Sequoia Columbus Lupomax",
            "type": "IPA - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-sequoia-columbus-lupomax-aquarelle-sequoia-columbus-lupomax/4677959"
        },
        {
            "title": "Мякоть (Банан, Гуава, Малина) \\ Pulp (Banana, Guava, Raspberry)",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4,
            "url": "https://untappd.com/b/panzer-brewery-myakot-banan-guava-malina-pulp-banana-guava-raspberry/4234652"
        },
        {
            "title": "WHEAT",
            "type": "IPA - White / Wheat",
            "rating": 3.71,
            "url": "https://untappd.com/b/panzer-brewery-wheat/4484947"
        },
        {
            "title": "Северный",
            "type": "Kvass",
            "rating": 3.87,
            "url": "https://untappd.com/b/panzer-brewery-severnyj/4718424"
        },
        {
            "title": "Акварель Ekuanot & Cashmere",
            "type": "IPA - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-ekuanot-and-cashmere/3563777"
        },
        {
            "title": "Сюзьма",
            "type": "Kvass",
            "rating": 3.84,
            "url": "https://untappd.com/b/panzer-brewery-syuzma/4715613"
        },
        {
            "title": "Акварель AZACCA & CITRA Lupulin Powder Edition",
            "type": "IPA - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-azacca-and-citra-lupulin-powder-edition/4115890"
        },
        {
            "title": "Акварель Equinox & Amarillo",
            "type": "IPA - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-equinox-and-amarillo/2521570"
        },
        {
            "title": "Акварель Cashmere & Idaho 7 *Hop Oil Edition*",
            "type": "IPA - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-cashmere-and-idaho-7-hop-oil-edition/3429647"
        },
        {
            "title": "Submarine (Cucumber & Melon)",
            "type": "Sour - Fruited Gose",
            "rating": 3.77,
            "url": "https://untappd.com/b/panzer-brewery-submarine-cucumber-and-melon/3254588"
        },
        {
            "title": "Голос Океана",
            "type": "IPA - Sour",
            "rating": 3.87,
            "url": "https://untappd.com/b/panzer-brewery-golos-okeana/3436987"
        },
        {
            "title": "Акварель Callista&Mosaic\\ Aquarelle Callista&Mosaic",
            "type": "IPA - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-callista-and-mosaic-aquarelle-callista-and-mosaic/4525785"
        },
        {
            "title": "Big Banana Brother",
            "type": "Porter - Other",
            "rating": 3.74,
            "url": "https://untappd.com/b/panzer-brewery-big-banana-brother/3661261"
        },
        {
            "title": "Изумруд",
            "type": "Mead - Melomel",
            "rating": 3.92,
            "url": "https://untappd.com/b/panzer-brewery-izumrud/5095200"
        },
        {
            "title": "JUICY IPA",
            "type": "IPA - American",
            "rating": 3.65,
            "url": "https://untappd.com/b/panzer-brewery-juicy-ipa/4340502"
        },
        {
            "title": "Submarine (Pineapple And Lime)",
            "type": "Sour - Fruited Gose",
            "rating": 3.66,
            "url": "https://untappd.com/b/panzer-brewery-submarine-pineapple-and-lime/2916658"
        },
        {
            "title": "Акварель Medusa/BRU-1",
            "type": "IPA - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-medusa-bru-1/4978976"
        },
        {
            "title": "Акварель CHINOOK & NUGGET",
            "type": "IPA - American",
            "rating": 3.77,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-chinook-and-nugget/4031048"
        },
        {
            "title": "Акварель Idaho Gem & Lemondrop",
            "type": "IPA - American",
            "rating": 3.69,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-idaho-gem-and-lemondrop/3129002"
        },
        {
            "title": "Best Coast",
            "type": "IPA - Session",
            "rating": 3.79,
            "url": "https://untappd.com/b/panzer-brewery-best-coast/2145350"
        },
        {
            "title": "MURDER WEAPON",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.88,
            "url": "https://untappd.com/b/panzer-brewery-murder-weapon/3539724"
        },
        {
            "title": "Berry Tale",
            "type": "Sour - Fruited",
            "rating": 4.1,
            "url": "https://untappd.com/b/panzer-brewery-berry-tale/5051216"
        },
        {
            "title": "Акварель Zamba\\Mosaic",
            "type": "IPA - American",
            "rating": 3.81,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-zamba-mosaic/4839257"
        },
        {
            "title": "STARDUST",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.56,
            "url": "https://untappd.com/b/panzer-brewery-stardust/3935293"
        },
        {
            "title": "Акварель Galaxy & El Dorado Hop Oil Edition",
            "type": "IPA - American",
            "rating": 3.87,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-galaxy-and-el-dorado-hop-oil-edition/3548542"
        },
        {
            "title": "Voodoo Panda",
            "type": "Lager - Dark",
            "rating": 3.56,
            "url": "https://untappd.com/b/panzer-brewery-voodoo-panda/3240910"
        },
        {
            "title": "Марина",
            "type": "Belgian Dubbel",
            "rating": 3.57,
            "url": "https://untappd.com/b/panzer-brewery-marina/4157473"
        },
        {
            "title": "Акварель Kohatu & Motueka",
            "type": "IPA - New Zealand",
            "rating": 3.7,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-kohatu-and-motueka/3925426"
        },
        {
            "title": "Submarine Asia | Extra Hot",
            "type": "Sour - Other Gose",
            "rating": 4.02,
            "url": "https://untappd.com/b/panzer-brewery-submarine-asia-extra-hot/5179028"
        },
        {
            "title": "ZAPPA",
            "type": "IPA - New England / Hazy",
            "rating": 3.82,
            "url": "https://untappd.com/b/panzer-brewery-zappa/5147788"
        },
        {
            "title": "Акварель SITIVA & AMARILLO",
            "type": "IPA - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-sitiva-and-amarillo/4795252"
        },
        {
            "title": "Хельмут",
            "type": "Lager - Helles",
            "rating": 3.61,
            "url": "https://untappd.com/b/panzer-brewery-helmut/4998872"
        },
        {
            "title": "Avalanche (Траектория)",
            "type": "Lager - Dark",
            "rating": 3.67,
            "url": "https://untappd.com/b/panzer-brewery-avalanche-traektoriya/3988161"
        },
        {
            "title": "Акварель Eclipse\\Sabro",
            "type": "IPA - American",
            "rating": 3.93,
            "url": "https://untappd.com/b/panzer-brewery-akvarel-eclipse-sabro/5210827"
        },
        {
            "title": "Submarine Tropic",
            "type": "Sour - Other Gose",
            "rating": 3.88,
            "url": "https://untappd.com/b/panzer-brewery-submarine-tropic/5179031"
        },
        {
            "title": "Оникс",
            "type": "Mead - Melomel",
            "rating": 4,
            "url": "https://untappd.com/b/panzer-brewery-oniks/4993550"
        },
        {
            "title": "Minsk Beergeek",
            "type": "Lager - Pale",
            "rating": 3.68,
            "url": "https://untappd.com/b/panzer-brewery-minsk-beergeek/3743016"
        },
        {
            "title": "All Dorado",
            "type": "IPA - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/panzer-brewery-all-dorado/5288675"
        },
        {
            "title": "CSKA MOSCOW CULTURE.",
            "type": "Pilsner - Other",
            "rating": 3.89,
            "url": "https://untappd.com/b/panzer-brewery-cska-moscow-culture/4458142"
        },
        {
            "title": "LegendaS 2022",
            "type": "IPA - American",
            "rating": 4.01,
            "url": "https://untappd.com/b/panzer-brewery-legendas-2022/5158645"
        },
        {
            "title": "Oktoberfest",
            "type": "Festbier",
            "rating": 3.57,
            "url": "https://untappd.com/b/panzer-brewery-oktoberfest/5063135"
        },
        {
            "title": "Men In Black",
            "type": "Stout - Milk / Sweet",
            "rating": null,
            "url": "https://untappd.com/b/panzer-brewery-men-in-black/4911384"
        },
        {
            "title": "Сome To Me",
            "type": "IPA - American",
            "rating": null,
            "url": "https://untappd.com/b/panzer-brewery-some-to-me/5237393"
        },
        {
            "title": "Подольский",
            "type": "Kvass",
            "rating": null,
            "url": "https://untappd.com/b/panzer-brewery-podolskij/5293442"
        }
    ],
    "PLAN B": [
        {
            "title": "Ковбой Мальборо",
            "type": "IPA - American",
            "rating": 3.93,
            "url": "https://untappd.com/b/plan-b-brewery-kovboj-malboro/673144"
        },
        {
            "title": "Отличный План",
            "type": "IPA - American",
            "rating": 3.94,
            "url": "https://untappd.com/b/plan-b-brewery-otlichnyj-plan/1101931"
        },
        {
            "title": "Tropical Painkiller DIPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.87,
            "url": "https://untappd.com/b/plan-b-brewery-tropical-painkiller-dipa/1803102"
        },
        {
            "title": "Завтрак Папуаса (Breakfast Of The Papuas)",
            "type": "Stout - Milk / Sweet",
            "rating": 3.93,
            "url": "https://untappd.com/b/plan-b-brewery-zavtrak-papuasa-breakfast-of-the-papuas/2169923"
        },
        {
            "title": "Rise Of The Zombies",
            "type": "Pale Ale - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/plan-b-brewery-rise-of-the-zombies/1443184"
        },
        {
            "title": "Солнечный Ветер",
            "type": "Pale Ale - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/plan-b-brewery-solnechnyj-veter/1034461"
        },
        {
            "title": "Бэрримор",
            "type": "Stout - Oatmeal",
            "rating": 3.74,
            "url": "https://untappd.com/b/plan-b-brewery-berrimor/1018996"
        },
        {
            "title": "Cookie Monster",
            "type": "Brown Ale - Other",
            "rating": 3.72,
            "url": "https://untappd.com/b/plan-b-brewery-cookie-monster/2290551"
        },
        {
            "title": "The Lord of Bounty",
            "type": "Stout - Imperial / Double Milk",
            "rating": 4.02,
            "url": "https://untappd.com/b/plan-b-brewery-the-lord-of-bounty/2616957"
        },
        {
            "title": "Bathory",
            "type": "Red Ale - American Amber / Red",
            "rating": 3.81,
            "url": "https://untappd.com/b/plan-b-brewery-bathory/1055659"
        },
        {
            "title": "Misty Standard",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.98,
            "url": "https://untappd.com/b/plan-b-brewery-misty-standard/3945457"
        },
        {
            "title": "HI, Zee!",
            "type": "IPA - New England / Hazy",
            "rating": 4,
            "url": "https://untappd.com/b/plan-b-brewery-hi-zee/3855258"
        },
        {
            "title": "Черные Дела (Dirty Deeds)",
            "type": "Porter - Imperial / Double",
            "rating": 3.94,
            "url": "https://untappd.com/b/plan-b-brewery-chernye-dela-dirty-deeds/2017907"
        },
        {
            "title": "Hi-Z",
            "type": "IPA - New England / Hazy",
            "rating": 3.96,
            "url": "https://untappd.com/b/plan-b-brewery-hi-z/3803761"
        },
        {
            "title": "Parhelion",
            "type": "IPA - Imperial / Double",
            "rating": 3.94,
            "url": "https://untappd.com/b/plan-b-brewery-parhelion/4299316"
        },
        {
            "title": "Ultimate Juicenator",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4.08,
            "url": "https://untappd.com/b/plan-b-brewery-ultimate-juicenator/4099678"
        },
        {
            "title": "Juicenator",
            "type": "IPA - New England / Hazy",
            "rating": 3.98,
            "url": "https://untappd.com/b/plan-b-brewery-juicenator/3813426"
        },
        {
            "title": "Emanation",
            "type": "IPA - New England / Hazy",
            "rating": 4.01,
            "url": "https://untappd.com/b/plan-b-brewery-emanation/4396676"
        },
        {
            "title": "Marduk",
            "type": "Barleywine - Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/plan-b-brewery-marduk/3656629"
        },
        {
            "title": "Amber Tart",
            "type": "Sour - Fruited",
            "rating": 4.04,
            "url": "https://untappd.com/b/plan-b-brewery-amber-tart/3839381"
        },
        {
            "title": "Foggy Ten Realms",
            "type": "IPA - New England / Hazy",
            "rating": 3.97,
            "url": "https://untappd.com/b/plan-b-brewery-foggy-ten-realms/3918265"
        },
        {
            "title": "Saturday Sour",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.69,
            "url": "https://untappd.com/b/plan-b-brewery-saturday-sour/2678430"
        },
        {
            "title": "Double Juicenator",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.98,
            "url": "https://untappd.com/b/plan-b-brewery-double-juicenator/3873039"
        },
        {
            "title": "Ultra Juicenator. Strata",
            "type": "IPA - New England / Hazy",
            "rating": 3.99,
            "url": "https://untappd.com/b/plan-b-brewery-ultra-juicenator-strata/4212790"
        },
        {
            "title": "Disintegrator",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 3.96,
            "url": "https://untappd.com/b/plan-b-brewery-disintegrator/3091562"
        },
        {
            "title": "Iron Abyss",
            "type": "Stout - Russian Imperial",
            "rating": 4.02,
            "url": "https://untappd.com/b/plan-b-brewery-iron-abyss/4155454"
        },
        {
            "title": "Patchwork",
            "type": "IPA - New England / Hazy",
            "rating": 3.96,
            "url": "https://untappd.com/b/plan-b-brewery-patchwork/4225724"
        },
        {
            "title": "Магический реализм",
            "type": "IPA - American",
            "rating": 3.89,
            "url": "https://untappd.com/b/plan-b-brewery-magicheskij-realizm/2852161"
        },
        {
            "title": "Rorschach",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 4,
            "url": "https://untappd.com/b/plan-b-brewery-rorschach/4504198"
        },
        {
            "title": "Total Sabro",
            "type": "IPA - New England / Hazy",
            "rating": 3.97,
            "url": "https://untappd.com/b/plan-b-brewery-total-sabro/4518175"
        },
        {
            "title": "Mount Elimbari",
            "type": "Brown Ale - Imperial / Double",
            "rating": 3.87,
            "url": "https://untappd.com/b/plan-b-brewery-mount-elimbari/2853450"
        },
        {
            "title": "Pale Tart",
            "type": "Sour - Fruited",
            "rating": 3.93,
            "url": "https://untappd.com/b/plan-b-brewery-pale-tart/3984388"
        },
        {
            "title": "Black Metal Matters",
            "type": "Stout - Imperial / Double Milk",
            "rating": 4,
            "url": "https://untappd.com/b/plan-b-brewery-black-metal-matters/3895608"
        },
        {
            "title": "T and U (San Tome Cocoa Beans)",
            "type": "Stout - Russian Imperial",
            "rating": 3.97,
            "url": "https://untappd.com/b/plan-b-brewery-t-and-u-san-tome-cocoa-beans/2355468"
        },
        {
            "title": "Come On Baby, Light My Fire",
            "type": "Stout - Russian Imperial",
            "rating": 3.98,
            "url": "https://untappd.com/b/plan-b-brewery-come-on-baby-light-my-fire/1791549"
        },
        {
            "title": "Hop-n-Roll Rye IPA",
            "type": "IPA - Rye",
            "rating": 3.86,
            "url": "https://untappd.com/b/plan-b-brewery-hop-n-roll-rye-ipa/881744"
        },
        {
            "title": "Let It Flow",
            "type": "IPA - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/plan-b-brewery-let-it-flow/2617755"
        },
        {
            "title": "Satan Infernalis",
            "type": "Stout - Russian Imperial",
            "rating": 4.13,
            "url": "https://untappd.com/b/plan-b-brewery-satan-infernalis/1041639"
        },
        {
            "title": "Psycho Healer",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.97,
            "url": "https://untappd.com/b/plan-b-brewery-psycho-healer/4188952"
        },
        {
            "title": "Satan Infernalis. Second Coming. BBA Version",
            "type": "Stout - Russian Imperial",
            "rating": 4.14,
            "url": "https://untappd.com/b/plan-b-brewery-satan-infernalis-second-coming-bba-version/3626375"
        },
        {
            "title": "Operation Snowflakes",
            "type": "IPA - New England / Hazy",
            "rating": 3.99,
            "url": "https://untappd.com/b/plan-b-brewery-operation-snowflakes/4299317"
        },
        {
            "title": "Parallax (Simcoe и Mosaic)",
            "type": "IPA - Imperial / Double",
            "rating": 3.81,
            "url": "https://untappd.com/b/plan-b-brewery-parallax-simcoe-i-mosaic/2551562"
        },
        {
            "title": "#500 Whisky BA (Chivas Regal)",
            "type": "Stout - Russian Imperial",
            "rating": 4.24,
            "url": "https://untappd.com/b/plan-b-brewery-500-whisky-ba-chivas-regal/4717352"
        },
        {
            "title": "#100",
            "type": "Stout - Russian Imperial",
            "rating": 3.98,
            "url": "https://untappd.com/b/plan-b-brewery-no-100/2921616"
        },
        {
            "title": "Total Citra",
            "type": "IPA - New England / Hazy",
            "rating": 3.94,
            "url": "https://untappd.com/b/plan-b-brewery-total-citra/4590013"
        },
        {
            "title": "Generation Y",
            "type": "IPA - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/plan-b-brewery-generation-y/2931014"
        },
        {
            "title": "#300",
            "type": "Stout - Russian Imperial",
            "rating": 4.07,
            "url": "https://untappd.com/b/plan-b-brewery-300/4027893"
        },
        {
            "title": "Murquell Pilsner",
            "type": "Pilsner - Czech / Bohemian",
            "rating": 3.9,
            "url": "https://untappd.com/b/plan-b-brewery-murquell-pilsner/4993618"
        },
        {
            "title": "Foggy Future",
            "type": "IPA - New England / Hazy",
            "rating": 3.96,
            "url": "https://untappd.com/b/plan-b-brewery-foggy-future/3731885"
        },
        {
            "title": "Psychedelic Cocktail (Mango/El Dorado)",
            "type": "IPA - Milkshake",
            "rating": 3.75,
            "url": "https://untappd.com/b/plan-b-brewery-psychedelic-cocktail-mango-el-dorado/3417594"
        },
        {
            "title": "Batyushka WBA",
            "type": "Stout - Russian Imperial",
            "rating": 4.08,
            "url": "https://untappd.com/b/plan-b-brewery-batyushka-wba/4567790"
        },
        {
            "title": "Playground Twist",
            "type": "Pale Ale - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/plan-b-brewery-playground-twist/4948844"
        },
        {
            "title": "Massive Old Hat Ale",
            "type": "Old Ale",
            "rating": 3.91,
            "url": "https://untappd.com/b/plan-b-brewery-massive-old-hat-ale/3428139"
        },
        {
            "title": "Satan Infernalis III",
            "type": "Stout - Russian Imperial",
            "rating": 4.25,
            "url": "https://untappd.com/b/plan-b-brewery-satan-infernalis-iii/4629876"
        },
        {
            "title": "Acid Tracks",
            "type": "Sour - Fruited",
            "rating": 3.82,
            "url": "https://untappd.com/b/plan-b-brewery-acid-tracks/3332809"
        },
        {
            "title": "More Yellow Than Amber Tart",
            "type": "Sour - Fruited",
            "rating": 3.88,
            "url": "https://untappd.com/b/plan-b-brewery-more-yellow-than-amber-tart/3895606"
        },
        {
            "title": "Change of Pace",
            "type": "IPA - American",
            "rating": 3.9,
            "url": "https://untappd.com/b/plan-b-brewery-change-of-pace/3407793"
        },
        {
            "title": "Rose Tart",
            "type": "Sour - Fruited",
            "rating": 3.86,
            "url": "https://untappd.com/b/plan-b-brewery-rose-tart/3918274"
        },
        {
            "title": "Ересь",
            "type": "Strong Ale - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/plan-b-brewery-eres/4920845"
        },
        {
            "title": "Road To Asa Bay",
            "type": "IPA - Red",
            "rating": 3.8,
            "url": "https://untappd.com/b/plan-b-brewery-road-to-asa-bay/2348322"
        },
        {
            "title": "Флоренс",
            "type": "Porter - Other",
            "rating": 3.83,
            "url": "https://untappd.com/b/plan-b-brewery-florens/2281682"
        },
        {
            "title": "Hammerheart",
            "type": "Strong Ale - American",
            "rating": 3.97,
            "url": "https://untappd.com/b/plan-b-brewery-hammerheart/4653644"
        },
        {
            "title": "Blackberry Jam Stout",
            "type": "Stout - Other",
            "rating": 3.88,
            "url": "https://untappd.com/b/plan-b-brewery-blackberry-jam-stout/3731886"
        },
        {
            "title": "Во Мгле",
            "type": "Stout - Russian Imperial",
            "rating": 3.96,
            "url": "https://untappd.com/b/plan-b-brewery-vo-mgle/2616959"
        },
        {
            "title": "Greater Art",
            "type": "IPA - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/plan-b-brewery-greater-art/1354335"
        },
        {
            "title": "Ultra Juicenator. Sabro",
            "type": "IPA - New England / Hazy",
            "rating": 3.98,
            "url": "https://untappd.com/b/plan-b-brewery-ultra-juicenator-sabro/3987532"
        },
        {
            "title": "Come On Baby Light My Fire (Ancho/Pasilla)",
            "type": "Stout - Russian Imperial",
            "rating": 3.94,
            "url": "https://untappd.com/b/plan-b-brewery-come-on-baby-light-my-fire-ancho-pasilla/3450814"
        },
        {
            "title": "Malleus Maleficārum",
            "type": "IPA - Triple",
            "rating": 3.73,
            "url": "https://untappd.com/b/plan-b-brewery-malleus-maleficarum/3629880"
        },
        {
            "title": "2 Out Side DIPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.78,
            "url": "https://untappd.com/b/plan-b-brewery-2-out-side-dipa/1319129"
        },
        {
            "title": "Marduk Whisky BA (Chivas Regal)",
            "type": "Barleywine - Other",
            "rating": 4.06,
            "url": "https://untappd.com/b/plan-b-brewery-marduk-whisky-ba-chivas-regal/4455617"
        },
        {
            "title": "Bifurcation",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.91,
            "url": "https://untappd.com/b/plan-b-brewery-bifurcation/4628509"
        },
        {
            "title": "Strange Juicenator",
            "type": "IPA - New England / Hazy",
            "rating": 3.88,
            "url": "https://untappd.com/b/plan-b-brewery-strange-juicenator/3895601"
        },
        {
            "title": "Spectral",
            "type": "IPA - New England / Hazy",
            "rating": 3.96,
            "url": "https://untappd.com/b/plan-b-brewery-spectral/4172900"
        },
        {
            "title": "Ultra Juicenator HBC630",
            "type": "IPA - New England / Hazy",
            "rating": 3.93,
            "url": "https://untappd.com/b/plan-b-brewery-ultra-juicenator-hbc630/4590012"
        },
        {
            "title": "Вероника решает умереть. Coffee Version (Veronika decides to die. Coffee Version)",
            "type": "Stout - Russian Imperial",
            "rating": 4.05,
            "url": "https://untappd.com/b/plan-b-brewery-veronika-reshaet-umeret-coffee-version-veronika-decides-to-die-coffee-version/1741391"
        },
        {
            "title": "Hops Signature Zamba",
            "type": "IPA - New England / Hazy",
            "rating": 3.7,
            "url": "https://untappd.com/b/plan-b-brewery-hops-signature-zamba/4629873"
        },
        {
            "title": "Ultra Juicenator. El Dorado",
            "type": "IPA - New England / Hazy",
            "rating": 3.5,
            "url": "https://untappd.com/b/plan-b-brewery-ultra-juicenator-el-dorado/3918269"
        },
        {
            "title": "Tiamat",
            "type": "Stout - Russian Imperial",
            "rating": 3.76,
            "url": "https://untappd.com/b/plan-b-brewery-tiamat/3656630"
        },
        {
            "title": "Gentle Giant",
            "type": "Stout - Other",
            "rating": 3.7,
            "url": "https://untappd.com/b/plan-b-brewery-gentle-gaint/3661263"
        },
        {
            "title": "T And U (New Guinea Version)",
            "type": "Stout - Russian Imperial",
            "rating": 4,
            "url": "https://untappd.com/b/plan-b-brewery-t-and-u-new-guinea-version/3528808"
        },
        {
            "title": "Melomel Black Currant / Raspberry",
            "type": "Mead - Melomel",
            "rating": 4.08,
            "url": "https://untappd.com/b/plan-b-brewery-melomel-black-currant-raspberry/4150211"
        },
        {
            "title": "Hops Signature Sitiva",
            "type": "IPA - New England / Hazy",
            "rating": 3.88,
            "url": "https://untappd.com/b/plan-b-brewery-hops-signature-sitiva/4629874"
        },
        {
            "title": "Generation Z",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/plan-b-brewery-generation-z/3145603"
        },
        {
            "title": "Ultra Juicenator. Talus",
            "type": "IPA - New England / Hazy",
            "rating": 3.93,
            "url": "https://untappd.com/b/plan-b-brewery-ultra-juicenator-talus/4328448"
        },
        {
            "title": "Satan Infernalis Bourbon Barrel Aged",
            "type": "Stout - Russian Imperial",
            "rating": 4.25,
            "url": "https://untappd.com/b/plan-b-brewery-satan-infernalis-bourbon-barrel-aged/3038217"
        },
        {
            "title": "Ultra Juicenator. BRU-1",
            "type": "IPA - New England / Hazy",
            "rating": 3.95,
            "url": "https://untappd.com/b/plan-b-brewery-ultra-juicenator-bru-1/4418748"
        },
        {
            "title": "Come On Baby Light My Fire (Ancho/Pasilla) Whisky BA",
            "type": "Stout - Russian Imperial",
            "rating": 4.14,
            "url": "https://untappd.com/b/plan-b-brewery-come-on-baby-light-my-fire-ancho-pasilla-whisky-ba/3661267"
        },
        {
            "title": "Illuminate",
            "type": "IPA - Triple",
            "rating": 3.78,
            "url": "https://untappd.com/b/plan-b-brewery-illuminate/3262742"
        },
        {
            "title": "Sophistication",
            "type": "IPA - New England / Hazy",
            "rating": 3.93,
            "url": "https://untappd.com/b/plan-b-brewery-sophistication/4455666"
        },
        {
            "title": "Psychodelic Cocktail",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/plan-b-brewery-psychodelic-cocktail/2616953"
        },
        {
            "title": "Isolation Pale Ale",
            "type": "IPA - American",
            "rating": 3.81,
            "url": "https://untappd.com/b/plan-b-brewery-isolation-pale-ale/3765101"
        },
        {
            "title": "Old Mornings Dawn",
            "type": "Stout - Russian Imperial",
            "rating": 3.81,
            "url": "https://untappd.com/b/plan-b-brewery-old-mornings-dawn/3450818"
        },
        {
            "title": "Yellow Tart",
            "type": "Sour - Fruited",
            "rating": 3.81,
            "url": "https://untappd.com/b/plan-b-brewery-yellow-tart/3813427"
        },
        {
            "title": "Total Mosaic",
            "type": "IPA - New England / Hazy",
            "rating": 3.78,
            "url": "https://untappd.com/b/plan-b-brewery-total-mosaic/4488054"
        },
        {
            "title": "Obertura",
            "type": "Sour - Fruited",
            "rating": 3.96,
            "url": "https://untappd.com/b/plan-b-brewery-obertura/4253433"
        },
        {
            "title": "Parallax (Galaxy & Mosaic)",
            "type": "IPA - Imperial / Double",
            "rating": 3.76,
            "url": "https://untappd.com/b/plan-b-brewery-parallax-galaxy-i-mosaic/3145602"
        },
        {
            "title": "Mystic Circle",
            "type": "IPA - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/plan-b-brewery-mystic-circle/2921607"
        },
        {
            "title": "Fresh Fruits Not For Rotting Vegetables",
            "type": "Sour - Fruited Gose",
            "rating": 3.78,
            "url": "https://untappd.com/b/plan-b-brewery-fresh-fruits-not-for-rotting-vegetables/3450913"
        },
        {
            "title": "Generation X",
            "type": "IPA - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/plan-b-brewery-generation-x/2853449"
        },
        {
            "title": "Parallax (Vic Secret и Mosaic)",
            "type": "IPA - Imperial / Double",
            "rating": 3.92,
            "url": "https://untappd.com/b/plan-b-brewery-parallax-vic-secret-i-mosaic/3099313"
        },
        {
            "title": "Переменная Облачность",
            "type": "Pale Ale - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/plan-b-brewery-peremennaya-oblachnost/2209956"
        },
        {
            "title": "The Loud Music of the Sky",
            "type": "IPA - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/plan-b-brewery-the-loud-music-of-the-sky/3626370"
        },
        {
            "title": "Purple Tart",
            "type": "Sour - Fruited",
            "rating": 3.65,
            "url": "https://untappd.com/b/plan-b-brewery-purple-tart/3873040"
        },
        {
            "title": "Belgian Fleur",
            "type": "Belgian Strong Dark Ale",
            "rating": 3.89,
            "url": "https://untappd.com/b/plan-b-brewery-belgian-fleur/1664396"
        },
        {
            "title": "Parallax (Centennial и Mosaic)",
            "type": "IPA - Imperial / Double",
            "rating": 3.87,
            "url": "https://untappd.com/b/plan-b-brewery-parallax-centennial-i-mosaic/2585045"
        },
        {
            "title": "Perforator IPA",
            "type": "IPA - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/plan-b-brewery-perforator-ipa/3520512"
        },
        {
            "title": "Ephemera",
            "type": "IPA - New England / Hazy",
            "rating": 3.74,
            "url": "https://untappd.com/b/plan-b-brewery-ephemera/4927433"
        },
        {
            "title": "Ruby Tart",
            "type": "Sour - Fruited",
            "rating": 3.84,
            "url": "https://untappd.com/b/plan-b-brewery-ruby-tart/3974002"
        },
        {
            "title": "Ultra Juicenator Eclipse",
            "type": "IPA - New England / Hazy",
            "rating": 3.9,
            "url": "https://untappd.com/b/plan-b-brewery-ultra-juicenator-eclipse/5158778"
        },
        {
            "title": "T And U (Dominicana Cocoa And Madagascar Vanilla) WBA Brett Edition",
            "type": "Stout - Russian Imperial",
            "rating": 4.06,
            "url": "https://untappd.com/b/plan-b-brewery-t-and-u-dominicana-cocoa-and-madagascar-vanilla-wba-brett-edition/3639865"
        },
        {
            "title": "Iron Abyss WBA",
            "type": "Stout - Russian Imperial",
            "rating": 4,
            "url": "https://untappd.com/b/plan-b-brewery-iron-abyss-wba/5140092"
        },
        {
            "title": "T and U (Dominicana Cocoa Neabs and Madagascar Vanilla Beans)",
            "type": "Stout - Russian Imperial",
            "rating": 4.11,
            "url": "https://untappd.com/b/plan-b-brewery-t-and-u-dominicana-cocoa-neabs-and-madagascar-vanilla-beans/2949754"
        },
        {
            "title": "Art Nouveau Black Currant Gose",
            "type": "Sour - Fruited Gose",
            "rating": 3.65,
            "url": "https://untappd.com/b/plan-b-brewery-art-nouveau-black-currant-gose/2808301"
        },
        {
            "title": "Gradient (Melon + Apricot + Peach)",
            "type": "Sour - Fruited",
            "rating": 3.56,
            "url": "https://untappd.com/b/plan-b-brewery-gradient-melon-apricot-peach/3626369"
        },
        {
            "title": "Spicy Space",
            "type": "Porter - Other",
            "rating": 3.84,
            "url": "https://untappd.com/b/plan-b-brewery-spicy-space/2729700"
        },
        {
            "title": "Pulp-fusion. Guava, Passion Fruit, Banana",
            "type": "Sour - Fruited",
            "rating": 3.89,
            "url": "https://untappd.com/b/plan-b-brewery-pulp-fusion-guava-passion-fruit-banana/4328445"
        },
        {
            "title": "Satan Infernalis IV",
            "type": "Stout - Russian Imperial",
            "rating": 4.4,
            "url": "https://untappd.com/b/plan-b-brewery-satan-infernalis-iv/5140088"
        },
        {
            "title": "Longhorn",
            "type": "Stout - Milk / Sweet",
            "rating": 3.76,
            "url": "https://untappd.com/b/plan-b-brewery-longhorn/1975825"
        },
        {
            "title": "Wizard Gizzard",
            "type": "IPA - New England / Hazy",
            "rating": 3.8,
            "url": "https://untappd.com/b/plan-b-brewery-wizard-gizzard/2639826"
        },
        {
            "title": "Hop Voltage",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/plan-b-brewery-hop-voltage/3695226"
        },
        {
            "title": "Wheeler Dealer",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.82,
            "url": "https://untappd.com/b/plan-b-brewery-wheeler-dealer/2653289"
        },
        {
            "title": "Old Hat Ale",
            "type": "Old Ale",
            "rating": 3.73,
            "url": "https://untappd.com/b/plan-b-brewery-old-hat-ale/2417160"
        },
        {
            "title": "Art Nouveau Sea Buckthorn",
            "type": "Sour - Fruited Gose",
            "rating": 3.69,
            "url": "https://untappd.com/b/plan-b-brewery-art-nouveau-sea-buckthorn/3262744"
        },
        {
            "title": "Путь к Энтропии через Концентрацию",
            "type": "Stout - Russian Imperial",
            "rating": 4.04,
            "url": "https://untappd.com/b/plan-b-brewery-put-k-entropii-cherez-koncentraciyu/1594498"
        },
        {
            "title": "Parallax (Idaho 7 & Mosaic)",
            "type": "IPA - Imperial / Double",
            "rating": 3.89,
            "url": "https://untappd.com/b/plan-b-brewery-parallax-idaho-7/3661265"
        },
        {
            "title": "Сок из мишек Гамми. Zummi",
            "type": "IPA - American",
            "rating": 3.77,
            "url": "https://untappd.com/b/plan-b-brewery-sok-iz-mishek-gammi-zummi/2309466"
        },
        {
            "title": "Bee's Knees",
            "type": "IPA - New England / Hazy",
            "rating": 3.84,
            "url": "https://untappd.com/b/plan-b-brewery-bee-s-knees/2666991"
        },
        {
            "title": "Pulp-fusion. Raspberry, Mango, Banana (R/M/B)",
            "type": "Sour - Fruited",
            "rating": 3.66,
            "url": "https://untappd.com/b/plan-b-brewery-pulp-fusion-raspberry-mango-banana-r-m-b/4376764"
        },
        {
            "title": "Heisenberg Gose",
            "type": "Sour - Traditional Gose",
            "rating": 3.83,
            "url": "https://untappd.com/b/plan-b-brewery-heisenberg-gose/1450532"
        },
        {
            "title": "Coral Tart",
            "type": "Sour - Fruited",
            "rating": 3.54,
            "url": "https://untappd.com/b/plan-b-brewery-coral-tart/4265787"
        },
        {
            "title": "Parallax (El Dorado и Mosaic)",
            "type": "IPA - Imperial / Double",
            "rating": 3.83,
            "url": "https://untappd.com/b/plan-b-brewery-parallax-el-dorado-i-mosaic/2921611"
        },
        {
            "title": "Theobroma",
            "type": "Brown Ale - Imperial / Double",
            "rating": 4.01,
            "url": "https://untappd.com/b/plan-b-brewery-theobroma/1909790"
        },
        {
            "title": "Сара Браун",
            "type": "Sour - Flanders Oud Bruin",
            "rating": 3.62,
            "url": "https://untappd.com/b/plan-b-brewery-sara-braun/1338088"
        },
        {
            "title": "Gem Session",
            "type": "IPA - American",
            "rating": 3.73,
            "url": "https://untappd.com/b/plan-b-brewery-gem-session/3136859"
        },
        {
            "title": "Siberian Light",
            "type": "Stout - Russian Imperial",
            "rating": 4.08,
            "url": "https://untappd.com/b/plan-b-brewery-siberian-light/1319173"
        },
        {
            "title": "Gingerbread Stout",
            "type": "Stout - Other",
            "rating": 3.72,
            "url": "https://untappd.com/b/plan-b-brewery-gingerbread-stout/3167366"
        },
        {
            "title": "Acid Tracks. Black Currant/Cherry/Raspberry",
            "type": "Sour - Fruited",
            "rating": 3.84,
            "url": "https://untappd.com/b/plan-b-brewery-acid-tracks-black-currant-cherry-raspberry/3695229"
        },
        {
            "title": "Psychedelic Cocktail (Melon/Strawberry)",
            "type": "IPA - Milkshake",
            "rating": 3.83,
            "url": "https://untappd.com/b/plan-b-brewery-psychedelic-cocktail-melon-strawberry/3835933"
        },
        {
            "title": "Medusa IPA",
            "type": "IPA - American",
            "rating": 3.7,
            "url": "https://untappd.com/b/plan-b-brewery-medusa-ipa/2428043"
        },
        {
            "title": "Hercules Oatmeal IPA",
            "type": "IPA - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/plan-b-brewery-hercules-oatmeal-ipa/1322255"
        },
        {
            "title": "T and U (San Tome Cocoa Beans) Barrel Aged Scotch Whisky",
            "type": "Stout - Russian Imperial",
            "rating": 4.08,
            "url": "https://untappd.com/b/plan-b-brewery-t-and-u-san-tome-cocoa-beans-barrel-aged-scotch-whisky/2962067"
        },
        {
            "title": "Choco Monster",
            "type": "Brown Ale - Imperial / Double",
            "rating": 3.69,
            "url": "https://untappd.com/b/plan-b-brewery-choco-monster/2436790"
        },
        {
            "title": "Вероника решает умереть",
            "type": "Stout - Russian Imperial",
            "rating": 4.08,
            "url": "https://untappd.com/b/plan-b-brewery-veronika-reshaet-umeret/1674520"
        },
        {
            "title": "Parallax (Citra и Mosaic)",
            "type": "IPA - Imperial / Double",
            "rating": 3.61,
            "url": "https://untappd.com/b/plan-b-brewery-parallax-citra-i-mosaic/2639825"
        },
        {
            "title": "Ave Ursus",
            "type": "Brown Ale - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/plan-b-brewery-ave-ursus/1343196"
        },
        {
            "title": "Quasi Una Fantasia",
            "type": "IPA - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/plan-b-brewery-quasi-una-fantasia/2268488"
        },
        {
            "title": "Cocoa In the Jar",
            "type": "Stout - Milk / Sweet",
            "rating": 3.53,
            "url": "https://untappd.com/b/plan-b-brewery-cocoa-in-the-jar/2994587"
        },
        {
            "title": "#500",
            "type": "Stout - Russian Imperial",
            "rating": 4.03,
            "url": "https://untappd.com/b/plan-b-brewery-500/4658507"
        },
        {
            "title": "Barbaric Stout",
            "type": "Stout - Foreign / Export",
            "rating": 3.71,
            "url": "https://untappd.com/b/plan-b-brewery-barbaric-stout/2428045"
        },
        {
            "title": "Черные Дела (Brett Edition)",
            "type": "Porter - Imperial / Double",
            "rating": 4.05,
            "url": "https://untappd.com/b/plan-b-brewery-chernye-dela-brett-edition/3701655"
        },
        {
            "title": "Columbus Centennial IPA",
            "type": "IPA - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/plan-b-brewery-columbus-centennial-ipa/1086252"
        },
        {
            "title": "Гарпун",
            "type": "Brown Ale - American",
            "rating": 3.74,
            "url": "https://untappd.com/b/plan-b-brewery-garpun/1231454"
        },
        {
            "title": "Seek & Destroy IPA",
            "type": "IPA - American",
            "rating": 3.81,
            "url": "https://untappd.com/b/plan-b-brewery-seek-and-destroy-ipa/1354337"
        },
        {
            "title": "Somewhere Far Beyond",
            "type": "IPA - New England / Hazy",
            "rating": 3.89,
            "url": "https://untappd.com/b/plan-b-brewery-somewhere-far-beyond/2503432"
        },
        {
            "title": "План на Выходной",
            "type": "IPA - New England / Hazy",
            "rating": 3.66,
            "url": "https://untappd.com/b/plan-b-brewery-plan-na-vyhodnoj/4891043"
        },
        {
            "title": "Change of Scenery",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/plan-b-brewery-change-of-scenery/4961836"
        },
        {
            "title": "Waiting for the Sun",
            "type": "Pale Ale - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/plan-b-brewery-waiting-for-the-sun/2356427"
        },
        {
            "title": "Azacca",
            "type": "IPA - American",
            "rating": 3.69,
            "url": "https://untappd.com/b/plan-b-brewery-azacca/1018838"
        },
        {
            "title": "West Coast Volga",
            "type": "IPA - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/plan-b-brewery-west-coast-volga/1039481"
        },
        {
            "title": "Empyrium",
            "type": "Porter - Imperial / Double",
            "rating": 3.83,
            "url": "https://untappd.com/b/plan-b-brewery-empyrium/1362939"
        },
        {
            "title": "Siberian Heavy",
            "type": "Stout - Russian Imperial",
            "rating": 4.04,
            "url": "https://untappd.com/b/plan-b-brewery-siberian-heavy/1424045"
        },
        {
            "title": "Psychedelic Cocktail (peach/Amarillo)",
            "type": "IPA - Milkshake",
            "rating": 3.69,
            "url": "https://untappd.com/b/plan-b-brewery-psychedelic-cocktail-peach-amarillo/2808302"
        },
        {
            "title": "Palisade",
            "type": "IPA - American",
            "rating": 3.54,
            "url": "https://untappd.com/b/plan-b-brewery-palisade/992293"
        },
        {
            "title": "НЕ Малевич New England IPA",
            "type": "IPA - American",
            "rating": 3.66,
            "url": "https://untappd.com/b/plan-b-brewery-ne-malevich-new-england-ipa/1973642"
        },
        {
            "title": "Сок из мишек Гамми. Gruffi",
            "type": "IPA - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/plan-b-brewery-sok-iz-mishek-gammi-gruffi/2348320"
        },
        {
            "title": "Новый План на Выходной",
            "type": "IPA - Other",
            "rating": 3.8,
            "url": "https://untappd.com/b/plan-b-brewery-novyj-plan-na-vyhodnoj/5022204"
        },
        {
            "title": "Местами Осадки",
            "type": "Wheat Beer - American Pale Wheat",
            "rating": 3.67,
            "url": "https://untappd.com/b/plan-b-brewery-mestami-osadki/2209957"
        },
        {
            "title": "Второе Дыхание",
            "type": "Pale Ale - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/plan-b-brewery-vtoroe-dyhanie/2729698"
        },
        {
            "title": "Во Мгле Whisky Barrel Aged",
            "type": "Stout - Russian Imperial",
            "rating": 3.94,
            "url": "https://untappd.com/b/plan-b-brewery-vo-mgle-whisky-barrel-aged/3336479"
        },
        {
            "title": "Without Claims (Без Претензий)",
            "type": "IPA - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/plan-b-brewery-without-claims-bez-pretenzij/860507"
        },
        {
            "title": "Wine Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.75,
            "url": "https://untappd.com/b/plan-b-brewery-wine-saison/1863576"
        },
        {
            "title": "Pacific IPA",
            "type": "IPA - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/plan-b-brewery-pacific-ipa/1404299"
        },
        {
            "title": "Pulp-fusion. B/B/M (Blueberry, Banana, Mango)",
            "type": "Sour - Fruited",
            "rating": 3.45,
            "url": "https://untappd.com/b/plan-b-brewery-pulp-fusion-b-b-m-blueberry-banana-mango/4463719"
        },
        {
            "title": "Symphony Of Destruction",
            "type": "Strong Ale - American",
            "rating": 3.74,
            "url": "https://untappd.com/b/plan-b-brewery-symphony-of-destruction/1501431"
        },
        {
            "title": "Batyushka",
            "type": "Stout - Russian Imperial",
            "rating": 4.05,
            "url": "https://untappd.com/b/plan-b-brewery-batyushka/4707240"
        },
        {
            "title": "What the Funk?",
            "type": "Belgian Tripel",
            "rating": 3.86,
            "url": "https://untappd.com/b/plan-b-brewery-what-the-funk/1875358"
        },
        {
            "title": "Hop Fiction",
            "type": "Pale Ale - American",
            "rating": 3.72,
            "url": "https://untappd.com/b/plan-b-brewery-hop-fiction/1240860"
        },
        {
            "title": "Русский Неимперский Стаут",
            "type": "Stout - Russian Imperial",
            "rating": 4.04,
            "url": "https://untappd.com/b/plan-b-brewery-russkij-neimperskij-staut/981967"
        },
        {
            "title": "Equinox",
            "type": "IPA - American",
            "rating": 3.87,
            "url": "https://untappd.com/b/plan-b-brewery-equinox/1027469"
        },
        {
            "title": "Дельтаплан",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.76,
            "url": "https://untappd.com/b/plan-b-brewery-deltaplan/1186396"
        },
        {
            "title": "Ярославский Отморозок",
            "type": "Freeze-Distilled Beer",
            "rating": 3.96,
            "url": "https://untappd.com/b/plan-b-brewery-yaroslavskij-otmorozok/5099488"
        },
        {
            "title": "Indian Summer",
            "type": "Pale Ale - American",
            "rating": 4.05,
            "url": "https://untappd.com/b/plan-b-brewery-indian-summer/838399"
        },
        {
            "title": "Toon Army",
            "type": "IPA - Black / Cascadian Dark Ale",
            "rating": 3.82,
            "url": "https://untappd.com/b/plan-b-brewery-toon-army/1240028"
        },
        {
            "title": "У Шамана Три Руки. Creme Brulee Version",
            "type": "Stout - Russian Imperial",
            "rating": 3.95,
            "url": "https://untappd.com/b/plan-b-brewery-u-shamana-tri-ruki-creme-brulee-version/2050649"
        },
        {
            "title": "Stardust",
            "type": "Pale Ale - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/plan-b-brewery-stardust/1474730"
        },
        {
            "title": "К Последнему Морю",
            "type": "Pale Ale - American",
            "rating": 4.08,
            "url": "https://untappd.com/b/plan-b-brewery-k-poslednemu-moryu/4846745"
        },
        {
            "title": "Солнечный Удар",
            "type": "Pale Ale - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/plan-b-brewery-solnechnyj-udar/1145842"
        },
        {
            "title": "Calypso",
            "type": "IPA - American",
            "rating": 3.58,
            "url": "https://untappd.com/b/plan-b-brewery-calypso/1274918"
        },
        {
            "title": "Флоренс Новогодний",
            "type": "Porter - Other",
            "rating": 3.66,
            "url": "https://untappd.com/b/plan-b-brewery-florens-novogodnij/2436792"
        },
        {
            "title": "Cloud Atlas",
            "type": "Pale Ale - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/plan-b-brewery-cloud-atlas/1351788"
        },
        {
            "title": "No Beergeek Series: Belgian Pale Ale",
            "type": "Pale Ale - Belgian",
            "rating": 3.74,
            "url": "https://untappd.com/b/plan-b-brewery-no-beergeek-series-belgian-pale-ale/794861"
        },
        {
            "title": "Ярославцы все красавцы",
            "type": "Pale Ale - Other",
            "rating": 3.99,
            "url": "https://untappd.com/b/plan-b-brewery-yaroslavcy-vse-krasavcy/3298304"
        },
        {
            "title": "Ханаанский бальзам",
            "type": "Belgian Tripel",
            "rating": 3.63,
            "url": "https://untappd.com/b/plan-b-brewery-hanaanskij-balzam/2386992"
        },
        {
            "title": "Dark Side Of The Boon",
            "type": "Porter - Other",
            "rating": 3.88,
            "url": "https://untappd.com/b/plan-b-brewery-dark-side-of-the-boon/1501413"
        },
        {
            "title": "Fantazia",
            "type": "Pale Ale - American",
            "rating": 3.66,
            "url": "https://untappd.com/b/plan-b-brewery-fantazia/1054434"
        },
        {
            "title": "Горький Опыт",
            "type": "IPA - American",
            "rating": 3.73,
            "url": "https://untappd.com/b/plan-b-brewery-gorkij-opyt/1743345"
        },
        {
            "title": "Extra Special Pilsner",
            "type": "Pilsner - Imperial / Double",
            "rating": 4.03,
            "url": "https://untappd.com/b/plan-b-brewery-extra-special-pilsner/1833254"
        },
        {
            "title": "Сок из мишек гамми. Sunni",
            "type": "IPA - American",
            "rating": 3.72,
            "url": "https://untappd.com/b/plan-b-brewery-sok-iz-mishek-gammi-sunni/2386991"
        },
        {
            "title": "У Шамана Три Руки. Chocolate Version",
            "type": "Stout - Russian Imperial",
            "rating": 4.02,
            "url": "https://untappd.com/b/plan-b-brewery-u-shamana-tri-ruki-chocolate-version/2112872"
        },
        {
            "title": "Дети Урсулы",
            "type": "Wild Ale - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/plan-b-brewery-deti-ursuly/2356428"
        },
        {
            "title": "Imperial Pilsner Hallertau Blanc",
            "type": "Pilsner - Imperial / Double",
            "rating": 3.78,
            "url": "https://untappd.com/b/plan-b-brewery-imperial-pilsner-hallertau-blanc/1245911"
        },
        {
            "title": "Planet B",
            "type": "IPA - American",
            "rating": 3.89,
            "url": "https://untappd.com/b/plan-b-brewery-planet-b/4927431"
        },
        {
            "title": "Слеза Комсомолки",
            "type": "Pale Ale - Belgian",
            "rating": 3.78,
            "url": "https://untappd.com/b/plan-b-brewery-sleza-komsomolki/1151214"
        },
        {
            "title": "Mini Satan",
            "type": "Stout - Russian Imperial",
            "rating": 4,
            "url": "https://untappd.com/b/plan-b-brewery-mini-satan/2908558"
        },
        {
            "title": "Voices From The Past",
            "type": "IPA - American",
            "rating": 3.69,
            "url": "https://untappd.com/b/plan-b-brewery-voices-from-the-past/1472719"
        },
        {
            "title": "Freestyle",
            "type": "Lager - Pale",
            "rating": 3.63,
            "url": "https://untappd.com/b/plan-b-brewery-freestyle/1468147"
        },
        {
            "title": "Texas Rangers",
            "type": "Pale Ale - American",
            "rating": 3.6,
            "url": "https://untappd.com/b/plan-b-texas-rangers/566950"
        },
        {
            "title": "2 Out Side Вымороженный",
            "type": "IPA - Imperial / Double",
            "rating": 4.51,
            "url": "https://untappd.com/b/plan-b-brewery-2-out-side-vymorozhennyj/1587384"
        },
        {
            "title": "Trinity IPA",
            "type": "IPA - American",
            "rating": 3.68,
            "url": "https://untappd.com/b/plan-b-brewery-trinity-ipa/1940369"
        },
        {
            "title": "Долгий Путь",
            "type": "IPA - New England / Hazy",
            "rating": 3.77,
            "url": "https://untappd.com/b/plan-b-brewery-dolgij-put/2086245"
        },
        {
            "title": "Абсолютное Зло",
            "type": "Lager - Pale",
            "rating": 3.66,
            "url": "https://untappd.com/b/plan-b-brewery-absolyutnoe-zlo/2247102"
        },
        {
            "title": "Shade of Pale",
            "type": "Pale Ale - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/plan-b-brewery-shade-of-pale/4900074"
        },
        {
            "title": "Black Flag",
            "type": "Porter - Imperial / Double",
            "rating": 3.77,
            "url": "https://untappd.com/b/plan-b-brewery-black-flag/1926690"
        },
        {
            "title": "Сок из мишек Гамми. Grammy",
            "type": "IPA - American",
            "rating": 3.89,
            "url": "https://untappd.com/b/plan-b-brewery-sok-iz-mishek-gammi-grammy/2348321"
        },
        {
            "title": "Pilsner Hallertau Melon",
            "type": "Pilsner - Other",
            "rating": 3.78,
            "url": "https://untappd.com/b/plan-b-brewery-pilsner-hallertau-melon/1112486"
        },
        {
            "title": "У Шамана Три Руки. Coffee Version",
            "type": "Stout - Russian Imperial",
            "rating": 4.09,
            "url": "https://untappd.com/b/plan-b-brewery-u-shamana-tri-ruki-coffee-version/2112874"
        },
        {
            "title": "007: Golden Hop",
            "type": "IPA - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/plan-b-brewery-007-golden-hop/1404316"
        },
        {
            "title": "Солнечный ветер +",
            "type": "IPA - Other",
            "rating": 4.07,
            "url": "https://untappd.com/b/plan-b-brewery-solnechnyj-veter/2048010"
        },
        {
            "title": "Pale Tart: Smoothie Edition",
            "type": "Sour - Fruited",
            "rating": 3.88,
            "url": "https://untappd.com/b/plan-b-brewery-pale-tart-smoothie-edition/4007073"
        },
        {
            "title": "Amber Tart: Smoothie Edition",
            "type": "Sour - Fruited",
            "rating": 3.91,
            "url": "https://untappd.com/b/plan-b-brewery-amber-tart-smoothie-edition/4007081"
        },
        {
            "title": "Карфаген Должен Быть Разрушен",
            "type": "Barleywine - English",
            "rating": 4.13,
            "url": "https://untappd.com/b/plan-b-brewery-karfagen-dolzhen-byt-razrushen/1297857"
        },
        {
            "title": "Shade of Haze",
            "type": "IPA - New England / Hazy",
            "rating": 3.77,
            "url": "https://untappd.com/b/plan-b-brewery-shade-of-haze/4900080"
        },
        {
            "title": "Belmon D'O",
            "type": "Belgian Blonde",
            "rating": 3.9,
            "url": "https://untappd.com/b/plan-b-brewery-belmon-d-o/1851623"
        },
        {
            "title": "Пилснер",
            "type": "Pilsner - Czech / Bohemian",
            "rating": 3.79,
            "url": "https://untappd.com/b/plan-b-brewery-pilsner/3332807"
        },
        {
            "title": "Shade of Sour",
            "type": "Sour - Fruited",
            "rating": 3.82,
            "url": "https://untappd.com/b/plan-b-brewery-shade-of-sour/4900076"
        },
        {
            "title": "Winter Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.92,
            "url": "https://untappd.com/b/plan-b-brewery-winter-saison/1863584"
        },
        {
            "title": "Black IPA",
            "type": "IPA - Black / Cascadian Dark Ale",
            "rating": 3.65,
            "url": "https://untappd.com/b/plan-b-brewery-black-ipa/1010530"
        },
        {
            "title": "Фантомас",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.87,
            "url": "https://untappd.com/b/plan-b-brewery-fantomas/1840946"
        },
        {
            "title": "T And U (Dominicana Cocoa Nibs And Madagascar Vanilla Beans) Barrel Aged Scotch Whisky",
            "type": "Stout - Russian Imperial",
            "rating": 3.98,
            "url": "https://untappd.com/b/plan-b-brewery-t-and-u-dominicana-cocoa-nibs-and-madagascar-vanilla-beans-barrel-aged-scotch-whisky/3540908"
        },
        {
            "title": "Sour Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.88,
            "url": "https://untappd.com/b/plan-b-sour-saison/755617"
        },
        {
            "title": "Krong's Лапа",
            "type": "Pale Ale - American",
            "rating": 4.31,
            "url": "https://untappd.com/b/plan-b-brewery-krong-s-lapa/2382706"
        },
        {
            "title": "Путь к энтропии через концентрацию. Кальвадос",
            "type": "Stout - Russian Imperial",
            "rating": 3.96,
            "url": "https://untappd.com/b/plan-b-brewery-put-k-entropii-cherez-koncentraciyu-kalvados/1334710"
        },
        {
            "title": "Belgian Fleur.Vintage 2016",
            "type": "Belgian Strong Dark Ale",
            "rating": 4.18,
            "url": "https://untappd.com/b/plan-b-brewery-belgian-fleur-vintage-2016/2112876"
        },
        {
            "title": "Ярославль - Москва",
            "type": "IPA - Milkshake",
            "rating": 3.73,
            "url": "https://untappd.com/b/plan-b-brewery-yaroslavl-moskva/3512118"
        },
        {
            "title": "Мгла Ада",
            "type": "Stout - Russian Imperial",
            "rating": 4.48,
            "url": "https://untappd.com/b/plan-b-brewery-mgla-ada/1065304"
        },
        {
            "title": "Chocolate Imperial Porter",
            "type": "Porter - Imperial / Double",
            "rating": 4.1,
            "url": "https://untappd.com/b/plan-b-brewery-chocolate-imperial-porter/2056075"
        },
        {
            "title": "Почти Red Ale",
            "type": "Red Ale - American Amber / Red",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-pochti-red-ale/837644"
        },
        {
            "title": "Ад и Израиль",
            "type": "Stout - Russian Imperial",
            "rating": 4.1,
            "url": "https://untappd.com/b/plan-b-brewery-ad-i-izrail/1188277"
        },
        {
            "title": "Strong Scotch Ale",
            "type": "Scotch Ale / Wee Heavy",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-strong-scotch-ale/947690"
        },
        {
            "title": "Mad Fermentation",
            "type": "Sour - Other",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-mad-fermentation/1153370"
        },
        {
            "title": "True And Evil",
            "type": "Stout - Imperial / Double",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-true-and-evil/1115249"
        },
        {
            "title": "Imperial Coffee Brown Ale",
            "type": "Brown Ale - Imperial / Double",
            "rating": 4.05,
            "url": "https://untappd.com/b/plan-b-brewery-imperial-coffee-brown-ale/2056501"
        },
        {
            "title": "Dortmunder Lager",
            "type": "Lager - Dortmunder / Export",
            "rating": 3.52,
            "url": "https://untappd.com/b/plan-b-brewery-dortmunder-lager/4874682"
        },
        {
            "title": "Krong's Molocow",
            "type": "Stout - Milk / Sweet",
            "rating": 4.09,
            "url": "https://untappd.com/b/plan-b-brewery-krong-s-molocow/2449791"
        },
        {
            "title": "Путь к энтропии через концентрацию. Мадера",
            "type": "Stout - Russian Imperial",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-put-k-entropii-cherez-koncentraciyu-madera/1528209"
        },
        {
            "title": "Nelson Sauvin Sour Ale",
            "type": "Sour - Other",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-nelson-sauvin-sour-ale/1537373"
        },
        {
            "title": "India Pale Lager",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-india-pale-lager/1923659"
        },
        {
            "title": "No Liquid",
            "type": "Bock - Eisbock",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-no-liquid/1209783"
        },
        {
            "title": "Symphony of Destruction. Bourbon Chips Edition",
            "type": "Strong Ale - American",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-symphony-of-destruction-bourbon-chips-edition/1599341"
        },
        {
            "title": "Tart IPA",
            "type": "IPA - Other",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-tart-ipa/1507167"
        },
        {
            "title": "Milk IPA",
            "type": "IPA - Other",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-milk-ipa/2056239"
        },
        {
            "title": "Фидель",
            "type": "Porter - Other",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-fidel/2015087"
        },
        {
            "title": "RIS крем брюле II",
            "type": "Stout - Russian Imperial",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-ris-krem-bryule-ii/2104076"
        },
        {
            "title": "Crimson Crush Sour Ale",
            "type": "Sour - Fruited",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-crimson-crush-sour-ale/5293470"
        },
        {
            "title": "T And U (San Tome Cocoa Beans) Barrel Aged Scotch Whiskey Limited Ed.",
            "type": "Stout - Russian Imperial",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-t-and-u-san-tome-cocoa-beans-barrel-aged-scotch-whiskey-limited-ed/4144338"
        },
        {
            "title": "Come On Baby Light My Fire (Ancho/Pasilla) Whiskey BA Limited Ed",
            "type": "Stout - Russian Imperial",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-come-on-baby-light-my-fire-ancho-pasilla-whiskey-ba-limited-ed/4162073"
        },
        {
            "title": "Brett Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": null,
            "url": "https://untappd.com/b/plan-b-brewery-brett-saison/3265670"
        }
    ],
    "RED BUTTON": [
        {
            "title": "Most Wonderful Time 4 A Beer",
            "type": "Stout - Milk / Sweet",
            "rating": 3.97,
            "url": "https://untappd.com/b/red-button-brewery-most-wonderful-time-4-a-beer/2427008"
        },
        {
            "title": "Find Deny Substract Boil (50/50)",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.31,
            "url": "https://untappd.com/b/red-button-brewery-find-deny-substract-boil-50-50/3840466"
        },
        {
            "title": "Left Future Myth",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.33,
            "url": "https://untappd.com/b/red-button-brewery-left-future-myth/3989552"
        },
        {
            "title": "Noiseless (50/50)",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.36,
            "url": "https://untappd.com/b/red-button-brewery-noiseless-50-50/4071312"
        },
        {
            "title": "Hocus Pocus",
            "type": "Sour - Other",
            "rating": 3.88,
            "url": "https://untappd.com/b/red-button-brewery-hocus-pocus/2830974"
        },
        {
            "title": "SPLURGE",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.41,
            "url": "https://untappd.com/b/red-button-brewery-splurge/3690113"
        },
        {
            "title": "Pure Shores",
            "type": "Stout - Milk / Sweet",
            "rating": 3.77,
            "url": "https://untappd.com/b/red-button-brewery-pure-shores/2502623"
        },
        {
            "title": "POiMA",
            "type": "Sour - Other Gose",
            "rating": 3.79,
            "url": "https://untappd.com/b/red-button-brewery-poima/2209964"
        },
        {
            "title": "Nuage (50/50)",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.32,
            "url": "https://untappd.com/b/red-button-brewery-nuage-50-50/4285635"
        },
        {
            "title": "Sample Chew (50/50)",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.27,
            "url": "https://untappd.com/b/red-button-brewery-sample-chew-50-50/3915097"
        },
        {
            "title": "Fondue Fountain",
            "type": "Stout - Milk / Sweet",
            "rating": 3.91,
            "url": "https://untappd.com/b/red-button-brewery-fondue-fountain/3030936"
        },
        {
            "title": "Merci",
            "type": "Sour - Other Gose",
            "rating": 3.71,
            "url": "https://untappd.com/b/red-button-brewery-merci/2401288"
        },
        {
            "title": "BUMPY",
            "type": "IPA - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/red-button-brewery-bumpy/3629982"
        },
        {
            "title": "Tale of Us",
            "type": "IPA - Other",
            "rating": 3.87,
            "url": "https://untappd.com/b/red-button-brewery-tale-of-us/2676791"
        },
        {
            "title": "Overwhelm (50/50)",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.33,
            "url": "https://untappd.com/b/red-button-brewery-overwhelm-50-50/4551068"
        },
        {
            "title": "Manic (50/50)",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.33,
            "url": "https://untappd.com/b/red-button-brewery-manic-50-50/4528539"
        },
        {
            "title": "Basic",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.84,
            "url": "https://untappd.com/b/red-button-brewery-basic/4093183"
        },
        {
            "title": "Завтраки и Ужины",
            "type": "Sour - Other",
            "rating": 4.01,
            "url": "https://untappd.com/b/red-button-brewery-zavtraki-i-uzhiny/2563463"
        },
        {
            "title": "Counsulier",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.27,
            "url": "https://untappd.com/b/red-button-brewery-counsulier/4020044"
        },
        {
            "title": "Kuts",
            "type": "Sour - Other Gose",
            "rating": 3.95,
            "url": "https://untappd.com/b/red-button-brewery-kuts/4725176"
        },
        {
            "title": "Jet On",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.12,
            "url": "https://untappd.com/b/red-button-brewery-jet-on/4398842"
        },
        {
            "title": "Cherrynade",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.11,
            "url": "https://untappd.com/b/red-button-brewery-cherrynade/4340631"
        },
        {
            "title": "TRIB3POP",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.27,
            "url": "https://untappd.com/b/red-button-brewery-trib3pop/4137796"
        },
        {
            "title": "SLIP SLOP",
            "type": "Sour - Fruited",
            "rating": 4.13,
            "url": "https://untappd.com/b/red-button-brewery-slip-slop/3974037"
        },
        {
            "title": "Yes, No, Please",
            "type": "Sour - Fruited",
            "rating": 3.93,
            "url": "https://untappd.com/b/red-button-brewery-yes-no-please/3172273"
        },
        {
            "title": "NoNoNo, Ok, Yes!",
            "type": "Sour - Fruited",
            "rating": 3.93,
            "url": "https://untappd.com/b/red-button-brewery-nonono-ok-yes/3076172"
        },
        {
            "title": "BLACK SWAN",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.23,
            "url": "https://untappd.com/b/red-button-brewery-black-swan/4774307"
        },
        {
            "title": "Vadique",
            "type": "Stout - Russian Imperial",
            "rating": 3.87,
            "url": "https://untappd.com/b/red-button-brewery-vadique/2240193"
        },
        {
            "title": "Frivolous c-c-combo",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.69,
            "url": "https://untappd.com/b/red-button-brewery-frivolous-c-c-combo/1921311"
        },
        {
            "title": "Patty (50/50)",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.2,
            "url": "https://untappd.com/b/red-button-brewery-patty/4991042"
        },
        {
            "title": "Soledad",
            "type": "IPA - White / Wheat",
            "rating": 3.44,
            "url": "https://untappd.com/b/red-button-brewery-soledad/1862045"
        },
        {
            "title": "Droppin Sticks",
            "type": "Sour - Fruited",
            "rating": 3.89,
            "url": "https://untappd.com/b/red-button-brewery-droppin-sticks/3076175"
        },
        {
            "title": "Пиво",
            "type": "Other",
            "rating": 3.6,
            "url": "https://untappd.com/b/red-button-brewery-pivo/4166494"
        },
        {
            "title": "Poeme",
            "type": "Mead - Braggot",
            "rating": 4.05,
            "url": "https://untappd.com/b/red-button-brewery-poeme/4341636"
        },
        {
            "title": "TAHTOK",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.17,
            "url": "https://untappd.com/b/red-button-brewery-tahtok/4806580"
        },
        {
            "title": "Itchy (50/50)",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.27,
            "url": "https://untappd.com/b/red-button-brewery-itchy-50-50/4882591"
        },
        {
            "title": "DEADBEAT",
            "type": "IPA - New England / Hazy",
            "rating": 3.96,
            "url": "https://untappd.com/b/red-button-brewery-deadbeat/4598697"
        },
        {
            "title": "Betroit",
            "type": "Barleywine - Other",
            "rating": 3.83,
            "url": "https://untappd.com/b/red-button-brewery-betroit/2397477"
        },
        {
            "title": "Sorrel Not Juniper",
            "type": "Sour - Other Gose",
            "rating": 3.92,
            "url": "https://untappd.com/b/red-button-brewery-sorrel-not-juniper/2660452"
        },
        {
            "title": "Morus Rubrum",
            "type": "Mead - Other",
            "rating": 3.6,
            "url": "https://untappd.com/b/red-button-brewery-morus-rubrum/3392848"
        },
        {
            "title": "Folky",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.99,
            "url": "https://untappd.com/b/red-button-brewery-folky/4780352"
        },
        {
            "title": "Young Old Secret Well Known",
            "type": "Sour - Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/red-button-brewery-young-old-secret-well-known/3464007"
        },
        {
            "title": "You, Me, Him",
            "type": "Sour - Fruited",
            "rating": 3.9,
            "url": "https://untappd.com/b/red-button-brewery-you-me-him/3339119"
        },
        {
            "title": "Stravage",
            "type": "IPA - New England / Hazy",
            "rating": 3.91,
            "url": "https://untappd.com/b/red-button-brewery-stravage/4768581"
        },
        {
            "title": "Super U",
            "type": "Mead - Melomel",
            "rating": 4.22,
            "url": "https://untappd.com/b/red-button-brewery-super-u/4939413"
        },
        {
            "title": "Tarradiddle",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.28,
            "url": "https://untappd.com/b/red-button-brewery-tarradiddle/3794956"
        },
        {
            "title": "SEQUOIA",
            "type": "IPA - New England / Hazy",
            "rating": 3.85,
            "url": "https://untappd.com/b/red-button-brewery-sequoia/4684408"
        },
        {
            "title": "Tapster IPA",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/red-button-brewery-tapster-ipa/4707393"
        },
        {
            "title": "Balloon (Rhubarb Lassi)",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.13,
            "url": "https://untappd.com/b/red-button-brewery-baloon-lassi-rhubarb/5010250"
        },
        {
            "title": "True False",
            "type": "Sour - Fruited",
            "rating": 3.93,
            "url": "https://untappd.com/b/red-button-brewery-true-false/3208330"
        },
        {
            "title": "Пиво Крафтовое",
            "type": "Other",
            "rating": 3.31,
            "url": "https://untappd.com/b/red-button-brewery-pivo-kraftovoe/4268815"
        },
        {
            "title": "Oficina",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.84,
            "url": "https://untappd.com/b/red-button-brewery-oficina/4545113"
        },
        {
            "title": "Clock Opera",
            "type": "Fruit Beer",
            "rating": 3.68,
            "url": "https://untappd.com/b/red-button-brewery-clock-opera/1754210"
        },
        {
            "title": "Compact",
            "type": "IPA - Sour",
            "rating": 3.91,
            "url": "https://untappd.com/b/red-button-brewery-compact/4504289"
        },
        {
            "title": "OPERA",
            "type": "Grape Ale - Italian",
            "rating": 3.65,
            "url": "https://untappd.com/b/red-button-brewery-opera/4472285"
        },
        {
            "title": "Cruel World",
            "type": "Bock - Doppelbock",
            "rating": 3.78,
            "url": "https://untappd.com/b/red-button-brewery-cruel-world/3656666"
        },
        {
            "title": "Betroit (2YRS AGD)",
            "type": "Barleywine - Other",
            "rating": 3.69,
            "url": "https://untappd.com/b/red-button-brewery-betroit-2yrs-agd/4033245"
        },
        {
            "title": "Spooky Kooky",
            "type": "Stout - Milk / Sweet",
            "rating": 3.84,
            "url": "https://untappd.com/b/red-button-brewery-spooky-kooky/3464010"
        },
        {
            "title": "KANPAI",
            "type": "Koji / Ginjo Beer",
            "rating": 3.76,
            "url": "https://untappd.com/b/red-button-brewery-kanpai/4737289"
        },
        {
            "title": "Sour Grinder",
            "type": "IPA - Sour",
            "rating": 3.78,
            "url": "https://untappd.com/b/red-button-brewery-sour-grinder/3288283"
        },
        {
            "title": "Velvet Tiptoe",
            "type": "Sour - Fruited",
            "rating": 3.78,
            "url": "https://untappd.com/b/red-button-brewery-velvet-tiptoe/3466505"
        },
        {
            "title": "KEPT COMPANY",
            "type": "IPA - Imperial / Double",
            "rating": 3.77,
            "url": "https://untappd.com/b/red-button-brewery-kept-company/4598698"
        },
        {
            "title": "Flacid",
            "type": "IPA - Sour",
            "rating": 3.83,
            "url": "https://untappd.com/b/red-button-brewery-flacid/3392842"
        },
        {
            "title": "Coconut",
            "type": "Stout - Milk / Sweet",
            "rating": 3.89,
            "url": "https://untappd.com/b/red-button-brewery-coconut/4559031"
        },
        {
            "title": "SNARL",
            "type": "Sour - Fruited",
            "rating": 3.79,
            "url": "https://untappd.com/b/red-button-brewery-snarl/3102533"
        },
        {
            "title": "Great Times Good Stories",
            "type": "Sour - Fruited",
            "rating": 4.11,
            "url": "https://untappd.com/b/red-button-brewery-great-times-good-stories/4255591"
        },
        {
            "title": "Fleg",
            "type": "Porter - Other",
            "rating": 3.77,
            "url": "https://untappd.com/b/red-button-brewery-fleg/4621954"
        },
        {
            "title": "Sour Mayo",
            "type": "IPA - Sour",
            "rating": 3.76,
            "url": "https://untappd.com/b/red-button-brewery-sour-mayo/4513517"
        },
        {
            "title": "Womby Bomby",
            "type": "Sour - Fruited",
            "rating": 3.67,
            "url": "https://untappd.com/b/red-button-brewery-womby-bomby/3288282"
        },
        {
            "title": "Banana",
            "type": "Stout - Milk / Sweet",
            "rating": 3.79,
            "url": "https://untappd.com/b/red-button-brewery-banana/4562385"
        },
        {
            "title": "Third Party People",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.89,
            "url": "https://untappd.com/b/red-button-brewery-third-party-people/4412976"
        },
        {
            "title": "Y Is 4 U",
            "type": "Sour - Fruited",
            "rating": 3.88,
            "url": "https://untappd.com/b/red-button-brewery-y-is-4-u/3396844"
        },
        {
            "title": "Supervise Surprise",
            "type": "Stout - Imperial / Double",
            "rating": 3.78,
            "url": "https://untappd.com/b/red-button-brewery-supervise-surprise/3549615"
        },
        {
            "title": "Oberton — the Black & Tan",
            "type": "Black & Tan",
            "rating": 3.81,
            "url": "https://untappd.com/b/red-button-brewery-oberton-the-black-and-tan/4702709"
        },
        {
            "title": "Spiky",
            "type": "Sour - Fruited Gose",
            "rating": 3.86,
            "url": "https://untappd.com/b/red-button-brewery-spiky/4412978"
        },
        {
            "title": "The Rub",
            "type": "Sour - Other",
            "rating": 3.84,
            "url": "https://untappd.com/b/red-button-brewery-the-rub/3238662"
        },
        {
            "title": "Black Cadenza",
            "type": "Fruit Beer",
            "rating": 3.72,
            "url": "https://untappd.com/b/red-button-brewery-black-cadenza/3134594"
        },
        {
            "title": "Crash Crashed Crashes Crashing",
            "type": "Sour - Other",
            "rating": 3.65,
            "url": "https://untappd.com/b/red-button-brewery-crash-crashed-crashes-crashing/3464013"
        },
        {
            "title": "iii",
            "type": "Barleywine - Other",
            "rating": 3.7,
            "url": "https://untappd.com/b/red-button-brewery-iii/3649158"
        },
        {
            "title": "Darkness-Light Multisided-Onesided Salty-Fresh\\Bland",
            "type": "Fruit Beer",
            "rating": 3.64,
            "url": "https://untappd.com/b/red-button-brewery-darkness-light-multisided-onesided-salty-fresh-bland/3406562"
        },
        {
            "title": "Tap Flip",
            "type": "Stout - Milk / Sweet",
            "rating": 3.8,
            "url": "https://untappd.com/b/red-button-brewery-tap-flip/3518727"
        },
        {
            "title": "Vanity",
            "type": "Sour - Fruited Gose",
            "rating": 4.02,
            "url": "https://untappd.com/b/red-button-brewery-vanity/3583856"
        },
        {
            "title": "Freak Scénique",
            "type": "Sour - Fruited",
            "rating": 4.03,
            "url": "https://untappd.com/b/red-button-brewery-freak-scenique/4794391"
        },
        {
            "title": "Empennage",
            "type": "IPA - New England / Hazy",
            "rating": 3.87,
            "url": "https://untappd.com/b/red-button-brewery-empennage/4889760"
        },
        {
            "title": "Банка с Пастри Стаутом",
            "type": "Stout - Pastry",
            "rating": 3.47,
            "url": "https://untappd.com/b/red-button-brewery-banka-s-pastri-stautom/3466515"
        },
        {
            "title": "FLOPPY",
            "type": "IPA - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/red-button-brewery-floppy/4375566"
        },
        {
            "title": "Bureau",
            "type": "Mead - Melomel",
            "rating": 4.15,
            "url": "https://untappd.com/b/red-button-brewery-bureau/4720548"
        },
        {
            "title": "Montmorency",
            "type": "Fruit Beer",
            "rating": 4.24,
            "url": "https://untappd.com/b/red-button-brewery-montmorency/5101836"
        },
        {
            "title": "After 6",
            "type": "Stout - Milk / Sweet",
            "rating": 4.14,
            "url": "https://untappd.com/b/red-button-brewery-after-6/4804177"
        },
        {
            "title": "PSYCHOTIC",
            "type": "Sour - Fruited",
            "rating": 3.92,
            "url": "https://untappd.com/b/red-button-brewery-psychotic/4586086"
        },
        {
            "title": "Smooth-Scratchy Small-Big Eternal-in An Instant",
            "type": "Sour - Other",
            "rating": 3.76,
            "url": "https://untappd.com/b/red-button-brewery-smooth-scratchy-small-big-eternal-in-an-instant/3396841"
        },
        {
            "title": "Helle Weiss",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.67,
            "url": "https://untappd.com/b/red-button-brewery-helle-weiss/4827246"
        },
        {
            "title": "Blue Cheeks",
            "type": "Sour - Fruited",
            "rating": 3.87,
            "url": "https://untappd.com/b/red-button-brewery-blue-cheeks/3288292"
        },
        {
            "title": "Thrusty Stroll",
            "type": "Stout - Pastry",
            "rating": 3.81,
            "url": "https://untappd.com/b/red-button-brewery-thrusty-stroll/3649131"
        },
        {
            "title": "Veggie Circus",
            "type": "Fruit Beer",
            "rating": 3.39,
            "url": "https://untappd.com/b/red-button-brewery-veggie-circus/3203221"
        },
        {
            "title": "VANKELIG",
            "type": "Stout - Milk / Sweet",
            "rating": 4.02,
            "url": "https://untappd.com/b/red-button-brewery-vankelig/4616416"
        },
        {
            "title": "Half No Grain , Half No Pain !",
            "type": "Stout - Imperial / Double",
            "rating": 2.92,
            "url": "https://untappd.com/b/red-button-brewery-half-no-grain-half-no-pain/3037284"
        },
        {
            "title": "Freak Fabrique",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.88,
            "url": "https://untappd.com/b/red-button-brewery-freak-fabrique/2981163"
        },
        {
            "title": "SHAKE THE DICE",
            "type": "Sour - Other",
            "rating": 3.61,
            "url": "https://untappd.com/b/red-button-brewery-shake-the-dice/3109897"
        },
        {
            "title": "Bazar Clan",
            "type": "Kvass",
            "rating": 3.62,
            "url": "https://untappd.com/b/red-button-brewery-bazar-clan/2742110"
        },
        {
            "title": "Crispy Honey Bear",
            "type": "Honey Beer",
            "rating": 3.43,
            "url": "https://untappd.com/b/red-button-brewery-crispy-honey-bear/4366914"
        },
        {
            "title": "There Is Confetti In My Space",
            "type": "Sour - Other",
            "rating": 3.95,
            "url": "https://untappd.com/b/red-button-brewery-there-is-confetti-in-my-space/2802116"
        },
        {
            "title": "Young Old Secret Well Known (CHERRY ED.)",
            "type": "Sour - Other",
            "rating": 3.88,
            "url": "https://untappd.com/b/red-button-brewery-young-old-secret-well-known-cherry-ed/4146063"
        },
        {
            "title": "Big Week",
            "type": "IPA - American",
            "rating": 3.69,
            "url": "https://untappd.com/b/red-button-brewery-big-week/4908116"
        },
        {
            "title": "King Helle",
            "type": "Lager - Helles",
            "rating": 3.72,
            "url": "https://untappd.com/b/red-button-brewery-king-helle/4972454"
        },
        {
            "title": "WWW24/7",
            "type": "Sour - Other",
            "rating": 3.86,
            "url": "https://untappd.com/b/red-button-brewery-www24-7/4412973"
        },
        {
            "title": "UUU",
            "type": "Sour - Fruited Gose",
            "rating": 3.66,
            "url": "https://untappd.com/b/red-button-brewery-uuu/4586092"
        },
        {
            "title": "Add Your Text Here",
            "type": "Spiced / Herbed Beer",
            "rating": 3.75,
            "url": "https://untappd.com/b/red-button-brewery-add-your-text-here/3436964"
        },
        {
            "title": "In the Beginning Was the IPA",
            "type": "Sour - Other",
            "rating": 3.93,
            "url": "https://untappd.com/b/red-button-brewery-in-the-beginning-was-the-ipa/2920269"
        },
        {
            "title": "Microbitter",
            "type": "IPA - Session",
            "rating": 3.73,
            "url": "https://untappd.com/b/red-button-brewery-microbitter/3208339"
        },
        {
            "title": "Rob the Choice",
            "type": "Stout - Russian Imperial",
            "rating": 3.79,
            "url": "https://untappd.com/b/red-button-brewery-rob-the-choice/3690114"
        },
        {
            "title": "Wish U",
            "type": "Mead - Melomel",
            "rating": 4.09,
            "url": "https://untappd.com/b/red-button-brewery-wish-u/5148764"
        },
        {
            "title": "303 Fresh",
            "type": "Fruit Beer",
            "rating": 3.41,
            "url": "https://untappd.com/b/red-button-brewery-303-fresh/3205079"
        },
        {
            "title": "Balloon (Raspberry)",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.23,
            "url": "https://untappd.com/b/red-button-brewery-balloon-raspberry/3840474"
        },
        {
            "title": "Citrus Farm YoYo",
            "type": "Farmhouse Ale - Other",
            "rating": 3.52,
            "url": "https://untappd.com/b/red-button-brewery-citrus-farm-yoyo/4285274"
        },
        {
            "title": "Guest TAP",
            "type": "Pale Ale - American",
            "rating": 3.48,
            "url": "https://untappd.com/b/red-button-brewery-guest-tap/3149595"
        },
        {
            "title": "Go the N.A.",
            "type": "Non-Alcoholic Beer - Sour",
            "rating": 3.69,
            "url": "https://untappd.com/b/red-button-brewery-go-the-n-a/4774354"
        },
        {
            "title": "HOTSY TOTSY",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.54,
            "url": "https://untappd.com/b/red-button-brewery-hotsy-totsy/3109902"
        },
        {
            "title": "Sour Kitchen",
            "type": "Sour - Fruited",
            "rating": 3.88,
            "url": "https://untappd.com/b/red-button-brewery-sour-kitchen/3059899"
        },
        {
            "title": "Is It Really Table Beer ?",
            "type": "IPA - New England / Hazy",
            "rating": 3.74,
            "url": "https://untappd.com/b/red-button-brewery-is-it-really-table-beer/2995900"
        },
        {
            "title": "QUENCHER",
            "type": "IPA - Sour",
            "rating": 3.93,
            "url": "https://untappd.com/b/red-button-brewery-quencher/3045187"
        },
        {
            "title": "Augend & Addend",
            "type": "Barleywine - Other",
            "rating": 3.64,
            "url": "https://untappd.com/b/red-button-brewery-augend-and-addend/4637187"
        },
        {
            "title": "Hyperion",
            "type": "IPA - Sour",
            "rating": 3.85,
            "url": "https://untappd.com/b/red-button-brewery-hyperion/2949759"
        },
        {
            "title": "Bay Call",
            "type": "Pale Ale - Other",
            "rating": 3.42,
            "url": "https://untappd.com/b/red-button-brewery-bay-call/3344856"
        },
        {
            "title": "Wineish",
            "type": "Wheat Beer - Wheat Wine",
            "rating": 3.81,
            "url": "https://untappd.com/b/red-button-brewery-wineish/5043765"
        },
        {
            "title": "Meable",
            "type": "Sour - Fruited",
            "rating": 3.84,
            "url": "https://untappd.com/b/red-button-brewery-meable/3466520"
        },
        {
            "title": "Eastern Promises",
            "type": "Fruit Beer",
            "rating": 3.54,
            "url": "https://untappd.com/b/red-button-brewery-eastern-promises/3149586"
        },
        {
            "title": "Осеннее наслаждение",
            "type": "Sour - Other",
            "rating": 3.82,
            "url": "https://untappd.com/b/red-button-brewery-osennee-naslazhdenie/2976562"
        },
        {
            "title": "Left Field",
            "type": "Pale Ale - American",
            "rating": 3.6,
            "url": "https://untappd.com/b/red-button-brewery-left-field/3466503"
        },
        {
            "title": "A.M.",
            "type": "IPA - American",
            "rating": 3.58,
            "url": "https://untappd.com/b/red-button-brewery-a-m/3194893"
        },
        {
            "title": "Сосни и Залипни 2.0",
            "type": "IPA - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/red-button-brewery-sosni-i-zalipni-2-0/2028433"
        },
        {
            "title": "Carnavalesco",
            "type": "Stout - Milk / Sweet",
            "rating": 4.02,
            "url": "https://untappd.com/b/red-button-brewery-carnavalesco/2883619"
        },
        {
            "title": "With Love To Ya",
            "type": "IPA - Brut",
            "rating": 3.65,
            "url": "https://untappd.com/b/red-button-brewery-with-love-to-ya/2676806"
        },
        {
            "title": "HARD LUXE",
            "type": "Sour - Other",
            "rating": 3.93,
            "url": "https://untappd.com/b/red-button-brewery-hard-luxe/2744438"
        },
        {
            "title": "Shpala",
            "type": "Smoked Beer",
            "rating": 3.83,
            "url": "https://untappd.com/b/red-button-brewery-shpala/2810659"
        },
        {
            "title": "HOQU Solutions",
            "type": "Stout - Other",
            "rating": 3.74,
            "url": "https://untappd.com/b/red-button-brewery-hoqu-solutions/2830958"
        },
        {
            "title": "AVALON",
            "type": "Stout - Other",
            "rating": 3.58,
            "url": "https://untappd.com/b/red-button-brewery-avalon/3095866"
        },
        {
            "title": "HaHaHaNo!",
            "type": "IPA - Sour",
            "rating": 3.9,
            "url": "https://untappd.com/b/red-button-brewery-hahahano/3030937"
        },
        {
            "title": "Bedroom Cooperation Transform To Sweet",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.59,
            "url": "https://untappd.com/b/red-button-brewery-bedroom-cooperation-transform-to-sweet/3466519"
        },
        {
            "title": "Not For Resale",
            "type": "IPA - American",
            "rating": 3.47,
            "url": "https://untappd.com/b/red-button-brewery-not-for-resale/3208327"
        },
        {
            "title": "Go the Rye (Maple)",
            "type": "Sour - Other Gose",
            "rating": 3.71,
            "url": "https://untappd.com/b/red-button-brewery-go-the-rye-maple/4758597"
        },
        {
            "title": "TWO DOTS",
            "type": "IPA - Imperial / Double",
            "rating": 3.72,
            "url": "https://untappd.com/b/red-button-brewery-two-dots/2648872"
        },
        {
            "title": "Morus Alba",
            "type": "Mead - Other",
            "rating": 3.74,
            "url": "https://untappd.com/b/red-button-brewery-morus-alba/3298228"
        },
        {
            "title": "Don't Feed the Yuppies",
            "type": "Sour - Other",
            "rating": 3.75,
            "url": "https://untappd.com/b/red-button-brewery-don-t-feed-the-yuppies/2883627"
        },
        {
            "title": "GIRL FRIDAY",
            "type": "Fruit Beer",
            "rating": 3.57,
            "url": "https://untappd.com/b/red-button-brewery-girl-friday/3134592"
        },
        {
            "title": "Baloon (Red Currant)",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 4.01,
            "url": "https://untappd.com/b/red-button-brewery-baloon-red-currant/4982488"
        },
        {
            "title": "Busy Doing Nothing",
            "type": "Barleywine - Other",
            "rating": 3.21,
            "url": "https://untappd.com/b/red-button-brewery-busy-doing-nothing/3037279"
        },
        {
            "title": "The Reward Is Bear",
            "type": "Sour - Other",
            "rating": 3.96,
            "url": "https://untappd.com/b/red-button-brewery-the-reward-is-bear/2981177"
        },
        {
            "title": "Jardins Nights",
            "type": "Stout - Imperial / Double",
            "rating": 3.56,
            "url": "https://untappd.com/b/red-button-brewery-jardins-nights/3037287"
        },
        {
            "title": "WISH TO LOVE",
            "type": "Mead - Melomel",
            "rating": 4.3,
            "url": "https://untappd.com/b/red-button-brewery-wish-to-love/5226739"
        },
        {
            "title": "C U 2NITE",
            "type": "Non-Alcoholic Beer - Other",
            "rating": 4.02,
            "url": "https://untappd.com/b/red-button-brewery-c-u-2nite/4836321"
        },
        {
            "title": "I Hadn't Known, I Only Heard",
            "type": "IPA - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/red-button-brewery-i-hadn-t-known-i-only-heard/2883631"
        },
        {
            "title": "Blow 'em a кiss",
            "type": "Sour - Berliner Weisse",
            "rating": 3.74,
            "url": "https://untappd.com/b/red-button-brewery-blow-em-a-kiss/4586088"
        },
        {
            "title": "Zamba",
            "type": "IPA - New England / Hazy",
            "rating": 3.83,
            "url": "https://untappd.com/b/red-button-brewery-zamba/4675302"
        },
        {
            "title": "Country Song",
            "type": "Sour - Other",
            "rating": 3.67,
            "url": "https://untappd.com/b/red-button-brewery-country-song/3088442"
        },
        {
            "title": "Missing You",
            "type": "Sour - Other",
            "rating": 3.94,
            "url": "https://untappd.com/b/red-button-brewery-missing-you/2689974"
        },
        {
            "title": "English Breakfast",
            "type": "Strong Ale - English",
            "rating": 3.64,
            "url": "https://untappd.com/b/red-button-brewery-english-breakfast/2563457"
        },
        {
            "title": "GINGERBREAD STOUT",
            "type": "Stout - Milk / Sweet",
            "rating": 3.79,
            "url": "https://untappd.com/b/red-button-brewery-gingerbread-stout/4675300"
        },
        {
            "title": "Oatish",
            "type": "Stout - Oatmeal",
            "rating": 3.91,
            "url": "https://untappd.com/b/red-button-brewery-oatish/4737291"
        },
        {
            "title": "We Discuss",
            "type": "Stout - Imperial / Double",
            "rating": 3.62,
            "url": "https://untappd.com/b/red-button-brewery-we-discuss/3045192"
        },
        {
            "title": "CHUI",
            "type": "IPA - American",
            "rating": 3.64,
            "url": "https://untappd.com/b/red-button-brewery-chui/3288288"
        },
        {
            "title": "HAUL",
            "type": "Hard Ginger Beer",
            "rating": 3.92,
            "url": "https://untappd.com/b/red-button-brewery-haul/4836319"
        },
        {
            "title": "MWT4B (EIS ED.)",
            "type": "Stout - Imperial / Double Milk",
            "rating": 4.12,
            "url": "https://untappd.com/b/red-button-brewery-mwt4b-eis-ed/2620182"
        },
        {
            "title": "BLOOM",
            "type": "Wheat Beer - Other",
            "rating": 3.11,
            "url": "https://untappd.com/b/red-button-brewery-bloom/3149593"
        },
        {
            "title": "Sour Lemonade",
            "type": "Sour - Other",
            "rating": 3.91,
            "url": "https://untappd.com/b/red-button-brewery-sour-lemonade/2883635"
        },
        {
            "title": "BASIC (Verdant Batch)",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.77,
            "url": "https://untappd.com/b/red-button-brewery-basic-verdant-batch/4616433"
        },
        {
            "title": "NERVOUS",
            "type": "Porter - Imperial / Double Coffee",
            "rating": 3.66,
            "url": "https://untappd.com/b/red-button-brewery-nervous/4675298"
        },
        {
            "title": "Splifiwas",
            "type": "Wheat Beer - Wheat Wine",
            "rating": 3.88,
            "url": "https://untappd.com/b/red-button-brewery-splifiwas/2596203"
        },
        {
            "title": "Please Recycle",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.89,
            "url": "https://untappd.com/b/red-button-brewery-please-recycle/2751546"
        },
        {
            "title": "Walk & Talk",
            "type": "Pilsner - Czech / Bohemian",
            "rating": 3.72,
            "url": "https://untappd.com/b/red-button-brewery-walk-and-talk/2851149"
        },
        {
            "title": "Vari Rice Beer",
            "type": "Lager - Japanese Rice",
            "rating": 3.78,
            "url": "https://untappd.com/b/red-button-brewery-vari-rice-beer/4885020"
        },
        {
            "title": "Anhedral",
            "type": "IPA - New England / Hazy",
            "rating": 3.91,
            "url": "https://untappd.com/b/red-button-brewery-anhedral/4858089"
        },
        {
            "title": "Некая симпатичная городская история",
            "type": "Stout - Russian Imperial",
            "rating": 3.79,
            "url": "https://untappd.com/b/red-button-brewery-nekaya-simpatichnaya-gorodskaya-istoriya/2576552"
        },
        {
            "title": "Grandma's IPA",
            "type": "IPA - English",
            "rating": 3.63,
            "url": "https://untappd.com/b/red-button-brewery-grandma-s-ipa/2676800"
        },
        {
            "title": "OH, My Sour MEAD",
            "type": "Mead - Other",
            "rating": 3.45,
            "url": "https://untappd.com/b/red-button-brewery-oh-my-sour-mead/2278354"
        },
        {
            "title": "Confect Sour Kitchen",
            "type": "Sour - Other",
            "rating": 3.74,
            "url": "https://untappd.com/b/red-button-brewery-confect-sour-kitchen/5213303"
        },
        {
            "title": "Molecule",
            "type": "Belgian Tripel",
            "rating": 3.56,
            "url": "https://untappd.com/b/red-button-brewery-molecule/5000814"
        },
        {
            "title": "Pils It Like It's Hot!",
            "type": "Pilsner - Other",
            "rating": 3.63,
            "url": "https://untappd.com/b/red-button-brewery-pils-it-like-it-s-hot/2949758"
        },
        {
            "title": "Ober - The Black",
            "type": "Stout - American",
            "rating": 3.93,
            "url": "https://untappd.com/b/red-button-brewery-ober-the-black/4707407"
        },
        {
            "title": "Розовый Балет",
            "type": "Mead - Other",
            "rating": 3.45,
            "url": "https://untappd.com/b/red-button-brewery-rozovyj-balet/2404131"
        },
        {
            "title": "U R AWSM!",
            "type": "Non-Alcoholic Beer - Sour",
            "rating": 4.29,
            "url": "https://untappd.com/b/red-button-brewery-u-r-awsm/4472279"
        },
        {
            "title": "Yellow*pink",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 4.12,
            "url": "https://untappd.com/b/red-button-brewery-yellow-pink/4340771"
        },
        {
            "title": "OT/TO",
            "type": "Mead - Melomel",
            "rating": 4.12,
            "url": "https://untappd.com/b/red-button-brewery-ot-to/4930070"
        },
        {
            "title": "Пивной Напиток",
            "type": "Fruit Beer",
            "rating": 3.64,
            "url": "https://untappd.com/b/red-button-brewery-pivnoj-napitok/4627531"
        },
        {
            "title": "Sour Electrolyte",
            "type": "Sour - Other",
            "rating": 3.7,
            "url": "https://untappd.com/b/red-button-brewery-sour-electrolyte/4808316"
        },
        {
            "title": "Fried Vanilla Ice Cream",
            "type": "Stout - Milk / Sweet",
            "rating": 3.64,
            "url": "https://untappd.com/b/red-button-brewery-fried-vanilla-ice-cream/3690116"
        },
        {
            "title": "Oh My Sour Mead Gose",
            "type": "Mead - Other",
            "rating": 3.88,
            "url": "https://untappd.com/b/red-button-brewery-oh-my-sour-mead-gose/2689982"
        },
        {
            "title": "Freak Boutique",
            "type": "Fruit Beer",
            "rating": 3.58,
            "url": "https://untappd.com/b/red-button-brewery-freak-boutique/1765790"
        },
        {
            "title": "Ton - The Tan",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/red-button-brewery-ton-the-tan/4707411"
        },
        {
            "title": "Rice & Maize",
            "type": "Lager - American Light",
            "rating": 3.65,
            "url": "https://untappd.com/b/red-button-brewery-rice-and-maize/4737287"
        },
        {
            "title": "Пиво, случайно связанное с кокосом",
            "type": "IPA - Milkshake",
            "rating": 3.55,
            "url": "https://untappd.com/b/red-button-brewery-pivo-sluchajno-svyazannoe-s-kokosom/3161300"
        },
        {
            "title": "I Want Kneel",
            "type": "IPA - Imperial / Double",
            "rating": 3.78,
            "url": "https://untappd.com/b/red-button-brewery-i-want-kneel/2531562"
        },
        {
            "title": "КД",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.06,
            "url": "https://untappd.com/b/red-button-brewery-kd/4299388"
        },
        {
            "title": "TITLE",
            "type": "IPA - American",
            "rating": 3.68,
            "url": "https://untappd.com/b/red-button-brewery-title/3915108"
        },
        {
            "title": "Пиво нефильтрованное",
            "type": "Kellerbier / Zwickelbier",
            "rating": 3.51,
            "url": "https://untappd.com/b/red-button-brewery-pivo-nefiltrovannoe/4400255"
        },
        {
            "title": "What If...Tepache",
            "type": "Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/red-button-brewery-what-if-tepache/4794395"
        },
        {
            "title": "Thick & Thin",
            "type": "IPA - Session",
            "rating": 3.58,
            "url": "https://untappd.com/b/red-button-brewery-thick-and-thin/3344864"
        },
        {
            "title": "MLT LQLR",
            "type": "Malt Liquor",
            "rating": 3.97,
            "url": "https://untappd.com/b/red-button-brewery-mlt-lqlr/4898016"
        },
        {
            "title": "♡U,SRSLY",
            "type": "Non-Alcoholic Beer - Sour",
            "rating": 4.24,
            "url": "https://untappd.com/b/red-button-brewery-u-srsly/4684411"
        },
        {
            "title": "Homeboy",
            "type": "Lager - Pale",
            "rating": 3.62,
            "url": "https://untappd.com/b/red-button-brewery-homeboy/3076190"
        },
        {
            "title": "SONO",
            "type": "IPA - American",
            "rating": 3.71,
            "url": "https://untappd.com/b/red-button-brewery-sono/3575472"
        },
        {
            "title": "Tag Der",
            "type": "Stout - White / Golden",
            "rating": 3.75,
            "url": "https://untappd.com/b/red-button-brewery-tag-der/5157691"
        },
        {
            "title": "Beaver",
            "type": "IPA - American",
            "rating": 3.32,
            "url": "https://untappd.com/b/red-button-brewery-beaver/4790376"
        },
        {
            "title": "Stone Strone",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.94,
            "url": "https://untappd.com/b/red-button-brewery-stone-strone/2895146"
        },
        {
            "title": "Tap Flip (Marshmallow Ed.)",
            "type": "Stout - Milk / Sweet",
            "rating": 3.78,
            "url": "https://untappd.com/b/red-button-brewery-tap-flip-marshmallow-ed/4443307"
        },
        {
            "title": "Dubby",
            "type": "Fruit Beer",
            "rating": 3.68,
            "url": "https://untappd.com/b/red-button-brewery-dubby/5053054"
        },
        {
            "title": "F.O.M.O",
            "type": "Mead - Other",
            "rating": 3.67,
            "url": "https://untappd.com/b/red-button-brewery-f-o-m-o/2639831"
        },
        {
            "title": "ZOO LAND",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.06,
            "url": "https://untappd.com/b/red-button-brewery-zoo-land/4908109"
        },
        {
            "title": "Pomelo Anderson",
            "type": "Sour - Fruited",
            "rating": 3.83,
            "url": "https://untappd.com/b/red-button-brewery-pomelo-anderson/2667275"
        },
        {
            "title": "XMAS23",
            "type": "Wheat Beer - Other",
            "rating": 3.63,
            "url": "https://untappd.com/b/red-button-brewery-xmas23/5149945"
        },
        {
            "title": "Oversweet Cherry Pie",
            "type": "Sour - Other",
            "rating": 3.19,
            "url": "https://untappd.com/b/red-button-brewery-oversweet-cherry-pie/2278353"
        },
        {
            "title": "Bedroom Bedlam (Yuzu)",
            "type": "Cider - Ice / Applewine",
            "rating": 3.84,
            "url": "https://untappd.com/b/red-button-brewery-bedroom-bedlam-yuzu/2830947"
        },
        {
            "title": "THX, PLS",
            "type": "Non-Alcoholic Beer - Sour",
            "rating": 3.96,
            "url": "https://untappd.com/b/red-button-brewery-thx-pls/4804172"
        },
        {
            "title": "Bicep",
            "type": "Cider - Ice / Applewine",
            "rating": 4.02,
            "url": "https://untappd.com/b/red-button-brewery-bicep/3372232"
        },
        {
            "title": "KINKY",
            "type": "Fruit Beer",
            "rating": 3.55,
            "url": "https://untappd.com/b/red-button-brewery-kinky/3344861"
        },
        {
            "title": "Kuts (Yuzu Batch)",
            "type": "Sour - Other Gose",
            "rating": 4.01,
            "url": "https://untappd.com/b/red-button-brewery-kuts-yuzu-batch/5011451"
        },
        {
            "title": "Not 2Day",
            "type": "Non-Alcoholic Beer - Other",
            "rating": 3.87,
            "url": "https://untappd.com/b/red-button-brewery-not-2day/4912247"
        },
        {
            "title": "Hitchhiker's Choice",
            "type": "Fruit Beer",
            "rating": 3.64,
            "url": "https://untappd.com/b/red-button-brewery-hitchhiker-s-choice/2004626"
        },
        {
            "title": "Extra",
            "type": "IPA - Milkshake",
            "rating": 3.79,
            "url": "https://untappd.com/b/red-button-brewery-extra/4758600"
        },
        {
            "title": "ITEM",
            "type": "Pale Ale - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/red-button-brewery-item/3836032"
        },
        {
            "title": "I'm Important",
            "type": "Non-Alcoholic Mead",
            "rating": 3.82,
            "url": "https://untappd.com/b/red-button-brewery-i-m-important/4998931"
        },
        {
            "title": "Siil Udus",
            "type": "IPA - English",
            "rating": 3.46,
            "url": "https://untappd.com/b/red-button-brewery-siil-udus/2209963"
        },
        {
            "title": "Monchichi",
            "type": "Fruit Beer",
            "rating": 3.51,
            "url": "https://untappd.com/b/red-button-brewery-monchichi/3057898"
        },
        {
            "title": "BASIC (CHUVI BATCH)",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.72,
            "url": "https://untappd.com/b/red-button-brewery-basic-chuvi-batch/4845430"
        },
        {
            "title": "Morus Rubrum (Imperial)",
            "type": "Mead - Other",
            "rating": 3.74,
            "url": "https://untappd.com/b/red-button-brewery-morus-rubrum-imperial/3995779"
        },
        {
            "title": "Сосни лимон и залипни",
            "type": "Fruit Beer",
            "rating": 3.84,
            "url": "https://untappd.com/b/red-button-brewery-sosni-limon-i-zalipni/2136316"
        },
        {
            "title": "CANDELABRA",
            "type": "Roggenbier",
            "rating": 3.67,
            "url": "https://untappd.com/b/red-button-brewery-candelabra/5283241"
        },
        {
            "title": "POiMA (B.A.)",
            "type": "Sour - Other Gose",
            "rating": 3.61,
            "url": "https://untappd.com/b/red-button-brewery-poima-b-a/2597141"
        },
        {
            "title": "Youth Beer Technology",
            "type": "Hard Seltzer",
            "rating": 4.11,
            "url": "https://untappd.com/b/red-button-brewery-youth-beer-technology/5200519"
        },
        {
            "title": "Обеды и Полдники",
            "type": "Wild Ale - American",
            "rating": 3.92,
            "url": "https://untappd.com/b/red-button-brewery-obedy-i-poldniki/5261610"
        },
        {
            "title": "Le Bain",
            "type": "Fruit Beer",
            "rating": 3.86,
            "url": "https://untappd.com/b/red-button-brewery-le-bain/5160996"
        },
        {
            "title": "Non-Alco Stout",
            "type": "Non-Alcoholic Beer - Porter / Stout",
            "rating": 3.45,
            "url": "https://untappd.com/b/red-button-brewery-non-alco-stout/5147843"
        },
        {
            "title": "GOSE STYLE",
            "type": "Sour - Fruited Gose",
            "rating": 3.91,
            "url": "https://untappd.com/b/red-button-brewery-gose-style/1580131"
        },
        {
            "title": "Завтраки и Ужины (Batch22)",
            "type": "Sour - Other",
            "rating": 3.72,
            "url": "https://untappd.com/b/red-button-brewery-zavtraki-i-uzhiny-batch22/5225734"
        },
        {
            "title": "PURE SHORES (EIS ED.)",
            "type": "Stout - Imperial / Double Milk",
            "rating": 4.02,
            "url": "https://untappd.com/b/red-button-brewery-pure-shores-eis-ed/2620169"
        },
        {
            "title": "Melon Pale",
            "type": "Pale Ale - Other",
            "rating": 3.46,
            "url": "https://untappd.com/b/red-button-brewery-melon-pale/1695222"
        },
        {
            "title": "Fix Your Accent",
            "type": "Lager - Munich Dunkel",
            "rating": 3.48,
            "url": "https://untappd.com/b/red-button-brewery-fix-your-accent/1973151"
        },
        {
            "title": "Wey Think Broadcast",
            "type": "Stout - White / Golden",
            "rating": 3.79,
            "url": "https://untappd.com/b/red-button-brewery-wey-think-broadcast/5283246"
        },
        {
            "title": "Watermelon Gose",
            "type": "Sour - Fruited Gose",
            "rating": 3.49,
            "url": "https://untappd.com/b/red-button-brewery-watermelon-gose/1695215"
        },
        {
            "title": "Inky , Blinky & Clyde",
            "type": "Fruit Beer",
            "rating": 3.47,
            "url": "https://untappd.com/b/red-button-brewery-inky-blinky-and-clyde/2073040"
        },
        {
            "title": "Soledad сoconut Ed.",
            "type": "IPA - White / Wheat",
            "rating": 3.49,
            "url": "https://untappd.com/b/red-button-brewery-soledad-soconut-ed/2038804"
        },
        {
            "title": "Kuts (Cucumber Batch)",
            "type": "Sour - Other Gose",
            "rating": 3.95,
            "url": "https://untappd.com/b/red-button-brewery-kuts-cucumber-batch/5261605"
        },
        {
            "title": "Original Fake",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.51,
            "url": "https://untappd.com/b/red-button-brewery-original-fake/2048591"
        },
        {
            "title": "TAPSTER APA",
            "type": "Pale Ale - American",
            "rating": 3.72,
            "url": "https://untappd.com/b/red-button-brewery-tapster-apa/4856544"
        },
        {
            "title": "SUPER U #Lobotomy 2022",
            "type": "Mead - Melomel",
            "rating": 4.13,
            "url": "https://untappd.com/b/red-button-brewery-super-u-lobotomy-2022/4898036"
        },
        {
            "title": "Fruit Sour Kitchen",
            "type": "Sour - Fruited",
            "rating": 4.08,
            "url": "https://untappd.com/b/red-button-brewery-fruit-sour-kitchen/5283243"
        },
        {
            "title": "Fuente (Maple Ed.)",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.57,
            "url": "https://untappd.com/b/red-button-brewery-fuente-maple-ed/1795876"
        },
        {
            "title": "Cadenza",
            "type": "Fruit Beer",
            "rating": 3.76,
            "url": "https://untappd.com/b/red-button-brewery-cadenza/1862062"
        },
        {
            "title": "Monotone (Almond)",
            "type": "Stout - Imperial / Double",
            "rating": 3.98,
            "url": "https://untappd.com/b/red-button-brewery-monotone-almond/4985651"
        },
        {
            "title": "Bazar Clan (Alc.Free)",
            "type": "Kvass",
            "rating": 3.2,
            "url": "https://untappd.com/b/red-button-brewery-bazar-clan-alc-free/3914365"
        },
        {
            "title": "SOUR STYLE",
            "type": "Sour - Other",
            "rating": 3.38,
            "url": "https://untappd.com/b/red-button-brewery-sour-style/1580137"
        },
        {
            "title": "Pineapple Bun",
            "type": "Mead - Melomel",
            "rating": 4.03,
            "url": "https://untappd.com/b/red-button-brewery-pineapple-bun/4985661"
        },
        {
            "title": "Hoppy Sour Kitchen",
            "type": "Sour - Other",
            "rating": 3.87,
            "url": "https://untappd.com/b/red-button-brewery-hoppy-sour-kitchen/5261604"
        },
        {
            "title": "Bedroom Bedlam (Raspberry)",
            "type": "Cider - Ice / Applewine",
            "rating": 3.81,
            "url": "https://untappd.com/b/red-button-brewery-bedroom-bedlam-raspberry/2649549"
        },
        {
            "title": "Wheat Wineish",
            "type": "Wheat Beer - Wheat Wine",
            "rating": 3.94,
            "url": "https://untappd.com/b/red-button-brewery-wheat-wineish/4898018"
        },
        {
            "title": "Triple Out",
            "type": "Stout - Other",
            "rating": 3.1,
            "url": "https://untappd.com/b/red-button-brewery-triple-out/1753979"
        },
        {
            "title": "Bedroom Bedlam (Pineapple)",
            "type": "Cider - Ice / Applewine",
            "rating": 3.85,
            "url": "https://untappd.com/b/red-button-brewery-bedroom-bedlam-pineapple/2830951"
        },
        {
            "title": "Oatish (Almond&Caramel)",
            "type": "Stout - Oatmeal",
            "rating": 3.91,
            "url": "https://untappd.com/b/red-button-brewery-oatish-almond-and-caramel/5261598"
        },
        {
            "title": "Sour Berries",
            "type": "Sour - Other",
            "rating": 3.71,
            "url": "https://untappd.com/b/red-button-brewery-sour-berries/1695206"
        },
        {
            "title": "Technida",
            "type": "Stout - Milk / Sweet",
            "rating": 3.31,
            "url": "https://untappd.com/b/red-button-brewery-technida/1973135"
        },
        {
            "title": "What If... Hard Tepache",
            "type": "Other",
            "rating": 4.1,
            "url": "https://untappd.com/b/red-button-brewery-what-if-hard-tepache/5261626"
        },
        {
            "title": "Berry Sour Kitchen",
            "type": "Sour - Fruited",
            "rating": 3.88,
            "url": "https://untappd.com/b/red-button-brewery-berry-sour-kitchen/5286844"
        },
        {
            "title": "D-Double Stout",
            "type": "Stout - American",
            "rating": 3.81,
            "url": "https://untappd.com/b/red-button-brewery-d-double-stout/1695214"
        },
        {
            "title": "Heller Bock (Islay)",
            "type": "Bock - Hell / Maibock / Lentebock",
            "rating": 3.59,
            "url": "https://untappd.com/b/red-button-brewery-heller-bock-islay/5101814"
        },
        {
            "title": "Opuntia Gose",
            "type": "Sour - Other Gose",
            "rating": 3.76,
            "url": "https://untappd.com/b/red-button-brewery-opuntia-gose/1636133"
        },
        {
            "title": "Evil Korets",
            "type": "Porter - Other",
            "rating": 3.19,
            "url": "https://untappd.com/b/red-button-brewery-evil-korets/1355629"
        },
        {
            "title": "Mono",
            "type": "Stout - Russian Imperial",
            "rating": 3.97,
            "url": "https://untappd.com/b/red-button-brewery-mono/3264353"
        },
        {
            "title": "Cosmic Lady",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 2.96,
            "url": "https://untappd.com/b/red-button-brewery-cosmic-lady/1355618"
        },
        {
            "title": "Mylo",
            "type": "Wild Ale - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/red-button-brewery-mylo/2617048"
        },
        {
            "title": "Cherrynade X Pomegranate",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.35,
            "url": "https://untappd.com/b/red-button-brewery-cherrynade-x-pomegranate/4985442"
        },
        {
            "title": "Bedroom Bedlam (ICED)",
            "type": "Cider - Ice / Applewine",
            "rating": 4.25,
            "url": "https://untappd.com/b/red-button-brewery-bedroom-bedlam-iced/2830956"
        },
        {
            "title": "Moonaqua",
            "type": "Sour - Other",
            "rating": 3.44,
            "url": "https://untappd.com/b/red-button-brewery-moonaqua/1450857"
        },
        {
            "title": "Protea",
            "type": "Stout - Other",
            "rating": 3.66,
            "url": "https://untappd.com/b/red-button-brewery-protea/1450851"
        },
        {
            "title": "Страховка от великой жажды",
            "type": "Pale Ale - Belgian",
            "rating": 3.74,
            "url": "https://untappd.com/b/red-button-brewery-strahovka-ot-velikoj-zhazhdy/2642096"
        },
        {
            "title": "XTV-1",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.27,
            "url": "https://untappd.com/b/red-button-brewery-xtv-1/5301145"
        },
        {
            "title": "Antigua",
            "type": "IPA - Other",
            "rating": 3.5,
            "url": "https://untappd.com/b/red-button-brewery-antigua/1450839"
        },
        {
            "title": "TART WHEAT STYLE",
            "type": "Wheat Beer - American Pale Wheat",
            "rating": 3.85,
            "url": "https://untappd.com/b/red-button-brewery-tart-wheat-style/1580144"
        },
        {
            "title": "FARMHOUSE STYLE",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.53,
            "url": "https://untappd.com/b/red-button-brewery-farmhouse-style/1580150"
        },
        {
            "title": "HARGED",
            "type": "Barleywine - English",
            "rating": 3.8,
            "url": "https://untappd.com/b/red-button-brewery-harged/3069047"
        },
        {
            "title": "Super U (B.A)",
            "type": "Mead - Melomel",
            "rating": 4.39,
            "url": "https://untappd.com/b/red-button-brewery-super-u-b-a/5193960"
        },
        {
            "title": "Techno",
            "type": "Porter - Other",
            "rating": 3.41,
            "url": "https://untappd.com/b/red-button-brewery-techno/1523255"
        },
        {
            "title": "Сосни лимон и залипни B.A.",
            "type": "Fruit Beer",
            "rating": 4.11,
            "url": "https://untappd.com/b/red-button-brewery-sosni-limon-i-zalipni-b-a/2314732"
        },
        {
            "title": "Go the N.A (Passion Batch)",
            "type": "Non-Alcoholic Beer - Sour",
            "rating": 3.91,
            "url": "https://untappd.com/b/red-button-brewery-go-the-n-a-passion-batch/5073919"
        },
        {
            "title": "POP",
            "type": "Pale Ale - American",
            "rating": 3.32,
            "url": "https://untappd.com/b/red-button-brewery-pop/1523306"
        },
        {
            "title": "Jazz",
            "type": "Stout - Other",
            "rating": 3.42,
            "url": "https://untappd.com/b/red-button-brewery-jazz/1523311"
        },
        {
            "title": "SPLIFIWAS (EIS ED.)",
            "type": "Wheat Beer - Wheat Wine",
            "rating": 4.1,
            "url": "https://untappd.com/b/red-button-brewery-splifiwas-eis-ed/2620178"
        },
        {
            "title": "Slow, Slow, Slow, Slow, Slowly Dying",
            "type": "Lager - Pale",
            "rating": 3.68,
            "url": "https://untappd.com/b/red-button-brewery-slow-slow-slow-slow-slowly-dying/3920270"
        },
        {
            "title": "English Breakfast (iced)",
            "type": "Strong Ale - Other",
            "rating": 3.66,
            "url": "https://untappd.com/b/red-button-brewery-english-breakfast-iced/2888520"
        },
        {
            "title": "Rock",
            "type": "Rye Beer",
            "rating": 3.49,
            "url": "https://untappd.com/b/red-button-brewery-rock/1523313"
        },
        {
            "title": "Sangri-la",
            "type": "Bière de Champagne / Bière Brut",
            "rating": 4.13,
            "url": "https://untappd.com/b/red-button-brewery-sangri-la/3925169"
        },
        {
            "title": "Easy As Can Be",
            "type": "Pilsner - Other",
            "rating": 3.46,
            "url": "https://untappd.com/b/red-button-brewery-easy-as-can-be/2883662"
        },
        {
            "title": "AD Stout",
            "type": "Stout - Other",
            "rating": 3.47,
            "url": "https://untappd.com/b/red-button-brewery-ad-stout/1662642"
        },
        {
            "title": "Некая симпатичная городская история (EIS ED)",
            "type": "Stout - Russian Imperial",
            "rating": null,
            "url": "https://untappd.com/b/red-button-brewery-nekaya-simpatichnaya-gorodskaya-istoriya-eis-ed/2657965"
        },
        {
            "title": "Elektromonteur",
            "type": "Fruit Beer",
            "rating": null,
            "url": "https://untappd.com/b/red-button-brewery-elektromonteur/2744440"
        },
        {
            "title": "Anti Lactose Club",
            "type": "Stout - Coffee",
            "rating": null,
            "url": "https://untappd.com/b/red-button-brewery-anti-lactose-club/5312156"
        },
        {
            "title": "HOQU Solutions (EIS ED.)",
            "type": "Stout - Other",
            "rating": null,
            "url": "https://untappd.com/b/red-button-brewery-hoqu-solutions-eis-ed/2892954"
        },
        {
            "title": "Pure Shores (Festival Edition)",
            "type": "Stout - Imperial / Double",
            "rating": null,
            "url": "https://untappd.com/b/red-button-brewery-pure-shores-festival-edition/3250537"
        },
        {
            "title": "Brouk",
            "type": "Fruit Beer",
            "rating": null,
            "url": "https://untappd.com/b/red-button-brewery-brouk/2479741"
        },
        {
            "title": "Sour Kitchen (EIS ED.)",
            "type": "Sour - Other",
            "rating": null,
            "url": "https://untappd.com/b/red-button-brewery-sour-kitchen-eis-ed/3203132"
        },
        {
            "title": "Kuts (Sea Buckthorn Batch)",
            "type": "Sour - Fruited Gose",
            "rating": null,
            "url": "https://untappd.com/b/red-button-brewery-kuts-sea-buckthorn-batch/5283248"
        },
        {
            "title": "Tulare",
            "type": "Fruit Beer",
            "rating": null,
            "url": "https://untappd.com/b/red-button-brewery-tulare/5313699"
        }
    ],
    "SALDENS": [
        {
            "title": "Tomato Gose",
            "type": "Sour - Other Gose",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose/1973701"
        },
        {
            "title": "Triple IPA (Chinook, Simcoe, Mosaic, Citra)",
            "type": "IPA - Triple",
            "rating": 4.11,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-chinook-simcoe-mosaic-citra/1263559"
        },
        {
            "title": "Violent Twins",
            "type": "IPA - Imperial / Double",
            "rating": 4.04,
            "url": "https://untappd.com/b/salden-s-brewery-violent-twins/851529"
        },
        {
            "title": "American IPA 4C",
            "type": "IPA - American",
            "rating": 3.95,
            "url": "https://untappd.com/b/salden-s-brewery-american-ipa-4c/1092950"
        },
        {
            "title": "Milkshake DIPA Mango",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-mango/2086339"
        },
        {
            "title": "Hazelnut Stout",
            "type": "Stout - Pastry",
            "rating": 3.82,
            "url": "https://untappd.com/b/salden-s-brewery-hazelnut-stout/1793291"
        },
        {
            "title": "American IPA Six Hops",
            "type": "IPA - American",
            "rating": 3.9,
            "url": "https://untappd.com/b/salden-s-brewery-american-ipa-six-hops/1394193"
        },
        {
            "title": "Old-School Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-old-school-double-ipa/1571083"
        },
        {
            "title": "Grapefruit Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-grapefruit-double-ipa/1806003"
        },
        {
            "title": "Oak Smoked Tomato Gose",
            "type": "Sour - Other Gose",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-oak-smoked-tomato-gose/2028401"
        },
        {
            "title": "Tomato Gose Chili Extra Hot Edition",
            "type": "Sour - Other Gose",
            "rating": 3.94,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-chili-extra-hot-edition/2579285"
        },
        {
            "title": "Pryanik Stout",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.68,
            "url": "https://untappd.com/b/salden-s-brewery-pryanik-stout/990322"
        },
        {
            "title": "Tears of Liberty",
            "type": "Pale Ale - American",
            "rating": 3.81,
            "url": "https://untappd.com/b/salden-s-brewery-tears-of-liberty/670063"
        },
        {
            "title": "Milkshake DIPA Coconut & Ice-Cream",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.79,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-coconut-and-ice-cream/2929769"
        },
        {
            "title": "Citra & Mosaic Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.97,
            "url": "https://untappd.com/b/salden-s-brewery-citra-and-mosaic-double-ipa/1076085"
        },
        {
            "title": "Tomato Gose Light Chili Edition",
            "type": "Sour - Other Gose",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-light-chili-edition/2170245"
        },
        {
            "title": "Insane Satyr",
            "type": "IPA - Red",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-insane-satyr/817707"
        },
        {
            "title": "Citra & Galaxy Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 4.05,
            "url": "https://untappd.com/b/salden-s-brewery-citra-and-galaxy-double-ipa/1256284"
        },
        {
            "title": "Double Chocolate Stout",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.79,
            "url": "https://untappd.com/b/salden-s-brewery-double-chocolate-stout/1835121"
        },
        {
            "title": "Sea Bastard",
            "type": "IPA - American",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-sea-bastard/668386"
        },
        {
            "title": "Imperial Sour Ale With Cheesecakes, Mango And Guava",
            "type": "Sour - Smoothie / Pastry",
            "rating": 3.9,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-sour-ale-with-cheesecakes-mango-and-guava/3573810"
        },
        {
            "title": "Oak Smoked Tomato Gose Light Chili Edition",
            "type": "Sour - Other Gose",
            "rating": 3.98,
            "url": "https://untappd.com/b/salden-s-brewery-oak-smoked-tomato-gose-light-chili-edition/3122568"
        },
        {
            "title": "#300 Vermont IPA",
            "type": "IPA - New England / Hazy",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-300-vermont-ipa/2257314"
        },
        {
            "title": "New England IPA",
            "type": "IPA - New England / Hazy",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-new-england-ipa/1865579"
        },
        {
            "title": "Simcoe & Mosaic Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 4.08,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-and-mosaic-double-ipa/1006256"
        },
        {
            "title": "Eskimo Stout",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-eskimo-stout/2553569"
        },
        {
            "title": "Simcoe & Mosaic Double IPA / Extra Hops Series",
            "type": "IPA - Imperial / Double",
            "rating": 4,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-and-mosaic-double-ipa-extra-hops-series/1823293"
        },
        {
            "title": "Yuzu Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-yuzu-double-ipa/2809781"
        },
        {
            "title": "Drunken Parrot",
            "type": "IPA - Black / Cascadian Dark Ale",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-drunken-parrot/792305"
        },
        {
            "title": "Sour Ale Passion Fruit",
            "type": "Sour - Fruited",
            "rating": 3.87,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-passion-fruit/1663314"
        },
        {
            "title": "Sour Ale Raspberry",
            "type": "Sour - Fruited",
            "rating": 3.81,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-raspberry/1592281"
        },
        {
            "title": "Tomato Gose Italian Edition",
            "type": "Sour - Other Gose",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-italian-edition/3739635"
        },
        {
            "title": "Mosaic IPA",
            "type": "IPA - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-mosaic-ipa/1603405"
        },
        {
            "title": "Oak Smoked Tomato Gose Light Chili Italian Edition",
            "type": "Sour - Other Gose",
            "rating": 4.01,
            "url": "https://untappd.com/b/salden-s-brewery-oak-smoked-tomato-gose-light-chili-italian-edition/3772743"
        },
        {
            "title": "Milk Stout",
            "type": "Stout - Milk / Sweet",
            "rating": 3.86,
            "url": "https://untappd.com/b/salden-s-brewery-milk-stout/523290"
        },
        {
            "title": "Triple Red IPA",
            "type": "IPA - Triple",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-triple-red-ipa/1803137"
        },
        {
            "title": "Ondine",
            "type": "IPA - Belgian",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-ondine/814328"
        },
        {
            "title": "Milkshake DIPA With Strawberry Puree",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-with-strawberry-puree/2019001"
        },
        {
            "title": "Lime Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.7,
            "url": "https://untappd.com/b/salden-s-brewery-lime-double-ipa/2061947"
        },
        {
            "title": "Double Milk Stout Espresso Edition",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-double-milk-stout-espresso-edition/1309455"
        },
        {
            "title": "Pryanik Stout Caramel Edition",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.79,
            "url": "https://untappd.com/b/salden-s-brewery-pryanik-stout-caramel-edition/1752547"
        },
        {
            "title": "Wild Ale With Cherry",
            "type": "Wild Ale - American",
            "rating": 3.87,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-with-cherry/2533102"
        },
        {
            "title": "Citra IPA",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-citra-ipa/1643129"
        },
        {
            "title": "Dortmund Lager",
            "type": "Lager - Dortmunder / Export",
            "rating": 3.61,
            "url": "https://untappd.com/b/salden-s-brewery-dortmund-lager/2755525"
        },
        {
            "title": "Triple IPA (Citra, Mosaic, Simcoe)",
            "type": "IPA - Triple",
            "rating": 3.97,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-citra-mosaic-simcoe/5209256"
        },
        {
            "title": "#100 American IPA",
            "type": "IPA - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-100-american-ipa/1309441"
        },
        {
            "title": "Pineapple IPA",
            "type": "IPA - Fruited",
            "rating": 3.63,
            "url": "https://untappd.com/b/salden-s-brewery-pineapple-ipa/2368474"
        },
        {
            "title": "Suncatcher",
            "type": "IPA - Rye",
            "rating": 3.92,
            "url": "https://untappd.com/b/salden-s-brewery-suncatcher/882424"
        },
        {
            "title": "Cherry Ale",
            "type": "Fruit Beer",
            "rating": 3.43,
            "url": "https://untappd.com/b/salden-s-brewery-cherry-ale/1757019"
        },
        {
            "title": "Gose",
            "type": "Sour - Traditional Gose",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-gose/1518422"
        },
        {
            "title": "New Zealand Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.86,
            "url": "https://untappd.com/b/salden-s-brewery-new-zealand-double-ipa/1213705"
        },
        {
            "title": "Sour Ale Yuzu",
            "type": "Sour - Fruited",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-yuzu/3160553"
        },
        {
            "title": "Sour Ale Mango",
            "type": "Sour - Fruited",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-mango/1559998"
        },
        {
            "title": "Kölsch",
            "type": "Kölsch",
            "rating": 3.5,
            "url": "https://untappd.com/b/salden-s-brewery-kolsch/523297"
        },
        {
            "title": "Strata IPA",
            "type": "IPA - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/salden-s-brewery-strata-ipa/4166599"
        },
        {
            "title": "Pryanik Stout 9.0 Edition",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.6,
            "url": "https://untappd.com/b/salden-s-brewery-pryanik-stout-9-0-edition/3078255"
        },
        {
            "title": "Wild Ale With Raspberry",
            "type": "Wild Ale - Other",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-with-raspberry/2655019"
        },
        {
            "title": "Baltic Porter",
            "type": "Porter - Baltic",
            "rating": 3.77,
            "url": "https://untappd.com/b/salden-s-brewery-baltic-porter/1127757"
        },
        {
            "title": "“Rum Baba” Stout",
            "type": "Stout - Pastry",
            "rating": 3.67,
            "url": "https://untappd.com/b/salden-s-brewery-rum-baba-stout/4016422"
        },
        {
            "title": "Strawberry Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-strawberry-double-ipa/1603394"
        },
        {
            "title": "Czech Pilsner",
            "type": "Pilsner - Czech / Bohemian",
            "rating": 3.54,
            "url": "https://untappd.com/b/salden-s-brewery-czech-pilsner/2188609"
        },
        {
            "title": "Cider Nelson Sauvin",
            "type": "Cider - Herbed / Spiced / Hopped",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-cider-nelson-sauvin/1888251"
        },
        {
            "title": "Australian Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 4.01,
            "url": "https://untappd.com/b/salden-s-brewery-australian-double-ipa/1102726"
        },
        {
            "title": "Milkshake DIPA Pina Colada",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-pina-colada/3599164"
        },
        {
            "title": "Milkshake DIPA Blueberry",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.68,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-blueberry/2322786"
        },
        {
            "title": "Imperial Rye Porter BA:Bourbon",
            "type": "Porter - Imperial / Double",
            "rating": 4,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-rye-porter-ba-bourbon/1239819"
        },
        {
            "title": "Milk IPA",
            "type": "IPA - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-milk-ipa/1762596"
        },
        {
            "title": "Smoothie Milk Sour Ale Mango & Banana",
            "type": "Sour - Smoothie / Pastry",
            "rating": 4.05,
            "url": "https://untappd.com/b/salden-s-brewery-smoothie-milk-sour-ale-mango-and-banana/4708209"
        },
        {
            "title": "Oak Smoked Tomato Gose Italian Edition",
            "type": "Sour - Other Gose",
            "rating": 3.92,
            "url": "https://untappd.com/b/salden-s-brewery-oak-smoked-tomato-gose-italian-edition/3694077"
        },
        {
            "title": "Smoked Porter",
            "type": "Smoked Beer",
            "rating": 3.71,
            "url": "https://untappd.com/b/salden-s-brewery-smoked-porter/523298"
        },
        {
            "title": "Triple IPA Blackcurrant",
            "type": "IPA - Triple",
            "rating": 3.78,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-blackcurrant/4123275"
        },
        {
            "title": "Tripel",
            "type": "Belgian Tripel",
            "rating": 3.64,
            "url": "https://untappd.com/b/salden-s-brewery-tripel/1032186"
        },
        {
            "title": "Milk Stout Coconut Edition Version 2.0",
            "type": "Stout - Milk / Sweet",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-milk-stout-coconut-edition-version-2-0/2144482"
        },
        {
            "title": "Rye Porter Port Salope",
            "type": "Porter - Other",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-rye-porter-port-salope/1048050"
        },
        {
            "title": "Oak Smoked Tomato Gose Chili Extra Hot Edition",
            "type": "Sour - Other Gose",
            "rating": 4.07,
            "url": "https://untappd.com/b/salden-s-brewery-oak-smoked-tomato-gose-chili-extra-hot-edition/2825785"
        },
        {
            "title": "Hazelnut Brown Ale",
            "type": "Brown Ale - Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/salden-s-brewery-hazelnut-brown-ale/1763803"
        },
        {
            "title": "Wild Ale Mixed Fermentation",
            "type": "Wild Ale - American",
            "rating": 4.07,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-mixed-fermentation/3527891"
        },
        {
            "title": "Wild Ale Batch #3",
            "type": "Wild Ale - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-batch-3/2999475"
        },
        {
            "title": "#400 Brut IPA",
            "type": "IPA - Brut",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-400-brut-ipa/3026288"
        },
        {
            "title": "Double Milk Stout",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-double-milk-stout/1273873"
        },
        {
            "title": "Cherry Ale 2.0",
            "type": "Fruit Beer",
            "rating": 3.3,
            "url": "https://untappd.com/b/salden-s-brewery-cherry-ale-2-0/3275375"
        },
        {
            "title": "Abyss Russian Imperial Stout",
            "type": "Stout - Russian Imperial",
            "rating": 3.98,
            "url": "https://untappd.com/b/saldens-abyss-russian-imperial-stout/753329"
        },
        {
            "title": "Belgian Blonde",
            "type": "Belgian Blonde",
            "rating": 3.55,
            "url": "https://untappd.com/b/saldens-belgian-blonde/523304"
        },
        {
            "title": "Wild Ale Batch #1",
            "type": "Wild Ale - American",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-batch-1/2513147"
        },
        {
            "title": "India Brown Ale",
            "type": "Brown Ale - American",
            "rating": 3.97,
            "url": "https://untappd.com/b/salden-s-brewery-india-brown-ale/998397"
        },
        {
            "title": "Hard Seltzer Grapefruit",
            "type": "Hard Seltzer",
            "rating": 3.35,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-grapefruit/3894778"
        },
        {
            "title": "Rye Porter Smoked Edition",
            "type": "Smoked Beer",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-rye-porter-smoked-edition/1092959"
        },
        {
            "title": "Orange IPA",
            "type": "IPA - Fruited",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-orange-ipa/4473520"
        },
        {
            "title": "Milkshake DIPA Blackcurrant",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.69,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-blackcurrant/2759721"
        },
        {
            "title": "Sour Ale With Sea Buckthorn Puree",
            "type": "Sour - Fruited",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-with-sea-buckthorn-puree/2018160"
        },
        {
            "title": "Milkshake DIPA Vanilla",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.74,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-vanilla/2050827"
        },
        {
            "title": "Milkshake DIPA Passion Fruit",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-passion-fruit/2743060"
        },
        {
            "title": "Czech Desitka",
            "type": "Pilsner - Czech / Bohemian",
            "rating": 3.58,
            "url": "https://untappd.com/b/salden-s-brewery-czech-desitka/4313949"
        },
        {
            "title": "Brett Saison",
            "type": "Brett Beer",
            "rating": 4.09,
            "url": "https://untappd.com/b/salden-s-brewery-brett/3220959"
        },
        {
            "title": "Russian Imperial Stout Aged With Bourbon Soaked Oak Chips",
            "type": "Stout - Russian Imperial",
            "rating": 4.17,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-aged-with-bourbon-soaked-oak-chips/1327043"
        },
        {
            "title": "Tomato Gose Chili Ultra Hot Edition",
            "type": "Sour - Other Gose",
            "rating": 3.86,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-chili-ultra-hot-edition/4121862"
        },
        {
            "title": "Galaxy IPA",
            "type": "IPA - American",
            "rating": 3.88,
            "url": "https://untappd.com/b/saldens-galaxy-ipa/990323"
        },
        {
            "title": "Simcoe IPA",
            "type": "IPA - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-ipa/1624220"
        },
        {
            "title": "Medusa IPA",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-medusa-ipa/4284765"
        },
        {
            "title": "Medusa",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-medusa/3645998"
        },
        {
            "title": "Equinox IPA",
            "type": "IPA - American",
            "rating": 3.92,
            "url": "https://untappd.com/b/salden-s-brewery-equinox-ipa/1031846"
        },
        {
            "title": "Captain Nemo",
            "type": "IPA - White / Wheat",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-captain-nemo/837551"
        },
        {
            "title": "Citra & Mosaic DIPA / Extra Hops Series",
            "type": "IPA - Imperial / Double",
            "rating": 4.04,
            "url": "https://untappd.com/b/salden-s-brewery-citra-and-mosaic-dipa-extra-hops-series/1833305"
        },
        {
            "title": "Double Red IPA",
            "type": "IPA - Red",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-double-red-ipa/1309446"
        },
        {
            "title": "Russian Imperial Stout",
            "type": "Stout - Russian Imperial",
            "rating": 4,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout/1041602"
        },
        {
            "title": "#600 Barleywine Barrel Aged",
            "type": "Barleywine - Other",
            "rating": 3.42,
            "url": "https://untappd.com/b/salden-s-brewery-600-barleywine-barrel-aged/4390474"
        },
        {
            "title": "Chocolate & Orange Stout",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-chocolate-and-orange-stout/4496783"
        },
        {
            "title": "Irish-Cream Stout",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.79,
            "url": "https://untappd.com/b/salden-s-brewery-irish-cream-stout/2489890"
        },
        {
            "title": "Russian Imperial Stout Single Malt Scotch Whisky Batch #1",
            "type": "Stout - Russian Imperial",
            "rating": 3.92,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-single-malt-scotch-whisky-batch-1/2031714"
        },
        {
            "title": "Brett DIPA Batch#1",
            "type": "IPA - Brett",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-brett-dipa-batch-1/3008636"
        },
        {
            "title": "Hopfen Weisse",
            "type": "Wheat Beer - Hopfenweisse",
            "rating": 3.66,
            "url": "https://untappd.com/b/salden-s-brewery-hopfen-weisse/1006411"
        },
        {
            "title": "Vanilla-Ice Cream Stout",
            "type": "Stout - Milk / Sweet",
            "rating": 3.78,
            "url": "https://untappd.com/b/salden-s-brewery-vanilla-ice-cream-stout/1803247"
        },
        {
            "title": "Oyster Stout",
            "type": "Stout - Oyster",
            "rating": 3.65,
            "url": "https://untappd.com/b/salden-s-brewery-oyster-stout/3573739"
        },
        {
            "title": "Wine Ale Riesling",
            "type": "Grape Ale - Other",
            "rating": 3.71,
            "url": "https://untappd.com/b/salden-s-brewery-wine-ale-riesling/4123286"
        },
        {
            "title": "Belgian Quadrupel batch #3 aged in bourbon barrels",
            "type": "Belgian Quadrupel",
            "rating": 4.08,
            "url": "https://untappd.com/b/salden-s-brewery-belgian-quadrupel-batch-3/3336097"
        },
        {
            "title": "English Barleywine Aged In Jack Daniels Bourbon Barrels",
            "type": "Barleywine - English",
            "rating": 4.02,
            "url": "https://untappd.com/b/salden-s-brewery-english-barleywine-aged-in-jack-daniels-bourbon-barrels/2182104"
        },
        {
            "title": "Milkshake DIPA With Raspberry Puree",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-with-raspberry-puree/2007322"
        },
        {
            "title": "Chili DIPA",
            "type": "Chilli / Chile Beer",
            "rating": 3.77,
            "url": "https://untappd.com/b/salden-s-brewery-chili-dipa/1941406"
        },
        {
            "title": "Milkshake Triple IPA with Blackcurrant puree",
            "type": "IPA - Triple",
            "rating": 3.59,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-triple-ipa-with-blackcurrant-puree/3751765"
        },
        {
            "title": "Milk Sour Ale Raspberry",
            "type": "Sour - Fruited",
            "rating": 3.61,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-raspberry/3941334"
        },
        {
            "title": "Koelship Batch #1",
            "type": "Lambic - Traditional",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-koelship-batch-1/2600469"
        },
        {
            "title": "Koelship",
            "type": "Wild Ale - Other",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-koelship/4186070"
        },
        {
            "title": "Sour Ale Nelson Sauvin",
            "type": "Sour - Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-nelson-sauvin/1508578"
        },
        {
            "title": "Sabro IPA",
            "type": "IPA - American",
            "rating": 3.81,
            "url": "https://untappd.com/b/salden-s-brewery-sabro-ipa/3660018"
        },
        {
            "title": "Doppelbock",
            "type": "Bock - Doppelbock",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-doppelbock/669828"
        },
        {
            "title": "NE Pale Ale",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.72,
            "url": "https://untappd.com/b/salden-s-brewery-ne-pale-ale/2533099"
        },
        {
            "title": "Milk Sour Ale Passion Fruit",
            "type": "Sour - Fruited",
            "rating": 3.7,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-passion-fruit/3955908"
        },
        {
            "title": "Tangerine IPA",
            "type": "IPA - Fruited",
            "rating": 3.69,
            "url": "https://untappd.com/b/salden-s-brewery-tangerine-ipa/2619392"
        },
        {
            "title": "Wild Ale Batch #2",
            "type": "Wild Ale - American",
            "rating": 4.02,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-batch-2/2974651"
        },
        {
            "title": "Citra & Vic Secret Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-citra-and-vic-secret-double-ipa/1479615"
        },
        {
            "title": "Cider Mosaic",
            "type": "Cider - Herbed / Spiced / Hopped",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-cider-mosaic/1683773"
        },
        {
            "title": "Brett DIPA Batch #2",
            "type": "IPA - Brett",
            "rating": 4.04,
            "url": "https://untappd.com/b/salden-s-brewery-brett-dipa-batch-2/3061820"
        },
        {
            "title": "Weissbier",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.46,
            "url": "https://untappd.com/b/salden-s-brewery-weissbier/523319"
        },
        {
            "title": "Sorachi Ace IPA",
            "type": "IPA - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/salden-s-brewery-sorachi-ace-ipa/1884998"
        },
        {
            "title": "Pryanik Stout 8.0 Edition",
            "type": "Winter Ale",
            "rating": 3.69,
            "url": "https://untappd.com/b/salden-s-brewery-pryanik-stout-8-0-edition/2528426"
        },
        {
            "title": "Pecan Chocolate Stout",
            "type": "Stout - Milk / Sweet",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-pecan-chocolate-stout/2542909"
        },
        {
            "title": "Wine Ale Chardonnay",
            "type": "Grape Ale - Other",
            "rating": 3.78,
            "url": "https://untappd.com/b/salden-s-brewery-wine-ale-chardonnay/4295546"
        },
        {
            "title": "Wild Ale With Cranberry",
            "type": "Wild Ale - American",
            "rating": 3.77,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-with-cranberry/2600476"
        },
        {
            "title": "Tomato Gose Light Chili Italian Edition",
            "type": "Sour - Other Gose",
            "rating": 3.92,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-light-chili-italian-edition/3860589"
        },
        {
            "title": "Rauchbier",
            "type": "Rauchbier",
            "rating": 3.55,
            "url": "https://untappd.com/b/salden-s-brewery-rauchbier/3464071"
        },
        {
            "title": "Galaxy & Mosaic Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 4.11,
            "url": "https://untappd.com/b/salden-s-brewery-galaxy-mosaic-double-ipa/1291810"
        },
        {
            "title": "100% Wheat Wine Aged In Jack Daniels Whisky Barrels",
            "type": "Wheat Beer - Wheat Wine",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-100-wheat-wine-aged-in-jack-daniels-whisky-barrels/2279342"
        },
        {
            "title": "Wild Ale with Blackcurrant",
            "type": "Wild Ale - Other",
            "rating": 3.47,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-with-blackcurrant/2794713"
        },
        {
            "title": "Belgian Strong Ale (Bourbon Barrel Aged)",
            "type": "Strong Ale - Other",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-belgian-strong-ale-bourbon-barrel-aged/3263712"
        },
        {
            "title": "Juniper IPA",
            "type": "IPA - American",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-juniper-ipa/4263913"
        },
        {
            "title": "Gose With Raspberry Puree",
            "type": "Sour - Fruited Gose",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-gose-with-raspberry-puree/2776595"
        },
        {
            "title": "Nelson Sauvin IPA",
            "type": "IPA - New Zealand",
            "rating": 3.95,
            "url": "https://untappd.com/b/salden-s-brewery-nelson-sauvin-ipa/1424066"
        },
        {
            "title": "HBC#472 IPA",
            "type": "IPA - American",
            "rating": 3.77,
            "url": "https://untappd.com/b/salden-s-brewery-hbc-472-ipa/3716758"
        },
        {
            "title": "Sweet Stout Cola",
            "type": "Stout - Other",
            "rating": 3.03,
            "url": "https://untappd.com/b/salden-s-brewery-sweet-cola-stout/3935937"
        },
        {
            "title": "Chili IPA",
            "type": "Chilli / Chile Beer",
            "rating": 3.74,
            "url": "https://untappd.com/b/salden-s-brewery-chili-ipa/2258690"
        },
        {
            "title": "Hard Seltzer Mango & Pineapple",
            "type": "Hard Seltzer",
            "rating": 3.27,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-mango-and-pineapple/3935815"
        },
        {
            "title": "Wild Graff",
            "type": "Cider - Graff",
            "rating": 3.86,
            "url": "https://untappd.com/b/salden-s-brewery-wild-graff/4486510"
        },
        {
            "title": "100% Wheat Double IPA Zero IBU",
            "type": "IPA - Imperial / Double",
            "rating": 3.78,
            "url": "https://untappd.com/b/salden-s-brewery-100-wheat-double-ipa-zero-ibu/4263915"
        },
        {
            "title": "Cider Citra",
            "type": "Cider - Herbed / Spiced / Hopped",
            "rating": 3.78,
            "url": "https://untappd.com/b/salden-s-brewery-cider-citra/2800034"
        },
        {
            "title": "Milkshake IPA Coconut & Ice-Cream",
            "type": "IPA - Milkshake",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-ipa-coconut-and-ice-cream/3588495"
        },
        {
            "title": "American Pilsner",
            "type": "Pilsner - Other",
            "rating": 3.67,
            "url": "https://untappd.com/b/salden-s-brewery-american-pilsner/1424094"
        },
        {
            "title": "Milkshake DIPA Banana & Coconut",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-banana-and-coconut/3264303"
        },
        {
            "title": "Biscuit Stout",
            "type": "Stout - English",
            "rating": 3.6,
            "url": "https://untappd.com/b/salden-s-brewery-biscuit-stout/3008824"
        },
        {
            "title": "Chinook IPA",
            "type": "IPA - American",
            "rating": 3.74,
            "url": "https://untappd.com/b/salden-s-brewery-chinook-ipa/1742428"
        },
        {
            "title": "Tomato Gose Provence Edition",
            "type": "Sour - Other Gose",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-provence-edition/4242757"
        },
        {
            "title": "Pryanik Stout 5.0 Edition",
            "type": "Winter Ale",
            "rating": 3.95,
            "url": "https://untappd.com/b/salden-s-brewery-pryanik-stout-5-0-edition/1374077"
        },
        {
            "title": "Wine Ale Muscat",
            "type": "Grape Ale - Other",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-wine-ale-muscat/4378576"
        },
        {
            "title": "Belgian Dark Strong Ale",
            "type": "Belgian Strong Dark Ale",
            "rating": 3.81,
            "url": "https://untappd.com/b/salden-s-brewery-belgian-dark-strong-ale/1015435"
        },
        {
            "title": "Imperial Hazelnut Stout",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-hazelnut-stout/1922174"
        },
        {
            "title": "Sour Ale Cranberry",
            "type": "Sour - Fruited",
            "rating": 3.68,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-cranberry/2247178"
        },
        {
            "title": "Sour Ale Passion Fruit & Ice-Cream",
            "type": "Sour - Fruited",
            "rating": 4,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-passion-fruit-and-ice-cream/2802266"
        },
        {
            "title": "Tomato Gose Mexican Edition",
            "type": "Sour - Other Gose",
            "rating": 3.59,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-mexican-edition/4507931"
        },
        {
            "title": "Koelship Batch #2",
            "type": "Wild Ale - American",
            "rating": 4,
            "url": "https://untappd.com/b/salden-s-brewery-koelship-batch-2/3416487"
        },
        {
            "title": "Sour New England IPA Passion Fruit",
            "type": "IPA - Sour",
            "rating": 3.77,
            "url": "https://untappd.com/b/salden-s-brewery-sour-new-england-ipa-passion-fruit/3244271"
        },
        {
            "title": "Talus IPA",
            "type": "IPA - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-talus-ipa/4516585"
        },
        {
            "title": "Pryanik Stout 7.0 Edition",
            "type": "Winter Ale",
            "rating": 3.82,
            "url": "https://untappd.com/b/salden-s-brewery-pryanik-stout-7-0-edition/1906508"
        },
        {
            "title": "Centennial IPA",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-centennial-ipa/1663309"
        },
        {
            "title": "Five Grains Porter",
            "type": "Porter - Other",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-five-grains-porter/1973800"
        },
        {
            "title": "Oatmeal Stout",
            "type": "Stout - Oatmeal",
            "rating": 3.48,
            "url": "https://untappd.com/b/salden-s-brewery-oatmeal-stout/674097"
        },
        {
            "title": "Chocolate Milkshake With Banana Puree",
            "type": "IPA - Milkshake",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-chocolate-milkshake-with-banana-puree/2257508"
        },
        {
            "title": "Barricade",
            "type": "Stout - Russian Imperial",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-barricade/2657372"
        },
        {
            "title": "Russian Imperial Stout maturated on Tequila soaked oak Chips",
            "type": "Stout - Russian Imperial",
            "rating": 4.06,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-maturated-on-tequila-soaked-oak-chips/1594495"
        },
        {
            "title": "New England Double IPA",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-new-england-double-ipa/1903536"
        },
        {
            "title": "Carrot Cream Ale",
            "type": "Cream Ale",
            "rating": 3.51,
            "url": "https://untappd.com/b/salden-s-brewery-carrot-cream-ale/2109589"
        },
        {
            "title": "Milkshake DIPA With Banana Puree",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.67,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-with-banana-puree/2819467"
        },
        {
            "title": "New England IPA ver.2",
            "type": "IPA - New England / Hazy",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-new-england-ipa-ver-2/1974785"
        },
        {
            "title": "Milkshake DIPA Lychee",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.46,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-lychee/4027864"
        },
        {
            "title": "Milk Sour Ale Guava & Passion Fruit",
            "type": "Sour - Fruited",
            "rating": 3.77,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-guava-and-passion-fruit/3906450"
        },
        {
            "title": "Australian Pale Ale",
            "type": "Pale Ale - Australian",
            "rating": 3.82,
            "url": "https://untappd.com/b/salden-s-brewery-australian-pale-ale/1230563"
        },
        {
            "title": "Berliner Weisse With Blackcurrant Puree",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-berliner-weisse-with-blackcurrant-puree/1571373"
        },
        {
            "title": "Stout Salt & Caramel",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.68,
            "url": "https://untappd.com/b/salden-s-brewery-stout-salt-and-caramel/4155673"
        },
        {
            "title": "Sour Ale Tangerine",
            "type": "Sour - Fruited",
            "rating": 3.24,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-tangerine/3905851"
        },
        {
            "title": "Milkshake DIPA Banana And Mango",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-banana-and-mango/2701226"
        },
        {
            "title": "Rye Porter",
            "type": "Porter - Other",
            "rating": 3.92,
            "url": "https://untappd.com/b/saldens-rye-porter/889683"
        },
        {
            "title": "Berliner Weisse With Plum Puree",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-berliner-weisse-with-plum-puree/1539246"
        },
        {
            "title": "Wild Rye Saison",
            "type": "Wild Ale - Other",
            "rating": 4.02,
            "url": "https://untappd.com/b/salden-s-brewery-wild-rye-saison/4617527"
        },
        {
            "title": "Wild Ale Batch #4",
            "type": "Wild Ale - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-batch-4/3244177"
        },
        {
            "title": "IPA Cashmere",
            "type": "IPA - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/salden-s-brewery-ipa-cashmere/4242754"
        },
        {
            "title": "Imperial Sour Ale Cherry Pie",
            "type": "Sour - Fruited",
            "rating": 3.66,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-sour-ale-cherry-pie/3506560"
        },
        {
            "title": "Simcoe & Mosaic IPA",
            "type": "IPA - American",
            "rating": 3.77,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-and-mosaic-ipa/3475553"
        },
        {
            "title": "Zappa IPA",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-zappa-ipa/4903925"
        },
        {
            "title": "Wild Ale With Cherry Batch #2",
            "type": "Wild Ale - Other",
            "rating": 3.95,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-with-cherry-batch-2/2984391"
        },
        {
            "title": "Amarillo IPA",
            "type": "IPA - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/salden-s-brewery-amarillo-ipa/1703086"
        },
        {
            "title": "#401 Brut IPA",
            "type": "IPA - Brut",
            "rating": 3.71,
            "url": "https://untappd.com/b/salden-s-brewery-401-brut-ipa/3112353"
        },
        {
            "title": "American Pale Ale Zappa",
            "type": "Pale Ale - American",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-american-pale-ale-zappa/3627696"
        },
        {
            "title": "10th Anniversary Russian Imperial Stout",
            "type": "Stout - Russian Imperial",
            "rating": 4.08,
            "url": "https://untappd.com/b/salden-s-brewery-10th-anniversary-russian-imperial-stout/5133547"
        },
        {
            "title": "Wild Braggot",
            "type": "Mead - Braggot",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-wild-braggot/3596487"
        },
        {
            "title": "Russian Imperial Stout Batch #18 Aged In Jack Daniels Barrels",
            "type": "Stout - Russian Imperial",
            "rating": 4.15,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-batch-18/4725959"
        },
        {
            "title": "Grapefruit Sour Ale",
            "type": "Sour - Fruited",
            "rating": 3.62,
            "url": "https://untappd.com/b/salden-s-brewery-grapefruit-sour-ale/2087584"
        },
        {
            "title": "Sour Ale With Cherry Puree",
            "type": "Sour - Fruited",
            "rating": 3.71,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-with-cherry-puree/1620706"
        },
        {
            "title": "Pecan Pie Stout",
            "type": "Stout - Pastry",
            "rating": 3.66,
            "url": "https://untappd.com/b/salden-s-brewery-pecan-pie-stout/3718037"
        },
        {
            "title": "Milkshake DIPA Guava",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.61,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-guava/3682528"
        },
        {
            "title": "Vermont DIPA",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.65,
            "url": "https://untappd.com/b/salden-s-brewery-vermont-dipa/2145356"
        },
        {
            "title": "Idaho Gem IPA",
            "type": "IPA - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/salden-s-brewery-idaho-gem-ipa/4571940"
        },
        {
            "title": "Imperial Baltic Porter Aged In Jack Daniels Barrels",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.06,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-baltic-porter-aged-in-jack-daniels-barrels/2335868"
        },
        {
            "title": "Double India Brown Ale",
            "type": "Brown Ale - Imperial / Double",
            "rating": 3.69,
            "url": "https://untappd.com/b/salden-s-brewery-double-india-brown-ale/3913218"
        },
        {
            "title": "Wild Wine Ale Chardonnay Batch #1",
            "type": "Wild Ale - Other",
            "rating": 3.99,
            "url": "https://untappd.com/b/salden-s-brewery-wild-wine-ale-chardonnay-batch-1/4834362"
        },
        {
            "title": "Wine Ale Syrah",
            "type": "Grape Ale - Other",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-wine-ale-syrah/4534003"
        },
        {
            "title": "Milkshake Triple IPA With Mango Puree",
            "type": "IPA - Triple",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-triple-ipa-with-mango-puree/3637285"
        },
        {
            "title": "Denali & Eureka Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-denali-and-eureka-double-ipa/2802090"
        },
        {
            "title": "Wine Ale Alicante",
            "type": "Grape Ale - Other",
            "rating": 3.87,
            "url": "https://untappd.com/b/salden-s-brewery-wine-ale-alicante/4839527"
        },
        {
            "title": "Russian Imperial Stout Single Malt Scotch Whisky Batch #2",
            "type": "Stout - Russian Imperial",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-single-malt-scotch-whisky-batch-2/2124987"
        },
        {
            "title": "Russian Imperial Stout Coconut Edition Aged In Jack Daniels Barrels",
            "type": "Stout - Russian Imperial",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-rusian-imperial-stout-coconut-edition-aged-in-jack-daniels-barrels/3426965"
        },
        {
            "title": "Blueberry Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.5,
            "url": "https://untappd.com/b/salden-s-brewery-blueberry-double-ipa/4564587"
        },
        {
            "title": "Bamboo IPA",
            "type": "IPA - American",
            "rating": 3.67,
            "url": "https://untappd.com/b/salden-s-brewery-bamboo-ipa/4764679"
        },
        {
            "title": "Triumph IPA",
            "type": "IPA - American",
            "rating": 3.54,
            "url": "https://untappd.com/b/salden-s-brewery-ipa-triumph/4313947"
        },
        {
            "title": "100% Wheat IPA",
            "type": "IPA - White / Wheat",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-100-wheat-ipa/1912511"
        },
        {
            "title": "Malt Liquor",
            "type": "Malt Liquor",
            "rating": 3.53,
            "url": "https://untappd.com/b/salden-s-brewery-malt-liquor/3883987"
        },
        {
            "title": "Malt Liquor Aged In Scotch Whisky Barrels",
            "type": "Malt Liquor",
            "rating": 4.03,
            "url": "https://untappd.com/b/salden-s-brewery-malt-liquor-aged-in-scotch-whisky-barrels/2440461"
        },
        {
            "title": "Sour Ale Ice-Cream & Raspberry",
            "type": "Sour - Fruited",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-ice-cream-and-raspberry/2754248"
        },
        {
            "title": "Belgian Quadrupel Aged In Jack Daniels Barrels Batch #1",
            "type": "Belgian Quadrupel",
            "rating": 4.11,
            "url": "https://untappd.com/b/salden-s-brewery-bourbon-barrel-aged-belgian-quadrupel/2300715"
        },
        {
            "title": "Local Lager",
            "type": "Lager - Pale",
            "rating": 3.49,
            "url": "https://untappd.com/b/salden-s-brewery-local-lager/3148215"
        },
        {
            "title": "Mead Aged In Bourbon Barrels",
            "type": "Mead - Other",
            "rating": 4.1,
            "url": "https://untappd.com/b/salden-s-brewery-mead-aged-in-burbon-barrels/3038583"
        },
        {
            "title": "Australian Double IPL",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-australian-double-ipl/3824714"
        },
        {
            "title": "Triple IPA New Zealand",
            "type": "IPA - Triple",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-new-zealand/4024730"
        },
        {
            "title": "Wild Ale Amalgamation",
            "type": "Wild Ale - Other",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-amalgamation/3397644"
        },
        {
            "title": "Triple IPA Aged Jack Daniels Barrels",
            "type": "IPA - Triple",
            "rating": 3.44,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-aged-jack-daniels-barrels/3509439"
        },
        {
            "title": "Gose With Sea Buckthorn Puree",
            "type": "Sour - Fruited Gose",
            "rating": 3.67,
            "url": "https://untappd.com/b/salden-s-brewery-gose-with-sea-buckthorn-puree/3506245"
        },
        {
            "title": "Oak Smoked Tomato Gose Provence Edition",
            "type": "Sour - Other Gose",
            "rating": 3.81,
            "url": "https://untappd.com/b/salden-s-brewery-oak-smoked-tomato-gose-provence-edition/4385711"
        },
        {
            "title": "Tomato Gose Russian Edition",
            "type": "Sour - Other Gose",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-russian-ed/4773403"
        },
        {
            "title": "India Rye Red Ale",
            "type": "Red Ale - American Amber / Red",
            "rating": 3.95,
            "url": "https://untappd.com/b/salden-s-brewery-india-rye-red-ale/1102003"
        },
        {
            "title": "Wine Ale Pinot Noir",
            "type": "Grape Ale - Other",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-wine-ale-pinot-noir/5018021"
        },
        {
            "title": "Caramel-Ice Cream Stout",
            "type": "Stout - Milk / Sweet",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-caramel-ice-cream-stout/2018127"
        },
        {
            "title": "100% Brett Ale",
            "type": "Brett Beer",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-100-brett-ale/3239611"
        },
        {
            "title": "HBC #630 IPA",
            "type": "IPA - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-hbc-630-ipa/4668983"
        },
        {
            "title": "Raspberry Porter",
            "type": "Porter - Other",
            "rating": 3.62,
            "url": "https://untappd.com/b/salden-s-brewery-raspberry-porter/1784090"
        },
        {
            "title": "English ESB",
            "type": "Bitter - Extra Special / Strong (ESB)",
            "rating": 3.47,
            "url": "https://untappd.com/b/salden-s-brewery-english-esb/3008456"
        },
        {
            "title": "Russian Imperial Stout Hazelnut Edition Aged In Jack Daniels Barrels",
            "type": "Stout - Russian Imperial",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-hazelnut-edition-aged-in-jack-daniels-barrels/3426970"
        },
        {
            "title": "Wine Ale Malbec",
            "type": "Grape Ale - Other",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-wine-ale-malbec/4607829"
        },
        {
            "title": "Cider Biodynamic / Aged In Oak Foeder / Freezed-out",
            "type": "Cider - Ice / Applewine",
            "rating": 3.97,
            "url": "https://untappd.com/b/salden-s-brewery-cider-biodynamic-aged-in-oak-foeder-freezed-out/2963618"
        },
        {
            "title": "Kirsch Gose",
            "type": "Sour - Fruited Gose",
            "rating": 3.4,
            "url": "https://untappd.com/b/salden-s-brewery-kirsch-gose/4485405"
        },
        {
            "title": "Robust Porter",
            "type": "Porter - Other",
            "rating": 3.61,
            "url": "https://untappd.com/b/salden-s-brewery-robust-porter/1484149"
        },
        {
            "title": "Altbier",
            "type": "Altbier",
            "rating": 3.61,
            "url": "https://untappd.com/b/salden-s-brewery-altbier/3855586"
        },
        {
            "title": "Wild Ale Foeder",
            "type": "Wild Ale - Other",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-foeder/4476768"
        },
        {
            "title": "Bock Bier",
            "type": "Bock - Single / Traditional",
            "rating": 3.59,
            "url": "https://untappd.com/b/salden-s-brewery-bock-bier/1430601"
        },
        {
            "title": "American Barleywine Aged In Macallan Whisky Barrels Batch #2",
            "type": "Barleywine - American",
            "rating": 3.78,
            "url": "https://untappd.com/b/salden-s-brewery-american-barleywine-aged-in-macallan-whisky-barrells-batch-2/2941186"
        },
        {
            "title": "#200 American IPA",
            "type": "IPA - American",
            "rating": 4,
            "url": "https://untappd.com/b/salden-s-brewery-200-american-ipa/1823276"
        },
        {
            "title": "Tomato Gose Light Chili Provence Edition",
            "type": "Sour - Other Gose",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-light-chili-provence-edition/4263917"
        },
        {
            "title": "Lychee IPA",
            "type": "IPA - Fruited",
            "rating": 3.58,
            "url": "https://untappd.com/b/salden-s-brewery-lychee-ipa/4637181"
        },
        {
            "title": "Cider Biodynamic, Aged In Oak Foeder Batch #2",
            "type": "Cider - Dry",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-cider-biodynamic-aged-in-oak-foeder-batch-2/3503617"
        },
        {
            "title": "Milk Ale Carrot & Pumpkin",
            "type": "Fruit Beer",
            "rating": 3.28,
            "url": "https://untappd.com/b/salden-s-brewery-milk-ale-carrot-and-pumpkin/4263911"
        },
        {
            "title": "Milk Sour Ale Mango,Guava & Passion Fruit",
            "type": "Sour - Fruited",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-mango-guava-and-passion-fruit/4316370"
        },
        {
            "title": "Russian Imperial Stout Batch #16",
            "type": "Stout - Russian Imperial",
            "rating": 4.01,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-batch-16/4354044"
        },
        {
            "title": "Oatmeal DIPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-oatmeal-dipa/1985541"
        },
        {
            "title": "New England Double IPA 3.0 Edition",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.64,
            "url": "https://untappd.com/b/salden-s-brewery-new-england-double-ipa-3-0-edition/2438985"
        },
        {
            "title": "Galaxy & Amarillo Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 4.05,
            "url": "https://untappd.com/b/salden-s-brewery-galaxy-amarillo-double-ipa/1048830"
        },
        {
            "title": "Citra & Chinook Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.87,
            "url": "https://untappd.com/b/salden-s-brewery-citra-and-chinook-double-ipa/1907622"
        },
        {
            "title": "Bamboo Ale",
            "type": "Spiced / Herbed Beer",
            "rating": 3.23,
            "url": "https://untappd.com/b/salden-s-brewery-bamboo-ale/938281"
        },
        {
            "title": "Sour Ale With Blackcurrant Puree",
            "type": "Sour - Fruited",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-with-blackcurrant-puree/1703080"
        },
        {
            "title": "Sour Ale With Plum Puree",
            "type": "Sour - Fruited",
            "rating": 3.63,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-with-plum-puree/2132555"
        },
        {
            "title": "Russian Imperial Stout Aged In Bourbon Whisky Batch #3",
            "type": "Stout - Russian Imperial",
            "rating": 4.19,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-aged-in-bourbon-whisky-batch-3/2257480"
        },
        {
            "title": "Brut American Pale Ale",
            "type": "Pale Ale - American",
            "rating": 3.34,
            "url": "https://untappd.com/b/salden-s-brewery-brut-american-pale-ale/3985514"
        },
        {
            "title": "Sour IPA Citra & Equinox",
            "type": "IPA - Sour",
            "rating": 3.99,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ipa-citra-and-equinox/1520783"
        },
        {
            "title": "Sour Ale Raspberry Cake",
            "type": "Sour - Fruited",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-raspberry-cake/2926646"
        },
        {
            "title": "Imperial IPA",
            "type": "IPA - Triple",
            "rating": 3.94,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-ipa/3228822"
        },
        {
            "title": "Cider Biodynamic 2020 Foeder 6",
            "type": "Cider - Dry",
            "rating": 3.97,
            "url": "https://untappd.com/b/salden-s-brewery-cider-biodynamic-2020-foeder-6/4754988"
        },
        {
            "title": "English Barleywine",
            "type": "Barleywine - English",
            "rating": 3.57,
            "url": "https://untappd.com/b/salden-s-brewery-english-barleywine/1595000"
        },
        {
            "title": "IPA Zero IBU",
            "type": "IPA - American",
            "rating": 3.71,
            "url": "https://untappd.com/b/salden-s-brewery-ipa-zero-ibu/4203033"
        },
        {
            "title": "American IPA With Orange Juice",
            "type": "IPA - American",
            "rating": 3.65,
            "url": "https://untappd.com/b/salden-s-brewery-american-ipa-with-orange-juice/1772876"
        },
        {
            "title": "English Barleywine Aged In Jack Daniels Barrels Batch #2",
            "type": "Barleywine - English",
            "rating": 4.08,
            "url": "https://untappd.com/b/salden-s-brewery-english-barleywine-aged-in-jack-daniels-barrels-batch-2/2416399"
        },
        {
            "title": "100% Wheat IPA Citra",
            "type": "IPA - White / Wheat",
            "rating": 3.82,
            "url": "https://untappd.com/b/salden-s-brewery-100-wheat-ipa-citra/3703803"
        },
        {
            "title": "Sour IPA Citra & Mosaic",
            "type": "IPA - Sour",
            "rating": 3.69,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ipa-citra-and-mosaic/3209103"
        },
        {
            "title": "Golden Lager",
            "type": "Lager - Pale",
            "rating": 3.68,
            "url": "https://untappd.com/b/salden-s-brewery-golden-lager/993773"
        },
        {
            "title": "Imperial Porter Aged In Cognac Barrels",
            "type": "Porter - Imperial / Double",
            "rating": 4.05,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-porter-aged-in-cognac-barrels/2957287"
        },
        {
            "title": "Milk Sour Ale Raspberry & Passion Fruit Extra Fruit Version",
            "type": "Sour - Fruited",
            "rating": 3.63,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-raspberry-and-passion-fruit-extra-fruit-version/4192162"
        },
        {
            "title": "Mango DIPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-mango-dipa/2023936"
        },
        {
            "title": "Medusa & Denali Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-medusa-and-denali-double-ipa/2503556"
        },
        {
            "title": "American Pale Ale Sabro & Citra",
            "type": "Pale Ale - American",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-american-pale-ale-sabro-and-citra/3874591"
        },
        {
            "title": "Lambic",
            "type": "Wild Ale - Other",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-lambic/3945430"
        },
        {
            "title": "Milkshake DIPA",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.77,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa/1951653"
        },
        {
            "title": "Witbier",
            "type": "Wheat Beer - Witbier / Blanche",
            "rating": 3.49,
            "url": "https://untappd.com/b/salden-s-brewery-witbier/523288"
        },
        {
            "title": "English Barleywine Aged In Jack Daniels Barrels Batch #3",
            "type": "Barleywine - English",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-english-barleywine-aged-in-jack-daniels-barrels-batch-3/3235844"
        },
        {
            "title": "Cascade IPA",
            "type": "IPA - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-cascade-ipa/4629985"
        },
        {
            "title": "Imperial Porter Aged In Cognac Barrels Batch #2",
            "type": "Porter - Imperial / Double",
            "rating": 3.92,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-porter-aged-in-cognac-barrels-batch-2/3094285"
        },
        {
            "title": "Vermont DIPA With Raspberry Puree",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.59,
            "url": "https://untappd.com/b/salden-s-brewery-vermont-dipa-with-raspberry-puree/2179017"
        },
        {
            "title": "Vermont DIPA Edition 2.0",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.74,
            "url": "https://untappd.com/b/salden-s-brewery-vermont-dipa-edition-2-0/2312895"
        },
        {
            "title": "Vermont IPA",
            "type": "IPA - New England / Hazy",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-vermont-ipa/2109637"
        },
        {
            "title": "Cider Biodynamic / Aged in Oak Foeder",
            "type": "Cider - Dry",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-cider-biodynamic-aged-in-oak-foeder/3075054"
        },
        {
            "title": "Pecan&Ice Cream Stout",
            "type": "Stout - Milk / Sweet",
            "rating": 3.6,
            "url": "https://untappd.com/b/salden-s-brewery-pecan-and-ice-cream-stout/3370038"
        },
        {
            "title": "Tomato Gose Chili Ultra Hot Italian Edition",
            "type": "Sour - Other Gose",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-chili-ultra-hot-italian-edition/4284768"
        },
        {
            "title": "Micro IPA New England",
            "type": "IPA - New England / Hazy",
            "rating": 3.61,
            "url": "https://untappd.com/b/salden-s-brewery-micro-ipa-new-england/3335907"
        },
        {
            "title": "Russian Imperial Stout Batch #17 Aged In Jack Daniels Barrels",
            "type": "Stout - Russian Imperial",
            "rating": 4.1,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-batch-17-aged-in-jack-daniels-barrels/3611920"
        },
        {
            "title": "Tomato Gose Light Chili Mexican Edition",
            "type": "Sour - Other Gose",
            "rating": 3.68,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-light-chili-mexican-edition/4396647"
        },
        {
            "title": "Double IPA With Raspberry Puree",
            "type": "IPA - Imperial / Double",
            "rating": 3.86,
            "url": "https://untappd.com/b/salden-s-brewery-double-ipa-with-raspberry-puree/1732133"
        },
        {
            "title": "Vanilla Milkshake IPA",
            "type": "IPA - Milkshake",
            "rating": 3.66,
            "url": "https://untappd.com/b/salden-s-brewery-vanilla-milkshake-ipa/3475038"
        },
        {
            "title": "Cacao Stout",
            "type": "Stout - Other",
            "rating": 3.58,
            "url": "https://untappd.com/b/salden-s-brewery-cacao-stout/2612713"
        },
        {
            "title": "American Barleywine 2022 year",
            "type": "Barleywine - American",
            "rating": 4.02,
            "url": "https://untappd.com/b/salden-s-brewery-american-barleywine-2022-year/5161116"
        },
        {
            "title": "Simcoe & Mosaic Double IPA Lupulin Edition",
            "type": "IPA - Imperial / Double",
            "rating": 3.82,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-and-mosaic-double-ipa-lupulin-edition/2576852"
        },
        {
            "title": "American Pale Ale Galaxy & Mosaic",
            "type": "Pale Ale - American",
            "rating": 3.55,
            "url": "https://untappd.com/b/salden-s-brewery-american-pale-ale-galaxy-and-mosaic/3598970"
        },
        {
            "title": "No Alco",
            "type": "Non-Alcoholic Beer - Other",
            "rating": 3.48,
            "url": "https://untappd.com/b/salden-s-brewery-no-alco/4717444"
        },
        {
            "title": "Session IPA vol.2",
            "type": "IPA - Session",
            "rating": 3.74,
            "url": "https://untappd.com/b/salden-s-brewery-session-ipa-vol-2/1560004"
        },
        {
            "title": "AIPA#344",
            "type": "IPA - American",
            "rating": 3.97,
            "url": "https://untappd.com/b/saldens-aipa-344/944182"
        },
        {
            "title": "Sour Ale Citra",
            "type": "Sour - Other",
            "rating": 3.86,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-citra/1531334"
        },
        {
            "title": "Pryanik Stout 4.0 Edition",
            "type": "Winter Ale",
            "rating": 3.92,
            "url": "https://untappd.com/b/salden-s-brewery-pryanik-stout-4-0-edition/1257231"
        },
        {
            "title": "Russian Imperial Stout version 2",
            "type": "Stout - Russian Imperial",
            "rating": 3.87,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-version-2/1292143"
        },
        {
            "title": "Citra & Simcoe Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-citra-and-simcoe-double-ipa/1686518"
        },
        {
            "title": "Russian Imperial Stout \"Rum Baba\" Ed.",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 4.02,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-rum-baba-ed/3885922"
        },
        {
            "title": "Dunkel",
            "type": "Lager - Munich Dunkel",
            "rating": 3.58,
            "url": "https://untappd.com/b/salden-s-brewery-dunkel/523300"
        },
        {
            "title": "AIPA #430",
            "type": "IPA - American",
            "rating": 3.95,
            "url": "https://untappd.com/b/saldens-aipa-430/982649"
        },
        {
            "title": "Chocolate Stout",
            "type": "Stout - Milk / Sweet",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-chocolate-stout/1743511"
        },
        {
            "title": "Cider Amarillo",
            "type": "Cider - Herbed / Spiced / Hopped",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-cider-amarillo/3397648"
        },
        {
            "title": "American IPA Recipe#2",
            "type": "IPA - American",
            "rating": 3.9,
            "url": "https://untappd.com/b/salden-s-brewery-american-ipa-recipe-2/1066056"
        },
        {
            "title": "Milkshake DIPA Guava And Mango",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.69,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-guava-and-mango/3416249"
        },
        {
            "title": "Hard Seltzer Lime&Mint",
            "type": "Hard Seltzer",
            "rating": 3.36,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-lime-and-mint/3931211"
        },
        {
            "title": "Sour Ale Blackcurrant Cake",
            "type": "Sour - Fruited",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-blackcurrant-cake/2874308"
        },
        {
            "title": "New England IPA Citra & Simcoe",
            "type": "IPA - New England / Hazy",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-citra-and-simcoe/3294160"
        },
        {
            "title": "Russian Imperial Stout Aged With Rum Soaked Oak Chips",
            "type": "Stout - Russian Imperial",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-aged-with-rum-soaked-oak-chips/1683211"
        },
        {
            "title": "Imperial Tomato Gose",
            "type": "Sour - Other Gose",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-tomato-gose/4164420"
        },
        {
            "title": "Blackcurrant IPA",
            "type": "IPA - Other",
            "rating": 3.49,
            "url": "https://untappd.com/b/salden-s-brewery-blackcurrant-ipa/5118298"
        },
        {
            "title": "Sour Ale Mosaic",
            "type": "Sour - Other",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-mosaic/1557464"
        },
        {
            "title": "Grodziskie",
            "type": "Grodziskie / Grätzer",
            "rating": 3.46,
            "url": "https://untappd.com/b/salden-s-brewery-grodziskie/3253329"
        },
        {
            "title": "English IPA",
            "type": "IPA - English",
            "rating": 3.75,
            "url": "https://untappd.com/b/saldens-english-ipa/845286"
        },
        {
            "title": "American Barleywine aged In bourbon barrels batch #3",
            "type": "Barleywine - American",
            "rating": 3.65,
            "url": "https://untappd.com/b/salden-s-brewery-american-barleywine-aged-in-bourbon-barrels-batch-3/3334500"
        },
        {
            "title": "Sour Russian Imperial Stout Grapefruit",
            "type": "Stout - Russian Imperial",
            "rating": 3.56,
            "url": "https://untappd.com/b/salden-s-brewery-sour-russian-imperial-stout-grapefruit/4630698"
        },
        {
            "title": "Belgian Sour Ale",
            "type": "Sour - Other",
            "rating": 3.77,
            "url": "https://untappd.com/b/salden-s-brewery-belgian-sour-ale/3300842"
        },
        {
            "title": "Russian Imperial Stout Eskimo Edition Aged In Bourbon Barrels",
            "type": "Stout - Russian Imperial",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-eskimo-edition-aged-in-bourbon-barrels/4092188"
        },
        {
            "title": "Milk Sour Ale White Grape",
            "type": "Grape Ale - Other",
            "rating": 3.58,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-white-grape/4396646"
        },
        {
            "title": "Milk Sour Ale Strawberry & Ice-Cream",
            "type": "Sour - Fruited",
            "rating": 3.33,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-strawberry-and-ice-cream/4242753"
        },
        {
            "title": "India Pale Lager",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-india-pale-lager/1186647"
        },
        {
            "title": "Russian Imperial Stout Maturated On Cognac Soaked Oak Chips",
            "type": "Stout - Russian Imperial",
            "rating": 3.97,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-maturated-on-cognac-soaked-oak-chips/1974770"
        },
        {
            "title": "Kristalweizen",
            "type": "Wheat Beer - Kristallweizen",
            "rating": 3.34,
            "url": "https://untappd.com/b/salden-s-brewery-kristalweizen/3111873"
        },
        {
            "title": "Vermont Pale Ale",
            "type": "Pale Ale - New England / Hazy",
            "rating": 3.66,
            "url": "https://untappd.com/b/salden-s-brewery-vermont-pale-ale/2155581"
        },
        {
            "title": "Sour IPA Simcoe & Mosaic",
            "type": "IPA - Sour",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ipa-simcoe-and-mosaic/1549076"
        },
        {
            "title": "Cold Double IPA",
            "type": "IPA - Cold",
            "rating": 4.02,
            "url": "https://untappd.com/b/salden-s-brewery-cold-double-ipa/5274158"
        },
        {
            "title": "Session IPA vol.1",
            "type": "IPA - Session",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-session-ipa-vol-1/1518395"
        },
        {
            "title": "Milk Stout Coconut Edition",
            "type": "Stout - Milk / Sweet",
            "rating": 3.64,
            "url": "https://untappd.com/b/salden-s-brewery-milk-stout-coconut-edition/2123277"
        },
        {
            "title": "Russian Imperial Stout Aged In Scotch Whisky Barrels Batch #6",
            "type": "Stout - Russian Imperial",
            "rating": 3.97,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-aged-in-scotch-whisky-barrels-batch-6/2523378"
        },
        {
            "title": "Eisbock Aged In Jack Daniels Barrels",
            "type": "Bock - Eisbock",
            "rating": 4.11,
            "url": "https://untappd.com/b/salden-s-brewery-eisbock-aged-in-jack-daniels-barrels/3016167"
        },
        {
            "title": "Vic Secret IPA",
            "type": "Pale Ale - Australian",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-vic-secret-ipa/1405854"
        },
        {
            "title": "100% Wheat DIPA",
            "type": "IPA - Imperial / Double",
            "rating": 4.01,
            "url": "https://untappd.com/b/salden-s-brewery-100-wheat-dipa/1932832"
        },
        {
            "title": "Denali & Tangerine Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.72,
            "url": "https://untappd.com/b/salden-s-brewery-denali-and-tangerine-double-ipa/2631103"
        },
        {
            "title": "Oak Smoked Imperial Tomato Gose Light Chili Provence Edition",
            "type": "Sour - Other Gose",
            "rating": 3.87,
            "url": "https://untappd.com/b/salden-s-brewery-oak-smoked-imperial-tomato-gose-light-chili-provence-edition/4284766"
        },
        {
            "title": "Smoked Porter Chili Edition",
            "type": "Spiced / Herbed Beer",
            "rating": 3.7,
            "url": "https://untappd.com/b/salden-s-brewery-smoked-porter-chili-edition/2417317"
        },
        {
            "title": "New England Triple IPA",
            "type": "IPA - Triple New England / Hazy",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-new-england-triple-ipa/2776671"
        },
        {
            "title": "Quadrupel",
            "type": "Belgian Quadrupel",
            "rating": 3.81,
            "url": "https://untappd.com/b/salden-s-brewery-quadrupel/1188219"
        },
        {
            "title": "Cider Cascade",
            "type": "Cider - Herbed / Spiced / Hopped",
            "rating": 3.67,
            "url": "https://untappd.com/b/salden-s-brewery-cider-cascade/4156378"
        },
        {
            "title": "Rye Porter (#2 edition)",
            "type": "Porter - Other",
            "rating": 3.98,
            "url": "https://untappd.com/b/saldens-rye-porter-2-edition/951633"
        },
        {
            "title": "Hard Seltzer Calamansi",
            "type": "Hard Seltzer",
            "rating": 3.35,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-calamansi/4866282"
        },
        {
            "title": "Sour IPA",
            "type": "IPA - Sour",
            "rating": 3.71,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ipa/4399158"
        },
        {
            "title": "New England IPA ver.3",
            "type": "IPA - New England / Hazy",
            "rating": 3.94,
            "url": "https://untappd.com/b/salden-s-brewery-new-england-ipa-ver-3/2050899"
        },
        {
            "title": "Simcoe & Galaxy Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 4,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-galaxy-double-ipa/1424354"
        },
        {
            "title": "Sour Ale With Orange Puree",
            "type": "Sour - Fruited",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-with-orange-puree/1633379"
        },
        {
            "title": "Milkshake With Blackcurrant Puree",
            "type": "IPA - Milkshake",
            "rating": 3.66,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-with-blackcurrant-puree/3306412"
        },
        {
            "title": "Berliner Weisse Raspberry",
            "type": "Sour - Fruited Berliner Weisse",
            "rating": 3.52,
            "url": "https://untappd.com/b/salden-s-brewery-berliner-weisse-raspberry/4824755"
        },
        {
            "title": "Belgian Saison",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.62,
            "url": "https://untappd.com/b/salden-s-brewery-belgian-saison/4644521"
        },
        {
            "title": "Russian Imperial Stout Aged With Islay Whiskey Soaked Oak Chips",
            "type": "Stout - Russian Imperial",
            "rating": 4.09,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-aged-with-islay-whiskey-soaked-oak-chips/1873965"
        },
        {
            "title": "100% Rye Session IPA",
            "type": "IPA - Rye",
            "rating": 3.47,
            "url": "https://untappd.com/b/salden-s-brewery-100-rye-session-ipa/2239977"
        },
        {
            "title": "Belgian Quadrupel Aged In Jack Daniels Barrels Batch #2",
            "type": "Belgian Quadrupel",
            "rating": 4.08,
            "url": "https://untappd.com/b/salden-s-brewery-belgian-quadrupel-aged-in-jack-daniels-barrels-batch-2/2458384"
        },
        {
            "title": "Yuzu IPA",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-yuzu-ipa/5194144"
        },
        {
            "title": "Milk Sour Ale Pineapple",
            "type": "Sour - Fruited",
            "rating": 3.54,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-pineapple/4350765"
        },
        {
            "title": "Azacca & Centennial Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 4.03,
            "url": "https://untappd.com/b/salden-s-brewery-azacca-centennial-double-ipa/1040546"
        },
        {
            "title": "Russian Imperial Stout version 3 (with oak smoked malt)",
            "type": "Stout - Russian Imperial",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-version-3-with-oak-smoked-malt/1292577"
        },
        {
            "title": "Oak Smoked Tomato Gose Chili Extra Hot Mexican Edition",
            "type": "Sour - Other Gose",
            "rating": 3.87,
            "url": "https://untappd.com/b/salden-s-brewery-oak-smoked-tomato-gose-chili-extra-hot-mexican-edition/4465494"
        },
        {
            "title": "Russian Imperial Stout Freezed-out, Batch #9 Aged In Macallan Whisky Barrels",
            "type": "Stout - Russian Imperial",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-freezed-out-batch-9-aged-in-macallan-whisky-barrels/3027181"
        },
        {
            "title": "Pilsner New Zealand",
            "type": "Pilsner - New Zealand",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-pilsner-new-zealand/4123296"
        },
        {
            "title": "Russian Imperial Stout Aged With Scotch Whisky Soaked Oak Chips",
            "type": "Stout - Russian Imperial",
            "rating": 4.18,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-aged-with-scotch-whisky-soaked-oak-chips/1691929"
        },
        {
            "title": "Koelship Batch #3",
            "type": "Sour - Other",
            "rating": 3.87,
            "url": "https://untappd.com/b/salden-s-brewery-koelship-batch-3/3244353"
        },
        {
            "title": "Low-Gluten IPA",
            "type": "Gluten-Free",
            "rating": 3.6,
            "url": "https://untappd.com/b/salden-s-brewery-low-gluten-ipa/4534004"
        },
        {
            "title": "Grapefruit IPA",
            "type": "IPA - Fruited",
            "rating": 3.9,
            "url": "https://untappd.com/b/salden-s-brewery-grapefruit-ipa/2041978"
        },
        {
            "title": "Simcoe & Chinook DIPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.87,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-and-chinook-dipa/3096632"
        },
        {
            "title": "Pilsner Nelson Sauvin",
            "type": "Pilsner - Other",
            "rating": 3.71,
            "url": "https://untappd.com/b/salden-s-brewery-pilsner-nelson-sauvin/3112108"
        },
        {
            "title": "Vienna Lager",
            "type": "Lager - Vienna",
            "rating": 3.57,
            "url": "https://untappd.com/b/salden-s-brewery-vienna-lager/715305"
        },
        {
            "title": "Belgian Tripel Freezing-out",
            "type": "Belgian Tripel",
            "rating": 3.63,
            "url": "https://untappd.com/b/salden-s-brewery-belgian-tripel-freezing-out/2919051"
        },
        {
            "title": "Special English Ale",
            "type": "Bitter - Session / Ordinary",
            "rating": 3.68,
            "url": "https://untappd.com/b/saldens-special-english-ale/715242"
        },
        {
            "title": "Wild Ale Raspberry 2019 Year",
            "type": "Wild Ale - Other",
            "rating": 3.74,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-raspberry-2019-year/4478402"
        },
        {
            "title": "Lichtenhainer",
            "type": "Historical Beer - Lichtenhainer",
            "rating": 3.59,
            "url": "https://untappd.com/b/salden-s-brewery-lichtenhainer/3263691"
        },
        {
            "title": "Hard Seltzer Grapefruit & Juniper",
            "type": "Hard Seltzer",
            "rating": 3.23,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-grapefruit-and-juniper/4225838"
        },
        {
            "title": "Australian IPA",
            "type": "IPA - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/salden-s-brewery-australian-ipa/1230626"
        },
        {
            "title": "Wild Ale Batch #5",
            "type": "Wild Ale - Other",
            "rating": 3.95,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-batch-5/4261783"
        },
        {
            "title": "Hard Seltzer Feijoa",
            "type": "Hard Seltzer",
            "rating": 3.18,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-feijoa/4464135"
        },
        {
            "title": "Imperial Brown Ale Aged In Jack Daniels Barrels",
            "type": "Brown Ale - Imperial / Double",
            "rating": 3.74,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-brown-ale-aged-in-jack-daniels-barrels/2503571"
        },
        {
            "title": "Sour Ale Tropical Ed.",
            "type": "Sour - Fruited",
            "rating": 3.59,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-tropical-ed/4803305"
        },
        {
            "title": "Original Kölsch",
            "type": "Kölsch",
            "rating": 3.35,
            "url": "https://untappd.com/b/salden-s-brewery-original-kolsch/3178002"
        },
        {
            "title": "Russian Imperial Stout Version 3.1 (With Oak Smoked Malt) Aged With Bourbon Soaked Oak Chips",
            "type": "Stout - Russian Imperial",
            "rating": 4.09,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-version-3-1-with-oak-smoked-malt-aged-with-bourbon-soaked-oak-chips/1584260"
        },
        {
            "title": "Sour Ale With Lingonberry Puree",
            "type": "Sour - Fruited",
            "rating": 3.68,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-with-lingonberry-puree/2720964"
        },
        {
            "title": "Koelship Batch #5",
            "type": "Wild Ale - Other",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-koelship-batch-5/4049350"
        },
        {
            "title": "Pekko & Equinox IPA",
            "type": "IPA - American",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-pekko-equinox-ipa/1404997"
        },
        {
            "title": "Imperial Porter Aged In Jack Daniels Barrels Batch #3",
            "type": "Porter - Imperial / Double",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-porter-aged-in-jack-daniels-barrels-batch-3/3232988"
        },
        {
            "title": "Milk Sour Ale Multifruit",
            "type": "Sour - Fruited",
            "rating": 3.97,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-multifruit/5101915"
        },
        {
            "title": "Extra Stout Chili Edition",
            "type": "Chilli / Chile Beer",
            "rating": 3.58,
            "url": "https://untappd.com/b/salden-s-brewery-extra-stout-chili-edition/2852455"
        },
        {
            "title": "Milkshake DIPA Banana & Chocolate",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.69,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-banana-and-chocolate/4990628"
        },
        {
            "title": "Sour Ale Equinox",
            "type": "Sour - Other",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-equinox/1623035"
        },
        {
            "title": "Irish Dry Stout",
            "type": "Stout - Irish Dry",
            "rating": 3.55,
            "url": "https://untappd.com/b/saldens-irish-dry-stout/523316"
        },
        {
            "title": "Triple India Pale Lager",
            "type": "Lager - IPL (India Pale Lager)",
            "rating": 3.98,
            "url": "https://untappd.com/b/salden-s-brewery-triple-india-pale-lager/1932726"
        },
        {
            "title": "100% Wheat IPA Citra & Galaxy",
            "type": "IPA - White / Wheat",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-100-wheat-ipa-citra-and-galaxy/1941304"
        },
        {
            "title": "New England DIPA Simcoe & Mosaic",
            "type": "IPA - Imperial / Double New England / Hazy",
            "rating": 3.86,
            "url": "https://untappd.com/b/salden-s-brewery-new-england-dipa-simcoe-and-mosaic/2279284"
        },
        {
            "title": "Jarrylo & ElDorado IPA",
            "type": "IPA - American",
            "rating": 3.82,
            "url": "https://untappd.com/b/salden-s-brewery-jarrylo-eldorado-ipa/1442166"
        },
        {
            "title": "Citra & Equinox DIPA / Extra Hops Series",
            "type": "IPA - Imperial / Double",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-citra-and-equinox-dipa-extra-hops-series/2132589"
        },
        {
            "title": "Triple Red IPA Ginger Ed.",
            "type": "IPA - Triple",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-triple-red-ipa-ginger-ed/4123271"
        },
        {
            "title": "Brett IPA",
            "type": "IPA - Brett",
            "rating": 3.77,
            "url": "https://untappd.com/b/salden-s-brewery-brett-ipa/2657726"
        },
        {
            "title": "Local Baltic Porter",
            "type": "Porter - Baltic",
            "rating": 3.58,
            "url": "https://untappd.com/b/salden-s-brewery-local-baltic-porter/3181698"
        },
        {
            "title": "Imperial Baltic Porter Aged In Jack Daniels Barrels Batch #2",
            "type": "Porter - Imperial / Double",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-baltic-porter-aged-in-jack-daniels-barrels-batch-2/2921840"
        },
        {
            "title": "Almond Cake Stout",
            "type": "Stout - Pastry",
            "rating": 3.6,
            "url": "https://untappd.com/b/salden-s-brewery-almond-cake-stout/2586055"
        },
        {
            "title": "Enigma IPA",
            "type": "IPA - American",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-enigma-ipa/1264958"
        },
        {
            "title": "English Barleywine Aged In Bourbon Barrels Batch #4",
            "type": "Barleywine - English",
            "rating": 3.86,
            "url": "https://untappd.com/b/salden-s-brewery-english-barleywine-aged-in-bourbon-barrels-batch-4/3748036"
        },
        {
            "title": "Tomato Gose Indian Edition",
            "type": "Spiced / Herbed Beer",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-indian-edition/4823787"
        },
        {
            "title": "Hard Seltzer Pina Colada",
            "type": "Hard Seltzer",
            "rating": 3.17,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-pina-colada/3938359"
        },
        {
            "title": "Imperial Porter Aged In Bourbon Barrels",
            "type": "Porter - Imperial / Double",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-porter-aged-in-bourbon-barrels/2476705"
        },
        {
            "title": "Sour Ale Pineapple",
            "type": "Sour - Fruited",
            "rating": 3.4,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-pineapple/4893080"
        },
        {
            "title": "Chili Triple IPA",
            "type": "Chilli / Chile Beer",
            "rating": 3.81,
            "url": "https://untappd.com/b/salden-s-brewery-chili-triple-ipa/2223427"
        },
        {
            "title": "New Zealand Pale Ale",
            "type": "Pale Ale - New Zealand",
            "rating": 3.64,
            "url": "https://untappd.com/b/salden-s-brewery-new-zealand-pale-ale/1951642"
        },
        {
            "title": "100% Wheat DIPA Simcoe & Mosaic",
            "type": "IPA - Imperial / Double",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-100-wheat-dipa-simcoe-and-mosaic/1962332"
        },
        {
            "title": "Double Black IPA",
            "type": "IPA - Imperial / Double Black",
            "rating": 3.98,
            "url": "https://untappd.com/b/salden-s-brewery-double-black-ipa/1347288"
        },
        {
            "title": "American IPA Seven Hops Edition",
            "type": "IPA - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/salden-s-brewery-american-ipa-seven-hops-edition/3093140"
        },
        {
            "title": "Hoppy Saison (Mosaic)",
            "type": "Farmhouse Ale - Saison",
            "rating": 3.56,
            "url": "https://untappd.com/b/salden-s-brewery-hoppy-saison-mosaic/1951644"
        },
        {
            "title": "Double Milk Stout Espresso & Ice-Cream Edition",
            "type": "Stout - Imperial / Double Milk",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-double-milk-stout-espresso-and-ice-cream-edition/2164102"
        },
        {
            "title": "Halloween Pumpkin Ale",
            "type": "Pumpkin / Yam Beer",
            "rating": 3.43,
            "url": "https://untappd.com/b/salden-s-brewery-halloween-pumpkin-ale/5040515"
        },
        {
            "title": "Simcoe & Amarillo Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.97,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-amarillo-double-ipa/1205527"
        },
        {
            "title": "Session IPA Vol.3",
            "type": "IPA - Session",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-session-ipa-vol-3/1726798"
        },
        {
            "title": "100% Wheat Porter",
            "type": "Porter - Other",
            "rating": 3.74,
            "url": "https://untappd.com/b/salden-s-brewery-100-wheat-porter/1941724"
        },
        {
            "title": "Milkshake IPA With Strawberry Puree",
            "type": "IPA - Milkshake",
            "rating": 3.42,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-ipa-with-strawberry-puree/3463785"
        },
        {
            "title": "Tomato Gose Chili Extra Hot Italian Edition",
            "type": "Sour - Other Gose",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-chili-extra-hot-italian-edition/4232606"
        },
        {
            "title": "Double IPA With Cranberry Puree",
            "type": "IPA - Imperial / Double",
            "rating": 3.68,
            "url": "https://untappd.com/b/salden-s-brewery-double-ipa-with-cranberry-puree/1773075"
        },
        {
            "title": "Hard Seltzer Blackcurrant",
            "type": "Hard Seltzer",
            "rating": 3.38,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-blackcurrant/4385710"
        },
        {
            "title": "Wild Wine Ale Malbec Batch#1 2021 Year",
            "type": "Wild Ale - Other",
            "rating": 3.82,
            "url": "https://untappd.com/b/salden-s-brewery-wild-wine-ale-malbec-batch-1-2021-year/5090048"
        },
        {
            "title": "Milk Sour Ale Blackcurrant",
            "type": "Sour - Fruited",
            "rating": 3.65,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-blackcurrant/4644517"
        },
        {
            "title": "French Saison",
            "type": "Farmhouse Ale - Bière de Garde",
            "rating": 3.66,
            "url": "https://untappd.com/b/salden-s-brewery-french-saison/1912509"
        },
        {
            "title": "Triple Red IPA Chili Ed.",
            "type": "IPA - Triple",
            "rating": 3.78,
            "url": "https://untappd.com/b/salden-s-brewery-triple-red-ipa-chili-ed/4123269"
        },
        {
            "title": "Oak Smoked Tomato Gose Light Chili Mexican Edition",
            "type": "Sour - Other Gose",
            "rating": 3.79,
            "url": "https://untappd.com/b/salden-s-brewery-oak-smoked-tomato-gose-light-chili-mexican-edition/4616422"
        },
        {
            "title": "Cider Galaxy",
            "type": "Cider - Herbed / Spiced / Hopped",
            "rating": 3.58,
            "url": "https://untappd.com/b/salden-s-brewery-cider-galaxy/4286853"
        },
        {
            "title": "Oatmeal Stout Caramel Edition",
            "type": "Stout - Oatmeal",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-oatmeal-stout-caramel-edition/2423681"
        },
        {
            "title": "American IPA HBC#430 & Equinox",
            "type": "IPA - American",
            "rating": 3.98,
            "url": "https://untappd.com/b/salden-s-brewery-american-ipa-hbc-430-equinox/1077558"
        },
        {
            "title": "English Strong Ale",
            "type": "Strong Ale - English",
            "rating": 3.79,
            "url": "https://untappd.com/b/salden-s-brewery-english-strong-ale/1347076"
        },
        {
            "title": "HBC#517 & 462 Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.98,
            "url": "https://untappd.com/b/salden-s-brewery-hbc-517-462-double-ipa/1119181"
        },
        {
            "title": "Extra Stout Espresso Edition",
            "type": "Stout - Coffee",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-extra-stout-espresso-edition/1474221"
        },
        {
            "title": "Belgian Abbey Ale",
            "type": "Belgian Tripel",
            "rating": 3.43,
            "url": "https://untappd.com/b/salden-s-brewery-belgian-abbey-ale/1540458"
        },
        {
            "title": "Belgian Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.81,
            "url": "https://untappd.com/b/salden-s-brewery-belgian-double-ipa/1274053"
        },
        {
            "title": "Peated Scottish Ale",
            "type": "Smoked Beer",
            "rating": 3.72,
            "url": "https://untappd.com/b/salden-s-brewery-peated-scottish-ale/1951643"
        },
        {
            "title": "Centennial & Equinox Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-centennial-and-equinox-double-ipa/1856127"
        },
        {
            "title": "Milkshake DIPA With Peach Puree",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.63,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-with-peach-puree/2223638"
        },
        {
            "title": "100% Wheat Wine Aged In Jack Daniels Whisky Barrels Batch #2",
            "type": "Wheat Beer - Wheat Wine",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-100-wheat-wine-aged-in-jack-daniels-whisky-barrels-batch-2/2583644"
        },
        {
            "title": "Hard Seltzer Lychee",
            "type": "Hard Seltzer",
            "rating": 3.33,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-lychee/4463924"
        },
        {
            "title": "American Pale Ale Recipe #2",
            "type": "Pale Ale - American",
            "rating": 3.79,
            "url": "https://untappd.com/b/salden-s-brewery-american-pale-ale-recipe-2/1297783"
        },
        {
            "title": "Sour IPA Galaxy & Mosaic",
            "type": "IPA - Sour",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ipa-galaxy-and-mosaic/1583030"
        },
        {
            "title": "Oak Smoked Tomato Gose Chili Ultra Hot Italian Edition",
            "type": "Sour - Other Gose",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-oak-smoked-tomato-gose-chili-ultra-hot-italian-edition/4378583"
        },
        {
            "title": "Vic Secret & Calypso IPA",
            "type": "IPA - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-vic-secret-calypso-ipa/1248419"
        },
        {
            "title": "Pryanik Stout 3.0 Edition",
            "type": "Winter Ale",
            "rating": 3.9,
            "url": "https://untappd.com/b/salden-s-brewery-pryanik-stout-3-0-edition/1223134"
        },
        {
            "title": "Triple IPA (Cashmere, Strata, Triumph)",
            "type": "IPA - Triple",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-cashmere-strata-triumph/4400232"
        },
        {
            "title": "Almond Stout",
            "type": "Stout - Milk / Sweet",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-almond-stout/4866284"
        },
        {
            "title": "Sour Ale Simcoe",
            "type": "Sour - Other",
            "rating": 3.7,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ale-simcoe/2170121"
        },
        {
            "title": "Milk Stout Caramel Edition",
            "type": "Stout - Milk / Sweet",
            "rating": 3.98,
            "url": "https://untappd.com/b/salden-s-brewery-milk-stout-caramel-edition/1941291"
        },
        {
            "title": "Polaris & Equinox Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.94,
            "url": "https://untappd.com/b/salden-s-brewery-polaris-equinox-double-ipa/1247419"
        },
        {
            "title": "Sour IPA Citra & Centennial",
            "type": "IPA - Sour",
            "rating": 3.87,
            "url": "https://untappd.com/b/salden-s-brewery-sour-ipa-citra-and-centennial/1663323"
        },
        {
            "title": "Simcoe & Columbus Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 4,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-columbus-double-ipa/1083799"
        },
        {
            "title": "Hard Seltzer Lime & Strawberry",
            "type": "Hard Seltzer",
            "rating": 3.35,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-lime-and-strawberry/4225836"
        },
        {
            "title": "Caramel Milkshake DIPA",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.7,
            "url": "https://untappd.com/b/salden-s-brewery-caramel-milkshake-dipa/2147400"
        },
        {
            "title": "Wine Ale Chenin Blanc",
            "type": "Grape Ale - Other",
            "rating": 3.82,
            "url": "https://untappd.com/b/salden-s-brewery-wine-ale-chenin-blanc/5180443"
        },
        {
            "title": "Mosaic & Azacca Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-mosaic-and-azacca-double-ipa/1790315"
        },
        {
            "title": "100% Wheat IPA Citra & Mosaic",
            "type": "IPA - White / Wheat",
            "rating": 3.87,
            "url": "https://untappd.com/b/salden-s-brewery-100-wheat-ipa-citra-and-mosaic/2020858"
        },
        {
            "title": "Raspberry Mead",
            "type": "Mead - Melomel",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-raspberry-mead/2318511"
        },
        {
            "title": "Tomato Gose Black Pepper Ed",
            "type": "Sour - Other Gose",
            "rating": 4.04,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-black-pepper-ed/5217953"
        },
        {
            "title": "ABC IPA",
            "type": "IPA - American",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-abc-ipa/1317546"
        },
        {
            "title": "Columbus & Centennial Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 4.06,
            "url": "https://untappd.com/b/salden-s-brewery-columbus-and-centennial-double-ipa/1366010"
        },
        {
            "title": "Oak Smoked Tomato Gose Light Chili Provence Edition",
            "type": "Sour - Other Gose",
            "rating": 3.94,
            "url": "https://untappd.com/b/salden-s-brewery-oak-smoked-tomato-gose-light-chili-provence-edition/4564585"
        },
        {
            "title": "American Porter",
            "type": "Porter - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-american-porter/1459574"
        },
        {
            "title": "Mosaic & Amarillo DIPA / Extra Hops Series",
            "type": "IPA - Imperial / Double",
            "rating": 3.92,
            "url": "https://untappd.com/b/salden-s-brewery-mosaic-and-amarillo-dipa-extra-hops-series/1843548"
        },
        {
            "title": "Amarillo & Equinox DIPA / Extra Hops Series",
            "type": "IPA - Imperial / Double",
            "rating": 3.95,
            "url": "https://untappd.com/b/salden-s-brewery-amarillo-and-equinox-dipa-extra-hops-series/1943902"
        },
        {
            "title": "Ariana IPA",
            "type": "IPA - Other",
            "rating": 3.36,
            "url": "https://untappd.com/b/salden-s-brewery-ariana-ipa/2236334"
        },
        {
            "title": "Azacca & Simcoe Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.99,
            "url": "https://untappd.com/b/salden-s-brewery-azacca-and-simcoe-double-ipa/1436138"
        },
        {
            "title": "Double IPA With Cherry Puree",
            "type": "IPA - Imperial / Double",
            "rating": 3.69,
            "url": "https://untappd.com/b/salden-s-brewery-double-ipa-with-cherry-puree/1741478"
        },
        {
            "title": "AIPA #429",
            "type": "IPA - American",
            "rating": 3.71,
            "url": "https://untappd.com/b/salden-s-brewery-aipa-429/1155604"
        },
        {
            "title": "Simcoe & Vic Secret IPA",
            "type": "IPA - American",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-vic-secret-ipa/1287137"
        },
        {
            "title": "Hard Seltzer Cucumber",
            "type": "Hard Seltzer",
            "rating": 2.87,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-cucumber/4385708"
        },
        {
            "title": "American IPA Five Hops Ed.",
            "type": "IPA - American",
            "rating": 3.74,
            "url": "https://untappd.com/b/salden-s-brewery-american-ipa-five-hops-ed/1683783"
        },
        {
            "title": "Chinook & Comet Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.97,
            "url": "https://untappd.com/b/salden-s-brewery-chinook-and-comet-double-ipa/1823282"
        },
        {
            "title": "Pryanik Stout 6.0 Edition",
            "type": "Winter Ale",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-pryanik-stout-6-0-edition/1846167"
        },
        {
            "title": "Schwarzbier",
            "type": "Schwarzbier",
            "rating": 3.7,
            "url": "https://untappd.com/b/salden-s-brewery-schwarzbier/755573"
        },
        {
            "title": "Eisbock Aged In Jack Daniels Barrels Batch #2",
            "type": "Bock - Eisbock",
            "rating": 4.15,
            "url": "https://untappd.com/b/salden-s-brewery-eisbock-aged-in-jack-daniels-barrels-batch-2/3078252"
        },
        {
            "title": "Oktoberfest Bier",
            "type": "Märzen",
            "rating": 3.5,
            "url": "https://untappd.com/b/salden-s-brewery-oktoberfest-bier/1730638"
        },
        {
            "title": "Russian Imperial Stout Eskimo Ed. Aged In Jack Daniels Barrels",
            "type": "Stout - Russian Imperial",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-russian-imperial-stout-eskimo-ed-aged-in-jack-daniels-barrels/3596482"
        },
        {
            "title": "Hard Seltzer Bubblegum",
            "type": "Hard Seltzer",
            "rating": 3.13,
            "url": "https://untappd.com/b/salden-s-brewery-hard-selzer-bubblegum/4385709"
        },
        {
            "title": "ADHA#484 & Mosaic Hops",
            "type": "IPA - American",
            "rating": 3.9,
            "url": "https://untappd.com/b/salden-s-brewery-adha-484-and-mosaic-hops/1741490"
        },
        {
            "title": "Triple IPA (Cascade, Columbus, Galaxy, Simcoe, Mosaic)",
            "type": "IPA - Triple",
            "rating": 4.16,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-cascade-columbus-galaxy-simcoe-mosaic/4015891"
        },
        {
            "title": "Hard Seltzer Cherry Cola",
            "type": "Hard Seltzer",
            "rating": 3.17,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-cherry-cola/4313948"
        },
        {
            "title": "Rye Porter (#3 Edition)",
            "type": "Porter - Other",
            "rating": 3.97,
            "url": "https://untappd.com/b/salden-s-brewery-rye-porter-3-edition/1077346"
        },
        {
            "title": "Buckwheat Stout",
            "type": "Stout - Other",
            "rating": 3.66,
            "url": "https://untappd.com/b/salden-s-brewery-buckwheat-stout/2055817"
        },
        {
            "title": "Milk Sour Ale Guava Extra Fruit Version",
            "type": "Sour - Fruited",
            "rating": 3.34,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-guava-extra-fruit-version/4203028"
        },
        {
            "title": "Imperial Tomato Gose Light Chili Italian Edition",
            "type": "Sour - Other Gose",
            "rating": 3.5,
            "url": "https://untappd.com/b/salden-s-brewery-imperial-tomato-gose-light-chili-italian-edition/4708204"
        },
        {
            "title": "Equinox & Eldorado IPA",
            "type": "IPA - American",
            "rating": 3.95,
            "url": "https://untappd.com/b/salden-s-brewery-equinox-eldorado-ipa/1183239"
        },
        {
            "title": "Double Coffee Stout",
            "type": "Stout - Imperial / Double Coffee",
            "rating": 3.82,
            "url": "https://untappd.com/b/salden-s-brewery-double-coffee-stout/2523720"
        },
        {
            "title": "Mosaic & Centennial DIPA / Extra Hops Series",
            "type": "IPA - Imperial / Double",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-mosaic-and-centennial-dipa-extra-hops-series/1929225"
        },
        {
            "title": "Wild Wheat Ale Batch #2 (2021 Year)",
            "type": "Wild Ale - Other",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-wild-wheat-ale-batch-2/5091446"
        },
        {
            "title": "HBC462 & Amarillo Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.98,
            "url": "https://untappd.com/b/salden-s-brewery-hbc462-amarillo-double-ipa/1183736"
        },
        {
            "title": "Pryanik Stout 2.0 Edition",
            "type": "Winter Ale",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-pryanik-stout-2-0-edition/1048831"
        },
        {
            "title": "Spiced Buckwheat Stout",
            "type": "Stout - Other",
            "rating": 3.9,
            "url": "https://untappd.com/b/saldens-spiced-buckwheat-stout/908828"
        },
        {
            "title": "Double Oatmeal Stout",
            "type": "Stout - Imperial / Double Oatmeal",
            "rating": 3.9,
            "url": "https://untappd.com/b/salden-s-brewery-double-oatmeal-stout/1212853"
        },
        {
            "title": "Hard Seltzer Melon & Mint",
            "type": "Hard Seltzer",
            "rating": 2.92,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-melon-and-mint/4385707"
        },
        {
            "title": "Wild Ale Blackcurrant (2019 year)",
            "type": "Wild Ale - Other",
            "rating": 3.78,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-blackcurrant/4586381"
        },
        {
            "title": "Belgian Brune",
            "type": "Brown Ale - Belgian",
            "rating": 3.72,
            "url": "https://untappd.com/b/salden-s-brewery-belgian-brune/1833292"
        },
        {
            "title": "Wheat Pale Ale",
            "type": "Wheat Beer - American Pale Wheat",
            "rating": 3.69,
            "url": "https://untappd.com/b/salden-s-brewery-wheat-pale-ale/2896881"
        },
        {
            "title": "Columbus & Amarillo Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 4.13,
            "url": "https://untappd.com/b/salden-s-brewery-columbus-amarillo-double-ipa/1157021"
        },
        {
            "title": "Kristalhopweizen",
            "type": "Wheat Beer - Kristallweizen",
            "rating": 3.41,
            "url": "https://untappd.com/b/salden-s-brewery-kristalhopweizen/3219255"
        },
        {
            "title": "Citra & Eldorado Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.99,
            "url": "https://untappd.com/b/salden-s-brewery-citra-and-eldorado-double-ipa/1752792"
        },
        {
            "title": "Comet & Citra Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-comet-and-citra-double-ipa/1863447"
        },
        {
            "title": "Cider Biodynamic Foeder 10 (2020 Year)",
            "type": "Cider - Dry",
            "rating": 4.11,
            "url": "https://untappd.com/b/salden-s-brewery-cider-biodynamic-foeder-10-2020-year/5142021"
        },
        {
            "title": "Chinook & Centennial Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.9,
            "url": "https://untappd.com/b/salden-s-brewery-chinook-and-centennial-double-ipa/1813197"
        },
        {
            "title": "Chinook & Simcoe DIPA / Extra Hops Series",
            "type": "IPA - Imperial / Double",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-chinook-and-simcoe-dipa-extra-hops-series/1996288"
        },
        {
            "title": "Extra Foreign Stout",
            "type": "Stout - Foreign / Export",
            "rating": 3.87,
            "url": "https://untappd.com/b/salden-s-brewery-extra-foreign-stout/2504633"
        },
        {
            "title": "Cider Biodynamic 2020 Foeder 1",
            "type": "Cider - Dry",
            "rating": 3.98,
            "url": "https://untappd.com/b/salden-s-brewery-cider-biodynamic-2020-foeder-1/4845385"
        },
        {
            "title": "Saldens Ale",
            "type": "Pale Ale - Other",
            "rating": 3.65,
            "url": "https://untappd.com/b/salden-s-brewery-saldens-ale/3897381"
        },
        {
            "title": "HBC#436 & 429 Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-hbc-436-429-double-ipa/1144780"
        },
        {
            "title": "Mead With Raspberry BA Jack Daniels (2years)",
            "type": "Mead - Other",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-mead-with-raspberry-ba-jack-daniels-2years/2642091"
        },
        {
            "title": "Local Pilsner",
            "type": "Pilsner - Other",
            "rating": 3.52,
            "url": "https://untappd.com/b/salden-s-brewery-local-pilsner/3908385"
        },
        {
            "title": "HBC#517 & Equinox Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 4.07,
            "url": "https://untappd.com/b/salden-s-brewery-hbc-517-equinox-double-ipa/1196035"
        },
        {
            "title": "Hard Seltzer Cherry",
            "type": "Hard Seltzer",
            "rating": 3.19,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-cherry/4430957"
        },
        {
            "title": "Wild Ale Cherry (2019 Year)",
            "type": "Wild Ale - Other",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-cherry-2019-year/4437705"
        },
        {
            "title": "Strong Lager",
            "type": "Pilsner - Imperial / Double",
            "rating": 3.95,
            "url": "https://untappd.com/b/salden-s-brewery-strong-lager/1240039"
        },
        {
            "title": "Simcoe & HBC #436 Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 4.02,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-hbc-436-double-ipa/1162179"
        },
        {
            "title": "American Brown Ale",
            "type": "Brown Ale - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/saldens-american-brown-ale/837556"
        },
        {
            "title": "Cider Biodynamic Freezed-out 2020 Year",
            "type": "Cider - Ice / Applewine",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-cider-biodynamic-freezed-out-2020-year/4961978"
        },
        {
            "title": "American Amber Ale",
            "type": "Red Ale - American Amber / Red",
            "rating": 3.65,
            "url": "https://untappd.com/b/saldens-american-amber-ale/755486"
        },
        {
            "title": "Citra & Equinox IPA",
            "type": "IPA - American",
            "rating": 3.86,
            "url": "https://untappd.com/b/salden-s-brewery-citra-and-equinox-ipa/2580749"
        },
        {
            "title": "DIPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.83,
            "url": "https://untappd.com/b/salden-s-brewery-dipa/2976679"
        },
        {
            "title": "Oak Smoked Tomato Gose Chili Ultra Hot Edition",
            "type": "Sour - Other Gose",
            "rating": 4.03,
            "url": "https://untappd.com/b/salden-s-brewery-oak-smoked-tomato-gose-chili-ultra-hot-edition/4159491"
        },
        {
            "title": "Australian IPA Recipe #2",
            "type": "IPA - American",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-australian-ipa-recipe-2/1306571"
        },
        {
            "title": "100% Wheat Weissbier",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.67,
            "url": "https://untappd.com/b/salden-s-brewery-100-wheat-weissbier/2074526"
        },
        {
            "title": "Triple IPA (single Hop Idaho7)",
            "type": "IPA - Triple",
            "rating": 3.72,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-single-hop-idaho7/4119616"
        },
        {
            "title": "Simcoe & Ekuanot DIPA / Extra Hops Series",
            "type": "IPA - Imperial / Double",
            "rating": 3.88,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-and-ekuanot-dipa-extra-hops-series/2050789"
        },
        {
            "title": "Wild Ale With Raspberry Batch #3",
            "type": "Wild Ale - Other",
            "rating": 3.54,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-with-rasperry-batch-3/3711307"
        },
        {
            "title": "Hard Seltzer Orange",
            "type": "Hard Seltzer",
            "rating": 3.2,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-orange/4430954"
        },
        {
            "title": "Amarillo & Centennial Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.99,
            "url": "https://untappd.com/b/salden-s-brewery-amarillo-and-centennial-double-ipa/1717594"
        },
        {
            "title": "Citra & Amarillo Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.96,
            "url": "https://untappd.com/b/salden-s-brewery-citra-and-amarillo-double-ipa/1584101"
        },
        {
            "title": "Triple IPA (Sabro, Equinox, Eldorado)",
            "type": "IPA - Triple",
            "rating": 4.02,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-sabro-equinox-eldorado/3820379"
        },
        {
            "title": "Peated Wee Heavy Icebock BA Jack Daniels",
            "type": "Scotch Ale / Wee Heavy",
            "rating": 3.53,
            "url": "https://untappd.com/b/salden-s-brewery-peated-wee-heavy-icebock-ba-jack-daniels/2289414"
        },
        {
            "title": "Wild Wine Ale Chardonnay Batch #2",
            "type": "Wild Ale - Other",
            "rating": 4.21,
            "url": "https://untappd.com/b/salden-s-brewery-wild-wine-ale-chardonnay-batch-2/4834363"
        },
        {
            "title": "Milk Sour Ale Mango",
            "type": "Fruit Beer",
            "rating": 3.62,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-mango/5029640"
        },
        {
            "title": "Tomato Gose Беру Выходной Ed.",
            "type": "Sour - Other Gose",
            "rating": 3.37,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-beru-vyhodnoj-ed/4960482"
        },
        {
            "title": "Simcoe & Ekuanot IPA",
            "type": "IPA - American",
            "rating": 3.62,
            "url": "https://untappd.com/b/salden-s-brewery-simcoe-and-ekuanot-ipa/2236591"
        },
        {
            "title": "Wild Ale With Mango",
            "type": "Wild Ale - Other",
            "rating": 3.24,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-with-mango/3263710"
        },
        {
            "title": "Triple IPA (single Hop El Dorado)",
            "type": "IPA - Triple",
            "rating": 3.94,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-single-hop-el-dorado/4165567"
        },
        {
            "title": "American Red Ale",
            "type": "Red Ale - American Amber / Red",
            "rating": 3.63,
            "url": "https://untappd.com/b/salden-s-brewery-american-red-ale/2076960"
        },
        {
            "title": "Strong Local Lager",
            "type": "Lager - Strong",
            "rating": 3.62,
            "url": "https://untappd.com/b/salden-s-brewery-strong-local-lager/5169866"
        },
        {
            "title": "Galaxy & Equinox IPA",
            "type": "IPA - American",
            "rating": 4.05,
            "url": "https://untappd.com/b/salden-s-brewery-galaxy-equinox-ipa/1137270"
        },
        {
            "title": "Tomato Gose Chili Extra Hot Indian Edition",
            "type": "Spiced / Herbed Beer",
            "rating": 3.76,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-chili-extra-hot-indian-edition/4839533"
        },
        {
            "title": "Milkshake With Passion Fruit Pulp",
            "type": "IPA - Milkshake",
            "rating": 3.58,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-with-passion-fruit-pulp/3254624"
        },
        {
            "title": "Hard Seltzer Grapefruit & Pineapple",
            "type": "Hard Seltzer",
            "rating": 3.81,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-grapefruit-and-pineapple/4930722"
        },
        {
            "title": "Bavarian Weissbier",
            "type": "Wheat Beer - Hefeweizen",
            "rating": 3.36,
            "url": "https://untappd.com/b/salden-s-brewery-bavarian-weissbier/755581"
        },
        {
            "title": "Hard Seltzer Peach & Cherry",
            "type": "Hard Seltzer",
            "rating": 3.75,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-peach-and-cherry/4975868"
        },
        {
            "title": "Imperial Baltic Porter Freezed-out Aged In Jack Daniels Barrels",
            "type": "Porter - Imperial / Double Baltic",
            "rating": 4.06,
            "url": "https://untappd.com/b/salden-s-brewery-imperilal-baltic-porter-freezed-out-aged-in-jack-daniels-barrels/4173129"
        },
        {
            "title": "Koelship 10th Anniversary",
            "type": "Wild Ale - Other",
            "rating": 4.12,
            "url": "https://untappd.com/b/salden-s-brewery-koelship-10th-anniversary/5108514"
        },
        {
            "title": "#500 Pastry Russian Imperial Stout Barrel Aged Ed.",
            "type": "Stout - Imperial / Double Pastry",
            "rating": 3.31,
            "url": "https://untappd.com/b/salden-s-brewery-500-pastry-russian-imperial-stout-barrel-aged-ed/4313946"
        },
        {
            "title": "Hard Seltzer Peach",
            "type": "Hard Seltzer",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-peach/4948959"
        },
        {
            "title": "Oud Bruin",
            "type": "Sour - Flanders Oud Bruin",
            "rating": 2.98,
            "url": "https://untappd.com/b/salden-s-brewery-oud-bruin/2369978"
        },
        {
            "title": "Wild Ale Batch #6",
            "type": "Wild Ale - American",
            "rating": 3.84,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-batch-6/4084949"
        },
        {
            "title": "Wild Ale With Raspberry Batch #2",
            "type": "Wild Ale - Other",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-with-raspberry-batch-2/3523102"
        },
        {
            "title": "Triple IPA (Simcoe, Mosaic, Chinook)",
            "type": "IPA - Triple",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-simcoe-mosaic-chinook/3928638"
        },
        {
            "title": "Cider Biodynamic 2020 Foeder 5",
            "type": "Cider - Dry",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-cider-biodynamic-2020-foeder-5/4845383"
        },
        {
            "title": "Weizenbock",
            "type": "Bock - Weizenbock",
            "rating": 3.56,
            "url": "https://untappd.com/b/saldens-weizenbock/908772"
        },
        {
            "title": "Triple IPA (Pacific Gem, Ekuanot, Idaho7)",
            "type": "IPA - Triple",
            "rating": 3.81,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-pacific-gem-ekuanot-idaho7/3901592"
        },
        {
            "title": "Wild Ale 2021 Batch #1",
            "type": "Wild Ale - Other",
            "rating": 3.71,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-2021-batch-1/4866149"
        },
        {
            "title": "Cherry Cider",
            "type": "Cider - Other Fruit",
            "rating": 3.61,
            "url": "https://untappd.com/b/salden-s-brewery-cherry-cider/5238465"
        },
        {
            "title": "Superminimal",
            "type": "IPA - Milkshake",
            "rating": 3.8,
            "url": "https://untappd.com/b/salden-s-brewery-superminimal/2522408"
        },
        {
            "title": "Milk Sour Ale Pina Colada",
            "type": "Sour - Other",
            "rating": 3.59,
            "url": "https://untappd.com/b/salden-s-brewery-milk-sour-ale-pina-colada/4333529"
        },
        {
            "title": "Cherry Beer",
            "type": "Fruit Beer",
            "rating": 3.47,
            "url": "https://untappd.com/b/saldens-cherry-beer/938283"
        },
        {
            "title": "American Pale Ale Version 2.0",
            "type": "Pale Ale - American",
            "rating": 3.85,
            "url": "https://untappd.com/b/salden-s-brewery-american-pale-ale-version-2-0/3047403"
        },
        {
            "title": "True APA",
            "type": "Bitter - Session / Ordinary",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-true-apa/2221483"
        },
        {
            "title": "Wheat Tripel",
            "type": "Belgian Tripel",
            "rating": 3.89,
            "url": "https://untappd.com/b/salden-s-brewery-wheat-tripel/965855"
        },
        {
            "title": "Wild Ale With Cherry Batch #3",
            "type": "Wild Ale - Other",
            "rating": 3.97,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-with-cherry-batch-3/4004021"
        },
        {
            "title": "Cider",
            "type": "Cider - Dry",
            "rating": 3.68,
            "url": "https://untappd.com/b/salden-s-brewery-cider/5169865"
        },
        {
            "title": "Triple IPA (Mosaic, Simcoe, Citra, Amarillo)",
            "type": "IPA - Triple",
            "rating": 3.93,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-mosaic-simcoe-citra-amarillo/3796824"
        },
        {
            "title": "Caramel Brown",
            "type": "Brown Ale - English",
            "rating": 3.58,
            "url": "https://untappd.com/b/saldens-caramel-brown/523309"
        },
        {
            "title": "Milkshake DIPA With Raspberry And Mango Puree",
            "type": "IPA - Imperial / Double Milkshake",
            "rating": 3.9,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-dipa-with-raspberry-and-mango-puree/2723927"
        },
        {
            "title": "Triple IPA (Chinook, HBC#472, Mosaic, Ekuanot)",
            "type": "IPA - Triple",
            "rating": 3.81,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-chinook-hbc-472-mosaic-ekuanot/3796860"
        },
        {
            "title": "Папа Крафт Double IPA",
            "type": "IPA - Imperial / Double",
            "rating": 3.91,
            "url": "https://untappd.com/b/salden-s-brewery-papa-kraft-double-ipa/2602716"
        },
        {
            "title": "Triple IPA (Chinook, Simcoe, Eldorado)",
            "type": "IPA - Triple",
            "rating": 3.82,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-chinook-simcoe-eldorado/3742965"
        },
        {
            "title": "India Pale Ale",
            "type": "IPA - English",
            "rating": 3.95,
            "url": "https://untappd.com/b/saldens-india-pale-ale/523293"
        },
        {
            "title": "English Ale",
            "type": "Pale Ale - English",
            "rating": 3.85,
            "url": "https://untappd.com/b/saldens-english-ale/949289"
        },
        {
            "title": "Cider Biodynamic 2020 Foeder 8",
            "type": "Cider - Dry",
            "rating": 3.98,
            "url": "https://untappd.com/b/salden-s-brewery-cider-biodynamic-2020-foeder-8/4845382"
        },
        {
            "title": "Ragnarokkr",
            "type": "Stout - Other",
            "rating": 3.68,
            "url": "https://untappd.com/b/salden-s-brewery-ragnarokkr/3004427"
        },
        {
            "title": "Belgian Ale",
            "type": "Belgian Blonde",
            "rating": 3.4,
            "url": "https://untappd.com/b/salden-s-brewery-belgian-ale/4156379"
        },
        {
            "title": "MILFSHAKE COCK&NUTS SLUTSHAME BANGER",
            "type": "IPA - Milkshake",
            "rating": 3.86,
            "url": "https://untappd.com/b/salden-s-brewery-milfshake-cock-and-nuts-slutshame-banger/2563182"
        },
        {
            "title": "Cider Biodynamic 2020 Foeder 4",
            "type": "Cider - Dry",
            "rating": 4.02,
            "url": "https://untappd.com/b/salden-s-brewery-cider-biodynamic-2020-foeder-4/4845384"
        },
        {
            "title": "Triple Red IPA (single Hop El Dorado)",
            "type": "IPA - Triple",
            "rating": 3.71,
            "url": "https://untappd.com/b/salden-s-brewery-triple-red-ipa-single-hop-el-dorado/4177467"
        },
        {
            "title": "Vegan-Friendly Panzer Division Futurebomb Gazpacho IPA 3000",
            "type": "IPA - New England / Hazy",
            "rating": 3.77,
            "url": "https://untappd.com/b/salden-s-brewery-vegan-friendly-panzer-division-futurebomb-gazpacho-ipa-3000/2459911"
        },
        {
            "title": "British Ale",
            "type": "Pale Ale - English",
            "rating": null,
            "url": "https://untappd.com/b/saldens-british-ale/938285"
        },
        {
            "title": "Kvass",
            "type": "Kvass",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-kvass/4396645"
        },
        {
            "title": "Fest Turbo Tripel",
            "type": "Belgian Tripel",
            "rating": 3.35,
            "url": "https://untappd.com/b/salden-s-brewery-fest-turbo-tripel/2834774"
        },
        {
            "title": "Cider Simcoe",
            "type": "Cider - Herbed / Spiced / Hopped",
            "rating": 3.73,
            "url": "https://untappd.com/b/salden-s-brewery-cider-simcoe/5300652"
        },
        {
            "title": "#300 Vermont IPA (Citra, Mosaic, Simcoe)",
            "type": "IPA - New England / Hazy",
            "rating": 3.92,
            "url": "https://untappd.com/b/salden-s-brewery-300-vermont-ipa-citra-mosaic-simcoe/3952548"
        },
        {
            "title": "Витя",
            "type": "Pale Ale - New England / Hazy",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-vitya/2734047"
        },
        {
            "title": "Pumpkin Ale",
            "type": "Pumpkin / Yam Beer",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-pumpkin-ale/2425526"
        },
        {
            "title": "Cider Biodynamic Foeder 3 (2020 Year)",
            "type": "Cider - Dry",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-cider-biodynamic-foeder-3-2020-year/5066372"
        },
        {
            "title": "Triple Red IPA Waimea Ed.",
            "type": "IPA - Triple",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-triple-red-ipa-waimea-ed/4153968"
        },
        {
            "title": "Voice From the Hole At the Top of the Food Chain",
            "type": "Pilsner - Other",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-voice-from-the-hole-at-the-top-of-the-food-chain/2583196"
        },
        {
            "title": "Nøglen Til Valhalla",
            "type": "Lager - Amber / Red",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-noglen-til-valhalla/4025152"
        },
        {
            "title": "Triple IPA (Mosaic, Simcoe, Eureca)",
            "type": "IPA - Triple",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-triple-ipa-mosaic-simcoe-eureca/4449494"
        },
        {
            "title": "Tomato Gose Chili Extra Hot Mexican Ed",
            "type": "Sour - Other Gose",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-tomato-gose-chili-extra-hot-mexican-ed/5315111"
        },
        {
            "title": "Milkshake Ale With Raspberry Puree",
            "type": "IPA - Milkshake",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-milkshake-ale-with-raspberry-puree/3625561"
        },
        {
            "title": "Wild Ale 2021 Batch #2",
            "type": "Wild Ale - Other",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-wild-ale-2021-batch-2/5296549"
        },
        {
            "title": "Marzen",
            "type": "Märzen",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-marzen/2989639"
        },
        {
            "title": "Fruit Ale Raspberry & Passion Fruit",
            "type": "Fruit Beer",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-fruit-ale-raspberry-and-passion-fruit/5324957"
        },
        {
            "title": "Hard Seltzer Jackfruit",
            "type": "Hard Seltzer",
            "rating": null,
            "url": "https://untappd.com/b/salden-s-brewery-hard-seltzer-jackfruit/5324958"
        }
    ],
}

export function findUntappdRating(beer: Beer) {
    let titleToSearch = cutBeerTitle(beer.title).replace(beer.brewery, '').toLowerCase().split(' ').join('');

    return untapdBeers[beer.brewery]
        ?.find(b => titleToSearch.includes(b.title.toLowerCase().split(' ').join('')))
        ?.rating;

}