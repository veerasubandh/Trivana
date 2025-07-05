import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "../constants/options";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { generateTripPlan } from "../service/AIModel";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...resp.data,
          access_token: tokenInfo?.access_token,
        })
      );
      setOpenDialog(false);
      toast.success("Signed in successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch user info.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResp) => {
      await GetUserProfile(codeResp);
    },
    onError: (error) => {
      toast.error("Google sign-in failed!");
      console.log(error);
    },
    scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  });

  const SaveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: TripData,
        userEmail: user?.email || "unknown",
        id: docId,
      });

      toast.success("Trip saved!");
      navigate('/view-trip/'+ docId)
    } catch (error) {
      console.error("Failed to save trip:", error);
      toast.error("Trip generated but failed to save!");
    }
  };

  const OnGenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.access_token) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData.travellers
    ) {
      toast("Please fill in all the details!");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label || ""
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{travellers}", formData?.travellers)
      .replace("{budget}", formData?.budget);

    try {
      const { success, data, message } = await generateTripPlan(FINAL_PROMPT);

      if (success) {
        toast.success("Trip generated successfully!");
        await SaveAiTrip(data);
      } else {
        toast.error("Failed to generate trip.");
        console.error(message);
      }
    } catch (error) {
      toast.error("Unexpected error occurred.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
      <p className="text-gray-500 text-xl mt-3">
        Just provide some basic information, and our trip planner will generate a customized itinerary.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Location */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        {/* Days */}
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                  formData?.budget === item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travellers */}
        <div>
          <h2 className="text-xl my-3 font-medium">Who are you traveling with?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("travellers", item.people)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                  formData?.travellers === item.people && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="my-18 flex justify-end">
        <Button onClick={OnGenerateTrip} disabled={loading}>
          {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : "Generate Trip"}
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" className="w-28 mx-auto" />
              <h2 className="font-bold text-lg text-black mt-7 text-center">
                Sign In With Google
              </h2>
              <p className="text-center text-gray-500">
                Sign in to generate your trip itinerary!
              </p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center justify-center"
              >
                <FcGoogle className="h-6 w-6" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
