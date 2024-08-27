#include <Arduino.h>
#include <Wire.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <freertos/semphr.h>

#define ADDR2 0x27 // IO expander address

#define CAR_RED 6
#define CAR_YELLOW 7
#define CAR_GREEN 5

#define PED_RED 4
#define PED_YELLOW 3
#define PED_GREEN 2

#define BUTTON 1

SemaphoreHandle_t i2cMutex; // Mutex for I2C operations
SemaphoreHandle_t buttonSemaphore; // Semaphore to signal button press

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
    Wire.write(0x00); // Set all pins as outputs
    Wire.endTransmission();
    
    // Optionally set initial values
    writeStatus17(0x00); // Clear all outputs initially

    // Create mutex and semaphore
    Serial.print("Creating mutex and semaphore... \n");
    i2cMutex = xSemaphoreCreateMutex();
    buttonSemaphore = xSemaphoreCreateBinary();
    if (i2cMutex == NULL || buttonSemaphore == NULL)
    {
        Serial.println("Failed to create mutex or semaphore");
        while (1); // Stop if creation fails
    }
    else
    {
        Serial.println("Mutex and semaphore created successfully");
    }

    // Create tasks
    Serial.println("Creating tasks...");
    xTaskCreate(buttonWatchTask, "ButtonWatchTask", 4096, NULL, 1, NULL);
    xTaskCreate(trafficLightTask, "TrafficLightTask", 4096, NULL, 1, NULL);

    // Set initial state of lights
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
    // nothing, tasks will handle everything
}

void writeStatus17(int value)
{
    if (i2cMutex != NULL && xSemaphoreTake(i2cMutex, portMAX_DELAY))
    {
        Wire.beginTransmission(ADDR2);
        Wire.write(0x12); // OLAT register
        Wire.write(value);
        Wire.endTransmission();
        xSemaphoreGive(i2cMutex);
    }
    else
    {
        Serial.println("Failed to take mutex in writeStatus17");
    }
}

int readStatus17()
{
    int value = -1;
    if (i2cMutex != NULL && xSemaphoreTake(i2cMutex, portMAX_DELAY))
    {
        Wire.beginTransmission(ADDR2);
        Wire.write(0x12); // OLAT register (or 0x13 if needed)
        Wire.endTransmission();
        Wire.requestFrom(ADDR2, 1);
        if (Wire.available())
        {
            value = Wire.read();
        }
        xSemaphoreGive(i2cMutex);
    }
    else
    {
        Serial.println("Failed to take mutex in readStatus17");
    }
    return value;
}

bool readButton()
{
    bool pressed = false;

    if (i2cMutex != NULL && xSemaphoreTake(i2cMutex, portMAX_DELAY))
    {
        Wire.beginTransmission(ADDR2);
        Wire.write(0x13); // GPIO register (or change to correct register)
        Wire.endTransmission();
        Wire.requestFrom(ADDR2, 1);
        if (Wire.available())
        {
            int value = Wire.read();
            pressed = (value & 0x01) == 0;
        }
        xSemaphoreGive(i2cMutex);
    }
    else
    {
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
    setPinState(PED_RED, HIGH);
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

    // Car yellow, pedestrian red
    Serial.println("Car yellow, pedestrian red");
    setPinState(CAR_RED, LOW);
    setPinState(CAR_YELLOW, HIGH);
    vTaskDelay(2000 / portTICK_PERIOD_MS);
}

void buttonWatchTask(void *parameter)
{
    Serial.println("ButtonWatchTask started");
    while (true)
    {
        if (readButton())
        {
            Serial.println("BUTTON PRESSED");
            xSemaphoreGive(buttonSemaphore); // Signal that button was pressed
        }
        vTaskDelay(100 / portTICK_PERIOD_MS);
    }
}

void trafficLightTask(void *parameter)
{
    Serial.println("TrafficLightTask started");
    while (true)
    {
        // Start the traffic light sequence
        setPinState(CAR_YELLOW, LOW);
        setPinState(CAR_GREEN, HIGH);

        // Wait for either the button press or the end of the car green light phase
        TickType_t startTime = xTaskGetTickCount();
        bool buttonPressed = false;

        while (true)
        {
            if (xSemaphoreTake(buttonSemaphore, 0) == pdTRUE)
            {
                buttonPressed = true;
                break;
            }
            // Check if 10 seconds have passed
            if ((xTaskGetTickCount() - startTime) >= pdMS_TO_TICKS(10000))
            {
                break;
            }
            vTaskDelay(100 / portTICK_PERIOD_MS);
        }

        // If button was pressed during car green light phase, restart sequence
        if (buttonPressed)
        {
            Serial.println("Button press detected during car green light. Restarting sequence...");
            vTaskDelay(500 / portTICK_PERIOD_MS); // Short delay before restarting sequence
        }

        // Proceed with the light sequence
        changeLights();
    }
}