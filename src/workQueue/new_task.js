const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err0, connection) => {
  if (err0) throw err0;

  connection.createChannel(async (err1, channel) => {
    if (err1) throw err1;

    const queue = 'task_queue';
    const msg = process.argv.slice(2).join(" ") || "Hello World!";

    return new Promise(() => {
      channel.assertQueue(queue, {
        durable: true,
      });
      
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true,
      })
      
      console.log(`[x] Sent ${msg}`);

      connection.close();
      process.exit(0);
    }).catch(e => {
      console.error(e);
    })
  });
});