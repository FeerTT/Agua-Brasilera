import React, { useState } from 'react';
import CreateUserConfirmationModal from '../../components/createModal';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
const AddUserForm = () => {
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openConfirmationModal = () => {
    setIsModalOpen(true);
  };
  const closeConfirmationModal = () => {
    setIsModalOpen(false);
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setIsModalOpen(true);
    
  };


  return (
    <main>
    <div className="form-container">
    <form className="add-user-form" onSubmit={handleSubmit}>
        <h1>Formulario de registro para nuevos usuarios de agua potable</h1>
      <div className="form-group">
        <label htmlFor="nombre" className="form-label">
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="apellido" className="form-label">
          Apellido:
        </label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="telefono" className="form-label">
          Teléfono:
        </label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <button type="submit" className="form-button">
        Crear usuario
      </button>
    </form>
    <CreateUserConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={()=>setIsModalOpen(false)}
        nombre={formData.nombre}
        apellido={formData.nombre}
        telefono={formData.telefono}
      />
  </div>
  <div className='divRegresarUsuario'>
        <Link href="/users">
        <button className='regresarUsuario'>Regresar</button>
        </Link>
      </div>
  </main>
  );
};

export default AddUserForm;