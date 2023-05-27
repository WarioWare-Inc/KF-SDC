const axios = require('axios');
const questions = require('../models/questions');

const {
  getQuestionsDB,
  addQuestionDB,
  addAnswerDB,
  markHelpfulQuestionDB,
  markHelpfulAnswerDB,
  reportAnswerDB
} = questions;

module.exports = {
  getQuestions(req, res) {
      getQuestionsDB(req.query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send();
      } else {
        res.status(200).send(Object.assign({product_id: req.query.product_id}, result))
      }
    });
  },

  addQuestion(req, res) {
      addQuestionDB(req.body, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send();
        } else {
          console.log('>>>>>', result);
          res.status(201).send('CREATED');
        }
      });
  },

  addAnswer(req, res) {
    addAnswerDB(req.body, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send();
      } else {
        console.log('>>>>>', result);
        res.status(201).send('CREATED');
      }
    });
  },

  markHelpfulQuestion(req, res) {
    markHelpfulQuestionDB(req.body, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send();
      } else {
        console.log('>>>>>', result);
        res.status(204).send('NO CONTENT');
      }
    });
  },

  markHelpfulAnswer(req, res) {
    markHelpfulAnswerDB(req.body, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send();
      } else {
        console.log('>>>>>', result);
        res.status(204).send('NO CONTENT');
      }
    });
  },

  reportAnswer(req, res) {
    reportAnswerDB(req.body, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send();
      } else {
        console.log('>>>>>', result);
        res.status(204).send('NO CONTENT');
      }
    });
  },
}
