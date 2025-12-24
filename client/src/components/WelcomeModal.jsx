import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show on mount
        const hasSeen = sessionStorage.getItem('seenWelcome');
        if (!hasSeen) {
            setIsOpen(true);
            sessionStorage.setItem('seenWelcome', 'true');
        }
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        style={{
                            background: 'white', padding: '2rem', borderRadius: '1rem', maxWidth: '500px', textAlign: 'center'
                        }}
                    >
                        <h2>🎉 Welcome to Our Website! 🎉</h2>
                        <div style={{ margin: '1rem 0', lineHeight: '1.6', fontSize: '1rem', color: '#555' }}>
                            <p style={{ marginBottom: '0.5rem' }}>This is a university project, and we’re glad you’re here!</p>
                            <p style={{ marginBottom: '0.5rem' }}>Before leaving the site, we kindly ask you to share your feedback.</p>
                            <p style={{ marginBottom: '0.5rem' }}>Once you place your order, we will request your review.</p>
                            <p style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Thank you so much for visiting – we really appreciate it! 🙏</p>
                        </div>
                        <button className="btn btn-primary" onClick={() => setIsOpen(false)}>
                            Explore Now
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeModal;
