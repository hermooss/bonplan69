import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { Product } from '../../types';
import ProductCard from '../products/ProductCard';

const PromotionsSection: React.FC = () => {
  const [promoProducts, setPromoProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPromoProducts = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      const promo = products.filter(p => p.promo);
      setPromoProducts(promo);
      setIsLoading(false);
    };
    fetchPromoProducts();
  }, []);

  return (
    <section className="py-8 bg-yellow-50">
      <div className="container-custom">
        <h2 className="section-title mb-4">Promotions</h2>
        {isLoading ? (
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
        ) : promoProducts.length === 0 ? (
          <div className="text-center text-gray-400 py-8">Aucune promotion en cours.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PromotionsSection;