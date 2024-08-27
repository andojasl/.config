#include <Arduino.h>
#include <Wire.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <freertos/semphr.h>
#include "trafficLightTask.h"
#include "buttonWatchTask.h"
#include "ioControl.h"

SemaphoreHandle_t i2cMutex;
SemaphoreHandle_t buttonSemaphore;

void setup() {
    Serial.begin(9600);
    while (!Serial) { delay(10); }

    Wire.begin();
    Wire.beginTransmission(ADDR2);
    Wire.write(0x00); // IODIR register
    Wire.write(0x00); // Set all pins as outputs
    Wire.endTransmission();
    
    writeStatus17(0x00); // Clear all outputs initially

    i2cMutex = xSemaphoreCreateMutex();
    buttonSemaphore = xSemaphoreCreateBinary();

    if (i2cMutex == NULL || buttonSemaphore == NULL) {
        Serial.println("Failed to create mutex or semaphore");
        while (1);
    }

    xTaskCreate(buttonWatchTask, "ButtonWatchTask", 4096, NULL, 1, NULL);
    xTaskCreate(trafficLightTask, "TrafficLightTask", 4096, NULL, 1, NULL);

    setPinState(CAR_RED, LOW);
    setPinState(CAR_YELLOW, LOW);
    setPinState(CAR_GREEN, HIGH);
    setPinState(PED_GREEN, LOW);
    setPinState(PED_RED, HIGH);
    setPinState(PED_YELLOW, LOW);

    Serial.println("Setup complete");
}

void loop() {
    // nothing, tasks will handle everything
}
