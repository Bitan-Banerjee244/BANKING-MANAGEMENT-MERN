import ProfilePage from "../components/ProfilePage";
import Nav from "../components/Nav";
import Chart1 from "../components/Chart1";
import Chart2 from "../components/Chart2";
import Chart3 from "../components/Chart3";
import Table from "../components/Table";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { setWeeklyData } from "../store/transactionSlice";
import { setCurrentUserData } from "../store/userSlice";

function Home() {
  let userData = useSelector((store) => store.user.currentUser);
  let { BACKEND_URL } = useContext(UserContext);
  let dispatch = useDispatch()

// Getting last 7 days data
useEffect(() => {
  const fetchWeekTransactions = async () => {
    try {
      let res = await axios.get(
        BACKEND_URL + `/api/v2/weektransaction/${userData._id}`,
        { withCredentials: true }
      );
      // console.log(res.data.transactions);
      dispatch(setWeeklyData(res.data.transactions))
    } catch (error) {
      console.log(error);
    }
  };

  if (userData?._id) {
    fetchWeekTransactions();
  }
}, []);

// Getting detailed user Data
useEffect(() => {
  const fetchCompleteUserData = async () => {
    try {
      let res = await axios.get(
        BACKEND_URL + `/api/v2/getcurrentuser`,
        { withCredentials: true }
      );
      // console.log(res.data.transactions);
      dispatch(setCurrentUserData(res.data.user))
    } catch (error) {
      console.log(error);
    }
  };

  if (userData?._id) {
    fetchCompleteUserData();
  }
}, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-white">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <ProfilePage />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <div className="shadow-md sticky top-0 z-10 bg-white">
          <Nav />
        </div>

        {/* Content Wrapper */}
        <main className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 py-6 space-y-6">
          {/* Welcome Header */}
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Welcome, <span className="text-emerald-600">Bitan Banerjee</span>!
            </h1>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
            <Chart3 />
          </div>
          {/* Bar Chart Section */}
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
            <Chart1 />
          </div>
          <div className="bg-white shadow-md rounded-lg p-2 sm:p-6">
            <Chart2 />
          </div>
          <div className="bg-white shadow-md rounded-lg p-2 sm:p-6">
            <Table />
          </div>

          {/* Donut Chart Section */}
        </main>
      </div>
    </div>
  );
}

export default Home;
