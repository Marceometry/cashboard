import { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log('This is a cron job')

  res.status(200).send('Cron job executed successfully')
}
