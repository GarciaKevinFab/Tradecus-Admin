import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { BASE_URL } from '../../utils/config';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './manageBookings.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CustomModal from '../Modal/CustomModal'; // Import your CustomModal

const localizer = momentLocalizer(moment);

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  const handleSelectEvent = (booking) => {
    setSelectedBooking(booking);
    setModalIsOpen(true);
  };

  // Al hacer clic en una fecha, abre la lógica de reserva.
  const handleSelectSlot = (slotInfo) => {
    navigate(`/create_booking?date=${slotInfo.start.toISOString()}`); // Redirect to create booking page with date
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
        onRequestClose={() => setModalIsOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
};

export default ManageBookings;
