#include <Arduino.h>
#include "Adafruit_MAX31855.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <chrono>

// WiFi network and password
const char *ssid = "SpectrumSetup-3F";
const char *password = "agencyinvent039";

// MAX6675 pins and constructor
int thermoDO = 27;
int thermoCS = 14;
int thermoCLK = 12;

Adafruit_MAX31855 thermocouple(thermoCLK, thermoCS, thermoDO);

// set relay pin
#define relay_pin 25

struct Kettle
{
    int duration = 0;
    int temp = 0;
    int id = 0;
    int type = 0;
    String timeinfo;
};
Kettle mt_ket;

String settemp_BK_endpoint = "http://uta-senior-project-2.us-e2.cloudhub.io/setTemp?type=30";
HTTPClient httpGet;

// completion flags
int boil_achieved = 0;
int duration_achieved = 0;

// initialize timers and start the start timer
std::chrono::time_point<std::chrono::system_clock> start_time = std::chrono::system_clock::now();
std::chrono::time_point<std::chrono::system_clock> end_time;

// used for getting response from API and updating Kettle if new settings are sent
int get_settemp(HTTPClient &httpGet, Kettle &mt_ket)
{
    const int capacity = JSON_OBJECT_SIZE(100);
    DynamicJsonDocument doc(capacity);
    int httpCodeGet = httpGet.GET();

    if (httpCodeGet == 200)
    {
        DeserializationError err = deserializeJson(doc, httpGet.getStream());

        if (err)
        {
            Serial.print("deserializeJson() failed: ");
            Serial.println(err.c_str());
            return 0;
        }

        // get most recent JsonObject
        int new_id = doc[doc.size() - 1]["id"];
        int new_type = doc[doc.size() - 1]["type"];
        int new_duration = doc[doc.size() - 1]["duration"];
        int new_temp = doc[doc.size() - 1]["temp"];
        String timeinfo = doc[doc.size() - 1]["timeStamp"];

        if (mt_ket.id != new_id)
        {
            Serial.println("Settings changed, updating settings.");

            mt_ket.id = new_id;
            mt_ket.temp = new_temp;
            mt_ket.duration = new_duration;
            mt_ket.type = new_type;
            mt_ket.timeinfo = timeinfo;

            Serial.println("struct");
            Serial.print("ID: ");
            Serial.println(mt_ket.id);
            Serial.print("Temp: ");
            Serial.println(mt_ket.temp);
            Serial.print("Duration: ");
            Serial.println(mt_ket.duration);
            Serial.print("Type: ");
            Serial.println(mt_ket.type);
            Serial.print("Date: ");
            Serial.println(mt_ket.timeinfo);

            return 1;
        }

        return 1;
    }
    else
    {
        Serial.print("ERROR httpCodeGet: ");
        Serial.println(httpCodeGet);

        return 0;
    }
}

void setup()
{
    Serial.begin(9600);
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    Serial.print("Waiting for WiFi to connect...");

    while ((!WiFi.isConnected()))
    {
        Serial.print(".");
    }
    Serial.println(" connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());

    pinMode(relay_pin, OUTPUT);
}

void loop()
{
    // setup client for GET request
    httpGet.begin(settemp_BK_endpoint);
    httpGet.addHeader("Content-Type", "application/json");
    httpGet.useHTTP10(true);

    if (!duration_achieved)
    {
        // communicate with API
        get_settemp(httpGet, mt_ket);

        while (thermocouple.readCelsius() < 95 && mt_ket.temp != 0 && !duration_achieved && get_settemp(httpGet, mt_ket))
        {
            digitalWrite(relay_pin, HIGH); // turn on heating element

            end_time = std::chrono::system_clock::now();
            auto total_time = std::chrono::duration_cast<std::chrono::minutes>(end_time - start_time).count();

            Serial.print("Water not boiling, turning on heating element. \tWhile loop timer: ");
            Serial.println(total_time);

            Serial.print("While loop current temp: ");
            Serial.println(thermocouple.readCelsius());

            if (total_time > mt_ket.duration)
            {
                Serial.println("Duration reached. Breaking boil loop.");
                duration_achieved = 1;
                break;
            }
        }

        if (thermocouple.readCelsius() > 95 && !duration_achieved)
        {
            // after reaching boiling temperature for the first time restart the timer
            if (!boil_achieved)
            {
                Serial.println("Boil achieved. Resetting timer.");
                boil_achieved = 1;
                start_time = std::chrono::system_clock::now();
            }

            Serial.println("Water boiling, turning off heating element.");
            digitalWrite(relay_pin, LOW); // turn off heating element
        }
    }
    else // duration reach, keep heating element off
    {
        Serial.println("Duration time reached. Heating element set to off.");
        digitalWrite(relay_pin, LOW); // turn off heating element
    }

    // clean up
    httpGet.end();
}