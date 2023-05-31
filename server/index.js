/* eslint-disable no-console */
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const controller = require('./controller');
const logger = require('./middleware/logger');

// Serves up all static and generated assets in ../client/dist.

// app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(compression({
  threshold: 0
}));

// Add a middleware to log HTTP requests
app.use(logger);

// Set up our routes

// questions
/** ******** */
app.get('/qa/questions', controller.getQuestions);
app.post('/qa/questions', controller.addQuestion);
app.post('/qa/questions/:question_id/answers', controller.addAnswer);
app.put('/qa/questions/:question_id/helpful', controller.markHelpfulQuestion);
app.put('/qa/answers/:answer_id/helpful', controller.markHelpfulAnswer);
app.put('/qa/answers/:answer_id/report', controller.reportAnswer);
app.get('/loaderio-178278af0d1a021562cddb43af34b3de', (req, res) => {
  res.send('loaderio-178278af0d1a021562cddb43af34b3de');
});
//

/* ---------------- Server listens ---------------- */

const server = app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);

module.exports = server;