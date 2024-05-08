import CardHeader from "@mui/material/CardHeader"
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton'
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import UserIcon from "../user/UserIcon";
import TextField from '@mui/material/TextField'
import { useState } from "react";
import service from "@service/config";

function AttendeeAttendanceCard({attendee, setAttendees}) {

  const navigate = useNavigate()
  const { user } = attendee
  const { _id, username, fullName, role } = user

  const [attendance, setAttendance] = useState({value: attendee.attendance || "", touched: false})

  const handleAttendance = (e) => setAttendance({value: e.target.value || "", touched: true})

  const handleUpdateAttendance = async () => {
    setAttendance({...attendance, touched: false}) //* this will block the button after pressing.

    try {
      
      await service.patch(`/attendee/${attendee._id}/attendance`, {attendance: attendance.value})
      setAttendees((attendees) => {
        const clone = JSON.parse(JSON.stringify(attendees))
        const attendeeObj = clone.find((eachAttendee) => eachAttendee._id == attendee._id)
        attendeeObj.attendance = attendance.value
        return clone
      }) 
      //* done like this for Alert functionality when attendees with pending task is updated
      //* also to allow single call to the DB when moving between attendee management types

    } catch (error) {
      navigate("/server-error")
    }
  }

  const getColorForValue = (value) => {
    switch (value) {
      case 'pending':
        return 'gray.main';
      case 'show':
        return 'success.main'
      case 'no-show':
        return 'error.main';
      case 'excused':
        return 'warning.main';
      default:
        return ''; // default color
    }
  };
  
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
        select
        fullWidth
        sx={{
          '& .MuiSelect-select.MuiSelect-select': {
            color: getColorForValue(attendance.value),
          },
          ml: 1,
          textAlign: "start"
        }}
        InputLabelProps={{ shrink: true }}
        label="Asistencia"
        value={attendance.value}
        onChange={handleAttendance}
      >
        <MenuItem value="pending" sx={{ color: 'gray.main' }}>Pendiente</MenuItem>
        <MenuItem value="show" sx={{ color: 'success.main' }}>Si asistió</MenuItem>
        <MenuItem value="no-show" sx={{ color: 'error.main' }}>No asistió</MenuItem>
        <MenuItem value="excused" sx={{ color: 'warning.main' }}>Excusado</MenuItem>
      </TextField>
      <IconButton onClick={handleUpdateAttendance} disabled={!attendance.touched} color="success">
        <SaveIcon />
        <Typography variant="icon">guardar</Typography>
      </IconButton>
      
    </Box>
  )
}

export default AttendeeAttendanceCard