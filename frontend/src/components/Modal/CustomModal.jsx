import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import DniField from '../DNI/DniField.jsx';

const CustomModal = ({ isOpen, onRequestClose, selectedDate }) => {
  const [bookingInfo, setBookingInfo] = useState({
    phone: '',
    guestSize: '1',
  });

  const [dni, setDni] = useState(new Array(1).fill(''));

  useEffect(() => {
    setDni(new Array(Number(bookingInfo.guestSize)).fill(''));
  }, [bookingInfo.guestSize]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo((prevBookingInfo) => ({
      ...prevBookingInfo,
      [name]: value,
    }));
  };

  const handleDniChange = (index, value) => {
    setDni((prevDni) => {
      const newDni = [...prevDni];
      newDni[index] = value;
      return newDni;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos de la reserva al servidor o realizar cualquier otra acción necesaria
    console.log(bookingInfo);
    console.log(dni);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Crear Reserva"
      style={{
        overlay: {
          zIndex: 9999,
        },
        content: {
          zIndex: 9999,
        },
      }}
    >
      <h2>Crear una Reserva</h2>
      <p>Fecha Seleccionada: {selectedDate && moment(selectedDate).format('LLL')}</p>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={bookingInfo.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="guestSize">Número de Invitados:</label>
          <input
            type="number"
            id="guestSize"
            name="guestSize"
            value={bookingInfo.guestSize}
            onChange={handleInputChange}
            required
            min="1"
          />
        </div>
        <div>
          <label>DNI:</label>
          {bookingInfo.guestSize > 0 &&
            [...Array(Number(bookingInfo.guestSize))].map((_, i) => (
              <DniField
                key={i}
                index={i}
                dni={dni}
                onChange={handleDniChange}
              />
            ))}
        </div>
        <button type="submit">Reservar</button>
        <button onClick={onRequestClose}>Cerrar</button>
      </form>
    </Modal>
  );
};

export default CustomModal;
