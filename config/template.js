import path from 'path';
import swig from 'swig';
import {each} from 'async';

export default () => {
  swig.setDefaults({
    loader: swig.loaders.fs(path.resolve(__dirname, '../src/templates'))
  });
  return (files, metalsmith, done) => {
    const source = metalsmith.source();
    const metadata = metalsmith.metadata();
    const toRender = [];

    for (let f in files) {
      if (f.endsWith('.swig')) {
        toRender.push({
          file: f,
          data: files[f]
        });
      }
    }

    const render = ({file, data}, cb) => {
      swig.renderFile(path.join(source, file),{
        ...data,
        ...metadata
      }, (err, result) => {
        if (err) {
          cb(err);
          return;
        }
        files[file].contents = new Buffer(result);
        cb();
      });

    };

    each(toRender, render, done);
  };
};
