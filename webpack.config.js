const fs = require('fs');
const path = require('path');

const indent = (str, spaces = 2) => str.split('\n').map(line => ' '.repeat(spaces) + line).join('\n');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /MigFilterBypassThread\.js$/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.emit.tap('WrapPlugin', (compilation) => {
          const headerSource = fs.readFileSync(path.resolve(__dirname, 'src/header.js'), 'utf8');
          const asset = compilation.assets['bundle.js'];
          const originalSource = asset.source();

          const wrappedSource =
`(() => {
${indent(headerSource, 2)}
  try {
\t  ${originalSource}
  } catch (error) {
      LOG(\`Main function resulted with an error: \${error}\`);
      LOG("stack: " + error.stack);
  } finally {
      exit(0n);
  }
})();`;

          compilation.assets['bundle.js'] = {
            source: () => wrappedSource,
            size: () => wrappedSource.length,
          };
        });
      },
    },
  ],
  optimization: {
    minimize: false,
    namedModules: true,
    namedChunks: true,
    concatenateModules: false,
    usedExports: false,
    providedExports: true,
    sideEffects: false
  },
};