import { CreditCard, MapPin, Truck } from 'lucide-react';
import React, { useState } from 'react';

const WhyChooseUs: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const marketSchedule = [
    { day: 'Dimanche', location: 'Charpennes' },
    { day: 'Mardi & Jeudi', location: 'Gratte-Ciel' },
    { day: 'Mercredi & Samedi', location: 'Mas du Taureau (Vaulx-en-Velin)' },
  ];

  return (
    <section className="py-4 bg-light">
      <div className="container-custom">
        <h2 className="section-title text-center mb-2 text-base sm:text-lg">Pourquoi BonPlan ?</h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <MapPin size={16} className="text-primary" />
            Présent sur les marchés
          </div>
          <div className="flex items-center gap-1">
            <Truck size={16} className="text-primary" />
            Livraison à tout moment
          </div>
          <div className="flex items-center gap-1">
            <CreditCard size={16} className="text-primary" />
            Paiement flexible
          </div>
        </div>
        {!showMore && (
          <div className="flex justify-center mt-2">
            <button className="text-primary underline text-xs" onClick={() => setShowMore(true)}>En savoir plus</button>
          </div>
        )}
        {showMore && (
          <div className="mt-2 text-xs sm:text-sm animate-fade-in">
            <div className="mb-1 font-semibold">Marchés :</div>
            <ul className="mb-1">
              {marketSchedule.map((schedule, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-blue-900 font-medium mr-2">{schedule.day}:</span>
                  <span>{schedule.location}</span>
                </li>
              ))}
            </ul>
            <div className="mb-1"><b>Livraison :</b> France & Algérie, contactez-nous pour plus de détails.</div>
            <div><b>Paiement :</b> À la livraison ou via WhatsApp.</div>
            <button className="text-primary underline text-xs mt-2" onClick={() => setShowMore(false)}>Réduire</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;