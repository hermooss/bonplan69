import { Calendar, MapPin, MessageCircle, Truck } from 'lucide-react';
import React from 'react';

const AboutPage: React.FC = () => {
  const marketSchedule = [
    { day: 'Dimanche', location: 'Charpennes' },
    { day: 'Mardi & Jeudi', location: 'Gratte-Ciel' },
    { day: 'Mercredi & Samedi', location: 'Mas du Taureau (Vaulx-en-Velin)' },
  ];

  return (
    <div className="py-8 bg-light min-h-screen">
      <div className="container-custom">
        <h1 className="page-title">À Propos de BonPlan</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-card p-4 sm:p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 items-center mb-6 sm:mb-8">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-primary/10 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.pexels.com/photos/6169740/pexels-photo-6169740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Propriétaire de BonPlan" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-2 sm:mb-3">Bienvenue sur BonPlan</h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Je suis vendeur basé à Lyon, présent chaque semaine sur différents marchés dans la région lyonnaise. 
                  BonPlan est ma marketplace personnelle qui me permet de proposer mes produits en ligne et d'acheter 
                  les vôtres.
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Que vous soyez en France ou en Algérie, je vous propose un service de qualité pour 
                  vendre ou acheter facilement toutes sortes de produits.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white border border-light-gray rounded-lg p-4 sm:p-5">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                    <Calendar size={20} className="text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-primary">Présence sur les marchés</h3>
                </div>
                
                <ul className="space-y-2 sm:space-y-3">
                  {marketSchedule.map((schedule, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                        <MapPin size={14} className="text-primary" />
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        <span className="font-medium text-primary">{schedule.day}:</span> {schedule.location}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white border border-light-gray rounded-lg p-4 sm:p-5">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                    <Truck size={20} className="text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-primary">Service de livraison</h3>
                </div>
                
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  Je livre partout en France et même en Algérie.
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                      <span className="text-primary text-xs">•</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">Livraison à domicile</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                      <span className="text-primary text-xs">•</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">Remise en main propre à Lyon</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                      <span className="text-primary text-xs">•</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">Service de livraison en Algérie</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-primary rounded-lg shadow-card p-4 sm:p-6 md:p-8">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                <MessageCircle size={20} className="text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Contactez-moi</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-white/90 mb-4 sm:mb-6">
              Pour toute question, commande, ou proposition de vente, n'hésitez pas à me contacter 
              directement par WhatsApp ou par email.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <a 
                href="https://wa.me/33773622884"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 transition-colors rounded-lg p-3 sm:p-4 text-center text-white text-xs sm:text-sm font-medium"
              >
                WhatsApp: +33 7 73 62 28 84
              </a>
              
              <a 
                href="mailto:willy691931@gmail.com"
                className="bg-white/10 hover:bg-white/20 transition-colors rounded-lg p-3 sm:p-4 text-center text-white text-xs sm:text-sm font-medium"
              >
                Email: willy691931@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;