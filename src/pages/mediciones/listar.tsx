import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { getMediciones } from "@/redux/actions/action";

const Listado: React.FC = () => {
  const dispatch = useDispatch();
  const mediciones = useSelector((state: any) => state.userReducer.medicionList);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchName, setSearchName] = useState("");

  
  useEffect(() => {
    dispatch(getMediciones() as any);
  }, [dispatch]);


  const sortByDate = () => {
    const sorted = [...mediciones].sort((a, b) => {
      return new Date(b.mesActual).getTime() - new Date(a.mesActual).getTime();
    });
    return sorted;
  };



  const filterByDate = (date:string, name:string) => {
    return mediciones.filter((medicion:any) => {
      const fechaValid = !date || medicion.mesActual.includes(date);
      const nameValid = !name || (medicion.usuario.nombre + ' ' + medicion.usuario.apellido).toLowerCase().includes(name.toLowerCase());
      return fechaValid && nameValid;
    });
  };
  const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const filteredMediciones = selectedDate ? filterByDate(selectedDate, searchName) : mediciones;



  return (
    <div>
      {" "}
      <h1>Listado de Mediciones</h1>
      <label>Seleccionar Fecha: 
        <input type="text" value={selectedDate} onChange={handleDateChange} />
      </label>
      <label>Buscar por Nombre o Apellido:
        <input type="text" value={searchName} onChange={handleNameSearch} />
      </label>
      <table className="rwd-table">
      
  <thead>
    <tr>

      <th>ID</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Mes</th>
      <th>Consumo del Mes</th>
      <th>Consumo del Mes Anterior</th>
      <th>Valor Fijo</th>
      <th>Tarifa por Excedente</th>
      <th>Total a Pagar</th>
    </tr>
  </thead>
  <tbody>
  {filterByDate(selectedDate, searchName).map((medicion: any, index: number) => (
  <tr key={index}>
    <td>{medicion.usuario.id}</td>
    <td>{medicion.usuario.nombre}</td>
    <td>{medicion.usuario.apellido}</td>
    <td>{medicion.mesActual}</td> {/* Muestra la fecha siempre */}
    <td>{medicion.consumoDelMes}</td>
    <td>{medicion.consumoDelMesAnterior}</td>
    <td>{medicion.valorFijo}</td>
    <td>{medicion.tarifaExcedente}</td>
    <td>{medicion.totalAPagar}</td>
    <br></br>
  </tr>
))}
</tbody>
</table>
    </div>
  );
};

export default Listado;
