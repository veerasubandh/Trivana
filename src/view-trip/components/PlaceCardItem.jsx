import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "../../service/GlobalApi";

function PlaceCardItem({ place }) {
  const [imageUrl, setImageUrl] = useState("");

  const getPhotoUrl = (photoRef) =>
    `https://places.googleapis.com/v1/${photoRef}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

  useEffect(() => {
    const fetchPlaceImage = async () => {
      try {
        const data = { textQuery: place?.placeName };
        const resp = await GetPlaceDetails(data);
        const photoRef = resp?.data?.places?.[0]?.photos?.[0]?.name;

        if (photoRef) {
          setImageUrl(getPhotoUrl(photoRef));
        }
      } catch (error) {
        console.error("Error fetching image for place:", place?.placeName, error);
      }
    };

    if (place?.placeName) {
      fetchPlaceImage();
    }
  }, [place]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
      target="_blank"
    >
      <div className="border shadow-md rounded-xl px-3 mt-2 flex gap-5 hover:scale-105 transition-all">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={place?.placeName}
          className="w-[130px] h-[130px] rounded-xl object-cover mt-4"
        />
        <div>
          <h2 className="font-bold text-lg text-black p-2">
            {place?.placeName}
          </h2>
          <p className="text-sm text-gray-400">{place?.details}</p>
          <div className="flex justify-between pb-2">
            <h2 className="mt-2 text-black">🕙 {place?.travelTime}</h2>
            <Button className="w-7 h-7 mt-2">
              <FaMapLocationDot />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;