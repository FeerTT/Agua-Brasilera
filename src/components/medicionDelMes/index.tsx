import React, { useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";


const MedicionDelMes: React.FC = () => {
  const filteredUserList = useSelector((state: any) => state.userReducer.filteredUserList);
  const [hasMeasurements, setHasMeasurements] = useState<boolean>(false);

  // const hasMeasurementThisMonth = useCallback((users: any[]) => {
  //   return users.some((user: any) => {
  //       return user.ultimaMedicion && isThisMonth(new Date(user.ultimaMedicion.mesActual));
  //   });
  //   }, []);
  //   const isThisMonth = (date: Date) => {
  //       const currentDate = new Date();
  //       return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
  //     };


  // useEffect(() => {
  //   if (filteredUserList && filteredUserList.length > 0) {
  //     const measurementsExist = hasMeasurementThisMonth(filteredUserList);
  //     setHasMeasurements(measurementsExist);
  //     console.log(measurementsExist, "hola hola")
  //   }
  // }, [filteredUserList, hasMeasurementThisMonth]);
  
  const hasMeasurementThisMonth = useCallback((users: any[]) => {
    return users.some((user: any) => {
      return user.ultimaMedicion && isThisMonth(new Date(user.ultimaMedicion.mesActual));
    });
  }, []);

  const hasMeasurementLastMonth = useCallback((users: any[]) => {
    const currentDate = new Date();
    const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

    return users.some((user: any) => {
      if (user.ultimaMedicion && user.ultimaMedicion.mesActual) {
        const userDate = new Date(user.ultimaMedicion.mesActual);

        return userDate.getFullYear() === lastMonthDate.getFullYear() && userDate.getMonth() === lastMonthDate.getMonth();
      }
      return false;
    });
  }, []);

  const isThisMonth = (date: Date) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    return (
      targetDate.getFullYear() === currentDate.getFullYear() &&
      targetDate.getMonth() === currentDate.getMonth()
    );
  };

  useEffect(() => {
    if (filteredUserList && filteredUserList.length > 0) {
      
      const measurementsLastMonth = hasMeasurementLastMonth(filteredUserList);

      setHasMeasurements( measurementsLastMonth);
    }
  }, [filteredUserList, hasMeasurementThisMonth, hasMeasurementLastMonth]);
  
  const svgClass = `circulars-chart pink ${hasMeasurements ? 'has-measurements' : ''}`;
  const tickOrCross = hasMeasurements ? '\u2713' : '\u2717';
  const textClass = hasMeasurements ? 'green-text' : 'red-text';

  const lastMonthName = useCallback(() => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const currentDate = new Date();
    const lastMonthIndex = (currentDate.getMonth() === 0) ? 11 : currentDate.getMonth() - 1;
    return months[lastMonthIndex];
  }, []);

  return (
    <>
      <div className="chart-info-wrapper">
        <div className="posicionarCaja2">

        
        <h2 id="userTotal">Medición del mes anterior</h2>
        <span>{hasMeasurements ? `Mediciones del mes de ${lastMonthName()} almacenadas correctamente.` : `Aún no se cargaron las mediciones del mes de ${lastMonthName()}`}</span>
        <div id="divisorImportante1"></div>
        </div>
      </div>
      <div className="chart-svg">
      <svg viewBox="0 0 36 36" className={svgClass}>
        <circle cx="18" cy="18" r="15.9155" className="circle-bg" fill="none" />
        <path
          className="circle"
          strokeDasharray={`100, 100`}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        
        <text x="18" y="20.35" className={`percentage ${textClass}`}>
          {tickOrCross}
        </text>
      </svg>
    
      
      </div>
      
    </>
  );
};

export default MedicionDelMes;
