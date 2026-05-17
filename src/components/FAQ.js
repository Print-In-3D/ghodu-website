import React, { useState, useMemo } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
    Search,
    Info,
    Truck,
    Package,
    CreditCard,
    Plus,
    Minus,
    HelpCircle
} from 'lucide-react';
import './CSS/FAQ.css';

const faqData = [
    {
        category: "General",
        icon: Info,
        items: [
            {
                q: "What is 3D printing and how does it work?",
                a: "3D printing, or additive manufacturing, is the process of making three-dimensional solid objects from a digital file. Our printers build objects layer-by-layer using high-quality PLA plastic."
            },
            {
                q: "Is the material durable?",
                a: "Yes! We use high-strength PLA and PETG. While 3D prints are lightweight, they are quite durable for décor, collectibles, and functional prototypes."
            }
        ]
    },
    {
        category: "Ordering",
        icon: Package,
        items: [
            {
                q: "How do I place a custom order?",
                a: "Browse our products, select your customization options, and hit 'Order via WhatsApp'. This sends us your exact choices instantly for confirmation."
            },
            {
                q: "Can I cancel my order?",
                a: "Since products are made-to-order, cancellations are only possible within 12 hours of placing the order, before the printing process begins."
            }
        ]
    },
    {
        category: "Shipping",
        icon: Truck,
        items: [
            {
                q: "How long does shipping take?",
                a: "Standard delivery takes 5-7 business days. Printing typically takes 1-3 days, followed by express shipping pan-India."
            },
            {
                q: "Do you offer tracking?",
                a: "Yes! Once your order is shipped, we will share the tracking link with you directly on WhatsApp."
            }
        ]
    },
    {
        category: "Payments",
        icon: CreditCard,
        items: [
            {
                q: "How do I pay?",
                a: "We currently accept payments via UPI, Google Pay, and PhonePe. Payment details are shared during our WhatsApp consultation."
            }
        ]
    }
];

const FAQ = ({ standalone = false }) => {
    const revealRef = useScrollReveal();
    const [openIndex, setOpenIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', ...faqData.map(d => d.category)];

    const filteredData = useMemo(() => {
        let data = faqData;
        if (activeCategory !== 'All') {
            data = faqData.filter(d => d.category === activeCategory);
        }
        if (searchQuery.trim()) {
            return data.map(section => ({
                ...section,
                items: section.items.filter(item =>
                    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.a.toLowerCase().includes(searchQuery.toLowerCase())
                )
            })).filter(section => section.items.length > 0);
        }
        return data;
    }, [activeCategory, searchQuery]);

    const toggleFAQ = (id) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <section className={`faq-premium ${standalone ? 'standalone' : ''}`} id="faq">
            <div className="container" ref={revealRef}>

                {/* ── Support Hero ── */}
                <div className="header-centered-p reveal-hidden">
                    <span className="eyebrow">Help Center</span>
                    <h1 className="faq-title-main">Common Questions</h1>
                    <p className="faq-subtitle">
                        Can't find what you're looking for? Reach out to our human support team.
                    </p>

                    {standalone && (
                        <div className="faq-search-wrap">
                            <Search size={20} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {/* ── Category Chips ── */}
                {standalone && (
                    <div className="faq-categories-wrap reveal-hidden">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`cat-chip ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                <div className="faq-main-content">
                    {filteredData.length > 0 ? (
                        filteredData.map((section, sIdx) => {
                            const CategoryIcon = section.icon;
                            return (
                                <div key={sIdx} className="faq-group reveal-hidden reveal-stagger-1">
                                    <div className="faq-group-header">
                                        <CategoryIcon size={18} />
                                        <h3>{section.category}</h3>
                                    </div>
                                    <div className="faq-accordion">
                                        {section.items.map((item, iIdx) => {
                                            const id = `${sIdx}-${iIdx}`;
                                            const isOpen = openIndex === id;
                                            return (
                                                <div key={id} className={`faq-row ${isOpen ? 'active' : ''}`}>
                                                    <button className="faq-trigger" onClick={() => toggleFAQ(id)}>
                                                        <span className="q-text">{item.q}</span>
                                                        <div className="q-icon">
                                                            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                                        </div>
                                                    </button>
                                                    <div className="faq-content">
                                                        <div className="faq-content-inner">
                                                            <p>{item.a}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="faq-no-results">
                            <HelpCircle size={48} />
                            <p>No matches found for "{searchQuery}"</p>
                            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>Clear Filters</button>
                        </div>
                    )}
                </div>

                {/* ── Human Support CTA ── */}

            </div>
        </section>
    );
};

export default FAQ;
