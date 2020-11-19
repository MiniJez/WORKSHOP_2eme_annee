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

TEMPERATURE_MOYENNE = 20

def Generation_Token():
    
    tokenTestResponse = requests.get("https://eclisson.duckdns.org/ConnectedCity/getSensors", headers=HEADERS)

    if tokenTestResponse.status_code == 500 or tokenTestResponse.status_code == 401:
        tokenResponse = requests.post("https://eclisson.duckdns.org/ConnectedCity/login", json=LOGIN)
        tokenData = json.loads(tokenResponse.text)
        HEADER_TOKEN = tokenData["token"]
        HEADERS["x-access-token"] = HEADER_TOKEN

def Generation_Temperature_Moyenne():
    filter = {
        "sort": -1,
        "limit": 1000
    }
    rawDataResponse = requests.post("https://eclisson.duckdns.org/ConnectedCity/getRawdata", headers=HEADERS, json=filter)
    rawData = json.loads(rawDataResponse.text)

    temp = 0
    for raw in rawData:
        temp = temp + float(raw["temp"])

    TEMPERATURE_MOYENNE = temp / len(rawData)
    print(TEMPERATURE_MOYENNE)