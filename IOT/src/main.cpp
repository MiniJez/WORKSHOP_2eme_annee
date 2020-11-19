#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <LiquidCrystal_I2C.h>
#include <DHTesp.h>
#include <ArduinoJson.h>

#include "config.h"
#include "sentences.h"

LiquidCrystal_I2C lcd(0x27, 20, 4);
DHTesp dht;
WiFiClient espClient;               // create the wifi client
PubSubClient mqttClient(espClient); // create the mqtt client
StaticJsonBuffer<2000> jsonBuffer;

//callback when we received a notification
void callback(char *topic, byte *payload, unsigned int length)
{
  char inData[2000];
  /* Serial.println("-**- Message arrived ! -**-");
  Serial.println("Topic :" + String(topic));
  Serial.println("Message :");*/
  for (int i = 0; i < length; i++)
  {
    Serial.print((char)payload[i]);
    inData[(i - 0)] = (char)payload[i];
  }
  Serial.println();
  // Serial.println("-**-");
  JsonObject &doc = jsonBuffer.parseObject(inData);

  const char *type = doc["type"];
  const char *text = doc["text"];
  const char *checked = doc["checked"];

  /* Serial.println(type);
  Serial.println(text);
  Serial.println(checked);
  Serial.println();*/

  //clear the lines
  lcd.setCursor(0, 2);
  lcd.print("                    ");
  lcd.setCursor(0, 3);
  lcd.print("                    ");

  //print the allerts
  lcd.setCursor(0, 2);
  lcd.print(type);
  lcd.setCursor(0, 3);
  lcd.print(text);
  // beep
 // tone(12, 75, 1);
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

//Setup Function
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

// Loop function, repeats indefinitly
void loop()
{
  lcd.setCursor(0, 0);
  lcd.print("                    ");
  lcd.setCursor(0, 1);
  lcd.print("                    ");

  if (mqttClient.connected())
  {
    lcd.setCursor(19, 0);
    lcd.print((char)183);
  }

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
  lcd.print("PPMCO2");

  lcd.setCursor(11, 1);
  // lcd.print("PM2.5:");
  lcd.print(random(500));
  lcd.print("PPM2.5");

  sendMqtt();
  mqttClient.loop();
  delay(dht.getMinimumSamplingPeriod() + 1100);
}
