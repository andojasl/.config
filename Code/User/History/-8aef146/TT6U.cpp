#include "trafficLightTask.h"
#include "ioControl.h"
#include <Arduino.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <freertos/semphr.h>

extern SemaphoreHandle_t buttonSemaphore;

void changeLights() {
    // Implement the traffic light sequence as described previously
    // Use the setPinState function from ioControl to manipulate pins
}

void trafficLightTask(void *parameter) {
    while (true) {
        setPinState(CAR_YELLOW, LOW);
        setPinState(CAR_GREEN, HIGH);

        TickType_t startTime = xTaskGetTickCount();
        bool buttonPressed = false;

        while (true) {
            if (xSemaphoreTake(buttonSemaphore, 0) == pdTRUE) {
                buttonPressed = true;
                break;
            }
            if ((xTaskGetTickCount() - startTime) >= pdMS_TO_TICKS(10000)) {
                break;
            }
            vTaskDelay(100 / portTICK_PERIOD_MS);
        }

        if (buttonPressed) {
            vTaskDelay(500 / portTICK_PERIOD_MS);
        }

        changeLights();
    }
}
