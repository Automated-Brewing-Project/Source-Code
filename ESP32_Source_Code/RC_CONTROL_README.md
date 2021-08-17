![Logo](https://raw.githubusercontent.com/Automated-Brewing-Project/Architectural-Design-Specifications/main/images/title.PNG)

# Relay Controller

This code controls the boiling kettle for our automated beer brewing project. It will heat water in the boiling kettle for a time determined by the settings from the API.

## Deployment

To deploy this project run you'll need to use either PlatformIO or Arduino. For more use the instructions [here](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/). To install the library follow the instructions [here](https://RandomNerdTutorials.com/esp32-relay-module-ac-web-server/)

#### Libraries used

- Arduino
- [ESPAsyncWebServer](https://github.com/me-no-dev/ESPAsyncWebServer)
- [max31855](https://www.arduino.cc/reference/en/libraries/adafruit-max31855-library/)
- WiFi
- [HTTPClient](https://www.arduino.cc/reference/en/libraries/httpclient/)
- [ArduinoJson](https://arduinojson.org/)

## Lessons Learned

Using a physical button to control the relays would have been a better solution, however, the solution we have used here will work for the time being.

## Authors

- Ju Young Isa Jung
- Luke Brown
