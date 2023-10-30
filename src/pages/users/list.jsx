
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, modificarUsers, deleteUser } from '@/redux/actions/action'; // Importa la acción que obtiene los usuarios
import Link from 'next/link';
import EditUserModal from '../../components/userModal';
import { useState } from 'react';
import ReactModal from 'react-modal'
import ReactPaginate from 'react-paginate'

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

  useEffect(() => {
    dispatch(getUsers());
  }, [userList]);

  const openModal = () => {
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
  
  return (
    <main>
      <h1 className='h1List'>Usuarios agua potable</h1>
      
      <Link href="/users">
      <button className='regresarUsuario'>Regresar</button>
      </Link>
      <div className='modelo-conteiner'>
      <label className='sort-list' htmlFor="sort">Ordenar por:</label>
      <select id="sort" value={sortOption} onChange={handleSortChange}>
        <option value="apellido-asc">Apellido A-Z</option>
        <option value="apellido-desc">Apellido Z-A</option>
        <option value="nombre-asc">Nombre A-Z</option>
        <option value="nombre-desc">Nombre Z-A</option>
      </select>
      </div>
      
      <table className="rwd-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
            {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.apellido}</td>
              <td>{user.nombre}</td>
              <td>{user.telefono}</td>
              <td>
                <button className='modifyButton' onClick={() => handleModificarUsuario(user)}>Modificar</button>
              </td>
              <td>
                <button className='modifyButton' onClick={()=> openConfirmationModal(user.id)}>Eliminar</button>
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
      <h2 className="deleteMessage">¿Está seguro de eliminar este usuario?</h2>
      <div className="deleteButtons">
        <button className="confirmButton" onClick={() => handleEliminarUsuario(selectedUserDelete)}>
          Sí, Eliminar
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
    </main>
  );
};

export default Listado;
