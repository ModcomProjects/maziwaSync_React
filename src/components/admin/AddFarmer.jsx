import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const AddFarmer = () => {
    const navigate = useNavigate();

    // ── All fields matching the User + FarmerProfile models ──
    // role is hardcoded to "farmer" — admin is always creating a farmer here
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        national_id: "",
        farm_name: "",
        username: "",
        email: "",
        password: "",
        role: "farmer",
    });

    const [loading, setLoading] = useState(false);

    // ── One handler for all inputs — spreads previous state and updates only the changed field ──
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("core/auth/register/", form);
            toast.success("Farmer added successfully");

            // Short delay so user sees the toast before navigating away
            setTimeout(() => navigate("/admin-dashboard/farmers"), 1000);

        } catch (err) {
            // Extract Django validation errors e.g. { username: ["already exists"] }
            const error = err.response?.data;
            toast.error(
                error ? Object.values(error).flat().join(" ") : "Failed to add farmer"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">

            {/* ── Header ── */}
            <div className="flex items-center gap-3 mb-4">
                <button
                    onClick={() => navigate("/admin-dashboard/farmers")}
                    className="text-gray-500 hover:text-gray-700 text-sm transition"
                >
                    ← Back
                </button>
                <h2 className="text-2xl font-bold">Add Farmer</h2>
            </div>

            <form onSubmit={handleSubmit} className="card">

                {/* ════════════════════════════════
                    PERSONAL INFORMATION
                    3 columns on laptop, 1 on mobile
                ════════════════════════════════ */}
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                    Personal Information
                </p>

                {/* Row 1 — name + phone */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div>
                        <label className="form-label">First Name</label>
                        <input
                            name="first_name"
                            className="milk-input"
                            placeholder="Emma"
                            value={form.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Last Name</label>
                        <input
                            name="last_name"
                            className="milk-input"
                            placeholder="Wanjiru"
                            value={form.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Phone</label>
                        <input
                            name="phone_number"
                            className="milk-input"
                            placeholder="0712345678"
                            value={form.phone_number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Row 2 — national ID + farm name (farmer-specific field) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="form-label">National ID</label>
                        <input
                            name="national_id"
                            className="milk-input"
                            placeholder="12345678"
                            value={form.national_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Farm Name</label>
                        <input
                            name="farm_name"
                            className="milk-input"
                            placeholder="Green Valley Farm"
                            value={form.farm_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <hr className="border-gray-100 mb-4" />

                {/* ════════════════════════════════
                    LOGIN CREDENTIALS
                    3 columns on laptop
                ════════════════════════════════ */}
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                    Login Credentials
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                    <div>
                        <label className="form-label">Username</label>
                        <input
                            name="username"
                            className="milk-input"
                            placeholder="emma.wanjiru"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="milk-input"
                            placeholder="emma@gmail.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="milk-input"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* ── Submit aligned right ── */}
                <div className="flex justify-end">
                    <button
                        disabled={loading}
                        className="milk-btn w-full sm:w-auto px-10"
                    >
                        {loading ? "Saving..." : "Add Farmer"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddFarmer;