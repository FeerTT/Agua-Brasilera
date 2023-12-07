
import React from "react";

const ActivityLog: React.FC<{ activities: any[] }> = ({ activities }) => {
const currentMonth = new Date().getMonth();
const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

const usersWithMeasurementLastMonth = activities.filter((user) => {
  if (user.ultimaMedicion) {
    const activityDate = new Date(user.ultimaMedicion.mesActual);
    return activityDate.getMonth() === lastMonth;
  }
  return false;
});

const percentageUsersWithMeasurement = (usersWithMeasurementLastMonth.length / activities.length) * 100;
const showActivity = percentageUsersWithMeasurement >= 9;

let lastMeasurementDate = '';
if (showActivity) {
  const lastMeasurementThisMonth = usersWithMeasurementLastMonth.reduce((latest, user) => {
    if (user.ultimaMedicion) {
      const activityDate = new Date(user.ultimaMedicion.mesActual);
      if (!latest || activityDate > latest) {
        return activityDate;
      }
    }
    return latest;
  }, null);

  if (lastMeasurementThisMonth) {
    const options = { year: 'numeric', month: '2-digit' };
    lastMeasurementDate = lastMeasurementThisMonth.toLocaleDateString(undefined, options).replace(/\//g, '-');
  }
}

const usersCreatedThisMonth = activities.filter((user) => {
  const userCreationMonth = new Date(user.createdAt).getMonth();
  return userCreationMonth === currentMonth;
}).map((user) => ({
  name: user.nombre,
  lastName: user.apellido,
  created: new Date(user.createdAt).toISOString().slice(0, 10),
}));

return (
  <div className='contenedorTexto'>
    {showActivity && (
      <div className="notificationMedicion">
        <div className="notification-icon">
          <i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg></i>
        </div>
        <div className="notification-content">
          <h3>Se almacenó la medición correspondiente al mes: {lastMeasurementDate}</h3>
          {/* <p>Última medición: {lastMeasurementDate}</p> */}
        </div>
      </div>
    )}
    <br></br>
    {usersCreatedThisMonth.length > 0 && (
      <div className="activity-container">
        <h3 className="activity-texto"></h3>
        {usersCreatedThisMonth.length > 180 ? (
          <p className="activity-texto">Se registraron más de 12 usuarios nuevos este mes </p>
        ) : (
          <div>
            {usersCreatedThisMonth.map((user, index) => (
              <div className="notification" key={index}>
                <div className="notification-icon">
                  <i className="fa fa-user"></i>
                </div>
                <div className="notification-content">
                  <p>¡Se registró un nuevo usuario el: {user.created}!</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
);
}
export default ActivityLog;
// import React from 'react';


// const ActivityLog: React.FC<{ activities: any[] }> = ({ activities }) => {
//     const totalUsers = activities.length;
//     const currentMonth = new Date().getMonth() + 1; // +1 porque los meses se indexan desde 0 (enero es 0)
  
//     // const usersWithMeasurementThisMonth = activities.filter((user) => {
//     //   if (user.ultimaMedicion) {
//     //     const activityMonth = new Date(user.ultimaMedicion.mesActual).getMonth() + 1;
//     //     return activityMonth === currentMonth;
//     //   }
//     //   return false;
//     // });
  
//     // const percentageUsersWithMeasurement = (usersWithMeasurementThisMonth.length / totalUsers) * 100;
//     const usersWithMeasurementLastMonth = activities.filter((user) => {
//       if (user.ultimaMedicion) {
//         const activityDate = new Date(user.ultimaMedicion.mesActual);
//         const currentMonth = new Date().getMonth();
//         const lastMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    
//         return activityDate.getMonth() === lastMonth;
//       }
//       return false;
//     });
    
//     const percentageUsersWithMeasurement = (usersWithMeasurementLastMonth.length / totalUsers) * 100;
//     const showActivity = percentageUsersWithMeasurement >= 9; ////////////MODIFICAR ESTE PARA TRAER MEDICION EN BASE AL PORCENTAJE DE USUARIOS QUE LA CONTENGAN
  
//     let lastMeasurementDate = '';
  
//     if (showActivity) {
//   const lastMeasurementThisMonth = usersWithMeasurementLastMonth.reduce((latest, user) => {
//     if (user.ultimaMedicion) {
//       const activityMonth = new Date(user.ultimaMedicion.mesActual).getMonth() - 1;
//       if (activityMonth === currentMonth) {
//         const measurementDate = new Date(user.ultimaMedicion.mesActual);
//         if (!latest || measurementDate > latest) {
//           return measurementDate;
//         }
//       }
//     }
//     return latest;
//   }, null);
  
//       if (lastMeasurementThisMonth) {
//         lastMeasurementDate = usersWithMeasurementLastMonth.toLocaleString(); 
//       }
//     }
//     const usersCreatedThisMonth = activities
//     .filter((user) => {
//       const userCreationMonth = new Date(user.createdAt).getMonth() + 1;
//       return userCreationMonth === currentMonth;
//     })
//     .map((user) => ({
//       name: user.nombre,
//       lastName: user.apellido,
//       created: new Date(user.createdAt).toISOString().slice(0, 10),
//     }));

//     return (
//       <div className='contenedorTexto'>
//         {showActivity && (
//           <div className="notificationMedicion">
//           <div className="notification-icon">
//             <i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg></i>
//           </div>
//           <div className="notification-content">
//             <h3>¡Nueva medición creada con éxito!</h3>
//             <p>{lastMeasurementDate}</p>
//           </div>
//           {/* <div className="notification-close">
//             <i className="fa fa-times"></i>
//           </div> */}
//         </div>
//         )}
//         <br></br>
//         {usersCreatedThisMonth.length > 0 && (
//             <div className="activity-container" >
//                 <h3 className="activity-texto"></h3>
//                 {usersCreatedThisMonth.length > 180 ? (
//                 <p className="activity-texto">Se registraron + 12 usuarios nuevos este mes </p>
//                 ) : (
//                   <div>
//                     {usersCreatedThisMonth.map((user, index) => (
//                     <div className="notification" key={index}>
//                     <div className="notification-icon">
//                       <i className="fa fa-user"></i>
//                     </div>
//                     <div className="notification-content">
//                       <p>¡Se registró un nuevo usuario el: {user.created}!</p>
//                     </div>
//                     {/* <div className="notification-close">
//                       <i className="fa fa-times"></i>
//                     </div> */}
//                   </div>
//                     ))}
//                 </div>
//                 )}
//             </div>
//             )}
            
//       </div>
//     );
//   };
  
//   export default ActivityLog;
                