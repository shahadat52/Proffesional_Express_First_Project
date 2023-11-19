import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on  ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
