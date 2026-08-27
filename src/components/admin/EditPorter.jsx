import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const EditPorter = () => {
  const { id } = useParams(); // porter ID from URL e.g. /porters/edit/3
  const navigate = useNavigate();

  // ── Form state — same fields as AddPorter but no password ─
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    national_id: "",
    employee_id: "",
    route_name: "",
    is_active: true,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // loading existing data

  // ── Load existing porter data into the form ────────────
  useEffect(() => {
    const fetchPorter = async () => {
      try {
        const { data } = await api.get(`cooperative/porters/${id}/`);
        // Pre-fill form with existing values
        setForm({
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          national_id: data.national_id,
          employee_id: data.employee_id,
          route_name: data.route_name,
          is_active: data.is_active,
        });
      } catch (err) {
        toast.error("Failed to load porter details.");
      } finally {
        setFetching(false);
      }
    };

    fetchPorter();
  }, [id]);

  // ── Generic input handler ──────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle checkbox separately for is_active toggle
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // ── Submit updated data ────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.patch(`cooperative/porters/${id}/`, form); // PATCH = partial update
      toast.success("Porter updated successfully!");
      setTimeout(() => navigate("/admin-dashboard/porters"), 1500);
    } catch (err) {
      const errors = err.response?.data;
      const firstError = errors
        ? Object.values(errors).flat().join(" ")
        : "Failed to update porter.";
      toast.error(firstError);
    } finally {
      setLoading(false);
    }
  };

  // ── Show loader while fetching existing data ───────────
  if (fetching) return <p className="p-6 text-gray-500">Loading porter...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">

      {/* ── Header ── */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin-dashboard/porters")}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold">Edit Porter</h2>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-5">

        {/* ── Personal Info ── */}
        <p className="text-xs uppercase tracking-widest text-teal-600 font-semibold">
          Personal Info
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">First Name</label>
            <input
              name="first_name"
              className="milk-input"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-label">Last Name</label>
            <input
              name="last_name"
              className="milk-input"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Phone Number</label>
            <input
              name="phone_number"
              className="milk-input"
              value={form.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-label">National ID</label>
            <input
              name="national_id"
              className="milk-input"
              value={form.national_id}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ── Work Info ── */}
        <p className="text-xs uppercase tracking-widest text-teal-600 font-semibold pt-2">
          Work Info
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Employee ID</label>
            <input
              name="employee_id"
              className="milk-input"
              value={form.employee_id}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-label">Route Name</label>
            <input
              name="route_name"
              className="milk-input"
              value={form.route_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ── Active toggle ── */}
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            name="is_active"
            id="is_active"
            checked={form.is_active}
            onChange={handleChange}
            className="w-4 h-4 accent-teal-600"
          />
          <label htmlFor="is_active" className="form-label mb-0">
            Porter is Active
          </label>
        </div>

        <button type="submit" disabled={loading} className="milk-btn w-full">
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </form>
    </div>
  );
};

export default EditPorter;