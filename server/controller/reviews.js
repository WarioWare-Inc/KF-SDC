const axios = require('axios');

module.exports = {
  getReviews(req, res) {
    const endpoint = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/';
    const option = {
      method: 'GET',
      url: endpoint,
      headers: {
        Authorization: process.env.TOKEN,
      },
      params: req.query,
    };
    return axios(option)
      .then((result) => {
        res.status(200).send(result.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  },

  getReviewsMeta(req, res) {
    const endpoint = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta';
    const option = {
      method: 'GET',
      url: endpoint,
      params: { product_id: req.query.product_id },
      headers: {
        Authorization: process.env.TOKEN,
      },
    };
    return axios(option)
      .then((result) => {
        res.status(200).send(result.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  },

  addReview(req, res) {
    const endpoint = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews';
    const option = {
      method: 'POST',
      url: endpoint,
      headers: {
        Authorization: process.env.TOKEN,
      },
      data: req.body,
    };
    return axios(option)
      .then((result) => {
        res.status(200).send(result.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  },

};
