import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "../../components/ui/button";
import { GetPlaceDetails } from "../../service/GlobalApi";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
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

      const constructedUrl = `https://places.googleapis.com/v1/${photoRef}/media?maxHeightPx=1200&maxWidthPx=1200&key=${
        import.meta.env.VITE_GOOGLE_PLACE_API_KEY
      }`;
      setPhotoUrl(constructedUrl);
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  };

  return (
    <div>
      <img
        src={photoUrl}
        alt="Destination"
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📆 {trip.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No. Of Travellers : {trip.userSelection?.travellers}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
