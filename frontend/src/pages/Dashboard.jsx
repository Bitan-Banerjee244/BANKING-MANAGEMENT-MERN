import Table from "../components/Table";
import Chart2 from "../components/Chart2";
import Chart1 from "../components/Chart1";
import Chart3 from "../components/Chart3";
import { useSelector } from "react-redux";

function Dashboard() {
  let { currentUser } = useSelector((store) => store.user);
  return (
    <>
      <main className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 py-6 space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-br from-white via-emerald-50 to-white shadow-md rounded-xl p-6 sm:p-8 text-center transition-transform duration-300 hover:scale-[1.02]">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 leading-snug">
            Welcome,
            <br />
            <span className="inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 font-medium mr-2">
              {currentUser.fullName}
            </span>
                !
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
