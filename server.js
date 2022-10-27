const net = require('net');
const readline = require('readline');
const fs = require('fs');
const validFiles = [];
fs.readdir('./files', (err, files) => {
  if (err) {
    console.log('error');
  }
  files.forEach(file => {
    validFiles.push(file.slice(0,-4));
  });
});
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const server = net.createServer();

server.on('connection', client => {
  client.setEncoding('utf-8');
  console.log('New client has connected');
  client.write("Type main for intructions");
  fs.readdir('./files', (err, files) => {
    if (err) {
      console.log('no file found');
    }
    files.forEach(file => {
      client.write(`${file.slice(0,-4)}\n`);
    });
  });
  client.on('data', data => {
    if (!validFiles.includes(data)) {
      console.log(data);
    } else {
      reader = fs.createReadStream(`./files/${data}.txt`);
    }
    reader.on('data', (chunk) => {
      client.write(chunk.toString());
    });
  });
  rl.on('line', line => {
    client.write("Server: " + line);
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});



