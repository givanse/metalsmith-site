const NODE_ENV =  process.env.NODE_ENV || 'development';

export default  {
  env: {
    development: NODE_ENV === 'development',
    production: NODE_ENV === 'production'
  }
};
