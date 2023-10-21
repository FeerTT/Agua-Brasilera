import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        usuarioId,
        mesActual,
        consumoDelMes,
        consumoDelMesAnterior,
        tarifaExcedente,
        totalAPagar,
        valorFijo,
      } = req.body;
      const nuevaMedicion = await prisma.medicion.create({
        data: {
          usuarioId,
          mesActual,
          consumoDelMes,
          consumoDelMesAnterior,
          tarifaExcedente,
          totalAPagar,
          valorFijo,
        },
      });
      res.status(201).json(nuevaMedicion);
    } catch (error) {
      console.error("Error al cargar primera medicion:", error);
      res
        .status(500)
        .json({ error: "No se pudo cargar las primeras mediciones" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido." });
  }
}
