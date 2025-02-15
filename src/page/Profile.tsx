import { faker } from "@faker-js/faker";
import { useState } from "react";

const user = {
  name: "Md Saiyad Husain",
  email: "saiyad@example.com",
  avatar: faker.image.avatar(),
  bio: "Full-Stack Developer | Passionate about building scalable applications",
};

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-900 text-white h-[calc(100vh-114px)] flex items-center justify-center overflow-hidden">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full border-4 border-gray-600"
            src={profile.avatar}
            alt="Profile"
          />
          <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
          <p className="text-gray-400">{profile.email}</p>
          <p className="text-gray-300 mt-2 text-center">{profile.bio}</p>

          {editMode ? (
            <div className="mt-4 w-full">
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                placeholder="Name"
              />
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none mt-2"
                placeholder="Bio"
              />
            </div>
          ) : null}

          <button
            onClick={() => setEditMode(!editMode)}
            className="mt-4 bg-gray-600 cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition"
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
