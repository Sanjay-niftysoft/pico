import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ChevronRight } from 'lucide-react';
import logoImg from '../assets/images/logo.png';

export default function Footer() {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030B7D] text-white border-t border-white/5 relative">

      {/* Footer Top */}
      <div className="max-w-[1240px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 text-left">

          {/* Col 1: About */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="mb-6">
              <img
                src={logoImg}
                alt="Physics Instruments Co."
                className="h-20 sm:h-24 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-white/85 text-xs sm:text-sm leading-relaxed mb-6">
              Physics Instruments Co. (PICO) was established in 1959 and is engaged in the manufacturing and exporting
              of scientific and physics instruments for educational, research, and laboratory applications.
            </p>
            <div className="flex gap-3 mt-auto">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-sci-blue hover:border-sci-blue hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-sci-blue hover:border-sci-blue hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Twitter Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-sci-blue hover:border-sci-blue hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Facebook Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Company */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b-2 border-sci-accent/30 w-fit">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Products', path: '/products' },
                { name: 'Clients', path: '/clients' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'Contact', path: '/contact' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-xs sm:text-sm text-white/85 hover:text-sci-cyan transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <ChevronRightIcon />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b-2 border-sci-accent/30 w-fit">
              Products
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'CHAAOS', id: 'products' },
                { name: 'ULTRASONIC INTERFEROMETER', id: 'products' },
                { name: 'DECADE BOXES', id: 'products' },
                { name: 'STANDARDS', id: 'products' },
                { name: 'ELECTRONIC CELL SUBSTITUTES', id: 'products' },
              ].map((prod, idx) => (
                <li key={idx}>
                  <a
                    href={`#${prod.id}`}
                    onClick={(e) => handleScrollTo(e, prod.id)}
                    className="text-xs sm:text-sm text-white/85 hover:text-sci-cyan transition-colors duration-200 flex items-center gap-1"
                  >
                    <ChevronRightIcon />
                    <span>{prod.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div>
              <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b-2 border-sci-accent/30 w-fit">
                Contact Us
              </h4>
              <p className="text-xs leading-relaxed text-white/85 mb-4 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sci-cyan shrink-0 mt-0.5" />
                <span>
                  Module 36, III Floor, Block II, SIDCO Electronic Complex, Industrial Estate, Guindy, Chennai - 600032.
                </span>
              </p>
              <div className="flex flex-col gap-2.5 mt-3 text-xs">
                <a href="tel:+914443302775" className="flex items-center gap-2 text-white/85 hover:text-sci-cyan transition-colors">
                  <Phone className="w-3.5 h-3.5 text-sci-cyan shrink-0" />
                  <span>Phone: +91 44 43302775</span>
                </a>
                <a href="mailto:pico@pico.in" className="flex items-center gap-2 text-white/85 hover:text-sci-cyan transition-colors">
                  <Mail className="w-3.5 h-3.5 text-sci-cyan shrink-0" />
                  <span>Email: pico@pico.in</span>
                </a>
              </div>
            </div>

            {/* Interactive Embedded Google Map */}
            <div className="w-full h-[130px] rounded-lg overflow-hidden border border-white/10 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3420073431707!2d80.21451811114186!3d13.013879337252469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52673f9135413d%3A0xc0ee688409295569!2sPhysics%20Instruments%20Co.!5e0!3m2!1sen!2sin!4v1724418403090!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PICO Office Location Map"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#030B7D] py-6 border-t border-white/5 text-white/80">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Physics Instruments Co. All rights reserved.{" "}
            <a href="https://www.niftysoft.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sci-cyan transition-colors">Developed by Niftysoft Solution Private Limited</a></p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}

function ChevronRightIcon() {
  return (
    <span className="text-sci-cyan text-[10px] opacity-60 font-bold mr-1.5 select-none shrink-0">
      ›
    </span>
  );
}
