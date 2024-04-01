import { useEffect, useState } from "react"

import service from "@service/config.js"
import { Link, useParams } from "react-router-dom"

import Loading from "@components/ui/Loading"

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CarGroupCard from "./CarGroupCard";

function CarGroupAvailableList({joinEvent}) {

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

      console.log(response)

      setCarGroups(response.data)
      setTimeout(() => setIsLoading(false), 700)

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }
  
  return (
    <Container>
      
      {carGroups.length === 0 ? <>
        <Alert severity="warning">No hay coches disponibles por los momentos, puede unirse al evento y buscar coches luego</Alert>
        <Button 
            sx={{margin: "30px"}}
            variant="contained"
          >Unirse al evento!</Button>
      </> : <>
        <Typography variant="h5">Coches Disponibles:</Typography>
        {carGroups.map((eachCarGroup) => <CarGroupCard 
            key={eachCarGroup._id} 
            eachCarGroup={eachCarGroup} 
            setSelectedCarGroupId={setSelectedCarGroupId} 
            selectedCarGroupId={selectedCarGroupId}/>
        )}
        <Alert severity="info">Si ningun coche te conviene, puedes unirte al evento sin elegir coche y buscar uno disponible luego</Alert>
        <Button 
            sx={{margin: "30px"}}
            variant="contained"
            onClick={() => joinEvent(null, selectedCarGroupId)}
            // NOTE: joinEvent always with null as first argument here, so it only takes second as car group id to join
          >Unirse al evento{selectedCarGroupId && " con el coche elegido"}!</Button>
      </>}
      

    </Container>
  )
}

export default CarGroupAvailableList