import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const usuarios = await prisma.usuario.findMany();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      res.status(500).json({ error: 'No se pudo obtener la lista de usuarios.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}