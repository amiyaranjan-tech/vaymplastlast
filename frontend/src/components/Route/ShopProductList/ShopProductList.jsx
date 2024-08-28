import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; // Import Slider from react-slick
import ProductCard from '../ProductCard/ProductCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from '../../../styles/styles';
import { Oval } from 'react-loader-spinner';

const ShopProductList = ({ shopName, products, shopId }) => {
  const navigate = useNavigate();

  // Slider settings for react-slick
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Set the autoplay interval to 5 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden">
      <div className={`${styles.section} py-2`}>
      <div className="text-[20px] text-center md:text-start font-[600] font-Roboto">  
          {/* Shop Name Heading centered */}
          <h2 className="text-[20px] font-semibold mb-1 text-center">{shopName}</h2>
        </div>

        {/* Product Carousel using Slider */}
        <Slider {...sliderSettings} className="w-full">
          {products && products.length !== 0 ? (
            products.map((product) => (
              <div key={product._id} className="px-2 mb-4">
                <ProductCard data={product} />
              </div>
            ))
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',   width: '100vw'}}>
            <Oval color="#00BFFF" height={80} width={80} />
          </div>
          )}
        </Slider>

        {/* View Shop Button at the bottom */}
        <div className="text-center">
          <button
            onClick={() => navigate(`/shop/preview/${shopId}`)}
            className="bg-gradient-to-r from-blue-500 to-slate-900 text-white font-bold py-3 px-24 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProductList;
