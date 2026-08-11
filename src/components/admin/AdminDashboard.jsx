import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";

const AdminDashboard = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // ── Fetch dashboard data ───────────────────────────────
    const fetchDashboard = async () => {
        try {
            const { data } = await api.get("cooperative/dashboard");
            setData(data);
        } catch (err) {
            toast.error("Failed to load dashboard.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    // ── Format ISO date to readable string ─────────────────
    const formatDate = (iso) =>
        new Date(iso).toLocaleDateString("en-KE", {
            day: "numeric", month: "short", year: "numeric",
        });

    if (loading) return <p className="p-6 text-gray-500">Loading dashboard...</p>;
    if (!data)   return <p className="p-6 text-red-500">Failed to load data.</p>;

    return (
        <div className="p-4 max-w-6xl mx-auto space-y-6">

            <h2 className="text-2xl font-bold">Dashboard</h2>

            {/* ════════════════════════════════
                ROW 1 — PEOPLE STATS
                Farmers and Porters count
            ════════════════════════════════ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                <div className="card text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Farmers</p>
                    <p className="text-3xl font-bold text-teal-600">{data.farmers}</p>
                </div>

                <div className="card text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Porters</p>
                    <p className="text-3xl font-bold text-teal-600">{data.porters}</p>
                </div>

                <div className="card text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Pending Feedback</p>
                    <p className="text-3xl font-bold text-red-500">{data.pending_feedback}</p>
                </div>

                <div className="card text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Resolved Feedback</p>
                    <p className="text-3xl font-bold text-green-600">{data.resolved_feedback}</p>
                </div>

            </div>

            {/* ════════════════════════════════
                ROW 2 — LITERS BREAKDOWN
                Today / Weekly / Monthly / Total
            ════════════════════════════════ */}
            <div>
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                    Milk Collection (Liters)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                    <div className="card text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Today</p>
                        <p className="text-2xl font-bold text-gray-700">{data.today_liters} L</p>
                    </div>

                    <div className="card text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">This Week</p>
                        <p className="text-2xl font-bold text-gray-700">{data.weekly_liters} L</p>
                    </div>

                    <div className="card text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">This Month</p>
                        <p className="text-2xl font-bold text-gray-700">{data.monthly_liters} L</p>
                    </div>

                    <div className="card text-center border-l-4 border-teal-500">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total</p>
                        <p className="text-2xl font-bold text-teal-600">{data.total_liters} L</p>
                    </div>

                </div>
            </div>

            {/* ════════════════════════════════
                ROW 3 — REVENUE BREAKDOWN
                Today / Weekly / Monthly / Total
            ════════════════════════════════ */}
            <div>
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                    Revenue (KES)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                    <div className="card text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Today</p>
                        <p className="text-2xl font-bold text-gray-700">
                            KES {data.today_revenue.toLocaleString()}
                        </p>
                    </div>

                    <div className="card text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">This Week</p>
                        <p className="text-2xl font-bold text-gray-700">
                            KES {data.weekly_revenue.toLocaleString()}
                        </p>
                    </div>

                    <div className="card text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">This Month</p>
                        <p className="text-2xl font-bold text-gray-700">
                            KES {data.monthly_revenue.toLocaleString()}
                        </p>
                    </div>

                    <div className="card text-center border-l-4 border-green-500">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total</p>
                        <p className="text-2xl font-bold text-green-600">
                            KES {data.total_revenue.toLocaleString()}
                        </p>
                    </div>

                </div>
            </div>

            {/* ════════════════════════════════
                ROW 4 — BOTTOM TWO PANELS
                Top Farmers | Recent Collections
                Side by side on laptop
            ════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* ── Top Farmers ── */}
                <div className="card">
                    <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-4">
                        Top Farmers
                    </p>

                    {data.top_farmers.length === 0 && (
                        <p className="text-gray-400 text-sm">No farmer data yet.</p>
                    )}

                    <div className="space-y-3">
                        {data.top_farmers.map((farmer) => (
                            <div key={farmer.id} className="flex items-center gap-3">

                                {/* Avatar with first letter */}
                                <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {farmer.first_name.charAt(0).toUpperCase()}
                                </div>

                                <div className="flex-1">
                                    <p className="font-semibold text-sm">
                                        {farmer.first_name} {farmer.last_name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {farmer.farm_name} · {farmer.membership_number}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-gray-400">Joined</p>
                                    <p className="text-xs font-medium">{formatDate(farmer.created_at)}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Recent Collections ── */}
                <div className="card">
                    <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-4">
                        Recent Collections
                    </p>

                    {data.recent_collections.length === 0 && (
                        <p className="text-gray-400 text-sm">No recent collections.</p>
                    )}

                    <div className="space-y-3">
                        {data.recent_collections.map((c) => (
                            <div key={c.id} className="flex items-center gap-3">

                                {/* Session icon indicator */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                    c.session === "MORNING"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-blue-100 text-blue-700"
                                }`}>
                                    {c.session === "MORNING" ? "AM" : "PM"}
                                </div>

                                <div className="flex-1">
                                    <p className="font-semibold text-sm">{c.porter_name}</p>
                                    <p className="text-xs text-gray-400">{c.collection_date}</p>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-bold text-green-600">{c.liters} L</p>
                                    <p className="text-xs text-gray-400">
                                        KES {parseFloat(c.total_amount).toLocaleString()}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;