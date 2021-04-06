import axios from 'axios';
import React from 'react';
import { Button } from 'semantic-ui-react';

import {BACKEND_URL} from '../../redux/actions/types';


const S3Uploader = () => {

  const onRequestUrl = () => {
    const url = BACKEND_URL + "/api/signed_url1";
    const data = {
      object_name: 'myobject'
    }
    axios.post(url, data).then((res) => {
			console.log("Request successful: ", res.data);
		})
		.catch((err) => {
      console.log("request failed: ", err.data);
		});
  }

  var ReactS3Uploader = require('react-s3-uploader');
  const url1 = BACKEND_URL + "/api/signed_url1";
  const url2 = BACKEND_URL + "/api/signed_url2";
  const url3 = BACKEND_URL + "/api/signed_url3";
  const url4 = BACKEND_URL + "/api/signed_url4";

  const onUploadStart = () => {
    console.log("Upload is starting");
  }

  const onSignedUrl = () => {
    console.log("signed url acquired");
  }

  const onUploadProgress = () => {
    console.log("uploading");
  }

  const onUploadError = () => {
    console.log("Error on upload");
  }

  const onFinish = () => {
    console.log("Finished Upload");
  }
  function getSignedUrl(file, callback) {
    const params = {
      objectName: file.name,
      contentType: file.type
    };
   
    axios.get(url2, { params })
    .then(data => {
      callback(data);
    })
    .catch(error => {
      console.error(error);
    });
  }
   
   
  
  return (  
    <>
      <h1>uploader</h1>
      {/* <Button onClick={onRequestUrl}>
        Request URL
      </Button> */}
      <h4>custom</h4>
      <ReactS3Uploader
        // className={uploaderClassName}
        getSignedUrl={getSignedUrl}
        accept="image/*"
        // onProgress={onProgress}
        // onError={onError}
        // onFinish={onFinish}
        uploadRequestHeaders={{
          'x-amz-acl': 'public-read'
        }}
        contentDisposition="auto"
      />
      <ReactS3Uploader 
        signingUrl={url1}
        signingUrlMethod="POST"
        accept="image/*"
        //s3path="/uploads/"
        // preprocess={onUploadStart}
        // onSignedUrl={onSignedUrl}
        // onProgress={onUploadProgress}
        // onError={onUploadError}
        // onFinish={onUploadFinish}
        //signingUrlHeaders={{ additional: headers }}
        //signingUrlQueryParams={{ additional: query-params }}
        //signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
        //uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
        //contentDisposition="auto"
        // inputRef={cmp => this.uploadInput = cmp}
        //autoUpload={true}
      />
      <ReactS3Uploader 
        signingUrl={url2}
        signingUrlMethod="POST"
        accept="image/*"
        //s3path="/uploads/"
        // preprocess={onUploadStart}
        // onSignedUrl={onSignedUrl}
        // onProgress={onUploadProgress}
        // onError={onUploadError}
        // onFinish={onUploadFinish}
        //signingUrlHeaders={{ additional: headers }}
        //signingUrlQueryParams={{ additional: query-params }}
        //signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
        //uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
        //contentDisposition="auto"
        // inputRef={cmp => this.uploadInput = cmp}
        //autoUpload={true}
      />
      <ReactS3Uploader 
        signingUrl={url3}
        signingUrlMethod="POST"
        accept="image/*"
        //s3path="/uploads/"
        // preprocess={onUploadStart}
        // onSignedUrl={onSignedUrl}
        // onProgress={onUploadProgress}
        // onError={onUploadError}
        // onFinish={onUploadFinish}
        //signingUrlHeaders={{ additional: headers }}
        //signingUrlQueryParams={{ additional: query-params }}
        //signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
        //uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
        //contentDisposition="auto"
        // inputRef={cmp => this.uploadInput = cmp}
        //autoUpload={true}
      />
      <ReactS3Uploader 
        signingUrl={url4}
        signingUrlMethod="POST"
        accept="image/*"
        //s3path="/uploads/"
        // preprocess={onUploadStart}
        // onSignedUrl={onSignedUrl}
        // onProgress={onUploadProgress}
        // onError={onUploadError}
        // onFinish={onUploadFinish}
        //signingUrlHeaders={{ additional: headers }}
        //signingUrlQueryParams={{ additional: query-params }}
        //signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
        //uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
        //contentDisposition="auto"
        // inputRef={cmp => this.uploadInput = cmp}
        //autoUpload={true}
      />
      {/* <ReactS3Uploader 
        signingUrl="/s3/sign"
        signingUrlMethod="GET"
        accept="image/*"
        s3path="/uploads/"
        preprocess={this.onUploadStart}
        onSignedUrl={this.onSignedUrl}
        onProgress={this.onUploadProgress}
        onError={this.onUploadError}
        onFinish={this.onUploadFinish}
        signingUrlHeaders={{ additional: headers }}
        signingUrlQueryParams={{ additional: query-params }}
        signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
        uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
        contentDisposition="auto"
        scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
        server="http://cross-origin-server.com"
        inputRef={cmp => this.uploadInput = cmp}
        autoUpload={true}
      /> */}
    </>
  );
}
 
export default S3Uploader;