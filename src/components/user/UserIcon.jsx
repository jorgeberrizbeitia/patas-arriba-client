import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

function UserIcon({size, user, caption}) {
  //todo change to receive only color and iconColor instead of the whole user

  const { icon, iconColor } = user

  let boxSize;
  let imgSize;
  if (size === "small") {
    boxSize = 30
    imgSize = 15
  } else if (size === "medium") {
    boxSize = 100
    imgSize = 50
  } else {
    boxSize = 200
    imgSize = 100
  }

  return (<Box>
    <Box 
      bgcolor={iconColor} 
      borderRadius="50%" 
      width={boxSize} 
      height={boxSize} 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
    >
      <img 
        src={icon} 
        alt={`icono-de-perfil`} 
        width={imgSize} 
        height={imgSize} 
      />
    </Box>
    {caption && <Typography sx={{fontSize: 8}} variant="caption" color="initial">{user.username}</Typography>}
  </Box>
  )
}

export default UserIcon