import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ReviewModal = () => {
    const { hasOrdered } = useCart();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        userName: user ? user.username : '',
        city: user ? user.city || '' : '',
        rating: 5,
        feedback: '',
        suggestions: ''
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, userName: user.username, city: user.city || '' }));
        }
    }, [user]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (hasOrdered && !submitted) {
            // Immediate popup when order is placed
            setIsOpen(true);
        }
    }, [hasOrdered, submitted]);

    useEffect(() => {
        // Logic: If user has ordered, AND hasn't submitted yet:
        // 1. Show on mouse leave (exit intent)
        // 2. Warn on beforeunload

        if (!hasOrdered || submitted) return;

        const handleMouseLeave = (e) => {
            if (e.clientY <= 0) {
                setIsOpen(true);
            }
        };

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
            setIsOpen(true);
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasOrdered, submitted]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userName || !formData.city) return;

        try {
            await api.post('/reviews', formData);
            setSubmitted(true);
            setIsOpen(false);
            alert('Thank you for your review! You may now leave.');
        } catch (err) {
            console.error(err);
            alert('Error submitting review.');
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
        }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', maxWidth: '500px', width: '90%' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>We value your feedback!</h3>
                <p style={{ marginBottom: '1rem' }}>Since you purchased from us, please leave a review before you go.</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.userName}
                        onChange={e => setFormData({ ...formData, userName: e.target.value })}
                        required
                        style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        required
                        style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Rating: </label>
                        <select
                            value={formData.rating}
                            onChange={e => setFormData({ ...formData, rating: e.target.value })}
                            style={{ padding: '0.75rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Stars</option>)}
                        </select>
                    </div>
                    <textarea
                        placeholder="Website Experience / Feedback"
                        value={formData.feedback}
                        onChange={e => setFormData({ ...formData, feedback: e.target.value })}
                        style={{ padding: '0.75rem', minHeight: '80px', borderRadius: '4px', border: '1px solid #ccc' }}
                    ></textarea>
                    <textarea
                        placeholder="Suggestions for Improvements"
                        value={formData.suggestions}
                        onChange={e => setFormData({ ...formData, suggestions: e.target.value })}
                        style={{ padding: '0.75rem', minHeight: '80px', borderRadius: '4px', border: '1px solid #ccc' }}
                    ></textarea>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Submit Review & Exit</button>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
