import React from "react";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center text-white text-center p-6">
      {/* 404 Text */}
      <h1 className="text-9xl font-bold mb-4 animate-bounce">404</h1>

      {/* Message */}
      <h2 className="text-4xl font-semibold mb-4">Oops! Page Not Found</h2>
      <p className="text-lg mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track!
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="bg-white text-purple-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-all"
      >
        Go Back Home
      </Link>

      {/* Optional: Illustration or Icon */}
      <div className="mt-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default PageNotFound;
