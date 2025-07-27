import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";

import { useNavigate } from "react-router-dom";


function Credit() {
  const [formData, setFormData] = useState({
    amount: "",
    toAccount: "",
    description: "",
    pin: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  let { BACKEND_URL,setIsCredited } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount), // ✅ Convert amount to number
        timestamp: new Date(),
      };

      const res = await axios.post(`${BACKEND_URL}/api/v2/credit`, payload, {
        withCredentials: true,
      });
      setIsCredited(prev=>!prev)
      setResponse(res.data);
      setFormData({ amount: "", toAccount: "", description: "", pin: "" });
      navigate("/home")
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white bg-opacity-80 rounded-3xl shadow-xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <h2 className="md:col-span-2 text-3xl md:text-4xl font-bold text-green-700 text-center mb-6">
          Credit Amount
        </h2>

        {/* Amount */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            placeholder="e.g. 5000"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            max="18000"
            className="w-full p-3 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-black"
          />
        </div>

        {/* To Account */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Recipient Account</label>
          <input
            type="text"
            name="toAccount"
            placeholder="e.g. AC1752908260124218"
            value={formData.toAccount}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-black"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            name="description"
            placeholder="e.g. Freelance Payment"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-black"
          />
        </div>

        {/* PIN */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">4-Digit PIN</label>
          <input
            type="password"
            name="pin"
            placeholder="****"
            value={formData.pin}
            onChange={handleChange}
            required
            maxLength="6"
            className="w-full p-3 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-black"
          />
        </div>

        {/* Button */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl text-lg transition-all duration-300"
          >
            {loading ? (
              <span className="loading loading-spinner text-secondary"></span>
            ) : (
              "💳 Credit Now"
            )}
          </button>
        </div>

        {/* Success Message */}
        {response && (
          <div className="md:col-span-2 mt-6 bg-green-100 text-green-800 border-l-4 border-green-600 p-4 rounded-lg shadow-sm">
            ✅ {response.message}
            <br />
            💰 New Balance: ₹{response.updatedBalance}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="md:col-span-2 mt-6 bg-red-100 text-red-800 border-l-4 border-red-600 p-4 rounded-lg shadow-sm">
            ❌ {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default Credit;
