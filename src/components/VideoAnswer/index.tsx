import React, { useState, useRef, useEffect } from 'react'
import {Box, Button} from '@mui/material';


const mimeType = 'video/webm'
const VideoAnswer = () => {

	const mediaRecorder = useRef<MediaRecorder | null>(null);

	const liveVideoFeed = useRef<{srcObject: MediaStream} | null>(null);

	const [recordingStatus, setRecordingStatus] = useState("inactive");

	const [recordedVideo, setRecordedVideo] = useState<string>('');

	const [videoChunks, setVideoChunks] = useState<any[]>([]);


	const startRecording = async () => {
    setRecordingStatus('recording');
    const videoConstraints = {
      audio: false,
      video: true,
    };
    const audioConstraints = { audio: true };

    // create audio and video streams separately
    const audioStream = await navigator.mediaDevices.getUserMedia(
      audioConstraints
    );
    const videoStream = await navigator.mediaDevices.getUserMedia(
      videoConstraints
    );

    //combine both audio and video streams

    const combinedStream = new MediaStream([
      ...videoStream.getVideoTracks(),
      ...audioStream.getAudioTracks(),
    ]);

    //set videostream to live feed player
    if(!liveVideoFeed.current) {
      liveVideoFeed.current = {...liveVideoFeed, srcObject: videoStream};
    } else {
      liveVideoFeed.current.srcObject = videoStream;
    }
    

      const media = new MediaRecorder(combinedStream, { mimeType });

		mediaRecorder.current = media;

		mediaRecorder.current.start();

		let localVideoChunks: any[] = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localVideoChunks.push(event.data);
		};

		setVideoChunks(localVideoChunks);
    
	};

	const stopRecording = () => {
		setRecordingStatus("inactive");
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();

		mediaRecorder.current!.onstop = () => {
			const videoBlob = new Blob(videoChunks, { type: mimeType });
			const videoUrl = URL.createObjectURL(videoBlob);

			setRecordedVideo(videoUrl);

			setVideoChunks([]);
		};
    }
	};

  return (
    <div>
      <h2>Please, record a video response for why you want to join our company?</h2>
      <Box sx={{width: '100%', height: 400}}>
          {recordingStatus === 'inactive' ? 
            <Button 
                onClick={startRecording} 
                style={{backgroundColor: '#1976d2', marginTop: '10px'}} 
                variant="contained">
              Record
            </Button> 
            : null}
        {recordingStatus === 'recording' ? <Button onClick={stopRecording} style={{backgroundColor: '#1976d2', marginTop: '10px'}} variant="contained">Stop Recording</Button>: null}
        <Box sx={{width: '100%', marginTop: '10px', }}>
            {recordingStatus === 'recording' && !recordedVideo ? (
              <video ref={liveVideoFeed} autoPlay style={{border: '1px solid black', borderRadius: '10px'}}></video>
            ) : null}
            {recordedVideo ? (
              <div className="recorded-player">
                <video className="recorded" src={recordedVideo} controls style={{border: '1px solid black', borderRadius: '10px'}}></video>
              </div>
            ) : null}
			</Box>
      </Box>
    </div>
  )
}

export default VideoAnswer
