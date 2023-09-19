'use client'
import React, { useState } from 'react'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material'

const OneAnswer: React.FC = () => {
  const [value, setValue] = useState('female')

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue((event.target as HTMLInputElement).value);
  // };

  return (
    <FormControl sx={{marginRight: 'auto'}}>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  )
}

export default OneAnswer
