const isTest = String(process.env.NODE_ENV) === "test";

module.exports = {
  presets: [
    [
      "@babel/env",
      {
        corejs: 3,
        useBuiltIns: "usage",
        modules: isTest ? "commonjs" : false,
      },
    ],
    "@babel/preset-typescript",
    "@babel/react",
  ],
};
