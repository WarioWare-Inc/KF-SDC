CREATE DATABASE "questions-answers";

\c "questions-answers";

DROP TABLE IF EXISTS questions;
CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL UNIQUE PRIMARY KEY,
  product_id INT,
  body VARCHAR(200),
  date_written BIGINT,
  asker_name VARCHAR(200),
  asker_email VARCHAR(200),
  reported BOOLEAN,
  helpfulness INT
);

DROP TABLE IF EXISTS answers;
CREATE TABLE IF NOT EXISTS answers (
  answerer_id SERIAL UNIQUE PRIMARY KEY,
  question_id SERIAL REFERENCES questions (question_id),
  body VARCHAR(200),
  date_written BIGINT,
  answerer_name VARCHAR(200),
  answerer_email VARCHAR(200),
  reported BOOLEAN,
  helpfulness INT
);

DROP TABLE IF EXISTS photos;
CREATE TABLE IF NOT EXISTS photos (
  photo_id SERIAL UNIQUE PRIMARY KEY,
  answerer_id SERIAL REFERENCES answers (answerer_id),
  url VARCHAR(300)
);

--   Terminal Commands for ETL
--   from current directory:

-- \i postgreSQL.sql

-- copy questions
-- from '/Users/kforeman/Downloads/drive-download-20230524T161527Z-001/questions.csv'
-- delimiter ','
-- csv header;

-- copy answers
-- from '/Users/kforeman/Downloads/drive-download-20230524T161527Z-001/answers.csv'
-- delimiter ','
-- csv header;

-- copy photos
-- from '/Users/kforeman/Downloads/drive-download-20230524T161527Z-001/answers_photos.csv'
-- delimiter ','
-- csv header;

-- select setval('questions_question_id_seq',  (SELECT count(*) FROM questions));
-- select setval('answers_answerer_id_seq',  (SELECT count(*) FROM answers));
-- select setval('photos_photo_id_seq',  (SELECT count(*) FROM photos));