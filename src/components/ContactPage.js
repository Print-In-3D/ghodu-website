import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
    Send,
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
import './CSS/Contact.css';

const ContactPage = () => {
    const form = useRef();
    const revealRef = useScrollReveal();
    const [type, setType] = useState('say-hi');
    const [status, setStatus] = useState(null); // 'success', 'error', 'loading'
    const [activeFaq, setActiveFaq] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
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

        if (type === 'quote') {
            const phoneNumber = "917043591952";
            const text = `Hi Print-IN, I'm ${formData.name}. I'd like to place a new order. Details: ${formData.message}`;
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
            window.open(whatsappUrl, '_blank');
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(null), 5000);
        } else {
            emailjs.sendForm('service_xvvx1of', 'template_g72lmq6', form.current, 'PJWLNVamk0BXaXntd')
                .then(() => {
                    setStatus('success');
                    setFormData({ name: '', email: '', message: '' });
                    setTimeout(() => setStatus(null), 5000);
                }, () => {
                    setStatus('error');
                    setTimeout(() => setStatus(null), 5000);
                });
        }
    };

    const faqs = [
        { q: "How long does delivery take?", a: "Standard shipping takes 5-7 business days pan-India." },
        { q: "What materials do you use?", a: "We primarily use premium, eco-friendly PLA and PETG." },
        { q: "Can I get a bulk discount?", a: "Yes, for orders over 10 units, we offer volume pricing." }
    ];

    return (
        <div className="contact-page-premium" ref={revealRef}>
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
                                            <h4>Industrial Precision</h4>
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
                                    <p className="portal-subtitle-p">Select your requirement and let's get started.</p>
                                </div>

                                <form ref={form} onSubmit={handleSubmit} className="portal-form-p">
                                    <div className="portal-type-toggle-p">
                                        <button
                                            type="button"
                                            className={type === 'quote' ? 'active' : ''}
                                            onClick={() => setType('quote')}
                                        >
                                            New Order
                                        </button>
                                    </div>

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

                                    {type === 'say-hi' && (
                                        <div className="portal-field-p">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="john@example.com"
                                                className="portal-input-p"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    )}

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
                                        {status === 'loading' ? 'Processing...' :
                                            type === 'quote' ? <><MessageSquare size={18} /> <span>Initiate WhatsApp Quote</span></> :
                                                <><Send size={18} /> <span>Transmit Inquiry</span></>}
                                    </button>

                                    {status === 'success' && (
                                        <div className="portal-status-msg-p success">
                                            <CheckCircle2 size={16} /> Transmission successful. Engineering team notified.
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
