import { addDoc, collection } from 'firebase/firestore';
import { Upload, X } from 'lucide-react';
import React, { useState } from 'react';
import { db } from '../../firebase';

const SellerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    price: '',
    location: 'France',
    whatsapp: '',
    images: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const imageURLs = filesArray.map(file => URL.createObjectURL(file));
      
      if (formData.images.length + imageURLs.length <= 5) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...imageURLs]
        }));
      } else {
        alert('Vous pouvez télécharger maximum 5 images');
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await addDoc(collection(db, 'proposals'), {
      ...formData,
      price: Number(formData.price),
      status: 'pending',
      createdAt: new Date(),
    });
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        type: '',
        description: '',
        price: '',
        location: 'France',
        whatsapp: '',
        images: []
      });
    }, 5000);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-4 bg-success/20 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <h3 className="text-2xl font-semibold mb-2">Proposition envoyée !</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Nous avons bien reçu votre proposition de vente. Nous vous contacterons rapidement sur WhatsApp pour en discuter.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="btn btn-primary"
        >
          Proposer un autre produit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Type d'objet
        </label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="input-field"
          placeholder="Ex: Téléphone, Voiture, Baskets..."
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description détaillée
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input-field min-h-[120px]"
          placeholder="Décrivez l'objet, ses caractéristiques, son état..."
          required
        ></textarea>
      </div>
      
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
          Prix souhaité (€)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="input-field"
          placeholder="Ex: 100"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Localisation
        </label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="input-field"
          required
        >
          <option value="France">France</option>
          <option value="Algérie">Algérie</option>
        </select>
      </div>
      
      <div className="mb-6">
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
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photos (1 à 5)
        </label>
        
        <div className="flex flex-wrap gap-3 mb-3">
          {formData.images.map((image, index) => (
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
          
          {formData.images.length < 5 && (
            <label className="w-24 h-24 border-2 border-dashed border-light-gray rounded flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
              <Upload size={20} className="mb-1" />
              <span className="text-xs">Ajouter</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                multiple={formData.images.length === 0}
              />
            </label>
          )}
        </div>
        <p className="text-xs text-gray-500">
          {formData.images.length}/5 images (formats acceptés: JPG, PNG, GIF, max 5 MB par image)
        </p>
      </div>
      
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma proposition'}
      </button>
    </form>
  );
};

export default SellerForm;