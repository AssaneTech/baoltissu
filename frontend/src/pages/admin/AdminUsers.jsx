import React, { useEffect, useState } from "react";
import { Users, Search, Trash2, ShieldCheck, Pencil, Plus } from "lucide-react";
import API from "../../api/API";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  // For Add/Edit modals
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", isAdmin: false });

  // ===== GET TOKEN =====
  const getToken = () => JSON.parse(localStorage.getItem("auth"))?.token;

  // ===== LOAD USERS =====
  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/users", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      setUsers(res.data);
    } catch (err) {
      console.error("Load users error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ===== DELETE USER =====
  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      await API.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert("Cannot delete user");
    }
  };

  // ===== UPDATE USER =====
  const updateUser = async () => {
    try {
      await API.put(
        `/api/users/${editingUser._id}`,
        {
          name: editingUser.name,
          email: editingUser.email,
          isAdmin: editingUser.isAdmin,
        },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // ===== ADD USER =====
  const addUser = async () => {
    try {
      await API.post(
        `/api/users`,
        newUser,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      setNewUser({ name: "", email: "", password: "", isAdmin: false });
      fetchUsers();
    } catch (err) {
      alert("Creation failed.");
    }
  };

  // ===== FILTER =====
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10">

      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <Users size={28} />
          User Management
        </h1>

        {/* ADD USER BUTTON */}
        <button
          onClick={() => setNewUser({ name: "", email: "", password: "", isAdmin: false })}
          className="flex items-center gap-2 bg-[#39386A] text-white px-4 py-2 rounded-full hover:bg-[#2F2E59]"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative mb-8 max-w-lg">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search user..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-full border shadow-sm"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border p-6 overflow-x-auto">

        <table className="w-full text-left text-sm">
          <thead className="text-xs text-gray-500 uppercase">
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filtered.map((u) => (
              <tr key={u._id}>
                <td className="py-3 font-medium">{u.name}</td>
                <td className="py-3">{u.email}</td>

                <td className="py-3">
                  {u.isAdmin ? (
                    <span className="flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs">
                      <ShieldCheck size={14} />
                      Admin
                    </span>
                  ) : (
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">
                      User
                    </span>
                  )}
                </td>

                <td className="py-3 flex gap-3">
                  {/* EDIT */}
                  <button
                    onClick={() => setEditingUser({ ...u })}
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600"
                  >
                    <Pencil size={16} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-sm">
            No users found.
          </div>
        )}
      </div>

      {/* ====================================== */}
      {/* EDIT USER MODAL */}
      {/* ====================================== */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-6">Edit User</h2>

            <div className="space-y-4">
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                className="w-full border px-4 py-2 rounded-lg"
                placeholder="Name"
              />

              <input
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="w-full border px-4 py-2 rounded-lg"
                placeholder="Email"
              />

              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={editingUser.isAdmin}
                  onChange={(e) => setEditingUser({ ...editingUser, isAdmin: e.target.checked })}
                />
                Admin
              </label>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-full bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={updateUser}
                className="px-4 py-2 rounded-full bg-[#39386A] text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================== */}
      {/* ADD USER MODAL */}
      {/* ====================================== */}
      {newUser && newUser.email !== undefined && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-6">Add New User</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full border px-4 py-2 rounded-lg"
              />

              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full border px-4 py-2 rounded-lg"
              />

              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full border px-4 py-2 rounded-lg"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newUser.isAdmin}
                  onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })}
                />
                Admin
              </label>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setNewUser(null)}
                className="px-4 py-2 rounded-full bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={addUser}
                className="px-4 py-2 rounded-full bg-[#39386A] text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminUsers;
