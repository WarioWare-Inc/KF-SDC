import mongoose from 'mongoose';

const { Schema } = mongoose;

const photosSchema = new Schema({
  photo_id: Number,
  url: String,
});

const answersSchema = new Schema({
  answer_id: Number,
  body: String,
  date: Date,
  answerer_name: String,
  answerer_email: String,
  photos: [photosSchema],
});

const questionsSchema = new Schema({
  question_id: Number,
  question_body: String,
  question_date: Date,
  asker_name: String,
  asker_email: String,
  question_helpfulness: Number,
  reported: Boolean,
  answers: [answersSchema],
});

export default questionsSchema;
