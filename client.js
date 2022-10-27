const net = require('net');
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conn = net.createConnection({
  host: 'localhost',
  port: 3000,
});

conn.setEncoding("utf8");

conn.on("data", (data) => {
  console.log(`${data}`);
});

// conn.on("connect", () => {
//   conn.write('manu');
// });

conn.on('end', () => {
  console.log('Disconnected from server');
});

rl.on('line', line => {
  conn.write(line);

});
