import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Button } from "reactstrap";
import { FormGroup, } from "reactstrap";
<<<<<<< HEAD
import { BASE_URL } from "../../utils/config";
import './dniField.css';
=======
>>>>>>> 263b48db6f0add4de01b009b8fb67e956bc83848

const DniField = ({ index, dni, setDni, userData, setUserData }) => {

    const fetchDniData = async () => {
        if (dni[index] && dni[index].length === 8) {
            try {
                const response = await axios.get(`/dni/getDniData/${dni[index]}`);
                if (response.data && response.data.nombres && response.data.apellidoPaterno && response.data.apellidoMaterno) {
                    let tempUserData = [...userData];
                    tempUserData[index] = response.data;
                    setUserData(tempUserData);
                } else {
                    toast.error("La respuesta del servidor no contiene los datos esperados.");
                }
            } catch (error) {
                toast.error("Error al obtener los datos del DNI.");
            }
        } else {
            toast.error("Por favor, introduce un DNI válido.");
        }
    }


    return (
        <FormGroup>
            <input
                type="number"
                placeholder="DNI"
                value={dni[index] || ''} // Aquí utilizamos el índice para obtener el valor correspondiente del array
                onChange={(e) => {
                    let tempDni = [...dni];
                    tempDni[index] = e.target.value;
                    setDni(tempDni);
                }}
            />
            <Button className="btn primary__btn w-10 mt-4" onClick={fetchDniData}>
                Validar
            </Button>
            {userData[index] && userData[index].nombres && <p>Nombres: {userData[index].nombres}</p>}
            {userData[index] && userData[index].apellidoPaterno && userData[index].apellidoMaterno &&
                <p>Apellidos: {userData[index].apellidoPaterno} {userData[index].apellidoMaterno}</p>}
        </FormGroup>
    );
};

export default DniField;