import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { Oval } from 'react-loader-spinner';

const MensClothes = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    // Log allProducts to check its structure and contents
    console.log("All Products:", allProducts);

    if (allProducts && allProducts.length > 0) {
      // Extract unique categories to inspect
      const categories = [...new Set(allProducts.map(product => product.category))];
      console.log("Available Categories:", categories); // Debugging statement

      // Replace "Men's Clothes" with the actual category name
      const filteredData = allProducts.filter(
        (product) => (product.gender === "Men" || product.gender === "Unisex") && product.category === "Clothes"
      );
      

      console.log("Filtered Data:", filteredData); // Debugging statement

      const sortedData = filteredData.sort((a, b) => b.sold_out - a.sold_out);
      console.log("Sorted Data:", sortedData); // Debugging statement

      const firstTen = sortedData.slice(0, 10); // Show top 10 items
      setData(firstTen);
    }
  }, [allProducts]);

  const handleViewAll = () => {
    // Navigate to the search results page with a query for men's clothes
    navigate("/search/mens%20clothes");
  };

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className="text-[20px] text-center md:text-start font-[600] font-Roboto">
          <h1 className="text-center mb-1">Men's Wear</h1>
        </div>
        <div
          className="flex overflow-x-auto scroll-snap-x snap-mandatory gap-5 mb-4 border-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>
            {`
              .scroll-container::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {data && data.length !== 0 ? (
            <>
              {data.map((product, index) => (
                <div key={index} className="snap-center shrink-0 w-1/2 md:w-1/4 lg:w-1/6 xl:w-1/6">
                  <ProductCard data={product} />
                </div>
              ))}
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',   width: '100vw'}}>
            <Oval color="#00BFFF" height={80} width={80} />
          </div>
          )}
        </div>
        <div className="text-center">
  <button
    onClick={handleViewAll}
    className="bg-gradient-to-r from-blue-500 to-slate-900 text-white font-bold py-3 px-24 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    View All
  </button>
</div>

      </div>
    </div>
  );
};

export default MensClothes;
