import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { formatCurrency } from '../utils/currency';

const Checkout = () => {
    const { cart, getTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customerName: '',
        customerAddress: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        try {
            const orderData = {
                customerName: formData.customerName,
                customerAddress: formData.customerAddress,
                totalAmount: getTotal(),
                items: cart.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price }))
            };

            const res = await api.post('/orders', orderData);
            clearCart();
            const orderId = res.data.orderId || Math.floor(Math.random() * 10000); // Fallback if no ID returned
            navigate(`/order-summary`, { state: { orderId, ...orderData, items: cart } }); // Pass data for summary display
        } catch (err) {
            console.error(err);
            alert('Order failed. Please try again.');
        }
    };

    if (cart.length === 0) return <div className="container">Cart is empty</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '600px' }}>
            <h2>Checkout</h2>
            <div className="card" style={{ marginTop: '1rem' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label>Full Name</label>
                        <input
                            type="text"
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                            value={formData.customerName}
                            onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Address</label>
                        <textarea
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                            value={formData.customerAddress}
                            onChange={e => setFormData({ ...formData, customerAddress: e.target.value })}
                        ></textarea>
                    </div>
                    <div>
                        <h3>Total to Pay: {formatCurrency(getTotal())}</h3>
                        <p className="text-muted">Payment Method: Cash on Delivery (Mock)</p>
                    </div>
                    <button type="submit" className="btn btn-primary">Place Order</button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
