"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const navLinks = [
    { name: "Wydarzenia", href: "/" },
    // {
    //   name: "Products",
    //   href: "#",
    //   dropdown: [
    //     { name: "Featured", href: "/products/featured" },
    //     { name: "New Arrivals", href: "/products/new" },
    //     { name: "Bestsellers", href: "/products/bestsellers" },
    //   ],
    // },
    { name: "Zaloguj się", href: "/login" },
    { name: "Zarejestruj się", href: "/register" },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 py-2 shadow-lg backdrop-blur-sm"
          : "bg-black py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              <img className="w-1/4" src={logo} />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.name} className="group relative">
                  {link.dropdown ? (
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="group flex items-center py-2 text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-white"
                    >
                      {link.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                      <span className="bg-gunfire-orange absolute bottom-0 left-0 right-0 block h-0.5 max-w-0 transition-all duration-300 group-hover:max-w-full"></span>
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className="group relative py-2 text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-white"
                    >
                      {link.name}
                      <span className="bg-gunfire-orange absolute bottom-0 left-0 right-0 block h-0.5 max-w-0 transition-all duration-300 group-hover:max-w-full"></span>
                    </Link>
                  )}

                  {link.dropdown && (
                    <div
                      className={`absolute left-0 mt-2 w-48 rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                        activeDropdown === link.name
                          ? "translate-y-0 opacity-100"
                          : "invisible -translate-y-2 opacity-0"
                      }`}
                    >
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-900 hover:text-white"
                            role="menuitem"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
      >
        <div className="space-y-1 bg-black/95 px-2 pb-3 pt-2 backdrop-blur-sm sm:px-3">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className="block flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    {link.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${activeDropdown === link.name ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`space-y-1 pl-4 transition-all duration-200 ${activeDropdown === link.name ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
