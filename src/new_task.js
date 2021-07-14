const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err0, connection) => {
  if (err0) throw err0;

  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    const queue = 'task_queue';
    const msg = process.argv.slice(2).join(" ") || "Hello World!";

    channel.assertQueue(queue, {
      durable: true,
    });
    
    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true,
    })
    
    console.log(" [x] Sent '%s'", msg);
  });

  // 왜 async await 아무 효과 없는데 setTimeout 썼지?
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
})