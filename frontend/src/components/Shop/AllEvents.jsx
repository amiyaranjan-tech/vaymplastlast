import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { getAllEventsShop } from "../../redux/actions/event";

const AllEvents = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch, seller._id]);

  const filteredProducts = allEvents?.filter((product) =>
    product.listing === "Event" && product.shop._id === seller._id
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <Loader />
        ) : (
          filteredProducts?.length === 0 ? (
            <div className="flex items-center justify-center h-[50vh]">
              <p className="text-2xl font-semibold text-gray-700">
                No Events Found
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="relative border rounded-lg p-4 shadow-md">
                <img src={product.images[0]?.url} alt={product.name} className="w-full h-64 object-contain rounded mb-2" />
                <div className="text-lg font-semibold mt-2">{product.name}</div>
                <p className="text-blue-700 font-semibold mb-2 text-xl underline">
                  {product.eventDescription}
                </p>
                <p className="text-gray-600">Price: ₹{product.ShopPrice}</p>

              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default AllEvents;
