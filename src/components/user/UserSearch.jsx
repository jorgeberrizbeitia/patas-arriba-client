import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import React from 'react'

function UserSearch({searchQuery, setSearchQuery}) {
  return (
    <>

      <TextField
        fullWidth
        variant="outlined"
        placeholder='busca un usuario aqui...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          sx: {
            height: '40px', // Custom height
            '& .MuiOutlinedInput-input': {
              padding: '12px', // Adjust padding to center the text
            },
          },
        }}
      />

      {/* <Button size="small" variant="contained" color="error" style={{width: "5px"}}>X</Button> */}
    
    </>
  )
}

export default UserSearch