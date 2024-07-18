import json
from collections import defaultdict

from potyk_io_back.core.config import BASE_DIR
from potyk_io_back.core.services import sql


def main(beer_history_path, checkins_path):
    q = sql()

    with open(beer_history_path, "r", encoding="utf-8") as f:
        beer_history = json.load(f)

    with open(checkins_path, "r", encoding="utf-8") as f:
        checkins = json.load(f)
    checkins_by_url = defaultdict(list)
    for checkin in checkins:
        checkins_by_url[checkin["url"]].append(checkin["comment"])

    with q.commit_after():
        for hist in beer_history:
            q.execute(
                "insert into beer_my_untappd_beers (url, name, style, brewery, rating, abv, ibu, img, review) values  (?,?,?,?,?,?,?,?,?)",
                [hist[key] for key in ("url", "name", "style", "brewery", "rating", "abv", "ibu", "img")]
                + ["\n\n".join(checkins_by_url[hist["url"]])],
            )


if __name__ == "__main__":
    beer_history = BASE_DIR / "apps/parsers/untappd/my-beer-history.json"
    checkins = BASE_DIR / "apps/parsers/untappd/my-checkins.json"

    main(
        beer_history,
        checkins,
    )
