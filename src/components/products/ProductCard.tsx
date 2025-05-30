import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/produit/${product.id}`} className="card group overflow-hidden p-2 sm:p-4 flex flex-col h-full hover:scale-105 transition-transform">
      <div className="relative h-32 sm:h-48 overflow-hidden rounded-md mb-2 sm:mb-4">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {product.featured && (
          <div className="absolute top-0 right-0 bg-accent text-primary text-xs font-semibold py-1 px-2 sm:px-3 rounded-bl-lg">
            TENDANCE
          </div>
        )}
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="font-medium text-sm sm:text-lg mb-1 truncate text-primary">{product.title}</h3>
        
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs sm:text-sm text-neutral truncate flex-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
          <div className="flex items-center text-xs text-neutral ml-2">
            <span className="hidden sm:inline-block mr-1">📍</span>
            {product.location}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-neutral">
          <p className="font-bold text-accent text-base sm:text-lg">{product.price.toLocaleString('fr-FR')} €</p>
          {product.marketDays && product.marketDays.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {product.marketDays.map((day: string, idx: number) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-100">
                  {day}
                </span>
              ))}
            </div>
          )}
          <button className="btn btn-primary py-1 px-3 text-xs sm:text-sm">Voir détails</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;