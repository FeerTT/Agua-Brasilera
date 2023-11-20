import React from 'react';
const UsuariosPorMes: React.FC<{ activities: any[] }> = ({ activities }) => {
    
    const currentMonth = new Date().getMonth() + 1; 

   
    const usersCreatedThisMonth = activities
    .filter((user) => {
      const userCreationMonth = new Date(user.createdAt).getMonth() + 1;
      return userCreationMonth === currentMonth;
    })
    .map((user) => ({
      name: user.nombre,
      lastName: user.apellido,
      id:user.id,
    }));

    return (
      <div className='contenedorTexto'>
  {usersCreatedThisMonth.length > 0 ? (
    <div className="activity-container">
      <ul id='ulImportanteUsuarios'>
        {usersCreatedThisMonth.map((user, index) => (
          <li className="activity-texto" id={`user-${index}`} key={index}>
            <br></br>
            {`${user.id} - ${user.name} ${user.lastName}`}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>No hay usuarios creados este mes.</p>
  )}
</div>
      // <div className='contenedorTexto'>
      //   {usersCreatedThisMonth.length > 0 && (
      //       <div className="activity-container" >
      //           <ul id='ulImportanteUsuarios'>
      //               {usersCreatedThisMonth.map((user, index) => (
      //               <li className="activity-texto" id={`user-${index}`} key={index}>
      //                   <br></br>
      //                   {`${user.id} - ${user.name} ${user.lastName}`}
      //               </li>
      //               ))}
      //           </ul>
      //       </div>
      //       )}
      // </div>
    );
  };
  
  export default UsuariosPorMes;
