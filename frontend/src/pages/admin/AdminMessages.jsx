import React, { useEffect, useState } from "react";
import API from "../../api/API";
import { Trash2 } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/api/contact");
      setMessages(res.data.data || []);
    } catch (err) {
      console.error("Failed to load messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

 const deleteMessage = async (id) => {
  if (!window.confirm("Delete this message?")) return;

  console.log("Deleting message id =", id);
  try {
    // Optionnel: si ton API nécessite un header Authorization, ajoute-le ici :
    // await API.delete(`/api/contact/${id}`, { headers: { Authorization: `Bearer ${token}` } });

    const res = await API.delete(`/api/contact/${id}`);
    console.log("Delete response:", res);

    // Vérifie res.status
    if (res.status === 200 || res.status === 204) {
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } else {
      console.error("Unexpected delete status:", res.status, res.data);
      alert("Delete failed: " + (res.data?.message || res.status));
    }
  } catch (err) {
    console.error("Delete failed", err);
    // Affiche message utilisateur utile
    alert("Delete failed. See console for details.");
  }
};


  if (loading) return <p className="p-6 text-center">Loading messages...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Client Messages</h1>

      {messages.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">No messages yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white border rounded-2xl shadow p-6 space-y-4"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {msg.subject}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    From: <span className="font-semibold">{msg.name}</span> (
                    {msg.email})
                  </p>

                  <p className="text-gray-700 mt-4 whitespace-pre-line">
                    {msg.message}
                  </p>
                </div>

                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={22} />
                </button>
              </div>

              <p className="text-gray-400 text-sm text-right">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
