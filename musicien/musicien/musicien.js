/**
*  @authors Jamse Smith
*  @file musicien.js
*/

var protocol = require('../protocol/musicProtocol');

/**
 * We use standard Node.js module to wrok with UDP
 */

var dgram = require('dgram');

/** We use uuid to give an id to our musicien **/
var uuidv4 = require('uuid/v4');

/** Creating a UDP socket **/
var socket = dgram.createSocket('udp4');

function Musicien(instrument){
    console.log("Creating new Musicien with the instrument: " + instrument.NAME);
    this.instrument = instrument;
    this.id = uuidv4();
    Musicien.prototype.update = function() {
        var musicien = {
            instrument: this.instrument,
            uuid: this.id,
        }

        var payload = JSON.stringify(musicien);

        message = new Buffer(payload);
        socket.send(message,0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes) {
            console.log("Sending payload " + payload + " via port " + socket.address().port);
        })
    }

    setInterval(this.update.bind(this), 1000);
}

/** Properties of the musicien from command line**/
var argv = process.argv[2];
var instrument;

switch (argv){
    case 'piano':
        instrument = require('../Instruments/piano');
        break;
    case 'trumpet':
        instrument = require('../Instruments/trumpet');
        break;
    case 'flute':
        instrument = require('../Instruments/flute');
        break;
    case 'violin':
        instrument = require('../Instruments/violin');
        break;
    case 'drum':
        instrument = require('../Instruments/drum');
        break;
    default:
        console.log("Your argument isnt an instrument");
        process.exit(-1);
        break;
}

var musicien = new Musicien(instrument);