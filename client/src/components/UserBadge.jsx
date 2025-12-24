import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const UserBadge = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div style={{
            position: 'fixed',
            right: '2rem',
            bottom: '6rem', // Raised to avoid footer/cart bar overlap
            background: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 999,
            border: '1px solid #eee',
            fontSize: '0.9rem',
            color: '#333'
        }}>
            <FaUserCircle size={20} color="var(--primary)" />
            <span>
                Logged in as <strong>{user.username}</strong>
            </span>
        </div>
    );
};

export default UserBadge;
