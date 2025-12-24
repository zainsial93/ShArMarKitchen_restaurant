import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', city: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_BASE}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                login(data.user);
                navigate('/');
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error('Signup Error Details:', err);
            setError(`Failed to signup: ${err.message}`);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '5rem auto', padding: '2rem', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>Sign Up</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="text" placeholder="Username" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} required style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                <input type="text" placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                <button type="submit" style={{ padding: '0.8rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Sign Up</button>
            </form>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
            </p>
        </div>
    );
};

export default Signup;
