import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLiturgical } from '../../contexts/LiturgicalContext';
import { Link } from 'react-router-dom';

export function Footer() {
  const { theme } = useLiturgical();

  return (
    <footer className="bg-gray-900 text-white pt-2 pb-4">
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-2 flex-shrink-0" size={18} />
                <span>Paroisse Notre Dame des Anges<br />Ouakam, Dakar, Sénégal</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 flex-shrink-0" size={18} />
                <span>+221 XX XXX XX XX</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 flex-shrink-0" size={18} />
                <a href="mailto:contact@pndao.org" className="hover:underline">contact@pndao.org</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/horaires-messes" className="hover:underline">Horaires des messes</Link>
              </li>
              <li>
                <Link to="/groupes" className="hover:underline">Groupes paroissiaux</Link>
              </li>
              <li>
                <Link to="/demande-messe" className="hover:underline">Demander une messe</Link>
              </li>
              <li>
                <Link to="/agenda" className="hover:underline">Agenda</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:underline">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-3">Inscrivez-vous pour recevoir les dernières nouvelles de notre paroisse.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                 className={`pl-8 pr-3 py-1 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 ${theme.ringColor} focus:border-transparent`}
                
                // className="px-3 py-2 rounded-md bg-blue-800 text-white placeholder-blue-200 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className={`${theme.bgColor} hover:opacity-90 text-white px-4 py-2 rounded-md transition-colors duration-200`}

                // className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                S'inscrire
              </button>
            </form>
          </div>

          {/* Social Media & Hours */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Youtube size={24} />
              </a>
            </div>
            
            <h3 className="font-playfair text-xl font-bold mb-4">Horaires du secrétariat</h3>
            <p>Lundi au vendredi: 9h-12h, 15h-18h</p>
            <p>Samedi: 9h-12h</p>
          </div>
        </div>

       <hr className={`my-8 ${theme.accentColor}`} />

        
        <div className="text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Paroisse Notre Dame des Anges de Ouakam. Tous droits réservés.</p>
        </div>
      <Link to="/mentions-legales" className="text-sm text-gray-400 hover:underline">
        Mentions légales
      </Link>
      </div>
    </footer>
  );
};

export default Footer;