import { Search, ShoppingBag } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
      <div className="container-custom relative z-10 py-10 md:py-20 px-2 sm:px-4">
        <div className="max-w-xl animate-fade-in">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 font-montserrat leading-tight">
            Achète tout. Vends tout. <span className="text-accent">Facilement.</span>
          </h1>
          <p className="text-base sm:text-lg text-secondary mb-8">
            Livraison rapide à Lyon, partout en France et même en Algérie.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/acheter" className="btn btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 text-base sm:text-lg">
              <Search size={18} />
              Voir les produits
            </Link>
            <Link to="/vendre" className="btn btn-outline w-full sm:w-auto text-secondary border-secondary flex items-center justify-center gap-2 text-base sm:text-lg">
              <ShoppingBag size={18} />
              Proposer un produit à vendre
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;