import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      await prisma.usuario.delete({
        where: { id },
      });

      res.status(204).end();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ error: 'No se pudo eliminar el usuario.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}