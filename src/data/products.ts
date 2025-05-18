import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    title: 'Nike Air Jordan 1 Mid',
    description: 'Baskets Nike Air Jordan 1 Mid, édition limitée, parfait état.',
    price: 140,
    category: 'baskets',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    location: 'France',
    available: true,
    featured: true,
    details: {
      size: '42',
      brand: 'Nike',
      condition: 'comme neuf',
      quantity: 1
    },
    createdAt: new Date('2023-07-15')
  },
  {
    id: '2',
    title: 'Sweat à capuche Adidas Original',
    description: 'Sweat à capuche Adidas Original noir, taille M, parfait état.',
    price: 45,
    category: 'vetements',
    images: [
      'https://images.pexels.com/photos/5119409/pexels-photo-5119409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    location: 'France',
    available: true,
    details: {
      size: 'M',
      brand: 'Adidas',
      type: 'Sweat à capuche',
      color: 'Noir',
      condition: 'bon état'
    },
    createdAt: new Date('2023-08-05')
  },
  {
    id: '3',
    title: 'iPhone 13 Pro 128Go',
    description: 'iPhone 13 Pro 128Go, coloris Graphite, très bon état, débloqué tout opérateur.',
    price: 650,
    category: 'telephones',
    images: [
      'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    location: 'France',
    available: true,
    featured: true,
    details: {
      brand: 'Apple',
      model: 'iPhone 13 Pro',
      condition: 'bon état',
      storage: '128Go',
      color: 'Graphite'
    },
    createdAt: new Date('2023-09-10')
  },
  {
    id: '4',
    title: 'Peugeot 208 1.2 PureTech',
    description: 'Peugeot 208 1.2 PureTech 100ch Allure, année 2020, 25000km, essence, boîte manuelle.',
    price: 14500,
    category: 'voitures',
    images: [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    location: 'France',
    available: true,
    details: {
      brand: 'Peugeot',
      model: '208',
      year: 2020,
      mileage: 25000,
      fuel: 'essence'
    },
    createdAt: new Date('2023-10-20')
  },
  {
    id: '5',
    title: 'Converse Chuck Taylor All Star',
    description: 'Baskets Converse Chuck Taylor All Star High, blanches, taille 39, neuves.',
    price: 65,
    category: 'baskets',
    images: [
      'https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    location: 'France',
    available: true,
    details: {
      size: '39',
      brand: 'Converse',
      condition: 'neuf',
      quantity: 1
    },
    createdAt: new Date('2023-11-05')
  },
  {
    id: '6',
    title: 'Samsung Galaxy S22 Ultra',
    description: 'Samsung Galaxy S22 Ultra 256Go, coloris noir, excellent état, complet avec accessoires.',
    price: 750,
    category: 'telephones',
    images: [
      'https://images.pexels.com/photos/12694132/pexels-photo-12694132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    location: 'Algérie',
    available: true,
    featured: true,
    details: {
      brand: 'Samsung',
      model: 'Galaxy S22 Ultra',
      condition: 'comme neuf',
      storage: '256Go',
      color: 'Noir'
    },
    createdAt: new Date('2023-12-15')
  }
];