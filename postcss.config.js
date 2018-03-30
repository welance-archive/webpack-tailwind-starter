var tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    require("postcss-import", {}),
    tailwindcss("tailwind.js"),
    require("autoprefixer", { browsers: "last 10 versions" }),
    require("cssnano", {
      preset: ["default", { discardComments: { removeAll: true } }]
    })
  ]
};
