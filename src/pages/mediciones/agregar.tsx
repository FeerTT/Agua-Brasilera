// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { crearMedicion } from "@/redux/actions/action";

// const AgregarMedicion: React.FC = () => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     usuarioId: 0, // Número inicial
//     consumoDelMes: 0, // Número inicial
//     consumoDelMesAnterior: 0, // Número inicial
//     valorFijo: 0, // Número inicial
//     tarifaExcedente: 0, // Número inicial
//     totalAPagar: 0, // Número inicial
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     console.log(formData, "HOLALAÑALAA")
//   };


//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(crearMedicion(formData) as any);
    
//   };

//   return (
//     <div>
//       <h1>Agregar Nueva Medición</h1>
//       <form onSubmit={handleSubmit}>
//   <div>
//     <label htmlFor="usuarioId">Usuario ID:</label>
//     <input
//       type="text"
//       id="usuarioId"
//       name="usuarioId"
//       value={formData.usuarioId}
//       onChange={handleChange}
//     />
//   </div>

//   <div>
//     <label htmlFor="consumoDelMes">Consumo del Mes:</label>
//     <input
//       type="text"
//       id="consumoDelMes"
//       name="consumoDelMes"
//       value={formData.consumoDelMes}
//       onChange={handleChange}
//     />
//   </div>
//   <div>
//     <label htmlFor="consumoDelMesAnterior">Consumo del Mes Anterior:</label>
//     <input
//       type="text"
//       id="consumoDelMesAnterior"
//       name="consumoDelMesAnterior"
//       value={formData.consumoDelMesAnterior}
//       onChange={handleChange}
//     />
//   </div>
//   <div>
//     <label htmlFor="valorFijo">Valor Fijo:</label>
//     <input
//       type="text"
//       id="valorFijo"
//       name="valorFijo"
//       value={formData.valorFijo}
//       onChange={handleChange}
//     />
//   </div>
//   <div>
//     <label htmlFor="tarifaExcedente">Tarifa por Excedente:</label>
//     <input
//       type="text"
//       id="tarifaExcedente"
//       name="tarifaExcedente"
//       value={formData.tarifaExcedente}
//       onChange={handleChange}
//     />
//   </div>
//   <div>
//     <label htmlFor="totalAPagar">Total a Pagar:</label>
//     <input
//       type="text"
//       id="totalAPagar"
//       name="totalAPagar"
//       value={formData.totalAPagar}
//       onChange={handleChange}
//     />
//   </div>
//   <div>
//     <button type="submit" onClick={handleSubmit}>Agregar Medición</button>
//   </div>
// </form>
//     <button onClick={handleSubmit}>enviar</button>
//     </div>
//   );
// };

// export default AgregarMedicion;