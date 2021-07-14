const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err0, connection) => {
  if (err0) throw err0;

  connection.createChannel(async (err1, channel) => {
    if (err1) throw err1;

    const queue = 'hello';
    const msg = 'Hello world';

    return await new Promise(() => {
      channel.assertQueue(queue, {
      durable: false,
      });
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(`[x] Sent ${msg}`);
      console.log('여기')
      connection.close();
      process.exit(0);
    }).catch(e => console.error(e));
  });
})