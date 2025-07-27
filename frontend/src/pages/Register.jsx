import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Register() {
  const [selectedImage, setSelectedImage] = useState(null); 
  const [imageFile, setImageFile] = useState(null); 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [pin, setPin] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()
  const {BACKEND_URL} = useContext(UserContext)

  //  Image File Handler
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL); 
      setImageFile(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };
  const createAccount = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      setLoader(true);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("dob", dob);
      formData.append("address", address);
      formData.append("gender", gender);
      formData.append("initialDeposit", parseFloat(initialDeposit));
      formData.append("pin", pin);

      const response = await axios.post(
        BACKEND_URL+"/api/v2/createaccount",
        formData,
        {
          withCredentials: true,
        }
      );
      setLoader(false);
      setFullName("");
      setEmail("");
      setPhone("");
      setDob("");
      setAddress("");
      setGender("");
      setInitialDeposit("");
      setPin("");
      setSelectedImage(null);
      setImageFile(null);
      toast.success("Account Created Successfully !!");
      console.log(response.data);
      navigate("/login")
    } catch (error) {
      console.error(
        "❌ Error creating account:",
        error.response.data.errors[0].message
      );
      setLoader(false);
      console.error("❌ Error creating account:", error);

      const errorList = error?.response?.data?.errors;

      if (Array.isArray(errorList)) {
        errorList.forEach((err) => {
          toast.error(err.message); // ✅ display each error
        });
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg border border-blue-200 flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 bg-blue-50 flex flex-col items-center justify-center p-6">
          <div
            className="w-56 h-56 bg-blue-200 rounded-full flex items-center justify-center border-4 border-blue-400 shadow overflow-hidden cursor-pointer"
            onClick={() => document.getElementById("profilePicInput").click()}
            title="Click to upload profile photo"
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-20 h-20 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                      1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 
                      1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            )}
          </div>

          <input
            type="file"
            id="profilePicInput"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />

          <p className="mt-4 text-blue-800 text-lg font-semibold">Your Photo</p>
          <p className="text-blue-600 text-xs text-center mt-1">
            Click the circle above to upload *
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
            Create Savings Account
          </h2>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={createAccount}
            autoComplete="off"
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name*
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                className="input-field"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+91-9876543210"
                className="input-field"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* DOB */}
            <div className="form-control w-full" data-theme="light">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth*
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="input input-bordered w-full bg-white text-gray-800"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address*
              </label>
              <textarea
                id="address"
                name="address"
                rows="2"
                placeholder="123 Street, Kolkata"
                className="input-field resize-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="off"
              ></textarea>
            </div>

            {/* Gender */}
            <div className="form-control w-full" data-theme="light">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender*
              </label>
              <select
                id="gender"
                name="gender"
                defaultValue=""
                className="select select-bordered bg-white text-gray-800"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled value="">
                  Pick a gender*
                </option>
                <option>male</option>
                <option>female</option>
                <option>other</option>
              </select>
            </div>

            {/* Initial Deposit */}
            <div>
              <label
                htmlFor="initialDeposit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Initial Deposit*
              </label>
              <input
                type="number"
                id="initialDeposit"
                name="initialDeposit"
                min="0"
                step="0.01"
                placeholder="100"
                className="input-field"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
              />
            </div>

            {/* PIN */}
            <div className="md:col-span-2">
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                PIN*
              </label>
              <input
                type="password"
                id="pin"
                name="pin"
                maxLength="6"
                placeholder="****"
                className="input-field w-full"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>

            <div className="md:col-span-2 flex flex-col items-center mt-4 gap-2">
              <button
                type="submit"
                disabled={!imageFile || loader}
                className={`w-full md:w-[100%] px-8 py-3 font-semibold rounded-full shadow transition 
    ${
      !imageFile || loader
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 text-white"
    }`}
              >
                {loader ? (
                  <span className="loading loading-dots loading-xl"></span>
                ) : (
                  "Create Account"
                )}
              </button>
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Styles */}
      {/* <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #ccc;
          border-radius: 0.375rem;
          background-color: #fff;
          color: #333;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .input-field:focus {
          border-color: #a855f7;
          box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.3);
          outline: none;
        }
      `}</style> */}
    </div>
  );
}

export default Register;
