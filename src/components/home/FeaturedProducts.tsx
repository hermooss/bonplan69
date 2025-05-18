import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';

const FeaturedProducts: React.FC = () => {
  // Get only featured products
  const featuredProducts = products.filter(p => p.featured);

  return (
    <section className="py-12 bg-light-gray/30">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title mb-0">Bonnes affaires du jour</h2>
          <Link 
            to="/acheter" 
            className="flex items-center text-secondary hover:text-secondary-dark transition-colors font-medium"
          >
            Voir tout <ChevronRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;