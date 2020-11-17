#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <LiquidCrystal_I2C.h>
#include <DHTesp.h>
#include "config.h"
#ifdef ESP32
#pragma message(THIS EXAMPLE IS FOR ESP8266 ONLY !)
#error Select ESP8266 board.
#endif

LiquidCrystal_I2C lcd(0x27, 20, 4);
DHTesp dht;

void setup()
{
  Serial.begin(115200);
  lcd.init();
  lcd.backlight();
  dht.setup(14, DHTesp::DHT11);

  WiFi.begin(ssid, password);// Connect to the network
  WiFi.hostname(uuid); 
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