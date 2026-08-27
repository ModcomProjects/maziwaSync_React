import React, { useEffect, useState } from "react";
import api from "../../api/api";

const MyProfile = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("core/auth/me/");
                setData(res.data);
            } catch (err) {
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div className="p-6 text-gray-500">Loading profile...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    const { username, role, profile } = data || {};

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* GRID LAYOUT (FIXES EMPTY SPACE ISSUE) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT PROFILE CARD */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold">
                            {username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{username}</h2>

                            <p className="text-sm text-green-600 font-medium capitalize">{role}</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm">
                        <p><span className="text-gray-500">First Name:</span> {profile?.first_name}</p>
                        <p><span className="text-gray-500">Last Name:</span> {profile?.last_name}</p>
                        <p><span className="text-gray-500">Employee ID:</span> {profile?.employee_id || "-"}</p>
                        <p><span className="text-gray-500">Route:</span> {profile?.route_name || "-"}</p>
                    </div>
                </div>

                {/* RIGHT SIDE - STATS / EXTRA INFO */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-gray-500 text-sm mb-2">Account Status</h3>
                        <p className="text-green-600 font-bold text-lg">Active</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-gray-500 text-sm mb-2">Role</h3>
                        <p className="text-gray-800 font-bold text-lg capitalize">
                            {role}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-gray-500 text-sm mb-2">System ID</h3>
                        <p className="text-gray-800 font-bold text-lg">
                            #{data?.id}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-gray-500 text-sm mb-2">Username</h3>
                        <p className="text-gray-800 font-bold text-lg">
                            {username}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default MyProfile;