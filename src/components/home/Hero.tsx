import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-light mb-4 font-montserrat leading-tight">
            Achète tout. Vends tout. <span className="text-secondary">Facilement.</span>
          </h1>
          <p className="text-xl text-light-gray mb-8">
            Livraison rapide à Lyon, partout en France et même en Algérie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/acheter" className="btn btn-secondary flex items-center justify-center gap-2">
              <Search size={18} />
              Voir les produits
            </Link>
            <Link to="/vendre" className="btn btn-outline text-light border-light hover:bg-light hover:text-primary flex items-center justify-center gap-2">
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