import Link from 'next/link';

const UsersPage = () => {

  return (
    <>
    <div className="users-container">
      <h1 className="users-title"><strong>DASHBOARD MEDICIONES</strong></h1>
      <div className="button-container">
        <Link href="/mediciones/listar">
          <button className="view-modify-button">
            VER MEDICIONES
            <img className='imagenAddUser2' src="/eficiencia.png" alt="Agregar Usuario" />
          </button>
        </Link>
        <Link href="/mediciones/mostrarUsers">
          <button className="add-button">
            AGREGAR NUEVA MEDICION
            <img className='imagenAddUser' src="/agregar-archivo.png" alt="Agregar Usuario" />
          </button>
        </Link>
      </div>
    </div>
    <div className='divRegresar'>
      <Link href="/">
      <img className='regresarImg' src="/devolver.png" alt="Agregar Usuario" title="Regresar" />
          
          </Link>
    </div>
          
    </>
  );
};

export default UsersPage;
