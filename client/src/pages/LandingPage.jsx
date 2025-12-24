import React from 'react';
import { Link } from 'react-router-dom';
import ReviewsSection from '../components/ReviewsSection';
import SialMartLogo from '../components/SialMartLogo';

const LandingPage = () => {
    return (
        <div className="container" style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>

            {/* Hero Section */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
                <MotionWrapper>
                    <div style={{ transform: 'scale(1.5)', marginBottom: '2rem' }}>
                        <SialMartLogo />
                    </div>
                    <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem', lineHeight: 1.2 }}>
                        Delicious Food, <br /> Delivered To You
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem', maxWidth: '600px' }}>
                        Join us to explore our exclusive menu of Burgers, Pizzas, Karahi, and more.
                        Sign up today to place your first order!
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
                        <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: '2rem', boxShadow: '0 4px 15px rgba(254, 186, 12, 0.4)' }}>
                            Login
                        </Link>
                        <Link to="/signup" className="btn" style={{ padding: '1rem 3rem', fontSize: '1.1rem', background: 'white', color: 'var(--text-main)', border: '2px solid #eee', borderRadius: '2rem' }}>
                            Sign Up
                        </Link>
                    </div>

                    <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1.5rem', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                        <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '0.5rem' }}>
                            Are you a Customer? Simply Login or Sign up above.
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#888' }}>
                            Are you an Administrator? <Link to="/admin/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Login as Admin</Link>
                        </p>
                    </div>
                </MotionWrapper>
            </div>

            {/* Social Proof / Reviews */}
            <div style={{ marginTop: 'auto', paddingTop: '4rem', paddingBottom: '2rem' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>
                    What our customers say
                </h3>
                <ReviewsSection />
            </div>

        </div>
    );
};

// Simple fade-in wrapper
const MotionWrapper = ({ children }) => (
    <div style={{ animation: 'fadeIn 1s ease-out' }}>
        <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `}</style>
        {children}
    </div>
);

export default LandingPage;
