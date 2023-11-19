import React, { useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";


const MedicionDelMes: React.FC = () => {
  const filteredUserList = useSelector((state: any) => state.userReducer.filteredUserList);
  const [hasMeasurements, setHasMeasurements] = useState<boolean>(false);

  const hasMeasurementThisMonth = useCallback((users: any[]) => {
    return users.some((user: any) => {
        return user.ultimaMedicion && isThisMonth(new Date(user.ultimaMedicion.mesActual));
    });
}, []);

  const isThisMonth = (date: Date) => {
    const currentDate = new Date();
    return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
  };

  useEffect(() => {
    if (filteredUserList && filteredUserList.length > 0) {
      const measurementsExist = hasMeasurementThisMonth(filteredUserList);
      setHasMeasurements(measurementsExist);
      console.log(measurementsExist, "hola hola")
    }
  }, [filteredUserList, hasMeasurementThisMonth]);
  
  const svgClass = `circulars-chart pink ${hasMeasurements ? 'has-measurements' : ''}`;
  const tickOrCross = hasMeasurements ? '\u2713' : '\u2717';
  const textClass = hasMeasurements ? 'green-text' : 'red-text';
  return (
    <>
      <div className="chart-info-wrapper">
        <h2 id="userTotal">Medición del mes</h2>
        <span>{hasMeasurements ? 'Mediciones del mes cargadas correctamente' : 'Aún no tiene mediciones este mes'}</span>
        <div id="divisorImportante"></div>
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
