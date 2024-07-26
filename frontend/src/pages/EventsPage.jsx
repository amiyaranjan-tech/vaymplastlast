import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) :
        allEvents.length === 0 ? (
         <div>
          <Header activeHeading={3} />
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-xl">No Events found</p>
        </div>
        </div>
      ) : (
        <div>
          <Header activeHeading={3} />
          <div className="flex flex-wrap justify-center">
            {allEvents.map((event, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
                <EventCard key={index} active={true} data={event} />
              </div>
            ))}
          </div> 
        </div>
      )}
    </>
  );
};

export default EventsPage;
