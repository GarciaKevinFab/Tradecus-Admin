import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { BASE_URL } from '../../utils/config';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './manageBookings.css';
import CustomModal from '../Modal/CustomModal';

const localizer = momentLocalizer(moment);

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);  // Controla la visibilidad del modal.
  const [selectedDate, setSelectedDate] = useState(null);  // Guarda la fecha seleccionada.

  // Obtiene las reservaciones al cargar la página.
  useEffect(() => {
    fetchBookings();
  }, []);

  // Esta función se encarga de obtener las reservas desde tu servidor.
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/booking`);
      const events = res.data.data.map(booking => {
        return {
          ...booking,
          start: new Date(booking.bookAt),
          end: new Date(booking.bookAt),
          title: `${booking.tourName} - ${booking.guestSize} guests`
        }
      });
      setBookings(events);
    } catch (err) {
      console.error(err);
    }
  };

  // Al hacer clic en un evento, muestra los detalles de la reserva.
  const handleSelectEvent = (event) => {
    alert(`Reserva seleccionada:\n\nNombre del tour: ${event.tourName}\nNúmero de invitados: ${event.guestSize}\nTeléfono: ${event.phone}\nReservado en: ${moment(event.bookAt).format('LLL')}`);
  }

  // Al hacer clic en una fecha, abre la lógica de reserva.
  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    openModal();
  }

  // Funciones para manejar el modal.
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      className: "myCustomEvent",
    };

    return {
      style: style
    };
  }

  return (
    <div style={{ height: 500 }}>
      <h2>Gestión de Reservas</h2>
      <Calendar
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
        selectable='ignoreEvents'
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
      />
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default ManageBookings;
