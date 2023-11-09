import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';
// const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'PUT') {
      const userId = parseInt(req.query.id as string, 10);

      if (isNaN(userId)) {
        res.status(400).json({ error: 'ID de usuario no válido' });
        return;
      }

      const { nombre, apellido, telefono } = req.body;

      const updatedUser = await prisma.usuario.update({
        where: { id: userId },
        data: {
          nombre,
          apellido,
          telefono,
        },
      });

      res.status(200).json(updatedUser);
    } else if (req.method === 'DELETE') {
      const userId = parseInt(req.query.id as string, 10);

      if (isNaN(userId)) {
        res.status(400).json({ error: 'ID de usuario no válido' });
        return;
      }

      const updatedUser = await prisma.usuario.update({
        where: { id: userId },
        data: {
          active: false,
        },
      });

      if (!updatedUser) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.status(200).json({ message: 'Usuario marcado como inactivo' });
    } else if (req.method === 'PATCH') {
      const userId = parseInt(req.query.id as string, 10);

      if (isNaN(userId)) {
        res.status(400).json({ error: 'ID de usuario no válido' });
        return;
      }

      const { active } = req.body;

      const updatedUser = await prisma.usuario.update({
        where: { id: userId },
        data: {
          active,
        },
      });

      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error('Error en la API:', error);
    res.status(500).json({ error: 'Error en la API' });
  }
  await prisma.$disconnect();
}