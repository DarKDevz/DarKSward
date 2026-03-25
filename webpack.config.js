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
    sideEffects: true,
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

//This is the only way to remove the warnings
//Threat actors have to have used this. there is no other way.
const removeMissingModuleGuardPlugin = {
  apply: (compiler) => {
    compiler.hooks.compilation.tap('RemoveMissingModuleGuard', (compilation) => {
      const hooks = require('webpack/lib/javascript/JavascriptModulesPlugin').getCompilationHooks(compilation);
      hooks.renderRequire.tap('RemoveMissingModuleGuard', (code) => {
        // Remove the MODULE_NOT_FOUND guard block + trailing empty /******/ line
        code = code.replace(
          /if \(!\(moduleId in __webpack_modules__\)\) \{[\s\S]*?throw e;\s*\}\n/,
          ''
        );
        // Remove unused pure expression dead code
        code = code.replace(
          /\/\* unused pure expression or super \*\/ null && \([^)]*\)\);/g,
          ''
        );
        return code;
      });
      hooks.renderModuleContent.tap('RemoveDeadCode', (moduleSource) => {
        const source = moduleSource.source();
        if (!source.includes('unused pure expression or super')) return moduleSource;
        const { ReplaceSource } = require('webpack-sources');
        const newSource = new ReplaceSource(moduleSource);
        const regex = /\(\/\* unused pure expression or super \*\/ null && \(([^)]*)\)\)/g; let match;
        while ((match = regex.exec(source)) !== null) {
          newSource.replace(match.index, match.index + match[0].length - 1, match[1]);
        }
        return newSource;
      });
    });
  },
};


const migConfig = {
  ...commonConfig,
  name: 'mig',
  entry: './src/MigFilterBypassThread.js',
  output: {
    ...commonConfig.output,
    filename: 'MigFilterBypassThread.js',
    library: {
      type: 'commonjs',
    },
  },
  optimization: {
    ...commonConfig.optimization,
    innerGraph: false, //<------- Needed for dumpKMEM to show the correct libs
    providedExports: false, //<--- same as ^
  },
  plugins: [removeMissingModuleGuardPlugin],
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
  plugins: [removeMissingModuleGuardPlugin,
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
\t  ${originalSource}
  } catch (error) {
	  LOG(\`Main function resulted with an error: \${error}\`);
	  LOG("stack: " + error.stack);
  } finally {
	  // Post-Exp done.
	  // Exiting the process.
	  exit(0n);
  }
})();
`;
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