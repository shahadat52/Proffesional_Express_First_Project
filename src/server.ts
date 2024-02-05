import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import createSuperAdmin from './app/DB';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database as string);
    createSuperAdmin()
    server = app.listen(config.port, () => {
      console.log(`Example app listening on  ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

process.on('unhandledRejection', () => {
  console.log('😡😡 UnhandledPromiseRejection is detected,  shuting down');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('😡😡 UncaughtException is detected,  shuting down');
  process.exit(1);
});
