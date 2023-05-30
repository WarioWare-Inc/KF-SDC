const { Pool } = require('pg');

const pool = new Pool({
  user: 'kforeman',
  database: 'questions-answers'
});

module.exports = {
  getQuestionsDB(params, callback) {
    pool.query(
      `select coalesce(json_agg(question), '{}'::json) as results
      from (
        select
        questions.question_id,
        questions.body as question_body,
        questions.date_written as question_date,
        questions.asker_name,
        questions.helpfulness as question_helpfulness,
        questions.reported,
        questions.product_id,
        (
          select coalesce(json_object_agg(nested_answer.id, nested_answer), '{}'::json)
          from (
            select
            answers.answerer_id as id,
            answers.body,
            answers.date_written as date,
            answers.answerer_name,
            answers.helpfulness,
            (
              select coalesce(json_agg(nested_photo), '[]'::json) as photos
              from (
                select
                photos.photo_id as id,
                photos.url,
                photos.answerer_id
                from photos
                where photos.answerer_id = answers.answerer_id
              ) as nested_photo
            )
            from answers
            where answers.question_id = questions.question_id and answers.reported = false
          ) as nested_answer
        ) as answers
        from questions
      ) as question
      where question.product_id = $1
      limit $2;`,
      [params.product_id, params.count])
      .then((result) => {
        pool.end;
        callback(null, result.rows[0]);
      })
      .catch((err) => {
        callback(err, null);
      });
  },
  getAnswersDB(params, callback) {
    pool.query(
    `select coalesce(json_object_agg(nested_answer.id, nested_answer), '{}'::json)
      from
      (
        select
        answers.answerer_id as id,
        answers.body,
        answers.date_written as date,
        answers.answerer_name,
        answers.helpfulness,
        (
          select coalesce(json_agg(nested_photo), '[]'::json) as photos
          from
          (
            select
            photos.photo_id as id,
            photos.url,
            photos.answerer_id
            from photos
            where photos.answerer_id = answers.answerer_id
          ) as nested_photo
        )
      from answers
      where answers.question_id = $1 and answers.reported = false
      ) as nested_answer
    limit $2`, [params.question_id, params.count])
      .then((result) => {
        pool.end;
        callback(null, result.rows[0]);
      })
      .catch((err) => {
        callback(err, null);
      });
  },
  addQuestionDB(params, callback) {
    pool.query(
      `insert into questions(
        question_id,
        product_id,
        body,
        date_written,
        asker_name,
        asker_email,
        reported,
        helpfulness
      )
      values (DEFAULT, $1, $2, $3, $4, $5, $6, $7)`,
      [
        params.product_id,
        params.body,
        Date.now(),
        params.name,
        params.email,
        false,
        0
      ])
      .then((result) => {
        pool.end;
        callback(null, result);
      })
      .catch((err) => {
        callback(err, null);
      });
  },
  addAnswerDB(params, callback) {
    pool.query(
      `insert into answers(
        answerer_id,
        question_id,
        body,
        date_written,
        answerer_name,
        answerer_email,
        reported,
        helpfulness
      )
      values (DEFAULT, $1, $2, $3, $4, $5, $6, $7)`,
      [
        params.question_id,
        params.body.body,
        Date.now(),
        params.body.name,
        params.body.email,
        false,
        0
      ])
      .then((result) => {
        pool.end;
        callback(null, result);
      })
      .catch((err) => {
        callback(err, null);
      });
  },
  markHelpfulQuestionDB(params, callback) {
    pool.query(
      `update questions
        set helpfulness = helpfulness + 1
      where questions.question_id = $1;
      `,
      [params.question_id])
      .then((result) => {
        pool.end;
        callback(null, result);
      })
      .catch((err) => {
        callback(err, null);
      });
  },
  markHelpfulAnswerDB(params, callback) {
    pool.query(
      `update answers
        set helpfulness = helpfulness + 1
      where answers.answerer_id = $1;
      `,
      [params.answer_id])
      .then((result) => {
        pool.end;
        callback(null, result);
      })
      .catch((err) => {
        callback(err, null);
      });
  },
  reportAnswerDB(params, callback) {
    pool.query(
      `update answers
        set reported = true
      where answers.answerer_id = $1;
      `,
      [params.answer_id])
      .then((result) => {
        pool.end;
        callback(null, result);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
};
