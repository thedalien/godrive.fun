import React, { useState, useEffect } from 'react';
import api from '../../api';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('admin/users/all');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await api.delete('admin/users/delete', { data: { userId } });
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleBlock = async (userId) => {
        try {
            await api.put('admin/users/block', { userId });
            setUsers(users.map(user => user.id === userId ? { ...user, role: 'blocked' } : user));
        } catch (error) {
            console.error(error);
        }
    };

    const handleRoleChange = async (userId, role) => {
        try {
            await api.put('admin/users/role', { userId, role });
            setUsers(users.map(user => user.id === userId ? { ...user, role } : user));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.name}</p>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                    <button onClick={() => handleBlock(user.id)}>Block</button>
                    <select onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
            ))}
        </div>
    );
};

export default AllUsers;
