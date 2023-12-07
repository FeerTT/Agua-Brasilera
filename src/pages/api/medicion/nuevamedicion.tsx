import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const medicionesData = req.body; // LLEGA COMO ARRAY DE OBJ
      const nuevasMediciones = [];
  
      for (const medicionData of medicionesData) {
        const {
          usuarioId,
          consumoDelMes,
          consumoDelMesAnterior,
          tarifaExcedente,
          totalAPagar,
          valorFijo,
        } = medicionData;
        // const fechaActual = new Date(); 
        // //FORMA DE HARDCODEAR FECHA new Date('2023-10-15T00:00:00Z') CAMBIAR VALORES
        // const fechaActualString =  fechaActual.toISOString();
        const fechaActual = new Date();
        fechaActual.setMonth(fechaActual.getMonth() - 1);

        const fechaModificada = fechaActual.toISOString();
        const consumoDelMesNum = consumoDelMes;
        const consumoDelMesAnteriorNum = parseInt(consumoDelMesAnterior);
        const tarifaExcedenteNum = parseInt(tarifaExcedente);
        const totalAPagarNum = parseInt(totalAPagar);
        const valorFijoNum = parseInt(valorFijo);
        const nuevaMedicion = await prisma.medicion.create({
          data: {
            usuario: {
              connect: {
                id: usuarioId,
              },
            },
            mesActual: fechaModificada, 
            consumoDelMes:consumoDelMesNum,
            consumoDelMesAnterior:consumoDelMesAnteriorNum,
            tarifaExcedente:tarifaExcedenteNum,
            totalAPagar:totalAPagarNum,
            valorFijo:valorFijoNum,
          },
        });
        nuevasMediciones.push(nuevaMedicion);
      }
  
      res.status(200).json(nuevasMediciones);
    } catch (error) {
      console.error("Error al cargar las mediciones:", error);
      res.status(500).json({ error: "No se pudieron cargar las mediciones" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido." });
  }
  await prisma.$disconnect();
}