import React, { useEffect, useState } from "react";
import api from "../../api/api";

const FarmerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH DASHBOARD DATA
  // =========================
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("farmers/dashboard/");
        setDashboard(res.data);
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Show loading or error message before rendering
  if (loading) return <p className="p-6 text-gray-400">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  // Destructure the data we need from the API response
  const {
    total_collections,
    total_liters,
    total_amount,
    today_collection,
    monthly_earnings,
    monthly_liters,
  } = dashboard;

  return (
    <div className="p-4 md:p-6 space-y-5 bg-gray-50 min-h-screen">

      {/* ── HEADER ── */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Farmer Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Overview of your milk production</p>
      </div>

      {/* ── STATS CARDS ──
          Each card shows one metric.
          border-t-4 gives a colored top accent instead of a full border.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Total number of milk collections ever recorded */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-green-400 hover:shadow-md transition">
          <p className="text-sm text-gray-400">Total Collections</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{total_collections}</h2>
        </div>

        {/* Total liters collected across all time */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-blue-400 hover:shadow-md transition">
          <p className="text-sm text-gray-400">Total Liters</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{total_liters} L</h2>
        </div>

        {/* Total money earned across all time */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-yellow-400 hover:shadow-md transition">
          <p className="text-sm text-gray-400">Total Earnings</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">KES {total_amount}</h2>
        </div>

        {/* How many liters were collected today */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-indigo-400 hover:shadow-md transition">
          <p className="text-sm text-gray-400">Today's Collection</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{today_collection} L</h2>
        </div>

        {/* Total liters collected this month */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-teal-400 hover:shadow-md transition">
          <p className="text-sm text-gray-400">Monthly Liters</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{monthly_liters} L</h2>
        </div>

        {/* Total money earned this month */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-purple-400 hover:shadow-md transition">
          <p className="text-sm text-gray-400">Monthly Earnings</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">KES {monthly_earnings}</h2>
        </div>

      </div>
    </div>
  );
};

export default FarmerDashboard;