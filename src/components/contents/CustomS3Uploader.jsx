import axios from 'axios';
import React, {useState} from 'react';
import { Button, Icon, Message, Progress } from 'semantic-ui-react';

/**
 * CustomS3Uploader: Customised S3 uploader button that can request an API endpoint to get presigned url and then upload selected file 
 * to that url. Comes in with file browser and upload progress bar
 * @param {requestUrl: endpoint where S3 presigned url can be requested} param0 
 * @returns S3 uploader button
 */
const CustomS3Uploader = ({requestUrl}) => {

  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);

  const [message, sestMessage] = useState(undefined);
  
  const OnFileChange = (event) => {
    const content = event.target.files[0];
    let type = content.type.split("/")[0];
    console.log("content: ", content);
    if (type === "image" || type === "video") {
      setFile(content);
    } else {
      console.log("error: not an image");
      sestMessage({
        type: 'negative',
        title: 'Not valid file',
        text: 'Please upload an image or video',
      });
    }
  }
  // fetches presigned url and uploads to that url
  const getUrlAndUpload = () => {
    const url = requestUrl;
    console.log("starting url request");
    let data ={
      "file_name": file.name
    }
    axios.post(url, data).then((res) => {
			console.log("Signed URL acquired: ", res.data.url);
      console.log("AWS fields:", res.data.fields);
      // let presignedUrl = res.data.uploadURL;
      // uploadToUrl(presignedUrl);
      uploadToS3Url(res.data)
		})
		.catch((err) => {
      console.log("request failed: ", err);
      sestMessage({
        type: 'negative',
        title: 'Upload Request Failed',
        text: 'Upload couln\'t be requested, Please try again later.',
      });
		});
  }

  // uploads file to presigned url
  const uploadToS3Url = (signedData) => {
    
    setLoading(true);
    setLoadPercent(0);
    // prepare options for handling progress event
    const options = {
      onUploadProgress: (ProgressEvent) => {
        const {loaded, total} = ProgressEvent;
        let percent = Math.floor((loaded*100)/total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setLoadPercent(percent);
      }
    }
    console.log("s3 uploading..", signedData.url);

    let payload = new FormData();
    let signedFields =signedData.fields;
    console.log("signed_fields:", signedFields);
    for(var key in signedFields){

      console.log(key,":", signedFields[key]);
      payload.append(key, signedFields[key])
    }
    // payload.append(signedFields)
    payload.append("file", file);
    console.log(payload);

    // perform put operation on presigned url
    axios.put(signedData.url, payload)
    .then((res) => {
			console.log("S3 Upload successful: ", res.data);
      sestMessage({
        type: 'positive',
        title: 'Upload Successful!',
        text: 'Your file has be successfully uploaded!',
      });
      setLoading(false);
		})
		.catch((err) => {
      console.log("S3 upload failed: ", err.data);
      setLoading(false);
      sestMessage({
        type: 'negative',
        title: 'Upload process failed',
        text: 'Upload process has failed, please try again later.',
      });
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
    <div style={styles.root}>
      <center>
      <input onChange={OnFileChange} type="file" id="myfile" style={{display: 'none'}}/>
      <h4>{file? file.name : "Choose a file..."}</h4>
      {
        loading &&
          <Progress inverted percent={loadPercent}/>
      }
      {
        message &&
        <Message positive={message.type === 'positive'} negative={message.type === 'negative'}>
          <Message.Header>{message.title}</Message.Header>
          <p>{message.text}</p>
        </Message>
      }
      <div onClick={()=>sestMessage(undefined)}>
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
      </center>
    </div>
  );
}

const styles = {
  root: {
    padding: '20px',
    // backgroundColor: 'white',
    minWidth: '500px'
  }
}

export {CustomS3Uploader};