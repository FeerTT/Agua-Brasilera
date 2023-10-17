import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { getMediciones } from "@/redux/actions/action";


const Listado: React.FC = () => {
  const dispatch = useDispatch();
  const mediciones = useSelector((state: any) => state.userReducer.medicionList);
  
  useEffect(() => {
    dispatch(getMediciones());
  }, []);
  const medicionesOrdenadas = mediciones.sort((a, b) => {
    // Función para convertir "MM/YY" a un valor numérico que se pueda ordenar
    const convertirFecha = (fecha: string) => {
      const [mes, año] = fecha.split("/").map(Number);
      return año * 100 + mes;
    };

    // Comparar las fechas convertidas
    return convertirFecha(b.mesActual) - convertirFecha(a.mesActual);
  });
  return (
    <div>
      {" "}
      <h1>Listado de Mediciones</h1>
      {medicionesOrdenadas.map((medicion, index) => (
        <div key={index}>
          <h2>Mes: {medicion.mesActual}</h2>
          <h3>{medicion.usuario.nombre}</h3>
          <h3>{medicion.usuario.apellido}</h3>
          <h3>{medicion.usuario.id}</h3>
          <p>Consumo del mes: {medicion.consumoDelMes}</p>
          <p>Consumo del mes anterior: {medicion.consumoDelMesAnterior}</p>
          <p>Valor fjo: {medicion.valorFijo}</p>
          <p>Tarifa por excedente: {medicion.tarifaExcedente}</p>
          <p>Total a pagar: {medicion.totalAPagar}</p>
        </div>
      ))}
    </div>
  );
};

export default Listado;
