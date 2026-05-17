import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { FileText, Shield, CreditCard, Scale, Truck, AlertCircle } from 'lucide-react';
import './CSS/PolicyPages.css';

const TermsAndConditions = () => {
    const revealRef = useScrollReveal();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="policy-page-premium" ref={revealRef}>
            <header className="policy-hero-premium reveal-hidden">
                <div className="container">
                    <div className="policy-badge">Legal Documentation</div>
                    <h1 className="policy-title-main">Terms & Conditions</h1>
                    <div className="policy-meta">
                        <span>Version 2.0</span>
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
                                <FileText size={20} className="block-icon" />
                                <h2>1. Acceptance of Terms</h2>
                            </div>
                            <p>
                                By accessing and using the Print-IN 3D Creations platform and placing any orders, 
                                you signify your irrevocable acceptance to be bound by these Terms and Conditions. 
                                These terms constitute a legally binding agreement between you and our studio.
                            </p>
                        </div>

                        <div className="policy-block">
                            <div className="block-header">
                                <Shield size={20} className="block-icon" />
                                <h2>2. Customization & Manufacturing</h2>
                            </div>
                            <p>
                                Every item is manufactured using Fused Deposition Modeling (FDM) 3D printing. 
                                Due to the nature of additive manufacturing:
                            </p>
                            <ul className="policy-list">
                                <li><strong>Process Variance:</strong> Minor variations in layer texture or color (±5%) are inherent and not considered defects.</li>
                                <li><strong>Content Rights:</strong> We reserve the right to refuse any customization involving offensive or copyrighted material.</li>
                                <li><strong>Final Output:</strong> Product images are digital representations; actual physical objects may have unique 3D characteristics.</li>
                            </ul>
                        </div>

                        <div className="policy-block">
                            <div className="block-header">
                                <CreditCard size={20} className="block-icon" />
                                <h2>3. Ordering & Payments</h2>
                            </div>
                            <p>
                                Orders are processed through our verified WhatsApp Business channel. 
                                An order is only "Active" once payment confirmation is received.
                            </p>
                            <ul className="policy-list">
                                <li><strong>Payment:</strong> We accept UPI and major Bank Transfers.</li>
                                <li><strong>Cancellations:</strong> Due to immediate file preparation, cancellations are only permitted within 2 hours of payment.</li>
                            </ul>
                        </div>

                        <div className="policy-block">
                            <div className="block-header">
                                <Truck size={20} className="block-icon" />
                                <h2>4. Logistics</h2>
                            </div>
                            <p>
                                We partner with leading logistics providers for Pan-India delivery.
                            </p>
                            <ul className="policy-list">
                                <li><strong>Timeline:</strong> Standard delivery is 5-7 business days post-manufacturing.</li>
                                <li><strong>Liability:</strong> We are not responsible for delays caused by carrier partners or incorrect shipping addresses.</li>
                            </ul>
                        </div>

                        <div className="policy-block">
                            <div className="block-header">
                                <Scale size={20} className="block-icon" />
                                <h2>5. Intellectual Property</h2>
                            </div>
                            <p>
                                All digital files, 3D designs, and visual assets on this platform remain the sole 
                                property of Print-IN 3D Creations. Any unauthorized reproduction or commercial 
                                use will be subject to legal action.
                            </p>
                        </div>

                        <div className="policy-block">
                            <div className="block-header">
                                <AlertCircle size={20} className="block-icon" />
                                <h2>6. Liability</h2>
                            </div>
                            <p>
                                Our maximum liability for any order is strictly limited to the transaction value 
                                of the specific item purchased. We are not liable for incidental damages.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsAndConditions;
