import Link from 'next/link';

const UsersPage = () => {

  return (
    <>
    
    <div className="users-container">
      <h1 className="users-title"><strong>DASHBOARD USUARIOS</strong></h1>
      <div className="button-container">
        <Link href="/users/list">
          <button className="view-modify-button">
            VER Y MODIFICAR USUARIOS
            <img className='imagenAddUser' src="/formulario.png" alt="Agregar Usuario" />
          </button>
        </Link>
        <Link href="/users/add">
          <button className="add-button">
          <div className="button-content">
          <p>AGREGAR NUEVO USUARIO</p>
          <img className='imagenAddUser' src="/agregar-contacto.png" alt="Agregar Usuario" />
          </div>
          </button>
        </Link>
      </div>
    </div>
    <div className='divRegresar'>
      <Link href="/">
          <img className='regresarImg' src="/devolver.png" alt="Agregar Usuario"title="Regresar"  />
      </Link>
    </div>
    </>
  );
};

export default UsersPage;


