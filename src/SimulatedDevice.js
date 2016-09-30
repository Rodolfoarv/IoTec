'use strict';
var serialport = require("serialport");

/**
* Generates number of random geolocation points given a center and a radius.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @param {number} count Number of points to generate.
* @return {array} Array of Objects with lat and lng attributes.
*/
function generateRandomPoints(center, radius, count) {
  var points = [];
  for (var i=0; i<count; i++) {
    points.push(generateRandomPoint(center, radius));
  }
  return points;
}

/**
* Generates number of random geolocation points given a center and a radius.
* Reference URL: http://goo.gl/KWcPE.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @return {Object} The generated random points as JS object with lat and lng attributes.
*/
function generateRandomPoint(center, radius) {
  var x0 = center.lng;
  var y0 = center.lat;
  // Convert Radius from meters to degrees.
  var rd = radius/111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x/Math.cos(y0);

  // Resulting point.
  return {'lat': y+y0, 'lng': xp+x0};
}




var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var connectionString = 'HostName=IoTecDemoDay.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=J/YzLj8/Z85br+GGWKTF8RCIZEiVDOPi+yR90JreHM4=';
var connectionString = 'HostName=IoTecDemoDay.azure-devices.net;DeviceId=strainer_device;SharedAccessKey={yourdevicekey';
var client = clientFromConnectionString(connectionString);
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}


var SerialPort = serialport
var serialPort = new SerialPort("COM3", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

var getInfo = function() {
    serialPort.on('data', function(data) {
        var split_values = data.replace(/[\n\r]+/g, '').split(',');
        // var litersPerHour = 10 + (Math.random() * 120);
        // var strainerHeight = 8 + (Math.random() * 3);
        var litersPerHour = split_values[0];
        var strainerHeight = split_values[1];
        var location = generateRandomPoints({'lat':19.590116392958844, 'lng':-99.23340797424316}, 10000, 1);
        var currentdate = new Date();
        var date = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/"
                    + currentdate.getFullYear() + " "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds();
        var data = JSON.stringify({ deviceId: 'strainer_device',
                                    litersPerHour: litersPerHour,
                                    strainerHeight: strainerHeight,
                                    location: location,
                                    date: date
                                  });

        var message = new Message(data);
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));

        return split_values
    });

}


var connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');

    // Create a message and send it to the IoT Hub every second
    setInterval(function(){

        getInfo();
    }, 1000);
  }
};


client.open(connectCallback);
