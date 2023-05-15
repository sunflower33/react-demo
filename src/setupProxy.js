const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/ajax",
    createProxyMiddleware({
      target: "https://m.maoyan.com/",
      changeOrigin: true,
    })
  );
  app.use(
    "/graphql",
    createProxyMiddleware({
      target: "http://localhost:2222/",
      changeOrigin: false,
    })
  );
};
