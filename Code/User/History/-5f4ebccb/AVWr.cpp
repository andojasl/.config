#include <Arduino.h>
#include <Wire.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <freertos/semphr.h>

#define ADDR2 0x20 // IO expander address

#define CAR_RED 6
#define CAR_YELLOW 7
#define CAR_GREEN 5

#define PED_RED 4
#define PED_YELLOW 3
#define PED_GREEN 2

#define BUTTON 0

SemaphoreHandle_t i2cMutex; // create mutex
SemaphoreHandle_t pedRequestSemaphore; // create semaphore

// declare functions
void writeStatus17(int value);
int readStatus17();
bool readButton();
void changeLights();
void setPinState(uint8_t pin, bool state);
void trafficLightTask(void *parameter);
void buttonWatchTask(void *parameter);

void setup()
{
    // Initialize Serial first
    Serial.begin(9600);
    while (!Serial) { delay(10); }  // Wait for Serial

    Serial.println("Starting setup...");

    Wire.begin();
    Serial.println("Wire initialized");

    // Initialize the IO expander pins
    Wire.beginTransmission(ADDR2);
    Wire.write(0x00); // IODIR register
    Wire.write(0x01); // Set all pins as outputs except for button (0b00000001)
    Wire.endTransmission();

    // Enable internal pull-up resistor for the button pin
    Wire.beginTransmission(ADDR2);
    Wire.write(0x0C); // GPPU register (Pull-up resistor configuration)
    Wire.write(0x01); // Enable pull-up on GPIOA0 (button pin)
    Wire.endTransmission();

    // Optionally set initial values
    writeStatus17(0x00); // Clear all outputs initially

    // Create mutex
    Serial.print("Creating mutex... \n");
    i2cMutex = xSemaphoreCreateMutex();
    if (i2cMutex == NULL)
    {
        Serial.println("Failed to create mutex");
        while (1); // Stop if mutex creation fails
    }
    else
    {
        Serial.println("Mutex created successfully");
    }

    // Create semaphore
    Serial.print("Creating semaphore... \n");
    pedRequestSemaphore = xSemaphoreCreateBinary();
    if (pedRequestSemaphore == NULL)
    {
        Serial.println("Failed to create semaphore");
        while (1); // Stop if semaphore creation fails
    }
    else
    {
        Serial.println("Semaphore created successfully");
    }

    // Create tasks
    Serial.println("Creating tasks...");
    xTaskCreate(buttonWatchTask, "ButtonWatchTask", 4096, NULL, 1, NULL);
    xTaskCreate(trafficLightTask, "TrafficLightTask", 4096, NULL, 1, NULL);

    // Set initial pin states
    setPinState(CAR_RED, LOW);
    setPinState(CAR_YELLOW, LOW);
    setPinState(CAR_GREEN, HIGH);
    setPinState(PED_GREEN, LOW);
    setPinState(PED_RED, HIGH);
    setPinState(PED_YELLOW, LOW);

    Serial.println("Setup complete");
}

void loop()
{
    // nothing, cause vTask
}

void writeStatus17(int value) {
    if (xSemaphoreTake(i2cMutex, portMAX_DELAY)) {
        Wire.beginTransmission(ADDR2);
        Wire.write(0x12); // OLAT register
        Wire.write(value);
        Wire.endTransmission();
        xSemaphoreGive(i2cMutex);
    } else {
        Serial.println("Failed to take mutex in writeStatus17");
    }
}

int readStatus17() {
    int value = -1;
    if (xSemaphoreTake(i2cMutex, portMAX_DELAY)) {
        Wire.beginTransmission(ADDR2);
        Wire.write(0x12); // OLAT register (or GPIO register if needed)
        Wire.endTransmission();
        Wire.requestFrom(ADDR2, 1);
        if (Wire.available()) {
            value = Wire.read();
        }
        xSemaphoreGive(i2cMutex);
    } else {
        Serial.println("Failed to take mutex in readStatus17");
    }
    return value;
}

bool readButton() {
    bool pressed = false;

    if (xSemaphoreTake(i2cMutex, portMAX_DELAY)) {
        Wire.beginTransmission(ADDR2);
        Wire.write(0x13); // GPIO register (assuming GPIOA)
        Wire.endTransmission();
        Wire.requestFrom(ADDR2, 1);
        if (Wire.available()) {
            int value = Wire.read();
            Serial.print("Button register value: ");
            Serial.println(value, BIN);
            pressed = (value & 0x01) == 0; // Button press logic
            Serial.print("Button pressed: ");
            Serial.println(pressed ? "YES" : "NO");
        } else {
            Serial.println("Failed to read button state");
        }
        xSemaphoreGive(i2cMutex);
    } else {
        Serial.println("Failed to take mutex in readButton");
    }
    return pressed;
}

void setPinState(uint8_t pin, bool state)
{
    int currentStatus = readStatus17();

    if (currentStatus != -1)
    {
        if (state == HIGH)
        {
            currentStatus |= (1 << pin);
        }
        else
        {
            currentStatus &= ~(1 << pin);
        }
        writeStatus17(currentStatus);
    }
}

