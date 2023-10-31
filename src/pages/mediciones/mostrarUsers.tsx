
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Listado from "../users/list"
import { crearMedicion, getUsers, } from '@/redux/actions/action';
import { useDispatch } from 'react-redux';
import UserForm from './formulaConsumo';
import { eliminarTodasLasMediciones } from '@/redux/actions/action';




const ComponenteDondeMostrarUsuarios = () => {
  const userList = useSelector((state: any) => state.userReducer.userList);
  const dispatch = useDispatch();
  const [valorFijoGlobal, setValorFijoGlobal] = useState(0);
  const [tarifaPorExcedenteGlobal, setTarifaPorExcedenteGlobal] = useState(0);
    const onDelete = () => {
      dispatch(eliminarTodasLasMediciones() as any);
    }

useEffect(() => {
  dispatch(getUsers() as any);
  }, []);
//consumo del mes se resta de consumo del mes anterior, si es menos de 10k paga el valor fijo, si es > 10k paga por cada 1000 litros se le suma la tarifa por excedente
const [resultados, setResultados] = useState<any[]>([]);
const [userFormDataList, setUserFormDataList] = useState<Array<{
  usuarioId: number,
  consumoDelMes: number,
  consumoDelMesAnterior: number,
  tarifaExcedente: number,
  totalAPagar: number,
  valorFijo: number
}>>([]);



const handleResultsCalculated = (results:any) => {
    setResultados((prevResultados) => [...prevResultados, results] as any);
  };
  
  const handleGenerateArray = () => {
    const generatedArray = userList.map((user:any, index:any) => ({
      usuarioId: user.id,
      consumoDelMes: resultados[index] ? resultados[index].consumoDelMes : 0,
      consumoDelMesAnterior: user.ultimaMedicion ? user.ultimaMedicion.consumoDelMes: 0,
      tarifaExcedente: tarifaPorExcedenteGlobal !== 0 ? tarifaPorExcedenteGlobal : 0,
      totalAPagar: resultados[index] ? resultados[index].totalAPagar : 0,
      valorFijo: valorFijoGlobal !== 0 ? valorFijoGlobal : 0,
    }));
    setUserFormDataList((prevUserFormDataList) => [
      ...prevUserFormDataList,
      ...generatedArray,
    ]);
    dispatch(crearMedicion(generatedArray) as any);
  };

  return (
    <div>
      <div className='divisorInputs'>
        <h1>Cargar Medición</h1>
    <p><strong>VALOR FIJO PARA LOS 10.000 LITROS INICIALES:</strong></p>
    <input
        type="number"
        placeholder="Valor Fijo"
        value={valorFijoGlobal}
        onChange={(e) => setValorFijoGlobal(e.target.value as any)}
      />
      <p><strong>VALOR EXCEDENTE CADA 1000 LITROS:</strong></p>
      <input
        type="number"
        placeholder="Tarifa por Excedente"
        value={tarifaPorExcedenteGlobal}
        onChange={(e) => setTarifaPorExcedenteGlobal(e.target.value as any)}
      />
      </div>
    
    <form>
      <table className='rwd-table'>
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
{userList.map((user:any) => (
  <tr key={user.id}>
    <td>{user.id}</td>
    <td>{user.nombre} ,{user.apellido} </td>
    <td>
          <UserForm user={user}   valorFijoGlobal={valorFijoGlobal} tarifaPorExcedenteGlobal={tarifaPorExcedenteGlobal} onResultsCalculated={handleResultsCalculated}/>
              </td>
    {user.ultimaMedicion ? (
                <>
                  <td>{user.ultimaMedicion.consumoDelMes}</td>
                </>
              ) : (
                <>
                  <td>0</td>
                  </>)}
                  <td>{valorFijoGlobal}</td>
                  <td>{tarifaPorExcedenteGlobal}</td>
                  
                  <td>
  {resultados
    .filter((resultado:any) => resultado.usuarioId === user.id)
    .map((resultado:any, index:any, array:any) => {
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
    .filter((resultado:any) => resultado.usuarioId === user.id)
    .map((resultado:any, index:any, array:any) => {
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

    <div className='divButtonFinal'>
       <button className='buttonCrear' onClick={handleGenerateArray}>Generar Mediciones</button>
       <button onClick={onDelete}>eliminar mediciones</button>
    </div>
  </div>
  );
};

export default ComponenteDondeMostrarUsuarios;