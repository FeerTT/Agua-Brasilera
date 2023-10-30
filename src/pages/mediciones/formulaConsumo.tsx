import React, { useEffect, useState } from 'react';


function UserForm({ user, onResultsCalculated, valorFijoGlobal, tarifaPorExcedenteGlobal }: any) {
  const [formData, setFormData] = useState<any>({
    usuarioId: user.id,
    consumoDelMesAnterior: user.ultimaMedicion ? user.ultimaMedicion.consumoDelMes : 0,
    consumoDelMes: 0,
    valorFijoGlobal: valorFijoGlobal !== 0 ? valorFijoGlobal : 0,
    tarifaPorExcedenteGlobal: tarifaPorExcedenteGlobal !== 0 ? tarifaPorExcedenteGlobal : 0,
    excedenteEnLitros: 0,
    totalAPagar: 0,
  });

  const handleCalculationClick = (event: any) => {
    event.preventDefault();
    const { consumoDelMes, consumoDelMesAnterior } = formData;
    const consumoActual = parseInt(consumoDelMes);
  
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
    console.log("Los valores de Valor Fijo y Tarifa por Excedente no pueden ser 0.");
  }

    setFormData((prevData:any) => ({
      ...prevData,
      excedenteEnLitros,
      totalAPagar,
      consumoDelMes,
    }));

    const { usuarioId, } = formData;
    onResultsCalculated({ usuarioId, excedenteEnLitros, totalAPagar, consumoDelMes });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Consumo del Mes"
        name="consumoDelMes"
        value={formData.consumoDelMes}
        onChange={handleInputChange}
        onBlur={handleCalculationClick}
      />
    </div>
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