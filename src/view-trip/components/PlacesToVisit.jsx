import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg mt-8">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div className="" key={index}>
            <h2 className="font-medium text-lg">Day {item?.day}</h2>
            <div className="grid grid-cols-2 gap-5">
              {item?.places?.map((place, pIndex) => (
                <div className="my-3" key={pIndex}>
                  <h2 className="font-medium text-sm text-orange-600">
                    {place?.travelTime}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;