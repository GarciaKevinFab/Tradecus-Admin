import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Form, FormGroup } from "reactstrap";
import DniField from '../../components/DNI/DniField';
import { BASE_URL } from '../../utils/config';
import { AuthContext } from "../../context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

const CreateBooking = ({ selectedDate }) => {
  const { user } = useContext(AuthContext);

  const [tours, setTours] = useState([]);
  const [booking, setBooking] = useState({
    userId: user ? user._id : "",
    userEmail: user ? user.email : "",
    tourName: "",
    phone: "",
    guestSize: "1",
    bookAt: selectedDate,
  });
  const [dni, setDni] = useState(new Array(booking.guestSize).fill(""));
  const [userData, setUserData] = useState(new Array(booking.guestSize).fill({}));

  useEffect(() => {
    axios.get(`${BASE_URL}/tours`)
      .then(response => {
        setTours(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/booking`, booking)
      .then((response) => {
        console.log(response.data);
        setBooking((prev) => ({ ...prev, tourName: "", phone: "", guestSize: "1" }));
        toast.success('Reserva creada con éxito.');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Ocurrió un error al crear la reserva.');
      });
  };

  return (
    <div>
      <h2>Crear nueva reserva</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Nombre del Tour:</label>
          <select
            required
            value={booking.tourName}
            onChange={(e) => setBooking((prev) => ({ ...prev, tourName: e.target.value }))}
          >
            <option value="">Seleccione un tour</option>
            {tours.map(tour => (
              <option key={tour._id} value={tour.title}>
                {tour.title}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup>
          <label>Número de invitados:</label>
          <input
            type="number"
            required
            value={booking.guestSize}
            onChange={(e) => {
              setBooking((prev) => ({ ...prev, guestSize: e.target.value }));
              setDni(new Array(e.target.value).fill(""));
              setUserData(new Array(e.target.value).fill({}));
            }}
          />
        </FormGroup>
        <FormGroup>
          <label>Teléfono:</label>
          <input
            type="tel"
            required
            value={booking.phone}
            onChange={(e) => setBooking((prev) => ({ ...prev, phone: e.target.value }))}
          />
        </FormGroup>

        {/* Agregar campos de DNI */}
        {dni.map((_, i) => (
          <DniField
            key={i}
            index={i}
            dni={dni}
            setDni={setDni}
            userData={userData}
            setUserData={setUserData}
          />
        ))}

        <button type="submit">Crear Reserva</button>
      </Form>
    </div>
  );
}

export default CreateBooking;
