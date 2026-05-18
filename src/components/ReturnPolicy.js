import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { RefreshCcw, CheckCircle2, XCircle, Clock, MessageSquare, AlertTriangle } from 'lucide-react';
import './CSS/PolicyPages.css';

const ReturnPolicy = () => {
    const revealRef = useScrollReveal();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="policy-page-premium" ref={revealRef}>
            <header className="policy-hero-premium reveal-hidden">
                <div className="container">
                    <div className="policy-badge">Customer Satisfaction</div>
                    <h1 className="policy-title-main">Return & Refund Policy</h1>
                    <div className="policy-meta">
                        <span>Reliability First</span>
                        <div className="meta-dot"></div>
                        <span>Last updated: May 2026</span>
                    </div>
                </div>
            </header>

            <section className="policy-content-section">
                <div className="container-narrow">
                    <div className="policy-document glass-panel reveal-hidden reveal-stagger-1">



                        <div className="policy-block">
                            <div className="block-header">
                                <CheckCircle2 size={20} className="block-icon success" />
                                <h2>Valid Return Cases</h2>
                            </div>
                            <p>We provide full replacements or refunds in the following scenarios:</p>
                            <ul className="policy-list">
                                <li><strong>Shipping Damage:</strong> Items that arrive broken or unusable due to transit.</li>
                                <li><strong>Manufacturing Defect:</strong> Significant structural failures or deformations.</li>
                                <li><strong>Customization Error:</strong> If we print text different from your provided details.</li>
                                <li><strong>Incorrect Item:</strong> Receipt of a product not listed in your order.</li>
                            </ul>
                        </div>

                        <div className="policy-block">
                            <div className="block-header">
                                <XCircle size={20} className="block-icon error" />
                                <h2>Non-Returnable Scenarios</h2>
                            </div>
                            <ul className="policy-list">
                                <li>Customer errors in customization text or color choice.</li>
                                <li>Minor texture variations inherent to the layer-by-layer printing process.</li>
                                <li>Damage caused by dropping or mishandling the product post-delivery.</li>
                                <li>Requests made after 48 hours of successful delivery.</li>
                            </ul>
                        </div>

                        <div className="policy-block">
                            <div className="block-header">
                                <Clock size={20} className="block-icon" />
                                <h2>The Refund Process</h2>
                            </div>
                            <p>Once your claim is validated via WhatsApp:</p>
                            <ul className="policy-list">
                                <li><strong>Refunds:</strong> Processed within 5-7 business days to your original payment method.</li>
                                <li><strong>Replacements:</strong> Prioritized and shipped within 7-10 business days.</li>
                            </ul>
                        </div>

                        <div className="policy-block">
                            <div className="block-header">
                                <RefreshCcw size={20} className="block-icon" />
                                <h2>Cancellations</h2>
                            </div>
                            <p>
                                Orders can only be cancelled within <strong>2 hours</strong> of placement.
                                Beyond this window, material and machine allocation have already begun.
                            </p>
                        </div>

                        <div className="policy-footer-cta">
                            <h3>Need to open a claim?</h3>
                            <p>Send clear photos of the issue to our WhatsApp team.</p>
                            <a href="#!" onClick={(e) => { e.preventDefault(); window.open('https://wa.me/917043591952', '_blank'); }} className="btn-policy-whatsapp">
                                <MessageSquare size={18} /> Contact Support
                            </a>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReturnPolicy;
