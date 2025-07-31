import React from 'react';
import type { Reiseplan } from '../utils/schema';

interface Props {
  plan: Reiseplan;
}

const PlanDisplay: React.FC<Props> = ({ plan }) => {
  return (
    <div className="space-y-8">
      {plan.tagesplan.map((day) => (
        <div key={day.tag} className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">
            Tag {day.tag} – {day.datum}
          </h3>
          <p className="mb-4 text-gray-700">{day.beschreibung}</p>
          {day.aktivitaeten.length > 0 && (
            <div className="mb-2">
              <h4 className="font-medium">Aktivitäten</h4>
              <ul className="list-disc list-inside">
                {day.aktivitaeten.map((act, index) => (
                  <li key={index} className="mb-1">
                    <span className="font-semibold">{act.titel}:</span> {act.beschreibung}{' '}
                    {act.affiliateLink && (
                      <a
                        href={act.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline ml-1"
                      >
                        Link
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {day.restaurant && (
            <p className="mt-2">
              <span className="font-medium">Restaurant:</span> {day.restaurant}
            </p>
          )}
          {day.bemerkung && (
            <p className="mt-2 italic text-sm text-gray-500">{day.bemerkung}</p>
          )}
        </div>
      ))}
      {plan.tipps && plan.tipps.length > 0 && (
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Tipps</h3>
          <ul className="list-disc list-inside">
            {plan.tipps.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlanDisplay;
