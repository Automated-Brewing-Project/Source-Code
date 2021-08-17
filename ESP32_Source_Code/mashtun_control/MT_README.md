
![Logo](https://raw.githubusercontent.com/Automated-Brewing-Project/Architectural-Design-Specifications/main/images/title.PNG)

    
# Mash Tun Controller

This code controls the mash tun for our automated beer brewing project. It will heat the mash tun for a time determined by the settings from the API. It will also post the internal temperature back to the API for tracking purposes. 


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
  GET http://uta-senior-project-2.us-e2.cloudhub.io/setTemp?type=20
```

| Values | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `ID` | `INT` | Used to indicate what the most recent setting, highest is most recent |
| `TYPE` | `INT` | Used to differentiate between vessels. 10 = Hot Liquor Tank, 20 = Mash Tun, 30 = Boiling Kettle |
| `DURATION` | `INT` | Used to determine how long to run the code, time is in minutes |
| `TEMP` | `INT` | Temperature that the mash tun will be heated to and held at |
| `DATETIME` | `string` | Used for debugging purposes to see last communications, not used for running the code |

#### Post current temperature

```http
  POST http://uta-senior-project-2.us-e2.cloudhub.io/posttemp
```

| Values | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `TEMP` | `INT` | Current temperature read from the thermometer |
| `TYPE` | `INT` | Used to differentiate between vessels. 10 = Hot Liquor Tank, 20 = Mash Tun, 30 = Boiling Kettle |



  
## Authors

- Ju Young Isa Jung
- Luke Brown
  