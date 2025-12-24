import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [data, setData] = useState({ users: [], orders: [], reviews: [] });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchData(token);
    }, [navigate]);

    const fetchData = async (token) => {
        try {
            const headers = { 'x-admin-token': token };
            const API_BASE = 'https://sharmarkitchenrestaurant-production.up.railway.app';

            const [usersRes, ordersRes, reviewsRes] = await Promise.all([
                fetch(`${API_BASE}/api/admin/users`, { headers }),
                fetch(`${API_BASE}/api/admin/orders`, { headers }),
                fetch(`${API_BASE}/api/admin/reviews`, { headers })
            ]);

            if (usersRes.status === 403 || ordersRes.status === 403) {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
                return;
            }

            const users = await usersRes.json();
            const orders = await ordersRes.json();
            const reviews = await reviewsRes.json();

            setData({ users, orders, reviews });
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const TabButton = ({ id, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                padding: '0.8rem 1.5rem',
                background: activeTab === id ? 'var(--primary)' : '#eee',
                color: activeTab === id ? 'white' : '#333',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 600
            }}
        >
            {label}
        </button>
    );

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Admin Panel...</div>;

    // Calculate Stats
    const totalVisits = data.users.length; // Approximated by users
    const totalReviews = data.reviews.length;
    const totalOrders = data.orders.length;

    // "kitny bina review k gu" - Assuming this means users who haven't reviewed, or orders without reviews.
    // Let's approximate: Visitors (Total Users) - Reviews.
    const withoutReview = Math.max(0, totalVisits - totalReviews);

    const StatCard = ({ title, value, color }) => (
        <div style={{ flex: 1, padding: '1.5rem', background: 'white', borderRadius: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: `5px solid ${color}` }}>
            <h3 style={{ fontSize: '2rem', margin: 0, color: '#333' }}>{value}</h3>
            <p style={{ margin: '0.5rem 0 0', color: '#666' }}>{title}</p>
        </div>
    );

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--primary)' }}>Admin Dashboard</h1>
                <button
                    onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin/login'); }}
                    style={{ background: '#ff4444', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </div>

            {/* Stats Overview */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <StatCard title="Total Registered Visits" value={totalVisits} color="#2196f3" />
                <StatCard title="Total Orders" value={totalOrders} color="#ff9800" />
                <StatCard title="Reviews Submitted" value={totalReviews} color="#4caf50" />
                <StatCard title="Visits Without Review" value={withoutReview} color="#9e9e9e" />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <TabButton id="orders" label={`Orders (${data.orders.length})`} />
                <TabButton id="users" label={`Users (${data.users.length})`} />
                <TabButton id="reviews" label={`Reviews (${data.reviews.length})`} />
            </div>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                {activeTab === 'orders' && (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ background: '#f8f8f8', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Order ID</th>
                                    <th style={{ padding: '1rem' }}>Customer</th>
                                    <th style={{ padding: '1rem' }}>Total</th>
                                    <th style={{ padding: '1rem' }}>Status</th>
                                    <th style={{ padding: '1rem' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.orders.map(order => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '1rem' }}>#{order.id}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div>{order.customerName}</div>
                                            <small style={{ color: '#666' }}>{order.customerAddress}</small>
                                        </td>
                                        <td style={{ padding: '1rem' }}>Rs. {order.totalAmount}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                background: order.status === 'completed' ? '#d4edda' : '#fff3cd',
                                                color: order.status === 'completed' ? '#155724' : '#856404'
                                            }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {data.orders.length === 0 && <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>No orders found.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'users' && (
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ background: '#f8f8f8', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>User ID</th>
                                <th style={{ padding: '1rem' }}>Username</th>
                                <th style={{ padding: '1rem' }}>Email</th>
                                <th style={{ padding: '1rem' }}>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem' }}>#{user.id}</td>
                                    <td style={{ padding: '1rem' }}>{user.username}</td>
                                    <td style={{ padding: '1rem' }}>{user.email}</td>
                                    <td style={{ padding: '1rem' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {data.users.length === 0 && <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>No registered users found.</td></tr>}
                        </tbody>
                    </table>
                )}

                {activeTab === 'reviews' && (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {data.reviews.map(review => (
                            <div key={review.id} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <strong>{review.userName} <span style={{ fontWeight: 'normal', color: '#666' }}>from {review.city}</span></strong>
                                    <span style={{ color: '#fdd835', fontWeight: 'bold' }}>★ {review.rating}</span>
                                </div>
                                <p style={{ margin: '0.5rem 0' }}>{review.feedback}</p>
                                {review.suggestions && <p style={{ fontSize: '0.9rem', color: '#666' }}>Suggestion: {review.suggestions}</p>}
                                <small style={{ color: '#999' }}>{new Date(review.createdAt).toLocaleDateString()}</small>
                            </div>
                        ))}
                        {data.reviews.length === 0 && <div style={{ padding: '2rem', textAlign: 'center' }}>No reviews found.</div>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
