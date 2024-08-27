#include <Arduino.h>

#define LEDInt 2

void setup() {
  pinMode(LEDInt, OUTPUT);
}

void loop() {
  digitalWrite(LEDInt, HIGH);
  delay(1000);
  digitalWrite(LEDInt, LOW);
  delay(1000);
}
