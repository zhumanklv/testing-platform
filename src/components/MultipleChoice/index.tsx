import React from 'react'
import { Box, Checkbox, FormControlLabel } from '@mui/material'
import { Roboto_Flex } from 'next/font/google'

const MultipleChoice = () => {
  return (
    <Box sx={{ maxWidth: 300, marginTop: '40px' }}>
      What is equal to 1?
      <Box sx={{ maxWidth: 300, display: 'flex', flexDirection: 'column' }}>
        <FormControlLabel control={<Checkbox />} label="sin^2(α) + cos^2(α)" />
        <FormControlLabel control={<Checkbox />} label="8+8*2+0-4+13-20-11-1" />
        <FormControlLabel control={<Checkbox />} label="sin^2(α) - cos^2(α)" />
        <FormControlLabel control={<Checkbox />} label="0*23" />
      </Box>
    </Box>
  )
}

export default MultipleChoice
