import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import SellPage from './pages/SellPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import WhatsAppButton from './components/common/WhatsAppButton';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="acheter" element={<CatalogPage />} />
          <Route path="produit/:id" element={<ProductPage />} />
          <Route path="vendre" element={<SellPage />} />
          <Route path="a-propos" element={<AboutPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <WhatsAppButton />
    </>
  );
}

export default App;