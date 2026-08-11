import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";

const NoticesAdmin = () => {

    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    // ── Form state matching the API payload ──
    const [form, setForm] = useState({
        title: "",
        message: "",
        target: "ALL",       // default to ALL users
        is_important: false, // checkbox — false by default
    });

    const [submitting, setSubmitting] = useState(false);

    // ── Fetch all notices ──────────────────────────────────
    const fetchNotices = async () => {
        try {
            const { data } = await api.get("cooperative/notice/");
            // API returns paginated response — results holds the array
            setNotices(data);
        } catch (err) {
            toast.error("Failed to load notices.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    // ── One handler for all inputs including checkbox ──────
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // checkbox uses "checked", everything else uses "value"
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    // ── Submit new notice ──────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await api.post("cooperative/notice/", form);
            toast.success("Notice posted successfully.");

            // ── Reset form after success ──
            setForm({ title: "", message: "", target: "ALL", is_important: false });

            fetchNotices(); // refresh list to show the new notice

        } catch (err) {
            const error = err.response?.data;
            toast.error(
                error ? Object.values(error).flat().join(" ") : "Failed to post notice."
            );
        } finally {
            setSubmitting(false);
        }
    };

    // ── Delete a notice ────────────────────────────────────
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Delete this notice?");
        if (!confirmed) return;

        try {
            await api.delete(`cooperative/notice/${id}/`);
            toast.success("Notice deleted.");
            fetchNotices();
        } catch (err) {
            console.log(err)
            toast.error("Failed to delete notice.", err);
        }
    };

    // ── Target badge color ─────────────────────────────────
    // ALL = gray, FARMERS = green, PORTERS = blue
    const targetBadge = (target) => {
        const styles = {
            ALL:     "bg-gray-100 text-gray-600",
            FARMERS: "bg-green-100 text-green-700",
            PORTERS: "bg-blue-100 text-blue-700",
        };
        return styles[target] || "bg-gray-100 text-gray-600";
    };

    // ── Format ISO date to readable string ─────────────────
    const formatDate = (iso) =>
        new Date(iso).toLocaleDateString("en-KE", {
            day: "numeric", month: "short", year: "numeric",
        });

    return (
        <div className="p-4 max-w-5xl mx-auto">

            <h2 className="text-2xl font-bold mb-6">Notices</h2>

            

            {/* ════════════════════════════════
                POST NOTICE FORM
                Sits at the top — admin writes
                and posts directly from this page
            ════════════════════════════════ */}
            <form onSubmit={handleSubmit} className="card mb-6">

                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-4">
                    Post a New Notice
                </p>

                {/* Title */}
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        name="title"
                        className="milk-input"
                        placeholder="e.g. System Maintenance"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Message */}
                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                        name="message"
                        className="milk-input resize-none"
                        rows={3}
                        placeholder="Write your notice here..."
                        value={form.message}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Target + Is Important in one row */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">

                    {/* Target audience dropdown */}
                    <div className="flex-1">
                        <label className="form-label">Target Audience</label>
                        <select
                            name="target"
                            className="milk-input"
                            value={form.target}
                            onChange={handleChange}
                        >
                            <option value="ALL">All Users</option>
                            <option value="FARMERS">Farmers Only</option>
                            <option value="PORTERS">Porters Only</option>
                        </select>
                    </div>

                    {/* Is Important checkbox — aligned to bottom of the row */}
                    <div className="flex items-end pb-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="is_important"
                                checked={form.is_important}
                                onChange={handleChange}
                                className="w-4 h-4 accent-teal-600"
                            />
                            <span className="form-label mb-0">Mark as Important</span>
                        </label>
                    </div>

                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="milk-btn w-full sm:w-auto px-10"
                    >
                        {submitting ? "Posting..." : "Post Notice"}
                    </button>
                </div>

            </form>

            {/* ════════════════════════════════
                NOTICES LIST
                Shows all posted notices below the form
            ════════════════════════════════ */}
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                Posted Notices ({notices.length})
            </p>

            {loading && <p className="text-gray-500">Loading notices...</p>}

            {!loading && notices.length === 0 && (
                <p className="text-gray-500">No notices posted yet.</p>
            )}

            {/* Each notice is a card */}
            <div className="space-y-3">
                {notices.map((notice) => (
                    <div
                        key={notice.id}
                        className={`card flex flex-col sm:flex-row sm:items-start gap-4 ${
                            // highlight important notices with a left border
                            notice.is_important ? "border-l-4 border-red-400" : ""
                        }`}
                    >
                        {/* Notice content */}
                        <div className="flex-1">

                            {/* Title + badges row */}
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-800">{notice.title}</h3>

                                {/* Target badge */}
                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${targetBadge(notice.target)}`}>
                                    {notice.target}
                                </span>

                                {/* Important badge — only shown when is_important is true */}
                                {notice.is_important && (
                                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                                        Important
                                    </span>
                                )}
                            </div>

                            {/* Message */}
                            <p className="text-sm text-gray-600 mb-2">{notice.message}</p>

                            {/* Date */}
                            <p className="text-xs text-gray-400">{formatDate(notice.created_at)}</p>

                        </div>

                        {/* Delete button */}
                        <button
                            onClick={() => handleDelete(notice.id)}
                            className="px-3 py-1 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 text-xs transition self-start"
                        >
                            Delete
                        </button>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default NoticesAdmin;