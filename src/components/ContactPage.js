import React, { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
    MessageSquare,
    Mail,
    Phone,
    Clock,
    ShieldCheck,
    Globe,
    CheckCircle2,
    ChevronDown,
    Zap,
    Target,
    Sparkles
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './CSS/Contact.css';

const ContactPage = () => {
    const form = useRef();
    const revealRef = useScrollReveal();
    const [status, setStatus] = useState(null); // 'success', 'error', 'loading'
    const [activeFaq, setActiveFaq] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        message: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const toggleFaq = (idx) => {
        setActiveFaq(activeFaq === idx ? null : idx);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');

        const phoneNumber = "917043591952";
        const text = `Hi Print-IN 3D, I'm ${formData.name}.\n\nI would like to submit a project inquiry.\n\nProject Details:\n${formData.message}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
        window.location.href = whatsappUrl;

        setStatus('success');
        setFormData({ name: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
    };

    const faqs = [
        { q: "How long does delivery take?", a: "Standard shipping takes 5-7 business days pan-India." },
        { q: "What materials do you use?", a: "We primarily use premium, eco-friendly PLA and PETG." },
        { q: "Can I get a bulk discount?", a: "Yes, for orders over 10 units, we offer volume pricing." }
    ];

    return (
        <div className="contact-page-premium" ref={revealRef}>
            <Helmet>
                <title>Contact Our 3D Printing Studio | Print-IN 3D</title>
                <meta name="description" content="Get in touch with Print-IN 3D. Submit a custom 3D printing project inquiry, request industrial prototyping quotes, or ask about our custom gift products." />
                <meta name="keywords" content="3d printing, contact 3d printing, custom 3d printing service, buy 3d printed gifts, print in 3d" />
                <meta property="og:title" content="Contact Our 3D Printing Studio | Print-IN 3D" />
                <meta property="og:description" content="Get in touch with Print-IN 3D. Submit a custom 3D printing project inquiry, request industrial prototyping quotes, or ask about our custom gift products." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.printin3d.in/contact" />
                <meta property="og:image" content="https://www.printin3d.in/favicon.webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Our 3D Printing Studio | Print-IN 3D" />
                <meta name="twitter:description" content="Get in touch with Print-IN 3D. Submit a custom 3D printing project inquiry, request industrial prototyping quotes, or ask about our custom gift products." />
                <meta name="twitter:image" content="https://www.printin3d.in/favicon.webp" />
            </Helmet>
            {/* ── CINEMATIC HERO ── */}
            <header className="contact-hero-cinematic reveal-hidden">
                <div className="container">
                    <div className="hero-content-p">
                        <span className="hero-eyebrow-p">Engineering Your Vision</span>
                        <h1 className="hero-title-p">Let's Print the <br /><span className="text-gradient-brand">Future.</span></h1>
                        <p className="hero-subtitle-p">
                            From rapid industrial prototyping to bespoke consumer products,
                            our studio provides the technical expertise and manufacturing
                            capacity your project deserves.
                        </p>

                        {/* Hero Trust Bar */}
                        <div className="hero-trust-bar-p">
                            <div className="trust-p-item">
                                <Clock size={18} />
                                <span>Fast Response</span>
                            </div>
                            <div className="trust-p-item">
                                <ShieldCheck size={18} />
                                <span>Quality Assured</span>
                            </div>
                            <div className="trust-p-item">
                                <Globe size={18} />
                                <span>Pan-India Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative Background Element */}
                <div className="hero-bg-accent-p"></div>
            </header>

            {/* ── MAIN CONTENT GRID ── */}
            <main className="contact-main-grid-p">
                <div className="container">
                    <div className="page-grid-p">

                        {/* LEFT COLUMN: Authority & Support */}
                        <div className="column-authority reveal-hidden reveal-stagger-1">

                            {/* Why Choose Us Section */}
                            <div className="authority-section-p">
                                <h3 className="column-label-p">The Print-IN Difference</h3>
                                <div className="benefit-stack-p">
                                    <div className="benefit-card-p">
                                        <div className="b-icon-p"><Zap size={20} /></div>
                                        <div className="b-info-p">
                                            <h4>Exacting craftsmanship</h4>
                                            <p>Professional grade additive manufacturing with hand-inspected finishes.</p>
                                        </div>
                                    </div>
                                    <div className="benefit-card-p">
                                        <div className="b-icon-p"><Sparkles size={20} /></div>
                                        <div className="b-info-p">
                                            <h4>Bespoke Customization</h4>
                                            <p>Tailored material selection and design optimization for every project.</p>
                                        </div>
                                    </div>
                                    <div className="benefit-card-p">
                                        <div className="b-icon-p"><Target size={20} /></div>
                                        <div className="b-info-p">
                                            <h4>Eco-Friendly Core</h4>
                                            <p>Primarily utilizing sustainable, corn-starch based biodegradable PLA.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Direct Channels Card */}
                            <div className="contact-channels-card-p glass-panel">
                                <h3 className="card-title-p">Direct Channels</h3>
                                <div className="channel-rows-p">
                                    <div className="channel-row-p">
                                        <Mail size={18} />
                                        <div className="c-info-p">
                                            <label>Studio Email</label>
                                            <p>printin3dcreations@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="channel-row-p">
                                        <Phone size={18} />
                                        <div className="c-info-p">
                                            <label>WhatsApp Business</label>
                                            <p>+91 70435 91952</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Quick Help */}
                            <div className="quick-help-section-p">
                                <h3 className="column-label-p">Quick Support</h3>
                                <div className="mini-faq-stack-p">
                                    {faqs.map((faq, idx) => (
                                        <div
                                            key={idx}
                                            className={`mini-faq-item-p ${activeFaq === idx ? 'active' : ''}`}
                                            onClick={() => toggleFaq(idx)}
                                        >
                                            <div className="faq-q-p">
                                                <span>{faq.q}</span>
                                                <ChevronDown size={14} className="faq-arrow-p" />
                                            </div>
                                            <div className="faq-a-p">{faq.a}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: The Portal */}
                        <div className="column-portal reveal-hidden reveal-stagger-2">
                            <div className="portal-form-card-p glass-panel">
                                <div className="portal-header-p">
                                    <h2 className="portal-title-p">Inquiry Portal</h2>
                                    <p className="portal-subtitle-p">Let's get started with your requirement.</p>
                                </div>

                                <form ref={form} onSubmit={handleSubmit} className="portal-form-p">
                                    <div className="portal-field-p">
                                        <label htmlFor="name">Professional Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="e.g. John Doe"
                                            className="portal-input-p"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="portal-field-p">
                                        <label htmlFor="message">Requirement Details</label>
                                        <textarea
                                            id="message"
                                            placeholder="Describe your vision, specific dimensions, material preferences, or bulk quantities..."
                                            rows="6"
                                            className="portal-textarea-p"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className={`btn-portal-submit-p ${status === 'loading' ? 'loading' : ''}`}
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? 'Processing...' : (
                                            <><MessageSquare size={18} /> <span>Initiate WhatsApp Quote</span></>
                                        )}
                                    </button>

                                    {status === 'success' && (
                                        <div className="portal-status-msg-p success">
                                            <CheckCircle2 size={16} /> Redirection successful! Complete the quote on WhatsApp.
                                        </div>
                                    )}
                                    {status === 'error' && (
                                        <div className="portal-status-msg-p error">
                                            Transmission failed. Please use WhatsApp directly.
                                        </div>
                                    )}

                                    <p className="portal-security-note-p">
                                        <ShieldCheck size={12} />
                                        Secure end-to-end project encryption.
                                    </p>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;
