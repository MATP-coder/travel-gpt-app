import { useEffect, useState } from 'react';
import PlanDisplay from '../components/PlanDisplay';
import ChatBox from '../components/ChatBox';
import type { Reiseplan } from '../utils/schema';

export default function ResultPage() {
  const [plan, setPlan] = useState<Reiseplan | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('reiseplan');
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Reiseplan;
          setPlan(parsed);
        } catch {
          setPlan(null);
        }
      }
    }
  }, []);

  const handleSend = async (message: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Vielen Dank für dein Feedback! Wir haben deinen Plan aktualisiert.');
      }, 1000);
    });
  };

  if (!plan) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <p>Kein Reiseplan gefunden. Bitte kehre zur Startseite zurück.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Dein Reiseplan</h1>
      <PlanDisplay plan={plan} />
      <div>
        <h2 className="text-2xl font-semibold mb-2">Feedback geben</h2>
        <ChatBox onSend={handleSend} />
      </div>
    </div>
  );
}
