import path from 'path';

export default () => (files, metalsmith, done) => {
  const {fingerprint} = metalsmith.metadata();
  for (let f in files) {
    if (f.endsWith('swig')) {
      const pathname = path.dirname(f);
      const cssAsset = path.join(pathname, 'index.css');
      const jsAsset = path.join(pathname, 'index.js');
      if (fingerprint[cssAsset]) files[f].cssAsset = fingerprint[cssAsset];
      if (fingerprint[jsAsset]) files[f].jsAsset = fingerprint[jsAsset];
    }
  }
  done();
};

