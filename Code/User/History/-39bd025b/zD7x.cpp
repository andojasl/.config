#include "ioControl.h"
#include <Wire.h>
#include <freertos/FreeRTOS.h>
#include <freertos/semphr.h>

extern SemaphoreHandle_t i2cMutex;

void writeStatus17(int value) {
    if (xSemaphoreTake(i2cMutex, portMAX_DELAY)) {
        Wire.beginTransmission(ADDR2);
        Wire.write(0x12); // OLAT register
        Wire.write(value);
        Wire.endTransmission();
        xSemaphoreGive(i2cMutex);
    }
}

int readStatus17() {
    int value = -1;
    if (xSemaphoreTake(i2cMutex, portMAX_DELAY)) {
        Wire.beginTransmission(ADDR2);
        Wire.write(0x12); // OLAT register
        Wire.endTransmission();
        Wire.requestFrom(ADDR2, 1);
        if (Wire.available()) {
            value = Wire.read();
        }
        xSemaphoreGive(i2cMutex);
    }
    return value;
}

bool readButton() {
    bool pressed = false;
    if (xSemaphoreTake(i2cMutex, portMAX_DELAY)) {
        Wire.beginTransmission(ADDR2);
        Wire.write(0x13); // GPIO register
        Wire.endTransmission();
        Wire.requestFrom(ADDR2, 1);
        if (Wire.available()) {
            int value = Wire.read();
            pressed = (value & 0x01) == 0;
        }
        xSemaphoreGive(i2cMutex);
    }
    return pressed;
}

void setPinState(uint8_t pin, bool state) {
    int currentStatus = readStatus17();
    if (currentStatus != -1) {
        if (state == HIGH) {
            currentStatus |= (1 << pin);
        } else {
            currentStatus &= ~(1 << pin);
        }
        writeStatus17(currentStatus);
    }
}
