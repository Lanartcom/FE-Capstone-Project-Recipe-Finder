import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa'; // Import icons

const Header = () => {
  return (
    <header className="bg-amber-100 text-black p-4">
      {/* Top Row: Logo, Navigation Links, Social Icons */}
      <div className="flex justify-between items-center">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <img
            src="https://i.ibb.co/rMSzrRc/foodie-logo.png" // Replace with your logo's path
            alt="Logo"
            className="h-12" // Adjust the height as needed
          />
        </div>

        {/* Navigation Links in the center */}
        <nav className="flex space-x-8 mx-auto">
          <Link to="/" className="hover:text-amber-700">HOME</Link>
          <Link to="/about" className="hover:text-amber-700">ABOUT</Link>
          <a
            href="https://www.themealdb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-700"
          >
            RECIPES
          </a>
        </nav>

        {/* Social Icons on the right */}
        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com" // Replace with your Instagram link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-700"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.youtube.com" // Replace with your YouTube link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-700"
          >
            <FaYoutube size={24} />
          </a>
          <a
            href="mailto:example@example.com" // Replace with your email
            className="hover:text-amber-700"
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
          className="max-w-max max-h-48 rounded-lg"
        />
      </div>
    </header>
  );
};

export default Header;