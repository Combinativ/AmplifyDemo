import React from 'react';

const S3Uploader = () => {

  var ReactS3Uploader = require('react-s3-uploader');
  return (  
    <>
      <h1>uploader</h1>
      <ReactS3Uploader 
        // signingUrl="/s3/sign"
        // signingUrlMethod="GET"
        // accept="image/*"
        // s3path="/uploads/"
        // preprocess={this.onUploadStart}
        // onSignedUrl={this.onSignedUrl}
        // onProgress={this.onUploadProgress}
        // onError={this.onUploadError}
        // onFinish={this.onUploadFinish}
        // signingUrlHeaders={{ additional: headers }}
        // signingUrlQueryParams={{ additional: query-params }}
        // signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
        // uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
        // contentDisposition="auto"
        // scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
        // server="http://cross-origin-server.com"
        // inputRef={cmp => this.uploadInput = cmp}
        // autoUpload={true}
      />
    </>
  );
}
 
export default S3Uploader;