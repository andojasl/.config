#include <Arduino.h>

#define LEDInt 2
#define redLED 15
#define yellowLED 13
#define greenLED 12

void setup() {
  pinMode(redLED, OUTPUT);
  pinMode(yellowLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
}

void loop() {
  digitalWrite(yellowLED, LOW);
  digitalWrite(redLED, HIGH);
  delay(2000);
  digitalWrite(yellowLED, HIGH);
  delay(1000);
  digitalWrite(yellowLED, LOW );
  digitalWrite(redLED,  LOW);
  digitalWrite(greenLED,  HIGH);
  delay(2000);
  digitalWrite(greenLED, LOW);
  digitalWrite(yellowLED, HIGH);


}
