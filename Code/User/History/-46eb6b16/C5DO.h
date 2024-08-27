#ifndef IO_CONTROL_H
#define IO_CONTROL_H

#include <Arduino.h>

#define ADDR2 0x20 // IO expander address

#define CAR_RED 6
#define CAR_YELLOW 7
#define CAR_GREEN 5

#define PED_RED 4
#define PED_YELLOW 3
#define PED_GREEN 2

#define BUTTON 0

void writeStatus17(int value);
int readStatus17();
bool readButton();
void setPinState(uint8_t pin, bool state);

#endif
