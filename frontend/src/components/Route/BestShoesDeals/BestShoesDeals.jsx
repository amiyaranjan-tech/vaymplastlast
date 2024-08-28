import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { Oval } from 'react-loader-spinner';

const BestShoesDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    if (allProducts) {
      // Filter products to only include shoes
      const filteredData = allProducts.filter((product) =>
        ["shoe", "sneaker", "boot", "heel", "sandal", "flip-flop", "loafer", "slipper",
      "house slippers", "thong slippers", "gladiator sandals", "sport sandals", "wedge sandals", "heeled sandals",
      "flat sandals", "sneakers", "running shoes", "loafers", "oxfords", "brogues", "boots", "heels", "flats",
      "moccasins", "derbies", "espadrilles", "shoes", "crocs", "joota", "juta", "jhoota", "jutta", "sliper", "slipers","shoes","footwear","leathershoes"].some((keyword) =>
          product.name.toLowerCase().includes(keyword)
        )
      );

      const sortedData = filteredData.sort((a, b) => b.sold_out - a.sold_out);
      const firstFive = sortedData.slice(0, 10);
      setData(firstFive);
    }
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section}`}>
      <div className="text-[20px] text-center md:text-start font-[600] font-Roboto">
          <h1 className="text-center mt-3 mb-1">Footwear</h1>
        </div>
        <div className="flex overflow-x-auto scroll-snap-x snap-mandatory gap-5 mb-4 border-0" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style>
            {`
              .scroll-container::-webkit-scrollbar {
                display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
              }
            `}
          </style>
          {data && data.length !== 0 && (
            <>
              {data.map((product, index) => (
                <div key={index} className="snap-center shrink-0 w-1/2 md:w-1/4 lg:w-1/6 xl:w-1/6">
                  <ProductCard data={product} />
                </div>
              ))}
            </>
          )}
        </div>
        <div className="text-center">
        <button
          onClick={() => navigate(`/search/Footwear`)}
         className="bg-gradient-to-r from-blue-500 to-slate-900 text-white font-bold py-3 px-24 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View All
        </button>
        </div>
      </div>
    </div>
  );
};

export default BestShoesDeals;
