import { connect } from 'amqplib/callback_api';

connect('amqp://localhost', (err0, connection) => {
  if (err0) throw err0;

  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    const queue = 'task_queue';

    channel.assertQueue(queue, {
      durable: true
    });

    channel.prefetch(6);

    channel.consume(queue, (msg) => {
      const secs = msg.content.toString().split('.').length - 1;

      console.log(`[x] Received ${msg.content.toString()}`);
      setTimeout(() => {
        console.log("[x] Done");
      }, secs * 1000);
    }, {
      // automatic acknowledgment mode,
      // see ../confirms.html for details
      noAck: false
    });
  })
});