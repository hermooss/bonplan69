import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-light pt-10 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <ShoppingBag size={24} className="text-secondary" />
              <span className="text-xl font-montserrat font-bold">BonPan</span>
            </Link>
            <p className="text-light-gray mb-4">
              Achète tout. Vends tout. Facilement.
            </p>
            <p className="text-light-gray mb-4">
              Présent sur les marchés de Lyon et livraison partout en France et en Algérie.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light hover:text-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light hover:text-secondary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-montserrat">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-secondary" />
                <a href="https://wa.me/33773622884" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  +33 7 73 62 28 84
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-secondary" />
                <a href="mailto:contact@bonpan.fr" className="hover:text-secondary transition-colors">
                  contact@bonpan.fr
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-secondary mt-1" />
                <span>Lyon, France</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-montserrat">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-secondary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/acheter" className="hover:text-secondary transition-colors">
                  Acheter
                </Link>
              </li>
              <li>
                <Link to="/vendre" className="hover:text-secondary transition-colors">
                  Vendre
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="hover:text-secondary transition-colors">
                  À Propos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-light-gray">
          <p>&copy; {new Date().getFullYear()} BonPan. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;