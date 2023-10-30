import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){if (req.method === 'DELETE') {
  try {
    // Utiliza Prisma para eliminar todas las mediciones
    await prisma.medicion.deleteMany();

    res.status(204).end("Todas las mediciones han sido eliminadas correctamente"); // 204 significa "No Content" (éxito sin respuesta)
  } catch (error) {
    console.error("Error al eliminar todas las mediciones:", error);
    res.status(500).json({ error: "No se pudieron eliminar todas las mediciones" });
  }
} else {
  res.status(405).json({ error: "Método no permitido." });
}
}
