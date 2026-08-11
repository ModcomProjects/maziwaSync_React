import React, { useEffect, useState } from "react";
import api from "../../api/api";

const PorterDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch dashboard data when component mounts
    const fetchDashboard = async () => {
        try {
            const res = await api.get("collector/dashboard/");
            setDashboard(res.data);
        } catch (err) {
            setError("Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    // console.log(dashboard)
    if (loading) return <p className="p-6 text-gray-400">Loading dashboard...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    // destructuring
    const {
        assigned_farmers,
        total_collections_today,
        total_liters_today,
        total_amount_today,
        total_liters_week,
        total_liters_month,
        last_collections,
        porter_name,
        employee_id,
        route_name,
    } = dashboard;

    return (
        <div className="p-4 md:p-6 space-y-5 bg-gray-50 min-h-screen">

            {/* ── HEADER ── */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">Porter Dashboard</h1>
                <p className="text-gray-400 text-sm mt-1">
                    Welcome back, <span className="font-semibold text-gray-600">{porter_name}</span> 🚛
                </p>
            </div>

            {/* ── KPI CARDS ── each card has a colored top border to distinguish metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-green-400 hover:shadow-md transition">
                    <p className="text-sm text-gray-400">Assigned Farmers</p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-1">{assigned_farmers}</h2>
                    <i className="bi bi-people-fill text-green-400 text-2xl float-right -mt-8"></i>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-blue-400 hover:shadow-md transition">
                    <p className="text-sm text-gray-400">Collections Today</p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-1">{total_collections_today}</h2>
                    <i className="bi bi-journal-check text-blue-400 text-2xl float-right -mt-8"></i>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-indigo-400 hover:shadow-md transition">
                    <p className="text-sm text-gray-400">Liters Today</p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-1">{total_liters_today} L</h2>
                    <i className="bi bi-droplet-fill text-indigo-400 text-2xl float-right -mt-8"></i>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-yellow-400 hover:shadow-md transition">
                    <p className="text-sm text-gray-400">Amount Today</p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-1">KES {total_amount_today}</h2>
                    <i className="bi bi-cash-stack text-yellow-400 text-2xl float-right -mt-8"></i>
                </div>

            </div>

            {/* ── WEEKLY / MONTHLY ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
                    <p className="text-sm text-gray-400">Weekly Production</p>
                    <h2 className="text-xl font-bold text-green-600 mt-1">{total_liters_week} L</h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
                    <p className="text-sm text-gray-400">Monthly Production</p>
                    <h2 className="text-xl font-bold text-blue-600 mt-1">{total_liters_month} L</h2>
                </div>

            </div>

            {/* ── LAST 5 COLLECTIONS ── */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-700">Last 5 Collections</h3>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
                            <tr>
                                <th className="p-3 text-left">Farmer</th>
                                <th className="p-3 text-left">Liters</th>
                                <th className="p-3 text-left">Session</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {last_collections.map((c) => (
                                <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 capitalize">{c.farmer_name}</td>
                                    <td className="p-3">{c.liters} L</td>
                                    <td className="p-3">{c.session}</td>
                                    <td className="p-3 text-gray-400">{c.collection_date}</td>
                                    <td className="p-3 font-semibold text-green-600">KES {c.total_amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-2 p-3">
                    {last_collections.map((c) => (
                        <div key={c.id} className="bg-gray-50 rounded-lg p-3">
                            <p className="font-semibold text-gray-700 capitalize">{c.farmer_name}</p>
                            <p className="text-sm text-gray-500">{c.liters} L • {c.session}</p>
                            <p className="text-xs text-gray-400">{c.collection_date}</p>
                            <p className="text-green-600 font-semibold text-sm">KES {c.total_amount}</p>
                        </div>
                    ))}
                </div>

            </div>

            {/* ── PORTER INFO ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Employee</p>
                    <p className="font-semibold text-gray-700 mt-1">{porter_name}</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Employee ID</p>
                    <p className="font-semibold text-gray-700 mt-1">{employee_id}</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Route</p>
                    <p className="font-semibold text-gray-700 mt-1">{route_name}</p>
                </div>

            </div>

        </div>
    );
};

export default PorterDashboard;