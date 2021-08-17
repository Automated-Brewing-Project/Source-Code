#include <Arduino.h>
#include "Adafruit_MAX31855.h"

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char *ssid = "SpectrumSetup-3F";
const char *password = "agencyinvent039";

int thermoDO = 27;
int thermoCS = 14;
int thermoCLK = 12;

Adafruit_MAX31855 thermocouple(thermoCLK, thermoCS, thermoDO);

// relay pin
const int relay1 = 26;
// structs for temperatures
struct Kettle
{
    int duration;
    int temp;
    int id;
    int type;
};

void setup()
{
    Serial.begin(115200);

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

    //setting pin for relay
    pinMode(relay1, OUTPUT);
}

Kettle hlt_ket{0, 0, 0, 0};

String posttemp_endpoint = "http://uta-senior-project-2.us-e2.cloudhub.io/posttemp";

String gettemp_endpoint = "http://uta-senior-project-2.us-e2.cloudhub.io/setTemp?type=10";

HTTPClient httpGet;
HTTPClient httpPost;

void loop()
{
    // assemble payload
    char *payload;
    double temp = (thermocouple.readCelsius() * 1.8) + 32.0;
    Serial.print(temp);

    // postTemp payload
    asprintf(&payload, "{\n\"temp\": %f,\n\"type\": 10\n}", temp);

    const int capacity = JSON_OBJECT_SIZE(100);
    DynamicJsonDocument doc(capacity);

    // GET request
    httpGet.begin(gettemp_endpoint);
    httpGet.addHeader("Content-Type", "application/json");
    int httpCodeGet = httpGet.GET();

    // POST request
    httpPost.begin(posttemp_endpoint);
    httpPost.addHeader("Content-Type", "application/json");
    int httpCodePost = httpPost.POST(payload);
    //closing connection
    httpPost.end();

    if (httpCodeGet > 0)
    {
        // show response results

        httpGet.useHTTP10(true);

        Serial.print("httpCodeGet: ");
        Serial.println(httpCodeGet);

        Serial.print("httpCodePost: ");
        Serial.println(httpCodePost);

        //checking if any updates on HLT

        DeserializationError err = deserializeJson(doc, httpGet.getStream());

        Serial.print("Deserialization status: ");
        Serial.println(err.f_str());

        // get most recent JsonObject and fill new varuables with those values

        int new_id = doc[doc.size() - 1]["id"];
        int new_type = doc[doc.size() - 1]["type"];
        int new_duration = doc[doc.size() - 1]["duration"];
        int new_temp = doc[doc.size() - 1]["temp"];

        if (new_id > hlt_ket.id)
        {
            hlt_ket.id = new_id;
            hlt_ket.temp = new_temp;
            hlt_ket.duration = new_duration;
            hlt_ket.type = new_type;
        }

        Serial.print("struct\nID:");
        Serial.print(hlt_ket.id);
        Serial.print("\nTemp:");
        Serial.print(hlt_ket.temp);
        Serial.print("\nDuration:");
        Serial.print(hlt_ket.duration);
        Serial.print("\nType:");
        Serial.print(hlt_ket.type);
        Serial.print("\n");
    }
    else
    {
        Serial.println("ERROR");

        Serial.print("httpCodeGet: ");
        Serial.println(httpCodeGet);

        Serial.print("httpCodePost: ");
        Serial.println(httpCodePost);
    }

    // Controlling temperature of HLT

    while (temp < double(hlt_ket.temp) - 2.0)
    {
        digitalWrite(relay1, HIGH);
        Serial.print("\nrelay on");
        delay(2000);
        temp = (thermocouple.readCelsius() * 1.8) + 32.0;
        Serial.print("\n");
        Serial.print(temp);
        //sending data to database creatind payload

        asprintf(&payload, "{\n\"temp\": %f,\n\"type\": 10\n}", temp);
        httpPost.begin(posttemp_endpoint);
        httpPost.addHeader("Content-Type", "application/json");
        httpCodePost = httpPost.POST(payload);
        //closing connection
        httpPost.end();
        Serial.print("\n");
        Serial.print(httpCodePost);
        Serial.print("\n");
    }

    digitalWrite(relay1, LOW);
    // clean up
    httpPost.end();
    httpGet.end();
    free(payload);

    sleep(5);
}