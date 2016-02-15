import path from 'path';
import {each} from 'async';

const getValue = (f) => {
  if (typeof f === 'function') return f();
  return f;
};

const interopRequire = (file) => {
  const ret = require(file);
  if (ret.__esModule && ret.default) return ret.default;
  return ret;
};

export default () => (files, metalsmith, done) => {
  const source = metalsmith.source();
  const dataFiles = [];

  for (let f in files) {
    if (f.endsWith('data.js')) dataFiles.push(f);
  }

  const convert = (file, cb) => {
    const dataPath = path.join(source, file);
    const func = interopRequire(dataPath);

    Promise.resolve(getValue(func)).then((result) => {
      const targetFile = file.replace(/data\.js$/, 'index.swig');
      if (files[targetFile]) {
        files[targetFile].data = result;
      }
      delete files[file];
      cb();
    }).catch(e => cb(e));
  };

  each(dataFiles, convert, done);
};
