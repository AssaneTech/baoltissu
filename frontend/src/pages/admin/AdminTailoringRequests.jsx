import React, { useEffect, useState } from "react";
import API from "../../api/API";
import { Trash2 } from "lucide-react";

const AdminTailoringRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/api/tailoring");
      setRequests(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch tailoring requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const deleteRequest = async (id) => {
    if (!window.confirm("Delete this tailoring request?")) return;

    try {
      await API.delete(`/api/tailoring/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading requests...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Tailoring Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">No tailoring requests yet.</p>
      ) : (
        <div className="space-y-8">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white border rounded-2xl shadow p-6"
            >
              <div className="flex justify-between items-start">
                
                {/* LEFT: DETAILS */}
                <div className="space-y-4">

                  <h2 className="text-2xl font-semibold text-gray-900">
                    {req.name}
                  </h2>

                  <p className="text-gray-700">
                    <strong>Email:</strong> {req.email}
                  </p>

                  <p className="text-gray-700">
                    <strong>Phone:</strong> {req.phone}
                  </p>

                  {/* Measurements */}
                  <div className="mt-3">
                    <h3 className="text-lg font-semibold text-gray-800">Measurements</h3>
                    <p className="text-gray-700">
                      Chest: {req.chest} cm
                    </p>
                    <p className="text-gray-700">
                      Waist: {req.waist} cm
                    </p>
                    <p className="text-gray-700">
                      Hips: {req.hip} cm
                    </p>
                    <p className="text-gray-700">
                      Length: {req.length} cm
                    </p>
                  </div>

                  {/* Fabric & color */}
                  <div className="mt-3">
                    <p className="text-gray-700"><strong>Fabric:</strong> {req.fabric}</p>
                    <p className="text-gray-700"><strong>Color:</strong> {req.color}</p>
                  </div>

                  {/* Notes */}
                  {req.notes && (
                    <p className="text-gray-700 mt-3">
                      <strong>Notes:</strong> {req.notes}
                    </p>
                  )}

                  {/* Date */}
                  <p className="text-gray-400 text-sm mt-4">
                    {new Date(req.createdAt).toLocaleString()}
                  </p>

                </div>

                {/* RIGHT: IMAGE + DELETE */}
                <div className="flex flex-col items-end space-y-4">
                  
                  {/* Image if exists */}
                  {req.modelImage && (
                    <div className="w-40 h-40 bg-gray-100 rounded-xl overflow-hidden shadow">
                      <img
                        src={`http://localhost:5000/uploads/${req.modelImage}`}
                        className="w-full h-full object-cover"
                        alt="Model inspiration"
                      />
                    </div>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={() => deleteRequest(req._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={22} />
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTailoringRequests;
