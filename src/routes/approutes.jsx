import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../core/Layout';
import Home from '../components/home/home';
import ComingSoon from '../shared/components/ComingSoon';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Layout Route */}
      <Route path="/" element={<Layout />}>
        {/* Default Landing Page Route */}
        <Route index element={<Home />} />

        {/* Inner Pages - Coming Soon Placeholders */}
        <Route path="about" element={<ComingSoon title="About Us" />} />
        <Route path="products" element={<ComingSoon title="Our Products" />} />
        <Route path="clients" element={<ComingSoon title="Academic & Research Partners" />} />
        <Route path="testimonials" element={<ComingSoon title="Client Endorsements" />} />
        <Route path="faq" element={<ComingSoon title="Frequently Asked Questions" />} />
        <Route path="contact" element={<ComingSoon title="Contact & Quotations" />} />
      </Route>
    </Routes>
  );
}
