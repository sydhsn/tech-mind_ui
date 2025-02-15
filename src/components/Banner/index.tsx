import React from "react";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import { Search } from "lucide-react"; // Icon Library
import BannerImage from "../../assets/banner/images.jpeg";

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[450px] bg-black">
      {/* Background Image */}
      <img
        src={BannerImage} // Change to your actual image URL
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* Overlay Content */}
      <div className="relative flex flex-col items-center justify-center h-full px-6 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold">
          Find Your Perfect Course
        </h1>
        <p className="mt-2 text-lg md:text-xl text-gray-300">
          Search from thousands of online courses
        </p>

        {/* Search Bar */}
        <div className="mt-6 w-full max-w-lg flex items-center bg-black/80 rounded-lg shadow-lg p-2 border border-white">
          <Input
            type="text"
            placeholder="Search for courses..."
            className={cn(
              "w-full bg-transparent border-none text-gray-200 placeholder-gray-400 focus:ring-0 focus:outline-none"
            )}
          />
          <button className="p-2 text-white hover:text-gray-300 cursor-pointer">
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
