import React, { useEffect, useState } from "react";
import api from "../../api/api";

function FarmerMilk() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH COLLECTIONS
  // =========================
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await api.get("farmer/collections/");
        console.log(res)
        setCollections(res.data);
      } catch (err) {
        setError("Failed to load milk collections");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) return <p className="p-6 text-gray-400">Loading collections...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  // =========================
  // SUMMARY STATS
  // Calculated from the collections array
  // =========================
  const totalCollections = collections?.length;

  const totalLiters = collections?.reduce(
    (sum, item) => sum + Number(item.liters), 0
  );

  const totalAmount = collections?.reduce(
    (sum, item) => sum + Number(item.total_amount), 0
  );

  return (
    <div className="p-4 md:p-6 space-y-5 bg-gray-50 min-h-screen">

      {/* ── HEADER ── */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">My Milk Collections</h1>
        <p className="text-gray-400 text-sm mt-1">View all your milk deliveries and earnings</p>
      </div>

      {/* ── SUMMARY CARDS ──
          3 quick stats computed from the fetched data
      */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Total number of collection records */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-green-400 hover:shadow-md transition">
          <p className="text-sm text-gray-400">Collections</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{totalCollections}</h2>
        </div>

        {/* Sum of all liters across every collection */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-blue-400 hover:shadow-md transition">
          <p className="text-sm text-gray-400">Total Liters</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{totalLiters} L</h2>
        </div>

        {/* Sum of all money earned */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-yellow-400 hover:shadow-md transition">
          <p className="text-sm text-gray-400">Total Earnings</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">KES {totalAmount?.toLocaleString()}</h2>
        </div>

      </div>

      {/* ── COLLECTION HISTORY TABLE ── */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Collection History</h2>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Session</th>
                <th className="p-3 text-left">Liters</th>
                <th className="p-3 text-left">Price/L</th>
                <th className="p-3 text-left">Amount</th>
                {/* <th className="p-3 text-left">Collected By</th> */}
              </tr>
            </thead>

            <tbody>
              {collections?.map((collection) => (
                <tr key={collection?.id} className="border-t border-gray-100 hover:bg-gray-50">

                  <td className="p-3 text-gray-500">{collection?.collection_date}</td>

                  {/* Session badge: yellow for morning, indigo for evening */}
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      collection?.session === "MORNING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}>
                      {collection?.session}
                    </span>
                  </td>

                  <td className="p-3">{collection?.liters} L</td>
                  <td className="p-3">KES {collection?.price_per_liter}</td>
                  <td className="p-3 font-semibold text-green-600">KES {collection?.total_amount}</td>
                  {/* <td className="p-3 text-gray-500">{collection?.porter_name}</td> */}

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-2 p-3">
          {collections?.map((collection) => (
            <div key={collection?.id} className="bg-gray-50 rounded-lg p-4">

              {/* Top row: date + session badge */}
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">{collection?.collection_date}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  collection?.session === "MORNING"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-indigo-100 text-indigo-700"
                }`}>
                  {collection?.session}
                </span>
              </div>

              <p className="text-sm text-gray-500">Liters: <span className="font-medium text-gray-700">{collection?.liters} L</span></p>
              <p className="text-sm text-gray-500">Price/L: KES {collection?.price_per_liter}</p>
              <p className="font-semibold text-green-600 mt-1">KES {collection?.total_amount}</p>
              <p className="text-xs text-gray-400 mt-1">Porter: {collection?.porter_name}</p>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default FarmerMilk;