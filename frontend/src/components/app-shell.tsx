import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaTachometerAlt } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 shadow-lg">
      {/* Adding the font import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        `}
      </style>

      <div className="container mx-auto flex justify-between items-center">
        {/* Book Review App with font styling */}
        <div className="text-white text-4xl font-extrabold" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <Link to="/" className="hover:text-gray-100 transition duration-300">
            Book Review App
          </Link>
        </div>
        
        {/* Add a quote in the center */}
        <div className="text-white text-xl italic flex-grow text-center">
          "A room without books is like a body without a soul."
        </div>

        <div className="flex space-x-6">
          <Link
            to="/dashboard"
            className="flex items-center text-white text-lg hover:text-gray-100 transition duration-300"
          >
            <FaTachometerAlt />
            Dashboard
          </Link>
          <Link
            to="/login"
            className="flex items-center bg-white text-purple-600 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition duration-300"
          >
            <FaUserCircle />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
