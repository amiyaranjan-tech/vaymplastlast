import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineRight } from "react-icons/ai";

const ShopOrderCard = ({ order }) => {
  const {
    image,
    productName,
    status,
    shopPrice,
    size,
    kuchviId
  } = order;
// console.log("shopp", productName)

  return (
      <Link to={`/order/${kuchviId}`} className="bg-white ml-2 p-4 rounded shadow flex items-start gap-4">
      <div className="flex items-start flex-grow">
        {image && (
          <div className="flex-none w-34">
            <img src={image} alt={productName} className="w-[70px] h-[90px] object-contain rounded" />
          </div>
        )}
        <div className="flex flex-col justify-between flex-grow ml-4">
          <div className="mb-2 md:hidden">
            <Link to={`/order/${kuchviId}`} className="hover:text-blue-500">
              {productName.length > 20 ? productName.slice(0, 10) + "..." : productName}
            </Link>
          </div>
          <div className="mb-2 hidden md:block">
            <Link to={`/order/${kuchviId}`} className="hover:text-blue-500">
              {productName}
            </Link>
          </div>
          <div className="text-sm text-gray-600">Status: {status}</div>
          <div className="text-sm text-gray-600">Price: {shopPrice}</div>
          <div className="text-sm text-gray-600">Size: {size}</div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row-reverse items-center mt-6">
        <Link to={`/order/${kuchviId}`}>
          <Button
            variant="contained"
            style={{
              backgroundColor: 'transparent',
              color: 'inherit',
              boxShadow: 'none'
            }}
            endIcon={<AiOutlineRight />}
          />
        </Link>
      </div>
    </Link>
  );
};

export default ShopOrderCard;
