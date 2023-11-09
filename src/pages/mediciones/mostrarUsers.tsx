import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Listado from "../users/list";
import {
  crearMedicion,
  getUsers,
} from "@/redux/actions/action";
import { useDispatch } from "react-redux";
import UserForm from "./formulaConsumo";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import Modal from "@/components/modalConfirmacion";

const ComponenteDondeMostrarUsuarios = () => {
  const userList = useSelector((state: any) => state.userReducer.filteredUserList);
  const dispatch = useDispatch();
  const [valorFijoGlobal, setValorFijoGlobal] = useState(0);
  const [tarifaPorExcedenteGlobal, setTarifaPorExcedenteGlobal] = useState(0);
  const [errorValorFijo, setErrorValorFijo] = useState("");
  const [errorTarifa, setErrorTarifa] = useState("");
  const [userFormDataList, setUserFormDataList] = useState<
    Array<{
      usuarioId: number;
      consumoDelMes: number;
      consumoDelMesAnterior: number;
      tarifaExcedente: number;
      totalAPagar: number;
      valorFijo: number;
    }>[]
  >([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); 
  const usersPerPage = 5;
    const handleCloseModal = () => {
      setModalAbierto(false)
    }

  const handlePageClick = (data: any) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  // Filtrar la lista de usuarios para la página actual
  const paginatedUsers = userList.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );


  useEffect(() => {
    dispatch(getUsers() as any);
  }, []);
  //consumo del mes se resta de consumo del mes anterior, si es menos de 10k paga el valor fijo, si es > 10k paga por cada 1000 litros se le suma la tarifa por excedente

  const handleResultsCalculated = (results: any) => {
    setUserFormDataList((prevList: any) => {
      // Verificar si el usuario ya está en la lista, para actualizar sus resultados
      const existingUserIndex = prevList.findIndex(
        (item: any) => item.usuarioId === results.usuarioId
      );
      if (existingUserIndex !== -1) {
        const updatedList = [...prevList];
        updatedList[existingUserIndex] = {
          ...updatedList[existingUserIndex],
          totalAPagar: results.totalAPagar,
          consumoDelMes: results.consumoDelMes,
          consumoDelMesAnterior: results.consumoDelMesAnterior,
          valorFijo: valorFijoGlobal,
          tarifaExcedente: tarifaPorExcedenteGlobal,
          excedenteEnLitros: results.excedenteEnLitros,
          // ... otros campos que se deban actualizar con los resultados
        };
        return updatedList;
      } else {
        // Si no existe, añadir un nuevo elemento a la lista
        return [
          ...prevList,
          {
            usuarioId: results.usuarioId,
            totalAPagar: results.totalAPagar,
            consumoDelMes: results.consumoDelMes,
            consumoDelMesAnterior: results.consumoDelMesAnterior,
            valorFijo: valorFijoGlobal,
            tarifaExcedente: tarifaPorExcedenteGlobal,
            excedenteEnLitros: results.excedenteEnLitros,
            // ... otros campos que se deban agregar con los resultados
          },
        ];
      }
    });
    console.log(userList);
  };

  const handleGenerateArray = (e: any) => {
    e.preventDefault();
    if (
      !valorFijoGlobal ||
      isNaN(Number(valorFijoGlobal)) ||
      valorFijoGlobal === 0
    ) {
      setErrorValorFijo("Este campo es obligatorio y no puede quedar vacio.");
      setErrorTarifa("");
      return;
    }

    if (
      !tarifaPorExcedenteGlobal ||
      isNaN(Number(tarifaPorExcedenteGlobal)) ||
      tarifaPorExcedenteGlobal === 0
    ) {
      setErrorValorFijo("");
      setErrorTarifa("Este campo es obligatorio y no puede quedar vacio.");
      
      return;
    }

    setErrorValorFijo("");
    setErrorTarifa("");
    // const someUnfilledConsumption = userList.some((user: any) => {
    //   return resultados.every((result) => result.usuarioId !== user.id) || !user.ultimaMedicion;
    // });

    // if (someUnfilledConsumption) {
    //   alert("Ups! Parece que falta calcular el total a pagar de algunos usuarios.");
    //   return;
    // }

    if (userFormDataList.length < userList.length) {
      alert(
        "Ups! Parece que falta calcular el total a pagar de algunos usuarios."
      );
      return;
    }
    console.log("el array que se crea", userFormDataList);
    dispatch(crearMedicion(userFormDataList as any) as any);
    setModalAbierto(true)
    setUserFormDataList([]);
    

  
    // window.location.reload();
  };
  console.log(userFormDataList, "CORROBORACIÓN");

  return (
    <div className="controladorMostrarUserApp">
      
      <div className="divisorInputs">
        <h1>Cargar Medición</h1>
        <p>
          <strong>VALOR FIJO PARA LOS 10.000 LITROS INICIALES:</strong>
        </p>
        <input
          className="inputConsumoMes"
          type="text"
          placeholder="Valor Fijo"
          value={valorFijoGlobal}
          onChange={(e) => {
            const value = e.target.value;
            const parseValue = parseInt(value);
            if (!isNaN(Number(value))) {
              setValorFijoGlobal(parseValue as any);
              setErrorValorFijo("");
            } else {
              setErrorValorFijo("Solo se pueden ingresar valores númericos.");
            }
          }}
        />
        {errorValorFijo && <p style={{ color: "red" }}>{errorValorFijo}</p>}
        <p>
          <strong>VALOR EXCEDENTE CADA 1000 LITROS:</strong>
        </p>
        <input
          className="inputConsumoMes"
          type="text"
          placeholder="Tarifa por Excedente"
          value={tarifaPorExcedenteGlobal}
          onChange={(e) => {
            const value = e.target.value;
            const parseValue = parseInt(value);
            if (!isNaN(Number(value))) {
              setTarifaPorExcedenteGlobal(parseValue as any);
              setErrorTarifa("");
            } else {
              setErrorTarifa("Solo se pueden ingresar valores númericos.");
            }
          }}
        />
        {errorTarifa && <p style={{ color: "red" }}>{errorTarifa}</p>}
      </div>
      <Link href="/mediciones">
      <img className='regresarImg1' src="/devolver.png" alt="Agregar Usuario" title="Regresar" />
          
          </Link>
      <form>
        <table className="rwd-table">
          <thead>
            <tr className="trTable">
              <th>ID</th>
              <th>Nombre y apellido</th>
              <th>Consumo del Mes</th>
              <th>Consumo del Mes Anterior</th>
              <th>Valor Fijo hasta 10.000L</th>
              <th>Tarifa por Excedente: </th>
              <th>Excedente:</th>

              <th>Total a Pagar</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user: any) => (
              <tr className="hover-effect" key={user.id}>
                <td>{user.id}</td>
                <td className="text-align-left">
                  {user.apellido}, {user.nombre}{" "}
                </td>
                <td>
                  <UserForm
                    user={user}
                    valorFijoGlobal={valorFijoGlobal}
                    tarifaPorExcedenteGlobal={tarifaPorExcedenteGlobal}
                    onResultsCalculated={handleResultsCalculated}
                  />
                </td>


                <td>{user.ultimaMedicion ? user.ultimaMedicion.consumoDelMesAnterior: 0} </td>


                <td>{valorFijoGlobal}</td>
                <td>{tarifaPorExcedenteGlobal}</td>

                <td>
                  {userFormDataList
                    .filter((resultado: any) => resultado.usuarioId === user.id)
                    .map((resultado: any, index: any, array: any) => {
                      if (index === array.length - 1) {
                        return (
                          <div key={index}>
                            <td>{resultado.excedenteEnLitros}</td>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                </td>
                <td>
                  {userFormDataList
                    .filter((resultado: any) => resultado.usuarioId === user.id)
                    .map((resultado: any, index: any, array: any) => {
                      if (index === array.length - 1) {
                        return (
                          <div key={index}>
                            <td>{resultado.totalAPagar}</td>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel={"..."}
        pageCount={Math.ceil(userList.length / usersPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        className={"pages pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
      />
      <div>
      <div className="divButtonFinal">
        <button className="buttonCrear" onClick={handleGenerateArray}>
          Generar Mediciones
        </button>
        
      </div>

      {modalAbierto && (
         <Modal isOpen={modalAbierto}  />
      )}
    </div>
    
    </div>
  );
};

export default ComponenteDondeMostrarUsuarios;
