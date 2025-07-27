import * as XLSX from "xlsx";
import { FiDownload } from "react-icons/fi";
import { useSelector } from "react-redux";


// Styling the buttons for Each one
const getTypeBadge = (type) => {
  const base = "px-2 py-1 rounded-full text-xs font-semibold min-w-[80px] inline-block text-center";
  switch (type.toLowerCase()) {
    case "credit":
      return `${base} bg-emerald-200 text-emerald-800`;
    case "debit":
      return `${base} bg-red-200 text-red-800`;
    case "loan":
      return `${base} bg-indigo-200 text-indigo-800`; 
    case "transfer":
      return `${base} bg-amber-200 text-amber-800`;  
    default:
      return `${base} bg-gray-200 text-gray-800`;
  }
};


function Table() {
  const transactions = useSelector((store) => store.tran.weeklyData) || [];
  const userData = useSelector((store) => store.user.currentUserData) || [];

  // Uploading data into excel sheet
  const exportToExcel = () => {
    const exportData = transactions.map((txn) => ({
      Type: txn.type,
      "Account No": txn.accNo || "-",
      "To A/C": txn.toAccount || "-",
      Amount: txn.amount,
      Date: txn.createdAt?.split("T")[0] || "-",
      Status: txn.status,
      Description: txn.description,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md">

      {/* Header part */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Transaction History</h2>
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200 transition-all font-medium"
        >
          <FiDownload className="text-lg" /> Download Last 7 days Receipt
        </button>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-gray-600 font-semibold">Type</th>
              <th className="px-4 py-3 text-gray-600 font-semibold">Account No</th>
              <th className="px-4 py-3 text-gray-600 font-semibold">To A/C</th>
              <th className="px-4 py-3 text-gray-600 font-semibold">Amount (₹)</th>
              <th className="px-4 py-3 text-gray-600 font-semibold">Date</th>
              <th className="px-4 py-3 text-gray-600 font-semibold">Status</th>
              <th className="px-4 py-3 text-gray-600 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Transactions Not Found !
                </td>
              </tr>
            ) : (
              transactions.map((txn, index) => {
                let colorClass = "text-blue-600"; 
                const type = txn.type.toLowerCase();

                if (type === "credit") colorClass = "text-green-600";
                else if (type === "debit") colorClass = "text-red-600";
                else if (type === "loan") colorClass = "text-indigo-600";
                else if (type === "transfer") colorClass = "text-amber-600";

                return (
                  <tr
                    key={index}
                    className={`transition duration-200 ${
                      index % 2 === 0 ? "bg-emerald-50" : "bg-rose-50"
                    } hover:bg-blue-50`}
                  >
                    <td className="px-4 py-3 font-extrabold">
                      <span className={getTypeBadge(txn.type)}>
                        {txn.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-bold">
                      {userData.accountNumber || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-bold">
                      {txn.toAccount || "-"}
                    </td>
                    <td className={`px-4 py-3 font-semibold ${colorClass} font-bold`}>
                      ₹{txn.amount}
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-bold">
                      {txn.createdAt?.split("T")[0] || "-"}
                    </td>
                    <td className="px-4 py-3 text-green-700 font-bold capitalize">
                      {txn.status}
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-bold">
                      {txn.description || "No description"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
