import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { CheckCircle, Edit, Lock, MessageCircle, Plus, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { ProductCategory } from '../types';

// Toast notification
const Toast: React.FC<{ message: string; onClick?: () => void; onClose: () => void }> = ({ message, onClick, onClose }) => (
  <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in cursor-pointer" onClick={onClick}>
    <span>{message}</span>
    <button onClick={e => { e.stopPropagation(); onClose(); }} className="ml-2 text-white/80 hover:text-white"><X size={18} /></button>
  </div>
);

interface ProductData {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  location: string;
  images: string[];
  createdAt: Date;
  sizes?: string[];
  promo: boolean;
}

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
    images: [] as string[],
    sizes: [] as string[],
    promo: false,
  });
  const [products, setProducts] = useState<ProductData[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [orderDetails, setOrderDetails] = useState<any | null>(null);
  const [editProduct, setEditProduct] = useState<ProductData | null>(null);
  const [editSizes, setEditSizes] = useState<string[]>([]);
  const [proposalDetails, setProposalDetails] = useState<any | null>(null);
  const [toast, setToast] = useState<{ message: string; onClick?: () => void } | null>(null);
  const [lastProposalId, setLastProposalId] = useState<string | null>(null);
  const [locationLink, setLocationLink] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{ id: string; link: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      for (const file of filesArray) {
        if (newProduct.images.length >= 5) {
          alert('Vous pouvez télécharger maximum 5 images');
          break;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'bonplan_preset');
        formData.append('cloud_name', 'drfqjjahv');

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/drfqjjahv/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error('Upload failed');
          }

          const data = await response.json();
          setNewProduct(prev => ({
            ...prev,
            images: [...prev.images, data.secure_url]
          }));
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Erreur lors du téléchargement de l\'image');
        }
      }
    }
  };

  const removeImage = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddSize = (size: string) => {
    if (size && !newProduct.sizes.includes(size)) {
      setNewProduct(prev => ({ ...prev, sizes: [...prev.sizes, size] }));
    }
  };

  const handleRemoveSize = (size: string) => {
    setNewProduct(prev => ({ ...prev, sizes: prev.sizes.filter(s => s !== size) }));
  };

  const handleEditAddSize = (size: string) => {
    if (size && !editSizes.includes(size)) {
      setEditSizes(prev => [...prev, size]);
    }
  };

  const handleEditRemoveSize = (size: string) => {
    setEditSizes(prev => prev.filter(s => s !== size));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProductData)));
    };
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    const fetchProposals = async () => {
      const querySnapshot = await getDocs(collection(db, 'proposals'));
      setProposals(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    const fetchCurrentLocation = async () => {
      const q = query(collection(db, 'locations'), orderBy('timestamp', 'desc'), limit(1));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setCurrentLocation({ id: doc.id, link: doc.data().link });
      }
    };
    fetchProducts();
    fetchOrders();
    fetchProposals();
    fetchCurrentLocation();
  }, [showAddProduct]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'proposals'), (snapshot) => {
      const newProposals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setProposals(newProposals);
      if (lastProposalId && newProposals.length > proposals.length) {
        // Nouvelle proposition détectée
        const latest = newProposals.find((p: any) => !proposals.some((old: any) => old.id === p.id));
        if (latest) {
          setToast({
            message: `Nouvelle proposition reçue de ${latest.whatsapp || 'client'}`,
            onClick: () => {
              setActiveTab('proposals');
              setProposalDetails(latest);
              setToast(null);
            }
          });
        }
      }
      if (newProposals.length > 0) {
        setLastProposalId(newProposals[newProposals.length - 1].id);
      }
    });
    return () => unsub();
  }, [proposals, lastProposalId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'products'), {
      ...newProduct,
      price: Number(newProduct.price),
      createdAt: new Date(),
      promo: !!newProduct.promo,
    });
    setNewProduct({
      title: '',
      description: '',
      price: '',
      category: '' as ProductCategory,
      location: 'France',
      images: [],
      sizes: [],
      promo: false,
    });
    setShowAddProduct(false);
  };

  const deleteAllProducts = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tous les produits ? Cette action est irréversible.')) {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      setProducts([]);
    }
  };

  const handleOrderAction = (action: 'accept' | 'reject', order: any) => {
    const message = action === 'accept' 
      ? `Bonjour, votre commande pour ${order.product?.title} a été acceptée ! Nous vous contacterons bientôt pour finaliser la livraison.`
      : `Bonjour, nous sommes désolés mais nous ne pouvons pas accepter votre commande pour ${order.product?.title} pour le moment.`;
    
    const whatsappNumber = order.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleProposalAction = (action: 'accept' | 'reject', proposal: any) => {
    const message = action === 'accept'
      ? `Bonjour, nous acceptons votre proposition de vente pour ${proposal.type} à ${proposal.price}€. Nous vous contacterons bientôt pour finaliser la transaction.`
      : `Bonjour, nous sommes désolés mais nous ne pouvons pas accepter votre proposition de vente pour ${proposal.type} pour le moment.`;
    
    const whatsappNumber = proposal.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEditProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;
    await updateDoc(doc(db, 'products', editProduct.id), {
      ...editProduct,
      sizes: editSizes,
      promo: !!editProduct.promo,
    });
    setProducts(products.map(p => p.id === editProduct.id ? { ...editProduct, sizes: editSizes } : p));
    setEditProduct(null);
    setEditSizes([]);
  };

  const handleOrderStatusChange = async (orderId: string, newStatus: string) => {
    await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) return;
    await deleteDoc(doc(db, 'orders', orderId));
    setOrders(orders.filter(o => o.id !== orderId));
  };

  const handleDeleteProposal = async (proposalId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette proposition ?')) return;
    await deleteDoc(doc(db, 'proposals', proposalId));
    setProposals(proposals.filter(p => p.id !== proposalId));
  };

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'locations'), {
        link: locationLink,
        timestamp: new Date(),
      });
      setLocationLink('');
      setToast({ message: 'Position mise à jour avec succès' });
    } catch (error) {
      console.error('Error updating location:', error);
      setToast({ message: 'Erreur lors de la mise à jour de la position' });
    }
  };

  const handleDeleteLocation = async () => {
    if (!currentLocation) return;
    try {
      await deleteDoc(doc(db, 'locations', currentLocation.id));
      setCurrentLocation(null);
      setToast({ message: 'Position supprimée avec succès' });
    } catch (error) {
      console.error('Error deleting location:', error);
      setToast({ message: 'Erreur lors de la suppression de la position' });
    }
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
            <button
              onClick={() => setActiveTab('location')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'location' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Position
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Gestion des produits</h2>
                <div className="flex gap-3">
                  <button 
                    onClick={deleteAllProducts}
                    className="btn btn-outline btn-xs text-error flex items-center gap-1 px-2 py-1"
                  >
                    <X size={14} />
                    Tout supprimer
                  </button>
                  <button 
                    onClick={() => setShowAddProduct(true)}
                    className="btn btn-primary btn-xs flex items-center gap-1 px-2 py-1"
                  >
                    <Plus size={14} />
                    Ajouter
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {products.length === 0 && (
                  <div className="text-center text-gray-500">Aucun produit pour le moment.</div>
                )}
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-card p-4 flex flex-col gap-2">
                    <div className="font-semibold text-primary text-base">{product.title}</div>
                    <div className="text-xs text-gray-500">Catégorie : {product.category}</div>
                    <div className="text-xs text-gray-500">Prix : <span className="text-primary font-bold">{product.price} €</span></div>
                    <div className="text-xs text-gray-500">Localisation : {product.location}</div>
                    <div className="text-xs text-gray-500">Tailles : {product.sizes && product.sizes.length > 0 ? product.sizes.join(', ') : '-'}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="btn btn-outline text-error flex items-center gap-1 text-xs px-3 py-2" onClick={async () => {
                        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
                        await deleteDoc(doc(db, 'products', product.id));
                        setProducts(products.filter(p => p.id !== product.id));
                      }}><Trash2 size={16} /> Supprimer</button>
                      <button className="btn btn-outline flex items-center gap-1 text-xs px-3 py-2" onClick={() => { setEditProduct(product); setEditSizes(product.sizes || []); }}><Edit size={16} /> Modifier</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Gestion des commandes</h2>
              <div className="flex flex-col gap-4">
                {orders.length === 0 && (
                  <div className="text-center text-gray-500">Aucune commande pour le moment.</div>
                )}
                {orders.map(order => {
                  const whatsappNumber = order.whatsapp?.replace(/[^0-9+]/g, '');
                  return (
                    <div key={order.id} className="bg-white rounded-lg shadow-card p-4 flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold text-primary text-base">{order.customerName}</div>
                        <div className="text-xs text-gray-500">Produit : {order.product?.title}</div>
                        <div className="text-xs text-gray-500">Taille : {order.size || order.product?.size || '-'}</div>
                        <div className="text-xs text-gray-500">Prix : <span className="text-primary font-bold">{order.product?.price} €</span></div>
                        <div className="text-xs text-gray-500">Date : {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : ''}</div>
                        <div className="flex flex-col gap-1 mt-1">
                          <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-success underline text-sm font-medium"
                          >
                            {order.whatsapp}
                          </a>
                          <span className="text-xs text-gray-400">Exemple : +33XXXXXXXXX (sans espaces ni tirets)</span>
                        </div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2 mt-2">
                          <select
                            className="input-field text-xs sm:text-sm"
                            value={order.status}
                            onChange={e => handleOrderStatusChange(order.id, e.target.value)}
                            aria-label="Statut de la commande"
                          >
                            <option value="pending">En cours</option>
                            <option value="confirmed">Confirmée</option>
                            <option value="delivered">Terminée</option>
                            <option value="cancelled">Annulée</option>
                          </select>
                          <button onClick={() => handleOrderAction('accept', order)} className="btn btn-success btn-xs flex items-center gap-1 px-2 py-1"><CheckCircle size={14} /> Accepter</button>
                          <button onClick={() => handleOrderAction('reject', order)} className="btn btn-error btn-xs flex items-center gap-1 px-2 py-1"><X size={14} /> Refuser</button>
                          <button onClick={() => setOrderDetails(order)} className="btn btn-outline btn-xs flex items-center gap-1 px-2 py-1"><Edit size={14} /> Détails</button>
                          <button onClick={() => handleDeleteOrder(order.id)} className="btn btn-outline btn-xs text-error flex items-center gap-1 px-2 py-1"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {activeTab === 'proposals' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Propositions de vente reçues</h2>
              <div className="flex flex-col gap-4">
                {proposals.length === 0 && (
                  <div className="text-center text-gray-500">Aucune proposition reçue pour le moment.</div>
                )}
                {proposals.map(proposal => {
                  const whatsappNumber = proposal.whatsapp?.replace(/[^0-9+]/g, '');
                  return (
                    <div key={proposal.id} className="bg-white rounded-lg shadow-card p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-primary text-base truncate">{proposal.type}</div>
                        <div className="text-xs text-gray-500 truncate mb-1">{proposal.description}</div>
                        <div className="flex flex-wrap gap-2 items-center mb-1">
                          <span className="text-sm font-medium">Prix :</span>
                          <span className="text-primary font-bold">{proposal.price} €</span>
                          <span className="text-xs text-gray-400">{proposal.createdAt?.toDate ? proposal.createdAt.toDate().toLocaleDateString() : ''}</span>
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                          <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-success underline text-sm font-medium"
                          >
                            {proposal.whatsapp}
                          </a>
                          <span className="text-xs text-gray-400">Exemple : +33XXXXXXXXX (sans espaces ni tirets)</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2 mt-2 sm:mt-0">
                        <a
                          href={`https://wa.me/${whatsappNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success btn-xs flex items-center gap-1 px-2 py-1"
                          title="Négocier sur WhatsApp"
                        >
                          <MessageCircle size={14} /> Négocier
                        </a>
                        <a
                          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Bonjour, merci pour votre proposition, malheureusement elle ne peut pas être acceptée. N\'hésitez pas à m\'envoyer une nouvelle offre, je suis toujours ouvert à la discussion 🙂')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-error btn-xs flex items-center gap-1 px-2 py-1"
                          title="Refuser via WhatsApp"
                        >
                          <X size={14} /> Refuser
                        </a>
                        <button
                          onClick={() => setProposalDetails(proposal)}
                          className="btn btn-outline btn-xs flex items-center gap-1 px-2 py-1"
                          title="Détails"
                        >
                          <Edit size={14} /> Détails
                        </button>
                        <button
                          onClick={() => handleDeleteProposal(proposal.id)}
                          className="btn btn-outline btn-xs text-error flex items-center gap-1 px-2 py-1"
                          title="Supprimer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Gérer la position</h2>
              {currentLocation && (
                <div className="mb-6 p-4 bg-primary/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-primary mb-1">Position actuelle</p>
                      <a 
                        href={currentLocation.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-primary break-all"
                      >
                        {currentLocation.link}
                      </a>
                    </div>
                    <button
                      onClick={handleDeleteLocation}
                      className="btn btn-outline text-error btn-sm flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Supprimer
                    </button>
                  </div>
                </div>
              )}
              <form onSubmit={handleLocationSubmit} className="max-w-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lien Google Maps
                  </label>
                  <input
                    type="url"
                    value={locationLink}
                    onChange={(e) => setLocationLink(e.target.value)}
                    className="input-field"
                    placeholder="https://maps.app.goo.gl/..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Collez ici le lien de partage Google Maps de votre position actuelle
                  </p>
                </div>
                <button type="submit" className="btn btn-primary">
                  Mettre à jour la position
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-3 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base sm:text-xl font-semibold text-primary mb-2 sm:mb-6">Ajouter un produit</h2>
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
                  <label className="block text-xs sm:text-sm font-medium text-primary mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    id="product-title"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                    className="input-field text-xs sm:text-sm"
                    placeholder="Entrez le titre du produit"
                    required
                    aria-label="Titre du produit"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-primary mb-1">
                    Description
                  </label>
                  <textarea
                    id="product-description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="input-field text-xs sm:text-sm min-h-[100px]"
                    placeholder="Décrivez le produit en détail"
                    required
                    aria-label="Description du produit"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-primary mb-1">
                    Prix (€)
                  </label>
                  <input
                    type="number"
                    id="product-price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="input-field text-xs sm:text-sm"
                    placeholder="Entrez le prix en euros"
                    required
                    aria-label="Prix du produit"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-primary mb-1">
                    Catégorie
                  </label>
                  <select
                    id="product-category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value as ProductCategory})}
                    className="input-field text-xs sm:text-sm"
                    required
                    aria-label="Catégorie du produit"
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
                  <label className="block text-xs sm:text-sm font-medium text-primary mb-1">
                    Localisation
                  </label>
                  <select
                    id="product-location"
                    value={newProduct.location}
                    onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                    className="input-field text-xs sm:text-sm"
                    required
                    aria-label="Localisation du produit"
                  >
                    <option value="France">France</option>
                    <option value="Algérie">Algérie</option>
                  </select>
                </div>

                {(newProduct.category === 'vetements' || newProduct.category === 'baskets') && (
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-primary mb-1">
                      Tailles disponibles
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        id="add-size-input"
                        className="input-field text-xs sm:text-sm flex-1"
                        placeholder="Ex: 40, 41, 42, S, M, L..."
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const value = (e.target as HTMLInputElement).value.trim();
                            if (value) {
                              handleAddSize(value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-primary text-xs sm:text-sm"
                        onClick={() => {
                          const input = document.getElementById('add-size-input') as HTMLInputElement;
                          if (input && input.value.trim()) {
                            handleAddSize(input.value.trim());
                            input.value = '';
                          }
                        }}
                      >Ajouter</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newProduct.sizes.map(size => (
                        <span key={size} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs sm:text-sm font-medium">
                          {size}
                          <button type="button" className="ml-1 text-error" onClick={() => handleRemoveSize(size)}><X size={12} /></button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="promo-checkbox"
                    checked={!!newProduct.promo}
                    onChange={e => setNewProduct(prev => ({ ...prev, promo: e.target.checked }))}
                    className="form-checkbox h-4 w-4 text-primary"
                  />
                  <label htmlFor="promo-checkbox" className="text-xs sm:text-sm font-medium text-primary">Produit en promotion</label>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-primary mb-2">
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
                  className="btn btn-outline text-xs sm:text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-xs sm:text-sm"
                >
                  Ajouter le produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modale détails commande */}
      {orderDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-3 sm:p-6 relative">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-primary" onClick={() => setOrderDetails(null)}><X size={24} /></button>
            <h2 className="text-base sm:text-xl font-semibold text-primary mb-2 sm:mb-6">Détails de la commande</h2>
            <div className="space-y-2">
              <div><b>Client :</b> {orderDetails.customerName}</div>
              <div><b>WhatsApp :</b> {orderDetails.whatsapp}</div>
              <div><b>Produit :</b> {orderDetails.product?.title}</div>
              <div><b>Taille :</b> {orderDetails.size || orderDetails.product?.size || '-'}</div>
              <div><b>Prix :</b> {orderDetails.product?.price} €</div>
              <div><b>Date :</b> {orderDetails.createdAt?.toDate ? orderDetails.createdAt.toDate().toLocaleDateString() : ''}</div>
              <div><b>Statut :</b> {orderDetails.status}</div>
              <div><b>Autres infos :</b> {orderDetails.message || '-'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Modale édition produit */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-3 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base sm:text-xl font-semibold text-primary mb-2 sm:mb-6">Modifier le produit</h2>
              <button onClick={() => setEditProduct(null)} className="text-gray-500 hover:text-primary"><X size={24} /></button>
            </div>
            <form onSubmit={handleEditProductSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-primary mb-1">Titre</label>
                  <input type="text" className="input-field text-xs sm:text-sm" value={editProduct.title} onChange={e => setEditProduct({ ...editProduct, title: e.target.value })} required aria-label="Titre du produit" placeholder="Titre du produit" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-primary mb-1">Description</label>
                  <textarea className="input-field text-xs sm:text-sm min-h-[100px]" value={editProduct.description} onChange={e => setEditProduct({ ...editProduct, description: e.target.value })} required aria-label="Description du produit" placeholder="Description du produit" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-primary mb-1">Prix (€)</label>
                  <input type="number" className="input-field text-xs sm:text-sm" value={editProduct.price} onChange={e => setEditProduct({ ...editProduct, price: Number(e.target.value) })} required aria-label="Prix du produit" placeholder="Prix en euros" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-primary mb-1">Catégorie</label>
                  <select className="input-field text-xs sm:text-sm" value={editProduct.category} onChange={e => setEditProduct({ ...editProduct, category: e.target.value as ProductCategory })} required aria-label="Catégorie du produit">
                    <option value="baskets">Baskets</option>
                    <option value="vetements">Vêtements</option>
                    <option value="voitures">Voitures</option>
                    <option value="telephones">Téléphones</option>
                    <option value="autres">Autres</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-primary mb-1">Localisation</label>
                  <select className="input-field text-xs sm:text-sm" value={editProduct.location} onChange={e => setEditProduct({ ...editProduct, location: e.target.value })} required aria-label="Localisation du produit">
                    <option value="France">France</option>
                    <option value="Algérie">Algérie</option>
                  </select>
                </div>
                {(editProduct.category === 'vetements' || editProduct.category === 'baskets') && (
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-primary mb-1">Tailles disponibles</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        id="edit-add-size-input"
                        className="input-field text-xs sm:text-sm flex-1"
                        placeholder="Ex: 40, 41, 42, S, M, L..."
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const value = (e.target as HTMLInputElement).value.trim();
                            if (value) {
                              handleEditAddSize(value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-primary text-xs sm:text-sm"
                        onClick={() => {
                          const input = document.getElementById('edit-add-size-input') as HTMLInputElement;
                          if (input && input.value.trim()) {
                            handleEditAddSize(input.value.trim());
                            input.value = '';
                          }
                        }}
                      >Ajouter</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {editSizes.map(size => (
                        <span key={size} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs sm:text-sm font-medium">
                          {size}
                          <button type="button" className="ml-1 text-error" onClick={() => handleEditRemoveSize(size)}><X size={12} /></button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="edit-promo-checkbox"
                    checked={!!editProduct?.promo}
                    onChange={e => setEditProduct(editProduct ? { ...editProduct, promo: e.target.checked } : null)}
                    className="form-checkbox h-4 w-4 text-primary"
                  />
                  <label htmlFor="edit-promo-checkbox" className="text-xs sm:text-sm font-medium text-primary">Produit en promotion</label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setEditProduct(null)} className="btn btn-outline text-xs sm:text-sm">Annuler</button>
                <button type="submit" className="btn btn-primary text-xs sm:text-sm">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {proposalDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-3 sm:p-6 relative">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-primary" onClick={() => setProposalDetails(null)}><X size={24} /></button>
            <h2 className="text-base sm:text-xl font-semibold text-primary mb-2 sm:mb-6">Détails de la proposition</h2>
            <div className="space-y-2">
              <div><b>Contact :</b> {proposalDetails.whatsapp}</div>
              <div><b>Titre :</b> {proposalDetails.type}</div>
              <div><b>Description :</b> {proposalDetails.description}</div>
              <div><b>Prix :</b> {proposalDetails.price} €</div>
              <div><b>Localisation :</b> {proposalDetails.location}</div>
              <div><b>Date :</b> {proposalDetails.createdAt?.toDate ? proposalDetails.createdAt.toDate().toLocaleDateString() : ''}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {proposalDetails.images && proposalDetails.images.length > 0 && proposalDetails.images.map((img: string, idx: number) => (
                  <img key={idx} src={img} alt={`photo-${idx}`} className="w-24 h-24 object-cover rounded border" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AdminPage;