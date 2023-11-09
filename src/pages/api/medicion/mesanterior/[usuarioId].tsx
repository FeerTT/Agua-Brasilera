
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma/prisma";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
          const {usuarioId} = req.query // Obtén el valor del parámetro de consulta "usuarioId"
          console.log(usuarioId, "----- usuario id");
          if (usuarioId) {
            const medicionMesAnterior = await prisma.medicion.findFirst({
              where: {
                usuarioId: parseInt(usuarioId as any), // Asegúrate de convertirlo a número
              },
              orderBy: {
                mesActual: "desc", // Ordena por fecha en orden descendente (último mes primero)
              },
            });
      
            if (medicionMesAnterior) {
              res.json({ consumoMesAnterior: medicionMesAnterior.consumoDelMes });
            } else {
              res.status(404).json({ error: "Consumo del mes anterior no encontrado" });
            }
          } else {
            res.status(400).json({ error: "El parámetro 'usuarioId' es requerido" });
          }
        } catch (error) {
          console.error("Error al obtener el consumo del mes anterior:", error);
          res.status(500).json({ error: "Error del servidor" });
        }
      }
      await prisma.$disconnect();
}