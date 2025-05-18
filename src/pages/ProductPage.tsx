import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import ProductDetail from '../components/products/ProductDetail';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Find the product
    const foundProduct = products.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products (same category but not the same product)
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 3);
      
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="py-12 container-custom">
        <div className="text-center bg-white rounded-lg shadow-card py-12 px-4">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <p className="mb-6">Le produit que vous recherchez n'existe pas ou a été retiré.</p>
          <Link to="/acheter" className="btn btn-primary">
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-light">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour
          </button>
        </div>
        
        {/* Product Detail */}
        <ProductDetail product={product} />
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center mb-6">
              <Tag size={20} className="mr-2 text-secondary" />
              <h2 className="section-title mb-0">Produits similaires</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id} 
                  to={`/produit/${relatedProduct.id}`}
                  className="card group overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedProduct.images[0]} 
                      alt={relatedProduct.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2 truncate">{relatedProduct.title}</h3>
                    <p className="font-bold text-primary">{relatedProduct.price.toLocaleString('fr-FR')} €</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;