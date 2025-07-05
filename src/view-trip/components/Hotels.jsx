import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "../../service/GlobalApi";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  const [hotelsWithPhotos, setHotelsWithPhotos] = useState([]);

  const getPhotoUrl = (photoRef) =>
    `https://places.googleapis.com/v1/${photoRef}/media?maxHeightPx=500&maxWidthPx=500&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

  const fetchHotelImages = async () => {
    const updatedHotels = await Promise.all(
      trip?.tripData?.hotels?.map(async (hotel) => {
        try {
          const data = { textQuery: hotel.hotelName };
          const resp = await GetPlaceDetails(data);
          const photoRef = resp?.data?.places?.[0]?.photos?.[0]?.name;

          const imageUrl = photoRef ? getPhotoUrl(photoRef) : "";
          return { ...hotel, imageUrl };
        } catch (err) {
          console.error("Error fetching image for", hotel.hotelName);
          return hotel;
        }
      })
    );

    setHotelsWithPhotos(updatedHotels);
  };

  useEffect(() => {
    if (trip?.tripData?.hotels) {
      fetchHotelImages();
    }
  }, [trip]);

  return (
    <div className="my-8">
      <h2 className="font-bold text-xl mb-4">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {hotelsWithPhotos.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;