import { Button } from "./components/ui/button";
import "./App.css";
import Hero from "./components/custom/Hero";

function App() {
  return (
    <>
     <Hero />
     <div className="flex justify-center px-4 mt-5">
        <img
          src="https://media.istockphoto.com/id/1413486210/vector/travel-trip-map-lay-on-wooden-desk-tourism-vacation-infographic-top-view-banner-concept.jpg?s=612x612&w=0&k=20&c=LGZY09DtxJHpZf8NEiFtgK_KRHmECefhZGZ0oRy5hHI="
          alt="Travel Planning"
          className="max-w-[700px] w-full rounded-xl shadow-lg border-5 border-black"
        />
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-10">
        © 2025 Trivana. All rights reserved.
      </footer>
    </>
  );
}

export default App;
