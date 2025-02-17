const mqtt = require('mqtt');
const options = {
  host: 'remotemqjp.respiree.com',
  port: 8883,
  protocol: 'mqtts',
  username: 'respiree',
  password: 'respiree@2020',
  rejectUnauthorized: false
};
const client = mqtt.connect(options);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  
  client.subscribe('esp32-admin/server/report', (err) => {
    if (!err) {
      console.log('Subscribed to topic');
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`Received message on ${topic}: ${message.toString()}`);
});

client.on('error', (error) => {
  console.error('Connection error:', error);
});
