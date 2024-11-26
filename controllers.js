const helper = require("./helper");
const mock = require("./articles.json");

function getAllArticles(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  try {
    const articles = mock.map((items) => res.write(JSON.stringify(items)));

    res.statusCode = 200;
    res.end(JSON.stringify(articles));
  } catch (error) {
    res.statusCode = 401;
    res.end(`No such entity: ${error}`);
  }
}

function getArticle(req, res, params) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  helper.parseBody(req, (err, body) => {
    const id = params.id;

    try {
      const article = mock.find((items) => items.id === id);

      res.statusCode = 200;
      res.end(JSON.stringify(article));
    } catch (error) {
      res.statusCode = 401;
      res.end(`No such record: ${error}`);
    }
  });
}

function postArticle(req, res, payload, cb) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  helper.parseBody(req, (err, body) => {
    console.log(body);

    try {
      const newArticle = {
        id: mock.length + 1,
        title: body.title,
        text: body.text,
        date: 231,
        author: body.author,
      };

      mock.push(newArticle);
      res.statusCode = 201;
      res.end("Created");
    } catch (error) {
      res.statusCode = 401;
      res.end(`No such record: ${error}`);
    }
  });
}

function updateArticle(req, res, payload, cb) {
  console.log("1");
}

function deleteArticle(req, res, payload, cb) {
  console.log("1");
}

function postComment(req, res, payload, cb) {
  console.log("1");
}

function deleteComment(req, res, payload, cb) {
  console.log("1");
}

module.exports = {
  getAllArticles,
  getArticle,
  postArticle,
  updateArticle,
  deleteArticle,
  postComment,
  deleteComment,
};
