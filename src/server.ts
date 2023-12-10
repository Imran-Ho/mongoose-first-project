import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// for unhandledRejection
process.on('unhandledRejection', () => {
  console.log(`unhandledRejection is detected. shutting down the server.`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject();

// for uncaughtException
process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected. shutting down the server.`);
  process.exit(1);
});

// console.log(x);
