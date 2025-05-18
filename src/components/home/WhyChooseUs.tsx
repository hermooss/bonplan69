import { CreditCard, MapPin, Truck } from 'lucide-react';
import React from 'react';

const WhyChooseUs: React.FC = () => {
  const marketSchedule = [
    { day: 'Dimanche', location: 'Charpennes' },
    { day: 'Mardi & Jeudi', location: 'Gratte-Ciel' },
    { day: 'Mercredi & Samedi', location: 'Mas du Taureau (Vaulx-en-Velin)' },
  ];

  return (
    <section className="py-12 bg-light">
      <div className="container-custom">
        <h2 className="section-title text-center mb-10">Pourquoi BonPlan ?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Market Presence */}
          <div className="card p-6">
            <div className="mb-6 flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <MapPin size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Présent sur les marchés</h3>
            </div>
            
            <ul className="space-y-3">
              {marketSchedule.map((schedule, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-secondary font-medium mr-3">{schedule.day}:</span>
                  <span>{schedule.location}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Delivery and Payment */}
          <div className="flex flex-col gap-4 h-full">
            <div className="card p-6 flex-1">
              <div className="mb-4 flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Truck size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Livraison à tout moment</h3>
              </div>
              <p>Service de livraison disponible dans toute la France et même en Algérie. Contactez-nous pour plus de détails.</p>
            </div>
            
            <div className="card p-6 flex-1">
              <div className="mb-4 flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <CreditCard size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Paiement flexible</h3>
              </div>
              <p>Paiement à la livraison ou via contact WhatsApp. Simple, sécurisé et adapté à vos besoins.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;