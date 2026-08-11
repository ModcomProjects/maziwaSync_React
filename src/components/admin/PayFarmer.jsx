import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const PayFarmer = () => {
    const navigate = useNavigate();

    // ── useLocation gives us access to the state passed from FarmerBalances ──
    // state.farmer contains the full farmer object we passed via navigate()
    const { state } = useLocation();
    const farmer = state?.farmer;
    console.log(farmer)

    // ── Amount field — pre-filled with full balance, admin can edit ──
    const [amount, setAmount] = useState(farmer?.balance || "");
    const [paying, setPaying] = useState(false);

    // ── Guard: if someone navigates here directly without farmer data, send them back ──
    if (!farmer) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-500 mb-4">No farmer selected.</p>
                <button
                    onClick={() => navigate("/admin-dashboard/farmers/balance")}
                    className="milk-btn"
                >
                    ← Back to Balances
                </button>
            </div>
        );
    }

    // ── Submit payment ─────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ── Client-side validation before hitting the API ──
        if (!amount || parseFloat(amount) <= 0) {
            toast.error("Enter a valid amount.");
            return;
        }
        if (parseFloat(amount) > farmer.balance) {
            toast.error(`Amount cannot exceed balance of KES ${farmer.balance.toLocaleString()}.`);
            return;
        }

        setPaying(true);

        try {
            const { data } = await api.post("cooperative/payfarmer/", {
                farmer_id: farmer.farmer_id,
                amount: parseFloat(amount),
            });

            // ── Show M-Pesa response description from the API ──
            toast.success(
                `Payment to ${data.farmer} initiated — ${data.mpesa_response?.ResponseDescription}`
            );

            // ── Navigate back to balances after success ──
            setTimeout(() => navigate("/admin-dashboard/balances"), 5500);

        } catch (err) {
            const error = err.response?.data;
            toast.error(
                error ? Object.values(error).flat().join(" ") : "Payment failed."
            );
        } finally {
            setPaying(false);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">

            {/* ── Header ── */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => navigate("/admin-dashboard/farmers/balance")}
                    className="text-gray-500 hover:text-gray-700 text-sm transition"
                >
                    ← Back
                </button>
                <h2 className="text-2xl font-bold">Pay Farmer</h2>
            </div>

            {/* ════════════════════════════════
                FARMER SUMMARY CARD
                Shows who we are paying and their current balance
            ════════════════════════════════ */}
            <div className="card mb-5">
                <p className="text-xs text-teal-600 uppercase tracking-widest font-semibold mb-3">
                    Farmer Summary
                </p>

                <div className="flex items-center gap-4 mb-4">
                    {/* Avatar circle with first letter of farmer name */}
                    <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-bold">
                        {farmer.farmer.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-lg">{farmer.farmer}</p>
                        <p className="text-sm text-gray-500">{farmer.phone || "No phone on record"}</p>
                    </div>
                </div>

                {/* 3 stat boxes: earned / paid / balance */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-400 mb-1">Earned</p>
                        <p className="font-bold text-green-600 text-sm">
                            KES {farmer.earned.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-400 mb-1">Paid</p>
                        <p className="font-bold text-blue-600 text-sm">
                            KES {farmer.paid.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-400 mb-1">Balance</p>
                        <p className="font-bold text-red-500 text-sm">
                            KES {farmer.balance.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════
                PAYMENT FORM
            ════════════════════════════════ */}
            <form onSubmit={handleSubmit} className="card">
                <p className="text-xs text-teal-600 uppercase tracking-widest font-semibold mb-4">
                    M-Pesa Payment
                </p>

                {/* Amount input — pre-filled with balance */}
                <div className="mb-5">
                    <label className="form-label">Amount (KES)</label>
                    <input
                        type="number"
                        className="milk-input"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        max={farmer.balance}
                        min={1}
                        required
                    />
                    {/* Helper text so admin knows the max */}
                    <p className="text-xs text-gray-400 mt-1">
                        Maximum payable: KES {farmer.balance.toLocaleString()}
                    </p>
                </div>

                {/* M-Pesa info note */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-5">
                    <p className="text-xs text-green-700">
                        <span className="font-semibold">Note:</span> Payment will be sent via M-Pesa B2C.
                        The farmer will receive an SMS confirmation once processed.
                    </p>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={paying}
                    className="milk-btn w-full"
                >
                    {paying ? "Processing..." : `Send KES ${parseFloat(amount || 0).toLocaleString()} via M-Pesa`}
                </button>

            </form>
        </div>
    );
};

export default PayFarmer;