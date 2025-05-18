import { Lock, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { ProductCategory } from '../types';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '' as ProductCategory,
    location: 'France',
    images: [] as string[]
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const imageURLs = filesArray.map(file => URL.createObjectURL(file));
      setNewProduct(prev => ({
        ...prev,
        images: [...prev.images, ...imageURLs].slice(0, 5)
      }));
    }
  };

  const removeImage = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('New product:', newProduct);
    // Reset form and close modal
    setNewProduct({
      title: '',
      description: '',
      price: '',
      category: '' as ProductCategory,
      location: 'France',
      images: []
    });
    setShowAddProduct(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="py-12 bg-light min-h-screen">
        <div className="container-custom max-w-md">
          <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Lock size={32} className="text-primary" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-6">Espace administrateur</h1>
            
            <form onSubmit={handleLogin}>
              {error && (
                <div className="bg-error/10 text-error p-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-light min-h-screen">
      <div className="container-custom">
        <h1 className="page-title">Panneau d'administration</h1>
        
        <div className="bg-white rounded-lg shadow-card mb-6">
          <div className="flex border-b border-light-gray overflow-x-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'products' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Produits
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'orders' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Commandes
            </button>
            <button
              onClick={() => setActiveTab('proposals')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'proposals' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Propositions de vente
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Gestion des produits</h2>
                <button 
                  onClick={() => setShowAddProduct(true)}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Plus size={18} />
                  Ajouter un produit
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-light-gray">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localisation</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-light-gray">
                    {/* Demo data */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-md object-cover" src="https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Nike Air Jordan 1 Mid</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Baskets</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">140 €</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">France</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark mr-3">Modifier</button>
                        <button className="text-error hover:text-error-dark">Supprimer</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Gestion des commandes</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-light-gray">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-light-gray">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Martin Dupont</div>
                        <div className="text-sm text-gray-500">+33 6 12 34 56 78</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Nike Air Jordan 1 Mid</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">140 €</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12/04/2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Confirmée
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark">Détails</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'proposals' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Propositions de vente reçues</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-light-gray">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix demandé</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-light-gray">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Ahmed Benzema</div>
                        <div className="text-sm text-gray-500">+33 7 11 22 33 44</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Baskets</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        Adidas Yeezy Boost 350 V2, taille 43, portées 2 fois
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">180 €</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14/04/2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark mr-2">Voir</button>
                        <button className="text-success hover:text-success-dark mr-2">Accepter</button>
                        <button className="text-error hover:text-error-dark">Refuser</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Ajouter un produit</h2>
                <button 
                  onClick={() => setShowAddProduct(false)}
                  className="text-gray-500 hover:text-primary"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleProductSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      className="input-field min-h-[100px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prix (€)
                    </label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catégorie
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value as ProductCategory})}
                      className="input-field"
                      required
                    >
                      <option value="">Sélectionner une catégorie</option>
                      <option value="baskets">Baskets</option>
                      <option value="vetements">Vêtements</option>
                      <option value="voitures">Voitures</option>
                      <option value="telephones">Téléphones</option>
                      <option value="autres">Autres</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Localisation
                    </label>
                    <select
                      value={newProduct.location}
                      onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                      className="input-field"
                      required
                    >
                      <option value="France">France</option>
                      <option value="Algérie">Algérie</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Images (1 à 5)
                    </label>
                    <div className="flex flex-wrap gap-3 mb-3">
                      {newProduct.images.map((image, index) => (
                        <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                          <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      
                      {newProduct.images.length < 5 && (
                        <label className="w-24 h-24 border-2 border-dashed border-light-gray rounded flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                          <Plus size={20} className="mb-1" />
                          <span className="text-xs">Ajouter</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            multiple={newProduct.images.length === 0}
                          />
                        </label>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {newProduct.images.length}/5 images (formats acceptés: JPG, PNG)
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="btn btn-outline"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Ajouter le produit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;