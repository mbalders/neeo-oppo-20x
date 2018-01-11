'use strict';

const neeoapi = require('neeo-sdk');
const controller = require('./controller');

const NEEO_PORT = 6336;

console.log('NEEO Driver for Oppo UDP-203 and 205');
console.log('---------------------------------------------');

const oppoUdp = neeoapi.buildDevice('OPPO UDP-20X IP')
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

.addButton({ name: 'PURE AUDIO', label: 'Pure Audio' })

.addButton({ name: 'CLEAR', label: 'Clear' })
.addButton({ name: 'GOTO', label: 'Go To' })

.addButton({ name: 'TOP MENU', label: 'Top Menu' })
.addButton({ name: 'OPTION', label: 'Option' })

.addButton({ name: 'HOME MENU', label: 'Home Menu' })
.addButton({ name: 'OPEN', label: 'Open' })
.addButton({ name: 'DIMMER', label: 'Dimmer' })

.addButton({ name: 'INFO', label: 'Info' })
.addButton({ name: 'SETUP', label: 'Setup' })
.addButton({ name: 'PIC', label: 'Pic' })
.addButton({ name: 'RESOLUTION', label: 'Resolution' })

.addButton({ name: 'AUDIO', label: 'Sutio' })
.addButton({ name: 'SUBTITLE', label: 'Subtitle' })
.addButton({ name: 'ZOOM', label: 'Zoom' })
.addButton({ name: 'AB REPLAY', label: 'AB Replay' })
.addButton({ name: 'REPEAT', label: 'Repeat' })

.addButton({ name: 'INPUT', label: 'Input' })
.addButton({ name: 'HDR', label: 'HDR' })

.addButtonHander(controller.onButtonPressed);


function startSdkExample(brain) {
  console.log('- Start server');
  neeoapi.startServer({
    brain,
    port: NEEO_PORT,
    name: 'oppo-udp-20x',
    devices: [oppoUdp]
  })
  .then(() => {
    console.log('# READY! use the NEEO app to search for "NEEO Simple Device".');
  })
  .catch((error) => {
    //if there was any error, print message out to console
    console.error('ERROR!', error.message);
    process.exit(1);
  });
}

const brainIp = process.env.BRAINIP;
if (brainIp) {
  console.log('- use NEEO Brain IP from env variable', brainIp);
  startSdkExample(brainIp);
} else {
  console.log('- discover one NEEO Brain...');
  neeoapi.discoverOneBrain()
    .then((brain) => {
      console.log('- Brain discovered:', brain.name);
      startSdkExample(brain);
    });
}