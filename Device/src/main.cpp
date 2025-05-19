// src/main.cpp

#include <Adafruit_MLX90640.h>
#include "./tasks/background_Task.h"
#include <Wire.h>
#include <WiFi.h>

Adafruit_MLX90640 mlx1, mlx2;

// Đã khai báo trong background_Task.h, không khai báo lại:
float frame1[32 * 24];

void mlxTask(void *pvParameters) {
    Wire.begin(11, 12);

    if (!mlx1.begin(MLX90640_I2CADDR_DEFAULT, &Wire)) {
        Serial.println("Không tìm thấy MLX90640 #1!");
        vTaskDelete(NULL);
    }

    mlx1.setMode(MLX90640_CHESS);
    mlx1.setResolution(MLX90640_ADC_18BIT);
    mlx1.setRefreshRate(MLX90640_8_HZ);
    Wire.setClock(1000000); 

    while (1) {
        if (mlx1.getFrame(frame1) == 0) {
            Serial.println("Dữ liệu MLX90640 #1:");
            for (int i = 0; i < 32 * 24; i++) {
                Serial.print(frame1[i]);
                Serial.print(",");
            }
            Serial.println("\n================================");
        } else {
            Serial.println("Lỗi đọc cảm biến MLX1!");
        }

        vTaskDelay(2000 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(115200);
    backgroundTaskInit();
    // sendArrayData();
    xTaskCreate(mlxTask, "MLX90640Task", 8192, NULL, 1, NULL);
}

void loop() {
}
