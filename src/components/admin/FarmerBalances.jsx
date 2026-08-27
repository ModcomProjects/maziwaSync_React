import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const FarmerBalances = () => {
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ── Fetch all farmer balances ──────────────────────────
    const fetchBalances = async () => {
        try {
            const { data } = await api.get("cooperative/farmer/balance/");
            setFarmers(data);
        } catch (err) {
            toast.error("Failed to load farmer balances.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBalances();
    }, []);

    // ── Navigate to PayFarmer page passing farmer data via state ──
    // React Router "state" lets us send data without putting it in the URL
    const handlePay = (farmer) => {
        navigate("/admin-dashboard/balances/pay-farmer", {
            state: { farmer } // farmer object is available on the next page via useLocation
        });
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">

            <h2 className="text-2xl font-bold mb-6">Farmer Balances</h2>

            {loading && <p className="text-gray-500">Loading balances...</p>}

            {!loading && farmers.length === 0 && (
                <p className="text-gray-500">No farmer balance data found.</p>
            )}

            {!loading && farmers.length > 0 && (
                <div className="card overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="py-3 px-4">Farmer</th>
                                <th className="py-3 px-4">Phone</th>
                                <th className="py-3 px-4">Earned</th>
                                <th className="py-3 px-4">Paid</th>
                                <th className="py-3 px-4">Balance</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {farmers.map((f) => (
                                <tr key={f.farmer_id} className="border-b hover:bg-gray-50 transition">

                                    <td className="py-3 px-4 font-medium">{f.farmer}</td>
                                    <td className="py-3 px-4 text-gray-500">{f.phone || "—"}</td>

                                    <td className="py-3 px-4 text-green-700 font-medium">
                                        KES {f.earned.toLocaleString()}
                                    </td>

                                    <td className="py-3 px-4 text-blue-600 font-medium">
                                        KES {f.paid.toLocaleString()}
                                    </td>

                                    {/* Balance — red if outstanding, green if cleared */}
                                    <td className="py-3 px-4 font-bold">
                                        <span className={f.balance > 0 ? "text-red-500" : "text-green-600"}>
                                            KES {f.balance.toLocaleString()}
                                        </span>
                                    </td>

                                    {/* Pay button — disabled if balance is 0 */}
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => handlePay(f)}
                                            disabled={f.balance <= 0}
                                            className={`px-3 py-1 rounded-lg text-white text-xs transition ${
                                                f.balance > 0
                                                    ? "bg-teal-600 hover:bg-teal-700"
                                                    : "bg-gray-300 cursor-not-allowed"
                                            }`}
                                        >
                                            {f.balance > 0 ? "Pay" : "Cleared"}
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default FarmerBalances;