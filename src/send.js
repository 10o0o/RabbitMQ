const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err0, connection) => {
  if (err0) throw err0;

  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    const queue = 'hello';
    const msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  // 왜 async await 아무 효과 없는데 setTimeout 썼지?
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
})