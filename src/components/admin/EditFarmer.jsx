import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const EditFarmer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        national_id: "",
        farmer_code: "",
        village: "",
        farm_name: "",
        number_of_cows: 0,
        farm_name: "",
        farm_size_acres:"",
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchFarmer = async () => {
        try {
            const { data } = await api.get(`cooperative/farmers/${id}/`);
            console.log(data)
            setForm({
                first_name: data.first_name || "",
                last_name: data.last_name || "",
                phone_number: data.phone_number || "",
                national_id: data.national_id || "",
                membership_number: data.membership_number || "",
                village: data.village || "",
                farm_name: data.farm_name,
                farm_size_acres:data.farm_size_acres,
                number_of_cows: data.number_of_cows,
            });
        } catch (err) {
            toast.error("Failed to load farmer details.");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchFarmer();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.patch(`cooperative/farmers/${id}/`, form);
            toast.success("Farmer updated successfully!");

            setTimeout(() => {
                navigate("/admin-dashboard/farmers");
            }, 1500);
        } catch (err) {
            const errors = err.response?.data;
            const firstError = errors
                ? Object.values(errors)
                    .flat()
                    .join(" ")
                : "Failed to update farmer.";

            toast.error(firstError);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <p className="p-6 text-gray-500"> Loading farmer... </p>
        );
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">

            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() =>
                        navigate(
                            "/admin-dashboard/farmers"
                        )
                    }
                    className="text-gray-500 hover:text-gray-700 text-sm"
                >
                    ← Back
                </button>

                <h2 className="text-3xl font-bold">
                    Edit Farmer
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="card space-y-5" >

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>
                        <label className="form-label">First Name</label>
                        <input name="first_name" className="milk-input" value={form.first_name} onChange={handleChange} />
                    </div>

                    <div>
                        <label className="form-label">Last Name</label>
                        <input name="last_name" className="milk-input" value={form.last_name} onChange={handleChange} />
                    </div>

                    <div>
                        <label className="form-label">Phone Number</label>
                        <input name="phone_number" className="milk-input" value={form.phone_number} onChange={handleChange} />
                    </div>

                    <div>
                        <label className="form-label">National ID</label>
                        <input name="national_id" className="milk-input" value={form.national_id} onChange={handleChange} />
                    </div>

                    <div>
                        <label className="form-label">Farmer Membership No</label>
                        <input name="membership_number" className="milk-input" value={form.membership_number} onChange={handleChange} />
                    </div>

                    <div>
                        <label className="form-label">Farm Size</label>
                        <input name="farm_size_acres" className="milk-input" value={form.farm_size_acres} onChange={handleChange} />
                    </div>

                    <div>
                        <label className="form-label">Farm Name</label>
                        <input name="farm_name"  className="milk-input" value={form.farm_name}  onChange={handleChange}  />
                    </div>

                    <div>
                        <label className="form-label">Number of Cows</label>
                        <input type="number" name="number_of_cows" className="milk-input" value={form.number_of_cows}  onChange={handleChange} />
                    </div>

                    <button type="submit" disabled={loading} className="milk-btn w-full">
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default EditFarmer;