const babelConfig = {
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          targets: {
            node: "current"
          },
          useBuiltIns: "usage",
          corejs: {
            version: "3.40",
            proposals: true
          }
        }
      ],
      "@babel/preset-typescript"
    ]
};

export default babelConfig;