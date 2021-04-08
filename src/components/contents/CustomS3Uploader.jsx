import axios from 'axios';
import React, {useState} from 'react';
import { Button, Icon } from 'semantic-ui-react';

let REQUEST_URL = 'https://vbs6l9lgla.execute-api.ap-south-1.amazonaws.com/dev/getPreSignedUrl';

const REQUEST_URL2= 'https://vbs6l9lgla.execute-api.ap-south-1.amazonaws.com/dev/api/signed_url4';


REQUEST_URL=REQUEST_URL2
const CustomS3Uploader = () => {

  const [file, setFile] = useState();
  
  const OnFileChange = (event) => {
    const content = event.target.files[0];
    let type = content.type.split("/")[0];
    console.log("content: ", content);
    if (type === "image" || type === "video") {
      setFile(content);
    } else {
      console.log("error: not an image");
    }
  }
  // fetches presigned url for S3 upload
  const getPresignedUrl = () => {
    const url = REQUEST_URL;
    console.log("starting url request");
    axios.post(url).then((res) => {
			console.log("Signed URL acquired: ", res.data.url);
      console.log("AWS fields:", res.data.fields);
      // let presignedUrl = res.data.uploadURL;
      // uploadToUrl(presignedUrl);
      uploadtToS3Url(res.data)
		})
		.catch((err) => {
      console.log("request failed: ", err.data);
		});
  }

  const uploadToUrl = (url) => {

    console.log("starting upload");
    let payload = new FormData();
    payload.append("myfile", file);
    axios.put(url, payload)
    .then((res) => {
			console.log("Upload successful: ", res.data);
		})
		.catch((err) => {
      console.log("upload failed: ", err.data);
		});
  }

  const uploadtToS3Url = (signed_data) => {
    let payload = new FormData();
    payload.append(signed_data.fields)
    payload.append("myfile", file);
    axios.put(signed_data.url, payload)
    .then((res) => {
			console.log("S3 Upload successful: ", res.data);
		})
		.catch((err) => {
      console.log("S3 upload failed: ", err.data);
		});
  }

  // gets presigned url and uploads file
  const handleUpload = () => {
    try {
      getPresignedUrl();
    } catch(err) {
      console.log("error in handle upload ", err);
    }
  }

  return ( 
    <div>
      <input onChange={OnFileChange} type="file" id="myfile" style={{display: 'none'}}/>
      <h4>{file? file.name : "Choose a file..."}</h4>
      <Button onClick={() => {document.getElementById('myfile').click()}}><Icon name='hand pointer' />Choose</Button>
      <Button onClick={()=>setFile(undefined)}><Icon name='close' />Clear</Button>
      <Button color="orange" onClick={handleUpload}><Icon name='upload' />Upload</Button>
    </div>
  );
}
 
export {CustomS3Uploader};