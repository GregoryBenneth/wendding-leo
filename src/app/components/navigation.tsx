"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-xl font-playfair font-semibold text-primary"
          >
            <Heart className="h-5 w-5 text-[#e9d2ac] mr-2 animate-beat" />
            <span className="tracking-wider">J & L</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {[
              { href: "/", label: "Convite" },
              { href: "/rsvp", label: "Confirmação" },
              { href: "/presentes", label: "Presentes" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-primary hover:text-[#c5bdb2] transition-colors group overflow-hidden"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e9d2ac]/50 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className={`md:hidden text-primary transition-all duration-300 ${
              scrolled ? "text-primary" : "text-primary/80"
            }`}
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-0 flex flex-col items-center bg-white/95 shadow-md mt-2 rounded-lg">
            {[
              { href: "/", label: "Convite" },
              { href: "/rsvp", label: "Confirmação" },
              { href: "/presentes", label: "Presentes" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-primary hover:text-[#c5bdb2] hover:bg-[#e9d2ac]/10 transition-colors w-full text-center py-3"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
