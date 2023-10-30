// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'GET') {
//     try {
//       const usuarios = await prisma.usuario.findMany();
//       res.status(200).json(usuarios);
//     } catch (error) {
//       console.error('Error al obtener la lista de usuarios:', error);
//       res.status(500).json({ error: 'No se pudo obtener la lista de usuarios.' });
//     }
//   } else {
//     res.status(405).json({ error: 'Método no permitido.' });
//   }
// }
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
      const ultimasMediciones = await Promise.all(
        usuarios.map(async (usuario) => {
          const ultimaMedicion = await prisma.medicion.findFirst({
            where: { usuarioId: usuario.id },
            orderBy: { mesActual: 'desc' }, // Ordenar por la fecha más reciente
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
}