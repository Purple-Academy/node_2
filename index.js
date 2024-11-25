const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const handlers = {
  "/sum": sum,
  "/mult": mult,
  //new routes
  "/api/articles/readall": getAllArticles,
  "/api/articles/read": getArticle,
  "/api/articles/create": postArticle,
  "/api/articles/update": updateArticle,
  "/api/articles/delete": deleteArticle,
  "/api/comments/create": postComment,
  "/api/comments/delete": deleteComment,
};

const server = http.createServer((req, res) => {
  parseBodyJson(req, (err, payload) => {
    const handler = getHandler(req.url);

    handler(req, res, payload, (err, result) => {
      if (err) {
        res.statusCode = err.code;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(err));

        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
  return handlers[url] || notFound;
}

function sum(req, res, payload, cb) {
  const result = { c: payload.a + payload.b };

  cb(null, result);
}

//added new function
function mult(req, res, payload, cb) {
  const result = { c: payload.a * payload.b };

  cb(null, result);
}

function getAllArticles(req, res, payload, cb) {
  console.log("get all routes");
}

function getArticle(req, res, payload, cb) {
  console.log("1");
}

function postArticle(req, res, payload, cb) {
  console.log("1");
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

// end of routes
function notFound(req, res, payload, cb) {
  cb({ code: 404, message: "Not found" });
}

function parseBodyJson(req, cb) {
  let body = [];

  req
    .on("data", function (chunk) {
      body.push(chunk);
    })
    .on("end", function () {
      body = Buffer.concat(body).toString();

      let params = JSON.parse(body);

      cb(null, params);
    });
}
