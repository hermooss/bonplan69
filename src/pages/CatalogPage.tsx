import { collection, getDocs } from 'firebase/firestore';
import { Filter, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { db } from '../firebase';
import { Product, ProductCategory } from '../types';

const categories: { id: ProductCategory; name: string }[] = [
  { id: 'baskets', name: 'Baskets' },
  { id: 'vetements', name: 'Vêtements' },
  { id: 'voitures', name: 'Voitures' },
  { id: 'telephones', name: 'Téléphones' },
  { id: 'autres', name: 'Autres objets' }
];

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const categoryFilter = searchParams.get('category') as ProductCategory | null;
  const locationFilter = searchParams.get('location') as 'France' | 'Algérie' | null;
  const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : null;
  const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : null;
  
  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(productsData);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);
  
  // Filter products when params change
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Filter by location
    if (locationFilter) {
      result = result.filter(product => product.location === locationFilter);
    }
    
    // Filter by min price
    if (minPrice !== null) {
      result = result.filter(product => product.price >= minPrice);
    }
    
    // Filter by max price
    if (maxPrice !== null) {
      result = result.filter(product => product.price <= maxPrice);
    }
    
    setFilteredProducts(result);
  }, [products, categoryFilter, locationFilter, minPrice, maxPrice]);
  
  const handleCategoryChange = (category: ProductCategory | null) => {
    if (category) {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };
  
  const handleLocationChange = (location: 'France' | 'Algérie' | null) => {
    if (location) {
      searchParams.set('location', location);
    } else {
      searchParams.delete('location');
    }
    setSearchParams(searchParams);
  };
  
  const handlePriceChange = (min: number | null, max: number | null) => {
    if (min !== null) {
      searchParams.set('minPrice', min.toString());
    } else {
      searchParams.delete('minPrice');
    }
    
    if (max !== null) {
      searchParams.set('maxPrice', max.toString());
    } else {
      searchParams.delete('maxPrice');
    }
    
    setSearchParams(searchParams);
  };
  
  const resetFilters = () => {
    setSearchParams({});
  };
  
  const hasActiveFilters = categoryFilter || locationFilter || minPrice || maxPrice;
  
  return (
    <div className="py-8 bg-light">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6">
          <h1 className="page-title mb-0">Catalogue</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden btn btn-outline flex items-center gap-2"
          >
            <Filter size={18} />
            Filtres
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Toggle */}
          <div
            className={`md:w-1/4 md:block ${showFilters ? 'block' : 'hidden'}`}
          >
            <div className="bg-white rounded-lg shadow-card p-4 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filtres</h2>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary hover:text-primary-dark underline"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Catégories</h3>
                <div className="space-y-1">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        checked={categoryFilter === category.id}
                        onChange={() => handleCategoryChange(category.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category.id}`} className="cursor-pointer">
                        {category.name}
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-none"
                      name="category"
                      checked={!categoryFilter}
                      onChange={() => handleCategoryChange(null)}
                      className="mr-2"
                    />
                    <label htmlFor="category-none" className="cursor-pointer">
                      Toutes les catégories
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Localisation</h3>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="location-france"
                      name="location"
                      checked={locationFilter === 'France'}
                      onChange={() => handleLocationChange('France')}
                      className="mr-2"
                    />
                    <label htmlFor="location-france" className="cursor-pointer">
                      France
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="location-algerie"
                      name="location"
                      checked={locationFilter === 'Algérie'}
                      onChange={() => handleLocationChange('Algérie')}
                      className="mr-2"
                    />
                    <label htmlFor="location-algerie" className="cursor-pointer">
                      Algérie
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="location-all"
                      name="location"
                      checked={!locationFilter}
                      onChange={() => handleLocationChange(null)}
                      className="mr-2"
                    />
                    <label htmlFor="location-all" className="cursor-pointer">
                      Toutes les localisations
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Price Filter */}
              <div>
                <h3 className="font-medium mb-2">Prix (€)</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice || ''}
                    onChange={(e) => handlePriceChange(e.target.value ? parseInt(e.target.value) : null, maxPrice)}
                    className="input-field w-1/2"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice || ''}
                    onChange={(e) => handlePriceChange(minPrice, e.target.value ? parseInt(e.target.value) : null)}
                    className="input-field w-1/2"
                  />
                </div>
                
                <button
                  onClick={() => handlePriceChange(minPrice, maxPrice)}
                  className="btn btn-primary w-full text-sm py-1"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
          
          {/* Product List */}
          <div className="md:w-3/4">
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categoryFilter && (
                  <span className="bg-primary text-light px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {categories.find(c => c.id === categoryFilter)?.name}
                    <button onClick={() => handleCategoryChange(null)}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {locationFilter && (
                  <span className="bg-primary text-light px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {locationFilter}
                    <button onClick={() => handleLocationChange(null)}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {(minPrice !== null || maxPrice !== null) && (
                  <span className="bg-primary text-light px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    Prix: {minPrice !== null ? `${minPrice}€` : '0€'} - {maxPrice !== null ? `${maxPrice}€` : '∞'}
                    <button onClick={() => handlePriceChange(null, null)}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                <button
                  onClick={resetFilters}
                  className="text-primary hover:text-primary-dark text-sm underline"
                >
                  Effacer tous les filtres
                </button>
              </div>
            )}
            
            {/* Results count */}
            <p className="mb-6 text-gray-600">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-card">
                <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600 mb-4">
                  Aucun produit ne correspond à vos critères de recherche.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-primary"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;