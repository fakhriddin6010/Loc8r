const mongoose = require('mongoose');
const dbURI = 'mongodb://127.0.0.1:27017/Loc8r';  // Ma'lumotlar bazasi nomini qo'shing
const readLine = require('readline');

// Ulanish funktsiyasi
const connect = () => {
  setTimeout(() => {
    mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).catch(err => console.log('Initial connection error: ' + err)); // Ulanishdagi dastlabki xatolarni qayta ishlash
  }, 1000);
}

// MongoDB ga ulanish holatini kuzatish
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', err => {
  console.log('error: ' + err);
  return connect(); // Agar xato bo'lsa qayta urinadi
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});

// Windows SIGINT ishlatishni sozlash
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', () => {
    process.emit("SIGINT");
  });
}

// Mongoose ulanishini xavfsiz yopish funktsiyasi
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// Nodemon qayta yuklashda ulanishni yopish
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// App tugatilganda ulanishni yopish
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

// Heroku server tugatish
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

// MongoDB ga ulanishni ishga tushirish
connect();

// Mongoose modeli chaqirilmoqda
require('./locations');  // locations modelini chaqirish
