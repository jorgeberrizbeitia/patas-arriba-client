import { useContext, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import service from '@service/config';
import { AuthContext } from '@context/auth.context';
import Alert from '@mui/material/Alert';

import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useNavigate } from 'react-router-dom';
import Message from './Message';



function EventMessageBoard({eventOrCarGroup, messages, setMessages, type}) {

  const navigate = useNavigate()
  const listRef = useRef(null);

  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async () => {
    
    if (text.trim() === '') return;
    
    setIsSending(true)

    try {
      await service.post(`/message/${type}/${eventOrCarGroup._id}`, {text})
      const response = await service.get(`/${type}/${eventOrCarGroup._id}`)
      setMessages(response.data.messages)
      //todo why is it not working with getEventDetails?
      setText('')
      setIsSending(false)
    } catch (error) {
      navigate("/server-error")
      //todo create an alert if there was an error
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the list after messages update
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const refreshMessages = async () => {

    setIsSending(true)
    try {
      
      const response = await service.get(`/message/${type}/${eventOrCarGroup._id}`)
      setMessages(response.data)
      setIsSending(false)

    } catch (error) {
      navigate("/server-error")
    }

  }

  const handleDelete = async (messageId) => {
    try {
      await service.patch(`/message/${messageId}/delete`)
      refreshMessages()
    } catch (error) {
      navigate("/server-error")
    }
  }

  return (
    <>

      <hr />

      <Typography variant="h5" gutterBottom sx={{width: "100%"}}>
        Mensajes del {type === "event" ? "evento" : "grupo de coche"}
      </Typography>

      <Alert severity='info' sx={{textAlign: "start"}}>Si tienes alguna duda, envía un mensaje y {type === "event" ? "alguno de los organizadores o participantes" : "el dueño del coche u otro pasajero"} te responderá. Recuerda refrescar o volver luego a la página para ver las respuestas.</Alert>

      <List ref={listRef} sx={{ height: 300, overflowY: 'auto', overflowX: "hidden", bgcolor: 'primary.lighterSaturation', borderRadius: 1, width: "100%"}}>
        <Box>
          {messages.length === 0 && <Typography variant="body1" color="initial" sx={{pt: 1}}>No hay mensajes</Typography>}

          {messages.map((message, index) => {
            return <Message 
              key={index} 
              message={message}
              type={type}
              handleDelete={handleDelete}
              eventOrCarGroup={eventOrCarGroup}
              //todo check for a simpler way to add who the car owner is instead of passing eventOrCarGroup to each message
            />}
          )}
        </Box>
      </List>

      <Box sx={{bgcolor: 'primary.lighterSaturation', width: "100%"}}>
        <IconButton onClick={refreshMessages} disabled={isSending} sx={{width: 200, height: 50, p: 0, borderRadius: 2}}>
          <RefreshIcon/>
          <Typography variant="caption">refrescar mensajes</Typography>
        </IconButton>
      </Box>

      <Box display="flex" alignItems="center" sx={{width: "100%", pt: 1}}>
        <TextField
          label="Escribe un mensaje"
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          inputProps={{ maxLength: 300 }}
          multiline
          rows={1}
          margin="normal"
          sx={{width: "80%", m: 0}}
        />

        <Button 
          variant="contained" 
          disabled={isSending} 
          onClick={handleSubmit} 
          size='medium'
          sx={{width: "80px", height: "55px", ml: 1}}
        >Enviar</Button>
      </Box>

    </>
  );
}


export default EventMessageBoard