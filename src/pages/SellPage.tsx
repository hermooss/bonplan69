import React from 'react';
import { ArrowRightCircle } from 'lucide-react';
import SellerForm from '../components/sell/SellerForm';

const SellPage: React.FC = () => {
  return (
    <div className="py-8 bg-light">
      <div className="container-custom">
        <h1 className="page-title text-center">Vendre un produit</h1>
        
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-xl mb-6">
            Tu veux vendre ? Je rachète tout, même si t'es en Algérie !<br />
            Voitures, téléphones, or, appartements, etc.
          </p>
          
          <div className="bg-primary/5 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Comment ça marche ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-light font-bold mb-3">
                  1
                </div>
                <h3 className="font-medium mb-2">Remplissez le formulaire</h3>
                <p className="text-sm text-gray-600">
                  Décrivez votre produit avec tous les détails nécessaires
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-light font-bold mb-3">
                  2
                </div>
                <h3 className="font-medium mb-2">Je vous contacte</h3>
                <p className="text-sm text-gray-600">
                  Vous recevrez une réponse rapide par WhatsApp
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-light font-bold mb-3">
                  3
                </div>
                <h3 className="font-medium mb-2">On finalise la vente</h3>
                <p className="text-sm text-gray-600">
                  Si l'offre vous convient, on organise la vente
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary/10 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-3">
              <ArrowRightCircle className="text-secondary mt-1 flex-shrink-0" />
              <p className="text-left">
                <strong>Conseil :</strong> Plus votre description est détaillée et plus vous ajoutez de photos de qualité, 
                plus vous avez de chances de recevoir une réponse positive rapidement !
              </p>
            </div>
          </div>
        </div>
        
        {/* Seller Form */}
        <SellerForm />
      </div>
    </div>
  );
};

export default SellPage;