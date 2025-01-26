import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axiosSecure.get('/users');
      setUsers(data);
    };
    fetchUsers();
  }, [axiosSecure]);

  const handleRoleChange = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/users/${id}`, { role: newRole });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );
      toast.success('Role updated successfully');
    } catch {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axiosSecure.delete(`/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success('User deleted successfully');
    } catch {
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = filterRole
    ? users.filter((user) => user.role === filterRole)
    : users;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Users</h2>

      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <label className="flex items-center gap-2 font-semibold">
          Filter by Role:
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border bg-white px-4 py-2 rounded-md"
          >
            <option value="">All</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border bg-white px-2 py-1 rounded-md"
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No users found</p>
      )}
    </div>
  );
};

export default ManageUsers;