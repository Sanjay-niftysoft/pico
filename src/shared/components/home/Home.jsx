import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mail, Phone, MapPin, ArrowRight, ChevronLeft, ChevronRight,
  Award, CheckCircle, GraduationCap, Compass, History, Globe, Cpu,
  BadgeCheck, ChevronDown, Send, Check, PhoneCall, FileEdit,
  MessageSquare, FileCheck, CheckCircle2, ShieldCheck, Zap, Factory, Star, Share2,
  Grid3X3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

// Image assets (using relative paths from src/shared/components/home/)
import heroLab from '../../../assets/images/hero_lab.jpg';
import heroElectrospinning from '../../../assets/images/hero_electrospinning.jpg';
import heroEducation from '../../../assets/images/hero_education.jpg';
import aboutImg from '../../../assets/images/about_equipment.jpg';
import aboutCollage from '../../../assets/images/about_collage.png';
import aboutEspinNano from '../../../assets/images/product_espin_nano.jpg';



// ============================================================================
// AUXILIARY COMPONENTS
// ============================================================================

function Counter({ end, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const increment = end / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

function ScrollReveal({ children, delay = 0, duration = 800, distance = "translate-y-8", className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
      className={`transition-all ease-out transform ${className} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : `opacity-0 ${distance}`
        }`}
    >
      {children}
    </div>
  );
}

// ============================================================================
// 1. HERO COMPONENT
// ============================================================================

function Hero() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/banner/banner1.png',
      eyebrow: "CHAAOS SERIES",
      title: <>Non-Linear Dynamics.<br /><span className="text-white">Mapping Chaotic Oscillations.</span></>,
      desc: "Advanced non-linear dynamics research setups designed for mapping chaotic pendulum oscillations, electronic chaos circuits, bifurcations, and phase space plots."
    },
    {
      image: '/banner/banner2.png',
      eyebrow: "ULTRASONIC INTERFEROMETERS",
      title: <>Acoustic Velocity.<br /><span className="text-white">Precision Wave Measurement.</span></>,
      desc: "High-precision wave-velocity measurement in liquids operating across single and multiple quartz crystal frequencies. Developed in cooperation with CSIR-NPL, New Delhi."
    },
    {
      image: '/banner/banner3.png',
      eyebrow: "LABORATORY STANDARDS",
      title: <>Decade Dial Boxes.<br /><span className="text-white">Reliable Resistance & Capacitance.</span></>,
      desc: "Dial calibration standard decade resistance and capacitance boxes utilizing non-inductive bifilar wound Manganin wire dial resistors."
    },
    {
      image: '/banner/banner4.png',
      eyebrow: "METROLOGY & STANDARDS",
      title: <>Primary Standards.<br /><span className="text-white">Reference Calibration Coils.</span></>,
      desc: "High-stability reference standard inductors and standard resistors designed for absolute precision inside scientific calibration and research labs."
    },
    {
      image: '/banner/banner5.png',
      eyebrow: "VOLTAGE STANDARDS",
      title: <>Electronic Cell Substitutes.<br /><span className="text-white">Stable Solid-State References.</span></>,
      desc: "Solid-state, high-stability reference voltage sources designed to replace traditional liquid Daniell and Leclanché chemical standard cells, ensuring zero maintenance."
    }
  ];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide every 1 second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

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

  return (
    <section className="relative w-full min-h-screen lg:h-screen lg:min-h-[650px] bg-navy-primary overflow-hidden flex items-center pt-28 pb-16 lg:py-0">
      {/* Background Images Slideshow with Crossfade & Parallax - Position adjusted on mobile */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full bg-cover bg-[70%_center] sm:bg-center transition-all duration-[400ms] ease-in-out"
          style={{
            backgroundImage: `url("${slide.image}")`,
            opacity: index === currentSlide ? 1 : 0,
            transform: `scale(${index === currentSlide ? 1.0 : 1.05}) translateY(${scrollY * 0.15}px)`,
            zIndex: index === currentSlide ? 1 : 0
          }}
        />
      ))}

      {/* Soft color-neutral dark gradient overlay on the left for text contrast, leaving the product images on the right fully natural */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/15 to-transparent z-10" />

      {/* Far Left and Right Arrow Navigation Controls - Hidden on Mobile */}
      <button
        onClick={handlePrevSlide}
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/15 bg-navy-primary/45 text-white items-center justify-center transition-all duration-300 z-30 hover:bg-sci-accent hover:border-sci-accent cursor-pointer hover:scale-105"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNextSlide}
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/15 bg-navy-primary/45 text-white items-center justify-center transition-all duration-300 z-30 hover:bg-sci-accent hover:border-sci-accent cursor-pointer hover:scale-105"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Cinematic Content Grid */}
      <div className="relative w-full flex items-center z-20 h-full">
        <div className="max-w-[1240px] mx-auto px-6 w-full relative">

          {/* Slides Content */}
          <div className="max-w-[700px] text-left relative w-full flex flex-col justify-center py-6 lg:py-0">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 w-full flex flex-col justify-center ${index === currentSlide
                  ? 'relative opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                  : 'absolute top-0 left-0 h-full opacity-0 translate-y-4 scale-95 pointer-events-none z-0'
                  }`}
              >
                {/* Eyebrow */}
                <span className="font-heading text-[10px] sm:text-xs lg:text-sm font-bold tracking-[0.25em] text-white uppercase mb-3 inline-block">
                  {slide.eyebrow}
                </span>

                {/* Heading */}
                <h1 className="text-2xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.15] mb-5 tracking-tight">
                  {slide.title}
                </h1>

                {/* Supporting description */}
                <p className="text-sm sm:text-lg text-white/90 mb-6 max-w-[580px] font-normal leading-relaxed">
                  {slide.desc}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
                  <a
                    href="#products"
                    onClick={(e) => handleScrollTo(e, 'products')}
                    className="font-heading text-xs font-bold uppercase tracking-wider text-white bg-sci-accent px-7 py-4 rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-sci-accent/25 cursor-pointer w-full sm:w-auto text-center"
                  >
                    <span>Explore Our Instruments</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#about"
                    onClick={(e) => handleScrollTo(e, 'about')}
                    className="font-heading text-xs font-bold uppercase tracking-wider text-white border border-white/20 px-7 py-4 rounded-md hover:bg-white/10 hover:border-white transition-all duration-200 text-center cursor-pointer w-full sm:w-auto block"
                  >
                    About Us
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2.5 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? 'w-8 bg-sci-cyan' : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}

// ============================================================================
// 2. TRUST / METRICS COMPONENT
// ============================================================================

function Metrics() {
  const stats = [
    { value: 65, suffix: "+", label: "Years of Engineering Excellence", icon: History, logoImg: "/logo2/years.jpg" },
    { value: 50, suffix: "+", label: "Precision Instruments Developed", icon: Cpu, logoImg: "/logo2/instruments.jpg" },
    { value: 9001, suffix: "", label: "ISO Certified Quality (9001:2015)", icon: BadgeCheck, raw: "9001", logoImg: "/logo2/iso.png" },
    { value: 1, suffix: "", label: "MSME Registered Pioneer Company", icon: Award, raw: "MSME", logoImg: "/logo2/msme.png" },
    { value: 3, suffix: "", label: "IEC Registered Exporter Company", icon: Globe, raw: "IEC", logoImg: "/logo2/iec.png" },
    { value: 4, suffix: "", label: "100% Make in India Compliant", icon: Factory, raw: "INDIA", logoImg: "/logo2/make in india.png" },
  ];

  return (
    <section className="relative bg-[#E8EAFA] border-b border-[#C5CBF5] overflow-hidden">
      {/* Subtle dotted grid overlay pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#030B7D_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="max-w-[1240px] mx-auto px-6 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 120} distance="translate-y-6" className="h-full">
                <div
                  className="group relative bg-white border border-sci-light/80 rounded-2xl px-5 py-8 sm:px-6 sm:py-10 flex flex-col items-center text-center h-full shadow-sm hover:shadow-xl hover:shadow-sci-blue/10 hover:border-sci-accent/40 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-default overflow-hidden"
                >
                  {/* Subtle accent glow that appears on hover */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-sci-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon or Image badge */}
                  <div className="h-12 flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {stat.logoImg ? (
                      <img
                        src={stat.logoImg}
                        alt={stat.label}
                        className="max-h-full object-contain filter grayscale mix-blend-multiply contrast-125"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-sci-blue/5 flex items-center justify-center text-sci-blue group-hover:bg-sci-accent group-hover:text-white group-hover:rotate-3 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Number */}
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-black mb-2 tracking-tight relative z-10 transition-colors duration-300">
                    {stat.raw ? (
                      stat.raw
                    ) : (
                      <Counter end={stat.value} suffix={stat.suffix} />
                    )}
                  </span>

                  {/* Label */}
                  <span className="text-xs sm:text-sm font-semibold text-black tracking-wide leading-relaxed max-w-[180px] relative z-10">
                    {stat.label}
                  </span>

                  {/* Bottom accent line that grows on hover */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 bg-sci-accent rounded-full group-hover:w-1/2 transition-all duration-300" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 3. ABOUT US COMPONENT
// ============================================================================

function About() {
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

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Storytelling Content */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black mb-3 inline-block">
              ABOUT PHYSICS INSTRUMENTS CO.
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-black leading-[1.15] mb-6 tracking-tight">
              Engineering Precision. <br />
              <span className="text-black">Empowering Innovation.</span>
            </h2>

            <div className="text-black text-base leading-relaxed space-y-4 mb-8">
              <p>
                Physics Instruments Co. (PICO) was incorporated in <strong>1959</strong> by the esteemed <strong>Prof. T. Krishnamurthi</strong> following his retirement as a Professor of Physics at the prestigious <strong>Presidency College, Madras</strong>.
              </p>
              <p>
                For over six decades, PICO has dedicated itself to manufacturing and exporting research-grade and educational scientific equipment. Our products serve national research institutes, defense organizations, universities, and nanotech startup labs globally.
              </p>
              <p>
                Known for accuracy, academic rigor, and durability, our product development includes notable milestones such as custom velocity measurement interferometers built in collaboration with the <strong>CSIR-National Physical Laboratory (CSIR-NPL), New Delhi</strong>.
              </p>
            </div>

            <div>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="font-heading text-xs font-bold uppercase tracking-wider text-white bg-sci-accent px-7 py-4 rounded-md hover:bg-blue-700 transition-all duration-200 inline-flex items-center gap-2 group hover:shadow-lg hover:shadow-sci-accent/25 cursor-pointer"
              >
                <span>Discover Our Journey</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Composited Image composition */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-[580px]">
              {/* Main Image - with hover zoom animation */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-sci-light/50 bg-white group cursor-default hover:shadow-[0_20px_60px_-10px_rgba(11,59,130,0.25)] transition-all duration-500">
                <img
                  src='/c1.jpg'
                  alt="PICO Physics Instruments Collage"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle blue shimmer overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sci-blue/0 to-sci-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 3b. CATEGORIES SECTION COMPONENT
// ===========================================================================
const HOME_CATEGORIES = [
  {
    title: 'CHAAOS 1',
    slug: 'chaaos-1',
    image: '/banner/product/ch1 (1).jpg',
    desc: 'Advanced non-linear dynamics research setup for chaotic pendulum oscillations.'
  },
  {
    title: 'CHAAOS 2',
    slug: 'chaaos-2',
    image: '/banner/product/CHAAOS2.png',
    desc: 'pH / Concentration curve tracer and Figures Diode non-linear circuit study.'
  },
  {
    title: 'CHAAOS 3',
    slug: 'chaaos-3',
    image: '/banner/product/ch13.jpg',
    desc: 'Advanced experimental systems for chaotic motion and bifurcation analysis.'
  },
  {
    title: 'ULTRASONIC BIO3',
    slug: 'ultrasonic-bio3',
    image: '/banner/product/u1.jpg',
    desc: 'Specialized biochemical research cells for micro-sample velocity study.'
  },
  {
    title: 'ULTRASONIC ANALOG IMPROVED',
    slug: 'ULTRASONIC ANALOG IMPROVED',
    image: '/banner/product/ULTROSONIC ANALOG IMPROVED.png',
    desc: 'Direct dial readout micrometer adjustment high thermal stability.'
  },
  {
    title: 'DECADE RESISTANCE BOX',
    slug: 'decade-resistance-box',
    image: '/banner/product/dr1.jpg',
    desc: 'High-resolution decade dial resistance boxes for laboratory calibration.'
  },
  {
    title: 'DECADE CAPACITANCE BOX',
    slug: 'decade-capacitance-box',
    image: '/banner/product/image copy.png',
    desc: 'Precision capacitance selection and laboratory standards.'
  },
  {
    title: 'DECADE INDUCTANCE BOX',
    slug: 'decade-inductance-box',
    image: '/banner/product/dc3.jpg',
    desc: 'Toroidal multi-tap decade inductance box with low magnetic coupling.'
  },
  {
    title: 'STANDARD RESISTOR',
    slug: 'standard-resistor',
    image: '/banner/product/sr1.jpg',
    desc: 'High-precision reference standard for resistance calibration.'
  },
  {
    title: 'DANIEL CELL',
    slug: 'daniel-cell',
    image: '/banner/product/d1.jpg',
    desc: 'Standard copper-zinc electrochemical cell potential reference.'
  },
  {
    title: 'LECLANCHE CELL',
    slug: 'leclanche-cell',
    image: '/banner/product/WestonCadmiumCell.png',
    desc: 'Traditional solid-state Leclanché cell reference standard.'
  },
  {
    title: 'WESTON CADMIUM CELL',
    slug: 'weston-cadmium-cell',
    image: '/banner/product/l1.jpg',
    desc: '1.018 V high-stability Weston Cadmium voltage reference cell.'
  },
  {
    title: 'HALL EFFECT',
    slug: 'hall-effect',
    image: '/banner/product/Hall Effect Apparatus.png',
    desc: 'Dual electromagnet coil semiconductor Hall coefficient setup.'
  },
  {
    title: 'LASER',
    slug: 'laser',
    image: '/banner/product/laser.jpg',
    desc: 'Optical rail system with semiconductor red/green sources.'
  },
  {
    title: 'FIBRE OPTICS',
    slug: 'fibre-optics',
    image: '/banner/product/fibre.jpg',
    desc: 'Power meter and light source numerical aperture study kit.'
  },
  {
    title: 'SONOMETER',
    slug: 'sonometer',
    image: '/banner/product/sonometer.jpg',
    desc: 'A.C. string vibration experiment setup with 6V/1A power supply.'
  },
  {
    title: '10 WIRE POTENTIOMETER',
    slug: '10-wire-potentiometer',
    image: '/banner/product/potentiometer.jpg',
    desc: '10 meters resistance wire teakwood frame EMF comparative calibration.'
  },
  {
    title: 'PH METER',
    slug: 'ph-meter',
    image: '/banner/product/PH METER.png',
    desc: 'Digital pH measurement system with temperature compensation.'
  },
  {
    title: 'CONDUCTIVITY',
    slug: 'conductivity',
    image: '/banner/product/conductivity.jpg',
    desc: 'Model 202 conductivity meter with built-in reference oscillator.'
  },
  {
    title: 'DIGITAL POTENTIOMETER',
    slug: 'digital-potentiometer',
    image: '/banner/product/dial-potentiometer.jpg',
    desc: 'Direct reading dial potentiometer with galvanometer null detector.'
  }
];

function HomeCategories() {
  const [visible, setVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) { setVisible(true); return; }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setVisible(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setLoading(false);
    }, 450);
  };

  const visibleCategories = HOME_CATEGORIES.slice(0, visibleCount);
  const hasMore = visibleCount < HOME_CATEGORIES.length;

  return (
    <section ref={sectionRef} className="py-24 bg-[#F4F5FD] relative border-b border-[#EEF0FB]">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#030B7D_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-[1340px] mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 text-left">
          <div>
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-[#1A2FD4] mb-3 inline-block">
              PRODUCT CATALOG
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-[#030B7D] tracking-tight leading-[1.1]">
              Browse all Categories
            </h2>
            <p className="text-[#3A3F8A] text-sm mt-3 max-w-[480px] leading-relaxed" style={{color:'black'}}>
              Explore our complete list of individual instruments and scientific laboratory division setups.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-[#030B7D] border border-[#030B7D] px-6 py-3 rounded-md hover:bg-[#030B7D] hover:text-white transition-all duration-300 shrink-0 self-start sm:self-auto"
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>View Category</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCategories.map((cat, idx) => (
            <div
              key={cat.slug}
              className="group bg-white border border-[#EEF0FB] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#030B7D]/[0.12] hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col h-full"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 650ms ease-out ${(idx % 6) * 65}ms, transform 650ms ease-out ${(idx % 6) * 65}ms, box-shadow 300ms ease-out, border-color 300ms ease-out, transform 500ms ease-out`,
              }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/3] bg-[#F4F5FD] flex items-center justify-center">
                {cat.image ? (
                  <img
                    src={cat.image.startsWith('public/') ? cat.image.substring(6) : cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#030B7D]/5 to-[#030B7D]/10 flex flex-col items-center justify-center text-center p-6">
                    <Grid3X3 className="w-8 h-8 text-[#030B7D]/20 mb-2" />
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#030B7D]/60 mb-1">Standard Series</span>
                    <p className="text-[13px] font-bold text-[#030B7D] leading-snug px-3">{cat.title}</p>
                  </div>
                )}
                {/* Gradient shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030B7D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow text-left">
                <h3 className="font-heading text-base font-bold text-[#030B7D] mb-2 leading-snug group-hover:text-[#1A2FD4] transition-colors duration-300">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-slate-900 leading-relaxed mb-6 flex-grow" style={{color:'black'}}>
                  {cat.desc}
                </p>

                {/* Animated accent underline */}
                <div className="h-[2px] w-0 bg-gradient-to-r from-[#030B7D] to-[#1A2FD4] rounded-full mb-4 group-hover:w-full transition-all duration-500 ease-out" />

                <Link
                  to={`/products?search=${encodeURIComponent(cat.title)}`}
                  className="group/btn inline-flex items-center justify-center gap-2 font-heading text-[10px] font-bold uppercase tracking-wider text-white bg-[#030B7D] px-4 py-2.5 rounded-md hover:bg-[#1A2FD4] transition-all duration-300 hover:shadow-lg hover:shadow-[#030B7D]/25 hover:-translate-y-0.5 w-full text-center"
                >
                  <span>View Category</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Categories Trigger */}
        {hasMore && (
          <div className="flex justify-center mt-16">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="group inline-flex items-center justify-center gap-3 font-heading text-xs font-bold uppercase tracking-wider text-white bg-[#030B7D] hover:bg-[#1A2FD4] px-10 py-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-[#030B7D]/25 hover:-translate-y-0.5 min-w-[200px]"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Load More Categories</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// 4. PRODUCT CATALOG / FEATURED SHOWCASE COMPONENT
// ============================================================================

function ProductShowcase({ onOpenDrawer, productsData }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const featuredList = [
    {
      id: 'Chaaos 1',
      num: '01',
      title: 'Chaaos 1',
      series: 'CHAAOS Series',
      desc: 'Advanced non-linear dynamics research setup designed for studying chaotic pendulum oscillations, electronic chaos circuits, bifurcations, and phase space behavior.',
      image: '/banner/product/ch1 (1).jpg',
      prodId: 'chaaos-1'
    },
    {
      id: 'Chaaos 3',
      num: '02',
      title: 'Chaaos 3 ',
      series: 'CHAAOS Series',
      desc: 'Advanced experimental system for investigating chaotic motion, non-linear dynamics, bifurcation behavior, and phase space analysis.',
      image: '/banner/product/ch13.jpg',
      prodId: 'chaaos-2'
    },
    {
      id: 'ULTROSONIC Bl03',
      num: '03',
      title: 'ULTROSONIC Bl03',
      series: 'Single Frequency Series',
      desc: 'Precision ultrasonic interferometer designed for measuring the velocity of ultrasonic waves in liquids using a single quartz crystal frequency.',
      image: '/banner/product/u2.jpg',
      prodId: 'interferometer-single'
    },
    {
      id: 'ULTROSONIC ANALOG IMPROVED',
      num: '04',
      title: 'Ultrasonic Interferometer – Multi Frequency',
      series: 'Multi Frequency Series',
      desc: 'High-precision ultrasonic interferometer operating at multiple quartz crystal frequencies for accurate wave-velocity measurements in liquids.',
      image: '/banner/product/u1.jpg',
      prodId: 'interferometer-multi'
    },
    {
      id: 'Decade Resistance Box',
      num: '05',
      title: 'Decade Resistance Box',
      series: 'Resistance Standards Series',
      desc: 'Precision decade resistance box designed for laboratory experiments, electrical measurements, circuit calibration, and resistance studies.',
      image: '/banner/product/dr1.jpg',
      prodId: 'decade-resistance'
    },
    {
      id: 'Decade Capacitance Box',
      num: '06',
      title: 'Decade Capacitance Box',
      series: 'Capacitance Standards Series',
      desc: 'Precision decade capacitance box designed for accurate capacitance selection, electrical measurements, circuit experiments, and laboratory calibration.',
      image: '/banner/product/dc3.jpg',
      prodId: 'decade-capacitance'
    },
    {
      id: 'Standard Resistor',
      num: '07',
      title: 'Standard Resistor',
      series: 'Precision Resistance Series',
      desc: 'High-precision standard resistor designed for laboratory measurements, calibration experiments, resistance comparison, and electrical instrumentation.',
      image: '/banner/product/sr1.jpg',
      prodId: 'standard-resistor'
    },
    {
      id: 'Daniel Cell',
      num: '08',
      title: 'Daniel Cell',
      series: 'Electrochemical Cell Series',
      desc: 'Laboratory Daniel cell designed for demonstrating electrochemical principles, cell potential, electrode reactions, and fundamental battery experiments.',
      image: '/banner/product/d1.jpg',
      prodId: 'daniel-cell'
    },
    {
      id: 'Lechlanche Cell',
      num: '09',
      title: 'Leclanché Cell',
      series: 'Electrochemical Cell Series',
      desc: 'Traditional Leclanché electrochemical cell designed for demonstrating battery principles, electrode reactions, voltage generation, and basic electrochemistry experiments.',
      image: '/banner/product/l1.jpg',
      prodId: 'leclanche-cell'
    }
  ];

  // Auto-scroll products one by one in sequence
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % featuredList.length);
    }, 3000); // Changes every 3 seconds
    return () => clearInterval(timer);
  }, [featuredList.length]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % featuredList.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + featuredList.length) % featuredList.length);
  };

  return (
    <section
      id="products"
      className="relative py-24 bg-navy-primary text-white border-y border-white/5"
    >
      <div className="max-w-[1240px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Product Category Nav Links */}
        <div className="lg:col-span-5 text-left flex flex-col justify-center z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4 inline-block">
            PRODUCT CATALOG
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight mb-8 tracking-tight">
            Precision Instruments <br className="hidden lg:block" />
            for Every Discovery
          </h2>

          {/* Vertically Aligned Sticky Scroll Item list */}
          <div className="space-y-4">
            {featuredList.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className="w-full flex items-center gap-4 py-2.5 border-b border-white/10 group text-left cursor-pointer transition-all duration-300 focus:outline-none"
              >
                <span className={`font-heading text-xs font-bold transition-colors duration-300 ${idx === activeIdx ? 'text-sci-accent' : 'text-white'}`}>
                  {item.num}
                </span>
                <span className={`font-heading text-sm sm:text-base font-semibold transition-colors duration-300 ${idx === activeIdx ? 'text-white pl-2' : 'text-white'}`}>
                  {item.title}
                </span>

                {/* Underline scale expand indicator */}
                <span className={`h-[1px] bg-sci-accent transition-all duration-500 origin-left ${idx === activeIdx ? 'flex-grow scale-x-100 ml-4' : 'w-0 scale-x-0'}`}></span>
              </button>
            ))}

            <div className="pt-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-white/90 border-b border-white/20 hover:text-white hover:border-white pb-1 transition-all duration-200 cursor-pointer"
              >
                <span>View All Products</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Showcase Block */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full relative min-h-[480px]">
          {featuredList.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                const selected = productsData.find(p => p.id === item.prodId);
                if (selected) onOpenDrawer(selected);
              }}
              className={`absolute inset-0 w-full h-full flex flex-col justify-center transition-all duration-500 cursor-pointer ${idx === activeIdx
                ? 'opacity-100 scale-100 pointer-events-auto z-10'
                : 'opacity-0 scale-95 pointer-events-none z-0'
                }`}
            >
              {/* Large Product Image container with Zoom hover */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-navy-deep/80 aspect-[16/10] mb-8 group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/75 to-transparent pointer-events-none" />
              </div>

              {/* Details card content */}
              <div className="text-left">
                <span className="text-[10px] font-bold text-white tracking-widest uppercase mb-1 block">
                  {item.series}
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white text-sm leading-relaxed mb-6 max-w-[580px]">
                  {item.desc}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* View Details triggers details spec drawer */}
                    <button
                      className="inline-flex items-center justify-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-white bg-sci-accent px-6 py-3.5 rounded-md hover:bg-blue-700 hover:shadow-lg hover:shadow-sci-accent/20 transition-all duration-200 cursor-pointer w-full sm:w-auto"
                    >
                      <span>View Product Details</span>
                      <span>→</span>
                    </button>
                  </div>

                  {/* Navigation Arrows for Click-Only Cycling */}
                  <div className="flex items-center justify-center gap-3 w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
                      aria-label="Previous Product"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
                      aria-label="Next Product"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ============================================================================
