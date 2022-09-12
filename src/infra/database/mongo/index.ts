import mongoose from 'mongoose';
import dotenv from 'dotenv'
import path from 'path';

dotenv.config({
  path: process.env.NODE_ENV === 'test' 
  ? path.resolve('.env.tests') 
  : path.resolve('.env')
})
class Database {
  constructor () {
    this.connect();
  }
  connect () {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.${process.env.URL_ID}.mongodb.net/${process.env.DB_NAME}`);
    mongoose.connection.on('error', console.log.bind(console, 'Error connection'));
    mongoose.connection.once('open', () => {
      console.log('Connected database.');
    });
    return mongoose.connection;
  }
}

export default new Database().connect;