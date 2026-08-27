import React, { useEffect, useState } from "react";
import api from "../../api/api";

const MyCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCollections = async () => {
        try {
            const { data } = await api.get("collector/collections/my");
            setCollections(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    const totalLiters = collections.reduce(
        (sum, item) => sum + Number(item.liters),
        0
    );

    const totalAmount = collections.reduce(
        (sum, item) => sum + Number(item.total_amount),
        0
    );

    return (
        <div className="space-y-6 p-6">

            <div>
                <h1 className="text-3xl font-bold">My Collections</h1>
                <p className="text-gray-500">View your milk collection history.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="stat-card">
                    <p className="stat-label">Collections</p>
                    <p className="stat-value">{collections.length}</p>
                </div>

                <div className="stat-card">
                    <p className="stat-label">Total Liters</p>
                    <p className="stat-value-success">{totalLiters} L</p>
                </div>

                <div className="stat-card">
                    <p className="stat-label">Total Earnings</p>
                    <p className="stat-value-success">KES {totalAmount}</p>
                </div>

            </div>

            <div className="card">

                <h2 className="text-xl font-semibold mb-4">
                    Collection Records
                </h2>

                {loading ? (
                    <p>Loading collections...</p>
                ) : collections.length === 0 ? (
                    <p className="text-gray-500">No collections found.</p>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full p-5">

                            <thead className="bg-gradient-to-r from-green-100 to-green-300 p-5">
                                <tr className="border-b text-left p-5">
                                    <th className="py-3 pl-3">Date</th>
                                    <th className="py-3">Session</th>
                                    <th className="py-3">Liters</th>
                                    <th className="py-3">Rate</th>
                                    <th className="py-3">Amount</th>
                                </tr>
                            </thead>

                            <tbody>

                                {collections.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-green-50 pl-3">

                                        <td className="py-3">
                                            {item.collection_date}
                                        </td>

                                        <td className="py-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.session === "MORNING"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-orange-100 text-orange-700"
                                                }`}>
                                                {item.session}
                                            </span>
                                        </td>

                                        <td className="py-3">
                                            {item.liters} 
                                        </td>

                                        <td className="py-3">
                                            KES {item.price_per_liter}
                                        </td>

                                        <td className="py-3 font-semibold text-green-600">
                                            KES {item.total_amount}
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </div>
    );
};

export default MyCollections;