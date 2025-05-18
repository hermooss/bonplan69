import React from 'react';
import Hero from '../components/home/Hero';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;