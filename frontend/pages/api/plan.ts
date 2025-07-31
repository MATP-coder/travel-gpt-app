import type { NextApiRequest, NextApiResponse } from 'next';
import { generatePlan } from '../../../../backend/api/gpt-handler';
import { sendItineraryEmail } from '../../../../backend/api/sendMail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { destination, startDate, endDate, persons, budget, interests, style, extras, email } = req.body as {
      destination: string;
      startDate: string;
      endDate: string;
      persons: number;
      budget: string;
      interests?: string;
      style?: string;
      extras?: string;
      email: string;
    };

    const plan = await generatePlan({
      destination,
      startDate,
      endDate,
      persons: Number(persons),
      budget,
      interests,
      style,
      extras,
    });

    // Send itinerary via email if an address is provided
    if (email) {
      const html = `<h1>Dein AI‑Reiseplan</h1><pre>${JSON.stringify(plan, null, 2)}</pre>`;
      await sendItineraryEmail({ to: email, subject: 'Dein AI‑Reiseplan', html });
    }

    return res.status(200).json({ plan });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message || 'Interner Serverfehler' });
  }
}
