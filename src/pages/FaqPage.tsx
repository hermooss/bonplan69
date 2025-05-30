import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('general');
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const faqItems: FaqItem[] = [
    {
      category: 'general',
      question: 'Qu\'est-ce que BonPlan ?',
      answer: 'BonPlan est une plateforme de commerce en ligne qui connecte les acheteurs et les vendeurs en France et en Algérie. Nous proposons une large gamme de produits à des prix compétitifs.',
    },
    {
      category: 'general',
      question: 'Comment puis-je créer un compte ?',
      answer: 'Pour créer un compte, cliquez sur le bouton "Connexion" en haut à droite de la page, puis sur "Créer un compte". Remplissez le formulaire avec vos informations personnelles.',
    },
    {
      category: 'achats',
      question: 'Comment passer une commande ?',
      answer: 'Pour passer une commande, parcourez notre catalogue, sélectionnez les produits souhaités, ajoutez-les à votre panier et suivez les étapes de paiement.',
    },
    {
      category: 'achats',
      question: 'Quels moyens de paiement acceptez-vous ?',
      answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal, et les virements bancaires. Le paiement à la livraison est également disponible pour certaines commandes.',
    },
    {
      category: 'livraison',
      question: 'Quels sont les délais de livraison ?',
      answer: 'Les délais de livraison varient entre 2 et 5 jours ouvrés en France métropolitaine, et 5 à 10 jours ouvrés pour l\'Algérie.',
    },
    {
      category: 'livraison',
      question: 'Quels sont les frais de livraison ?',
      answer: 'Les frais de livraison sont calculés en fonction du poids et de la destination. La livraison est gratuite pour toute commande supérieure à 50€ en France métropolitaine.',
    },
    {
      category: 'retours',
      question: 'Comment retourner un produit ?',
      answer: 'Pour retourner un produit, contactez notre service client dans les 14 jours suivant la réception. Nous vous guiderons dans le processus de retour.',
    },
    {
      category: 'retours',
      question: 'Quelle est votre politique de remboursement ?',
      answer: 'Les remboursements sont traités dans un délai de 5 à 10 jours ouvrés après réception du retour. Le montant est remboursé sur le moyen de paiement initial.',
    },
  ];

  const categories = [
    { id: 'general', label: 'Général' },
    { id: 'achats', label: 'Achats' },
    { id: 'livraison', label: 'Livraison' },
    { id: 'retours', label: 'Retours' },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = faqItems.filter(item => item.category === activeCategory);

  return (
    <div className="py-8 bg-light min-h-screen">
      <div className="container-custom">
        <h1 className="page-title">Questions fréquentes</h1>

        {/* Catégories */}
        <div className="bg-white rounded-lg shadow-card p-4 sm:p-6 mb-6">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {filteredFaqs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-card overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left"
              >
                <span className="text-sm sm:text-base font-medium text-primary">
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-primary transition-transform ${
                    openQuestions.includes(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openQuestions.includes(index) && (
                <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Section Contact */}
        <div className="mt-8 bg-white rounded-lg shadow-card p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-primary mb-4">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-4">
            Notre équipe est là pour vous aider. N'hésitez pas à nous contacter pour toute question supplémentaire.
          </p>
          <a
            href="/contact"
            className="btn btn-primary text-xs sm:text-sm"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
};

export default FaqPage; 