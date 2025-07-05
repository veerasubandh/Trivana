import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const BASE_URL = `https://places.googleapis.com/v1/places:searchText?key=${API_KEY}`;

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-FieldMask": "places.displayName,places.photos",
  },
};

export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);