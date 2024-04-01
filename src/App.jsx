import { Route, Routes } from 'react-router-dom'
import './App.css'

import Home from '@pages/Home'
import Signup from '@pages/auth/Signup'
import Login from '@pages/auth/Login'
import ServerError from '@pages/error/ServerError'
import NotFound from '@pages/error/NotFound'
import EventDetails from './pages/event/EventDetails'

import Navbar from "@components/navigation/Navbar.jsx"
import IsPrivate from "@components/auth/IsPrivate.jsx"
import IsAnon from './components/auth/IsAnon'
import IsAdmin from './components/auth/IsAdmin'

import EventJoin from './pages/event/EventJoin'
import EventList from './pages/event/EventList'
import CarGroupDetails from './pages/car-group/CarGroupDetails'
import Profile from './pages/profile/Profile'
import OwnProfile from './pages/profile/OwnProfile'
import UserList from './pages/profile/UserList'
import EventMessages from './pages/message/EventMessages'
import CarGroupMessages from './pages/message/CarGroupMessages'
import EventCreate from './pages/event/EventCreate'


function App() {

  return (
    <>

      <Navbar />
      
      <Routes>

        <Route path="/" element={<Home />}/>

        <Route path="/signup" element={<IsAnon> <Signup /> </IsAnon>}/>
        <Route path="/login" element={<IsAnon> <Login /> </IsAnon>}/>

        <Route path="/event" element={ <IsPrivate> <EventList /> </IsPrivate>}/>
        <Route path="/event/create" element={ <IsAdmin> <EventCreate /> </IsAdmin>}/>
        <Route path="/event/:eventId" element={ <IsPrivate> <EventDetails /> </IsPrivate> }/>
        <Route path="/event/:eventId/join" element={  <IsPrivate> <EventJoin /> </IsPrivate>  }/>
        <Route path="/car-group/:carGroupId" element={<IsPrivate> <CarGroupDetails /> </IsPrivate>}/>
        <Route path="/profile" element={ <IsAdmin> <UserList /> </IsAdmin>}/>
        <Route path="/profile/own" element={ <IsPrivate> <OwnProfile /> </IsPrivate> }/>
        <Route path="/profile/:userId" element={ <IsPrivate> <Profile /> </IsPrivate> }/>
        <Route path="/message/:eventId/event" element={ <IsPrivate> <EventMessages /> </IsPrivate> }/>
        <Route path="/message/:carGroupId/car-group" element={ <IsPrivate> <CarGroupMessages /> </IsPrivate> }/>
        
        <Route path="/server-error" element={<ServerError />}/>
        <Route path="*" element={<NotFound />}/>


      </Routes>

    </>
  )
}

export default App
