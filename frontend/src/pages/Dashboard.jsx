import Table from "../components/Table";
import Chart2 from "../components/Chart2";
import Chart1 from "../components/Chart1";
import Chart3 from "../components/Chart3";
import { useSelector } from "react-redux";


function Dashboard() {
  let {currentUser} = useSelector(store=>store.user)
  return (
    <>
      <main className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 py-6 space-y-6">
        {/* Welcome Header */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Welcome, <span className="text-emerald-600">{currentUser.fullName}</span>!
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
    </>
  );
}

export default Dashboard;
