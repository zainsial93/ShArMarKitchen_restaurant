import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_BASE = 'https://sharmarkitchenrestaurant-production.up.railway.app';
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                login(data.user);
                navigate('/');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to login');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '5rem auto', padding: '2rem', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>Login</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                <button type="submit" style={{ padding: '0.8rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Login</button>
            </form>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                New here? <Link to="/signup" style={{ color: 'var(--primary)' }}>Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
