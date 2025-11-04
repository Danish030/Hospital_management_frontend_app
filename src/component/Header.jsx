import React from 'react';

const Header = () => {
  return (
    <header className="bg-secondary shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Left Section: Logo */}
        <div className="shrink-0">
          <a href="/" className="text-2xl font-bold text-primary">
            HealthPlus
          </a>
        </div>

        {/* Right Section: Navigation Menu */}
        <nav className="flex space-x-4">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/about" className="nav-link">
            About
          </a>
          <a href="/services" className="nav-link">
            Services
          </a>
          <a href="/contact" className="nav-link">
            Contact
          </a>
        </nav>
        
      </div>
    </header>
  );
};

export default Header;