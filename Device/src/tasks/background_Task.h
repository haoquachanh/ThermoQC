// src/background_Task.h

#ifndef BACKGROUND_TASK_H
#define BACKGROUND_TASK_H

#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "../project_config.h"

void backgroundTaskInit();

#endif // BACKGROUND_TASK_H
