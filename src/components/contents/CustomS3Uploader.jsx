import axios from 'axios';
import React, {useState} from 'react';
import { Button, Icon } from 'semantic-ui-react';

const REQUEST_URL = 'https://vbs6l9lgla.execute-api.ap-south-1.amazonaws.com/dev/getPreSignedUrl';

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
    axios.post(url).then((res) => {
			console.log("Request successful: ", res.data);
		})
		.catch((err) => {
      console.log("request failed: ", err.data);
		});
  }

  const uploadToUrl = (url) => {
    let payload = new FormData();
    payload.append("myfile", file);
    axios.put(url, payload)
    .then((res) => {
			console.log("Request successful: ", res.data);
		})
		.catch((err) => {
      console.log("request failed: ", err.data);
		});
  }

  // gets presigned url and uploads file
  const handleUpload = async () => {
    try {
      const presignedUrl = await getPresignedUrl();
      // uploadToUrl(presignedUrl);
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