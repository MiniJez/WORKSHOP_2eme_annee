import requests
import pymongo
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv('MONGODB_URL')
DB_NAME = os.getenv('DB_NAME')
TABLE_SENSORS = os.getenv('TABLE_SENSORS')
TABLE_RAWDATA = os.getenv('TABLE_RAWDATA')

print("Hello World ! I'm the IA !")

# API request
#response = requests.get("")
#print(response.status_code)

# Database connection
#myClient = pymongo.MongoClient(MONGODB_URL)
#mydb = myClient[DB_NAME]
#sensorsTable = mydb[TABLE_SENSORS]
#rawDataTable = mydb[TABLE_RAWDATA]
#sensorsData = sensorsTable.find()
#for x in sensorsData:
#  print(x) 
#  break