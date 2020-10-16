const PROXY_CONFIG = {
  "/api/*": {
    "target": "http://razor-server:8150",
    "secure": false,
    "bypass": function (req, res, proxyOptions) {
      delete req.headers["Referer"];
    }
  }
}

module.exports = PROXY_CONFIG;
