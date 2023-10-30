import Link from 'next/link';

const UsersPage = () => {

  return (
    <div className="users-container">
      <h1 className="users-title">DASHBOARD MEDICIONES</h1>
      <div className="button-container">
        <Link href="/mediciones/listar">
          <button className="view-modify-button">
            VER MEDICIONES
          </button>
        </Link>
        <Link href="/mediciones/mostrarUsers">
          <button className="add-button">
            AGREGAR NUEVA MEDICION
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UsersPage;
