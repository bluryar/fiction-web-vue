const apiHost =
  process.env.NODE_ENV === "production" ? "xxx" : "http://localhost:7001";

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: apiHost,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  }
};
