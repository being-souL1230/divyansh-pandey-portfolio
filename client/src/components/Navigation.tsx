import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Experience", to: "experience" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const scrollY = window.scrollY + 140;
      let current = "home";
      const trackedSections = [...navLinks.map((link) => link.to), "contact"];
      for (const sectionId of trackedSections) {
        const el = document.getElementById(sectionId);
        if (!el) continue;
        if (scrollY >= el.offsetTop) {
          current = sectionId;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -26, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/72 backdrop-blur-xl border-b border-border/45 py-3 shadow-[0_14px_32px_hsl(0_0%_0%/0.2)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <ScrollLink
          to="home"
          smooth={true}
          className="cursor-pointer flex items-center gap-2 group"
        >
          <span className="font-display font-bold text-xl tracking-tight transition-all duration-300 group-hover:tracking-wide">
            Divyansh<span className="text-primary">Pandey</span>
          </span>
        </ScrollLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1.5 rounded-full border border-border/50 bg-background/55 p-1.5 shadow-[0_10px_24px_hsl(0_0%_0%/0.16),0_1px_0_hsl(0_0%_100%/0.12)_inset] backdrop-blur-lg">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.name}
              to={link.to}
              smooth={true}
              offset={-100}
              className="group relative cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {activeSection === link.to ? (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full border border-primary/30 bg-primary/14 shadow-[0_0_0_1px_hsl(var(--primary)/0.14)_inset]"
                  transition={{ type: "spring", stiffness: 360, damping: 26 }}
                />
              ) : null}
              <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary/80 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              <span className="relative z-10">{link.name}</span>
            </ScrollLink>
          ))}
          <ScrollLink to="contact" smooth={true} offset={-50} duration={500}>
            <Button
              className={`relative overflow-hidden rounded-full border px-6 text-primary-foreground transition-all before:absolute before:inset-y-0 before:left-[-130%] before:w-1/2 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-all before:duration-700 hover:before:left-[130%] ${
                activeSection === "contact"
                  ? "border-primary/45 bg-primary shadow-lg shadow-primary/35"
                  : "border-primary/35 bg-primary/85 shadow-md shadow-primary/30 hover:bg-primary hover:shadow-lg hover:shadow-primary/35"
              }`}
            >
              Contact Me
            </Button>
          </ScrollLink>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden rounded-xl border border-border/55 bg-background/75 p-2 text-foreground backdrop-blur transition-all hover:border-primary/40 hover:bg-background/90"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileMenuOpen ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -90, scale: 0.85 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-b border-border/50 bg-background/92 backdrop-blur-xl"
          >
            <div className="flex flex-col p-4 gap-3">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: idx * 0.04, duration: 0.22 }}
                >
                  <ScrollLink
                    to={link.to}
                    smooth={true}
                    offset={-100}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-lg border px-4 py-2 text-base font-medium transition-all ${
                      activeSection === link.to
                        ? "border-primary/45 bg-primary/12 text-foreground"
                        : "border-border/50 text-foreground/90 hover:border-primary/30 hover:bg-background/70"
                    }`}
                  >
                    {link.name}
                  </ScrollLink>
                </motion.div>
              ))}
              <ScrollLink
                to="contact"
                smooth={true}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full mt-2 rounded-lg">Contact Me</Button>
              </ScrollLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
