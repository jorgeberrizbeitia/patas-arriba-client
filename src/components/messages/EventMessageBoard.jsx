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

import io from 'socket.io-client';

function EventMessageBoard({eventOrCarGroup, messages, setMessages, type}) {

  const { loggedUserId } = useContext(AuthContext)

  const navigate = useNavigate()
  const listRef = useRef(null);
  const anchorRef = useRef(null);

  // const [socket, setSocket] = useState(null);
  const socket = useRef(null); 
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false)

  // Handle visibility change
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      // Reconnect socket if not connected
      if (socket.current && !socket.current.connected) {
        socket.current.connect();
      }
      fetchMessages(); // Fetch messages when app comes back to the foreground
    }
  };

  const fetchMessages = async () => {
    setIsSending(true);
    try {
      const response = await service.get(`/message/${type}/${eventOrCarGroup._id}`);
      setMessages(response.data);
    } catch (error) {
      navigate("/server-error");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {

    //* connect to socket on componentDidMount
    socket.current = io(import.meta.env.VITE_SERVER_URL); //! pending sending token
    // setSocket(socketConnection);

    //* to join only the chat room for this event or car group
    socket.current.emit('joinRoom', {room: eventOrCarGroup._id, userID: loggedUserId});

    //* Listen for incoming created messages
    socket.current.on(`chat message`, (receivedMessage) => {
      setMessages((messages) => [...messages, receivedMessage]);
    });

    //* Listen for incoming delete messages
    socket.current.on(`message delete`, (deletedMessage) => {
      setMessages((messages) => {
        return messages.map((eachMessage) => {
          if (eachMessage._id === deletedMessage._id) {
            return {
              ...deletedMessage,
              isDeleted: true,
              text: "Mensaje Borrado"
            }
          } else {
            return eachMessage
          }
        })
      })
    });

    //* this will load new messages if user puts the PWA on te background and then comes back (this happens because the socket disconnects when on background)
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      //* disconnect to socket and remove the event listener on componentWillUnmount
      socketConnection.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }

  }, [])

  useEffect(() => {
    // Scroll to the bottom of the list after messages update
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    if (window.location.hash === '#bottom' && anchorRef.current) {
      anchorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async () => {
    
    if (text.trim() === '') return;
    
    setIsSending(true)

    try {

      const response = await service.post(`/message/${type}/${eventOrCarGroup._id}`, {text})

      socket.current.emit('chat message', response.data); //! testing sending through socket

      //todo why is it not working with getEventDetails?
      setText('')
    } catch (error) {
      navigate("/server-error")
      //todo create an alert if there was an error
    } finally {
      setIsSending(false)
    }
  };

  const handleDelete = async (message) => {
    try {
      await service.patch(`/message/${message._id}/delete`)
      socket.current.emit('message delete', message);
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

          {messages.map((message) => {
            return <Message 
              key={message._id} 
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
        <IconButton onClick={fetchMessages} disabled={isSending} sx={{width: 200, height: 50, p: 0, borderRadius: 2}}>
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

      <div ref={anchorRef} id="bottom"/>
    </>
  );
}


export default EventMessageBoard
