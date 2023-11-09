
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, modificarUsers, deleteUser } from '@/redux/actions/action'; // Importa la acción que obtiene los usuarios
import Link from 'next/link';
import EditUserModal from '../../components/userModal';
import { useState } from 'react';
import ReactModal from 'react-modal'
import ReactPaginate from 'react-paginate'
import { habilitarUser } from '@/redux/actions/action';

const Listado = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userReducer.userList);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [selectedUserDelete, setSelectedUserDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 17;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState('apellido-asc');
  const [userIdInModal, setUserIdInModal] = useState(null);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const openModal = (userId) => {
    setUserIdInModal(userId);
    setModalIsOpen(true);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  const sortedUserList = userList.slice().sort((a, b) => {
    const [field, order] = sortOption.split('-');
    if (field === 'nombre') {
      return order === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
    } else if (field === 'telefono') {
      return order === 'asc' ? a.telefono.localeCompare(b.telefono) : b.telefono.localeCompare(a.telefono);
    } else {

      return order === 'asc' ? a.apellido.localeCompare(b.apellido) : b.apellido.localeCompare(a.apellido);
    }
  });

  const closeModal = () => {
    setModalIsOpen(false);
    setUserIdInModal(null);
  };
 const habilitarUsuario = () => {
    habilitarUser(userIdInModal, true);
    closeModal()
  }

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

  const handleEliminarUsuario = (userId) =>{
    dispatch(deleteUser(userId));
    dispatch(getUsers());
    setConfirmationModalIsOpen(false);
  };


  const openConfirmationModal = (userId) => {
    setSelectedUserDelete(userId);
    setConfirmationModalIsOpen(true);
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
  const currentUsers = sortedUserList.slice(indexOfFirstUser, indexOfLastUser);
  
  const activeUsers = currentUsers.filter((user) => user.active === true);
  const disabledUsers = currentUsers.filter((user) => user.active === false);
  const usersToDisplay = [...activeUsers, ...disabledUsers];


  return (
    <main>
      <h1 className='h1List'>Usuarios agua potable</h1>
      
    <div className='contenedorBotonMas'>
      <Link href="/users">
      <img className='regresarImg' src="/devolver.png" alt="Agregar Usuario" title="Regresar"  />
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
        {usersToDisplay.map((user) => (
        <tr className={`hover-effect ${user.active ? '' : 'disabled-user'}`} key={user.id}>
              <td>{user.id}</td>
              <td >{user.apellido}</td>
              <td >{user.nombre}</td>
              <td>{user.telefono}</td>
              <td>
              {user.active && (
                <img
                  className='logosUser'
                  src="/editar.png"
                  title="Editar Usuario"
                  onClick={() => handleModificarUsuario(user)}
                  alt="Agregar Usuario"
                />
              )}
            </td>
            <td>
              {user.active ? (
                <img
                  className='logosUser'
                  src="/eliminar.png"
                  title="Deshabilitar Usuario"
                  onClick={() => openConfirmationModal(user.id)}
                  alt="Eliminar Usuario"
                />
              ) : (
                <img
                  className='logosUser'
                  src="/ver.png"
                  title="Habilitar Usuario"
                  onClick={() => openModal(user.id)}
                  alt="Usuario deshabilitado"
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
              <button onClick={() => habilitarUsuario()}>Habilitar</button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Listado;