void changeLights()
{
    // Car yellow, pedestrian red
    Serial.println("Car yellow, pedestrian red");
    setPinState(CAR_GREEN, LOW);
    setPinState(CAR_YELLOW, HIGH);
    setPinState(CAR_RED, LOW);
    setPinState(PED_GREEN, LOW);
    setPinState(PED_YELLOW, LOW);
    setPinState(PED_RED, HIGH);
    vTaskDelay(2000 / portTICK_PERIOD_MS);

    // Car red, pedestrian red
    Serial.println("Car red, pedestrian red");
    setPinState(CAR_YELLOW, LOW);
    setPinState(CAR_RED, HIGH);
    vTaskDelay(2000 / portTICK_PERIOD_MS);

    // Car red, pedestrian green
    Serial.println("Car red, pedestrian green");
    setPinState(PED_RED, LOW);
    setPinState(PED_GREEN, HIGH);
    vTaskDelay(5000 / portTICK_PERIOD_MS);

    // Car red, pedestrian yellow
    Serial.println("Car red, pedestrian yellow");
    setPinState(PED_GREEN, LOW);
    setPinState(PED_YELLOW, HIGH);
    vTaskDelay(2000 / portTICK_PERIOD_MS);

    // Car red, pedestrian red
    Serial.println("Car red, pedestrian red");
    setPinState(PED_YELLOW, LOW);
    setPinState(PED_RED, HIGH);
    vTaskDelay(3000 / portTICK_PERIOD_MS);

    //Car yellow, pedestrian red
    Serial.println("Car yellow, pedestrian red");
    setPinState(CAR_RED, LOW);
    setPinState(CAR_YELLOW, HIGH);
    vTaskDelay(2000 / portTICK_PERIOD_MS);

    // Car green, pedestrian red
    Serial.println("Car green, pedestrian red");
    setPinState(CAR_YELLOW, LOW);
    setPinState(CAR_GREEN, HIGH);
}

void changeLightsWithImmediateResponse()
{
    // Car yellow, pedestrian red
    Serial.println("Car yellow, pedestrian red");
    setPinState(CAR_GREEN, LOW);
    setPinState(CAR_YELLOW, HIGH);
    setPinState(CAR_RED, LOW);
    setPinState(PED_GREEN, LOW);
    setPinState(PED_YELLOW, LOW);
    setPinState(PED_RED, HIGH);
    vTaskDelay(2000 / portTICK_PERIOD_MS);

    // Car red, pedestrian red
    Serial.println("Car red, pedestrian red");
    setPinState(CAR_YELLOW, LOW);
    setPinState(CAR_RED, HIGH);
    vTaskDelay(2000 / portTICK_PERIOD_MS);

    // Car red, pedestrian green
    Serial.println("Car red, pedestrian green");
    setPinState(PED_RED, LOW);
    setPinState(PED_GREEN, HIGH);
    vTaskDelay(5000 / portTICK_PERIOD_MS);

    // Car red, pedestrian yellow
    Serial.println("Car red, pedestrian yellow");
    setPinState(PED_GREEN, LOW);
    setPinState(PED_YELLOW, HIGH);
    vTaskDelay(2000 / portTICK_PERIOD_MS);

    // Car red, pedestrian red
    Serial.println("Car red, pedestrian red");
    setPinState(PED_YELLOW, LOW);
    setPinState(PED_RED, HIGH);
    vTaskDelay(3000 / portTICK_PERIOD_MS);

    //Car yellow, pedestrian red
    Serial.println("Car yellow, pedestrian red");
    setPinState(CAR_RED, LOW);
    setPinState(CAR_YELLOW, HIGH);
    vTaskDelay(2000 / portTICK_PERIOD_MS);

    // Car green, pedestrian red
    Serial.println("Car green, pedestrian red");
    setPinState(CAR_YELLOW, LOW);
    setPinState(CAR_GREEN, HIGH);
}

void buttonWatchTask(void *parameter) {
    Serial.println("Button watch task started");

    bool lastButtonState = false;
    TickType_t lastDebounceTime = xTaskGetTickCount(); // Initialize debounce time

    while (true) {
        bool currentButtonState = readButton(); // Read button state

        if (currentButtonState != lastButtonState) {
            lastDebounceTime = xTaskGetTickCount(); // Reset debounce timer
        }

        // Check if debounce period has elapsed
        if ((xTaskGetTickCount() - lastDebounceTime) > pdMS_TO_TICKS(50)) {
            if (currentButtonState != lastButtonState) {
                lastButtonState = currentButtonState;

                // If the button is pressed, give semaphore
                if (currentButtonState) {
                    Serial.println("BUTTON PRESSED");
                    if (xSemaphoreGive(pedRequestSemaphore) != pdTRUE) {
                        Serial.println("Failed to give semaphore");
                    }
                }
            }
        }

        vTaskDelay(50 / portTICK_PERIOD_MS); // Short delay for task scheduling
    }
}

void trafficLightTask(void *parameter) {
    Serial.println("Traffic light task started");
    while (true) {
        // Car green light for 10 seconds
        setPinState(CAR_GREEN, HIGH);
        setPinState(CAR_RED, LOW);
        setPinState(CAR_YELLOW, LOW);
        setPinState(PED_RED, HIGH);
        setPinState(PED_GREEN, LOW);
        setPinState(PED_YELLOW, LOW);

        // Wait for 10 seconds or button press
        TickType_t startTime = xTaskGetTickCount();
        bool buttonPressed = false;

        while (xTaskGetTickCount() - startTime < pdMS_TO_TICKS(10000)) {
            if (xSemaphoreTake(pedRequestSemaphore, pdMS_TO_TICKS(10)) == pdTRUE) {
                buttonPressed = true;
                Serial.println("Semaphore taken, button press detected.");
                break;
            }
            vTaskDelay(50 / portTICK_PERIOD_MS); // Short delay for button debounce
        }

        if (buttonPressed) {
            Serial.println("Button press detected in traffic light task");
            changeLightsWithImmediateResponse(); // Handle button press
        } else {
            Serial.println("No button press detected, continuing normal cycle");
            changeLights(); // Proceed with the normal sequence
        }
    }
}
