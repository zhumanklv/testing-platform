import React, { FC } from 'react'
import { FormControl, InputLabel, Input } from '@mui/material'
const InputAnswer: FC = () => {
  return (
    <FormControl>
      <InputLabel htmlFor="text-question">What is React Fiber?</InputLabel>
      <Input id="text-question" />
    </FormControl>
  )
}

export default InputAnswer
