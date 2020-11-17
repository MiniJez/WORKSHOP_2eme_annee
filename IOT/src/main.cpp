#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <LiquidCrystal_I2C.h>
#include <DHTesp.h>
#include "config.h"

LiquidCrystal_I2C lcd(0x27, 20, 4);
DHTesp dht;
WiFiClient espClient;               // create the wifi client
PubSubClient mqttClient(espClient); // create the mqtt client

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

  // Attempt to connect to the server with the ID "myClientID"
  if (mqttClient.connect(uuid))
  {
    Serial.println("Connection has been established, well done");

    // Establish the subscribe event
    //	mqttClient.setCallback(subscribeReceive);
  }
  else
  {
    Serial.println("Looks like the server connection failed...");
  }
}

void loop()
{
  lcd.clear();

  float humidity = dht.getHumidity();
  float temperature = dht.getTemperature();

  lcd.setCursor(0, 0);
  lcd.print("Temp:");
  lcd.print(temperature, 1);

  lcd.setCursor(0, 1);
  lcd.print("Humi:");
  lcd.print(humidity, 1);

  lcd.setCursor(0, 2);
  lcd.print("C02:");
  lcd.print(random(5000));

  lcd.setCursor(0, 3);
  lcd.print("PM2.5:");
  lcd.print(random(500));

  Serial.println(dht.getStatusString());
  Serial.println(humidity);
  Serial.println(temperature);
  delay(dht.getMinimumSamplingPeriod() + 9000);
}