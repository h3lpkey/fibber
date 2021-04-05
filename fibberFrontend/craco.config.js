const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@models": path.resolve(__dirname, "src/models/"),
      "@api": path.resolve(__dirname, "src/api/")
    }
  }
};
