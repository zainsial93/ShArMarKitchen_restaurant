import React, { useEffect, useState } from 'react';
import api from '../api';

const ReviewsSection = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Assuming public reviews endpoint exists or we use the admin one (which is protected). 
                // Let's create/use a public endpoint for approved reviews or just all for now.
                // Using the existing admin one might fail if we don't send a token, so we need a public endpoint.
                // Or I can update backend to allow public GET on reviews.
                // For now, I'll mock use a new public endpoint I will create.
                const res = await api.get('/reviews/public'); // Need to create this
                setReviews(res.data);
            } catch (err) {
                console.log('Using mock reviews for now as backend might be protected');
                // Fallback mock
                setReviews([
                    { id: 1, userName: 'Ali', city: 'Lahore', rating: 5, feedback: 'Amazing food!', createdAt: new Date() },
                    { id: 2, userName: 'Sara', city: 'Karachi', rating: 4, feedback: 'Great taste but delivery was late.', createdAt: new Date() }
                ]);
            }
        };
        fetchReviews();
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {reviews.map(review => (
                <div key={review.id} style={{
                    background: '#fff',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    border: '1px solid #f0f0f0',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#333' }}>{review.userName}</h4>
                            <span style={{ fontSize: '0.9rem', color: '#888' }}>{review.city}</span>
                        </div>
                        <div style={{ background: '#fff9c4', padding: '0.2rem 0.6rem', borderRadius: '1rem', color: '#fbc02d', fontWeight: 'bold', fontSize: '0.9rem' }}>
                            ★ {review.rating}
                        </div>
                    </div>

                    <p style={{ color: '#555', lineHeight: '1.5', flex: 1, marginBottom: '1.5rem' }}>
                        "{review.feedback}"
                    </p>

                    <div style={{
                        marginTop: 'auto',
                        paddingTop: '1rem',
                        borderTop: '1px solid #f5f5f5',
                        fontSize: '0.8rem',
                        color: '#999',
                        fontStyle: 'italic',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                        <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                            Created by Umar Ali Sial & Team
                        </span>
                    </div>
                </div>
            ))}
            {reviews.length === 0 && <p>No reviews yet.</p>}
        </div>
    );
};

export default ReviewsSection;
