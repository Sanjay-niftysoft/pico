import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Shared Site Header */}
      <Header />
      
      {/* Route Outlet for dynamic pages (e.g. Home) */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Shared Site Footer */}
      <Footer />
    </div>
  );
}
