import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FBF8F2] text-gray-800">

            {/* ── Nav ── */}
            <nav className="flex items-center justify-between px-6 md:px-12 py-5">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-teal-600" />
                    <span className="font-extrabold text-lg tracking-tight text-teal-700">
                        Maziwa<span className="text-green-600">Sync</span>
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-teal-700 transition"
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="milk-btn px-5 py-2 text-sm"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* ── Hero ── */}
            <section className="px-6 md:px-12 pt-10 pb-20 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-700 bg-green-100 px-3 py-1 rounded-full mb-5">
                            Built for milk cooperatives
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                            Every litre, <span className="text-teal-600">accounted for.</span>
                        </h1>
                        <p className="mt-5 text-gray-500 text-lg leading-relaxed">
                            MaziwaSync connects farmers, porters, and cooperative admins on one
                            ledger — so collection records stay honest, payments stay fair,
                            and no entry changes hands without a trace.
                        </p>
                        <div className="mt-8 flex items-center gap-3">
                            <button
                                onClick={() => navigate("/register")}
                                className="milk-btn px-6 py-3 text-sm"
                            >
                                Start Your Cooperative
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="px-6 py-3 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                            >
                                I already have an account
                            </button>
                        </div>
                    </div>

                    {/* ── Signature element: collection ledger ── */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-gray-700">Today's Collections</span>
                            <span className="text-xs text-gray-400">Route 3 — Kiambu</span>
                        </div>
                        {[
                            { farmer: "J. Mwangi", litres: "18.5L", status: "Verified" },
                            { farmer: "S. Njeri", litres: "12.0L", status: "Verified" },
                            { farmer: "P. Otieno", litres: "9.8L", status: "Pending" },
                        ].map((row, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between py-3 border-b last:border-b-0 border-gray-100"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{row.farmer}</p>
                                    <p className="text-xs text-gray-400">{row.litres} recorded by porter</p>
                                </div>
                                <span
                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                        row.status === "Verified"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-amber-100 text-amber-700"
                                    }`}
                                >
                                    {row.status}
                                </span>
                            </div>
                        ))}
                        <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            Only admins can edit a locked entry
                        </p>
                    </div>
                </div>
            </section>

            {/* ── How it flows ── */}
            <section className="px-6 md:px-12 py-16 bg-white border-y border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">How a litre moves through the system</h2>
                    <p className="text-gray-500 mb-10">A clear, ordered trail from the farm gate to the payout.</p>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: "01", title: "Porter collects", text: "Milk is picked up and logged against the farmer on the spot." },
                            { step: "02", title: "Record locks", text: "The entry is saved and can no longer be changed by the porter." },
                            { step: "03", title: "Admin verifies", text: "The cooperative reviews and can correct or confirm the record." },
                            { step: "04", title: "Farmer gets paid", text: "Balances are settled straight to M-Pesa via B2C payout." },
                        ].map((s) => (
                            <div key={s.step}>
                                <span className="text-sm font-bold text-teal-600">{s.step}</span>
                                <h3 className="font-semibold text-gray-800 mt-2 mb-1">{s.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Feature grid ── */}
            <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Everything the cooperative needs</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                        {
                            title: "Livestock Health AI",
                            text: "Farmers describe symptoms and get an early read on possible livestock disease before it spreads.",
                            accent: "bg-teal-50 text-teal-700",
                        },
                        {
                            title: "Farmer Feedback",
                            text: "Farmers rate their experience directly, giving the cooperative real visibility into how each one is doing.",
                            accent: "bg-green-50 text-green-700",
                        },
                        {
                            title: "Notice Board",
                            text: "A shared space where porters and farmers post announcements and stay in sync on collection days.",
                            accent: "bg-amber-50 text-amber-700",
                        },
                        {
                            title: "M-Pesa Payouts",
                            text: "Admins track outstanding balances and settle farmers directly through integrated B2C M-Pesa payments.",
                            accent: "bg-teal-50 text-teal-700",
                        },
                    ].map((f, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition">
                            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${f.accent}`}>
                                {f.title}
                            </span>
                            <p className="text-sm text-gray-500 leading-relaxed">{f.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="px-6 md:px-12 py-16">
                <div className="max-w-4xl mx-auto bg-teal-700 rounded-2xl px-8 py-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                        Bring transparency to your milk collection
                    </h2>
                    <p className="text-teal-100 mb-7 max-w-xl mx-auto">
                        Set up your cooperative, invite your porters, and let every farmer see exactly what they're owed.
                    </p>
                    <button
                        onClick={() => navigate("/register")}
                        className="px-7 py-3 bg-white text-teal-700 font-semibold rounded-lg text-sm hover:bg-teal-50 transition"
                    >
                        Get Started for Free
                    </button>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="px-6 md:px-12 py-8 text-center text-xs text-gray-400 border-t border-gray-100">
                © {new Date().getFullYear()} MaziwaSync. Built for Kenya's milk cooperatives.
            </footer>
        </div>
    );
};

export default Home;