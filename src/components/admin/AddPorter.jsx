import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const AddPorter = () => {
    const navigate = useNavigate();

    // ── All fields matching the User + PorterProfile models ──
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        national_id: "",
        employee_id: "",
        route_name: "",
        username: "",
        email: "",
        password: "",
        role: "porter", // hardcoded — admin is always creating a porter here
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
            toast.success("Porter added successfully");
            setTimeout(() => navigate("/admin-dashboard/porters"), 1000);

        } catch (err) {
            // Extract Django validation errors (e.g. { username: ["already exists"] })
            const error = err.response?.data;
            toast.error(
                error ? Object.values(error).flat().join(" ") : "Failed to add porter"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        // ── Wider max-w on laptop, centered, compact padding ──
        <div className="p-4 max-w-4xl mx-auto">

            {/* ── Header ── */}
            <div className="flex items-center gap-3 mb-4">
                <button
                    onClick={() => navigate("/admin-dashboard/porters")}
                    className="text-gray-500 hover:text-gray-700 text-sm transition"
                >
                    ← Back
                </button>
                <h2 className="text-2xl font-bold">Add Porter</h2>
            </div>

            <form onSubmit={handleSubmit} className="card">

                {/* ════════════════════════════════
                    PERSONAL INFORMATION
                    3-column grid on laptop, 2 on tablet, 1 on mobile
                ════════════════════════════════ */}
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                    Personal Information
                </p>

                {/* Personal Info — now just 3 fields in one row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div>
                        <label className="form-label">First Name</label>
                        <input name="first_name" className="milk-input" placeholder="John"
                            value={form.first_name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="form-label">Last Name</label>
                        <input name="last_name" className="milk-input" placeholder="Doe"
                            value={form.last_name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="form-label">Phone</label>
                        <input name="phone_number" className="milk-input" placeholder="0712345678"
                            value={form.phone_number} onChange={handleChange} required />
                    </div>
                </div>

                {/* Work Info — National ID joins Employee ID and Route */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div>
                        <label className="form-label">National ID</label>
                        <input name="national_id" className="milk-input" placeholder="12345678"
                            value={form.national_id} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="form-label">Employee ID</label>
                        <input name="employee_id" className="milk-input" placeholder="EMP001"
                            value={form.employee_id} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="form-label">Route</label>
                        <input name="route_name" className="milk-input" placeholder="Route A"
                            value={form.route_name} onChange={handleChange} required />
                    </div>
                </div>
                {/* ════════════════════════════════
                    LOGIN CREDENTIALS
                    All 3 in one row on laptop
                ════════════════════════════════ */}
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                    Login Credentials
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
                    <div>
                        <label className="form-label">Username</label>
                        <input
                            name="username"
                            className="milk-input"
                            placeholder="john.doe"
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
                            placeholder="john@gmail.com"
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

                {/* ── Submit — not full width on laptop, aligned right ── */}
                <div className="flex justify-end">
                    <button
                        disabled={loading}
                        className="milk-btn w-full sm:w-auto px-10"
                    >
                        {loading ? "Saving..." : "Add Porter"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddPorter;