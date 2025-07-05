import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, []);

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
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  });

  return (
    <div className="p-4 shadow-sm flex justify-between items-center px-5">
      <img
        src="/logo.svg"
        alt=""
        onClick={() => navigate("/")}
        className="w-38 cursor-pointer"
      />
      <div className="">
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-black">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-black">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture || "/profile.jpg"}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  LogOut
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            className="cursor-pointer"
            onClick={() => setOpenDialog(true)}
          >
            Sign In
          </Button>
        )}
      </div>
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

export default Header;
