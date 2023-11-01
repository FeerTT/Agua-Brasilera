import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMediciones } from "@/redux/actions/action";

const Listado: React.FC = () => {
  const dispatch = useDispatch();
  const mediciones = useSelector(
    (state: any) => state.userReducer.medicionList
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selectedMediciones, setSelectedMediciones] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const truncateDate = (date: string) => {
    const fecha = new Date(date);
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
  };
  useEffect(() => {
    dispatch(getMediciones() as any);
  }, [dispatch]);

  const groupByDate = () => {
    const grouped: { [key: string]: any[] } = {};
    mediciones.forEach((medicion: any) => {
      const dateKey = truncateDate(medicion.mesActual); // Truncar la fecha
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(medicion);
    });
    return grouped;
  };

  const groupedMediciones = groupByDate();

  const showMedicionDetails = (date: string) => {
    const medicionesForDate = groupedMediciones[date];
    setSelectedMediciones(medicionesForDate || []);
    setSelectedDate(date);
    toggleModal();
  };

  const filterByDate = (date: string, name: string) => {
    return mediciones.filter((medicion: any) => {
      const fechaValid = !date || medicion.mesActual.includes(date);
      const nameValid =
        !name ||
        (medicion.usuario.nombre + " " + medicion.usuario.apellido)
          .toLowerCase()
          .includes(name.toLowerCase());
      return fechaValid && nameValid;
    });
  };

 

  const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedMediciones([]);
  };

  const filteredMediciones = selectedDate
    ? filterByDate(selectedDate, searchName)
    : mediciones;

  return (
    <div>
      <h1>Listado de Mediciones</h1>
      <label>
        Seleccionar Fecha:
        <input type="text" value={selectedDate} onChange={handleDateChange} />
      </label>
      <label>
        Buscar por Nombre o Apellido:
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
          {Object.keys(groupedMediciones)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((date: string, index: number) => (
              <tr key={index} onClick={() => showMedicionDetails(date)}>
                <td colSpan={9}>{date}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal-listado">
          <div className="modal-background-listado">
            <span className="close-listado" onClick={toggleModal}>
              &times;
            </span>
            <h2 className="medition-detail">
              Detalles de Mediciones para {selectedDate}
            </h2>
            <div className="table-container">
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
                  {selectedMediciones.map((medicion: any, index: number) => (
                    <tr key={index}>
                      <td>{medicion.usuario.id}</td>
                      <td>{medicion.usuario.nombre}</td>
                      <td>{medicion.usuario.apellido}</td>
                      <td>{truncateDate(medicion.mesActual)}</td>
                      <td>{medicion.consumoDelMes}</td>
                      <td>{medicion.consumoDelMesAnterior}</td>
                      <td>{medicion.valorFijo}</td>
                      <td>{medicion.tarifaExcedente}</td>
                      <td>{medicion.totalAPagar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listado;
