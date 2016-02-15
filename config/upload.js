var s3 = require('s3');

import env from '../.env';

const client = s3.createClient({
  s3Options: {
    accessKeyId: env.S3_KEY,
    secretAccessKey: env.S3_SECRET,
    region: 'us-east-1'
  }
});

const params = {
  localDir: 'build',
  deleteRemoved: true,
  s3Params: {
    Bucket: 'BUCKET_NAME',
    ACL: 'public-read'
  },
};

const uploader = client.uploadDir(params);

uploader.on('error', function(err) {
  console.error('unable to sync:', err.stack);
});
uploader.on('end', function() {
  console.log('done uploading');
});

