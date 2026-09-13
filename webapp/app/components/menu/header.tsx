"use client";
import { useState, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import MenuList from "./menuList";
import navigationMenu from "../../data/menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`outline-none fixed top-0 left-0 right-0 z-50  ${isScrolled ? "glass-strong py-3" : "bg-transparent py-5"}`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between outline-none">
        <div className="hidden md:flex items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {navigationMenu.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="px-4 px-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <button
          className="md:hidden p-2 text-foreground cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden glass-strong animate-fade-in">
          <div className="container mx-auto px-6 flex flex-col gap-4">
            {navigationMenu.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-muted-foreground hover:text-foreground py-2"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
