
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Listado from "../users/list";
import { crearMedicion, getUsers } from "@/redux/actions/action";
import { useDispatch } from "react-redux";
import UserForm from "./formulaConsumo";
import { eliminarTodasLasMediciones } from "@/redux/actions/action";
import ReactPaginate from "react-paginate";


const ComponenteDondeMostrarUsuarios = () => {
  const userList = useSelector((state: any) => state.userReducer.userList);
  const dispatch = useDispatch();
  const [valorFijoGlobal, setValorFijoGlobal] = useState(0);
  const [tarifaPorExcedenteGlobal, setTarifaPorExcedenteGlobal] = useState(0);

  const [errorValorFijo, setErrorValorFijo] = useState("");
  const [errorTarifa, setErrorTarifa] = useState("");

  const onDelete = () => {
    dispatch(eliminarTodasLasMediciones() as any);
  };

  const [currentPage, setCurrentPage] = useState(0); // Página actual seleccionada
  const usersPerPage = 12; // Cantidad de usuarios por página

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
  const [resultados, setResultados] = useState<any[]>([]);
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


  const handleResultsCalculated = (results: any) => {
    setResultados((prevResultados) => [...prevResultados, results] as any);
  };


  const handleGenerateArray = (e: any) => {
    e.preventDefault();
    let error = false;
    if (
      (!valorFijoGlobal ||
        valorFijoGlobal === 0 ||
        isNaN(Number(valorFijoGlobal))) &&
      (!tarifaPorExcedenteGlobal ||
        tarifaPorExcedenteGlobal === 0 ||
        isNaN(Number(tarifaPorExcedenteGlobal)))
    ) {
      setErrorValorFijo("Debe ingresar un valor numérico");
      setErrorTarifa("Debe ingresar un valor numérico");
      error = true;
    } else if (
      !valorFijoGlobal ||
      valorFijoGlobal === 0 ||
      isNaN(Number(valorFijoGlobal))
    ) {
      setErrorValorFijo("Debe ingresar un valor numérico");
      setErrorTarifa("");
      error = true;
    } else if (
      !tarifaPorExcedenteGlobal ||
      tarifaPorExcedenteGlobal === 0 ||
      isNaN(Number(tarifaPorExcedenteGlobal))
    ) {
      setErrorValorFijo("");
      setErrorTarifa("Debe ingresar un valor numérico");
      error = true;
    } else {
      setErrorValorFijo("");
      setErrorTarifa("");
    }
    if (error) {
      return;
    }
    const generatedArray = userList.map((user: any, index: any) => ({
      usuarioId: user.id,
      consumoDelMes: resultados[index] ? resultados[index].consumoDelMes : 0,
      consumoDelMesAnterior: user.ultimaMedicion
        ? user.ultimaMedicion.consumoDelMes
        : 0,
      tarifaExcedente:
        tarifaPorExcedenteGlobal !== 0 ? tarifaPorExcedenteGlobal : 0,

      totalAPagar: resultados[index] ? resultados[index].totalAPagar : 0,
      valorFijo: valorFijoGlobal !== 0 ? valorFijoGlobal : 0,
    }));
    setUserFormDataList((prevUserFormDataList) => [
      ...prevUserFormDataList,
      ...generatedArray,
    ]);
    console.log("arrsasss", generatedArray)
    dispatch(crearMedicion(generatedArray) as any);
  };


  return (
    <div>
      <div className="divisorInputs">
        <h1>Cargar Medición</h1>
        <p>
          <strong>VALOR FIJO PARA LOS 10.000 LITROS INICIALES:</strong>
        </p>
        <input
          type="text"
          placeholder="Valor Fijo"
          value={valorFijoGlobal}
          onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(Number(value))) {
              setValorFijoGlobal(value as any);
              setErrorValorFijo("");
            } else {
              setErrorValorFijo("Debe ingresar un valor numérico");
            }
          }}
        />
        {errorValorFijo && <p style={{ color: "red" }}>{errorValorFijo}</p>}
        <p>
          <strong>VALOR EXCEDENTE CADA 1000 LITROS:</strong>
        </p>
        <input
          type="text"
          placeholder="Tarifa por Excedente"
          value={tarifaPorExcedenteGlobal}
          onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(Number(value))) {
              setTarifaPorExcedenteGlobal(value as any);
              setErrorTarifa("");
            } else {
              setErrorTarifa("Debe ingresar un valor numérico");
            }
          }}
        />
        {errorTarifa && <p style={{ color: "red" }}>{errorTarifa}</p>}
      </div>
      <form>
        <table className="rwd-table">
          <thead>
            <tr>
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
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
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
                {user.ultimaMedicion ? (
                  <>
                    <td>{user.ultimaMedicion.consumoDelMes}</td>
                  </>
                ) : (
                  <>
                    <td>0</td>
                  </>
                )}
                <td>{valorFijoGlobal}</td>
                <td>{tarifaPorExcedenteGlobal}</td>

                <td>
                  {resultados
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
                  {resultados
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
      <div className="divButtonFinal">
        <button className="buttonCrear" onClick={(e) => handleGenerateArray(e)}>
          Generar Mediciones
        </button>
        <button onClick={onDelete}>eliminar mediciones</button>
      </div>
    </div>
  );
};

export default ComponenteDondeMostrarUsuarios;
