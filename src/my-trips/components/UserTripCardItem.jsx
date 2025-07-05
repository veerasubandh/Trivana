import React, { useEffect, useState } from 'react';
import { GetPlaceDetails } from '../../service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    try {
      const resp = await GetPlaceDetails(data);
      const photos = resp?.data?.places?.[0]?.photos;

      if (!photos || photos.length === 0) return;

      const photoRef = photos[0].name;

      const constructedUrl = `https://places.googleapis.com/v1/${photoRef}/media?maxHeightPx=1200&maxWidthPx=1200&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
      setPhotoUrl(constructedUrl);
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  };

  return (
    <Link to={'/view-trip/'+ trip?.id}>
    <div className="mt-7 p-5 hover:scale-105 transition-all">
      <img
        src={photoUrl || "/placeholder.svg"}
        alt=""
        className="object-cover rounded-xl w-full h-[250px]"
      />
      <div>
        <h2 className="font-bold text-black text-lg mt-2">{trip?.userSelection?.location?.label}</h2>
        <h2 className="text-sm text-gray-500">
          {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
        </h2>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCardItem;