import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ModalProps {
  isOpen: boolean; 
}

const Modal: React.FC<ModalProps> = ({ isOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(isOpen); 
  }, [isOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      
      {isModalOpen && (
        <div className="modalConfirmacion">
          <div className="modal-confirmacion-content">
            <span onClick={closeModal} className="close-button">
              &times;
            </span>
            <h2 className='modalTitulo'>Nueva medición:</h2>
            <p className='modalParrafo'>Generada y almacenada exitosamente.</p>
            <div>
                <button className='button-cerrarModal' onClick={closeModal}>Cerrar</button>
                <Link href={"./listar"}>
                <button className='button-cerrarModal'>Ir a listado de mediciones</button>
                </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
