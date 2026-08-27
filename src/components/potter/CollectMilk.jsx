import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { data } from "react-router-dom";

const CollectMilk = () => {
    const [national_id, setNationalId] = useState("");
    const [liters, setLiters] = useState("");
    const [session, setSession] = useState("MORNING");
    const [dashboard, setDashboard] = useState(null);

    // hooks ui 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    
    const fetchDashboard = async () => {
        try {
            const { data } = await api.get("collector/dashboard/");
            setDashboard(data);
            console.log(data)
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(() => { 
        fetchDashboard(); 
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const data = {
            national_id: national_id,
            liters: Number(liters),
            session: session,
        };
        try {
            const res = await api.post("collector/milk-collections/add", data);
            console.log(res.data)
            if (res?.data?.error) {
                setLoading(true)
                setMessage("")
                setError(res?.data?.error)
                return
            }
            setMessage(`${res?.data?.message} for ${res?.data?.farmer}.`);
            setNationalId("");
            setLiters("");
            setSession("MORNING");
            fetchDashboard();
        } catch (err) {
            // console.log(err)
            setMessage(err.response?.data?.message);
        } finally {
            setLoading(false);
        }

    };

    return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 p-6">

        <div className="xl:col-span-3 card">
            <h2 className="text-3xl font-bold mb-6">Milk Collection</h2>
            {message && <div className="mt-5 p-3 rounded-lg bg-green-100 text-green-700">{message}</div>}
            {error && <div className="mt-5 p-3 rounded-lg bg-red-100 text-red-700">{error}</div>}


            <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                    <label className="form-label">Farmer Code</label>
                    <input type="text" className="milk-input" placeholder="Natinal Id" 
                        value={national_id} 
                        onChange={(e) => setNationalId(e.target.value)} 
                        required />
                </div>

                <div>
                    <label className="form-label">Liters</label>
                    <input type="number" className="milk-input" placeholder="55" 
                        value={liters} 
                        onChange={(e) => setLiters(e.target.value)} 
                        required />
                </div>

                <div>
                    <label className="form-label">Session</label>
                    <select className="milk-input" value={session} onChange={(e) => setSession(e.target.value)}>
                        <option value="MORNING">Morning</option>
                        <option value="EVENING">Evening</option>
                    </select>
                </div>

                <button type="submit" disabled={loading} className="milk-btn">
                    {loading ? "Saving..." : "Record Collection"}
                </button>

            </form>

        </div>

        <div className="space-y-6 xl:col-span-2">
            <div className="card">
                <h3 className="text-lg font-semibold mb-4">Today's Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div className="stat-card">
                        <p className="stat-label">Farmers</p>
                        <p className="stat-value">{dashboard?.assigned_farmers}</p>
                    </div>
                    <div className="stat-card">
                        <p className="stat-label">Collections</p>
                        <p className="stat-value">{dashboard?.total_collections_today}</p>
                    </div>
                    <div className="stat-card">
                        <p className="stat-label">Liters</p>
                        <p className="stat-value-success">{dashboard?.total_liters_today} L</p>
                    </div>
                    <div className="stat-card">
                        <p className="stat-label">Amount</p>
                        <p className="stat-value-success">KES {dashboard?.total_amount_today}</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <h3 className="text-lg font-semibold mb-3">Date</h3>
                <p>{dashboard?.date || "--"}</p>
            </div>
        </div>

    </div>

    );
};

export default CollectMilk;
