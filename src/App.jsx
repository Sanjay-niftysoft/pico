import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/approutes';
import ScrollToTop from './core/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter basename="/demo">
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
