import { Car, Package, Shirt, ShoppingBag, Smartphone } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'baskets',
    name: 'Baskets',
    icon: <ShoppingBag size={28} />,
  },
  {
    id: 'vetements',
    name: 'Vêtements',
    icon: <Shirt size={28} />,
  },
  {
    id: 'voitures',
    name: 'Voitures',
    icon: <Car size={28} />,
  },
  {
    id: 'telephones',
    name: 'Téléphones',
    icon: <Smartphone size={28} />,
  },
  {
    id: 'autres',
    name: 'Autres objets',
    icon: <Package size={28} />,
  }
];

const CategorySection: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 bg-secondary">
      <div className="container-custom">
        <h2 className="section-title text-center mb-6 sm:mb-10">Catégories principales</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/acheter?category=${category.id}`}
              className="card p-4 sm:p-6 flex flex-col items-center text-center hover:scale-105 transition-transform group min-h-[110px] sm:min-h-[140px]"
            >
              <div className="mb-2 sm:mb-3 text-primary group-hover:text-accent transition-colors">
                {category.icon}
              </div>
              <h3 className="font-medium text-xs sm:text-base mb-0.5 sm:mb-1 text-primary">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;