// 4b. HOME PRODUCT CARD GRID COMPONENT
// ============================================================================

const HOME_PRODUCTS = [
  {
    id: 'chaaos-1',
    categorySlug: 'chaos',
    name: 'CHAAOS 1',
    series: 'CHAOS Series',
    spec: 'Non-linear dynamics simulator, dual analog output, Chua\'s circuit experiments.',
    image: '/banner/product/ch1 (1).jpg',
  },
  {
    id: 'chaaos-2',
    categorySlug: 'chaos',
    name: 'CHAAOS 2',
    series: 'CHAOS Series',
    spec: 'pH / Concentration curve tracer, Figures Diode non-linear circuit.',
    image: '/banner/product/CHAAOS2.png',
  },
  {
    id: 'chaaos-3',
    categorySlug: 'chaos',
    name: 'CHAAOS 3',
    series: 'CHAOS Series',
    spec: 'Bifurcation study, phase space oscilloscope output.',
    image: '/banner/product/ch13.jpg',
  },
  {
    id: 'ultrasonic-digital-liquids',
    categorySlug: 'ultrasonic-interferometer',
    name: 'ULTROSONIC Bl03',
    series: 'Ultrasonic Series',
    spec: 'Precision digital readout sound velocity measurements in liquid samples.',
    image: '/banner/product/u2.jpg',
  },
  {
    id: 'ultrasonic-analog-improved',
    categorySlug: 'ultrasonic-interferometer',
    name: 'ULTRASONIC ANALOG IMPROVED',
    series: 'Ultrasonic Series',
    spec: 'Direct dial readout micrometer adjustment high thermal stability.',
    image: '/banner/product/ULTROSONIC ANALOG IMPROVED.png',
  },
  {
    id: 'four-dial-decade-resistance',
    categorySlug: 'decade-boxes',
    name: 'FOUR DIAL DECADE RESISTANCE BOX',
    series: 'Decade Boxes',
    spec: 'Four decade dials for precise resistance calibration and reference.',
    image: '/banner/product/dr1.jpg',
  },
  {
    id: 'six-dial-decade-resistance',
    categorySlug: 'decade-boxes',
    name: 'SIX DIAL DECADE RESISTANCE BOX',
    series: 'Decade Boxes',
    spec: 'Six decade dials for high resolution calibration and reference.',
    image: '/banner/product/d11.jpg',
  },
  {
    id: 'two-dial-decade-resistance',
    categorySlug: 'decade-boxes',
    name: 'TWO DIAL DECADE RESISTANCE BOX',
    series: 'Decade Boxes',
    spec: 'Two decade dials for compact laboratory calibration and reference.',
    image: '/banner/product/d12.png',
  },
  {
    id: 'three-dial-decade-resistance',
    categorySlug: 'decade-boxes',
    name: 'THREE DIAL DECADE RESISTANCE BOX',
    series: 'Decade Boxes',
    spec: 'Three decade dials for laboratory calibration and reference.',
    image: '/banner/product/d13.png',
  },
  {
    id: 'five-dial-decade-resistance',
    categorySlug: 'decade-boxes',
    name: 'FIVE DIAL DECADE RESISTANCE BOX',
    series: 'Decade Boxes',
    spec: 'Five decade dials for high precision calibration and reference.',
    image: '/banner/product/d14.png',
  },
  {
    id: 'single-dial-decade-resistance',
    categorySlug: 'decade-boxes',
    name: 'SINGLE DIAL DECADE RESISTANCE BOX',
    series: 'Decade Boxes',
    spec: 'Single decade dial for incremental resistance calibration.',
    image: '/banner/product/d15.png',
  },
  {
    id: 'post-office-box',
    categorySlug: 'decade-boxes',
    name: 'POST OFFICE BOX',
    series: 'Decade Boxes',
    spec: 'Standard resistance bridge for telecom and laboratory calibration.',
    image: '/banner/product/d16.png',
  },
  {
    id: 'three-dial-decade-capacitance',
    categorySlug: 'decade-boxes',
    name: 'THREE DIAL DECADE CAPACITANCE BOX',
    series: 'Decade Boxes',
    spec: 'Three dial capacitance selection for standard calibration.',
    image: '/banner/product/image copy.png',
  },
  {
    id: 'two-dial-decade-capacitance',
    categorySlug: 'decade-boxes',
    name: 'TWO DIAL DECADE CAPACITANCE BOX',
    series: 'Decade Boxes',
    spec: 'Two dial capacitance selection for standard calibration.',
    image: '/banner/product/d21.png',
  },
  {
    id: 'single-dial-decade-capacitance',
    categorySlug: 'decade-boxes',
    name: 'SINGLE DIAL DECADE CAPACITANCE BOX',
    series: 'Decade Boxes',
    spec: 'Single dial capacitance selection for standard calibration.',
    image: '/banner/product/d22.png',
  },
  {
    id: 'four-dial-decade-capacitance',
    categorySlug: 'decade-boxes',
    name: 'FOUR DIAL DECADE CAPACITANCE BOX',
    series: 'Decade Boxes',
    spec: 'Four dial capacitance selection for standard calibration.',
    image: '/banner/product/d23.png',
  },
  {
    id: 'terminal-standard-resistor',
    categorySlug: 'standards',
    name: 'TERMINAL STANDARD RESISTOR',
    series: 'Standards',
    spec: 'High precision terminal resistance calibration standard.',
    image: '/banner/product/sr1.jpg',
  },
  {
    id: 'four-terminal-standard-resistor',
    categorySlug: 'standards',
    name: 'FOUR TERMINAL STANDARD RESISTOR',
    series: 'Standards',
    spec: 'Four terminal standard resistor for high precision measurement.',
    image: '/banner/product/four.png',
  },
  {
    id: 'single-double-slit-laser',
    categorySlug: 'other-laboratories',
    name: 'SINGLE & DOUBLE SLIT USING LASER',
    series: 'Optics',
    spec: 'Laser interference and diffraction training equipment.',
    image: '/banner/product/laser.jpg',
  },
  {
    id: 'weston-cadmium-cell-electronic',
    categorySlug: 'electronic-cell-substitutes',
    name: 'WESTON CADMIUM CELL – ELECTRONIC',
    series: 'Cell Substitutes',
    spec: '1.018 V high-stability Weston Cadmium reference voltage cell.',
    image: '/banner/product/WestonCadmiumCell.png',
  },
  {
    id: 'hall-effect',
    categorySlug: 'other-laboratories',
    name: 'HALL EFFECT',
    series: 'Other Laboratories',
    spec: 'Constant current source electromagnet Hall coefficient apparatus.',
    image: '/banner/product/Hall Effect Apparatus.png',
  },
  {
    id: 'conductivity',
    categorySlug: 'other-laboratories',
    name: 'CONDUCTIVITY',
    series: 'Other Laboratories',
    spec: 'Model 202 conductivity measurement with built-in reference oscillator.',
    image: '/banner/product/conductivity.jpg',
  },
  {
    id: 'digital-potentiometer',
    categorySlug: 'other-laboratories',
    name: 'DIGITAL POTENTIOMETER',
    series: 'Other Laboratories',
    spec: 'Model 171 direct reading dial potentiometer with null detector.',
    image: '/banner/product/dial-potentiometer.jpg',
  }
];

