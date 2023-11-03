import React, { useState } from "react";

function UserForm({
  user,
  onResultsCalculated,
  valorFijoGlobal,
  tarifaPorExcedenteGlobal,
}: any) {
  const [formData, setFormData] = useState<any>({
    usuarioId: user.id,
    consumoDelMesAnterior: user.ultimaMedicion
      ? user.ultimaMedicion.consumoDelMesAnterior
      : 0,
    consumoDelMes: user.ultimaMedicion
      ? parseInt(user.ultimaMedicion.consumoDelMes)
      : 0,
    valorFijoGlobal: valorFijoGlobal !== 0 ? valorFijoGlobal : 0,
    tarifaPorExcedenteGlobal:
      tarifaPorExcedenteGlobal !== 0 ? tarifaPorExcedenteGlobal : 0,
    excedenteEnLitros: 0,
    totalAPagar: 0,
  });

  const handleCalculationClick = (event: any) => {
    event.preventDefault();
    const { consumoDelMes, consumoDelMesAnterior } = formData;
    const consumoActual = parseInt(consumoDelMes);
    if (consumoActual < consumoDelMesAnterior) {
      alert(
        "El consumo del mes actual no puede ser menor que el consumo del mes anterior."
      );
      return;
    }
    const excedenteEnLitros = consumoActual - consumoDelMesAnterior;
    let totalAPagar = valorFijoGlobal;

    if (valorFijoGlobal !== 0 && tarifaPorExcedenteGlobal !== 0) {
      if (excedenteEnLitros > 10) {
        const excedido = excedenteEnLitros - 10;
        const milesLitrosExcedente = Math.ceil(excedido / 1);
        const total = milesLitrosExcedente * Number(tarifaPorExcedenteGlobal);
        totalAPagar = Number(total) + Number(valorFijoGlobal);
      }
    } else {
      alert(
        "Los valores de Valor Fijo y Tarifa por Excedente no pueden ser 0."
      );
      return;
    }

    setFormData((prevData: any) => ({
      ...prevData,
      excedenteEnLitros,
      totalAPagar,
      consumoDelMes,
    }));
    console.log("en la formula, formData", formData);

    const { usuarioId } = formData;
    console.log(usuarioId);
    onResultsCalculated({
      usuarioId,
      excedenteEnLitros,
      totalAPagar,
      consumoDelMes,
      consumoDelMesAnterior,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value),
    });
  };

  return (
    <td>
      <input
        type="number"
        placeholder="Consumo del Mes"
        name="consumoDelMes"
        value={formData.consumoDelMes}
        onChange={handleInputChange}
        onBlur={handleCalculationClick}
      />
    </td>
  );
}

export default UserForm;

// function UserForm({ user, onResultsCalculated,  valorFijoGlobal, tarifaPorExcedenteGlobal, } : any) {

//    const [formData, setFormData] = useState({
//     usuarioId: user.id,
//     consumoDelMesAnterior: user.ultimaMedicion ? user.ultimaMedicion.consumoDelMes : 0,
//     consumoDelMes: 0,// Debes calcularlo si tienes los datos necesarios
//     valorFijoGlobal: valorFijoGlobal !== 0 ? valorFijoGlobal : 0, // Validación de valorFijoGlobal
//     tarifaPorExcedenteGlobal: tarifaPorExcedenteGlobal !== 0 ? tarifaPorExcedenteGlobal : 0, // Tarifa por excedente global
//     excedenteEnLitros: 0,
//     totalAPagar: 0, // Debes calcularlo en base a los datos del usuario
//   });

//   console.log (tarifaPorExcedenteGlobal, valorFijoGlobal, "1")
//   useEffect(() => {
//     const { consumoDelMes, consumoDelMesAnterior } = formData; // Quitamos valorFijoGlobal y tarifaPorExcedenteGlobal de aquí
//     console.log(tarifaPorExcedenteGlobal, valorFijoGlobal, "2")
//     const excedenteEnLitros = consumoDelMes - consumoDelMesAnterior;

//     let totalAPagar = 0;

//     if (valorFijoGlobal !== 0 && tarifaPorExcedenteGlobal !== 0) {
//       if (excedenteEnLitros <= 10000) {
//         totalAPagar = valorFijoGlobal;
//       } else {
//         const excedido = excedenteEnLitros - 10000;
//         const milesLitrosExcedente = Math.ceil(excedido / 1000);
//         const total = milesLitrosExcedente * tarifaPorExcedenteGlobal;
//         totalAPagar = Number(valorFijoGlobal) + Number(total);
//       }
//     } else {
//       console.log("Los valores no pueden ser 0.");
//     }

//     setFormData((prevData) => ({
//       ...prevData,
//       excedenteEnLitros,
//       totalAPagar,
//     }));

//   }, [formData.consumoDelMes, formData.consumoDelMesAnterior, valorFijoGlobal, tarifaPorExcedenteGlobal, ]);

//   const handleCalculationClick = (event:any) => {
//     event.preventDefault();
//     const { excedenteEnLitros, totalAPagar, usuarioId, consumoDelMes } = formData;
//     onResultsCalculated({ excedenteEnLitros, totalAPagar,usuarioId, consumoDelMes });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//       <input
//         type="number"
//         placeholder="Consumo del Mes"
//         name="consumoDelMes"
//         value={formData.consumoDelMes}
//         onChange={handleInputChange}
//         onBlur={handleCalculationClick}
//       />
//     {/* <button onClick={handleCalculationClick}>Confirmar</button> */}
//   </div>

//   );
// }

// export default UserForm;
