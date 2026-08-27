import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const ListPorters = () => {
    const [porters, setPorters] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchPorters = async () => {
        try {
            const {data}  = await api.get("cooperative/porters");
            console.log(data)
            setPorters(data);
        } catch {
            toast.error("Failed to load porters");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPorters();
    }, []);

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete ${name}?`)) return;

        try {
            await api.delete(`cooperative/porters/${id}/`);
            toast.success("Porter deleted");
            fetchPorters();
        } catch {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">
                <h2 className="text-2xl font-bold">Porters</h2>
                <button
                    onClick={() => navigate("/admin-dashboard/porters/add")}
                    className="milk-btn">
                    + Add Porter
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {!loading && !porters?.length && <p>No porters found</p>}
            
            {porters?.length > 0 && (
                <div>
                    {/* Desktop */}
                    <div className="hidden md:block card overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b text-gray-500">
                                <tr>
                                    <th className="p-3">Employee</th>
                                    <th className="p-3">Contact</th>
                                    <th className="p-3">Route</th>
                                    <th className="p-3">Performance</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {porters.map(p => (
                                    <tr key={p.id} className="border-b">
                                        <td className="p-3">
                                            <b>{p.first_name} {p.last_name}</b>
                                            <br />{p.employee_id}
                                        </td>
                                        <td className="p-3">
                                            {p.phone_number}
                                            <br />ID: {p.national_id}
                                        </td>
                                        <td className="p-3">
                                            {p.route_name}
                                            <br />Farmers: {p.assigned_farmers?.length ?? 0}
                                        </td>
                                        <td className="p-3">
                                            Collections: {p.total_collections ?? 0}
                                            <br />{p.total_liters_collected ?? 0} L
                                        </td>
                                        <td className="p-3">
                                            <span className={p.is_active
                                                ? "bg-green-100 text-green-700 px-2 py-1 rounded"
                                                : "bg-red-100 text-red-700 px-2 py-1 rounded"}>
                                                {p.is_active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => navigate(`/admin-dashboard/porters/edit/${p.id}`)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id, p.first_name)}
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
                        {porters.map(p => (
                            <div key={p.id} className="card p-4">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-bold">{p.first_name} {p.last_name}</h3>
                                        <small>{p.employee_id}</small>
                                    </div>
                                    <i className={p.is_active
                                        ? "bi bi-check-circle-fill text-green-600"
                                        : "bi bi-x-circle-fill text-red-600"}></i>
                                </div>
                                <div className="mt-3 text-sm space-y-1">
                                    <p><i className="bi bi-telephone-fill text-blue-500"></i> {p.phone_number}</p>
                                    <p><i className="bi bi-person-vcard-fill text-blue-500"></i> {p.national_id}</p>
                                    <p><i className="bi bi-truck text-blue-500"></i> {p.route_name}</p>
                                    <p><i className="bi bi-people-fill text-blue-500"></i> Farmers: {p.assigned_farmers?.length ?? 0}</p>
                                    <p><i className="bi bi-droplet-fill text-blue-500"></i> {p.total_liters_collected ?? 0} L</p>
                                    <p><i className="bi bi-calendar-event-fill text-blue-500"></i> {p.hire_date}</p>
                                </div>
                                <div className="mt-3">
                                    <button
                                        onClick={() => navigate(`/admin-dashboard/porters/edit/${p.id}`)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id, p.first_name)}
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

export default ListPorters;