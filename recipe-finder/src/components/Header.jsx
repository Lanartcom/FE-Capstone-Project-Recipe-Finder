import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa'; // Import social icons

const Header = () => {
  return (
    <header className="bg-amber-100 text-black p-4">
      {/* Top Row: Logo, Navigation Links, Social Icons */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <img
            src="https://i.ibb.co/rMSzrRc/foodie-logo.png" // Replace with your logo's path
            alt="Logo"
            className="h-12" // Adjust the height as needed
          />
        </div>

        {/* Navigation Links in the center */}
        <nav className="flex flex-wrap justify-center space-x-4 md:space-x-8">
          <Link to="/" className="hover:text-amber-700 transition-colors">
            HOME
          </Link>
          <Link to="/about" className="hover:text-amber-700 transition-colors">
            ABOUT
          </Link>
                  <Link to="/shopping-list" className="hover:text-amber-700 transition-colors">
            SHOPPING LIST
          </Link>
          <Link to="/favorites" className="hover:text-amber-700 transition-colors">
            FAVORITES
          </Link>
        </nav>

        {/* Social Icons on the right */}
        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com" // Replace with your Instagram link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-700 transition-colors"
            aria-label="Visit our Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.youtube.com" // Replace with your YouTube link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-700 transition-colors"
            aria-label="Visit our YouTube channel"
          >
            <FaYoutube size={24} />
          </a>
          <a
            href="mailto:example@example.com" // Replace with your email
            className="hover:text-amber-700 transition-colors"
            aria-label="Send us an email"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>

      {/* Banner below the header */}
      <div className="mt-4 flex justify-center">
        <img
          src="https://i.ibb.co/0XWGXtz/FIND-YOUR-Favorite-Recipes-1.png" // Replace with your banner image path
          alt="Food Banner"
          className="max-w-[60%] md:max-w-[40%] h-auto rounded-lg"
        />
      </div>
    </header>
  );
};

export default Header;