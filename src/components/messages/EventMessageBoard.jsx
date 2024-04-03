import { useContext, useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import service from '@service/config';
import { AuthContext } from '@context/auth.context';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

function EventMessageBoard({eventOrCarGroup, type}) {

  const listRef = useRef(null);

  const { loggedUserId } = useContext(AuthContext)
  const [messages, setMessages] = useState(eventOrCarGroup.messages);
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async () => {
    
    if (text.trim() === '') return;
    
    setIsSending(true)

    try {
      await service.post(`/message/${eventOrCarGroup._id}/${type}`, {text})
      const response = await service.get(`/${type}/${eventOrCarGroup._id}`)
      setMessages(response.data.messages)
      //todo why is it not working with getEventDetails?
      setText('')
      setIsSending(false)
    } catch (error) {
      console.log(error)
      //todo create an alert if there was an error
      setIsSending(false)
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the list after messages update
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const refreshMessages = async () => {
    //todo function just to refresh but getting the whole event details, is this ok?
    setIsSending(true)
    try {
      
      const response = await service.get(`/${type}/${eventOrCarGroup._id}`)
      setMessages(response.data.messages)
      setIsSending(false)

    } catch (error) {
      console.log(error)
      setIsSending(false)
    }

  }

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Mensajes del {type === "event" ? "Evento" : "Coche"}
      </Typography>
        <List ref={listRef} sx={{ height: 300, overflowY: 'auto', overflowX: "hidden", bgcolor: 'primary.lighterSaturation', borderRadius: 1 }}>
          {messages.map(({text, sender, createdAt}, index) => {

            const isSender = sender._id == loggedUserId
            const isAdmin = sender.role === "admin"
            const carOwner = type === "car-group" && sender._id === eventOrCarGroup.owner._id

            return (
            <Box key={index}>
              <ListItem>
                {!isSender && 
                  <ListItemAvatar>
                    <Avatar src={sender.profilePic} alt="foto-perfil" />
                  </ListItemAvatar>
                }
                <Box sx={{width: "100%", textAlign: isSender ? "right" : "left"}}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color={isSender ? "#2ECC71" : "#3498DB"}>
                        <span>{isSender ? "Tú" : sender.username}</span>
                        {isAdmin && <span style={{color: "#F39C12"}}>, admin</span>}
                        {carOwner && <span style={{color: "#F39C12"}}>, dueño de coche</span>}
                      </Typography>
                    }
                    sx={{ wordBreak: 'break-word' }}
                    secondary={text}/>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </Box>
          )})}
        </List>

      <IconButton onClick={refreshMessages} disabled={isSending}>
        <RefreshIcon />
      </IconButton>

      <TextField
        label="Escribe un mensaje"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        variant="outlined"
        multiline
        rows={3}
        margin="normal"
      />
      
      {/* //todo limit to only 140 characters */}

      <Button variant="contained" disabled={isSending} onClick={handleSubmit}>
        ENVIAR
      </Button>

      <Alert severity='info'>Nota: Este chat no es en tiempo real, hay que recargar para ver nuevos mensajes</Alert>

    </Box>
  );
}


export default EventMessageBoard