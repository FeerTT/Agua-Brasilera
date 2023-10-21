import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const mediciones = await prisma.medicion.findMany({
        include: {
          usuario: true, // Esto incluirá todos los campos del usuario relacionado
        },
      });
      res.status(200).send(mediciones);
    } catch (error) {
      console.error("Error al cargar mediciones:", error);
      res
        .status(500)
        .json({ error: "No se pudo cargar las mediciones" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido." });
  }
}