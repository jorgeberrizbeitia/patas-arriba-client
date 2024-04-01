import { useContext, useEffect, useState } from "react"
import Loading from "@components/ui/Loading"
import service from "@service/config"

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AuthContext } from "../../context/auth.context";

function OwnProfile() {

  const { ownProfile } = useContext(AuthContext)

  const { profilePic, firstName, lastName, phoneCode, phoneNumber } = ownProfile

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* Profile Picture */}
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center">
            <Avatar src={profilePic} alt={`${firstName} ${lastName}`} sx={{ width: 200, height: 200 }} />
          </Box>
        </Grid>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Phone Number:
          </Typography>
          <Typography variant="body1" gutterBottom>
            +{phoneCode} {phoneNumber}
          </Typography>
          {/* Add more profile information here if needed */}
        </Grid>
      </Grid>
    </Box>
  )
}

export default OwnProfile