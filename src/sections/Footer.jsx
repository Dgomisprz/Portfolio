import React from 'react';

const Footer = () => {
  return (
    <footer className=" text-white py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm mb-4">&copy; {new Date().getFullYear()} Website made with Vite + React</p>
          <div className="flex space-x-4">
            <a href="https://github.com/Dgomisprz" className="hover:text-gray-300">GitHub</a>
            <a href="https://www.linkedin.com/in/francisco-daniel-gomis-pérez" className="hover:text-gray-300">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;