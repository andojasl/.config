#include <Arduino.h>

#define LEDInt 2
#define redLED 15
#define yellowLED 13
#define greenLED 12

unsigned long previousRedMillis = 0;
unsigned long previousYellowMillis = 0;
const long redInterval = 500;
const long yellowInterval = 300;
bool redState = false;
bool yellowState = false;

void setup() {
  pinMode(redLED, OUTPUT);
  pinMode(yellowLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
}

void loop() {
  unsigned long currentMillis = millis();

  // Blink red LED
  if (currentMillis - previousRedMillis >= redInterval) {
    previousRedMillis = currentMillis;
    redState = !redState;
    digitalWrite(redLED, redState ? HIGH : LOW);
  }

  // Blink yellow LED
  if (currentMillis - previousYellowMillis >= yellowInterval) {
    previousYellowMillis = currentMillis;
    yellowState = !yellowState;
    digitalWrite(yellowLED, yellowState ? HIGH : LOW);
  }

  // Traffic light sequence
  digitalWrite(greenLED, HIGH);
  delay(2000);
  digitalWrite(greenLED, LOW);
}
