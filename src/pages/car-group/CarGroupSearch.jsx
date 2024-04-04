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

      setCarGroups(response.data)
      setTimeout(() => setIsLoading(false), 700)

    } catch (error) {
      console.log(error)
    }

  }

  const handleJoinCarGroup = async () => {

    try {
      
      await service.patch(`car-group/${selectedCarGroupId}/join`)
      navigate(`/event/${eventId}`)

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }
  
  return (
    <Container>

      <GoBack to={`/event/${eventId}`} />
      
      {carGroups.length === 0 ? <>
        <Alert severity="warning">No hay coches disponibles por los momentos, puede unirse al evento y buscar coches luego</Alert>
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
          >{selectedCarGroupId ? "Unirse al grupo de coche!" : "Seleccione un grupo de coche"}</Button>
      </>}
      

    </Container>
  )
}

export default CarGroupSearch
