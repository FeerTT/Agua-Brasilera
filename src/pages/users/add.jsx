import React, { useState } from 'react';
import CreateUserConfirmationModal from '../../components/createModal';
import { useDispatch } from 'react-redux';
import Link from "next/link";
import Image from "next/image";

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
    const nameRegex = /^[A-Za-z-Ñ-ñ-, ]{1,25}$/;
    const phoneRegex = /^[0-9+\- ]{0,25}$/;
    if (!formData.nombre.match(nameRegex) || !formData.apellido.match(nameRegex)) {
      alert('Nombre y apellido deben contener solo letras y espacios, y tener un máximo de 20 caracteres.');
      return;
    }
    if (!formData.telefono.match(phoneRegex)) {
      alert('El teléfono debe contener solo números, + o -, y tener un máximo de 25 caracteres.');
      return;
    }
    
    setIsModalOpen(true);
  };


  return (
    <main>
    <div className="form-container">
    <form className="add-user-form" onSubmit={handleSubmit}>
        <h1>Formulario de registro para nuevos usuarios de agua potable</h1>
      <div className="form-group">
      <label className='labelPruebaGoogle'>
      <input
        type='text'
        className='inputPruebaGoogle'
        id='nombre'
        name='nombre'
        value={formData.nombre}
        onChange={handleChange}
        placeholder=' '
      />
      <span className='spanPruebaGoogle'>Ingresa Nombre:</span>
    </label>

    <label className='labelPruebaGoogle'>
      <input
        type='text'
        className='inputPruebaGoogle'
        id='apellido'
        name='apellido'
        value={formData.apellido}
        onChange={handleChange}
        placeholder=' '
      />
      <span className='spanPruebaGoogle'>Ingresa Apellido:</span>
    </label>

    <label className='labelPruebaGoogle'>
      <input
        type='text'
        className='inputPruebaGoogle'
        id='telefono'
        name='telefono'
        value={formData.telefono}
        onChange={handleChange}
        placeholder=' '
      />
      <span className='spanPruebaGoogle'>Ingresa Teléfono:</span>
    </label>
      </div>
      <button type="submit" className="form-button">
        Crear usuario
      </button>
    </form>
    <CreateUserConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={()=>setIsModalOpen(false)}
        nombre={formData.nombre}
        apellido={formData.apellido}
        telefono={formData.telefono}
      />
  </div>
    {/* <label className='labelPruebaGoogle'>
      <input className='inputPruebaGoogle' type='text' class="input" placeholder=" " />
      <span className='spanPruebaGoogle'>Ingresa Nombre:</span>
    </label> */}

  <div className='divRegresarUsuario'>
  <Link href="/">
      <Image
        className='regresarImg1'
        src="/devolver.png"
        width={60}
        height={60}
        alt="Agregar Usuario"
        title="Regresar"
      />
    </Link>
      </div>
  </main>
 );
};

export default AddUserForm;



    
 