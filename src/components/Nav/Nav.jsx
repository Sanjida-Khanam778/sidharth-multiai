import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { X, Edit2 } from "lucide-react";
import profile from "../../assets/images/profile.png";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProfilePicture,
  selectUser,
  selectFullName,
  setCredentials,
  selectIsAuthenticated,
  selectAccessToken,
  selectRefreshToken,
} from "../../Stores/authSlice";
import {
  useUpdateProfileMutation,
  useGetUserProfileQuery,
} from "../../Api/authapi";
const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [fullName, setFullName] = useState("");
  const profilePictureFromRedux = useSelector(selectProfilePicture);
  const userFromRedux = useSelector(selectUser);
  const fullNameFromRedux = useSelector(selectFullName);
  const [profilePic, setProfilePic] = useState(
    profilePictureFromRedux || profile
  );
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Get current auth state
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentAccessToken = useSelector(selectAccessToken);
  const currentRefreshToken = useSelector(selectRefreshToken);

  // Fetch user profile data
  const { data: userProfileData, refetch: refetchUserProfile } =
    useGetUserProfileQuery(undefined, {
      skip: !isAuthenticated,
    });
  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Update profilePic when user profile data changes
  useEffect(() => {
    if (userProfileData?.profile_picture) {
      setProfilePic(userProfileData.profile_picture);
    } else {
      setProfilePic(profile); // Use default profile picture
    }
  }, [userProfileData]);

  // Update fullName when user profile data changes
  useEffect(() => {
    if (userProfileData?.full_name) {
      setFullName(userProfileData.full_name);
    } else {
      setFullName(""); // Clear name if no fullName
    }
  }, [userProfileData]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      // Add full name to form data
      if (fullName && fullName.trim()) {
        formData.append("full_name", fullName.trim());
      }

      // Add profile picture to form data if it's a file
      if (
        profilePic &&
        profilePic !== profile &&
        profilePic !== profilePictureFromRedux
      ) {
        // If profilePic is a data URL (from file upload), convert it to a file
        if (profilePic.startsWith("data:")) {
          const response = await fetch(profilePic);
          const blob = await response.blob();
          formData.append("profile_picture", blob, "profile.jpg");
        }
      }

      const result = await updateProfile(formData).unwrap();

      // Only update the user data, preserve existing tokens
      // The API might not return tokens, so we keep the existing ones
      const updatedUser = {
        ...userFromRedux,
        fullName: fullName.trim(),
      };

      // Refetch user profile to get updated data
      refetchUserProfile();

      toast.success("Profile Updated Successfully");
      setIsModalOpen(false);
    } catch (error) {
      const errorMsg = error?.data?.message || "Failed to update profile";
      toast.error(errorMsg);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfilePic(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEditClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 py-3 sticky top-0 z-50">
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center">
              <img src={logo} alt="logo" className="w-24" />
            </div>
          </Link>
          <div
            className=" w-12 h-12 my-auto rounded-full ml-3 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              referrerPolicy="no-referrer"
              src={profilePic}
              alt="profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg relative"
          >
            {/* Modal Content */}
            <div className="w-full rounded-t-none">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-8 text-center relative h-40 w-96">
                {/* Cross button */}
                <button
                  className="absolute top-2 right-3 text-white text-2xl font-bold"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h1 className="text-2xl font-medium text-white">My Profile</h1>

                {/* Profile Picture positioned to overlap */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                      <img
                        src={profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="absolute bottom-1 right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white cursor-pointer group"
                      onClick={handleEditClick}
                    >
                      <Edit2 className="w-4 h-4 text-white group-hover:text-gray-200" />
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleProfilePicChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="px-6 pt-16 pb-8 text-center bg-white">
                {/* Name and Title */}
                <h2 className="text-xl font-medium text-gray-900 mb-1">
                  {fullName}
                </h2>
                <p className="text-gray-500 text-sm mb-8"></p>

                {/* Full Name Field */}
                <div className="mb-8 text-left">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 text-gray-900"
                      placeholder={userProfileData?.full_name || "Full name"}
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Update Button */}
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className={`w-full font-medium py-3.5 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isUpdating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
