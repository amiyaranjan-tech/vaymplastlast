import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopCard from "../../ShopCard/ShopCard";
import styles from "../../../styles/styles"; 
import { Oval } from 'react-loader-spinner';

const ShopsSection = () => {
  const navigate = useNavigate();
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [shopList, setShopList] = useState([]);

  useEffect(() => {
    if (!isLoading && allProducts.length > 0) {
      const uniqueShopIds = new Set();
      const uniqueShops = [];
      allProducts.forEach((product) => {
        const shopId = product.shop._id;
        if (!uniqueShopIds.has(shopId)) {
          uniqueShopIds.add(shopId);
          uniqueShops.push(product.shop);
        }
      });
      setShopList(uniqueShops);
    }
  }, [allProducts, isLoading]);

  return (
    <div className={`${styles.section} py-2`}>
        <div className="text-[20px] text-center md:text-start font-[600] font-Roboto">  
        <h1 className="text-center mb-1">Our Shops</h1>
      </div>

      {/* Shop List Container */}
      <div
        className="flex overflow-x-auto scroll-snap-x snap-mandatory gap-5 mb-4 border-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>
          {`
            .scroll-container::-webkit-scrollbar {
              display: none; /* Hide scrollbar */
            }
          `}
        </style>

        {/* Conditional Rendering for Loading, Shops, or No Shops */}
        {isLoading ? (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',   width: '100vw'}}>
         <Oval color="#00BFFF" height={80} width={80} />
       </div>
        ) : shopList.length > 0 ? (
          shopList.map((shop) => (
            <div key={shop._id} className="snap-center shrink-0 w-1/2 md:w-1/4 lg:w-1/6 xl:w-1/6">
              <ShopCard
                shopName={shop.name}
                image={shop?.avatar?.url}
                shopId={shop._id}
              />
            </div>
          ))
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',   width: '100vw'}}>
          <Oval color="#00BFFF" height={80} width={80} />
        </div>
        )}
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <button
          onClick={() => navigate('/shop')}
         className="bg-gradient-to-r from-blue-500 to-slate-900 text-white font-bold py-3 px-24 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          All Shops
        </button>
      </div>
    </div>
  );
};

export default ShopsSection;
