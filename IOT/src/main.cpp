#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <LiquidCrystal_I2C.h>
#include <DHTesp.h>
#include "config.h"
#include <ArduinoJson.h>

LiquidCrystal_I2C lcd(0x27, 20, 4);
DHTesp dht;
WiFiClient espClient;               // create the wifi client
PubSubClient mqttClient(espClient); // create the mqtt client

void callback(char *topic, byte *payload, unsigned int length)
{
  Serial.println("Message arrived !");
  Serial.println("Topic :" + String(topic));
  Serial.print("Message :");
  for (int i = 0; i < length; i++)
  {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

//Mqtt reconnect function
void reconnect()
{
  // Loop until we're connected
  while (!mqttClient.connected())
  {
    Serial.println("Attempting MQTT connection...");
    // Attempt to connect
    if (mqttClient.connect(uuid))
    {
      Serial.println("connected");
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println("try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup()
{
  Serial.begin(115200);
  lcd.init();
  lcd.backlight();
  dht.setup(14, DHTesp::DHT11);

  WiFi.begin(ssid, password); // Connect to the network
  WiFi.hostname(uuid);
  //lcd
  lcd.setCursor(0, 0);
  lcd.print("Connecting to ");
  lcd.setCursor(0, 1);
  lcd.print(ssid);
  lcd.setCursor(0, 2);

  while (WiFi.status() != WL_CONNECTED)
  { // Wait for the Wi-Fi to connect
    delay(1000);
    lcd.print(".");
  }
  lcd.setCursor(0, 2);

  lcd.print("Connected !");
  lcd.setCursor(0, 3);
  lcd.print(WiFi.localIP());
  delay(2000);
  lcd.clear();

  //Mqtt
  mqttClient.setServer(mqtt_server, 1883);
  mqttClient.setCallback(callback);
  reconnect();
  mqttClient.subscribe(mqtt_topic_device);

  delay(1500);
}

void json()
{
  StaticJsonDocument<1500> doc;
  char json[] =
      "{\"_id\":{\"$oid\":\"5fb4d9e26ace6120c372f9fc\"},\"CO2\":\"A\u00E9ration n\u00E9cessaire : attention aux maux de t\u00EAte, \u00E0 la somnolence, entra\u00EEne une mauvaise concentration, une perte d'attention, une augmentation de la fr\u00E9quence cardiaque et de l\u00E9g\u00E8res naus\u00E9es\",\"PM25\":\"Tout le monde devrait limiter les efforts prolong\u00E9s\",\"Humidite\":\"\",\"Temperature\":\"Il fait trop chaud : \u00E9teignez\/baissez votre chauffage ou ouvrez les fen\u00EAtres\",\"SensorID\":\"972e1be0-e90b-403d-82f6-d9042a0bc6b8\",\"__v\":{\"$numberInt\":\"0\"}}";

  DeserializationError error = deserializeJson(doc, json);
  if (error)
  {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }
  const char *CO2 = doc["CO2"];
  const char *Humidite = doc["Humidite"];
  const char *PM25 = doc["PM25"];
  const char *Temperature = doc["Temperature"];

  if (CO2 != NULL)
  {
    Serial.println("CO2 :");
    Serial.println(CO2);
  }
  if (Humidite != NULL)
  {
    Serial.println("Humidite :");
    Serial.println(Humidite);
  }
  if (PM25 != NULL)
  {
    Serial.println("PM25 :");
    Serial.println(PM25);
  }
  if (Temperature != NULL)
  {
    Serial.println("Temperature :");
    Serial.println(Temperature);
  }
}

//mqtt send message
void sendMqtt()
{
  if (!mqttClient.connected()) // if the device is disconnected from mqtt
  {
    reconnect();
  }
  // Define message payload
  String payload = "{\"sensorID\":\"" + String(uuid) + "\"," +
                   "\"temp\":\"" + String(dht.getTemperature()) + "\"," +
                   "\"humidity\":\"" + String(dht.getHumidity()) + "\"," +
                   "\"C02\":\"" + String(random(5000)) + "\"," +
                   "\"PM25\":\"" + String(random(500)) + "\"}";

  //publish the message
  if (mqttClient.publish(mqtt_topic, (char *)payload.c_str()))
  {
    Serial.println("Publish message success :)");
  }
  else
  {
    Serial.println("Could not send message :(");
  }
}

void loop()
{

  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("Temp:");
  lcd.print(dht.getTemperature(), 1);

  lcd.setCursor(0, 1);
  lcd.print("Humi:");
  lcd.print(dht.getHumidity(), 1);

  lcd.setCursor(0, 2);
  lcd.print("C02:");
  lcd.print(random(5000));

  lcd.setCursor(0, 3);
  lcd.print("PM2.5:");
  lcd.print(random(500));

  // Serial.println(String(dht.getStatusString()) + " " + String(temperature, 1) + "°C " + String(humidity, 1) + "%");
  sendMqtt();
  mqttClient.loop();
  delay(dht.getMinimumSamplingPeriod() + 1100);
  //json();
}
