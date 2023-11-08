import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === "PUT"){
        try{
            const { medicionId, totalAPagar } = req.body; 
            const updatedMedicion = await prisma.medicion.update({
              where: {
                id: medicionId,
              },
              data: {
                totalAPagar: totalAPagar,
              },
            });
      
            res.status(200).json(updatedMedicion);
        }catch(error){
            res.status(500).json({ error: "Error al actualizar el total a pagar" });
        }
    }else {
        res.status(405).json({ error: "Método no permitido" });
      }
}