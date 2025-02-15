import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { useUpdateProfileMutation } from "../services/authApi";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);

  // Manage user state locally
  const [profile, setProfile] = useState({
    id: user?.id || "1",
    name: user?.name || "Your Name",
    email: user?.email || "your-email@example.com",
    profilePhoto: user?.profilePhoto || "https://github.com/shadcn.png",
    bio: user?.bio || "No bio available",
    previewPhoto: "",
  });

  // api call to update user profile
  const [
    updateUser,
    {
      isSuccess: isProfileSuccess,
      isError: updateError,
      error: updateErrorDetails,
    },
  ] = useUpdateProfileMutation();

  // Handle text field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({
        ...prev,
        profilePhoto: file,
        previewPhoto: imageUrl,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", profile.id);
      formData.append("name", profile.name);
      formData.append("bio", profile.bio);
      if (profile.profilePhoto instanceof File) {
        formData.append("profilePhoto", profile.profilePhoto);
      }

      const response = await updateUser(formData).unwrap();

      setProfile({
        ...profile,
        profilePhoto: response.user.profilePhoto,
        previewPhoto: "",
      });

      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      setEditMode(false);
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  useEffect(() => {
    if (isProfileSuccess) {
      alert("Profile updated successfully");
      setProfile((prev) => ({
        ...prev,
        profilePhoto: user?.profilePhoto || prev.profilePhoto,
        name: user?.name || prev.name,
        bio: user?.bio || prev.bio,
      }));
      setEditMode(false);
    }
    if (updateError) {
      alert("Failed to update profile");
      console.error("Profile update error:", updateErrorDetails);
    }
  }, [isProfileSuccess, updateError, updateErrorDetails, user]);

  return (
    <div className="bg-gray-900 text-white h-[calc(100vh-114px)] flex items-center justify-center overflow-hidden">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex flex-col items-center">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <img
              className="w-24 h-24 rounded-full border-4 border-gray-600 hover:opacity-80 transition"
              src={profile?.previewPhoto || profile.profilePhoto}
              alt="Profile"
            />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
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
            onClick={editMode ? handleSave : () => setEditMode(true)}
            className="mt-4 bg-gray-600 cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition"
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
