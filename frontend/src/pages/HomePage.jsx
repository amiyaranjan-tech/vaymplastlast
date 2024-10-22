import React, { useEffect, useState } from 'react';
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Footer from "../components/Layout/Footer";
import BottomNav from '../components/Layout/BottomNav';
import BestShoesDeals from '../components/Route/BestShoesDeals/BestShoesDeals';
import MensClothes from '../components/Route/MensClothes/MensClothes';
import ShopsSection from '../components/Route/ShopsSection/ShopsSection';
import WomensClothes from '../components/Route/WomensClothes/WomensClothes';
import ShopProductList from '../components/Route/ShopProductList/ShopProductList'; // Import ShopProductList
import { useSelector } from 'react-redux';

const HomePage = () => {
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
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <MensClothes />
      <WomensClothes />
      <BestShoesDeals />
      <FeaturedProduct />
      <BestDeals />
      <Events />

      {/* Render ShopProductList for each unique shop */}
      {shopList.map((shop) => {
        // Filter the first 10 products for the current shop
        const shopProducts = allProducts.filter(
          (product) => product.shop._id === shop._id
        ).slice(0, 10);

        return (
          <ShopProductList
            key={shop._id}
            shopName={shop.name}
            products={shopProducts}
            shopId={shop._id} // Pass shop ID
          />
        );
      })}

      <ShopsSection />
      {/* <Sponsored /> */}
      <BottomNav />
      <Footer />
      <div
  className="flex md:hidden fixed -right-4 bottom-10 mb-2 p-4 bg-transparent cursor-pointer"
>
  <a href="https://wa.me/917986524704" target="_blank" rel="noopener noreferrer">
    <img src="whatsappIcon.png" width="100px" alt="WhatsApp Message" />
  </a>
</div>
<div
  className="hidden md:flex fixed right-0 bottom-2 mb-2 p-4 bg-transparent cursor-pointer"
>
  <a href="https://wa.me/917986524704" target="_blank" rel="noopener noreferrer">
    <img src="whatsappIcon.png" width="150px" alt="WhatsApp Message" />
  </a>
</div>
    </div>
  );
};

export default HomePage;
