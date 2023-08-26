import React, { useState, useEffect } from 'react';
import api from '../../api';

const AllUsers = () => {
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
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.name}</p>
                    {user.verified ? 
                    <>
                    <p style={{ color: 'green', fontWeight: 'bold' }}>Verified</p>
                    <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleVerify(user.id, false)}>Unverify</button>
                    </>
                    : <>
                    <p>Not verified</p>
                    <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => handleVerify(user.id, true)}>Verify</button>
                    </>
                    }
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                    <button onClick={() => handleBlock(user.id)}>Block</button>
                    <select defaultValue={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
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
