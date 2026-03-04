"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

// Icons as SVG components
const CourseIcon = () => (
  <svg
    className="w-10 h-10 text-[#D4AF37]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const FishIcon = () => (
  <svg
    className="w-10 h-10 text-[#D4AF37]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M20 12c0 1.657-4.03 3-9 3s-9-1.343-9-3m18 0c0-1.657-4.03-3-9-3s-9 1.343-9 3m18 0v6c0 1.657-4.03 3-9 3s-9-1.343-9-3v-6"
    />
    <ellipse cx="12" cy="8" rx="8" ry="3" strokeWidth={1} />
  </svg>
);

const WagyuIcon = () => (
  <svg
    className="w-10 h-10 text-[#D4AF37]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const MapIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center animated-gradient noise-overlay">
        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)]" />
        
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Logo */}
          <motion.div variants={scaleIn} className="mb-8">
            <Image
              src="/logo-no-bg.png"
              alt="Gold Standard Omakase Logo"
              width={120}
              height={120}
              className="mx-auto opacity-90"
              priority
            />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-light tracking-wide mb-6"
          >
            <span className="gold-gradient-text">Gold Standard</span>
            <br />
            <span className="text-white/90">Omakase</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            variants={fadeIn}
            className="section-divider mx-auto my-8"
          />

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            className="font-[family-name:var(--font-inter)] text-lg md:text-xl text-white/60 font-light tracking-widest uppercase mb-12"
          >
            An immersive Japanese omakase experience
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#reservations"
              className="btn-gold px-10 py-4 text-sm tracking-widest uppercase font-medium rounded-none min-w-[200px]"
            >
              Reserve Now
            </a>
            <a
              href="#about"
              className="btn-outline-gold px-10 py-4 text-sm tracking-widest uppercase font-medium rounded-none min-w-[200px]"
            >
              Explore
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-[#D4AF37] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 md:py-40 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-16 md:gap-24 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Image */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                {/* Placeholder for sushi image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 border border-[#D4AF37]/30 rounded-full flex items-center justify-center">
                      <span className="text-[#D4AF37]/50 text-4xl font-[family-name:var(--font-playfair)]">鮨</span>
                    </div>
                    <p className="text-white/30 text-sm tracking-widest uppercase">Omakase</p>
                  </div>
                </div>
                {/* Gold accent border */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#D4AF37]/20 -z-10" />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <p className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-inter)]">
                  Our Philosophy
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-light text-white/90 leading-tight">
                  The Art of
                  <br />
                  <span className="gold-gradient-text">Omakase</span>
                </h2>
              </div>

              <div className="section-divider" />

              <p className="font-[family-name:var(--font-inter)] text-white/60 text-lg leading-relaxed font-light">
                Gold Standard is an immersive omakase experience where every dish is curated by the chef. The menu changes daily and features the finest seafood flown fresh from Japan, alongside premium A5 wagyu and seasonal ingredients.
              </p>

              <p className="font-[family-name:var(--font-inter)] text-white/40 text-base leading-relaxed font-light">
                Each course is a testament to our commitment to excellence, crafted with precision and presented with artistry that honors centuries of Japanese culinary tradition.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 md:py-40 px-6 bg-[#080808] relative">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.03)_0%,_transparent_50%)]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-inter)]">
              The Experience
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-light text-white/90">
              Curated Excellence
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Card 1 */}
            <motion.div
              variants={fadeInUp}
              className="group glass p-10 text-center hover:border-[#D4AF37]/30 transition-all duration-500"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 border border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37]/60 transition-colors duration-500">
                  <CourseIcon />
                </div>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white/90 mb-4">
                15 Course Omakase
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-white/50 text-sm leading-relaxed">
                A meticulously crafted journey through seasonal flavors, each course building upon the last.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={fadeInUp}
              className="group glass p-10 text-center hover:border-[#D4AF37]/30 transition-all duration-500"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 border border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37]/60 transition-colors duration-500">
                  <FishIcon />
                </div>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white/90 mb-4">
                Fish Flown Daily
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-white/50 text-sm leading-relaxed">
                The finest seafood sourced directly from Tsukiji and flown fresh to our kitchen each morning.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={fadeInUp}
              className="group glass p-10 text-center hover:border-[#D4AF37]/30 transition-all duration-500"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 border border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37]/60 transition-colors duration-500">
                  <WagyuIcon />
                </div>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white/90 mb-4">
                A5 Wagyu Selections
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-white/50 text-sm leading-relaxed">
                Premium Japanese A5 wagyu, graded for exceptional marbling and prepared to perfection.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Reservations Section */}
      <section id="reservations" className="py-32 md:py-40 px-6 bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.05)_0%,_transparent_60%)]" />
        
        <motion.div
          className="max-w-3xl mx-auto text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeInUp}
            className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-inter)]"
          >
            Reservations
          </motion.p>
          
          <motion.h2
            variants={fadeInUp}
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-light text-white/90 mb-8"
          >
            Reserve Your Seat
          </motion.h2>

          <motion.div variants={fadeIn} className="section-divider mx-auto mb-8" />

          <motion.p
            variants={fadeInUp}
            className="font-[family-name:var(--font-inter)] text-white/50 text-lg mb-12 max-w-xl mx-auto"
          >
            Join us for an unforgettable culinary journey. Reservations are required and can be made through Resy.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <a
              href="https://resy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-block px-16 py-5 text-sm tracking-widest uppercase font-medium rounded-none"
            >
              Book on Resy
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 md:py-40 px-6 bg-[#080808]">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <p className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-inter)]">
              Contact
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-light text-white/90">
              Get in Touch
            </h2>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-12 md:gap-16"
          >
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-[#D4AF37]/30 rounded-full flex items-center justify-center text-[#D4AF37]">
                  <EmailIcon />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Email</p>
                  <a
                    href="mailto:reservations@goldstandardomakase.com"
                    className="text-white/80 hover:text-[#D4AF37] transition-colors font-[family-name:var(--font-inter)]"
                  >
                    reservations@goldstandardomakase.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-[#D4AF37]/30 rounded-full flex items-center justify-center text-[#D4AF37]">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Phone</p>
                  <a
                    href="tel:+12125551234"
                    className="text-white/80 hover:text-[#D4AF37] transition-colors font-[family-name:var(--font-inter)]"
                  >
                    +1 (212) 555-1234
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col justify-center">
              <p className="text-white/40 text-sm uppercase tracking-wider mb-6">Follow Us</p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300"
                >
                  <MapIcon />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Google Maps Embed */}
          <motion.div
            variants={fadeInUp}
            className="mt-16"
          >
            <div className="max-w-[900px] mx-auto rounded-xl overflow-hidden shadow-lg shadow-[#D4AF37]/10 ring-1 ring-[#D4AF37]/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3589.8876!2d-80.1261!3d25.8876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9ad0c0c0c0c0c%3A0x0!2s10295%20Collins%20Ave%2C%20Bal%20Harbour%2C%20FL!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gold Standard Omakase Location"
                className="w-full h-[350px] md:h-[400px]"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Image
                src="/logo-no-bg.png"
                alt="Gold Standard Omakase"
                width={50}
                height={50}
                className="opacity-80"
              />
              <span className="font-[family-name:var(--font-playfair)] text-xl text-white/80">
                Gold Standard
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <MapIcon />
              </a>
            </div>

            {/* Copyright */}
            <p className="font-[family-name:var(--font-inter)] text-white/30 text-sm">
              © {new Date().getFullYear()} Gold Standard Omakase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
