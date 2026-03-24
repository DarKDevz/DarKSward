const fs = require('fs');
const path = require('path');
const indent = (str, spaces = 2) => str.split('\n').map(line => ' '.repeat(spaces) + line).join('\n');

const commonConfig = {
  mode: 'production',
  context: __dirname,
  devtool: false,
  target: 'web',
  resolve: {
    alias: {
      libs: path.resolve(__dirname, 'src/libs')
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js']
  },
  optimization: {
    avoidEntryIife: false,
    minimize: false,
    moduleIds: 'named',
    chunkIds: 'named',
    concatenateModules: false,
    sideEffects: false,
    usedExports: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    iife: true,
    pathinfo: true,
    environment: {
      arrowFunction: true,
      const: true,
      methodShorthand: false,
    },
  },
};

const migConfig = {
  ...commonConfig,
  name: 'mig',
  entry: './src/MigFilterBypassThread.js',
  output: {
    ...commonConfig.output,
    filename: 'MigFilterBypassThread.js',
  },
};

const mainConfig = {
  ...commonConfig,
  name: 'main',
  dependencies: ['mig'], // <-- tells webpack to wait for mig to finish first
  entry: './src/main.js',
  output: {
    ...commonConfig.output,
    filename: 'bundle.js',
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
\t${originalSource}
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
};

module.exports = [migConfig, mainConfig];