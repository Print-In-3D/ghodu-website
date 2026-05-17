import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
    ArrowLeft, 
    ShoppingCart, 
    ShieldCheck, 
    Truck, 
    Zap, 
    Scale, 
    Box, 
    PenTool, 
    HelpCircle
} from 'lucide-react';
import './CSS/SubProductDetails.css';

const SubProductDetails = () => {
    const { topicsData, subProductsMap } = useData();
    const { topicId, productId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const revealRef = useScrollReveal();
    
    const [customText, setCustomText] = useState('');
    const [error, setError] = useState('');
    const [activeImg, setActiveImg] = useState(0);
    const [isAdded, setIsAdded] = useState(false);

    // Optimized Data Lookups (Stable for Refactor)
    const topic = useMemo(() => topicsData.find(t => t.id === Number(topicId)), [topicId]);
    const products = useMemo(() => subProductsMap[topicId] || [], [topicId]);
    const product = useMemo(() => products.find(p => p.id === productId), [products, productId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    if (!product || !topic) return <div className="error-container">Product not found</div>;

    const handleAddToCart = () => {
        setError('');
        
        // Ensure we pass the customization text under the key expected by CartContext
        addToCart({
            id: product.id,
            title: `${topic.title}: ${product.name}`,
            price: product.price,
            image: product.images[activeImg] || null,
            customizationText: product.customizable ? customText : null
        });
        
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="pdp-premium">
            <div className="container" ref={revealRef}>
                {/* Back Navigation */}
                <button className="pdp-back-btn" onClick={() => navigate(`/product/${topicId}`)}>
                    <ArrowLeft size={18} />
                    Back to {topic.title}
                </button>

                <div className="pdp-main-grid">
                    {/* Gallery Section */}
                    <div className="pdp-gallery-container reveal-hidden">
                        <div className="pdp-main-viewport glass-panel">
                            {product.images && product.images[activeImg] ? (
                                <img 
                                    src={product.images[activeImg]} 
                                    alt={product.name} 
                                    className="pdp-main-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/600x600?text=Premium+3D+Creation';
                                    }}
                                />
                            ) : (
                                <div className="pdp-image-placeholder">🎁</div>
                            )}
                            <div className="pdp-zoom-hint">Hover to explore details</div>
                        </div>
                        <div className="pdp-thumbnails">
                            {product.images && product.images.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className={`pdp-thumb ${activeImg === idx ? 'active' : ''}`}
                                    onClick={() => setActiveImg(idx)}
                                >
                                    <img 
                                        src={img} 
                                        alt={`View ${idx + 1}`} 
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/100x100?text=3D';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Information Section */}
                    <div className="pdp-info-panel reveal-hidden reveal-stagger-1">
                        <div className="pdp-header">
                            <div className="pdp-category-label">{topic.title}</div>
                            <h1 className="pdp-title">{product.name}</h1>
                            <div className="pdp-price-tag">
                                <span className="pdp-currency">₹</span>
                                <span className="pdp-val">{product.price === 0 ? 'Quote Required' : product.price}</span>
                            </div>
                        </div>

                        <div className="pdp-storytelling">
                            <h3 className="section-title-pdp">The Craftsmanship</h3>
                            <p className="pdp-full-desc">{product.fullDetails || product.desc}</p>
                        </div>

                        {/* Attribute Cards Grid */}
                        <div className="pdp-attributes">
                            {product.specs && Object.entries(product.specs).map(([key, value]) => (
                                <div key={key} className="attribute-card">
                                    <div className="attr-icon-wrap">
                                        {key.toLowerCase().includes('material') ? <Box size={16} /> : 
                                         key.toLowerCase().includes('size') ? <Scale size={16} /> : 
                                         <Zap size={16} />}
                                    </div>
                                    <div className="attr-info">
                                        <span className="attr-label">{key}</span>
                                        <span className="attr-value">{value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Why You'll Love It (Premium Highlight Section) */}
                        <div className="pdp-benefits-grid reveal-hidden reveal-stagger-2">
                            <div className="benefit-card">
                                <div className="benefit-icon-box">
                                    <Zap size={22} />
                                </div>
                                <div className="benefit-content">
                                    <h4>Precision Layering</h4>
                                    <p>Industrial-grade resolution ensuring every curve and detail is captured with professional clarity.</p>
                                </div>
                                <div className="benefit-glow"></div>
                            </div>
                            <div className="benefit-card">
                                <div className="benefit-icon-box">
                                    <ShieldCheck size={22} />
                                </div>
                                <div className="benefit-content">
                                    <h4>Studio Quality</h4>
                                    <p>Each piece undergoes a rigorous multi-point inspection and hand-finishing process before shipping.</p>
                                </div>
                                <div className="benefit-glow"></div>
                            </div>
                        </div>

                        {/* Signature Attributes (Pills) */}
                        {product.features && (
                            <div className="pdp-tags-section">
                                <span className="pdp-small-title">Signature Highlights</span>
                                <div className="pdp-tags-grid">
                                    {product.features.map((feat, i) => (
                                        <span key={i} className="pdp-tag-pill">{feat}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Customization Experience */}
                        {product.customizable && (
                            <div className="pdp-customization-studio reveal-hidden reveal-stagger-3">
                                <div className="studio-header">
                                    <div className="studio-title-wrap">
                                        <PenTool size={20} className="studio-icon" />
                                        <h3 className="studio-title">Customization Studio</h3>
                                    </div>
                                    <span className="studio-badge">Bespoke Option</span>
                                </div>
                                
                                <div className="studio-content glass-panel">
                                    <label className="studio-label">
                                        Personalize your creation
                                        <span className="studio-label-hint">Add your custom text, initials, or special instructions.</span>
                                    </label>
                                    
                                    <div className="studio-input-wrap">
                                        <textarea 
                                            className={`studio-textarea ${error ? 'error' : ''}`}
                                            placeholder="e.g. 'GHOST-01' or 'Happy Birthday John'..."
                                            value={customText}
                                            onChange={(e) => setCustomText(e.target.value)}
                                        />
                                        <div className="studio-focus-border"></div>
                                    </div>
                                    
                                    <div className="studio-footer">
                                        <div className="studio-status">
                                            <div className="status-dot pulsing"></div>
                                            <span>Hand-crafted to order</span>
                                        </div>
                                        <p className="studio-microcopy">Make it uniquely yours. Our designers will optimize your text for the perfect print.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="pdp-actions">
                            <button 
                                className={`btn-pdp-main ${isAdded ? 'success' : ''}`}
                                onClick={handleAddToCart}
                                disabled={product.price === 0}
                            >
                                {isAdded ? (
                                    <>Success! Added</>
                                ) : (
                                    <>
                                        <ShoppingCart size={20} />
                                        {product.price === 0 ? 'Request Quote via WhatsApp' : 'Add to Collection'}
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="pdp-trust-bar">
                            <div className="trust-item">
                                <ShieldCheck size={18} />
                                <span>High Strength PLA</span>
                            </div>
                            <div className="trust-item">
                                <Truck size={18} />
                                <span>Pan-India Delivery</span>
                            </div>
                            <div className="trust-item">
                                <HelpCircle size={18} />
                                <span>Expert Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className={`pdp-mobile-sticky ${product.price === 0 ? 'hide' : ''}`}>
                <div className="mobile-sticky-inner">
                    <div className="mobile-sticky-price">
                        <span className="sticky-currency">₹</span>
                        <span className="sticky-val">{product.price}</span>
                    </div>
                    <button className="btn-sticky-add" onClick={handleAddToCart}>
                        {isAdded ? 'Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubProductDetails;
