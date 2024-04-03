import Box from '@mui/material/Box';

function UserIcon({size, user}) {

  const { icon, iconColor } = user

  return (
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
  )
}

export default UserIcon