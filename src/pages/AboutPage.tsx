import React from 'react';
import { MessageCircle, Truck, Calendar, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  const marketSchedule = [
    { day: 'Dimanche', location: 'Charpennes' },
    { day: 'Mardi & Jeudi', location: 'Gratte-Ciel' },
    { day: 'Mercredi & Samedi', location: 'Mas du Taureau (Vaulx-en-Velin)' },
  ];

  return (
    <div className="py-8 bg-light">
      <div className="container-custom">
        <h1 className="page-title text-center">À Propos de BonPan</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-card p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center mb-8">
              <div className="w-48 h-48 bg-primary rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.pexels.com/photos/6169740/pexels-photo-6169740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Propriétaire de BonPan" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-3">Bienvenue sur BonPan</h2>
                <p className="text-gray-700 mb-4">
                  Je suis vendeur basé à Lyon, présent chaque semaine sur différents marchés dans la région lyonnaise. 
                  BonPan est ma marketplace personnelle qui me permet de proposer mes produits en ligne et d'acheter 
                  les vôtres.
                </p>
                <p className="text-gray-700">
                  Que vous soyez en France ou en Algérie, je vous propose un service de qualité pour 
                  vendre ou acheter facilement toutes sortes de produits.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-light-gray rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <Calendar size={20} className="text-secondary mr-3" />
                  <h3 className="text-lg font-semibold">Présence sur les marchés</h3>
                </div>
                
                <ul className="space-y-3">
                  {marketSchedule.map((schedule, index) => (
                    <li key={index} className="flex items-start">
                      <MapPin size={16} className="text-primary mr-2 mt-1" />
                      <div>
                        <span className="font-medium">{schedule.day}:</span> {schedule.location}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border border-light-gray rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <Truck size={20} className="text-secondary mr-3" />
                  <h3 className="text-lg font-semibold">Service de livraison</h3>
                </div>
                
                <p className="mb-3">
                  Je livre partout en France et même en Algérie.
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> 
                    Livraison à domicile
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> 
                    Remise en main propre à Lyon
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> 
                    Service de livraison en Algérie
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-primary rounded-lg shadow-card p-6 md:p-8 text-light">
            <div className="flex items-center mb-6">
              <MessageCircle size={24} className="text-secondary mr-3" />
              <h3 className="text-xl font-semibold">Contactez-moi</h3>
            </div>
            
            <p className="mb-6">
              Pour toute question, commande, ou proposition de vente, n'hésitez pas à me contacter 
              directement par WhatsApp ou par email.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="https://wa.me/33773622884"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 transition-colors rounded-lg p-4 text-center text-white"
              >
                WhatsApp: +33 7 73 62 28 84
              </a>
              
              <a 
                href="mailto:contact@bonpan.fr"
                className="bg-secondary hover:bg-secondary-light transition-colors rounded-lg p-4 text-center text-primary"
              >
                Email: contact@bonpan.fr
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;