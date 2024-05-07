import { useContext, useState } from 'react';
import { AuthContext } from '@context/auth.context';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import UserIcon from '@components/user/UserIcon';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import formatDate from '@utils/formatDate';

function Message({message, type, handleDelete, eventOrCarGroup}) {

  const { _id, isDeleted, sender, text, createdAt } = message

  const { loggedUserId } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isSender = sender._id == loggedUserId
  const isAdmin = sender.role === "admin"
  const carOwner = type === "car-group" && sender._id === eventOrCarGroup.owner._id
  console.log(carOwner);
  

  return (
    <>
      <Box display="flex" textAlign={isSender ? "right" : "left"} padding={1} paddingRight={isDeleted ? 1 : 0}>

        <Box width="100%" display="flex" flexDirection="column">

          <Box width="100%" display="flex" alignItems="center" gap={1}>

            {!isSender && <UserIcon user={sender} size="small"/>}

            <Box width="100%" display="flex" flexDirection="column">
              <Typography>
                <Typography component="span" variant="caption" color={isSender ? "#2ECC71" : "#3498DB"}>
                  {isSender ? "Tú" : sender.username}
                </Typography>
                {isAdmin && <Typography variant="caption" style={{color: "#F39C12"}}> (admin)</Typography>}
                {carOwner && <Typography variant="caption" style={{color: "#F39C12"}}> (conductor)</Typography>}
              </Typography>
              <Typography variant="caption" color="textSecondary">{formatDate(createdAt, "chat")}</Typography>
            </Box>

          </Box>

          <Typography sx={{marginTop: 1}} variant='body2' color={isDeleted ? "error" : "text"}>{text}</Typography>

        </Box>

        {isSender && !isDeleted && (
          <>
            <IconButton onClick={handleMenuOpen} size='small' sx={{p: 0, borderRadius: 2}}>
              <MoreVertIcon />
            </IconButton>
             <Menu
              anchorEl={anchorEl}
               open={Boolean(anchorEl)}
               onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleDelete(_id)}>Delete</MenuItem>
            </Menu>
          </>
        )}

      </Box>
      <Divider />
    </>
  )
}

export default Message