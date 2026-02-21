import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent py-16 border-t border-black/5">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-primary mb-2">N-Squre Engineering</h3>
            <p className="text-text-secondary mb-4">Design & Build Pvt Ltd</p>
            <p className="text-text-secondary max-w-md mb-6">
              Complete Civil Engineering & Consultancy Solutions. We specialize in providing high-quality engineering solutions for a sustainable future.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Facebook size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              <li><Link to="/about" className="text-text-secondary hover:text-primary">About Us</Link></li>
              <li><Link to="/services" className="text-text-secondary hover:text-primary">Our Services</Link></li>
              <li><Link to="/projects" className="text-text-secondary hover:text-primary">Projects</Link></li>
              <li><Link to="/contact" className="text-text-secondary hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="flex flex-col gap-2 text-text-secondary">
              <li>Syangja, Nepal</li>
              <li>nsedb2079@Gmail.com</li>
              <li>+977 9846052527</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-black/5 text-center text-text-secondary text-sm">
          &copy; {new Date().getFullYear()} N-Squre Engineering Design & Building pvt.Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
