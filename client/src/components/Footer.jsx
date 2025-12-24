import React from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const headingStyle = {
        color: 'white',
        marginBottom: '1.5rem',
        fontSize: '1.4rem',
        fontWeight: '700',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        borderBottom: '2px solid rgba(255,255,255,0.1)',
        paddingBottom: '0.5rem',
        display: 'inline-block'
    };

    const listItemStyle = {
        marginBottom: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'white',
        opacity: 1,
        transition: 'opacity 0.2s',
        fontSize: '1rem'
    };

    return (
        <footer style={{ background: 'linear-gradient(to right, #1a1a1a, #2c2c2c)', color: '#f0f0f0', padding: '5rem 0 2rem', marginTop: 'auto', borderTop: '5px solid var(--primary)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>

                {/* Our Services */}
                <div>
                    <h3 style={headingStyle}>Our Services</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={listItemStyle}>✨ Fresh Food Delivery</li>
                        <li style={listItemStyle}>✨ Outdoor Catering</li>
                        <li style={listItemStyle}>✨ Event Management</li>
                        <li style={listItemStyle}>✨ Exclusive Pre-booking</li>
                        <li style={listItemStyle}>✨ Custom Menu Planning</li>
                    </ul>
                </div>

                {/* Shop Timings */}
                <div>
                    <h3 style={headingStyle}>Shop Timings</h3>
                    <div style={{ opacity: 0.9, lineHeight: '1.8' }}>
                        <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                            <span>Monday - Thursday:</span>
                            <span style={{ color: 'white', fontWeight: 600 }}>11:00 AM - 12:00 AM</span>
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                            <span>Friday:</span>
                            <span style={{ color: 'white', fontWeight: 600 }}>02:00 PM - 01:00 AM</span>
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Saturday - Sunday:</span>
                            <span style={{ color: 'white', fontWeight: 600 }}>11:00 AM - 01:00 AM</span>
                        </p>
                    </div>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 style={headingStyle}>Contact Us</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        <a href="#" style={{ ...listItemStyle, textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%' }}>
                                <FaMapMarkerAlt size={18} color="var(--primary)" />
                            </div>
                            <span>123 Main Food Street, Jhang, Punjab</span>
                        </a>
                        <a href="tel:+923001234567" style={{ ...listItemStyle, textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%' }}>
                                <FaPhoneAlt size={18} color="var(--primary)" />
                            </div>
                            <span>+92 300 1234567</span>
                        </a>
                        <a href="mailto:info@sialfoodies.com" style={{ ...listItemStyle, textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%' }}>
                                <FaEnvelope size={18} color="var(--primary)" />
                            </div>
                            <span>info@sialfoodies.com</span>
                        </a>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <SocialIcon Icon={FaFacebook} color="#1877F2" />
                        <SocialIcon Icon={FaInstagram} color="#E4405F" />
                        <SocialIcon Icon={FaWhatsapp} color="#25D366" />
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', opacity: 0.6, fontSize: '0.9rem', letterSpacing: '1px' }}>
                &copy; {new Date().getFullYear()} <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Sial Foodies</span>. All rights reserved. Created by Umar Ali Sial.
            </div>
        </footer>
    );
};

const SocialIcon = ({ Icon, color }) => (
    <a href="#" style={{
        background: 'white',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'transform 0.2s, background 0.2s'
    }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = color; e.currentTarget.children[0].style.fill = 'white'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'white'; e.currentTarget.children[0].style.fill = color; }}
    >
        <Icon size={20} color={color} style={{ transition: 'fill 0.2s' }} />
    </a>
);

export default Footer;
