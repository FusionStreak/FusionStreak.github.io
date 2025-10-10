"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface SimpleNavProps {
  logo: string;
  logoAlt?: string;
  items: NavItem[];
  className?: string;
}

const normalizeHref = (href?: string) => {
  if (!href) return href;
  if (href === "/") return "/";
  return href.replace(/\/$/, "");
};

const SimpleNav: React.FC<SimpleNavProps> = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
}) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const underlineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  // Close mobile menu when pathname changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Initial load animation
  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(linkRefs.current, {
        y: -10,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  // Handle active state underline
  useEffect(() => {
    linkRefs.current.forEach((link, index) => {
      if (!link) return;
      const underline = underlineRefs.current[index];
      if (!underline) return;

      const isActive =
        normalizeHref(link.getAttribute("href") || "") ===
        normalizeHref(pathname);

      gsap.to(underline, {
        scaleX: isActive ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }, [pathname]);

  // Hover animations
  const handleMouseEnter = (index: number) => {
    const underline = underlineRefs.current[index];
    const link = linkRefs.current[index];
    if (!underline || !link) return;

    const isActive =
      normalizeHref(link.getAttribute("href") || "") ===
      normalizeHref(pathname);
    if (isActive) return; // Don't animate if already active

    gsap.to(underline, {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(link, {
      y: -2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    const underline = underlineRefs.current[index];
    const link = linkRefs.current[index];
    if (!underline || !link) return;

    const isActive =
      normalizeHref(link.getAttribute("href") || "") ===
      normalizeHref(pathname);
    if (isActive) return; // Keep active state

    gsap.to(underline, {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(link, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <nav
      ref={navRef}
      className={`w-full ${className}`}
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group z-50">
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
            <Image
              src={logo}
              alt={logoAlt}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              aria-label={item.ariaLabel || `Navigate to ${item.label}`}
              className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              <span className="relative inline-block">
                {item.label}
                <span
                  ref={(el) => {
                    underlineRefs.current[index] = el;
                  }}
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-primary origin-left scale-x-0"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-50 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 mt-2 mx-2 backdrop-blur-xl bg-background/95 border border-border/40 shadow-2xl shadow-black/20 rounded-2xl overflow-hidden"
          style={{ opacity: 0, transform: "translateY(-10px)" }}
        >
          <div className="flex flex-col py-4">
            {items.map((item) => {
              const isActive =
                normalizeHref(item.href) === normalizeHref(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10 border-l-4 border-primary"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/30"
                  }`}
                  aria-label={item.ariaLabel || `Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SimpleNav;
