#include "buttonWatchTask.h"
#include "ioControl.h"
#include <Arduino.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <freertos/semphr.h>

extern SemaphoreHandle_t buttonSemaphore;

void buttonWatchTask(void *parameter) {
    while (true) {
        if (readButton()) {
            xSemaphoreGive(buttonSemaphore);
        }
        vTaskDelay(100 / portTICK_PERIOD_MS);
    }
}
