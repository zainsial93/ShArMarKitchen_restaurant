import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

const ProductCard = ({ product }) => {
    // ProductCard is now mostly display. Click logic is handled by parent to open modal.
    // BUT, we still want a quick "Add" button here too for convenience? 
    // User asked for "Click product -> opens detail".
    // Let's keep the card simple, maybe just a slightly different layout.
    // Actually, standard card is fine, but we'll remove manual variant selector here to keep it clean, 
    // forcing them to open detail for variants if they want.

    // NOTE: To follow user instruction precisely: "When user clicks... detail page should open".
    // So the add to cart button here might be secondary or we can keep it for quick add of 'default'.

    const { addToCart } = useCart();

    const handleQuickAdd = (e) => {
        e.stopPropagation(); // Don't open detail modal
        addToCart(product, product.variants ? product.variants[0] : null);
    };

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer', border: 'none', boxShadow: 'var(--shadow)' }}>
            <div style={{ height: '220px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem', background: '#f8fafc', position: 'relative' }}>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                    className="product-img"
                />
                {product.variants && (
                    <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '500' }}>
                        {product.variants.length} Options
                    </span>
                )}
            </div>

            <h3 style={{ marginBottom: '0.25rem', fontSize: '1.1rem', fontWeight: '600' }}>{product.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {product.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary)' }}>
                    {formatCurrency(product.price)}
                </span>
                <button className="btn btn-primary" onClick={handleQuickAdd} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
