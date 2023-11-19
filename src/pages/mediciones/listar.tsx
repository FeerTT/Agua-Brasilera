import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMediciones, updateTotal } from "@/redux/actions/action";
import generatePDF from "../mediciones/pdf";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import Image from "next/image";


const Listado: React.FC = () => {
  const dispatch = useDispatch();
  const mediciones = useSelector(
    (state: any) => state.userReducer.medicionList
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMediciones, setSelectedMediciones] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Agrega el estado currentPage
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTotalAPagar, setEditedTotalAPagar] = useState(0);
  const usersPerPage = 10;

  const handleSave = (medicionid: number) => {
    dispatch(updateTotal(medicionid, editedTotalAPagar) as any);
    setEditingIndex(-1); // Volver a -1 para finalizar la edición
    window.location.reload();
  };

  const handleEdit = (
    index: number, //! revisar objetivo del index, creo que no se usa.
    totalAPagar: number
  ) => {
    setEditingIndex(index);
    setEditedTotalAPagar(totalAPagar);
  };

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setEditingIndex(-1);
  };

  const truncateDate = (date: string) => {
    const fecha = new Date(date);
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
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
  const getTotalRecaudado = () => {
    let total = 0;
    selectedMediciones.forEach((medicion: any) => {
      total += medicion.totalAPagar;
    });
    return total;
  };

  const groupedMediciones = groupByDate();

  const showMedicionDetails = (date: string) => {
    const medicionesForDate = groupedMediciones[date] || [];
    setSelectedMediciones(medicionesForDate);
    setSelectedDate(date);
    setCurrentPage(0);
    toggleModal();
  };

  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = selectedMediciones.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  return (
    <div>
      <h1 className="h1Provisorio">Listado de Mediciones</h1>
      <div className="contenedorListar">
        <Link href="/mediciones">
        <Image
          className="regresarImg"
          src="/devolver.png"
          width={60}
          height={60}
          alt="Agregar Usuario"
          title="Regresar"
        />
        </Link>
      </div>

      <table className="rwd-table">
        <thead>
          <tr className="trTable">
            <th>Fecha</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedMediciones)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((date: string, index: number) => (
              <tr
                className="trTable"
                key={index}
                onClick={() => showMedicionDetails(date)}
              >
                <td>{date}</td>
                <td>

                  <button className="botonGeneraPdf" onClick={() => generatePDF(selectedDate, selectedMediciones)}>

                    <div className="imagenPdf" title="Descargar PDF"></div>
                  </button>
                </td>
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
            <p>Recaudación este mes: ${getTotalRecaudado()}</p>
            <div className="table-container">
              <table className="rwd-table">
                <thead>
                  <tr className="trTable">
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Mes</th>
                    <th>Consumo del Mes</th>
                    <th>Consumo del Mes Anterior</th>
                    <th>Valor 10.000lts Iniciales</th>
                    <th>Tarifa por Excedente</th>
                    <th>Consumo</th>
                    <th>Total a Pagar</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((medicion: any, index: number) => (
                    <tr className="hover-effect" key={index}>
                      <td className="text-align-left">{medicion.usuario.id}</td>
                      <td className="text-align-left">{medicion.usuario.nombre}</td>
                      <td className="text-align-left">{medicion.usuario.apellido}</td>
                      <td>{truncateDate(medicion.mesActual)}</td>
                      <td>{medicion.consumoDelMes}</td>
                      <td>{medicion.consumoDelMesAnterior}</td>
                      <td>${medicion.valorFijo}</td>
                      <td>${medicion.tarifaExcedente}</td>
                      <td>
                        {medicion.consumoDelMes -
                          medicion.consumoDelMesAnterior}
                      </td>
                      <td>
                        {index === editingIndex ? (
                          <input
                            type="number"
                            value={editedTotalAPagar}
                            onChange={(e) =>
                              setEditedTotalAPagar(Number(e.target.value))
                            }
                          />
                        ) : (
                          `$${medicion.totalAPagar}`
                        )}
                      </td>
                      <td>
                        {index === editingIndex ? (
                          <button
                            onClick={() => handleSave(medicion.id)}
                          >
                            Guardar
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleEdit(
                                index,
                                medicion.totalAPagar
                              )
                            }
                          >
                            Editar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ReactPaginate
              previousLabel={""}
              nextLabel={""}
              breakLabel={"..."}
              pageCount={Math.ceil(selectedMediciones.length / usersPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              className={"pages pagination"}
              activeClassName={"active"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Listado;
