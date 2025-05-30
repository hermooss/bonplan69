import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../firebase';
import { Product } from '../../types';

interface OrderFormProps {
  product: Product;
  onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    address: '',
    message: '',
    size: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await addDoc(collection(db, 'orders'), {
      product,
      customerName: formData.name,
      whatsapp: formData.whatsapp,
      address: formData.address,
      message: formData.message,
      size: product.sizes && product.sizes.length > 0 ? formData.size : undefined,
      status: 'pending',
      createdAt: new Date(),
    });
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-success/20 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Commande envoyée !</h3>
        <p className="text-gray-600 mb-4">Nous vous contacterons rapidement sur WhatsApp pour finaliser votre commande.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-2">
          <label htmlFor="size" className="block text-xs sm:text-sm font-medium text-primary mb-1">
            Taille à commander
          </label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="input-field text-xs sm:text-sm"
            required
            aria-label="Taille à commander"
          >
            <option value="">Sélectionner une taille</option>
            {product.sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}
      <div className="mb-2">
        <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-primary mb-1">
          Nom complet
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input-field text-xs sm:text-sm"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="whatsapp" className="block text-xs sm:text-sm font-medium text-primary mb-1">
          Numéro WhatsApp
        </label>
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          className="input-field text-xs sm:text-sm"
          placeholder="33612345678"
          required
        />
        <span className="text-xs text-gray-500 mt-1 block">Format : 33612345678 (pour lien WhatsApp)</span>
      </div>
      <div className="mb-2">
        <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-primary mb-1">
          Adresse de livraison (facultative)
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="input-field text-xs sm:text-sm"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-primary mb-1">
          Message (facultatif)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="input-field min-h-[80px] text-xs sm:text-sm"
        ></textarea>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-outline flex-1 text-xs sm:text-sm"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn btn-primary flex-1 text-xs sm:text-sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer la commande'}
        </button>
      </div>
    </form>
  );
};

export default OrderForm;