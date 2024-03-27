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

function CarGroupAvailableList() {

  const { eventId } = useParams()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ carGroups, setCarGroups ] = useState(null)

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
      
      {carGroups.length === 0 && <>
        <Alert severity="warning">No hay coches disponibles por los momentos, puede unirse al evento y buscar coches luego</Alert>
        <Button 
            sx={{margin: "30px"}}
            variant="contained"
          >Unirse al evento y volver a detalles!</Button>
      </>}

      {carGroups.map((eachCarGroup) => <CarGroupCard key={eachCarGroup._id} eachCarGroup={eachCarGroup}/>)}

    </Container>
  )
}

export default CarGroupAvailableList