from potyk_io_back.core.q import Q


def get_travel_places(q: Q):
    return q.select_all("select * from travel_places order by date desc")
