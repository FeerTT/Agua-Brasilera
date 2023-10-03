import Link from 'next/link';

const UsersPage = () => {

  return (
    <div className="users-container">
      <h1 className="users-title">DASHBOARD USUARIOS</h1>
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
  );
};

export default UsersPage;


