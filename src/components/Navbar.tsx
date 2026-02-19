import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Eye } from "lucide-react";

const links = [
  { label: "Try-On", href: "#try-on" },
  { label: "Food AR", href: "#food" },
  { label: "AI Features", href: "#ai" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
          <Eye className="w-6 h-6 text-primary" />
          <span>AR<span className="text-primary">View</span></span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-display"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#try-on"
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-display font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-display py-2"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
