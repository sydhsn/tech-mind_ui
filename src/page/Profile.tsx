import { useEffect, useState, useMemo, useCallback } from "react";
import { useAuth } from "../components/AuthProvider";
import { useUpdateProfileMutation } from "../services/authApi";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialProfile = useMemo(
    () => ({
      id: user?.id || "1",
      name: user?.name || "Your Name",
      email: user?.email || "your-email@example.com",
      profilePhoto: user?.profilePhoto || "https://github.com/shadcn.png",
      bio: user?.bio || "No bio available",
      previewPhoto: "",
    }),
    [user]
  );

  const [profile, setProfile] = useState(initialProfile);

  const [
    updateUser,
    {
      isSuccess: isProfileSuccess,
      isError: updateError,
      error: updateErrorDetails,
    },
  ] = useUpdateProfileMutation();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setProfile((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProfile((prev) => ({
          ...prev,
          profilePhoto: file,
          previewPhoto: imageUrl,
        }));
      }
    },
    []
  );

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", profile.id);
      formData.append("name", profile.name);
      formData.append("bio", profile.bio);
      if (profile.profilePhoto instanceof File) {
        formData.append("profilePhoto", profile.profilePhoto);
      }

      const response = await updateUser(formData).unwrap();
      const updatedProfilePhoto =
        response.user?.profilePhoto || profile.profilePhoto;

      setProfile((prev) => ({
        ...prev,
        profilePhoto: updatedProfilePhoto,
        previewPhoto: "",
      }));

      const updatedUser = {
        ...user,
        ...response.user,
        profilePhoto: updatedProfilePhoto,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setEditMode(false);
    } catch (error) {
      toast.error("Profile update failed");
      console.error("Profile update failed", error);
    } finally {
      setIsLoading(false);
    }
  }, [profile, updateUser, user, setUser]);

  // Handle successful profile update
  useEffect(() => {
    if (isProfileSuccess) {
      toast.success("Profile updated successfully");
      setProfile((prev) => ({
        ...prev,
        profilePhoto: user?.profilePhoto || prev.profilePhoto,
        name: user?.name || prev.name,
        bio: user?.bio || prev.bio,
      }));
      setEditMode(false);
    }
  }, [isProfileSuccess, user]);

  // Handle profile update errors
  useEffect(() => {
    if (updateError) {
      toast.error("Profile update failed");
      console.error("Profile update error:", updateErrorDetails);
    }
  }, [updateError, updateErrorDetails]);

  const profilePhotoSrc = editMode
    ? profile.previewPhoto || profile.profilePhoto
    : profile.profilePhoto;

  return (
    <div className="bg-gray-900 text-white h-[calc(100vh-114px)] flex items-center justify-center overflow-hidden">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex flex-col items-center">
          <label
            htmlFor="avatar-upload"
            className={`cursor-pointer ${!editMode ? "hidden" : ""}`}
          >
            <img
              className="w-24 h-24 rounded-full border-4 border-gray-600 hover:opacity-80 transition"
              src={profilePhotoSrc}
              alt="Profile"
            />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {!editMode && (
            <img
              className="w-24 h-24 rounded-full border-4 border-gray-600"
              src={profile.profilePhoto}
              alt="Profile"
            />
          )}

          <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
          <p className="text-gray-400">{profile.email}</p>
          <p className="text-gray-300 mt-2 text-center">{profile.bio}</p>

          {editMode && (
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
          )}

          <button
            onClick={editMode ? handleSave : () => setEditMode(true)}
            disabled={isLoading}
            className="mt-4 bg-gray-600 cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : editMode ? (
              "Save Changes"
            ) : (
              "Edit Profile"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
