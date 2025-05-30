import { collection, getDocs } from 'firebase/firestore';
import { ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { Product } from '../../types';
import ProductCard from '../products/ProductCard';

const FeaturedProducts: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      const featured = products.filter(p => p.featured);
      setFeaturedProducts(featured);
      setIsLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 bg-light-gray/30">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">Bonnes affaires du jour</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

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