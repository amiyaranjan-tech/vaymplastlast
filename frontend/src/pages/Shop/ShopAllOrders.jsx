import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import ShopOrderCard from "./ShopOrderCard"; 

const ShopAllOrders = () => {
  const { seller } = useSelector((state) => state.seller);
  const [kuchvi, setkuchvi] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/kuchvi/get-all-admin-kuchvi-request`, {
        withCredentials: true,
      })
      .then((res) => {
        setkuchvi(res.data.allKuchviRequest);
      })
      .catch((error) => {
        console.log("Error fetching kuchvi data:", error.response);
      });
  }, []);

  useEffect(() => {
    if (seller._id) {
      const newRows = kuchvi
        .filter(val => val.shopId === seller._id)
        .map((val, ind) => ({
          id: ind,
          orderid: val.orderId,
          productid: val.productId,
          size: val.size,
          image: val.img,
          shopPrice: "₹" + val.shopPrice,
          status: val.status,
          kuchviId: val.kuchviId,
          productName: val.productName
        }));
      setRows(newRows);
    }
  }, [kuchvi, seller._id]);

  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="w-full flex items-center pt-5 justify-center">
          <div className="w-[95%] bg-white">
            {rows.length === 0 ? (
              <div className="flex justify-center items-center h-[50vh]">
                <p className="text-xl">No orders found</p>
              </div>
            ) : (
              rows.map((order) => (
                <ShopOrderCard key={order.id} order={order} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;
