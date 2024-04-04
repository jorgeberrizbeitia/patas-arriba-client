import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

function UserIcon({size, user, caption}) {
  //todo change to receive only color and iconColor instead of the whole user

  const { icon, iconColor } = user

  return (<Box>
    <Box 
      bgcolor={iconColor} 
      borderRadius="50%" 
      width={size === "small" ? 30 : (size === "medium" ? 100 : 200)} 
      height={size === "small" ? 30 : (size === "medium" ? 100 : 200)} 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
    >
      <img 
        src={icon} 
        alt={`icono-de-perfil`} 
        width={size === "small" ? 15 : (size === "medium" ? 50 : 100)} 
        height={size === "small" ? 15 : (size === "medium" ? 50 : 100)} 
      />
    </Box>
    {caption && <Typography sx={{fontSize: 8}} variant="caption" color="initial">{user.username}</Typography>}
  </Box>
  )
}

export default UserIcon