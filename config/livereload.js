import tinylr from 'tiny-lr';

export default (options = {port: 35729}) => {
  const server = tinylr(options);

  server.on('error', function(err) {
    console.log(err);
    throw err;
  });

  server.listen(options.port, function(err) {
    if(err) {
      console.log(err);
      throw err;
    }

    console.log(`Live reload server started on port: ${options.port}`);
  });

  return server;
};

