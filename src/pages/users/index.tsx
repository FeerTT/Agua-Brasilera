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
          </button>
        </Link>
        <Link href="/users/add">
          <button className="add-button">
            AGREGAR NUEVOS USUARIOS
          </button>
        </Link>
      </div>
    </div>
    <div className='divRegresar'>
      <Link href="/">
          <button className='regresarUsuario'>Regresar</button>
          </Link>
    </div>
    </>
  );
};

export default UsersPage;


