import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function UpdateAccount() {
  const [userData, setUserData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { BACKEND_URL, setIsCredited } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/v2/getcurrentuser`,
          {
            withCredentials: true,
          }
        );
        setUserData(data.user);
        setSelectedImage(data.user?.photoUrl || null);
      } catch (error) {
        toast.error("Failed to load user data");
      }
    };
    fetchUser();
  }, [BACKEND_URL]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in userData) {
        formData.append(key, userData[key]);
      }
      if (imageFile) formData.append("photo", imageFile);

      await axios.put(`${BACKEND_URL}/api/v2/updateuser`, formData, {
        withCredentials: true,
      });

      setIsCredited((prev) => !prev);
      toast.success("Account updated successfully");
      alert("Your account Updated Successfully! Re-login to see Updated Account")
      navigate("/home");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 text-black overflow-hidden">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden h-[85vh]">
        {/* Left Panel - Image */}
        <div className="bg-blue-600 text-white flex flex-col items-center justify-center p-6 w-full md:w-[35%]">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome {userData?.fullName?.split(" ")[0] || "User"} 👋
          </h2>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-white"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-sm text-black">
              No Image
            </div>
          )}
        </div>

        {/* Right Panel - Form */}
        <div className="w-full md:w-[65%] p-6 overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Update Your Account
          </h3>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName || ""}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email || ""}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={userData.phone || ""}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={userData.dob ? userData.dob.slice(0, 10) : ""}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={userData.address || ""}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={userData.gender || ""}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Upload New Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm"
              />
            </div>

            <div className="col-span-1 md:col-span-2 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
              >
                {loading ? "Updating..." : "Update Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateAccount;
