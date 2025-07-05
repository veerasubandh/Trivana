import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16">
      <h1 className="font-extrabold text-[60px] leading-2 mt-14 text-center max-w-6xl">
        <span className=" text-[#d74e14]">Discover your Next Adventure with AI: </span>
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center mt-8 pb-10">Your personal Trip Planner and travel curator, creating custom iterneraries tailored to your interests and budget.</p>
      <Link to={'/create-trip'}><Button>Get Started. It's Free</Button></Link>
    </div>
  );
}

export default Hero;