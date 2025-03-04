import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-gray-300">
            Empowering learners to achieve their goals through high-quality
            courses.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          Our mission is to make high-quality education accessible to everyone,
          everywhere. We believe that learning should be engaging, practical,
          and fun. Whether you're a beginner or an expert, we have something for
          you.
        </p>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600">Lead Instructor</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Mike Johnson</h3>
              <p className="text-gray-600">Content Strategist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Join Us Today</h2>
        <p className="text-gray-700 mb-6">
          Start your learning journey with us and unlock your full potential.
        </p>
        <button className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
