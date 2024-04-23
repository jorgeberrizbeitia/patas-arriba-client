import { useEffect, useState } from "react"

import service from "@service/config.js"
import { Link, useNavigate, useParams } from "react-router-dom"

import Loading from "@components/ui/Loading"

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CarGroupCard from "../../components/car-group/CarGroupCard";
import GoBack from "@components/navigation/GoBack";

function CarGroupSearch () {

  const navigate = useNavigate()
  const { eventId } = useParams()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ carGroups, setCarGroups ] = useState(null)
  const [ selectedCarGroupId, setSelectedCarGroupId ] = useState(null)

  useEffect(() => {
    getCarGroups()
  }, [])

  const getCarGroups = async () => {

    try {

      const response = await service.get(`/car-group/list/${eventId}`)

      setCarGroups(response.data.filter((car) => (car.roomAvailable - car.passengers.length) > 0))
      //* filter to only display available cars

      setIsLoading(false)

    } catch (error) {
      navigate("/server-error")
    }

  }

  const handleJoinCarGroup = async () => {

    try {
      
      await service.patch(`car-group/${selectedCarGroupId}/join`)
      navigate(`/car-group/${selectedCarGroupId}`)

    } catch (error) {
      navigate("/server-error")
    }

  }

  if (isLoading) {
    return <Loading />
  }
  
  return (
    <>

      <GoBack to={`/event/${eventId}`} />
      
      {carGroups.length === 0 ? <>
        <Alert severity="warning">No hay coches disponibles por los momentos, intenta volver luego</Alert>
        <Button 
            sx={{margin: "30px"}}
            variant="contained"
            onClick={() => navigate(`/event/${eventId}`)}
          >Volver</Button>
      </> : <>
        <Typography variant="h5" gutterBottom>Coches disponibles</Typography>
        {carGroups.map((eachCarGroup) => 
          <CarGroupCard 
            key={eachCarGroup._id} 
            eachCarGroup={eachCarGroup} 
            setSelectedCarGroupId={setSelectedCarGroupId} 
            selectedCarGroupId={selectedCarGroupId}
          />
        )}
        <Button 
            sx={{margin: "30px"}}
            variant="contained"
            disabled={!selectedCarGroupId}
            onClick={handleJoinCarGroup}
          >{selectedCarGroupId ? "Unete al grupo de coche!" : "Selecciona un grupo de coche"}</Button>
      </>}
      

    </>
  )
}

export default CarGroupSearch
