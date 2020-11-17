#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <LiquidCrystal_I2C.h>
#include "config.h"

LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup()
{
  Serial.begin(115200); // Start the Serial communication to send messages to the computer
  delay(10);

  WiFi.begin(ssid, password); // Connect to the network
  Serial.print("Connecting to ");
  Serial.print(ssid);
  Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED)
  { // Wait for the Wi-Fi to connect
    delay(1000);
    Serial.print(++i);
    Serial.print(' ');
  }

  Serial.println('\n');
  Serial.println("Connection established!");
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP()); // Send the IP address of the ESP8266 to the computer

  lcd.init(); // initialize the lcd
  // Print a message to the LCD.
  lcd.backlight();
  lcd.setCursor(3, 0);
  lcd.print("Hello, world!");
  lcd.setCursor(2, 1);
  lcd.print("Ywrobot Arduino!");
  lcd.setCursor(0, 2);
  lcd.print("Arduino LCM IIC 2004");
  lcd.setCursor(2, 3);
  lcd.print("Power By Ec-yuan!");
}

void loop()
{
  // put your main code here, to run repeatedly:
}