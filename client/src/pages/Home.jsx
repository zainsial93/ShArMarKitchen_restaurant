import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import ReviewsSection from '../components/ReviewsSection';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // For Toast

const Home = () => {
    const { user } = useAuth();
    const { addToast } = useCart(); // Reuse toast from cart context

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Welcome Toast logic
    useEffect(() => {
        if (user) {
            // Check session to show only once per login session
            const welcomed = sessionStorage.getItem('loginWelcome');
            if (!welcomed) {
                addToast(`👋 Welcome back, ${user.username}!`);
                sessionStorage.setItem('loginWelcome', 'true');
            }
        }
    }, [user]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // Detail Modal State
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/products/categories/all')
                ]);
                setProducts(prodRes.data);
                setCategories(catRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const openDetail = (product) => {
        // Find related items (same category, not same id)
        const related = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id);
        setRelatedProducts(related);
        setSelectedProduct(product);
    };

    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true;
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

    if (!user) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>Welcome to Our Store!</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#666' }}>Please login to view our exclusive products and place an order.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/login" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Login</Link>
                    <Link to="/signup" className="btn" style={{ padding: '0.8rem 2rem', background: '#eee' }}>Sign Up</Link>
                </div>

                {/* Display Reviews Section even for guests */}
                <div style={{ marginTop: '5rem', textAlign: 'left' }}>
                    <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>Customer Reviews</h2>
                    <ReviewsSection />
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>

            {/* Search and Category Chips */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#444' }}>Search & Filter Menu</h2>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ padding: '1rem', borderRadius: '2rem', border: '1px solid #e2e8f0', width: '100%', fontSize: '1rem', boxShadow: 'var(--shadow)' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
                    <button
                        onClick={() => setSelectedCategory(null)}
                        style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '2rem',
                            border: 'none',
                            background: selectedCategory === null ? 'var(--primary)' : 'white',
                            color: selectedCategory === null ? 'white' : 'var(--text-main)',
                            boxShadow: 'var(--shadow)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '0.6rem 1.2rem',
                                borderRadius: '2rem',
                                border: 'none',
                                background: selectedCategory === cat.id ? 'var(--primary)' : 'white',
                                color: selectedCategory === cat.id ? 'white' : 'var(--text-main)',
                                boxShadow: 'var(--shadow)',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '2rem'
            }}>
                {filteredProducts.map(product => (
                    <div key={product.id} onClick={() => openDetail(product)}>
                        {/* Wrapper to handle click */}
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No products found.</p>
            )}

            {/* Detail Modal */}
            <ProductDetailModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                product={selectedProduct}
                relatedProducts={relatedProducts}
            />

        </div>
    );
};

export default Home;
