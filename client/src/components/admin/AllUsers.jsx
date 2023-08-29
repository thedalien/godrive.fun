import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../routes/css/Admin.css';


const AllUsers = ({setShowAllUsers}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('api/admin/users/all');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await api.delete('api/admin/users/delete', { data: { userId } });
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleBlock = async (userId) => {
        if (!window.confirm('Are you sure you want to block this user?')) return;
        try {
            await api.put('api/admin/users/block', { userId });
            setUsers(users.map(user => user.id === userId ? { ...user, role: 'blocked' } : user));
        } catch (error) {
            console.error(error);
        }
    };

    const handleRoleChange = async (userId, role) => {
        try {
            await api.put('api/admin/users/role', { userId, role });
            setUsers(users.map(user => user.id === userId ? { ...user, role } : user));
        } catch (error) {
            console.error(error);
        }
    };

    const handleVerify = async (userId, verified) => {
        try {
            await api.put('api/admin/users/verify', { userId, verified });
            setUsers(users.map(user => user.id === userId ? { ...user, verified: verified } : user));
        } catch (error) {
            alert(error.response.data);
            console.error(error);
        }
    };


    return (
        <fieldset id="editUser">
            <legend>Edit / Delete Users</legend>
            <table className="adminUserGrid">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Verified</th>
                        <th colSpan={3}>Actions</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.verified ? 'Verified' : 'Not Verified'}</td>
                        <td>
                            <button className="mainButtons" onClick={() => handleVerify(user.id, !user.verified)}>{user.verified ? 'Unverify' : 'Verify'}</button>
                        </td>
                        <td>
                            <button className="mainButtons" onClick={() => handleDelete(user.id)}>Delete</button>
                        </td>
                        <td>
                            <button className="mainButtons" onClick={() => handleBlock(user.id)}>Block</button>
                        </td>
                        <td>
                            <select defaultValue={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="mainButtons adminUserGridClose" onClick={() => setShowAllUsers(false)}>Close List</button>
        </fieldset>
    );
};

export default AllUsers;
