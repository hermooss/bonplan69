import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/produit/${product.id}`} className="card group overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {product.featured && (
          <div className="absolute top-0 right-0 bg-secondary text-primary text-xs font-semibold py-1 px-3">
            TENDANCE
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 truncate">{product.title}</h3>
        
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600 truncate flex-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
          <div className="flex items-center text-xs text-gray-500">
            <MapPin size={12} className="mr-1" />
            {product.location}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-light-gray">
          <p className="font-bold text-primary">{product.price.toLocaleString('fr-FR')} €</p>
          <button className="btn btn-primary py-1 px-3 text-sm">Voir détails</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;