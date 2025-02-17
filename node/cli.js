const mqtt = require('mqtt');
const options = {
  host: 'remotemqjp.respiree.com',
  port: 8883,
  protocol: 'mqtts',
  username: 'respiree',
  password: 'respiree@2020',
  rejectUnauthorized: false
};

const options2 = {
  host: 'broker.hivemq.com',
  port: 1883,
  protocol: 'mqtt',
//  username: 'respiree',
//  password: 'respiree@2020',
//  rejectUnauthorized: false
};

  // Publish a test message
  //client.publish('esp32-admin/server/report', 'Test message ' + new Date().toISOString(), (err) => {

const client = mqtt.connect(options2);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  
  // Subscribe to the topic first
  client.subscribe('test/topic', (err) => {
    if (err) {
      console.error('Subscribe error:', err);
      return;
    }
    console.log('Subscribed to test/topic');
    
    // Then publish
    client.publish('test/topic', 'Test message ' + new Date().toISOString(), (err) => {
      if (err) {
        console.error('Publish error:', err);
        return;
      }
      console.log('Message published successfully');
    });
  });
});

client.on('message', (topic, message) => {
  console.log(`Received message on ${topic}: ${message.toString()}`);
});

client.on('error', (error) => {
  console.error('Connection error:', error);
});

// Optional but helpful for debugging
client.on('disconnect', () => {
  console.log('Disconnected from broker');
});
