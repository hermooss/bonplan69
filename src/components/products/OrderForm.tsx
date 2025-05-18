import React, { useState } from 'react';
import { Product } from '../../types';
import { X } from 'lucide-react';

interface OrderFormProps {
  product: Product;
  onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close form after success message
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1500);
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
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom complet
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input-field"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
          Numéro WhatsApp
        </label>
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          className="input-field"
          placeholder="+33 6 XX XX XX XX"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Adresse de livraison (facultative)
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="input-field"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message (facultatif)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="input-field min-h-[100px]"
        ></textarea>
      </div>
      
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-outline flex-1"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn btn-primary flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer la commande'}
        </button>
      </div>
    </form>
  );
};

export default OrderForm;