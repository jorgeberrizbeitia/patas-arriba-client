import CardHeader from "@mui/material/CardHeader"
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton'
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'
import UserIcon from "../user/UserIcon";
import TextField from '@mui/material/TextField'
import { useState } from "react";
import service from "@service/config";

function AttendeeTaskCard({attendee, setAttendees}) {

  const { user } = attendee
  const { _id, username, fullName, role } = user
  const navigate = useNavigate()

  const [task, setTask] = useState({value: attendee.task || "", touched: false})

  const handleTask = (e) => setTask({value: e.target.value || "", touched: true})

  const handleUpdateTask = async () => {
    setTask({...task, touched: false}) //* this will block the button after pressing.
    
    try {  
      await service.patch(`/attendee/${attendee._id}/task`, {task: task.value})
      setAttendees((attendees) => {
        const clone = JSON.parse(JSON.stringify(attendees))
        const attendeeObj = clone.find((eachAttendee) => eachAttendee._id == attendee._id)
        attendeeObj.task = task.value
        return clone
      }) 
      //* done like this for Alert functionality when attendees with pending task is updated
      //* also to allow single call to the DB when moving between attendee management types

    } catch (error) {
      navigate("/server-error")
    }
  }
  
  return (
    <Box 
      bgcolor="gray.transparent"
      width="100%" 
      height="70px" 
      display="flex" 
      alignItems="center"
      padding={1} 
      margin={0.5}
      borderRadius={1}
     >
     <Box width="75px" overflow="hidden" display="flex">
      <UserIcon user={user} size="small" caption/>
     </Box>
      <TextField
        fullWidth
        sx={{ml: 1}}
        InputLabelProps={{ shrink: true }}
        label="Tarea"
        value={task.value}
        onChange={handleTask}
      />
      <IconButton onClick={handleUpdateTask} disabled={!task.touched} color="success">
        <SaveIcon />
        <Typography variant="icon">guardar</Typography>
      </IconButton>
      
    </Box>
  )
}

export default AttendeeTaskCard