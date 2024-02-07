const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);

const uri = process.env.MONGO_URI;

const connectDB = async () =>{
  try {
    const db = await mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connection Successfull", mongoose.connections)
    return db;
  } catch (error){
      console.error(error);
  }
}

module.exports = connectDB;
