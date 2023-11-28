import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { createUser } from '@/redux/actions/action';
import { useEffect } from 'react';

const CreateUserConfirmationModal = ({ isOpen, onRequestClose, nombre, apellido, telefono }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
  });

  useEffect(() => {
    // Actualiza el estado local cuando cambian las propiedades externas
    setFormData({
      nombre,
      apellido,
      telefono,
    });
  }, [nombre, apellido, telefono]);

  const handleCreateUser = () => {
    const userData = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
    };

    dispatch(createUser(userData));
    setFormData({
      nombre: '',
      apellido: '',
      telefono: '',
    });
    alert("Usuario creado exitosamente!");
    onRequestClose();
  };


  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="create-confirmation-modal-container"
      contentLabel="Confirmación de Creación de Usuario"
      overlayClassName="modal-overlay"
    >
      <h2>¿Deseas crear un nuevo usuario con los siguientes datos?</h2>
      <p>Nombre: {nombre}</p>
      <p>Apellido: {apellido}</p>
      {telefono.length ? <p>Teléfono/Celular: {telefono}</p> : <></>}
      <div className="confirmation-buttons">
        <button className="button-confirmar-crear" onClick={handleCreateUser}>
          Confirmar Creación
        </button>
        <button className="button-cancelar-crear" onClick={onRequestClose}>
          Cancelar
        </button>
      </div>
    </ReactModal>
  );
};

export default CreateUserConfirmationModal;