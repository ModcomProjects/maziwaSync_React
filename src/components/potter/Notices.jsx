import React, { useEffect, useState } from "react";
import api from "../../api/api";

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    
    const fetchNotices = async () => {
        try {
            const res = await api.get("collector/notice/");
            setNotices(res.data);
        } catch (err) {
            setError("Failed to load notices.");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchNotices();
    }, []);
    
    if (loading) {return (<div className="p-6"> <p className="text-gray-500">Loading notices...</p></div>);}

    if (error) { return (<div className="p-6"> <p className="text-red-500">{error}</p>  </div>); }

    return (
        <div className="p-4 md:p-6">

            {/* PAGE HEADER */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Notices</h1>
                <p className="text-gray-500"> Important updates and announcements. </p>
            </div>

            {notices.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-6 text-center">
                    <i className="bi bi-bell text-4xl text-gray-300"></i>
                    <p className="mt-3 text-gray-500">
                        No notices available.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notices.map((notice) => (
                        <div
                            key={notice.id}
                            className={`bg-white rounded-xl shadow-sm border-l-4 p-5 transition hover:shadow-md ${
                                notice.is_important
                                    ? "border-red-500"
                                    : "border-green-500"
                            }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>

                                    {notice.is_important && (
                                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                                            Important
                                        </span>
                                    )}
                                </div>

                                <span className="text-sm text-gray-500">
                                    {new Date(
                                        notice.created_at
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="mt-3 text-gray-600"> {notice.message}</p>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    {notice.target}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notices;