import { Link } from 'react-router-dom';
import { Film, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-16 border-t border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Film className="w-6 h-6 text-primary-600" />
              <span className="text-lg font-bold text-white">MovieBooking</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your premier destination for booking movie tickets online. Experience cinema like never before.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/movies" className="text-gray-400 hover:text-white text-sm transition">
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link to="/user/register" className="text-gray-400 hover:text-white text-sm transition">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/user/login" className="text-gray-400 hover:text-white text-sm transition">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>support@moviebooking.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>123 Cinema Street, Movie City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MovieBooking. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
