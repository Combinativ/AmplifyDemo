import axios from 'axios';
import React from 'react';
import { Button } from 'semantic-ui-react';

import {BACKEND_URL} from '../../redux/actions/types';

const S3Uploader = () => {

  const onRequestUrl = () => {
    const url = BACKEND_URL + "/api/signed_url";
    axios.post(url).then((res) => {
			console.log("Request successful: ", res.data);
		})
		.catch((err) => {
      console.log("request failed: ", err.data);
		});
  }

  var ReactS3Uploader = require('react-s3-uploader');
  return (  
    <>
      <h1>uploader</h1>
      <Button onClick={onRequestUrl}>
        Request URL
      </Button>
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