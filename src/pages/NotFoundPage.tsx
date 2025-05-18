import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="py-16 bg-light min-h-[60vh] flex items-center">
      <div className="container-custom text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page non trouvée</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary flex items-center justify-center gap-2">
            <Home size={18} />
            Retour à l'accueil
          </Link>
          <Link to="/acheter" className="btn btn-outline flex items-center justify-center gap-2">
            <Search size={18} />
            Voir les produits
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;