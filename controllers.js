const helper = require("./helper");
const mock = require("./articles.json");

//GET all articles
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

//GET article by ID
function getArticle(req, res, params) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  helper.parseBody(req, (err, body) => {
    const id = params.id;

    try {
      const article = mock.find((items) => items.id === id);

      if (!article) {
        res.statusCode = 201;
        res.end("No such record");
      }

      res.statusCode = 200;
      res.end(JSON.stringify(article));
    } catch (error) {
      res.statusCode = 401;
      res.end(`No such record: ${error}`);
    }
  });
}

//POST new article
function postArticle(req, res, payload, cb) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  helper.parseBody(req, (err, body) => {
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

//PUT article by ID
function updateArticle(req, res, payload, cb) {
  console.log("1");
}

//DELETE article by ID
function deleteArticle(req, res, params) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  helper.parseBody(req, (err, body) => {
    const id = params.id;

    try {
      const index = mock.filter((item) => item.id != id);
      mock.splice(index, 1);

      res.statusCode = 200;
      res.end();
    } catch (error) {
      res.statusCode = 401;
      res.end("Something went wrong", error);
    }
  });
}

//POST comment
function postComment(req, res, params) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  helper.parseBody(req, (err, body) => {
    const articleId = params.articleId;

    try {
      const getArticle = mock.find((item) => item.id === articleId);

      if (!getArticle) {
        res.statusCode = 201;
        res.end("No such record");
      }

      const newComment = {
        id: getArticle.comments.length,
        articleId: articleId,
        text: body.text,
        date: 123,
        author: body.author,
      };

      getArticle.comments.push(newComment);

      res.statusCode = 201;
      res.end("Created");
      
    } catch (error) {
      res.statusCode = 401;
      res.end(`No such record: ${error}`);
    }
  });
}

//DELETE comment
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
