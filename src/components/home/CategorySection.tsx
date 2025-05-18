import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Shirt, Car, Smartphone, Package } from 'lucide-react';

const categories = [
  {
    id: 'baskets',
    name: 'Baskets',
    icon: <ShoppingBag size={28} />,
    emoji: '👟'
  },
  {
    id: 'vetements',
    name: 'Vêtements',
    icon: <Shirt size={28} />,
    emoji: '👕'
  },
  {
    id: 'voitures',
    name: 'Voitures',
    icon: <Car size={28} />,
    emoji: '🚗'
  },
  {
    id: 'telephones',
    name: 'Téléphones',
    icon: <Smartphone size={28} />,
    emoji: '📱'
  },
  {
    id: 'autres',
    name: 'Autres objets',
    icon: <Package size={28} />,
    emoji: '🛒'
  }
];

const CategorySection: React.FC = () => {
  return (
    <section className="py-12 bg-light">
      <div className="container-custom">
        <h2 className="section-title text-center mb-10">Catégories principales</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/acheter?category=${category.id}`}
              className="card p-6 flex flex-col items-center text-center hover:scale-105 transition-transform group"
            >
              <div className="mb-3 text-primary-light group-hover:text-secondary transition-colors">
                {category.icon}
              </div>
              <h3 className="font-medium mb-1">{category.name}</h3>
              <div className="text-2xl">{category.emoji}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;