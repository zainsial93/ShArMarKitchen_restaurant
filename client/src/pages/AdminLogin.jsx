import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Connection error');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '5rem auto', padding: '2rem', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>Admin Access</h2>

            {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #ddd', marginTop: '0.5rem' }}
                    />
                </div>
                <div>
                    <label>Secret Code</label>
                    <input
                        type="password"
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #ddd', marginTop: '0.5rem' }}
                    />
                </div>
                <button type="submit" style={{ background: 'var(--primary)', color: 'white', padding: '0.8rem', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', cursor: 'pointer', marginTop: '1rem' }}>
                    Access Panel
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
