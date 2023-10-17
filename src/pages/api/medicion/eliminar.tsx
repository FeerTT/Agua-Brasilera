import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){if (req.method === 'DELETE') {
    const { id } = req.query; // Suponemos que esperas el ID de la medición en la URL

    if (!id) {
      res.status(400).json({ error: "Falta el ID en la solicitud." });
      return;
    }

    try {
      // Utiliza Prisma para eliminar la medición con el ID especificado
      await prisma.medicion.delete({
        where: { id: Number(id) } // Convierte el ID a número si es necesario
      });

      res.status(201).end("Registro eliminado correctamente"); // 204 significa "No Content" (éxito sin respuesta)
    } catch (error) {
      console.error("Error al eliminar la medición:", error);
      res.status(500).json({ error: "No se pudo eliminar la medición" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido." });
  }}
