import ProfilePage from "../components/ProfilePage";
import Nav from "../components/Nav";
import { Routes, Route } from "react-router-dom";

import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { setWeeklyData } from "../store/transactionSlice";
import { setCurrentUserData } from "../store/userSlice";
import Dashboard from "./Dashboard";
import Credit from "./Credit";
import Debit from "./Debit";
import Loan from "./Loan";
import Transfer from "./Transfer";
import UpdateAccount from "./UpdateAccount";

function Home() {
  let userData = useSelector((store) => store.user.currentUser);
  let {
    BACKEND_URL,
    isCredited,
    setIsCredited,
    isDebited,
    setIsDebited,
    isLoanTaken,
    setIsLoanTaken,
    isTransferred,
    setIsTransferred,
  } = useContext(UserContext);
  let dispatch = useDispatch();

  // Getting last 7 days data
  useEffect(() => {
    const fetchWeekTransactions = async () => {
      try {
        let res = await axios.get(
          BACKEND_URL + `/api/v2/weektransaction/${userData._id}`,
          { withCredentials: true }
        );
        // console.log(res.data.transactions);
        // dispatch(setWeeklyData(res.data.transactions));
        let Data = {data:res.data.transactions,accountNumber:userData.accountNumber}
        console.log(userData)
        dispatch(setWeeklyData(Data));
      } catch (error) {
        console.log(error);
      }
    };

    if (userData?._id) {
      fetchWeekTransactions();
    }
  }, [
    isCredited,
    setIsCredited,
    isDebited,
    setIsDebited,
    isLoanTaken,
    setIsLoanTaken,
    isTransferred,
    setIsTransferred,
  ]);

  // Getting detailed user Data
  useEffect(() => {
    const fetchCompleteUserData = async () => {
      try {
        let res = await axios.get(BACKEND_URL + `/api/v2/getcurrentuser`, {
          withCredentials: true,
        });
        // console.log(res.data.transactions);
        dispatch(setCurrentUserData(res.data.user));
      } catch (error) {
        console.log(error);
      }
    };

    if (userData?._id) {
      fetchCompleteUserData();
    }
  }, [userData?._id]);

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
        <Routes>
          {/* Main home layout with child routes */}
          <Route index element={<Dashboard />} />
          <Route path="credit" element={<Credit />} />
          <Route path="update" element={<UpdateAccount />} />
          <Route path="debit" element={<Debit />} />
          <Route path="loan" element={<Loan />} />
          <Route path="transfer" element={<Transfer />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
