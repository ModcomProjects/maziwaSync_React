import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const ListFarmers = () => {

    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchFarmers = async () => {
        try {
            const { data } = await api.get("cooperative/farmers");
            setFarmers(data);
        } catch {
            toast.error("Failed to load farmers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFarmers();
    }, []);

    const handleDelete = async (id, name) => {

        if (!window.confirm(`Delete ${name}?`)) return;

        try {
            await api.delete(`cooperative/farmers/${id}/`);
            toast.success("Farmer deleted");
            fetchFarmers();
        } catch {
            toast.error("Delete failed");
        }

    };



    return (
        <div className="p-4">

            <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">

                <h2 className="text-2xl font-bold">Farmers</h2>

                <button
                    onClick={() => navigate("/admin-dashboard/farmers/add")}
                    className="milk-btn">
                    + Add Farmer
                </button>

            </div>

            {loading && <p>Loading...</p>}
            {!loading && !farmers?.length && <p>No farmers found</p>}

            {farmers?.length > 0 && (

                <div>

                    {/* Desktop */}

                    <div className="hidden md:block card overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead className="border-b text-gray-500">

                                <tr>
                                    <th className="p-3">Farmer</th>
                                    <th className="p-3">Contact</th>
                                    <th className="p-3">Farm</th>
                                    <th className="p-3">Production</th>
                                    <th className="p-3">Membership</th>
                                    <th className="p-3">Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {farmers.map(f => (

                                    <tr key={f.id} className="border-b">

                                        <td className="p-3">
                                            <b>{f.first_name} {f.last_name}</b>
                                            <br />
                                            {f.membership_number}
                                        </td>

                                        <td className="p-3">
                                            {f.phone_number}
                                            <br />
                                            ID: {f.national_id}
                                        </td>

                                        <td className="p-3">
                                            {f.farm_name}
                                            <br />
                                            Cows: {f.number_of_cows}
                                        </td>

                                        <td className="p-3">
                                            {f.total_milk_delivered} L
                                            <br />
                                            KES {f.total_earnings}
                                        </td>

                                        <td className="p-3">
                                            {f.join_date}
                                        </td>

                                        <td className="p-3">

                                            <button
                                                onClick={() => navigate(`/admin-dashboard/farmers/edit/${f.id}`)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded">
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(f.id, f.first_name)}
                                                className="bg-red-500 text-white px-3 py-1 rounded ml-2">
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                    {/* Mobile cards */}

                    <div className="md:hidden space-y-3">

                        {farmers.map(f => (

                            <div key={f.id} className="card p-4">

                                <div className="flex justify-between">

                                    <div>
                                        <h3 className="font-bold">
                                            {f.first_name} {f.last_name}
                                        </h3>
                                        <small>{f.membership_number}</small>
                                    </div>

                                    <i className="bi bi-person-fill text-green-600"></i>

                                </div>

                                <div className="mt-3 text-sm space-y-1">

                                    <p>
                                        <i className="bi bi-telephone-fill text-blue-500"></i>{" "}
                                        {f.phone_number}
                                    </p>

                                    <p>
                                        <i className="bi bi-person-vcard-fill text-blue-500"></i>{" "}
                                        {f.national_id}
                                    </p>

                                    <p>
                                        <i className="bi bi-house-fill text-blue-500"></i>{" "}
                                        {f.farm_name}
                                    </p>

                                    <p>
                                        <i className="bi bi-emoji-smile-fill text-blue-500"></i>{" "}
                                        Cows: {f.number_of_cows}
                                    </p>

                                    <p>
                                        <i className="bi bi-droplet-fill text-blue-500"></i>{" "}
                                        {f.total_milk_delivered} L
                                    </p>

                                    <p>
                                        <i className="bi bi-cash-stack text-blue-500"></i>{" "}
                                        KES {f.total_earnings}
                                    </p>

                                    <p>
                                        <i className="bi bi-calendar-event-fill text-blue-500"></i>{" "}
                                        {f.join_date}
                                    </p>

                                </div>

                                <div className="mt-3">

                                    <button
                                        onClick={() => navigate(`/admin-dashboard/farmers/edit/${f.id}`)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded">
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(f.id, f.first_name)}
                                        className="bg-red-500 text-white px-3 py-1 rounded ml-2">
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            )}

        </div>
    );

};

export default ListFarmers;

