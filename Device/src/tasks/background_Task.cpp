// src/background_Task.cpp

#include "background_Task.h"

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// WiFi info (chỉnh trong file background_Task.h hoặc platformio.ini)
const char* ssid = PROJECT_WIFI_SSID;
const char* password = PROJECT_WIFI_PASSWORD;

// MQTT broker info
#define BROKER_ADDRESS "app.coreiot.io"
#define MQTT_PORT 1883
#define MQTT_TOPIC "v1/devices/me/telemetry"
#define MQTT_CLIENT_ID "device"
#define MQTT_USERNAME "device"
#define MQTT_PASSWORD "device"

// MQTT and WiFi clients
WiFiClient espClient;
PubSubClient client(espClient);

// WiFi task
void wifiTask(void *pvParameters) {
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    int retry = 0;
    while (WiFi.status() != WL_CONNECTED && retry < 20) {
        Serial.println("Đang kết nối WiFi...");
        vTaskDelay(1000 / portTICK_PERIOD_MS);
        retry++;
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("WiFi đã kết nối!");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("Kết nối WiFi thất bại!");
    }

    vTaskDelete(NULL);
}

// Gửi mảng dữ liệu
void sendArrayData() {
    // Tính dung lượng document
    constexpr size_t CAPACITY =
        JSON_OBJECT_SIZE(1)    // { "thermal": [...] }
      + JSON_ARRAY_SIZE(100);  // array of 768 elements

    StaticJsonDocument<CAPACITY> doc;

    // Tạo mảng 768 phần tử
    JsonArray tempArray = doc.createNestedArray("thermal");
    for (int i = 0; i < 50; i++) {
        tempArray.add(i + 1);
    }

    // Đo kích thước JSON +1 cho '\0'
    size_t needed = measureJson(doc) + 1;

    // Cấp phát payload động
    char* payload = (char*)malloc(needed);
    if (!payload) {
        Serial.println("⚠️ Không đủ bộ nhớ để tạo payload");
        return;
    }

    // Serialize vào buffer — dùng đúng overload với bufferSize
    size_t len = serializeJson(doc, payload, needed);
    payload[len] = '\0';  // đảm bảo kết thúc chuỗi

    Serial.print("Đang gửi MQTT (");
    Serial.print(len);
    Serial.println(" bytes):");
    //Serial.println(payload);

    // Gửi MQTT
    bool ok = client.publish(MQTT_TOPIC, payload);
    if (!ok) {
        Serial.println("⚠️ Gửi MQTT thất bại");
    }

    free(payload);
}

// MQTT reconnect
void reconnect() {
    while (!client.connected()) {
        Serial.println("Đang kết nối MQTT...");

        if (client.connect(MQTT_CLIENT_ID, MQTT_USERNAME, MQTT_PASSWORD)) {
            Serial.println("Đã kết nối MQTT!");
        } else {
            Serial.print("Thất bại, mã lỗi = ");
            Serial.print(client.state());
            Serial.println(". Thử lại sau 5s...");
            delay(5000);
        }
    }
}

// MQTT task
void mqttTask(void *pvParameters) {
    client.setServer(BROKER_ADDRESS, MQTT_PORT);

    while (1) {
        if (!client.connected()) {
            reconnect();
        }

        client.loop();

        sendArrayData(); // Gửi dữ liệu mỗi 5 giây

        vTaskDelay(15000 / portTICK_PERIOD_MS);
    }
}

// Khởi tạo các task
void backgroundTaskInit() {
    xTaskCreate(wifiTask, "WiFiTask", 4096, NULL, 1, NULL);
    xTaskCreate(mqttTask, "TelemetryTask", 10240, NULL, 1, NULL);
}
