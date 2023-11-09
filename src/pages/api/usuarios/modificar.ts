import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    try {
      console.log('Comienzo de la función handler');
const userId = parseInt(req.query.id as string, 10);
console.log('Valor de userId después de la conversión:', userId);
      if (isNaN(userId)) {
        res.status(400).json({ error: 'ID de usuario no válido' });
        return;
      }

      // Obtener los datos del cuerpo de la solicitud
      const { nombre, apellido, telefono } = req.body;

      // Actualizar los datos del usuario en la base de datos utilizando Prisma
      const updatedUser = await prisma.usuario.update({
        where: { id: userId },
        data: {
          nombre,
          apellido,
          telefono,
        },
      });

      // Responder con los datos actualizados del usuario
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
      res.status(500).json({ error: 'Error al modificar el usuario' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' }); // Método no permitido (debe ser PUT)
  }
  await prisma.$disconnect();
}



