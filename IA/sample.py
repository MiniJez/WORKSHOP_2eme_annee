import pymongo
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv('MONGODB_URL')
DB_NAME = os.getenv('DB_NAME')
TABLE_SENSORS = os.getenv('TABLE_SENSORS')
TABLE_RAWDATA = os.getenv('TABLE_RAWDATA')
TABLE_ALERTS = os.getenv('TABLE_ALERTS')

# Database connection
myClient = pymongo.MongoClient(MONGODB_URL)
mydb = myClient[DB_NAME]
sensorsTable = mydb[TABLE_SENSORS]
rawDataTable = mydb[TABLE_RAWDATA]
alertsTable = mydb[TABLE_ALERTS]


rowData = rawDataTable.find({'sensorID': "062336c2-d39b-42cf-a8bb-1d05de74bd7e"})
rowData = rawDataTable.find({'sensorID': sensor["sensorID"]})
sensorsData = sensorsTable.find()