import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import DniField from '../../components/DNI/DniField';
import { BASE_URL } from '../../utils/config';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const EditBooking = () => {
  const [tours, setTours] = useState([]);
  const location = useLocation();
  const bookingDataFromLocation = location.state?.booking;

  const [booking, setBooking] = useState(bookingDataFromLocation || { tourName: '', guestSize: 1, phone: '', userData: [] });
  const [dni, setDni] = useState(bookingDataFromLocation ? bookingDataFromLocation.userData.map(user => user.dni || "") : new Array(1).fill(""));
  const [userData, setUserData] = useState(bookingDataFromLocation ? bookingDataFromLocation.userData : new Array(1).fill({}));
  const [tourType, setTourType] = useState(bookingDataFromLocation ? bookingDataFromLocation.tourType : "private");

  useEffect(() => {
    axios.get(`${BASE_URL}/tours`)
      .then(response => {
        setTours(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setDni(dni => [...dni.slice(0, booking.guestSize), ...new Array(booking.guestSize - dni.length).fill("")]);
    setUserData(userData => [...userData.slice(0, booking.guestSize), ...new Array(booking.guestSize - userData.length).fill({})]);
  }, [booking.guestSize]);

  const getMaxGuests = () => {
    return tourType === "private" ? 2 : 25;
  };

  useEffect(() => {
    const maxGuests = getMaxGuests();
    if (booking.guestSize > maxGuests) {
      setBooking(prev => ({ ...prev, guestSize: maxGuests }));
      toast.info(`Número máximo de invitados para el tipo de tour "${tourType}" es ${maxGuests}.`);
    }
  }, [tourType, booking.guestSize]);

  const handleGuestSizeChange = (e) => {
    const newGuestSize = parseInt(e.target.value, 10);
    const maxGuests = getMaxGuests();
    if (newGuestSize <= maxGuests) {
      setBooking(prev => ({ ...prev, guestSize: newGuestSize }));
    } else {
      toast.error(`Número de invitados excede el límite para el tipo de tour seleccionado.`);
    }
  };

  const handleTourTypeChange = (e) => {
    setTourType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBooking = {
      ...booking,
      tourType: tourType,
      userData: userData.map((data, index) => ({
        ...data,
        dni: dni[index]
      }))
    };

    axios.put(`${BASE_URL}/booking/${booking._id}`, updatedBooking)
      .then(response => {
        toast.success('Reserva actualizada con éxito.');
      })
      .catch(error => {
        console.error(error);
        toast.error('Ocurrió un error al actualizar la reserva.');
      });
  };

  if (!booking) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Editar reserva</h2>
      <Form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <FormGroup>
          <Label>Nombre del Tour:</Label>
          <Input
            type="select"
            name="tourName"
            value={booking.tourName}
            onChange={e => setBooking(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          >
            <option value="">Seleccione un tour</option>
            {tours.map(tour => (
              <option key={tour._id} value={tour.title}>
                {tour.title}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>Tipo de Tour:</Label>
          <Input
            type="select"
            name="tourType"
            value={tourType}
            onChange={handleTourTypeChange}
          >
            <option value="private">Privado (1-2 personas)</option>
            <option value="corporate">Corporativo (1-25 personas)</option>
            {/* Añade más opciones si las tienes */}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>Número de invitados:</Label>
          <Input
            type="number"
            name="guestSize"
            min="1"
            max={getMaxGuests()}
            value={booking.guestSize}
            onChange={handleGuestSizeChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Teléfono:</Label>
          <Input
            type="tel"
            name="phone"
            value={booking.phone}
            onChange={e => setBooking(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          />
        </FormGroup>

        {/* Campos DNI para cada invitado */}
        {Array.from({ length: booking.guestSize }, (_, i) => (
          <DniField
            key={i}
            index={i}
            dni={dni}
            setDni={setDni}
            userData={userData}
            setUserData={setUserData}
          />
        ))}

        <Button type="submit">Actualizar Reserva</Button>
      </Form>
    </div>
  );
};

export default EditBooking;
