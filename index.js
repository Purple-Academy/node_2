const http = require("http");
const controllers = require("./controllers");
const helper = require("./helper");

const hostname = "127.0.0.1";
const port = 3000;

const endpointMapper = {
  "/api/articles": controllers.getAllArticles,
  "/api/articles/read": controllers.getArticle,
  "/api/articles/create": controllers.postArticle,
  "/api/articles/update": controllers.updateArticle,
  "/api/articles/delete": controllers.deleteArticle,
  "/api/comments/create": controllers.postComment,
  "/api/comments/delete": controllers.deleteComment,
};

function handler(req, res) {
  const { url, params } = helper.parseUrl(req.url);

  const handler = endpointMapper[url];

  if (handler) {
    handler(req, res, params);
  } else {
    send404(req, res);
  }
}

const server = http.createServer(handler);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function send404(req, res) {
  res.statusCode = 404;
  res.end("404 Page Not Found");
}
