import React, { useState } from "react";
import api from "../../api/api";
import ReactMarkdown from "react-markdown";

const CattleAi = () => {
    const [form, setForm] = useState({
        Animal: "cow",
        Temperature: "",
        Age: "",
        Description: "",
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);

        const payload={
                ...form,
                Temperature: Number(form.Temperature),
                Age: Number(form.Age),
            }

        try {
            const { data } = await api.post("farmer/predict/", payload);
            console.log(first)

            setResult(data);
        } catch (err) {
            setError("Prediction failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid xl:grid-cols-5 gap-6 p-6">

            <div className="xl:col-span-2 card">
                <h2 className="text-2xl font-bold mb-4">Cattle AI</h2>

                {error && <div className="bg-red-100 text-red-600 p-2 rounded mb-3">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <select
                        name="Animal"
                        value={form.Animal}
                        onChange={handleChange}
                        className="milk-input"
                    >
                        <option value="cow">Cow</option>
                        <option value="goat">Goat</option>
                        <option value="sheep">Sheep</option>
                    </select>

                    <input
                        name="Temperature"
                        type="number"
                        placeholder="Temperature"
                        value={form.Temperature}
                        onChange={handleChange}
                        className="milk-input"
                        required
                    />

                    <input
                        name="Age"
                        type="number"
                        placeholder="Age (Months)"
                        value={form.Age}
                        onChange={handleChange}
                        className="milk-input"
                        required
                    />

                    <textarea
                        name="Description"
                        rows="4"
                        placeholder="Describe symptoms..."
                        value={form.Description}
                        onChange={handleChange}
                        className="milk-input"
                        required
                    />

                    <button className="milk-btn w-full" disabled={loading}>
                        {loading ? "Analyzing..." : "Predict"}
                    </button>

                </form>
            </div>

            <div className="xl:col-span-3 space-y-4">

                {result && (
                    <>
                        <div className="card">
                            <h3 className="font-semibold">Disease</h3>
                            <p className="text-2xl text-green-600 capitalize font-bold">
                                {result.predicted_disease}
                            </p>
                        </div>

                        <div className="card">
                            <h3 className="font-semibold mb-2">Symptoms</h3>

                            <div className="flex flex-wrap gap-2">
                                {result.extracted_symptoms_by_ai?.map((item, i) => (
                                    <span
                                        key={i}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="font-semibold mb-2">Treatment</h3>

                            {/* <p className="whitespace-pre-wrap">
                                {result.treatement_recommedation}
                            </p> */}

                            <div className="prose max-w-none">
                                <ReactMarkdown>
                                    {result.treatement_recommedation}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </>
                )}

            </div>

        </div>
    );
};

export default CattleAi;