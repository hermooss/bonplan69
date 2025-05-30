import React from 'react';
import CategorySection from '../components/home/CategorySection';
import PromotionsSection from '../components/home/FeaturedProducts';
import Hero from '../components/home/Hero';
import LocationSection from '../components/home/LocationSection';
import WhyChooseUs from '../components/home/WhyChooseUs';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <CategorySection />
      <LocationSection />
      <PromotionsSection />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;