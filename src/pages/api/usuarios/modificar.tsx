import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    try {
      const { id, nombre, apellido, telefono } = req.body;

      const usuarioActualizado = await prisma.usuario.update({
        where: { id },
        data: {
          nombre,
          apellido,
          telefono,
        },
      });

      res.status(200).json(usuarioActualizado);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ error: 'No se pudo actualizar el usuario.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}