const iot = require('@google-cloud/iot')

const client = new iot.v1.DeviceManagerClient()
const cloudRegion = 'asia-east1'
const deviceId = 'rpiz-garage'
const projectId = 'aratasato'
const registryId = 'rpi-garage'

const formattedName = client.devicePath(
  projectId,
  cloudRegion,
  registryId,
  deviceId
)

exports.sendCommand = async (commandMessage) => {
  const binaryData = Buffer.from(commandMessage).toString('base64')
  const request = {
    name: formattedName,
    binaryData: binaryData
  }

  try {
    await client.sendCommandToDevice(request);

    console.log('Sent command');
  } catch (err) {
    console.error(err);
  }
}