function HomeProductCard({ product, delay = 0, visible = false }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 650ms ease-out ${delay}ms, transform 650ms ease-out ${delay}ms`,
      }}
    >
      <div className="group bg-white border border-[#EEF0FB] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#030B7D]/[0.12] hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col h-full">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] bg-[#F4F5FD] flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            />
          ) : (
            <div className="w-full h-full bg-[#F8FAFC] border-b border-slate-100 flex flex-col items-center justify-center p-6 text-center select-none">
              <Grid3X3 className="w-8 h-8 text-[#030B7D]/10 mb-2" />
              <span className="text-[9px] font-heading font-bold uppercase tracking-wider text-slate-400">Photo Pending</span>
            </div>
          )}
          {/* Gradient shimmer */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030B7D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow text-left">
          <h3 className="font-heading text-sm font-bold text-[#030B7D] mb-2 leading-snug group-hover:text-[#1A2FD4] transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-[11px] text-slate-900 leading-relaxed mb-4 flex-grow" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.spec}
          </p>

          {/* Animated accent underline */}
          <div className="h-[2px] w-0 bg-gradient-to-r from-[#030B7D] to-[#1A2FD4] rounded-full mb-4 group-hover:w-full transition-all duration-500 ease-out" />

          <Link
            to={`/products?search=${encodeURIComponent(product.name)}`}
            className="group/btn inline-flex items-center justify-center gap-2 font-heading text-[10px] font-bold uppercase tracking-wider text-white bg-[#030B7D] px-4 py-2.5 rounded-md hover:bg-[#1A2FD4] transition-all duration-300 hover:shadow-lg hover:shadow-[#030B7D]/25 hover:-translate-y-0.5 w-full text-center"
          >
            <span>View</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function HomeProductGrid() {
  const [cardsVisible, setCardsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) { setCardsVisible(true); return; }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setCardsVisible(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 8);
      setLoading(false);
    }, 450);
  };

  const visibleProducts = HOME_PRODUCTS.slice(0, visibleCount);
  const hasMore = visibleCount < HOME_PRODUCTS.length;

  return (
    <section ref={sectionRef} className="py-24 bg-[#F4F5FD] relative">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#030B7D_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-[1340px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-[#1A2FD4] mb-3 inline-block">
              PRODUCT CATALOG
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-[#030B7D] tracking-tight leading-[1.1]">
              All Instruments
            </h2>
            <p className="text-slate-900 text-sm mt-3 max-w-[480px] leading-relaxed">
              Browse our complete range of precision scientific instruments, from chaos dynamics systems to ultrasonic velocity measurement.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-[#030B7D] border border-[#030B7D] px-6 py-3 rounded-md hover:bg-[#030B7D] hover:text-white transition-all duration-300 shrink-0 self-start sm:self-auto"
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"style={{color:'black'}}>
          {visibleProducts.map((product, idx) => (
            <HomeProductCard
              key={product.id}
              product={product}
              delay={(idx % 8) * 70}
              visible={cardsVisible}
            />
          ))}
        </div>

        {/* Load More Trigger */}
        {hasMore && (
          <div className="flex justify-center mt-16">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="group inline-flex items-center justify-center gap-3 font-heading text-xs font-bold uppercase tracking-wider text-white bg-[#030B7D] hover:bg-[#1A2FD4] px-10 py-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-[#030B7D]/25 hover:-translate-y-0.5 min-w-[200px]"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Load More Instruments</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// 5. CAPABILITIES COMPONENT
// ============================================================================

function Capabilities() {
  const list = [
    {
      num: "01",
      title: "Precision Manufacturing",
      desc: "Machined components engineered to narrow tolerances, ensuring stable performance inside experimental physics laboratories.",
      icon: Factory
    },
    {
      num: "02",
      title: "Research Grade Systems",
      desc: "Instruments developed to meet rigorous academic testing standards, supporting research paper validations and student testing labs.",
      icon: ShieldCheck
    },
    {
      num: "03",
      title: "Educational Instruments",
      desc: "Durable design principles, specifically engineered to withstand daily handling inside university student laboratories.",
      icon: GraduationCap
    },
    {
      num: "04",
      title: "Custom Scientific Solutions",
      desc: "Tailored dimensional, voltage, or frequency ranges structured in cooperation with laboratories like CSIR-NPL.",
      icon: Zap
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-sci-light/50">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left mb-16 items-end">
          <div className="lg:col-span-6">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black mb-3 inline-block">
              ENGINEERED FOR IMPACT
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-black tracking-tight">
              Where Engineering <br />
              Meets Experimentation
            </h2>
          </div>
          <div className="lg:col-span-6 text-black text-sm sm:text-base leading-relaxed">
            Physics Instruments Co. bridges the gap between academic theory and laboratory experimentation. We design equipment that delivers reliable results across student classrooms and national research labs.
          </div>
        </div>

        {/* 2-column Grid of Blue Cards on White BG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#E8EAFA] border border-[#C5CBF5] rounded-2xl p-6 sm:p-8 shadow-sm hover:bg-white hover:border-sci-accent/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group text-left flex flex-col justify-between transform"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-sci-blue shrink-0 group-hover:bg-sci-accent group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-black transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-black text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 6. APPLICATIONS COMPONENT
// ============================================================================

function Applications() {
  const panels = [
    {
      title: "Educational Labs",
      desc: "Supporting undergraduate and postgraduate lab curriculum setups with sturdy, student-proof dial decade boxes, resistance boxes, and potentiometers.",
      image: '/PICO-CAPABILITIES/Educational Labs.png',
      num: "01"
    },
    {
      title: "Advanced Research",
      desc: "Providing research-grade systems like ESPIN-NANO electrospinning units and multi-stage chaos study boards to map advanced polymer research parameters.",
      image: '/PICO-CAPABILITIES/Advanced Research.png',
      num: "02"
    },
    {
      title: "Materials Science",
      desc: "Enabling thin-film and material resistance testing through constant current sources, high field electromagnets, and digital bandgap measurement arrays.",
      image: '/PICO-CAPABILITIES/Materials Science.png',
      num: "03"
    },
    {
      title: "Industrial Standards",
      desc: "Delivering reliable reference standards for hardware verification, educational testing modules, and custom scientific development.",
      image: '/PICO-CAPABILITIES/Industrial Standards.png',
      num: "04"
    }
  ];

  return (
    <section className="py-24 bg-white text-black border-b border-[#EEF0FB]">
      <div className="max-w-[1240px] mx-auto px-6">

        {/* Header */}
        <div className="text-left max-w-[680px] mb-16">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-slate-500 mb-3 inline-block" style={{color:'black'}}>
            PICO CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#030B7D] mb-4 tracking-tight">
            Empowering Science. Across Disciplines.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed" style={{color:'black'}}>
            Our systems support physics laboratories, nanotechnology research, acoustics velocity testing, and electrical calibration setups across academic and industrial labs.
          </p>
        </div>

        {/* Visual Panels Grid - equal height with consistent text baseline via flex */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {panels.map((panel, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] group border border-white/5 hover:border-sci-accent/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-default"
            >
              {/* Background Image */}
              <img
                src={panel.image}
                alt={panel.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-108"
              />
              {/* Refined Overlays - using a clean black gradient to ensure text readability without tinting the image blue */}
              <div className="absolute inset-0 bg-black/10 transition-all duration-300 group-hover:bg-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

              {/* Panel text pinned to bottom - ensures even baseline across all 4 cards */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Animated underline accent */}
                <div className="w-8 h-[2px] bg-sci-accent mb-3 transition-all duration-300 group-hover:w-14" />
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-1.5">
                  <span>{panel.title}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </h3>
                {/* Description slides up only on hover */}
                <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-h-0 overflow-hidden group-hover:max-h-[120px] transition-all duration-500 ease-out">
                  {panel.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ============================================================================
// 7. TRUSTED INSTITUTIONS COMPONENT
// ============================================================================

function Clients() {
  const clientList = [
    { name: "CSIR - NPL", sub: "National Physical Laboratory", logo: "/logo/c1-removebg-preview.png", url: "https://www.nplindia.org" },
    { name: "IIT BHU", sub: "Indian Institute of Technology, Varanasi", logo: "/logo/c2-removebg-preview.png", url: "https://www.iitbhu.ac.in" },
    { name: "IIT Guwahati", sub: "Indian Institute of Technology, Guwahati", logo: "/logo/c3-removebg-preview.png", url: "https://www.iitg.ac.in" },
    { name: "IIT Roorkee", sub: "Indian Institute of Technology, Roorkee", logo: "/logo/c5-removebg-preview.png", url: "https://www.iitr.ac.in" },
    { name: "IIST", sub: "Indian Inst. of Space Science & Tech", logo: "/logo/c6-removebg-preview.png", url: "https://www.iist.ac.in" },
    { name: "CSIR - CLRI", sub: "Central Leather Research Institute", logo: "/logo/c7-removebg-preview.png", url: "https://clri.org" },
    { name: "CSIR - NCL", sub: "National Chemical Laboratory", logo: "/logo/c8-removebg-preview.png", url: "https://www.ncl-india.org" },
    { name: "NIT Rourkela", sub: "National Institute of Technology", logo: "/logo/c10-removebg-preview.png", url: "https://www.nitrkl.ac.in" },
    { name: "Anna University", sub: "Chennai, India", logo: "/logo/c11-removebg-preview.png", url: "https://www.annauniv.edu" },
    { name: "SRM University", sub: "SRM Institute of Science & Tech", logo: "/logo/c12-removebg-preview.png", url: "https://www.srmist.edu.in" },
    { name: "IISc Bangalore", sub: "Indian Institute of Science", logo: "/logo/c13-removebg-preview.png", url: "https://iisc.ac.in" }
  ];

  return (
    <section className="py-14 bg-[#F4F5FD] relative border-y border-[#EEF0FB]">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#030B7D_1px,transparent_1px)] [background-size:28px_28px]" />
      
      {/* Client logo row slider */}
      <div className="relative w-full overflow-hidden py-4 z-10">
        <div className="animate-marquee gap-10 flex items-center py-6 hover:[animation-play-state:paused]">
          {clientList.concat(clientList).map((client, idx) => {
            return (
              <a
                key={idx}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[270px] h-[160px] bg-white border border-[#DDE0F8] rounded-2xl px-8 py-6 flex flex-col justify-center items-center text-center shadow-md hover:shadow-2xl hover:shadow-sci-blue/12 hover:border-sci-accent/50 hover:-translate-y-3 hover:scale-110 hover:z-30 transition-all duration-500 ease-out shrink-0 cursor-pointer group transform relative overflow-hidden"
                title={`Visit ${client.name} official website`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="h-[110px] w-full flex items-center justify-center relative z-10 p-2">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain transition-all duration-500 transform group-hover:scale-110"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 8. TESTIMONIAL COMPONENT
// ============================================================================

function Testimonial() {
  const testimonials = [
    {
      tagline: "Excellent flow controls & stability",
      text: "The ESPIN-NANO electrospinning system has been successfully installed in our research laboratory. Its voltage stability and flow controls are excellent, directly supporting several nanofiber and polymer membrane publications.",
      author: "Prof. Pralay Maiti",
      role: "School of Materials Science & Technology",
      org: "IIT (BHU), Varanasi",
      accent: "from-[#1e5fd4] to-[#38bdf8]",
      ring: "ring-[#1e5fd4]/40"
    },
    {
      tagline: "Superb design & high accuracy",
      text: "Our department has utilized PICO's Ultrasonic Interferometers for velocity measurement in liquids. Developed with CSIR-NPL, the system delivers high accuracy and has remained a staple of our academic research for years.",
      author: "Senior Scientist & Scholar",
      role: "Acoustics & Physical Science Division",
      org: "CSIR-NPL, New Delhi",
      accent: "from-[#4f46e5] to-[#818cf8]",
      ring: "ring-[#4f46e5]/40"
    },
    {
      tagline: "Highly recommended for labs",
      text: "Decade resistance dials and electronic cell substitutes from Physics Instruments Co. have completed years of continuous operation in our educational physics laboratories — reliable and low maintenance.",
      author: "Laboratory Coordinator",
      role: "Department of Physics",
      org: "IIST, Trivandrum",
      accent: "from-[#0284c7] to-[#06b6d4]",
      ring: "ring-[#0284c7]/40"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[#0B158F]">
      {/* Animated mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(21,94,239,0.25),transparent)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sci-blue/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">

        {/* Section Header — centered, white */}
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <span className="inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-white mb-4">
            <span className="w-6 h-[1.5px] bg-white inline-block" />
            CLIENT ENDORSEMENTS
            <span className="w-6 h-[1.5px] bg-white inline-block" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight tracking-tight">
            Trusted by Researchers<br className="hidden sm:block" /> & Educators
          </h2>
          <p className="text-white text-sm sm:text-base leading-relaxed mt-4">
            Physics Instruments Co. equipment supports scientific research and coursework across India's top universities and national laboratories.
          </p>
        </div>

        {/* 3-Column Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="relative group bg-white border border-white/10 rounded-2xl p-7 flex flex-col gap-5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_-10px_rgba(0,0,0,0.3)] cursor-default overflow-hidden"
            >
              {/* Gradient top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r ${item.accent} rounded-t-2xl`} />

              {/* Stars */}
              <div className="flex gap-1 text-[#FDB022]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              {/* Tagline */}
              <h4 className="font-heading text-base font-bold text-[#0A0E3F] leading-snug">
                {item.tagline}
              </h4>

              {/* Body */}
              <p className="text-[#0A0E3F]/80 text-[13px] leading-relaxed flex-1" style={{color:'black'}}>
                {item.text}
              </p>

              {/* Divider */}
              <div className="h-px bg-sci-light" />

              {/* Author */}
              <div className="flex items-center gap-3.5">
                {/* Gradient initial avatar */}
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.accent} flex items-center justify-center shrink-0 ring-2 ${item.ring} shadow-md`}>
                  <span className="font-heading text-base font-extrabold text-white leading-none">
                    {item.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <h5 className="font-heading text-sm font-bold text-[#0A0E3F] leading-tight">{item.author}</h5>
                  <p className="text-[11px] text-[#0A0E3F]/60 mt-0.5" style={{color:'black'}}>{item.role}</p>
                  <p className="text-[11px] font-bold mt-0.5 text-brand">{item.org}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats bar */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {[
            { value: "50+", label: "Partner Institutions" },
            { value: "65+", label: "Years of Excellence" },
            { value: "10+", label: "National Labs Served" },
            { value: "100%", label: "Client Satisfaction" }
          ].map((s, i) => (
            <div key={i} className="bg-white/[0.04] hover:bg-white/[0.09] transition-colors duration-300 px-8 py-7 text-center">
              <div className="font-heading text-3xl font-extrabold text-white mb-1">{s.value}</div>
              <div className="text-[11px] text-white font-medium uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


// ============================================================================
// 9. FAQ COMPONENT
// ============================================================================

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "What types of scientific instruments do you manufacture?",
      a: "Physics Instruments Co. (PICO) manufactures a wide range of scientific and physics laboratory equipment. Our core products include ultrasonic interferometers (in collaboration with CSIR-NPL), chaos study systems (CHAAOS Series), decade resistance/capacitance boxes, standard calibration coils, electromagnets, Four Probe bandgap setups, Michelson optical tables, regulated DC power supplies, and educational training modules."
    },
    {
      q: "Do you provide customized scientific instruments?",
      a: "Yes, we customize dimensions, voltage ranges, pole shapes, micrometer counts, and sample configurations. We collaborate with institutional purchasing departments to engineer setups matching specific academic syllabi or materials testing criteria."
    },
    {
      q: "Do you supply instruments directly to educational institutions?",
      a: "Yes. Serving universities, colleges, and national physics testing facilities has been our core focus since our incorporation in 1959. We participate in procurement requests, providing technical specification documents, catalogs, and institutional quotation packages."
    },
    {
      q: "How can I request a quotation or purchase your equipment?",
      a: "You can send an inquiry using our quote request form at the bottom of the page, email us details of your specifications directly at pico@pico.in, or call our corporate helpline at +91 44 43302775. Our engineering sales team will supply a formal quotation."
    },
    {
      q: "Where are your instruments manufactured?",
      a: "Our factory and headquarters are located inside SIDCO Electronic Complex, Industrial Estate, Guindy, Chennai, India. All calibration, winding, mechanical testing, and assembly tasks are completed on site by our engineering team."
    }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white border-b border-sci-light">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Title */}
          <div className="lg:col-span-5 text-left lg:sticky lg:top-28">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black mb-3 inline-block">
              COMMON INQUIRIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-black mb-6 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-black text-sm sm:text-base leading-relaxed mb-8">
              Find detailed answers regarding custom instrumentation builds, ordering leads, delivery procedures, and institutional support options.
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`border-b transition-all duration-300 border-sci-light/80`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left py-5 flex justify-between items-center gap-4 focus:outline-none select-none cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-sm sm:text-base font-bold text-black transition-colors duration-200">
                      {faq.q}
                    </span>
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-black shrink-0 transition-all duration-300 ${isOpen ? 'bg-sci-blue border-sci-blue text-white rotate-180' : 'border-sci-light'
                      }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[300px]' : 'max-h-0'
                      }`}
                  >
                    <div className="pb-6 text-sm sm:text-base text-black leading-relaxed text-left bg-white">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 10. ENQUIRY FORM / FINAL CTA COMPONENT
