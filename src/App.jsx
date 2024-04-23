import { Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from "@components/navigation/Navbar.jsx"
import IsPrivate from "@components/auth/IsPrivate.jsx"
import IsAnon from './components/auth/IsAnon'
import IsAdmin from './components/auth/IsAdmin'

import Home from '@pages/Home'
import About from '@pages/About'
import Signup from '@pages/auth/Signup'
import Login from '@pages/auth/Login'
import NotFound from '@pages/error/NotFound'
import ServerError from '@pages/error/ServerError'
import EventList from './pages/event/EventList'
import EventDetails from './pages/event/EventDetails'
import EventCreate from './pages/event/EventCreate'
import EventEdit from './pages/event/EventEdit'
import CarGroupCreate from '@pages/car-group/CarGroupCreate'
import CarGroupSearch from '@pages/car-group/CarGroupSearch'
import CarGroupDetails from './pages/car-group/CarGroupDetails'
import CarGroupEdit from '@pages/car-group/CarGroupEdit'
import UserList from './pages/user/UserList'
import UserDetails from './pages/user/UserDetails'
import OwnUserDetails from './pages/user/OwnUserDetails'

import Container from '@mui/material/Container'
import EventManage from '@pages/event/EventManage'


function App() {

  return (
    <>

      <Navbar />
      
      <Container maxWidth="sm" sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>

        <Routes>

          {/* //* public routes */}
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>

          {/* //* anon routes */}
          <Route path="/signup" element={<IsAnon> <Signup /> </IsAnon>}/>
          <Route path="/login" element={<IsAnon> <Login /> </IsAnon>}/>

          {/* //* admin routes */}
          <Route path="/event/create" element={ <IsAdmin> <EventCreate /> </IsAdmin>}/>
          <Route path="/event/:eventId/edit" element={ <IsAdmin> <EventEdit /> </IsAdmin> }/>
          <Route path="/event/:eventId/manage" element={ <IsAdmin> <EventManage /> </IsAdmin>}/>
          <Route path="/user" element={ <IsAdmin> <UserList /> </IsAdmin>}/>

          {/* //* private routes */}
          <Route path="/event" element={ <IsPrivate> <EventList /> </IsPrivate>}/>
          <Route path="/event/:eventId" element={ <IsPrivate> <EventDetails /> </IsPrivate> }/>
          <Route path="/event/:eventId/add-car-group" element={  <IsPrivate> <CarGroupCreate /> </IsPrivate>  }/>
          <Route path="/event/:eventId/search-car-group" element={  <IsPrivate> <CarGroupSearch /> </IsPrivate>  }/>
          <Route path="/car-group/:carGroupId" element={<IsPrivate> <CarGroupDetails /> </IsPrivate>}/>
          <Route path="/car-group/:carGroupId/edit" element={<IsPrivate> <CarGroupEdit /> </IsPrivate>}/>
          <Route path="/user/own" element={ <IsPrivate> <OwnUserDetails /> </IsPrivate> }/>
          <Route path="/user/:userId" element={ <IsPrivate> <UserDetails /> </IsPrivate> }/>
          
          {/* //* error routes */}
          <Route path="/server-error" element={<ServerError />}/>
          <Route path="*" element={<NotFound />}/>

        </Routes>

      </Container>

    </>
  )
}

export default App
