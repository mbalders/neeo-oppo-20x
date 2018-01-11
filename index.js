'use strict';

const neeoapi = require('neeo-sdk');
const controller = require('./controller');

console.log('NEEO SDK Example "simpleCustomDevice" adapter');
console.log('---------------------------------------------');

/*
 * Adapter - an Adapter contains one or more DEVICES. In this case we only use a single very
 * simple device.
 */

// first we set the device info, used to identify it on the Brain
const customLightDevice = neeoapi.buildDevice('OPPO UDP-20X IP')
  .setManufacturer('OPPO')
  .addAdditionalSearchToken('UDP-203')
  .addAdditionalSearchToken('UDP-205')
  .setType('MEDIAPLAYER')

  .addButtonGroup('Power')
  .addButtonGroup('Menu and Back')
  .addButtonGroup('Controlpad')
  .addButtonGroup('Transport')
  .addButtonGroup('Transport Search')
  .addButtonGroup('Transport Scan')
  .addButtonGroup('Color Buttons')
  .addButton({ name: 'HOME MENU', label: 'Home' })
  .addButton({ name: 'SETUP', label: 'Setup' })
  .addButton({ name: 'AUDIO', label: 'Audio' })
  .addButtonGroup('Channel Zapper')
  .addButton({ name: 'DIRECT', label: 'Source Direct' })
  .addButton({ name: '1080P', label: '1080p' })
  
  .addButtonHander(controller.onButtonPressed);

function startSdkExample(brain) {
  console.log('- Start server');
  neeoapi.startServer({
    brain,
    port: 6336,
    name: 'simple-adapter-one',
    devices: [customLightDevice]
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

//const brainIp = process.env.BRAINIP;
const brainIp = '10.0.1.235';
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