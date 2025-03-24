
// Import required libraries
#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"
#include "DHT20.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "../project_config.h"
#include <Adafruit_MLX90640.h>


// Replace with your network credentials
const char* ssid = PROJECT_WIFI_SSID;
const char* password = PROJECT_WIFI_PASSWORD;

// const char* ssid = "ACLAB";
// const char* password = "ACLAB2023";


Adafruit_MLX90640 mlx;
float frame[32 * 24]; // Buffer chứa dữ liệu nhiệt độ

#define MINTEMP 20
#define MAXTEMP 35


// Set LED GPIO
const int ledPin = 10;
// Stores LED state
String ledState;

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

// Replaces placeholder with LED state value
String processor(const String& var){
  Serial.println(var);
  if(var == "STATE"){
    if(digitalRead(ledPin)){
      ledState = "ON";
    }
    else{
      ledState = "OFF";
    }
    Serial.print(ledState);
    return ledState;
  }
  return String();
}

//thermal camera task
void mlxTask(void *pvParameters) {
  Serial.begin(115200);
  if (!mlx.begin(MLX90640_I2CADDR_DEFAULT, &Wire)) {
    Serial.println("MLX90640 không tìm thấy!");
    vTaskDelete(NULL);
  }
  mlx.setMode(MLX90640_CHESS);
  mlx.setResolution(MLX90640_ADC_18BIT);
  mlx.setRefreshRate(MLX90640_8_HZ);
  Wire.setClock(1000000); // Tốc độ 1 MHz

  while (1) {
    if (mlx.getFrame(frame) == 0) {
      Serial.println("Dữ liệu nhiệt độ:");
      for (int i = 0; i < 32 * 24; i++) {
        Serial.print(frame[i]); Serial.print(" ");
      }
      Serial.println();
    } else {
      Serial.println("Lỗi đọc cảm biến!");
    }
    vTaskDelay(500 / portTICK_PERIOD_MS); // Đọc mỗi 500ms
  }
}


// Task to handle Wi-Fi connection
void wifiTask(void *pvParameters) {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    vTaskDelay(1000 / portTICK_PERIOD_MS);
    Serial.println("Connecting to WiFi..");
  }

  // Print ESP32 Local IP Address
  Serial.println(WiFi.localIP());
  vTaskDelete(NULL);  // Delete the task when done
}

// Task to handle server
void serverTask(void *pvParameters) {
  // Initialize SPIFFS
  if(!SPIFFS.begin(true)){
    Serial.println("An Error has occurred while mounting SPIFFS");
    vTaskDelete(NULL);  // Delete the task if SPIFFS initialization fails
  }

  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html", String(), false, processor);
  });
  
  // Route to load style.css file
  server.on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/style.css", "text/css");
  });

  // Route to set GPIO to HIGH
  server.on("/on", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(ledPin, HIGH);    
    request->send(SPIFFS, "/index.html", String(), false, processor);
  });
  
  // Route to set GPIO to LOW
  server.on("/off", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(ledPin, LOW);    
    request->send(SPIFFS, "/index.html", String(), false, processor);
  });

  // Start server
  server.begin();
  vTaskDelete(NULL);  // Delete the task when done
}

void setup(){
  pinMode(ledPin, OUTPUT);

  // Create tasks for Wi-Fi and server
  xTaskCreate(wifiTask, "WiFiTask", 4096, NULL, 1, NULL);
  xTaskCreate(serverTask, "ServerTask", 8192, NULL, 1, NULL);
  xTaskCreate(mlxTask, "MLX90640Task", 8192, NULL, 1, NULL);
}
 
void loop(){
  // Nothing to do here, FreeRTOS tasks handle the work
}