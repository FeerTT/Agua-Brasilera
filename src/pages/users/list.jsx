
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, modificarUsers, deleteUser } from '@/redux/actions/action'; // Importa la acción que obtiene los usuarios
import Link from 'next/link';
import EditUserModal from '../../components/userModal';
import { useState } from 'react';
import ReactModal from 'react-modal'
import ReactPaginate from 'react-paginate'
import { updateUserStatus } from '@/redux/actions/action';
import Image from 'next/image';

const Listado = () => {
  const dispatch = useDispatch();
 
  const userList = useSelector((state) => state.userReducer.userList);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [selectedUserDelete, setSelectedUserDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState('apellido-asc');
  const [userIdInModal, setUserIdInModal] = useState(null);
  
  //const usuariosOrdenados = userList.sort()
  const openModal = (userId,) => {
    setUserIdInModal(userId, true);
    setModalIsOpen(true);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  const sortedUserList = userList.slice().sort((a, b) => {
    const [field, order] = sortOption.split('-');
    if (field === 'id') {
      return order === 'asc' ? a.id - b.id : b.id - a.id;
    } else if (field === 'nombre') {
      return order === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
    } else if (field === 'telefono') {
      return order === 'asc' ? a.telefono.localeCompare(b.telefono) : b.telefono.localeCompare(a.telefono);
    } else {
      return order === 'asc' ? a.apellido.localeCompare(b.apellido) : b.apellido.localeCompare(a.apellido);
    }
  });

  const usersToShow = sortedUserList.sort((a, b) => {
    if (a.active && !b.active) {
      return -1; // Coloca a 'a' antes que 'b'
    } else if (!a.active && b.active) {
      return 1; // Coloca a 'b' antes que 'a'
    } else {
      return 0; // Mantén el orden actual
    }
  });
  
  const closeModal = () => {
    setModalIsOpen(false);
    setUserIdInModal(null);
  };
 const habilitarUsuario = () => {
    dispatch(updateUserStatus(userIdInModal, true));
    closeModal()
    setUserIdInModal(null);
    window.location.reload();
  }

  const handleEliminarUsuario = (userId) => {
    console.log("userididid",userId)
    dispatch(updateUserStatus(userId, false));
    closeConfirmationModal();
    window.location.reload();
  };
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  console.log(userList, "Console log de userList en users - list.jsx")
  const openConfirmationModal = (userId) => {
    setSelectedUserDelete(userId, true);
    setConfirmationModalIsOpen(true);
  };
  const handleModificarUsuario = (user) => {
    setSelectedUser(user);
  };

  const handleSaveUser = (nuevosDatos) => {
    dispatch(modificarUsers(selectedUser, nuevosDatos));
    setSelectedUser(null);
  }

  const handleCancelEdit = () => {
    setSelectedUser(null);
  };

  
  
  const closeConfirmationModal = () => {
    setConfirmationModalIsOpen(false);
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };


  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersToShow.slice(indexOfFirstUser, indexOfLastUser);


  return (
    <main>
      <h1 className='h1List'>Usuarios agua potable</h1>
      
    <div className='contenedorBotonMas'>
      <Link href="/">
      <Image
        className='regresarImg'
        src="/devolver.png"
        alt="Agregar Usuario"
        title="Regresar"
        width={60} 
        height={60} 
        
      />
      </Link>
      <div className='sortContainer'>
        <label className='sort' htmlFor="sort">Ordenar por:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="apellido-asc">Apellido A-Z</option>
          <option value="apellido-desc">Apellido Z-A</option>
          <option value="nombre-asc">Nombre A-Z</option>
          <option value="nombre-desc">Nombre Z-A</option>
        </select>
      </div>
      <Link className='botonMas' href="/users/add" title="Crear nuevo usuario"></Link>
    </div>
      
      <div className='modelo-conteiner'>
      
      </div>
      
      <table className="rwd-table">
        <thead>
          <tr className='trTable'>
            <th>ID</th>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
        {currentUsers.map((user) => (
        <tr className={`hover-effect ${user.active ? '' : 'disabled-user'}`} key={user.id}>
              <td>{user.id}</td>
              <td >{user.apellido}</td>
              <td >{user.nombre}</td>
              <td>{user.telefono}</td>
              <td>
              {user.active && (
                <Image
                className='logosUser'
                src="/editar.png"
                width={50}
                height={50}
                alt="Agregar Usuario"
                onClick={(e) => {
                  e.preventDefault();
                  handleModificarUsuario(user);
                }}
                title="Editar Usuario"
              />
                
              )}
            </td>
            <td>
              {user.active ? (
                
                <Image
                className='logosUser'
                src="/eliminar.png"
                width={50} 
                height={50} 
                alt="Eliminar Usuario"
                title="Deshabilitar Usuario"
                onClick={() => openConfirmationModal(user.id, false)}
                />
                
              ) : (
                <Image
                className='logosUser'
                src="/ver.png"
                width={50} 
                height={50} 
                alt="Usuario deshabilitado"
                title="Habilitar Usuario"
                onClick={() => openModal(user.id, true)}
              />
              )}
            </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={handleCancelEdit}
        />
      )}
    <ReactModal
      isOpen={confirmationModalIsOpen}
      onRequestClose={() => closeConfirmationModal()}
      contentLabel="Confirmar Eliminación"
      className="deleteModal" 
      overlayClassName="modalOverlay"
    >
      <h2 className="deleteMessage">¿Está seguro de deshabilitar este usuario?</h2>
      <div className="deleteButtons">
        <button className="confirmButton" onClick={() => handleEliminarUsuario(selectedUserDelete)}>
          Sí, Deshabilitar
        </button>
        <button className="cancelButton" onClick={() => closeConfirmationModal()}>
          Cancelar
        </button>
      </div>
    </ReactModal>
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      breakLabel={'...'}
      pageCount={Math.ceil(userList.length / usersPerPage)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      activeClassName={'active'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
    />
     {modalIsOpen && (
        <div className="modalImportante-container">
          <div className="modalImportante">
            <div className="modalImportante-content">
              <h2>Confirmar habilitación</h2>
              <p>¿Estás seguro de que deseas habilitar este usuario?</p>
              <button onClick={() => habilitarUsuario(userIdInModal)}>Habilitar</button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Listado;
