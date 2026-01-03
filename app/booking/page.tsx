"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  name: string;
  image: string;
  price: number;
  description: string;
}

export default function Booking() {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    const selectedProduct = sessionStorage.getItem('selectedProduct');
    if (selectedProduct) {
      setProduct(JSON.parse(selectedProduct));
    } else {
      // Jika tidak ada produk yang dipilih, redirect ke home
      router.push('/');
    }
  }, [router]);

  const handleWhatsAppOrder = () => {
    if (!product) return;
    
    const phoneNumber = '6287844575653';
    const message = `Halo admin, saya ingin memesan produk ${product.name}. Mohon informasi lebih lanjut. Terima kasih!`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleBack = () => {
    router.back();
  };

  if (!product) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="booking-wrapper">
        <div className="booking-container">
          <div className="product-image-section">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="product-details-section">
            <h1 className="product-name">{product.name}</h1>
            
            <div className="price-tag">
              <span className="price-label">Mulai dari</span>
              <span className="price-amount">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="product-description">
              <h3>Tentang Produk</h3>
              <p>{product.description}</p>
            </div>

            <div className="features-list">
              <h3>Keunggulan</h3>
              <ul>
                <li>✓ Bunga segar berkualitas premium</li>
                <li>✓ Desain custom sesuai keinginan</li>
                <li>✓ Pengiriman tepat waktu</li>
                <li>✓ Gratis kartu ucapan</li>
              </ul>
            </div>

            <button onClick={handleWhatsAppOrder} className="order-button">
              <svg viewBox="0 0 24 24" fill="currentColor" className="whatsapp-icon">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Pesan via WhatsApp
            </button>

            <button onClick={handleBack} className="back-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Kembali
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loading-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e8cdd2;
          color: #fb6b85;
          font-size: 18px;
        }

        .booking-wrapper {
          min-height: 100vh;
          background: #e8cdd2;
          padding: 40px 20px;
        }

        .back-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: white;
          color: #fb6b85;
          border: 2px solid #fb6b85;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .back-button:hover {
          background: #fb6b85;
          color: white;
        }

        .back-button svg {
          width: 20px;
          height: 20px;
        }

        .booking-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }

        .product-image-section {
          background: #f8f8f8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
        }

        .product-image-wrapper {
          width: 100%;
          max-width: 500px;
          aspect-ratio: 1 / 1;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .product-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-details-section {
          padding: 60px 50px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .product-name {
          font-size: 42px;
          font-weight: 700;
          color: #fb6b85;
          margin: 0;
          line-height: 1.2;
        }

        .price-tag {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .price-label {
          font-size: 14px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .price-amount {
          font-size: 32px;
          font-weight: 700;
          color: #333;
        }

        .product-description h3,
        .features-list h3 {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0 0 15px 0;
        }

        .product-description p {
          font-size: 16px;
          line-height: 1.6;
          color: #666;
          margin: 0;
        }

        .features-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .features-list li {
          font-size: 16px;
          color: #666;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .order-button {
          background: #25D366;
          color: white;
          border: none;
          padding: 18px 32px;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
          margin-top: 20px;
          width: 100%;
        }

        .order-button:hover {
          background: #20BA5A;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
        }

        .whatsapp-icon {
          width: 24px;
          height: 24px;
        }

        /* RESPONSIVE */
        @media (max-width: 968px) {
          .booking-container {
            grid-template-columns: 1fr;
          }

          .product-image-section {
            padding: 40px 30px;
          }

          .product-details-section {
            padding: 40px 30px;
          }

          .product-name {
            font-size: 32px;
          }

          .price-amount {
            font-size: 28px;
          }
        }

        @media (max-width: 600px) {
          .booking-wrapper {
            padding: 20px 15px;
          }

          .back-button {
            padding: 10px 20px;
            font-size: 14px;
          }

          .product-image-section {
            padding: 30px 20px;
          }

          .product-details-section {
            padding: 30px 20px;
            gap: 20px;
          }

          .product-name {
            font-size: 28px;
          }

          .price-amount {
            font-size: 24px;
          }

          .order-button {
            padding: 16px 28px;
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}