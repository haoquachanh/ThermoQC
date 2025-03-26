// src/main.cpp

#include <Adafruit_MLX90640.h>
#include "./tasks/background_Task.h"
#include <Wire.h>

Adafruit_MLX90640 mlx1, mlx2;

// Đã khai báo trong background_Task.h, không khai báo lại:
float frame1[32 * 24];
float frame2[32 * 24];

TwoWire Wire2(1);  // Sử dụng bus I2C số 1

#define MINTEMP 20
#define MAXTEMP 35

void mlxTask(void *pvParameters) {
    Wire.begin(11, 12);
    Wire2.begin(2, 1);

    if (!mlx1.begin(MLX90640_I2CADDR_DEFAULT, &Wire)) {
        Serial.println("Không tìm thấy MLX90640 #1!");
        vTaskDelete(NULL);
    }
    if (!mlx2.begin(MLX90640_I2CADDR_DEFAULT, &Wire2)) {
        Serial.println("Không tìm thấy MLX90640 #2!");
        vTaskDelete(NULL);
    }

    mlx1.setMode(MLX90640_CHESS);
    mlx1.setResolution(MLX90640_ADC_18BIT);
    mlx1.setRefreshRate(MLX90640_8_HZ);
    Wire.setClock(1000000); 

    mlx2.setMode(MLX90640_CHESS);
    mlx2.setResolution(MLX90640_ADC_18BIT);
    mlx2.setRefreshRate(MLX90640_8_HZ);
    Wire2.setClock(1000000);

    while (1) {
        if (mlx1.getFrame(frame1) == 0) {
            Serial.println("Dữ liệu MLX90640 #1:");
            for (int i = 0; i < 32 * 24; i++) {
                Serial.print(frame1[i]);
                Serial.print(" ");
            }
            Serial.println("\n================================");
        } else {
            Serial.println("Lỗi đọc cảm biến MLX1!");
        }

        if (mlx2.getFrame(frame2) == 0) {
            Serial.println("Dữ liệu MLX90640 #2:");
            for (int i = 0; i < 32 * 24; i++) {
                Serial.print(frame2[i]);
                Serial.print(" ");
            }
            Serial.println("\n================================");
        } else {
            Serial.println("Lỗi đọc cảm biến MLX2!");
        }

        vTaskDelay(2000 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(115200);
    backgroundTaskInit();
    xTaskCreate(mlxTask, "MLX90640Task", 8192, NULL, 1, NULL);
}

void loop() {
}
