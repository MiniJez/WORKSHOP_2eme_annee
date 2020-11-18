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
StaticJsonBuffer<2000> jsonBuffer;

void callback(char *topic, byte *payload, unsigned int length)
{

  char inData[2000];
  Serial.println("-**- Message arrived ! -**-");
  Serial.println("Topic :" + String(topic));
  Serial.println("Message :");
  for (int i = 0; i < length; i++)
  {
    Serial.print((char)payload[i]);
    inData[(i - 0)] = (char)payload[i];
  }
  Serial.println();
  Serial.println("-**-");
  JsonObject &doc = jsonBuffer.parseObject(inData);

  const char *CO2 = doc["CO2"];
  const char *Humidity = doc["Humidity"];
  const char *PM25 = doc["PM25"];
  const char *Temperature = doc["Temperature"];

  if (CO2 != NULL)
  {
    // tone(12, 25, 100);
    Serial.println("CO2 :");
    Serial.println(CO2);
  }
  if (Humidity != NULL)
  {
    // tone(12, 25, 100);
    // tone(12, 25, 100);
    Serial.println("Humidity :");
    Serial.println(Humidity);
  }
  if (PM25 != NULL)
  {
    // tone(12, 25, 100);
    // tone(12, 25, 100);
    // tone(12, 25, 100);
    Serial.println("PM25 :");
    Serial.println(PM25);
  }
  if (Temperature != NULL)
  {
    // tone(12, 25, 100);
    // tone(12, 25, 100);
    // tone(12, 25, 100);
    // tone(12, 25, 100);
    Serial.println("Temperature :");
    Serial.println(Temperature);
  }

  Serial.println();
}

    //Mqtt reconnect function
    void
    reconnect()
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
  lcd.print(dht.getTemperature(), 1);
  lcd.print((char)223);
  lcd.print("C");

  lcd.setCursor(8, 0);
  lcd.print(dht.getHumidity(), 0);
  lcd.print("%");

  lcd.setCursor(0, 1);
  // lcd.print("C02:");
  lcd.print(random(5000));
  lcd.print("PPM");

  lcd.setCursor(8, 1);
  // lcd.print("PM2.5:");
  lcd.print(random(500));
  lcd.print("PPM");

  lcd.setCursor(0, 3);
  lcd.print((char)183);
  sendMqtt();
  mqttClient.loop();
  delay(dht.getMinimumSamplingPeriod() + 1100);
}
