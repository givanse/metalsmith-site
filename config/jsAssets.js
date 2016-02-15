import path from 'path';
import webpack from 'webpack';
import MemoryInputFileSystem from 'enhanced-resolve/lib/MemoryInputFileSystem';
import MemoryOutputFileSystem from 'webpack/lib/MemoryOutputFileSystem';
import {each} from 'async';
import tty from 'tty';

import metadata from './metadata';

const options = {
  context: path.resolve(__dirname, '../src/'),
  devtool: (metadata.env.production ? null : 'cheap-module-source-map'),
  entry: {
    site: './site.js'
  },
  output: {
    path: path.resolve(__dirname, './build/'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-1'],
        }
      }
    ]
  },
  plugins: []
};

if (metadata.env.production) {
  options.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false}
  }));
  options.plugins.push(new webpack.optimize.DedupePlugin());
}

export default () => (files, metalsmith, done) => {
  const jsFiles = [];
  for (let f in files) {
    if (f.endsWith('global.js') || f.endsWith('index.js')) {
      jsFiles.push(f);
    }
  }

  const convert = (f, cb) => {
    const config = {
      ...options,
      entry: { [f]: './'+f },
      output: {
        path: path.resolve(__dirname, './build/'),
        filename: '[name]'
      },
    };

    const compiler = webpack(config);
    const _files = {};
    const fs = new MemoryInputFileSystem(_files);
    compiler.outputFileSystem = new MemoryOutputFileSystem(_files);

    compiler.run(function (err, stats) {
      if (err) {
        cb(err);
        return;
      }
      const info = stats.toString({ chunkModules: false, colors: tty.isatty(1) });
      if (stats.hasErrors()) {
        cb(info);
        return;
      }
      const filePath = path.join(config.output.path, f);
      files[f] = {
        contents: fs.readFileSync(filePath)
      };
      if (metadata.env.development) {
        files[f+'.map'] = {
          contents: fs.readFileSync(filePath+'.map')
        };
      }
      cb();
    });
  };

  each(jsFiles, convert, done);
};
