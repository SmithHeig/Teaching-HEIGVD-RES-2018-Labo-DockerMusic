/**
 *  @file auditor.js
 *  @author James Smith
 */

var protocol = require('../protocol/musicProtocol');

var dgram = require('dgram');
var socketUDP = dgram.createSocket('udp4');

var net = require('net');
var server = net.createServer(function(socketTCP){
    console.log("received tcp request");
    var payload;
    if(currentMusiciens.length > 0) {
        checkIfActif();
        for (var i = 0; i < currentMusiciens.length; ++i) {
            currentMusiciens[i].activeSince = new Date(currentMusiciens[i].activeSince);
        }
        payload = JSON.stringify(currentMusiciens);
    } else {
        payload = "[]";
    }
    socketTCP.write(payload + '\r\n');
    socketTCP.pipe(socketTCP);
    socketTCP.end();
    console.log("Message send: " + payload);
    console.log("Send response to tcp request");
});


var currentMusiciens = new Array();

server.listen(2505);

socketUDP.bind(protocol.PROTOCOL_PORT, function(){
    console.log("Joining multicast group");
    socketUDP.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

/*
 * This call back is invoked when a new datagram has arrived.
 */
socketUDP.on('message', function(msg, source) {
    receivedSound(msg);
});

function receivedSound(msg){
    musicien = JSON.parse(msg);
    musicien.instrument = musicien.instrument.NAME;
    console.log(musicien);
    var alreadyExist = false;
    for(var i = 0;  i < currentMusiciens.length; ++i){
        if(currentMusiciens[i].uuid === musicien.uuid){
            currentMusiciens[i].activeSince = Date.now();
            alreadyExist = true;
        }
    }
    if(!alreadyExist){
        musicien.activeSince = Date.now();
        currentMusiciens.push(musicien);
    }
}

function checkIfActif(){
    var currentTime = Date.now();
    for(var i = 0;  i < currentMusiciens.length; ++i){
        if(currentTime - currentMusiciens[i].activeSince > 5000){
            currentMusiciens.splice(i,i);
            i--;
        }
    }
}