// ============================================================================

function EnquiryForm({ selectedProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    customProduct: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const productSelectRef = useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        product: selectedProduct
      }));

      const element = document.getElementById('contact');
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.product) {
      newErrors.product = 'Please select a product category';
    }
    if (formData.product === 'Other' && !formData.customProduct.trim()) {
      newErrors.customProduct = 'Please specify your product or requirement';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const productRequirement = formData.product === 'Other' ? formData.customProduct : formData.product;
      const messageText = `Hello Physics Instruments Co.,

I would like to request a quotation/catalog:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Product/Requirement: ${productRequirement}
Message Details: ${formData.message.trim() || 'No additional details provided.'}`;

      const encodedText = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/914443302775?text=${encodedText}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        product: '',
        customProduct: '',
        message: ''
      });
      setTimeout(() => setIsSubmitted(false), 6000);
    }
  };

  const productsList = [
    "ESPIN-NANO Electrospinning System",
    "CHAAOS Studies System",
    "Ultrasonic Interferometer (Multi-frequency)",
    "Ultrasonic Interferometer (Single-frequency)",
    "Ultrasonic Interferometer (BIO3)",
    "Ultrasonic Interferometer (Analog Improved)",
    "Decade Dial Resistance/Capacitance Box",
    "Electronic Cell Substitute",
    "Standard Inductance Coils",
    "Michelson Interferometer System",
    "Hall Effect Setup",
    "Laser & Fiber Optics Trainer",
    "10 Wire Potentiometer",
    "Digital pH / Conductivity Meter",
    "General / Custom Scientific Inquiry",
    "Other"
  ];

  return (
    <section id="contact" className="relative py-24 bg-[#E8EAFA] border-t border-[#C5CBF5] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#030B7D_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-6 text-black">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black mb-3 inline-block">
              GET A QUOTE
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-black mb-6 leading-tight tracking-tight">
              Ready to Build Your <br className="hidden sm:block" />
              Next Experiment?
            </h2>
            <p className="text-black text-base leading-relaxed mb-10 max-w-[500px]">
              Provide details regarding your research setup, testing parameters, or educational curriculum plans. Our engineering team will review requirements and supply a technical quote.
            </p>

            <div className="space-y-4">
              <a
                href="tel:+914443302775"
                className="flex items-center gap-4 bg-white border border-sci-light/60 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-sci-blue/5 flex items-center justify-center text-sci-blue shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-black uppercase tracking-wider">Helpline</span>
                  <span className="text-base font-bold text-black">+91 44 43302775</span>
                </div>
              </a>

              <a
                href="mailto:pico@pico.in"
                className="flex items-center gap-4 bg-white border border-sci-light/60 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-sci-blue/5 flex items-center justify-center text-sci-blue shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-black uppercase tracking-wider">Email Inquiry</span>
                  <span className="text-base font-bold text-black">pico@pico.in</span>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-2xl border border-sci-light/80">

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-black mb-2 text-center">
                Submit Quote Request
              </h3>
              <p className="text-xs sm:text-sm text-black text-center mb-8">
                Submit specific technical details below to request catalog pricing.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm flex items-start gap-3 animate-fadeIn">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-bold block mb-0.5">Thank you!</span>
                    Your inquiry has been successfully generated. Our representative will contact you shortly.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full h-11 bg-sci-light/50 border rounded-lg px-4 text-sm text-black focus:outline-none focus:bg-white focus:ring-4 focus:ring-sci-blue/10 transition-all ${errors.name ? 'border-red-500' : 'border-sci-light focus:border-sci-blue'
                      }`}
                  />
                  {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@institution.edu"
                      className={`w-full h-11 bg-sci-light/50 border rounded-lg px-4 text-sm text-black focus:outline-none focus:bg-white focus:ring-4 focus:ring-sci-blue/10 transition-all ${errors.email ? 'border-red-500' : 'border-sci-light focus:border-sci-blue'
                        }`}
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={`w-full h-11 bg-sci-light/50 border rounded-lg px-4 text-sm text-black focus:outline-none focus:bg-white focus:ring-4 focus:ring-sci-blue/10 transition-all ${errors.phone ? 'border-red-500' : 'border-sci-light focus:border-sci-blue'
                        }`}
                    />
                    {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone}</span>}
                  </div>
                </div>

                <div>
                  <label htmlFor="product" className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                    Product / Requirement
                  </label>
                  <select
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    ref={productSelectRef}
                    className={`w-full h-11 bg-sci-light/50 border rounded-lg px-4 text-sm text-black focus:outline-none focus:bg-white focus:ring-4 focus:ring-sci-blue/10 transition-all appearance-none bg-no-repeat bg-[right_16px_center] bg-[length:16px] ${errors.product ? 'border-red-500' : 'border-sci-light focus:border-sci-blue'
                      }`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234A5D78' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")` }}
                  >
                    <option value="">Select the instrument category</option>
                    {productsList.map((prod, idx) => (
                      <option key={idx} value={prod}>{prod}</option>
                    ))}
                  </select>
                  {errors.product && <span className="text-xs text-red-500 mt-1 block">{errors.product}</span>}
                </div>

                {formData.product === 'Other' && (
                  <div className="animate-fadeIn">
                    <label htmlFor="customProduct" className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                      Specify Other Product / Requirement
                    </label>
                    <input
                      type="text"
                      id="customProduct"
                      name="customProduct"
                      value={formData.customProduct}
                      onChange={handleChange}
                      placeholder="Specify your product or requirement"
                      className={`w-full h-11 bg-sci-light/50 border rounded-lg px-4 text-sm text-black focus:outline-none focus:bg-white focus:ring-4 focus:ring-sci-blue/10 transition-all ${errors.customProduct ? 'border-red-500' : 'border-sci-light focus:border-sci-blue'
                        }`}
                    />
                    {errors.customProduct && <span className="text-xs text-red-500 mt-1 block">{errors.customProduct}</span>}
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                    Message Details (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide specific technical configurations or questions..."
                    className="w-full h-24 bg-sci-light/50 border border-sci-light focus:border-sci-blue rounded-lg px-4 py-3 text-sm text-black focus:outline-none focus:bg-white focus:ring-4 focus:ring-sci-blue/10 transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full font-heading text-xs font-bold uppercase tracking-wider text-white bg-sci-accent py-4 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-sci-accent/20 transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Request</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 11. FLOATING CTA COMPONENT
// ============================================================================

function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <a
        href="https://wa.me/914443302775"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:shadow-[#25D366]/40 hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Us"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>
    </div>
  );
}

// ============================================================================
// 12. PRODUCT DETAIL DRAWER COMPONENT
// ============================================================================

function X({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

function ProductDetailDrawer({ isOpen, onClose, product, onEnquireClick }) {
  if (!product) return null;

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-navy-primary/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className={`absolute top-0 right-0 w-full max-w-[580px] h-full bg-white shadow-2xl transition-transform duration-300 transform flex flex-col z-10 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-8 py-5 border-b border-sci-light flex justify-between items-center bg-sci-light/35">
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-black tracking-widest uppercase">{product.category}</span>
            <h3 className="font-heading text-lg font-bold text-black mt-1">{product.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-black hover:text-black transition-colors focus:outline-none cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-grow space-y-8 text-left">
          <div className="rounded-xl overflow-hidden border border-sci-light bg-sci-light/30 flex items-center justify-center h-[280px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold text-black uppercase tracking-wider border-l-2 border-sci-blue pl-3 mb-3">
              Overview
            </h4>
            <p className="text-black text-sm leading-relaxed">
              {product.longDesc || product.desc}
            </p>
          </div>

          {product.features && product.features.length > 0 && (
            <div>
              <h4 className="font-heading text-sm font-bold text-black uppercase tracking-wider border-l-2 border-sci-blue pl-3 mb-4">
                Key Features
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-black">
                    <CheckCircle2 className="w-4 h-4 text-sci-blue shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div>
              <h4 className="font-heading text-sm font-bold text-black uppercase tracking-wider border-l-2 border-sci-blue pl-3 mb-4">
                Technical Specifications
              </h4>
              <div className="border border-sci-light rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val], idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-sci-light/50 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-sci-light/20'
                          }`}
                      >
                        <td className="px-4 py-3 font-semibold text-black w-[40%]">{key}</td>
                        <td className="px-4 py-3 text-black">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="px-8 py-5 border-t border-sci-light bg-sci-light/40">
          <button
            onClick={() => onEnquireClick(product.name)}
            className="w-full font-heading text-sm font-bold text-center text-white bg-sci-blue py-3.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm hover:shadow-glow flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Enquire / Request Quote for {product.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 13. CORE HOME COMPILER
// ============================================================================

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null); // Product name sent to enquiry form
  const [activeDrawerProduct, setActiveDrawerProduct] = useState(null); // Product object displayed in drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Scroll to hash on external/route redirection loads
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const timer = setTimeout(() => {
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
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenDrawer = (product) => {
    setActiveDrawerProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleEnquire = (productName) => {
    setIsDrawerOpen(false);
    setSelectedProduct(productName);
  };

  const productsData = [
    {
      id: 'espin-nano',
      category: 'Electrospinning Systems',
      name: 'ESPIN-NANO Electrospinning System',
      image: heroElectrospinning,
      desc: 'Research-grade electrospinning and electrospraying system designed for fabrication of polymeric, ceramic, and composite nanofibers for advanced materials research.',
      specs: {
        'Voltage Range': '0 to 30 kV DC high-voltage supply',
        'Flow Control': 'Single syringe pump with digital micro-step drive',
        'Collector Type': 'Rotating drum and flat plate collector assemblies',
        'Safety Features': 'HV door safety interlock and grounding connection'
      }
    },
    {
      id: 'chaaos-2',
      category: 'Chaos Study Systems',
      name: 'CHAAOS 2 Study System',
      image: '/banner/product/ch13.jpg',
      desc: 'Advanced non-linear dynamics research setup designed for mapping chaotic pendulum oscillations, electronic chaos circuits, bifurcations, and phase space plots.',
      specs: {
        'System Type': 'Non-linear dynamics simulator',
        'Channels': 'Dual analog output tracking',
        'Plot Output': 'X-Y phase space oscilloscope ready',
        'Power Requirement': '230 V AC, 50 Hz'
      }
    },
    {
      id: 'interferometer-multi',
      category: 'Ultrasonic Interferometers',
      name: 'Ultrasonic Interferometer (Multi Frequency)',
      image: '/banner/product/u1.jpg',
      desc: 'Precision wave-velocity measurement in liquids operating across multiple quartz crystal frequencies. Developed in cooperation with CSIR-NPL, New Delhi.',
      specs: {
        'Frequencies': '1 MHz, 2 MHz, 3 MHz, and 5 MHz selectable crystals',
        'Resolution': '0.001 mm micrometer travel',
        'Sound Velocity Accuracy': 'Within ± 0.05%',
        'Jacket': 'Water circulating temperature stabilizer jacket'
      }
    },
    {
      id: 'hall-effect',
      category: 'Physics Lab Apparatus',
      name: 'Hall Effect Apparatus',
      image: aboutImg,
      desc: 'Complete setup including constant current source, high field electromagnet, and digital Gaussmeter for advanced solid-state physics training.',
      specs: {
        'Gaussmeter Range': '0 to 20 kGauss digital readout',
        'Current Source': '0 to 20 mA digital constant current driver',
        'Sample': 'Germanium crystal (n-type and p-type available)'
      }
    },
    {
      id: 'michelson-interf',
      category: 'Physics Lab Apparatus',
      name: 'Michelson Interferometer',
      image: heroEducation,
      desc: 'Precision optical table setup demonstrating light wave division, index of refraction, and laser wavelength measurements.',
      specs: {
        'Least Count (Mirror)': '0.0001 mm (0.1 µm) micrometer travel resolution',
        'Optics': 'λ/10 flat beam splitter and surface mirrors',
        'Base': 'Vibration-isolated heavy cast iron base plate'
      }
    },
    {
      id: 'laser-trainer',
      category: 'Physics Lab Apparatus',
      name: 'Laser & Fiber Optics Trainer',
      image: heroEducation,
      desc: 'Laser diode training board containing transmitters, optical fiber links, and signal photodiode receiver circuits for academic physics labs.',
      specs: {
        'Light Source': '650 nm semiconductor red laser diode module',
        'Link': 'Multi-mode fiber optic cable patch cords'
      }
    },
    {
      id: 'potentiometer-10w',
      category: 'Physics Lab Apparatus',
      name: '10 Wire Potentiometer',
      image: heroLab,
      desc: 'Teakwood frame mounting 10 parallel 1-meter Constantan wires with double scale alignment for potential calibration.',
      specs: {
        'Wire Length': '10 meters total (10 x 1 meter parallel tracks)',
        'Wire material': 'High stability Constantan alloy'
      }
    },
    {
      id: 'decade-resistance',
      category: 'Decades & Standards',
      name: 'Decade Dial Resistance Box',
      image: '/banner/product/dr1.jpg',
      desc: 'Non-inductive bifilar wound Manganin wire decade dials providing ultra-high stability laboratory calibration standards.',
      specs: {
        'Dial count': '4 to 6 decade dial rotary configurations',
        'Accuracy': '± 0.1% or ± 0.5% dial tolerance options',
        'Self-Capacitance': 'Less than 10 pF at 100 kHz',
        'Construction': 'Shielded metal case in teakwood frame'
      }
    }
  ];

  return (
    <>
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. Editorial About Section */}
      <About />

      {/* 3. Product Categories Cards (3x2 Grid) */}
      <HomeCategories />

      {/* 3b. Trust Metrics Section */}
      <Metrics />

      {/* 4b. Product Card Grid Section */}
      <HomeProductGrid />

      {/* 5. Engineering Capabilities Section */}
      <Capabilities />

      <Clients />

      {/* 6. Applications Visual Panels Section */}
      <Applications />

      {/* 7. Partner Logos Section */}


      {/* 8. Single Testimonial Slideshow Section */}
      <Testimonial />

      {/* 9. FAQs Section */}
      <Faq />

      {/* 10. Final CTA Enquiry Form Section */}
      <EnquiryForm selectedProduct={selectedProduct} />

      {/* 11. Floating FAB Trigger */}
      <FloatingCTA />

      {/* 12. Specifications Drawer */}
      <ProductDetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        product={activeDrawerProduct}
        onEnquireClick={handleEnquire}
      />
    </>
  );
}