const mongoose = require('mongoose');
const dbURI = 'mongodb://127.0.0.1:27017/Loc8r';  // Ma'lumotlar bazasi nomini qo'shing

const readLine = require('readline');

const connect = () => {
  setTimeout(() => mongoose.connect(dbURI), 1000);
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', err => {
  console.log('error: ' + err);
  return connect();
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});

if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', () => {
    process.emit("SIGINT");
  });
}

const gracefulShutdown = async (msg, callback) => {
  try {
    await mongoose.connection.close();  // Callback olib tashlandi
    console.log(`Mongoose disconnected through ${msg}`);
    if (callback) callback();
  } catch (err) {
    console.error('Error during disconnection:', err);
    if (callback) callback(err);
  }
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

connect();

require('./locations');
