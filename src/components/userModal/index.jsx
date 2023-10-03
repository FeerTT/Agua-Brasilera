import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { modificarUsers } from '@/redux/actions/action';


const EditUserModal = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: user.nombre,
    apellido: user.apellido,
    telefono: user.telefono,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    dispatch(modificarUsers(user.id, formData))
      .then((response) => {
        onCancel();
      })
      .catch((error) => {
        console.error('Error al modificar el usuario:', error);
      });
  };

  return (
    <div className="modalContainer">
      <h2 className='h2Modal'>Editar Usuario</h2>
      <br></br>
      <br></br>
      <div className="inputContainer">
      <p>Nombre:</p>
      <br></br>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="inputField"
        />
        <br></br>
        <br></br>
        <p>Apellido:</p>
        <br></br>
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="inputField"
        />
        <br></br>
        <br></br>
        <p>Teléfono:</p>
        <br></br>
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="inputField"
        />
      </div>
      <br></br>
      <div className="buttonContainer">
        <button onClick={handleSave} className="saveButton">Guardar</button>
        <button onClick={onCancel} className="cancelButton">Cancelar</button>
      </div>
    </div>
  );
};

export default EditUserModal;