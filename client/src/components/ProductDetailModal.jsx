import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/currency';

const ProductDetailModal = ({ product, relatedProducts, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const [selectedVariant, setSelectedVariant] = useState(null);

    React.useEffect(() => {
        if (product && product.variants && product.variants.length > 0) {
            setSelectedVariant(product.variants[0]);
        } else {
            setSelectedVariant(null);
        }
    }, [product]);

    if (!isOpen || !product) return null;

    const currentPrice = selectedVariant ? selectedVariant.price : product.price;

    return (
        <div className="blur-backdrop" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 1100, display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: '2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
                style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', padding: '0' }}
            >
                <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                    {/* Image Side */}
                    <div style={{ height: '400px', background: '#f0f0f0' }}>
                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Info Side */}
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{product.name}</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>{product.description}</p>

                        {product.variants && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Options:</label>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {product.variants.map((v, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedVariant(v)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                border: selectedVariant?.label === v.label ? '2px solid var(--primary)' : '1px solid #ddd',
                                                background: selectedVariant?.label === v.label ? 'var(--primary)' : 'white',
                                                color: selectedVariant?.label === v.label ? 'white' : 'black',
                                                borderRadius: '2rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {v.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                                {formatCurrency(currentPrice)}
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}
                                onClick={() => {
                                    addToCart(product, selectedVariant);
                                    onClose();
                                }}
                            >
                                Add to Order
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div style={{ padding: '2rem', background: '#f8fafc' }}>
                    <h3 style={{ marginBottom: '1rem' }}>You might also like</h3>
                    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                        {relatedProducts.slice(0, 4).map(rel => (
                            <div key={rel.id} style={{ minWidth: '200px', background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: 'var(--shadow)' }}>
                                <img src={rel.imageUrl} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
                                <h5 style={{ margin: '0.5rem 0' }}>{rel.name}</h5>
                                <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{formatCurrency(rel.price)}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default ProductDetailModal;
