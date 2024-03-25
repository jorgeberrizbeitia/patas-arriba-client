import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from '@pages/Home'
import Signup from '@pages/auth/Signup'
import Login from '@pages/auth/Login'
import ServerError from '@pages/error/ServerError'
import NotFound from '@pages/error/NotFound'
import Navbar from "@components/navigation/Navbar.jsx"

function App() {

  return (
    <>

      <Navbar />
      
      <Routes>

        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>


        <Route path="/server-error" element={<ServerError />}/>
        <Route path="*" element={<NotFound />}/>


      </Routes>

    </>
  )
}

export default App
