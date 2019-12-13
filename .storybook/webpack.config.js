
const path = require("path");
const SRC_PATH = path.join(__dirname, '../src');


module.exports = ({config}) => {
  //
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [SRC_PATH],
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          configFileName: './.storybook/tsconfig.json'
        },
      },
      { loader: require.resolve('react-docgen-typescript-loader') },
    ]
  });
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parse: 'typescript' },
      },
    ],
    enforce: 'pre',
  });

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
