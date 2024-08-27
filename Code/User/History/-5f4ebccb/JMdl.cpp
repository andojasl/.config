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

    // Create tasks
    Serial.println("Creating tasks...");
    xTaskCreate(buttonWatchTask, "ButtonWatchTask", 4096, NULL, 1, NULL);
    xTaskCreate(trafficLightTask, "TrafficLightTask", 4096, NULL, 1, NULL);
    setPinState(CAR_RED, LOW);
    setPinState(CAR_YELLOW, LOW);
    setPinState(CAR_GREEN,  HIGH);
    setPinState(PED_GREEN, LOW);
    setPinState(PED_RED, HIGH);
    setPinState(PED_YELLOW, LOW);

    Serial.println("Setup complete");
}

void loop()
{
    // nothing, cause vTask
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
        vTaskDelay(10000 / portTICK_PERIOD_MS);

}

void buttonWatchTask(void *parameter)
{
    Serial.println("Task 1 started");
    while (true)
    {
        if (readButton())
        {
            Serial.println("BUTTON PRESSED");
            changeLights(); // Optionally handle button press
        }
        vTaskDelay(100 / portTICK_PERIOD_MS);
    }
}

void trafficLightTask(void *parameter)
{
    Serial.println("Task 2 started");
    while (true)
    {
        //changeLights(); // Run the traffic light sequence
        vTaskDelay(1000 / portTICK_PERIOD_MS); // Adjust delay as needed
    }
}