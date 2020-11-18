import json
import requests

HEADER_TOKEN = ""

LOGIN = {
    "email":"intelligenceArtificial@intelligence.artificial",
    "password":"intelligenceArtificial"
}

HEADERS = {
    "x-access-token": HEADER_TOKEN
}

def Generation_Token():
    
    tokenTestResponse = requests.get("https://eclisson.duckdns.org/ConnectedCity/getSensors", headers=HEADERS)

    if tokenTestResponse.status_code == 500 or tokenTestResponse.status_code == 401:
        tokenResponse = requests.post("https://eclisson.duckdns.org/ConnectedCity/login", json=LOGIN)
        tokenData = json.loads(tokenResponse.text)
        HEADER_TOKEN = tokenData["token"]
        HEADERS["x-access-token"] = HEADER_TOKEN