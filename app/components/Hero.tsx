"use client";

import { useState } from 'react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

const handleSmoothScroll = (e) => {
  e.preventDefault();

  const targetId = e.target.getAttribute("href").replace("#", "");
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // Tutup burger menu
  setIsMenuOpen(false);
};



  

  return (
    <>
      <div className="hero-wrapper">

        {/* Overlay backdrop untuk mobile menu */}
        <div 
          className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        ></div>

        {/* NAVBAR */}
        <nav className="navbar">
          <div className="logo">embelish<span>.flower</span></div>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <button className="close-menu" onClick={toggleMenu} aria-label="Tutup menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <li><a href="#hero" onClick={handleSmoothScroll}>Beranda</a></li>
            <li><a href="#services" onClick={handleSmoothScroll}>Produk</a></li>
            <li><a href="#contact" onClick={handleSmoothScroll}>Kontak</a></li>
          </ul>

          <button className="burger-menu" onClick={toggleMenu} aria-label="Buka menu">
            <span className={isMenuOpen ? 'active' : ''}></span>
            <span className={isMenuOpen ? 'active' : ''}></span>
            <span className={isMenuOpen ? 'active' : ''}></span>
          </button>
        </nav>

        {/* HERO — CENTERED */}
        <section id="hero" className="hero">
          <h4 className="mini-title">Spesialis Bouquet Bunga</h4>

           <h1 className="title">
            <span>Bunga Terindah</span><br />
            Untuk Setiap Momen Spesial <span>Anda</span>
          </h1>

          <p className="subtitle">
            Kami menciptakan bouquet bunga yang cantik dan elegan dengan kualitas premium —
            sempurna untuk ulang tahun, wisuda, pernikahan, dan semua acara spesial Anda.
          </p>


          <div className="cta-group">
            <button className="cta-primary" onClick={() => {
              const targetElement = document.getElementById('services');
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}>Lihat Produk</button>
            <button className="cta-secondary" onClick={() => {
              const targetElement = document.getElementById('contact');
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}>Hubungi Kami</button>
          </div>
        </section>
      </div>

      {/* STYLES */}
      <style jsx>{`
        /* ============================
            PREMIUM BACKGROUND
        ============================ */
        .hero-wrapper {
          width: 100%;
          min-height: 100vh;
          padding: 0 6rem;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;

          background-image: url("/images/5.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }


        .hero-wrapper::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.22;
          background-image: url("data:image/svg+xml,%3Csvg width='900' height='700' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 350 Q200 280 450 350 T900 350' stroke='%233bffb322' stroke-width='2' fill='none'/%3E%3C/svg%3E");
          background-size: cover;
          pointer-events: none;
        }
          

        /* ============================
                NAVBAR
        ============================ */
        .navbar {
          width: 100%;
          max-width: 1300px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 1rem 2rem;
          margin-top: 1.5rem;

          background: white; 
          backdrop-filter: blur(8px);    
          border-radius: 0px;

          z-index: 10;
          position: relative;
        }


        .logo {
          font-size: 1.8rem;
          font-weight: 700;
          color: #fb6b85;
          transition: font-size 0.3s ease;
        }
        .logo span {
          color: #fb6b85;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          transition: all 0.3s ease;
        }
        .nav-links a {
          font-weight: bold;
          color: #fb6b85;
          text-decoration: none;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: #e55a75;
        }

        /* Burger Menu */
        .burger-menu {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 30px;
          height: 25px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 20;
        }

        .burger-menu span {
          width: 100%;
          height: 3px;
          background: #fb6b85;
          border-radius: 10px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .burger-menu span.active:nth-child(1) {
          transform: rotate(45deg) translateY(8px);
        }

        .burger-menu span.active:nth-child(2) {
          opacity: 0;
        }

        .burger-menu span.active:nth-child(3) {
          transform: rotate(-45deg) translateY(-8px);
        }

        /* Menu Overlay */
        .menu-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          // background: rgba(0, 0, 0, 0.6);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 9998;
        }

        .menu-overlay.active {
          display: block;
          opacity: 1;
        }

        /* Close Menu Button */
        .close-menu {
          display: none;
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          color: #fb6b85;
          transition: transform 0.2s ease;
        }

        .close-menu:hover {
          transform: rotate(90deg);
        }

        .close-menu svg {
          width: 24px;
          height: 24px;
        }

        .btn-login {
          padding: 0.7rem 1.4rem;
          background: #3bffb3;
          border: none;
          border-radius: 6px;
          color: #000;
          font-weight: 600;
        }

        /* ============================
                HERO CENTER
        ============================ */
        .hero-wrapper::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 160px;
          
          pointer-events: none;
          z-index: 2;
        }

        .hero {
          text-align: start;
          margin-top: 6rem;
          max-width: 700px;
          z-index: 1;
          position: relative;
        }

        .mini-title {
          color: #fb6b85;
          font-size: 1rem;
          margin-bottom: 1rem;
          letter-spacing: 1px;
          opacity: 0;
          // text-shadow: 0 0 5px rgba(0,0,0,0.3);
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
        }

        .title {
          font-size: 3.4rem;
          line-height: 1.2;
          color: white;
          margin-bottom: 1.5rem;
          font-weight: 700;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease-out 0.4s forwards;
        }

        .title span {
          color: #fb6b85;
        }

        .subtitle {
          color: #ffffff;
          font-size: 1.15rem;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
        }

        .cta-group {
          display: flex;
          justify-content: start;
          gap: 1rem;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out 0.8s forwards;
        }

        /* Keyframes for animations */
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cta-primary {
          background: #fb6b85;
          color: white;
          padding: 0.9rem 1.8rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .cta-primary:hover {
          background: #e55a75;
        }

        .cta-secondary {
          background: transparent;
          color: white;
          padding: 0.9rem 1.8rem;
          border: 1px solid white;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-secondary:hover {
          background: white;
          color: #fb6b85;
        }

        /* ============================
                RESPONSIVE
        ============================ */
        @media (max-width: 900px) {
          .hero-wrapper {
            padding: 0 2rem;
          }

          .logo {
            font-size: 1.3rem;
          }

          .burger-menu {
            display: flex;
          }

          .close-menu {
            display: block;
          }

          .menu-overlay.active {
            display: block;
          }

          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: 280px;
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            padding: 80px 40px 40px;
            gap: 0;
            box-shadow: -5px 0 20px rgba(0, 0, 0, 0.15);
            transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 9999;
          }

          .nav-links.active {
            right: 0;
          }

          .nav-links li {
            border-bottom: 1px solid #f0f0f0;
          }

          .nav-links li:last-child {
            border-bottom: none;
          }

          .nav-links a {
            font-size: 1.1rem;
            display: block;
            padding: 1.2rem 0;
            transition: all 0.3s ease;
          }

          .nav-links a:hover {
            padding-left: 10px;
            color: #e55a75;
          }

          .title {
            font-size: 2.6rem;
          }
        }
      `}</style>
    </>
  );
}