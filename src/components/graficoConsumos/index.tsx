import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  active: boolean;
  createdAt: string;
  ultimaMedicion?: {
    consumoDelMes: number;
    consumoDelMesAnterior: number;
    createdAt: string;
    id: number;
    mesActual: string;
    tarifaExcedente: number;
    totalAPagar: number;
    usuarioId: number;
    valorFijo: number;
  };
}

const GraficoConsumos: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const userList = useSelector((state: any) => state.userReducer.userList);

  useEffect(() => {
    if (chartRef.current) {
      const usuariosConMedicion = userList.filter((user: Usuario) => user.ultimaMedicion);
      const nombresUsuarios = usuariosConMedicion.map((user: Usuario) => `${user.nombre} ${user.apellido}`);
      const totalAPagarUsuarios = usuariosConMedicion.map((user: Usuario) => user.ultimaMedicion?.totalAPagar || 0);
      const fechasMedicion = usuariosConMedicion.map((user: Usuario) =>
        user.ultimaMedicion?.createdAt ? new Date(user.ultimaMedicion.createdAt).toLocaleDateString() : ''
      );
      const consumosMes = usuariosConMedicion.map((user: Usuario) => user.ultimaMedicion?.consumoDelMes || 0);

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
  
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: nombresUsuarios,
            datasets: [
              {
                label: 'Consumos en ARS',
                data: totalAPagarUsuarios,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context: any) {
                    const label = context.dataset.label || '';
                    const value = context.parsed.y || 0;
                    const fecha = fechasMedicion[context.dataIndex];
                    const totalAPagar = usuariosConMedicion[context.dataIndex].ultimaMedicion?.totalAPagar || 0;
                    const consumoUsuario = consumosMes[context.dataIndex];
                    return `${label}: $${value} - Fecha: ${fecha} - Ultima Medicion: ${consumoUsuario}`;
                  },
                },
              },
            },
          },
        });
      }
    }
  }, [userList]);

  return <canvas ref={chartRef} />;
};

export default GraficoConsumos;
// import React, { useEffect, useRef } from 'react';
// import Chart, { ChartOptions } from 'chart.js/auto';
// import { useSelector } from 'react-redux';

// interface Usuario {
//   id: number;
//   nombre: string;
//   apellido: string;
//   telefono: string;
//   active: boolean;
//   createdAt: string;
//   ultimaMedicion?: {
//     consumoDelMesAnterior: number;
//   };
// }


// const GraficoConsumos: React.FC = () => {
//   const chartRef = useRef<HTMLCanvasElement>(null);
//   const chartInstance = useRef<Chart | null>(null);
//   const userList = useSelector((state: any) => state.userReducer.userList);

//   useEffect(() => {
//     if (chartRef.current) {
//       const usuariosConMedicion = userList.filter((user: Usuario) => user.ultimaMedicion);
//       const nombresUsuarios = usuariosConMedicion.map((user: Usuario) => `${user.nombre} ${user.apellido}`);
//       const consumosMesAnterior = usuariosConMedicion.map((user: Usuario) => user.ultimaMedicion?.consumoDelMesAnterior || 0);

//       const ctx = chartRef.current.getContext('2d');
//       if (ctx) {
//         if (chartInstance.current) {
//           chartInstance.current.destroy();
//         }

//         chartInstance.current = new Chart(ctx, {
//           type: 'bar',
//           data: {
//             labels: nombresUsuarios,
//             datasets: [
//               {
//                 label: 'Consumo del Mes Anterior',
//                 data: consumosMesAnterior,
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//                 borderWidth: 1,
//               },
//             ],
//           },
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           },
//         });
//       }
//     }
//   }, [userList]);

//   return <canvas ref={chartRef} />;
// };

// export default GraficoConsumos;














//     const userList = useSelector((state: any) => state.userReducer.userList);
//   const usersWithMeasurements = userList.filter((user:any) => user.ultimaMedicion);
//   console.log(usersWithMeasurements,"console.log userwithmeasures") //FILTRA Y DEVUELVE UN ARRAY DE OBJETOS (USUARIOS CON ULTIMA MEDICION)
//   const consumosMesAnterior = usersWithMeasurements.map((user:any) => user.ultimaMedicion?.consumoDelMesAnterior || 0);
//   console.log(consumosMesAnterior, "CONSUMOS DEL MES ANTERIOR") //ME TRAE 1 SOLO ARRAY CON LOS VALORES DE CONSUMO DEL MES ANTERIOR DE CADA USER EN CADA POSICION DEL ARRAY
//   const nombresUsuarios = usersWithMeasurements.map((user:any) => `${user.nombre} ${user.apellido}`);
//    console.log(nombresUsuarios, "CONSOLE.LOG DE NOMBRES USUARIOS") //ME TRAE 1 SOLO ARRAY CON LOS NOMBRES DE LOS USUARIOS [0,1,2,3] QUE CONFORMAN LA TABLA DE LA MEDICION
   