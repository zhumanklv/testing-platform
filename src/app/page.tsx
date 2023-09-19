'use client'
import { useState } from 'react';
import axios from 'axios';
import MultipleChoice from '@/components/MultipleChoice'
import OneAnswer from '@/components/OneAnswer'
import InputAnswer from '@/components/InputAnswer'
import PhotoAnswer from '@/components/PhotoAnswer'
import VideoAnswer from '@/components/VideoAnswer'
import { Container, Box } from '@mui/material'
import Button from '@mui/material/Button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const URL = `https://freeimage.host/api/1/upload/?key=${process.env.NEXT_PUBLIC_API_KEY}`

enum STEPS {
  FIRST, 
  SECOND
}

const LAST_STEP = STEPS.SECOND;

function getBase64(file: File | undefined) {
  if (!file) return '';
  var reader = new FileReader();
  reader.readAsDataURL(file);

  return reader.result;
}

export default function Home() {
  const [currentStep, setStep] = useState<STEPS>(STEPS.FIRST);
  const [photo, setPhoto] = useState<File | undefined>(undefined);

  const handlePreviousClick = () => {
    if(currentStep === 0) {
      setStep(LAST_STEP);
      return;
    }
    setStep(currentStep - 1);
  }

  const handleNextClick = () => {
    setStep((currentStep + 1)%(LAST_STEP + 1));
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e);
    await axios.post(URL, {source: getBase64(photo)}).then((res) => {console.log(res)});
  }
  return (
    <Container sx={{width: 500}}>
    <form onSubmit={handleSubmit}>
      <Container
        sx={{ width: 500, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '40px',
          padding: '10px 20px 10px 20px',
          border: '1px solid grey',
          borderRadius: '10px',
          marginTop: '10px',
          height: 600,
          }}
      >
        {currentStep === STEPS.FIRST && (
            <>
              <MultipleChoice />
              <OneAnswer />
              <InputAnswer />
            </>
          )
        }
        {currentStep === STEPS.SECOND && (
            <>
              <PhotoAnswer handleFile={setPhoto}/>
              <VideoAnswer />
            </>
          )
        }
      </Container>
      <Box sx={{width: '100%', display: 'flex', margin: '0 auto', marginTop: '10px', }}>
        <Button startIcon={<ArrowBackIosIcon />} style={{backgroundColor: '#1976d2', marginRight: '10px', width: '120px'}} variant="contained" onClick={handlePreviousClick}>Previous</Button>
        <Button endIcon={<ArrowForwardIosIcon />} style={{backgroundColor: '#1976d2', width: '120px', display: 'flex', justifyContent: 'flex-end' }} variant="contained" onClick={handleNextClick}>Next</Button>
      </Box>
     
     <Button style={{backgroundColor: '#1976d2', marginTop: '10px'}} variant="contained" onClick={handleSubmit} type="submit">Submit</Button>
     </form>
     </Container>
  )
}
