const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === "/api/whoami") {
    const ipaddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const language = req.headers["accept-language"];
    const software = req.headers["user-agent"];

    const response = {
      ipaddress: ipaddress,
      language: language,
      software: software,
    };

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://www.freecodecamp.org",
    });
    res.end(JSON.stringify(response));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://www.freecodecamp.org",
    });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
