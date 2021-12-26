import mongoose from 'mongoose';
  const { Schema } = mongoose;

  export const schema = new Schema({
      title:String,
      book:String
  })

