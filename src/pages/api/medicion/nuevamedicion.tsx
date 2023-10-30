import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const medicionesData = req.body; // Arreglo de objetos con datos de mediciones
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
        const fechaActual = new Date();
        const fechaActualString =  fechaActual.toISOString().split('T')[0];
        const consumoDelMesNum = parseInt(consumoDelMes);
      const consumoDelMesAnteriorNum = parseInt(consumoDelMesAnterior);
      const tarifaExcedenteNum = parseInt(tarifaExcedente);
      const totalAPagarNum = parseInt(totalAPagar);
      const valorFijoNum = parseInt(valorFijo);
        const nuevaMedicion = await prisma.medicion.create({
          data: {
            usuario: {
              connect: {
                id: usuarioId, // Asociar la medición al usuario
              },
            },
            mesActual: fechaActualString, // Fecha actual
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
}