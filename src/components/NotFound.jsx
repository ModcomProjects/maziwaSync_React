import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="text-center">

                {/* ── Big 404 number ── */}
                <h1 className="text-9xl font-extrabold text-teal-600 leading-none">404</h1>

                {/* ── Divider line ── */}
                <div className="w-16 h-1 bg-green-500 mx-auto my-4 rounded-full" />

                {/* ── Message ── */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-500 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* ── Actions ── */}
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200 transition text-sm"
                    >
                        ← Go Back
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="milk-btn px-5 py-2 text-sm"
                    >
                        Go Home
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NotFound;