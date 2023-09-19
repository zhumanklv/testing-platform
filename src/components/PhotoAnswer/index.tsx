import {useState} from 'react';
import { FormControl, Button, Box, styled} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const HiddenInput = styled('input')({
  display: 'none'
})
const PhotoAnswer = ({handleFile}: {handleFile: any}) => {
  const [val, setVal] = useState('');


  return (
    <FormControl>
      <Box>What is React? Please, upload a photo</Box>
      {val.split('\\')[2]}
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload file
        <HiddenInput type="file" onChange={(e) => { setVal(e.target.value); handleFile(e.target.files?.[0])}} accept="image/*" />
      </Button>
    </FormControl>
  )
}

export default PhotoAnswer
