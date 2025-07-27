import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  let { BACKEND_URL } = useContext(UserContext);
  let dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      let response = await axios.post(
        BACKEND_URL + "/api/v2/login",
        { pin, email },
        { withCredentials: true }
      );
      console.log(response.data.user);
      dispatch(setCurrentUser(response.data.user))
      toast.success(response.data.message);
      setLoader(false);
      navigate("/home");
    } catch (error) {
      console.log(`Log in error:`, error);
      toast.error(error.response.data.message);
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">
          Login In your Account
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Username Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Email*
            </label>
            <input
              type="text"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              PIN*
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your PIN"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-10"
                onChange={(e) => setPin(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-sm text-blue-600 hover:underline"
              >
                {showPassword ? (
                  <IoEyeOff className="text-2xl" />
                ) : (
                  <FaEye className="text-2xl" />
                )}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md"
          >
            {!!loader ? (
              <span className="loading loading-dots loading-xl"></span>
            ) : (
              "Login Securely"
            )}
          </button>
        </form>

        {/* Security Warning */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
