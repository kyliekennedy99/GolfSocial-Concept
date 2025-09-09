import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const linkClass = (path: string) =>
    `transition duration-200 ease-in-out transform hover:scale-105 hover:text-green-600 dark:hover:text-green-300 ${
      location.pathname === path ? "font-bold text-green-700 dark:text-green-400" : ""
    }`;

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-700 dark:text-green-400 transition duration-200 ease-in-out transform hover:scale-105 hover:text-green-600 dark:hover:text-green-300"
        >
          GolfSocial
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 font-medium">
          <Link to="/courses" className={linkClass("/courses")}>Courses Near Me</Link>
          <Link to="/tees" className={linkClass("/tees")}>Tee Times</Link>
          <Link to="/messages" className={linkClass("/messages")}>Messages</Link>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="rounded-full px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 ease-in-out transform hover:scale-105"
            title="Toggle dark mode"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* Profile photo */}
          <div className="relative transform transition duration-200 ease-in-out hover:scale-105">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-600"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-1 ring-white"></span>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 ease-in-out transform hover:scale-110"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <nav className="flex flex-col gap-2 px-4 py-2">
            <Link to="/courses" className={linkClass("/courses")} onClick={() => setMobileOpen(false)}>Courses Near Me</Link>
            <Link to="/tees" className={linkClass("/tees")} onClick={() => setMobileOpen(false)}>Tee Times</Link>
            <Link to="/messages" className={linkClass("/messages")} onClick={() => setMobileOpen(false)}>Messages</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
