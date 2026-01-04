"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ServicesAndContact() {
  const [sortOrder, setSortOrder] = useState('default');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showAll, setShowAll] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const router = useRouter();

  const allProducts = [
    { id: 1, name: 'Papan Bunga', price: 300000, image: '/dummyimage/5.png', description: 'Papan bunga elegan untuk berbagai acara spesial seperti pernikahan, grand opening, atau ucapan duka cita.' },
    { id: 2, name: 'Bouquet Bunga', price: 50000, image: '/dummyimage/6.png', description: 'Rangkaian bunga tangan cantik yang cocok untuk hadiah ulang tahun, anniversary, atau moment spesial lainnya.' },
    { id: 3, name: 'Bouquet Uang', price: 50000, image: '/dummyimage/7.png', description: 'Bouquet uang kreatif dan menarik, hadiah sempurna untuk wisuda, pernikahan, atau perayaan khusus.' },
    { id: 4, name: 'Bunga Gebongan', price: 20000, image: '/dummyimage/10.png', description: 'Rangkaian bunga gebongan tradisional Bali untuk upacara adat dan perayaan keagamaan.' },
    { id: 5, name: 'Dekor Bunga', price: 75000, image: '/dummyimage/11.png', description: 'Dekorasi bunga custom untuk mempercantik venue acara Anda, dari pernikahan hingga acara corporate.' },
    { id: 6, name: 'Vas Bunga', price: 20000, image: '/dummyimage/12.png', description: 'Bunga dalam vas yang elegan, sempurna untuk dekorasi rumah atau kantor Anda.' },
  ];

  const handleProductClick = (product: Product) => {
    // Simpan data produk ke sessionStorage untuk diakses di halaman booking
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));
    // Navigate ke halaman booking
    router.push('/booking');
  };

  const getSortedProducts = () => {
    let sorted = [...allProducts];

    switch (sortOrder) {
      case 'price':
        sorted.sort((a, b) => 
          sortDirection === 'asc' ? a.price - b.price : b.price - a.price
        );
        break;
      case 'name':
        sorted.sort((a, b) => 
          sortDirection === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
        break;
      default:
        // Default order
        break;
    }

    return sorted;
  };

  const displayedProducts = getSortedProducts();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    const checkInitialVisibility = () => {
      animateElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
          el.classList.add('animate-in');
        }
      });
    };

    setTimeout(checkInitialVisibility, 100);

    return () => observer.disconnect();
  }, [sortOrder]);

  // Force immediate visibility for product cards
  useEffect(() => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.classList.add('animate-in');
    });
  }, [displayedProducts]);

  return (
    <>
      <div className="bg-wrapper">

        {/* ==========================
            SERVICES SECTION
        =========================== */}
        <section id="services" className="section services-section">
          <div>
            <h3 className="title-product">Produk Kami</h3>
            <p className="p-product">
              Jelajahi koleksi eksklusif bouquet bunga kami, setiap rangkaian dibuat dengan sempurna untuk momen spesial Anda.
            </p>
          </div>

          <div className="products-grid">
            {displayedProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleProductClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h4 className="product-title">{product.name}</h4>
                <p className="product-price">
                  Mulai Dari Rp {product.price.toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================
            CONTACT SECTION
        =========================== */}
        <section id="contact" className="section contact">
          <h3>Hubungi Kami</h3>
          <p>
            Siap membuat setiap momen lebih indah? Hubungi kami untuk memesan bouquet bunga terbaik.
          </p>
          <div className="address">
            <p>Br. Tengah Blahkiuh (Selatan Banjar), Badung, Bali</p>
          </div>
          <div className="social-media">
            <a href="https://www.instagram.com/embelish.flower/" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://wa.me/6287844575653" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@embelish.flower?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </section>

        {/* ==========================
            FOOTER SECTION
        =========================== */}
        <footer className="footer">
          © 2026 Veluxa Studio
        </footer>

      </div>

      <style jsx>{`
        /* ===========================================
           GLOBAL BACKGROUND
        ============================================ */
        .bg-wrapper {
          position: relative;
          overflow: visible;
          background-color: #020204;
          background:
            radial-gradient(circle at 30% 20%, rgba(0,255,194,0.14), transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(0,255,194,0.08), transparent 65%),
            linear-gradient(135deg, #00151c, #00080c);
          isolation: isolate;
        }

        .bg-wrapper::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.18;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg width='700' height='600' viewBox='0 0 700 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 300 Q150 250 350 300 T700 300' stroke='%233bffb344' stroke-width='2' fill='none'/%3E%3Cpath d='M0 360 Q150 310 350 360 T700 360' stroke='%233bffb322' stroke-width='2' fill='none'/%3E%3Cpath d='M0 420 Q150 370 350 420 T700 420' stroke='%233bffb311' stroke-width='2' fill='none'/%3E%3C/svg%3E");
          background-size: cover;
        }

        .bg-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 40%, rgba(0,255,200,0.12), transparent 60%);
          pointer-events: none;
        }

        /* ===========================================
           SECTION STYLING
        ============================================ */
        .section {
          padding: 120px 80px;
          color: white;
          position: relative;
          z-index: 5;
        }
        
        .title-product {
          font-size: 36px;
          margin-bottom: 10px;
          color: #fb6b85;
        }
        .p-product {
          font-size: 18px;
          color: #ffffff;
          max-width: 600px;
          margin-bottom: 40px;
        }

        .services-section {
          background-color: #e8cdd2;
          padding: 60px 80px 40px;
        }

        .services-header {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 40px;
          gap: 20px;
        }

        .sort-filter {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .filter-select {
          padding: 10px 20px;
          border: 1px solid white;
          border-radius: 4px;
          background: white;
          color: #fb6b85;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-select:hover {
          border-color: #fb6b85;
        }

        .filter-select:focus {
          outline: none;
          border-color: #666;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          max-width: 900px;
          margin: 0 auto;
        }

        .product-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 1;
          transform: translateY(0);
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .product-image {
          width: 100%;
          height: auto;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #f8f8f8;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-title {
          padding: 8px 12px 4px;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .product-price {
          padding: 0 12px 12px;
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        /* ===========================================
           CONTACT
        ============================================ */
        .contact {
          background-color: #e8cdd2;
          padding: 40px 80px;
        }

        .contact h3 {
          font-size: 36px;
          margin-bottom: 20px;
          color: #fb6b85;
        }

        .contact p {
          font-size: 18px;
          color: #ffffff;
          max-width: 600px;
        }

        .address {
          margin-bottom: 20px;
          margin-top: 10px;
        }

        .address p {
          color: #ffffff;
        }

        .social-media {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .social-link {
          transition: transform 0.3s ease;
        }

        .social-link:hover {
          transform: scale(1.1);
        }

        .social-icon {
          width: 20px;
          height: 20px;
          color: #ffffff;
        }

        /* ===========================================
           FOOTER
        ============================================ */
        .footer {
          padding: 40px;
          font-size: 10px;
          text-align: center;
          color: #fb6b85;
          position: relative;
          z-index: 5;
          background-color: #e8cdd2;
          margin: 0;
        }

        /* ===========================================
           ANIMATIONS
        ============================================ */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* RESPONSIVE */
        @media (max-width: 1200px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 900px) {
          .section {
            padding: 80px 20px;
          }

          .services-section {
            padding: 40px 20px;
          }

          .services-header {
            flex-direction: column;
            align-items: stretch;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 600px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}