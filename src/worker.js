const queue = 'task_queue';

channel.assertQueue(queue, {
  durable: true
});

channel.consume(queue, (msg) => {
  const secs = msg.content.toString().split('.').length - 1;

  console.log("[x] Received %s", msg.content.toString());
  setTimeout(() => {
    console.log("[x] Done");
  }, secs * 1000);
}, {
  // automatic acknowledgment mode,
  // see ../confirms.html for details
  noAck: true
});