import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { subProductsMap, topicsData } from '../data/productsData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight, Star } from 'lucide-react';
import './CSS/BestSellers.css';

// Manually curated bestseller product references
const BESTSELLER_REFS = [
    { topicId: 2, productId: '2-7' },  // Flexy Shark
    { topicId: 2, productId: '2-2' },  // Commando
    { topicId: 2, productId: '2-1' },  // Standing Alphabets
    { topicId: 3, productId: '3-3' },  // Honeycomb Stand
    { topicId: 5, productId: '5-1' },  // Mini F1 Car
    { topicId: 4, productId: '4-1' },  // Minimalist Headphone Stand
];

const BestSellers = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const revealRef = useScrollReveal();

    const bestsellers = BESTSELLER_REFS.map(({ topicId, productId }) => {
        const products = subProductsMap[topicId] || [];
        const product = products.find(p => p.id === productId);
        const topic = topicsData.find(t => t.id === topicId);
        return product && topic ? { ...product, topicId, topic } : null;
    }).filter(Boolean);

    const handleCardClick = (item) => {
        navigate(`/product/${item.topicId}/${item.id}`);
    };

    const handleAddToCart = (e, item) => {
        e.stopPropagation();
        addToCart({
            id: item.id,
            title: `${item.topic.title}: ${item.name}`,
            price: item.price,
            image: item.images && item.images[0] ? item.images[0] : null,
        });
    };

    const handleViewCatalog = (e) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById('products');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="bestsellers-premium">
            <div className="container" ref={revealRef}>
                <div className="header-centered-p reveal-hidden">
                    <div className="eyebrow">
                        <Star size={14} />
                        Most Loved Creations
                    </div>
                    <h2 className="section-title-premium">Our Bestsellers</h2>
                    <p className="section-desc-premium">
                        Meticulously crafted, highly-rated pieces that define our standard of excellence.
                    </p>
                </div>

                <div className="bestsellers-grid-premium">
                    {bestsellers.map((item, index) => (
                        <div
                            key={item.id}
                            className={`bs-card-premium reveal-hidden reveal-stagger-${(index % 3) + 1}`}
                            onClick={() => handleCardClick(item)}
                        >
                            <div className="bs-card-visual">
                                {item.images && item.images[0] ? (
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="bs-card-img-premium"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300x280?text=Product';
                                        }}
                                    />
                                ) : (
                                    <div className="bs-card-placeholder-premium">🎁</div>
                                )}
                                {item.customizable ? (
                                    <span className="bs-card-tag tag-personalized">Personalized</span>
                                ) : (
                                    <span className="bs-card-tag tag-signature">Signature</span>
                                )}
                                <div className="bs-card-overlay-premium">
                                    <span className="bs-overlay-topic">{item.topic.title}</span>
                                </div>
                            </div>
                            <div className="bs-card-content-premium">
                                <div className="bs-card-top">
                                    <h3 className="bs-card-title-premium">{item.name}</h3>
                                    <p className="bs-card-description-premium">{item.desc}</p>
                                </div>
                                <div className="bs-card-bottom-premium">
                                    <div className="bs-card-pricing-premium">
                                        <span className="bs-currency">₹</span>
                                        <span className="bs-price-val">
                                            {item.price === 0 ? 'Quote' : item.price}
                                        </span>
                                    </div>
                                    <button
                                        className="bs-action-btn-premium"
                                        onClick={(e) => item.price > 0 ? handleAddToCart(e, item) : e.stopPropagation()}
                                    >
                                        {item.price === 0 ? (
                                            <>Customize <ArrowRight size={16} /></>
                                        ) : (
                                            <>Add to Cart</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bestsellers-footer-premium reveal-hidden">
                    <Link 
                        to="/#products" 
                        className="btn-premium btn-secondary-p"
                        onClick={handleViewCatalog}
                    >
                        <span>View Entire Catalog</span>
                        <ArrowRight size={18} className="btn-arrow-p" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
