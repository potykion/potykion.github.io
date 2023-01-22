# import requests
#
# url = "https://spotify23.p.rapidapi.com/search/"
#
# querystring = {"q":"dalek","type":"albums","offset":"0","limit":"10","numberOfTopResults":"5"}
#
# headers = {
# 	"X-RapidAPI-Key": "0a3edf81cfmsh5018215887a2d46p1969a9jsnfafc2cbaac2f",
# 	"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
# }
#
# response = requests.request("GET", url, headers=headers, params=querystring)
#
# print(response.text)


# https://rapidapi.com/Glavier/api/spotify23

import requests

url = "https://spotify23.p.rapidapi.com/artist_albums/"

querystring = {"id": "1zDrsLJJfYel0jJruLe4Yp", "offset": "0", "limit": "100"}

headers = {
    "X-RapidAPI-Key": "0a3edf81cfmsh5018215887a2d46p1969a9jsnfafc2cbaac2f",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
}

response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)
