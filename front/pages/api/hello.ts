// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// Ir a buscar los datos a la base de datos mongo
import { connectToDatabase } from '../../../services/cron/lib/mongo.ts'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db  = await connectToDatabase()

  const data = await db
    .collection('app')
    .find({ 
      'Dolar': { $exists: true },
      'UF': { $exists: true }
    })
    .limit(20)
    .toArray()

  res.status(200).json(data)
}