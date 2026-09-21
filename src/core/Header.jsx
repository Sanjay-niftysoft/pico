import React, { useState, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Menu, X, ArrowRight, ChevronDown, ChevronUp,
  Activity, Waves, CheckCircle, Box, BatteryCharging, FlaskConical, ChevronRight, Cpu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const location = useLocation();

  const handleMouseEnter = () => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // 200ms delay to prevent flickering
    setDropdownTimeout(timeout);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Clients', path: '/clients' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="w-full z-50">
      {/* Main Navigation Bar */}
      <div
        className={`w-full fixed top-0 left-0 transition-all duration-300 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 ${isSticky
          ? 'shadow-md py-3'
          : 'shadow-sm py-3.5 lg:py-4'
          }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-center">

          {/* Logo Lockup */}
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center group">
            <img
              src={logoImg}
              alt="Physics Instruments Co."
              className="h-[46px] xs:h-[54px] sm:h-[64px] lg:h-[78px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                if (link.name === 'Products') {
                  return (
                    <li
                      key={link.path}
                      className="flex items-center group/prod py-4"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        to={link.path}
                        className={`font-heading text-[11px] font-bold uppercase tracking-wider relative py-1.5 flex items-center group transition-colors duration-300 ${
                          isActive || showDropdown
                            ? 'text-[#030B7D]'
                            : 'text-[#030B7D]/85 hover:text-[#030B7D]'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className={`ml-1 w-3.5 h-3.5 transition-transform duration-300 ${showDropdown ? 'rotate-180 text-[#030B7D]' : 'text-[#030B7D]/60'}`} />
                        <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#030B7D] transition-transform duration-300 origin-left ${
                          isActive || showDropdown ? 'scale-x-100' : 'scale-x-0'
                        }`}></span>
                      </Link>

                      {/* Redesigned Premium Mega Menu Dropdown */}
                      <div
                        onClick={() => setShowDropdown(false)}
                        className={`absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[1180px] bg-white shadow-2xl border border-[#EEF0FB] rounded-2xl py-10 px-10 transition-all duration-250 ease-out before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:bg-transparent z-50 ${showDropdown
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                          }`}
                      >
                         <div className="grid grid-cols-3 gap-10 text-left">

                           {/* Column 1 */}
                           <div className="flex flex-col gap-8 border-r border-[#EEF0FB] pr-6">
                             {/* CHAAOS */}
                             <div>
                               <div className="flex items-center gap-3 mb-3">
                                 <div className="w-9 h-9 rounded-lg bg-[#030B7D]/5 flex items-center justify-center text-[#030B7D]">
                                   <Activity className="w-5 h-5" />
                                 </div>
                                 <h5 className="font-heading text-[11px] font-extrabold uppercase tracking-wider text-[#030B7D]">CHAAOS</h5>
                               </div>
                               <div className="w-full h-[1px] bg-[#EEF0FB] mb-4" />
                               <ul className="flex flex-col gap-2">
                                 {["CHAAOS 1", "CHAAOS 2", "CHAAOS 3"].map((item, idx) => (
                                   <li key={idx} className="group/item flex items-center gap-1.5">
                                     <ChevronRight className="w-3.5 h-3.5 text-[#38BDF8] group-hover/item:translate-x-0.5 transition-transform" />
                                     <Link
                                       to={`/products?title=${encodeURIComponent(item)}`}
                                       className="text-[12px] font-semibold text-slate-900 group-hover/item:text-[#030B7D] transition-colors leading-tight block py-0.5"
                                     >
                                       {item}
                                     </Link>
                                   </li>
                                 ))}
                               </ul>
                             </div>

                             {/* ULTRASONIC INTERFEROMETER */}
                             <div>
                               <div className="flex items-center gap-3 mb-3">
                                 <div className="w-9 h-9 rounded-lg bg-[#030B7D]/5 flex items-center justify-center text-[#030B7D]">
                                   <Waves className="w-5 h-5" />
                                 </div>
                                 <h5 className="font-heading text-[11px] font-extrabold uppercase tracking-wider text-[#030B7D]">Ultrasonic Interferometer</h5>
                               </div>
                               <div className="w-full h-[1px] bg-[#EEF0FB] mb-4" />
                               <ul className="flex flex-col gap-2">
                                 {["SINGLE FREQUENCY", "MULTI FREQUENCY", "ULTRASONIC BIO03", "ULTRASONIC ANALOG IMPROVED"].map((item, idx) => (
                                   <li key={idx} className="group/item flex items-center gap-1.5">
                                     <ChevronRight className="w-3.5 h-3.5 text-[#38BDF8] group-hover/item:translate-x-0.5 transition-transform" />
                                     <Link
                                       to={`/products?title=${encodeURIComponent(item)}`}
                                       className="text-[12px] font-semibold text-slate-900 group-hover/item:text-[#030B7D] transition-colors leading-tight block py-0.5"
                                     >
                                       {item}
                                     </Link>
                                   </li>
                                 ))}
                               </ul>
                             </div>

                             {/* ELECTRONIC CELL SUBSTITUTES */}
                             <div>
                               <div className="flex items-center gap-3 mb-3">
                                 <div className="w-9 h-9 rounded-lg bg-[#030B7D]/5 flex items-center justify-center text-[#030B7D]">
                                   <BatteryCharging className="w-5 h-5" />
                                 </div>
                                 <h5 className="font-heading text-[11px] font-extrabold uppercase tracking-wider text-[#030B7D]">Electronic Cell Substitutes</h5>
                               </div>
                               <div className="w-full h-[1px] bg-[#EEF0FB] mb-4" />
                               <ul className="flex flex-col gap-2">
                                 {["DANIEL CELL", "LECHLANCHE CELL", "WESTON CADMIUM CELL"].map((item, idx) => (
                                   <li key={idx} className="group/item flex items-center gap-1.5">
                                     <ChevronRight className="w-3.5 h-3.5 text-[#38BDF8] group-hover/item:translate-x-0.5 transition-transform" />
                                     <Link
                                       to={`/products?title=${encodeURIComponent(item)}`}
                                       className="text-[12px] font-semibold text-slate-900 group-hover/item:text-[#030B7D] transition-colors leading-tight block py-0.5"
                                     >
                                       {item}
                                     </Link>
                                   </li>
                                 ))}
                               </ul>
                             </div>
                           </div>

                           {/* Column 2 */}
                           <div className="flex flex-col gap-8 border-r border-[#EEF0FB] pr-6">
                             {/* DECADE BOXES */}
                             <div>
                               <div className="flex items-center gap-3 mb-3">
                                 <div className="w-9 h-9 rounded-lg bg-[#030B7D]/5 flex items-center justify-center text-[#030B7D]">
                                   <Box className="w-5 h-5" />
                                 </div>
                                 <h5 className="font-heading text-[11px] font-extrabold uppercase tracking-wider text-[#030B7D]">Decade Boxes</h5>
                               </div>
                               <div className="w-full h-[1px] bg-[#EEF0FB] mb-4" />
                               <ul className="flex flex-col gap-2">
                                 {["DECADE RESISTANCE BOX", "DECADE CAPACITANCE BOX", "DECADE INDUCTANCE BOX"].map((item, idx) => (
                                   <li key={idx} className="group/item flex items-center gap-1.5">
                                     <ChevronRight className="w-3.5 h-3.5 text-[#38BDF8] group-hover/item:translate-x-0.5 transition-transform" />
                                     <Link
                                       to={`/products?title=${encodeURIComponent(item)}`}
                                       className="text-[12px] font-semibold text-slate-900 group-hover/item:text-[#030B7D] transition-colors leading-tight block py-0.5"
                                     >
                                       {item}
                                     </Link>
                                   </li>
                                 ))}
                               </ul>
                             </div>

                             {/* STANDARDS */}
                             <div>
                               <div className="flex items-center gap-3 mb-3">
                                 <div className="w-9 h-9 rounded-lg bg-[#030B7D]/5 flex items-center justify-center text-[#030B7D]">
                                   <CheckCircle className="w-5 h-5" />
                                 </div>
                                 <h5 className="font-heading text-[11px] font-extrabold uppercase tracking-wider text-[#030B7D]">Standards</h5>
                               </div>
                               <div className="w-full h-[1px] bg-[#EEF0FB] mb-4" />
                               <ul className="flex flex-col gap-2">
                                 {["STANDARD RESISTOR", "STANDARD CAPACITOR"].map((item, idx) => (
                                   <li key={idx} className="group/item flex items-center gap-1.5">
                                     <ChevronRight className="w-3.5 h-3.5 text-[#38BDF8] group-hover/item:translate-x-0.5 transition-transform" />
                                     <Link
                                       to={`/products?title=${encodeURIComponent(item)}`}
                                       className="text-[12px] font-semibold text-slate-900 group-hover/item:text-[#030B7D] transition-colors leading-tight block py-0.5"
                                     >
                                       {item}
                                     </Link>
                                   </li>
                                 ))}
                               </ul>
                             </div>

                             {/* INDUCTANCE COILS */}
                             <div>
                               <div className="flex items-center gap-3 mb-3">
                               </div>
                               <div className="w-full h-[1px] bg-[#EEF0FB] mb-4" />
                               <ul className="flex flex-col gap-2">
                                 {["Inductance Coils","FOUR PROBE", "CORNU'S"].map((item, idx) => (
                                   <li key={idx} className="group/item flex items-center gap-1.5">
                                     <ChevronRight className="w-3.5 h-3.5 text-[#38BDF8] group-hover/item:translate-x-0.5 transition-transform" />
                                     <Link
                                       to={`/products?title=${encodeURIComponent(item)}`}
                                       className="text-[12px] font-semibold text-slate-900 group-hover/item:text-[#030B7D] transition-colors leading-tight block py-0.5"
                                     >
                                       {item}
                                     </Link>
                                   </li>
                                 ))}
                               </ul>
                             </div>
                           </div>

                           {/* Column 3 */}
                           <div className="flex flex-col gap-6">
                             {/* OTHER LABORATORIES */}
                             <div>
                               <div className="flex items-center gap-3 mb-3">
                                 <div className="w-9 h-9 rounded-lg bg-[#030B7D]/5 flex items-center justify-center text-[#030B7D]">
                                   <FlaskConical className="w-5 h-5" />
                                 </div>
                                 <h5 className="font-heading text-[11px] font-extrabold uppercase tracking-wider text-[#030B7D]">Other Laboratories</h5>
                               </div>
                               <div className="w-full h-[1px] bg-[#EEF0FB] mb-4" />
                               <ul className="flex flex-col gap-2">
                                 {[
                                   "MICHELSON INTERFEROMETER",
                                   "HALL EFFECT",
                                   "LASER",
                                   "FIBRE OPTICS",
                                   "DIODE CHARACTERISTICS",
                                   "TRANSISTOR CHARACTERISTICS",
                                   "SONOMETER",
                                   "METER BRIDGE",
                                   "10 WIRE POTENTIOMETER",
                                   "PH METER",
                                   "CONDUCTIVITY",
                                   "DIGITAL POTENTIOMETER"
                                 ].map((item, idx) => (
                                   <li key={idx} className="group/item flex items-center gap-1.5">
                                     <ChevronRight className="w-3.5 h-3.5 text-[#38BDF8] group-hover/item:translate-x-0.5 transition-transform" />
                                     <Link
                                       to={`/products?title=${encodeURIComponent(item)}`}
                                       className="text-[12px] font-semibold text-slate-900 group-hover/item:text-[#030B7D] transition-colors leading-tight block py-0.5"
                                     >
                                       {item}
                                     </Link>
                                   </li>
                                 ))}
                               </ul>
                             </div>
                           </div>

                         </div>
                      </div>

                    </li>
                  );
                }

                return (
                  <li key={link.path} className="flex items-center">
                    <Link
                      to={link.path}
                      className={`font-heading text-[11px] font-bold uppercase tracking-wider relative py-1.5 flex items-center group transition-colors duration-300 ${
                        isActive ? 'text-[#030B7D]' : 'text-[#030B7D]/85 hover:text-[#030B7D]'
                      }`}
                    >
                      {link.name}
                      <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#030B7D] transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <Link
              to="/contact"
              className="ml-2 font-heading text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-md transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap text-white bg-[#030B7D] hover:bg-[#020860] hover:shadow-brand-glow shadow-sm group"
            >
              <span>Get a Quote</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 transition-colors focus:outline-none text-[#030B7D] hover:text-[#020860] hover:bg-slate-100 rounded-md"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-[#020637]/75 backdrop-blur-sm z-[45] transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Nav Drawer — Dark Blue Theme */}
      <div
        className={`fixed top-0 right-0 w-[85vw] max-w-[340px] h-full bg-[#030B7D] text-white border-l border-white/10 z-[50] shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-350 lg:hidden overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/15 mb-6">
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="PICO Logo" className="h-8 w-auto object-contain brightness-0 invert" />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              if (link.name === 'Products') {
                return (
                  <li key={link.path} className="border-b border-white/10 pb-2">
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className={`w-full flex items-center justify-between font-heading text-sm font-bold py-2.5 px-3 rounded-lg transition-all duration-200 ${mobileProductsOpen
                        ? 'text-white bg-white/15 border-l-4 border-cyan-400'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      <span>{link.name}</span>
                      {mobileProductsOpen ? <ChevronUp className="w-4 h-4 text-cyan-300" /> : <ChevronDown className="w-4 h-4 text-cyan-300" />}
                    </button>

                    {/* Expandable Accordion Menu */}
                    <div className={`overflow-hidden transition-all duration-300 ${mobileProductsOpen ? 'max-h-[85vh] overflow-y-auto mt-3 pl-1' : 'max-h-0'}`}>
                      <div className="flex flex-col gap-3 pr-1">

                        {/* Chaos */}
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Activity className="w-3.5 h-3.5 text-cyan-300" />
                            <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">CHAOS</p>
                          </div>
                          <ul className="flex flex-col gap-1.5 pl-1">
                            {["CHAAOS 1", "CHAAOS 2", "CHAAOS 3"].map((item, i) => (
                              <li key={i} className="flex items-center gap-1.5 py-0.5">
                                <ChevronRight className="w-2.5 h-2.5 text-cyan-400/60" />
                                <Link to={`/products?title=${encodeURIComponent(item)}`} onClick={() => setIsOpen(false)} className="text-[11px] font-medium text-white/80 hover:text-white transition-colors">{item}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Ultrasonic */}
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Waves className="w-3.5 h-3.5 text-cyan-300" />
                            <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Ultrasonic Interferometer</p>
                          </div>
                          <ul className="flex flex-col gap-1.5 pl-1">
                            {["SINGLE FREQUENCY", "MULTI FREQUENCY", "ULTRASONIC BIO03", "ULTRASONIC ANALOG IMPROVED"].map((item, i) => (
                              <li key={i} className="flex items-center gap-1.5 py-0.5">
                                <ChevronRight className="w-2.5 h-2.5 text-cyan-400/60" />
                                <Link to={`/products?title=${encodeURIComponent(item)}`} onClick={() => setIsOpen(false)} className="text-[11px] font-medium text-white/80 hover:text-white transition-colors">{item}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Standards */}
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-cyan-300" />
                            <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Standards</p>
                          </div>
                          <ul className="flex flex-col gap-1.5 pl-1">
                            {["STANDARD RESISTOR", "STANDARD CAPACITOR"].map((item, i) => (
                              <li key={i} className="flex items-center gap-1.5 py-0.5">
                                <ChevronRight className="w-2.5 h-2.5 text-cyan-400/60" />
                                <Link to={`/products?title=${encodeURIComponent(item)}`} onClick={() => setIsOpen(false)} className="text-[11px] font-medium text-white/80 hover:text-white transition-colors">{item}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Decade Boxes */}
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Box className="w-3.5 h-3.5 text-cyan-300" />
                            <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Decade Boxes</p>
                          </div>

                          <ul className="flex flex-col gap-1.5 pl-1">
                            {["DECADE RESISTANCE BOX", "DECADE CAPACITANCE BOX", "DECADE INDUCTANCE BOX"].map((item, i) => (
                              <li key={i} className="flex items-center gap-1.5 py-0.5">
                                <ChevronRight className="w-2.5 h-2.5 text-cyan-400/60" />
                                <Link to={`/products?title=${encodeURIComponent(item)}`} onClick={() => setIsOpen(false)} className="text-[11px] font-medium text-white/80 hover:text-white transition-colors">{item}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Cell Substitutes */}
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1.5">
                            <BatteryCharging className="w-3.5 h-3.5 text-cyan-300" />
                            <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Electronic Cell Substitutes</p>
                          </div>
                          <ul className="flex flex-col gap-1.5 pl-1">
                            {["DANIEL CELL", "LECHLANCHE CELL", "WESTON CADMIUM CELL"].map((item, i) => (
                              <li key={i} className="flex items-center gap-1.5 py-0.5">
                                <ChevronRight className="w-2.5 h-2.5 text-cyan-400/60" />
                                <Link to={`/products?title=${encodeURIComponent(item)}`} onClick={() => setIsOpen(false)} className="text-[11px] font-medium text-white/80 hover:text-white transition-colors">{item}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Other Labs */}
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1.5">
                            <FlaskConical className="w-3.5 h-3.5 text-cyan-300" />
                            <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Other Laboratories</p>
                          </div>
                          <ul className="flex flex-col gap-1.5 pl-1">
                            {["MICHELSON INTERFEROMETER", "HALL EFFECT", "LASER", "FIBRE OPTICS", "DIODE CHARACTERISTICS", "TRANSISTOR CHARACTERISTICS", "SONOMETER", "METER BRIDGE", "10 WIRE POTENTIOMETER", "PH METER", "CONDUCTIVITY", "DIGITAL POTENTIOMETER"].map((item, i) => (
                              <li key={i} className="flex items-center gap-1.5 py-0.5">
                                <ChevronRight className="w-2.5 h-2.5 text-cyan-400/60" />
                                <Link to={`/products?title=${encodeURIComponent(item)}`} onClick={() => setIsOpen(false)} className="text-[11px] font-medium text-white/80 hover:text-white transition-colors">{item}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.path} className="border-b border-white/10 pb-2">
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-heading text-sm font-bold block py-2.5 px-3 rounded-lg transition-all duration-200 ${isActive
                      ? 'text-white bg-white/15 border-l-4 border-cyan-400'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/15 pt-6 mt-6">
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full font-heading text-xs font-bold uppercase tracking-wider text-center text-[#030B7D] bg-white py-3.5 rounded-lg hover:bg-slate-100 transition-colors shadow-md flex items-center justify-center gap-2 font-bold"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="text-[11px] text-white/80 flex flex-col gap-2 pl-1 font-medium">
            <span className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              +91 44 43302775
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              pico@pico.in
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

// Quick filter helper to change FAQ label if needed
function faqNameFilter(name) {
  return name === 'FAQ' ? 'FAQs' : name;
}

