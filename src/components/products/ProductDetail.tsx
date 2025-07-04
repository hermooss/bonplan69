import { ArrowLeft, ArrowRight, MapPin, ShoppingBag, X } from 'lucide-react';
import React, { useState } from 'react';
import { BasketDetails, CarDetails, ClothingDetails, PhoneDetails, Product } from '../../types';
import OrderForm from './OrderForm';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }: ProductDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showOrderForm, setShowOrderForm] = useState<boolean>(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex: number) => 
      product.images && product.images.length > 0 && prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex: number) => 
      product.images && product.images.length > 0 && prevIndex === 0 ? (product.images.length - 1) : prevIndex - 1
    );
  };

  const renderProductSpecificDetails = () => {
    if (!product.details) {
      return <div className="text-gray-500">Aucune caractéristique disponible</div>;
    }
    switch (product.category) {
      case 'baskets':
        const basketDetails = product.details as BasketDetails;
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Pointure</p>
                <p className="font-medium">{basketDetails.size}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Marque</p>
                <p className="font-medium">{basketDetails.brand}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">État</p>
                <p className="font-medium">{basketDetails.condition}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Quantité</p>
                <p className="font-medium">{basketDetails.quantity}</p>
              </div>
            </div>
          </>
        );
      case 'vetements':
        const clothingDetails = product.details as ClothingDetails;
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Taille</p>
                <p className="font-medium">{clothingDetails.size}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Marque</p>
                <p className="font-medium">{clothingDetails.brand}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Type</p>
                <p className="font-medium">{clothingDetails.type}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Couleur</p>
                <p className="font-medium">{clothingDetails.color}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">État</p>
                <p className="font-medium">{clothingDetails.condition}</p>
              </div>
            </div>
          </>
        );
      case 'voitures':
        const carDetails = product.details as CarDetails;
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Marque</p>
                <p className="font-medium">{carDetails.brand}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Modèle</p>
                <p className="font-medium">{carDetails.model}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Année</p>
                <p className="font-medium">{carDetails.year}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Kilométrage</p>
                <p className="font-medium">{carDetails.mileage.toLocaleString('fr-FR')} km</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Carburant</p>
                <p className="font-medium">{carDetails.fuel}</p>
              </div>
            </div>
          </>
        );
      case 'telephones':
        const phoneDetails = product.details as PhoneDetails;
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Marque</p>
                <p className="font-medium">{phoneDetails.brand}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Modèle</p>
                <p className="font-medium">{phoneDetails.model}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">État</p>
                <p className="font-medium">{phoneDetails.condition}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Stockage</p>
                <p className="font-medium">{phoneDetails.storage}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Couleur</p>
                <p className="font-medium">{phoneDetails.color}</p>
              </div>
            </div>
          </>
        );
      default:
        return (
          <div>
            <p className="text-gray-600 text-sm">État</p>
            <p className="font-medium">{(product.details as any)?.condition ?? 'Non spécifié'}</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex flex-col md:flex-row">
        {/* Product Images */}
        <div className="md:w-1/2 w-full relative">
          <div className="h-56 sm:h-72 md:h-full relative overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral text-primary">Aucune image</div>
            )}
            {product.images && product.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/80 text-secondary p-2 rounded-full hover:bg-primary transition-colors"
                  aria-label="Image précédente"
                >
                  <ArrowLeft size={20} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/80 text-secondary p-2 rounded-full hover:bg-primary transition-colors"
                  aria-label="Image suivante"
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}
          </div>
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex p-2 gap-2 overflow-x-auto">
              {product.images.map((image: string, index: number) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-12 w-12 flex-shrink-0 border-2 transition-colors rounded-md ${index === currentImageIndex ? 'border-accent' : 'border-transparent'}`}
                >
                  <img src={image} alt={`Miniature ${index + 1}`} className="h-full w-full object-cover rounded-md" />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Product Info */}
        <div className="p-4 sm:p-6 md:w-1/2 w-full flex flex-col">
          <div className="flex items-center mb-2 flex-wrap gap-2">
            <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            <div className="flex items-center text-xs text-neutral">
              <MapPin size={14} className="mr-1" />
              {product.location}
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2">{product.title}</h1>
          <p className="text-2xl sm:text-3xl font-bold text-accent mb-4">{product.price.toLocaleString('fr-FR')} €</p>
          <div className="mb-4">
            <h2 className="text-base sm:text-lg font-semibold mb-2">Description</h2>
            <p className="text-primary text-sm sm:text-base">{product.description}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-base sm:text-lg font-semibold mb-2">Tailles disponibles</h2>
            {product.sizes && product.sizes.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-2">
                {product.sizes.map(size => (
                  <span key={size} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs sm:text-sm font-medium">{size}</span>
                ))}
              </div>
            ) : (
              <div className="text-neutral">Aucune taille disponible</div>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-base sm:text-lg font-semibold mb-2">Caractéristiques</h2>
            {renderProductSpecificDetails()}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <button 
              onClick={() => setShowOrderForm(true)}
              className="btn btn-primary flex-1 flex items-center justify-center gap-2 text-base sm:text-lg"
            >
              <ShoppingBag size={18} />
              Commander
            </button>
            <a 
              href={`https://wa.me/33773622884?text=Bonjour, je suis intéressé par : ${product.title} (${product.price}€)`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline flex-1 text-center text-primary border-primary text-base sm:text-lg"
            >
              Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </div>
      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2 sm:px-4">
          <div className="bg-secondary rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Commander le produit</h2>
                <button 
                  onClick={() => setShowOrderForm(false)}
                  className="text-neutral hover:text-accent"
                >
                  <X size={20} />
                </button>
              </div>
              <OrderForm 
                product={product} 
                onClose={() => setShowOrderForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;