import axios from 'axios';
import React, {useState} from 'react';
import { Button, Icon } from 'semantic-ui-react';

/**
 * CustomS3Uploader: Customised S3 uploader button that can request an API endpoint to get presigned url and then upload selected file 
 * to that url. Comes in with file browser and upload progress bar
 * @param {requestUrl: endpoint where S3 presigned url can be requested} param0 
 * @returns S3 uploader button
 */
const CustomS3Uploader = ({requestUrl}) => {

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
  // fetches presigned url and uploads to that url
  const getUrlAndUpload = () => {
    const url = requestUrl;
    console.log("starting url request");
    axios.post(url).then((res) => {
			console.log("Signed URL acquired: ", res.data.url);
      console.log("AWS fields:", res.data.fields);
      // let presignedUrl = res.data.uploadURL;
      // uploadToUrl(presignedUrl);
      uploadToS3Url(res.data)
		})
		.catch((err) => {
      console.log("request failed: ", err);
		});
  }

  // uploads file to presigned url
  const uploadToS3Url = (signed_data) => {
    const options = {
      onUploadProgress: (ProgressEvent) => {
        const {loaded, total} = ProgressEvent;
        let percent = Math.floor((loaded*100)/total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
      }
    }
    console.log("s3 uploading..", signed_data.url);
    let payload = new FormData();
    for(var key in signed_data.fields){

      console.log(key,":",signed_data.fields[key]);
      payload.append(key, signed_data.fields[key])
    }
    // payload.append(signed_data.fields)
    payload.append("file", file);
    console.log(payload);

    // perform put operation on presigned url
    axios.put(signed_data.url, payload, options)
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
      getUrlAndUpload();
    } catch(err) {
      console.log("error in handle upload ", err);
    }
  }

  return ( 
    <div>
      <input onChange={OnFileChange} type="file" id="myfile" style={{display: 'none'}}/>
      <h4>{file? file.name : "Choose a file..."}</h4>
      {
        file?
        <>
          {/* clears selected file */}
          <Button onClick={()=>setFile(undefined)}><Icon name='close' />Clear</Button>
          {/* uploads to bucket  */}
          <Button color="orange" onClick={handleUpload}><Icon name='upload' />Upload</Button>
        </>
        :
        <Button onClick={() => {document.getElementById('myfile').click()}}><Icon name='hand pointer' />Choose</Button>
      }
    </div>
  );
}
 
export {CustomS3Uploader};