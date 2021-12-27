import mongoose from 'mongoose';
  // const { Schema } = mongoose;

  const schema = new mongoose.Schema({
      Title:String,
      Author:String
  })

  export const bookmodel = mongoose.model('Books',schema)
