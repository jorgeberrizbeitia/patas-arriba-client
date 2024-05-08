import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import service from "@service/config";

import GoBack from "@components/navigation/GoBack";
import Loading from "@components/ui/Loading"
import CarGroupEditForm from "@components/car-group/CarGroupEditForm";
import CarGroupDelete from "@components/car-group/CarGroupDelete";

// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function CarGroupEdit() {
  
  const { carGroupId } = useParams()
  const navigate = useNavigate()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ carGroup, setCarGroup ] = useState(null)
  const [ editType, setEditType ] = useState(null)
  // editType 1: edit info, 2: delete car group

  useEffect(() => {
    getCarGroupDetails()
  }, [])

  const getCarGroupDetails = async () => {

    try {
      
      const response = await service.get(`/car-group/${carGroupId}`)
      setCarGroup(response.data.carGroupDetails)
      setIsLoading(false)

    } catch (error) {
      navigate("/server-error")
    }

  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>

      <GoBack to={`/car-group/${carGroup._id}`} caption="volver"/>     

      <Typography variant="h5" color="initial" gutterBottom>¿Como quieres editar el grupo de coche?</Typography>

      <Box display="flex" flexDirection="row" justifyContent="space-evenly" width="100%">

        <Button 
          onClick={() => setEditType(1)} 
          variant={editType === 1 ? "contained" : "outlined"} 
          color="info" 
          sx={{width: "35%", height: 55}}
        > Editar info </Button>
        {/* //todo cambiar todos los editar, modificar, actualizar a la misma palabra */}

        <Button 
          onClick={() => setEditType(2)} 
          variant={editType === 2 ? "contained" : "outlined"} 
          color="error" 
          sx={{width: "35%", height: 55}}
        >Eliminar</Button>

      </Box>

      <hr />

      {editType === 1 && <CarGroupEditForm carGroup={carGroup}/>}
      {editType === 2 && <CarGroupDelete carGroup={carGroup}/>}

    </>
  );
}

export default CarGroupEdit;