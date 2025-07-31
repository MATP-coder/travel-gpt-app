import { useState } from 'react';
import { useRouter } from 'next/router';

interface FormValues {
  destination: string;
  startDate: string;
  endDate: string;
  persons: number;
  budget: string;
  interests: string;
  style: string;
  extras: string;
  email: string;
}

export default function HomePage() {
  const [values, setValues] = useState<FormValues>({
    destination: '',
    startDate: '',
    endDate: '',
    persons: 1,
    budget: 'mittel',
    interests: '',
    style: '',
    extras: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error('Fehler beim Generieren des Plans');
      }
      const data = await res.json();
      if (typeof window !== 'undefined') {
        localStorage.setItem('reiseplan', JSON.stringify(data.plan));
      }
      await router.push('/result');
    } catch (err) {
      alert((err as any).message ?? 'Es ist ein Fehler aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">AI‑Reiseplaner</h1>
      <p className="mb-8 text-center text-gray-600">
        Gib deine Reisedaten ein und erhalte einen maßgeschneiderten Reiseplan.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Ziel(e)</label>
          <input
            type="text"
            name="destination"
            value={values.destination}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Startdatum</label>
            <input
              type="date"
              name="startDate"
              value={values.startDate}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Enddatum</label>
            <input
              type="date"
              name="endDate"
              value={values.endDate}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Personen</label>
            <input
              type="number"
              name="persons"
              min="1"
              value={values.persons}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Budget</label>
            <select
              name="budget"
              value={values.budget}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="niedrig">Niedrig</option>
              <option value="mittel">Mittel</option>
              <option value="hoch">Hoch</option>
              <option value="luxus">Luxus</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Interessen (kommagetrennt)</label>
          <input
            type="text"
            name="interests"
            value={values.interests}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Reisestil</label>
          <input
            type="text"
            name="style"
            value={values.style}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Besondere Wünsche</label>
          <textarea
            name="extras"
            value={values.extras}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Deine E‑Mail-Adresse</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white font-medium bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
        >
          {loading ? 'Generiere Plan…' : 'Reiseplan erstellen'}
        </button>
      </form>
    </div>
  );
}
