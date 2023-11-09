import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const usuarios = await prisma.usuario.findMany();
      const ultimasMediciones = await Promise.all(
        usuarios.map(async (usuario) => {
          const ultimaMedicion = await prisma.medicion.findFirst({
            where: { usuarioId: usuario.id },
            orderBy: { mesActual: 'desc' }, 
          });
          return { ...usuario, ultimaMedicion };
        })
      );
      res.status(200).json(ultimasMediciones);
    } catch (error) {
      console.error('Error al obtener las últimas mediciones de usuarios:', error);
      res.status(500).json({ error: 'No se pudo obtener las últimas mediciones de usuarios.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
  await prisma.$disconnect();
}