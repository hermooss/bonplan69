import { addDoc, collection } from 'firebase/firestore';
import { Mail, MapPin, Phone } from 'lucide-react';
import React, { useState } from 'react';
import { db } from '../firebase';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...formData,
        createdAt: new Date(),
      });
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="py-8 bg-light min-h-screen">
      <div className="container-custom">
        <h1 className="page-title">Contactez-nous</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informations de contact */}
          <div className="bg-white rounded-lg shadow-card p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-primary mb-4">Nos coordonnées</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-primary">Téléphone</h3>
                  <p className="text-xs sm:text-sm text-gray-600">+33 6 XX XX XX XX</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-primary">Email</h3>
                  <p className="text-xs sm:text-sm text-gray-600">contact@bonplan.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-primary">Adresse</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    123 Rue du Commerce<br />
                    75001 Paris, France
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm sm:text-base font-medium text-primary mb-2">Horaires d'ouverture</h3>
              <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                <p>Lundi - Vendredi: 9h00 - 18h00</p>
                <p>Samedi: 10h00 - 16h00</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white rounded-lg shadow-card p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-primary mb-4">Envoyez-nous un message</h2>
            
            {isSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-success/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Message envoyé !</h3>
                <p className="text-gray-600 mb-4">Nous vous répondrons dans les plus brefs délais.</p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="btn btn-primary text-xs sm:text-sm"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-primary mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field text-xs sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-primary mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field text-xs sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-primary mb-1">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field text-xs sm:text-sm"
                    required
                  >
                    <option value="">Sélectionner un sujet</option>
                    <option value="question">Question générale</option>
                    <option value="support">Support technique</option>
                    <option value="partnership">Partenariat</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-primary mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field text-xs sm:text-sm min-h-[120px]"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full text-xs sm:text-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 