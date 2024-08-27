#include <Arduino.h>
#include <Wire.h>
#define MCP23017_ADDR 0x20
const int freq = 5000;
const int ledChannel = 0;
const int resolution = 8;
const int motChannel = 1;


struct State {
  int currentBrightness;
  int lastBrightness;
  bool motorOn;
  bool direction; // false for left, true for right
} state = {0, 255, false, false}; // Set initial currentBrightness to 0 and lastBrightness to 255

void toggleLED(int pin, int state);
void updateLEDs();
int readStatus17();
int detectPressedButton(int portBState);
void handleButtonPress(int button);
void smoothTransition(int targetBrightness, int speed);

void setup() {
  Serial.begin(9600);
  Wire.begin();
  Serial.println("Device ready!");

  Wire.beginTransmission(0x20);
  Wire.write(0x00); // IODIRA register
  Wire.write(0x00); // Set all of port A to outputs
  Wire.endTransmission();

  // Set Port B as input for buttons
  Wire.beginTransmission(MCP23017_ADDR);
  Wire.write(0x01); // IODIRB register
  Wire.write(0xFF); // Set all of port B to inputs
  Wire.endTransmission();

  Wire.beginTransmission(MCP23017_ADDR);
  Wire.write(0x0D); // PULL UP register
  Wire.write(0xFF); // Enable pull-ups on Port B
  Wire.endTransmission();
  bool ledcSetupSuccess = ledcSetup(motChannel, freq, resolution);
  if (!ledcSetupSuccess) {
    Serial.println("LEDC setup failed");
  } else {
    Serial.println("LEDC setup succeeded");
  }
  Serial.println("LEDC attached to pin");

  updateLEDs();
}

