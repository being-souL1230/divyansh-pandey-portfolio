import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Experience", to: "experience" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <ScrollLink
          to="home"
          smooth={true}
          className="cursor-pointer flex items-center gap-2 group"
        >
          <span className="font-display font-bold text-xl tracking-tight">
            Divyansh<span className="text-primary">Pandey</span>
          </span>
        </ScrollLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-border/60 bg-background/70 p-1.5 shadow-sm">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.name}
              to={link.to}
              smooth={true}
              offset={-100}
              className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
            >
              {link.name}
            </ScrollLink>
          ))}
          <ScrollLink to="contact" smooth={true} offset={-50} duration={500}>
            <Button className="rounded-full px-6 shadow-md shadow-primary/20">Contact Me</Button>
          </ScrollLink>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden rounded-xl border border-border/60 bg-background/80 p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border/60 bg-background/95 backdrop-blur"
          >
            <div className="flex flex-col p-4 gap-3">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  offset={-100}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg border border-border/50 px-4 py-2 text-base font-medium text-foreground"
                >
                  {link.name}
                </ScrollLink>
              ))}
              <ScrollLink
                to="contact"
                smooth={true}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full mt-2">Contact Me</Button>
              </ScrollLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
