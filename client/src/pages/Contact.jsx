import React, { useState } from 'react';
import SialMartLogo from '../components/SialMartLogo';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        // Here you would send usage to backend
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ transform: 'scale(1.2)', display: 'inline-block', marginBottom: '1rem' }}>
                    <SialMartLogo />
                </div>
                <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '1rem' }}>Get in Touch</h1>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Have a question about our menu, catering services, or just want to say hello? We'd love to hear from you!</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
                {/* Contact Info */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>Contact Information</h3>

                    <InfoItem icon="📍" title="Address" text="123 Main Food Street, Jhang, Punjab" />
                    <InfoItem icon="📞" title="Phone" text="+92 300 1234567" />
                    <InfoItem icon="✉️" title="Email" text="info@sharmarkitchen.com" />
                    <InfoItem icon="🕒" title="Hours" text="11:00 AM - 01:00 AM (Daily)" />
                </div>

                {/* Form */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    {!sent ? (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Send us a Message</h3>

                            <input
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                                style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid #ddd', background: '#f9f9f9' }}
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                                style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid #ddd', background: '#f9f9f9' }}
                            />
                            <textarea
                                placeholder="Your Message"
                                rows="4"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                required
                                style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid #ddd', background: '#f9f9f9', resize: 'vertical' }}
                            ></textarea>

                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Send Message</button>
                        </form>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <h2 style={{ color: 'var(--success)', marginBottom: '1rem' }}>Message Sent!</h2>
                            <p>Thank you for reaching out. We will get back to you shortly.</p>
                            <button onClick={() => setSent(false)} style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}>Send another</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, title, text }) => (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ width: '40px', height: '40px', background: 'rgba(254, 186, 12, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
            {icon}
        </div>
        <div>
            <h4 style={{ margin: 0, color: '#333', fontSize: '0.9rem', fontWeight: 600 }}>{title}</h4>
            <p style={{ margin: '0.2rem 0 0', color: '#666' }}>{text}</p>
        </div>
    </div>
);

export default Contact;
