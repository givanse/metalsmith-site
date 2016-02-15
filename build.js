import path from 'path';
import Metalsmith from 'metalsmith';
import serve from 'metalsmith-serve';
import fingerprint from 'metalsmith-fingerprint-ignore';
import sass from 'metalsmith-sass';
import autoprefixer from 'metalsmith-autoprefixer';
import htmlMinifier from  'metalsmith-html-minifier';
import rename from 'metalsmith-rename';
import filenames from 'metalsmith-filenames';
import ignore from 'metalsmith-ignore';

import metadata from './config/metadata';
import template from './config/template';
import jsAssets from './config/jsAssets';
import pageAssets from './config/pageAssets';
import pageData from './config/pageData';
import livereloadServer from './config/livereload';

import sane from 'sane';

const site = Metalsmith(__dirname);

site
  .metadata(metadata)
  .use(ignore([
    '!**/{index,data,global}.{js,css,scss}',
    '!**/index.{html,swig}',
    '!static/*',
  ]))
  .use(pageData())
  .use(jsAssets())
  .use(sass())
  .use(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'IE >= 9']}))
  .use(fingerprint({pattern: [
    '**/index.css',
    '**/index.js',
    '**/global.css',
    '**/global.js',
  ]}))
  .use(filenames())
  .use(pageAssets())
  .use(template())
  .use(rename([[/\.swig$/, '.html']]))
  ;

if (metadata.env.production) {
  site.use(htmlMinifier());
  site.build((err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
} else {
  site.use(serve());

  const livereload = livereloadServer();

  const build = () => {
    const source =  site.source();
    for(let f in require.cache) {
      if (f.startsWith(source)) delete require.cache[f];
    }

    console.log('Building...');
    site.build(function(err, files) {
      if (err) {
        console.log(err);
        throw err;
      }
      const keys = Object.keys(files);
      livereload.changed({body: {files: keys}});
      console.log('Built, reloading.');
    });
  };

  const watcher = sane(path.join(__dirname, 'src'), {glob: ['**/*']});

  watcher.on('ready', build);
  watcher.on('add', build);
  watcher.on('change', build);
  watcher.on('delete', build);
}
