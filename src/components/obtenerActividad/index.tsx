import React from 'react';
const ActivityLog: React.FC<{ activities: any[] }> = ({ activities }) => {
    const totalUsers = activities.length;
    const currentMonth = new Date().getMonth() + 1; // +1 porque los meses se indexan desde 0 (enero es 0)
  
    const usersWithMeasurementThisMonth = activities.filter((user) => {
      if (user.ultimaMedicion) {
        const activityMonth = new Date(user.ultimaMedicion.mesActual).getMonth() + 1;
        return activityMonth === currentMonth;
      }
      return false;
    });
  
    const percentageUsersWithMeasurement = (usersWithMeasurementThisMonth.length / totalUsers) * 100;
  
    const showActivity = percentageUsersWithMeasurement >= 9; ////////////MODIFICAR ESTE PARA TRAER MEDICION EN BASE AL PORCENTAJE DE USUARIOS QUE LA CONTENGAN
  
    let lastMeasurementDate = '';
  
    if (showActivity) {
      const lastMeasurementThisMonth = usersWithMeasurementThisMonth.reduce((latest, user) => {
        if (user.ultimaMedicion) {
          const activityMonth = new Date(user.ultimaMedicion.mesActual).getMonth() + 1;
          if (activityMonth === currentMonth) {
            const measurementDate = new Date(user.ultimaMedicion.mesActual);
            if (!latest || measurementDate > latest) {
              return measurementDate;
            }
          }
        }
        return latest;
      }, '');
  
      if (lastMeasurementThisMonth) {
        lastMeasurementDate = lastMeasurementThisMonth.toLocaleDateString(); 
      }
    }
    const usersCreatedThisMonth = activities
    .filter((user) => {
      const userCreationMonth = new Date(user.createdAt).getMonth() + 1;
      return userCreationMonth === currentMonth;
    })
    .map((user) => ({
      name: user.nombre,
      lastName: user.apellido,
      created: new Date(user.createdAt).toISOString().slice(0, 10),
    }));

    return (
      <div className='contenedorTexto'>
        {showActivity && (
          <h3 className='activity-texto-Medicion'>
            <br></br>
            Registro de nueva medición:<p>{lastMeasurementDate}</p>
            <br></br>
          </h3>
        )}
        <br></br>
        {usersCreatedThisMonth.length > 0 && (
            <div className="activity-container" >
                <h3 className="activity-texto"></h3>
                {usersCreatedThisMonth.length > 180 ? (
                <p className="activity-texto">Se registraron + 12 usuarios nuevos este mes </p>
                ) : (
                <ul>
                    {usersCreatedThisMonth.map((user, index) => (
                    <li className="activity-textos" id={`user-${index}`} key={index}>
                      <br></br>
                        Se registró un nuevo usuario el: {user.created}
                        <br></br>
                        <br></br>
                    </li>
                    ))}
                </ul>
                )}
            </div>
            )}
            
      </div>
    );
  };
  
  export default ActivityLog;
