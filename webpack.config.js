const fs = require('fs');
const path = require('path');

const indent = (str, spaces = 2) => str.split('\n').map(line => ' '.repeat(spaces) + line).join('\n');

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: './src/main.js',
  devtool: false,
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    iife: true,
    pathinfo: true,
    environment: {
      arrowFunction: true,
      const: true,
    },
  },
  resolve: {
    alias: {
      libs: path.resolve(__dirname, 'src/libs')
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js']
  },
  module: {
    rules: [
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
          if (!asset) return;

          let originalSource = asset.source();

          const wrappedSource =
`(() => {
${indent(headerSource, 2)}
  try {
${originalSource}
  } catch (error) {
	  LOG(\`Main function resulted with an error: \${error}\`);
	  LOG("stack: " + error.stack);
  } finally {
	  // Post-Exp done.
	  // Exiting the process.
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
    avoidEntryIife: false,
    minimize: false,
    moduleIds: 'named',
    chunkIds: 'named',
    concatenateModules: false,
    sideEffects: false,
    usedExports: false,
  },
};