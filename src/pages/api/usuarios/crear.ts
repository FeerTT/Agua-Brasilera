import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'POST') {
      try {
        const { nombre, apellido, telefono } = req.body;
  
        const nuevoUsuario = await prisma.usuario.create({
          data: {
            nombre,
            apellido,
            telefono,
          },
        });
  
        res.status(201).json(nuevoUsuario);
      } catch (error) {
        console.error('Error al crear un nuevo usuario:', error);
        res.status(500).json({ error: 'No se pudo crear el usuario.' });
      }
    } else {
      res.status(405).json({ error: 'Método no permitido.' });
    }
  }