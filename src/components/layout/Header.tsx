import { Menu, ShoppingBag, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary shadow-md py-2' : 'bg-primary/90 py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag size={28} className="text-secondary" />
          <span className="text-xl font-montserrat font-bold text-light">BonPlan</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className={`text-light hover:text-secondary transition-colors ${
                  location.pathname === '/' ? 'text-secondary font-medium' : ''
                }`}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/acheter"
                className={`text-light hover:text-secondary transition-colors ${
                  location.pathname === '/acheter' ? 'text-secondary font-medium' : ''
                }`}
              >
                Acheter
              </Link>
            </li>
            <li>
              <Link
                to="/vendre"
                className={`text-light hover:text-secondary transition-colors ${
                  location.pathname === '/vendre' ? 'text-secondary font-medium' : ''
                }`}
              >
                Vendre
              </Link>
            </li>
            <li>
              <Link
                to="/a-propos"
                className={`text-light hover:text-secondary transition-colors ${
                  location.pathname === '/a-propos' ? 'text-secondary font-medium' : ''
                }`}
              >
                À Propos
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-light hover:text-secondary transition-colors"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary animate-fade-in">
          <nav className="container-custom py-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/"
                  className={`block text-light hover:text-secondary transition-colors ${
                    location.pathname === '/' ? 'text-secondary font-medium' : ''
                  }`}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/acheter"
                  className={`block text-light hover:text-secondary transition-colors ${
                    location.pathname === '/acheter' ? 'text-secondary font-medium' : ''
                  }`}
                >
                  Acheter
                </Link>
              </li>
              <li>
                <Link
                  to="/vendre"
                  className={`block text-light hover:text-secondary transition-colors ${
                    location.pathname === '/vendre' ? 'text-secondary font-medium' : ''
                  }`}
                >
                  Vendre
                </Link>
              </li>
              <li>
                <Link
                  to="/a-propos"
                  className={`block text-light hover:text-secondary transition-colors ${
                    location.pathname === '/a-propos' ? 'text-secondary font-medium' : ''
                  }`}
                >
                  À Propos
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;