'use strict';

var iothub = require('azure-iothub');
var connectionString = 'HostName=IoTec.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=r8IyXHgUaa+yUZ3CL2L3Nj49HFirJRtLtVXP1puFrGo=';

var registry = iothub.Registry.fromConnectionString(connectionString);
var device = new iothub.Device(null);
device.deviceId = 'strainer_device';
registry.create(device, function(err, deviceInfo, res) {
  if (err) {
    registry.get(device.deviceId, printDeviceInfo);
  }
  if (deviceInfo) {
    printDeviceInfo(err, deviceInfo, res)
  }
});

function printDeviceInfo(err, deviceInfo, res) {
  if (deviceInfo) {
    console.log('Device id: ' + deviceInfo.deviceId);
    console.log('Device key: ' + deviceInfo.authentication.SymmetricKey.primaryKey);
  }
}
