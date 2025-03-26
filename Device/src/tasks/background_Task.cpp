// src/background_Task.cpp

#include "background_Task.h"

const char* ssid = PROJECT_WIFI_SSID;
const char* password = PROJECT_WIFI_PASSWORD;

static const int ledPin = 10; // Chân LED GPIO
AsyncWebServer server(80);
// float frame1[32 * 24]; // Dữ liệu từ cảm biến 1
// float frame2[32 * 24]; // Dữ liệu từ cảm biến 2

// Kết nối WiFi
void wifiTask(void *pvParameters) {
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    int retry = 0;
    while (WiFi.status() != WL_CONNECTED && retry < 20) { // Thử tối đa 20 lần (~20 giây)
        vTaskDelay(1000 / portTICK_PERIOD_MS);
        Serial.println("Đang kết nối WiFi...");
        retry++;
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("WiFi Connected!");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("Kết nối WiFi thất bại!");
    }

    vTaskDelete(NULL);
}

// Xử lý dữ liệu cảm biến MLX90640
void readMLX90640Data() {
    // TODO: Đọc dữ liệu từ MLX90640 vào frame1 và frame2
}

// API gửi dữ liệu cảm biến
void serverTask(void *pvParameters) {
    if (!SPIFFS.begin(true)) {
        Serial.println("Lỗi khi khởi tạo SPIFFS");
        vTaskDelete(NULL);
    }

    // Route "/" trả về dữ liệu từ 2 cảm biến nhiệt
    // server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    //     readMLX90640Data(); // Đọc dữ liệu trước khi gửi

    //     String json = "{ \"cam1\": [";
    //     for (int i = 0; i < 32 * 24; i++) {
    //         json += String(frame1[i]);
    //         if (i < (32 * 24 - 1)) json += ",";
    //     }
    //     json += "], \"cam2\": [";
    //     for (int i = 0; i < 32 * 24; i++) {
    //         json += String(frame2[i]);
    //         if (i < (32 * 24 - 1)) json += ",";
    //     }
    //     json += "] }";
        
    //     request->send(200, "application/json", json);
    // });

    server.begin();
    vTaskDelete(NULL);
}

// Khởi tạo các task nền
void backgroundTaskInit() {
    pinMode(ledPin, OUTPUT);

    xTaskCreate(wifiTask, "WiFiTask", 4096, NULL, 1, NULL);
    xTaskCreate(serverTask, "ServerTask", 8192, NULL, 1, NULL);
}
