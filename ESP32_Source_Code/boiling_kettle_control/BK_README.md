
![Logo](https://raw.githubusercontent.com/Automated-Brewing-Project/Architectural-Design-Specifications/main/images/title.PNG)

    
# Boiling Kettle Controller

This code controls the boiling kettle for our automated beer brewing project. It will heat water in the boiling kettle for a time determined by the settings from the API.


## Deployment

To deploy this project run you'll need to use either PlatformIO or Arduino. For more use the instructions [here](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/).

#### Libraries used ####
- Arduino
- [max31855](https://www.arduino.cc/reference/en/libraries/adafruit-max31855-library/)
- WiFi
- [HTTPClient](https://www.arduino.cc/reference/en/libraries/httpclient/)
- [ArduinoJson](https://arduinojson.org/)
  
## API Reference

#### Get most recent settings

```http
  GET http://uta-senior-project-2.us-e2.cloudhub.io/setTemp?type=30
```

| Values | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `ID` | `INT` | Used to indicate what the most recent setting, highest is most recent |
| `TYPE` | `INT` | Used to differentiate between vessels. 10 = Hot Liquor Tank, 20 = Mash Tun, 30 = Boiling Kettle |
| `DURATION` | `INT` | Used to determine how long to run the code, time is in minutes |
| `TEMP` | `INT` | For the boiling kettle, any non-zero value will allow the code to run, but 0 will not allow running |
| `DATETIME` | `string` | Used for debugging purposes to see last communications, not used for running the code |


  
## Lessons Learned

We originally thought that we would need to use PWM to control the heating element. However, with the equipment that we had, we found it was better to control the heating element with a simple relay.

  
## Authors

- Ju Young Isa Jung
- Luke Brown
  