'use strict';

const neeoapi = require('neeo-sdk');

const net = require('net');

const PORT = 23;
const IP = '10.0.1.213';
var key;
var client;

const controller = {
  onButtonPressed: function onButtonPressed(name) {
    console.log(`[CONTROLLER] ${name} button pressed`);    
    
    key = '#';
    
    switch (name){
      //POWER ButtonGroup
      case "POWER ON":
        key += "PON";
        break;
      case "POWER OFF":
        key += "POF";
        break;
      
      //VOLUME ButtonGroup
      case "VOLUME UP":
        key += "VUP";
        break;
      case "VOLUME DOWN":
        key += "VDN";
        break;
      case "MUTE TOGGLE":
        key += "MUT";
        break;

      //Numpad ButtonGroup
      case "DIGIT 0":
        key += "NU0";
        break;
      case "DIGIT 1":
        key += "NU1";
        break;
      case "DIGIT 2":
        key += "NU2";
        break;
      case "DIGIT 3":
        key += "NU3";
        break;
      case "DIGIT 4":
        key += "NU4";
        break;
      case "DIGIT 5":
        key += "NU5";
        break;
      case "DIGIT 6":
        key += "NU6";
        break;
      case "DIGIT 7":
        key += "NU7";
        break;
      case "DIGIT 8":
        key += "NU8";
        break;
      case "DIGIT 9":
        key += "NU9";
        break;

      //Controlpad ButtonGroup
      case "CURSOR UP":
        key += "NUP";
        break;
      case "CURSOR DOWN":
        key += "NDN";
        break;
      case "CURSOR LEFT":
        key += "NLT";
        break;
      case "CURSOR RIGHT":
        key += "NRT";
        break;
      case "CURSOR ENTER":
        key += "SEL";
        break;

      //Color Buttons ButtonGroup
      case "FUNCTION RED":
        key += "RED";
        break;
      case "FUNCTION GREEN":
        key += "GRN";
        break;
      case "FUNCTION BLUE":
        key += "BLU";
        break;
      case "FUNCTION YELLOW":
        key += "YLW";
        break;

      //Menu and Back ButtonGroup
      case "MENU":
        key += "TTL";
        break;
      case "BACK":
        key += "RET";
        break;

      //Channel Zapper ButtonGroup
      case "CHANNEL UP":
        key += "PUP";
        break;
      case "CHANNEL DOWN":
        key += "PDN";
        break;

      //Transport ButtonGroup
      case "PLAY":
        key += "PLA";
        break;
      case "PAUSE":
        key += "PAU";
        break;
      case "STOP":
        key += "STP";
        break;

      //Transport Search ButtonGroup
      case "REVERSE":
        key += "REV";
        break;
      case "FORWARD":
        key += "FWD";
        break;

      //Transport Scan ButtonGroup
      case "PREVIOUS":
        key += "PRE";
        break;
      case "NEXT":
        key += "NXT";
        break;



      case "OPEN":
        key += "EJT";
        break;
  
      
        

      
      
  

  
      case "HOME MENU":
        key += "HOM";
        break;
      case "SETUP":
        key += "SET";
        break;
      
      case "AUDIO":
        key += "AUD";
        break;
      case "PURE AUDIO":
        key += "PUR";
        break;
      
      
      
  
      case "DIRECT":
        key += "SHD SRC";
        break;
      case "1080P":
        key += "SHD 1080P_AUTO";
        break;
  
    }
  
    key += '\r\n';
  
    client = new net.Socket()
      .on('data', function(data) {
        console.log('Received: ' + data);
        client.destroy(); // kill client after server's response
      })
      .on('error', function(e) {
        console.log('error', e);
      })
      .connect(PORT, IP, function(){
        console.log('Connected: ' + key);
        client.write(key);
      });
  }
};

const oppo = neeoapi.buildDevice('OPPO UDP-20X IP')
.setManufacturer('OPPO')
.addAdditionalSearchToken('UDP-203')
.addAdditionalSearchToken('UDP-205')
.setType('MEDIAPLAYER')

.addButtonGroup('POWER')
.addButtonGroup('VOLUME')
.addButtonGroup('Numpad')
.addButtonGroup('Controlpad')
.addButtonGroup('Color Buttons')
.addButtonGroup('Menu and Back')
.addButtonGroup('Channel Zapper')
.addButtonGroup('Transport')
.addButtonGroup('Transport Search')
.addButtonGroup('Transport Scan')

.addButton({ name: 'HOME MENU', label: 'Home' })
.addButton({ name: 'SETUP', label: 'Setup' })
.addButton({ name: 'AUDIO', label: 'Audio' })
.addButton({ name: 'PURE AUDIO', label: 'Pure Audio' })

.addButton({ name: 'DIRECT', label: 'Source Direct' })
.addButton({ name: '1080P', label: '1080p' })

.addButtonHander(controller.onButtonPressed);

module.exports = oppo;
