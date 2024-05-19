import { Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from "@components/navigation/Navbar.jsx"
import OnlyPrivate from "@components/auth/OnlyPrivate.jsx"
import OnlyAnon from './components/auth/OnlyAnon'
import OnlyOrganizerOrAdmin from './components/auth/OnlyOrganizerOrAdmin'

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
          {/* <Route path="/about" element={<About />}/> */}

          {/* //* anon routes */}
          <Route path="/signup" element={<OnlyAnon> <Signup /> </OnlyAnon>}/>
          <Route path="/login" element={<OnlyAnon> <Login /> </OnlyAnon>}/>

          {/* //* admin routes */}
          <Route path="/event/create" element={ <OnlyOrganizerOrAdmin> <EventCreate /> </OnlyOrganizerOrAdmin>}/>
          <Route path="/event/:eventId/edit" element={ <OnlyOrganizerOrAdmin> <EventEdit /> </OnlyOrganizerOrAdmin> }/>
          <Route path="/event/:eventId/manage" element={ <OnlyOrganizerOrAdmin> <EventManage /> </OnlyOrganizerOrAdmin>}/>
          <Route path="/user" element={ <OnlyOrganizerOrAdmin> <UserList /> </OnlyOrganizerOrAdmin>}/>

          {/* //* private routes */}
          <Route path="/event" element={ <OnlyPrivate> <EventList /> </OnlyPrivate>}/>
          <Route path="/event/:eventId" element={ <OnlyPrivate> <EventDetails /> </OnlyPrivate> }/>
          <Route path="/event/:eventId/add-car-group" element={  <OnlyPrivate> <CarGroupCreate /> </OnlyPrivate>  }/>
          <Route path="/event/:eventId/search-car-group" element={  <OnlyPrivate> <CarGroupSearch /> </OnlyPrivate>  }/>
          <Route path="/car-group/:carGroupId" element={<OnlyPrivate> <CarGroupDetails /> </OnlyPrivate>}/>
          <Route path="/car-group/:carGroupId/edit" element={<OnlyPrivate> <CarGroupEdit /> </OnlyPrivate>}/>
          <Route path="/user/own" element={ <OnlyPrivate> <OwnUserDetails /> </OnlyPrivate> }/>
          <Route path="/user/:userId" element={ <OnlyPrivate> <UserDetails /> </OnlyPrivate> }/>
          
          {/* //* error routes */}
          <Route path="/server-error" element={<ServerError />}/>
          <Route path="*" element={<NotFound />}/>

        </Routes>

      </Container>

    </>
  )
}

export default App
