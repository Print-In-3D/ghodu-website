import React, { useState, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
    MessageSquare,
    Mail,
    MapPin,
    Zap,
    ShieldCheck,
    Clock,
    ChevronRight,
    Box
} from 'lucide-react';
import './CSS/Contact.css';

const Contact = () => {
    const form = useRef();
    const revealRef = useScrollReveal();
    const [formData, setFormData] = useState({
        name: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const phoneNumber = "917043591952";
        const text = `Hi Print-IN 3D, I'm ${formData.name}.\n\nI would like to submit a project inquiry.\n\nProject Details:\n${formData.message}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
        
        setIsSubmitting(false);
        setFormData({ name: '', message: '' });
    };

    return (
        <section id="contact" className="contact-premium-section">
            <div className="container" ref={revealRef}>
                <div className="contact-layout-grid">

                    {/* LEFT COLUMN: Brand Story & Trust */}
                    <div className="contact-info-column reveal-hidden">
                        <span className="contact-eyebrow-premium">Start a Project</span>
                        <h2 className="contact-title-premium">
                            Bring your ideas into <span className="text-gradient-brand">reality.</span>
                        </h2>
                        <p className="contact-description-premium">
                            Whether you need a single bespoke prototype or industrial-scale production,
                            our engineering team is ready to assist you in every step of the process.
                        </p>

                        {/* Benefit Cards Grid */}
                        <div className="contact-benefits-grid">
                            <div className="benefit-card-mini">
                                <div className="benefit-icon-p"><Zap size={18} /></div>
                                <div className="benefit-text-p">
                                    <h4>Industrial Precision</h4>
                                    <p>Professional grade FDM manufacturing.</p>
                                </div>
                            </div>
                            <div className="benefit-card-mini">
                                <div className="benefit-icon-p"><Box size={18} /></div>
                                <div className="benefit-text-p">
                                    <h4>Eco-Friendly Materials</h4>
                                    <p>Sustainable, biodegradable PLA focus.</p>
                                </div>
                            </div>
                            <div className="benefit-card-mini">
                                <div className="benefit-icon-p"><ShieldCheck size={18} /></div>
                                <div className="benefit-text-p">
                                    <h4>Expert Consultation</h4>
                                    <p>Engineering support for complex designs.</p>
                                </div>
                            </div>
                            <div className="benefit-card-mini">
                                <div className="benefit-icon-p"><Clock size={18} /></div>
                                <div className="benefit-text-p">
                                    <h4>Fast Turnaround</h4>
                                    <p>Standard delivery in 5-7 business days.</p>
                                </div>
                            </div>
                        </div>

                        {/* Professional Contact Details Card */}
                        <div className="contact-details-card glass-panel">
                            <div className="detail-row-p">
                                <Mail size={18} className="row-icon-p" />
                                <div className="row-info-p">
                                    <label>Email Our Studio</label>
                                    <p>printin3dcreations@gmail.com</p>
                                </div>
                            </div>
                            <div className="detail-row-p">
                                <MessageSquare size={18} className="row-icon-p" />
                                <div className="row-info-p">
                                    <label>WhatsApp / Support</label>
                                    <p>+91 70435 91952</p>
                                </div>
                            </div>
                            <div className="detail-row-p">
                                <MapPin size={18} className="row-icon-p" />
                                <div className="row-info-p">
                                    <label>Operational Hub</label>
                                    <p>Pan-India Manufacturing Network</p>
                                </div>
                            </div>
                            <div className="response-time-chip">
                                <div className="pulse-dot"></div>
                                <span>Typical response: under 2 hours</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Inquiry Portal */}
                    <div className="contact-form-column reveal-hidden reveal-stagger-1">
                        <div className="form-portal-card glass-panel">
                            <div className="portal-header">
                                <h3>Project Inquiry Portal</h3>
                                <p>Fill in the details below to initiate your commission.</p>
                            </div>

                            <form className="portal-form" ref={form} onSubmit={handleSubmit}>
                                <div className="portal-input-group">
                                    <label htmlFor="name">Full Name</label>
                                    <div className="input-wrapper-p">
                                        <input
                                            type="text"
                                            id="name"
                                            name="user_name" // Ensure compatibility with EmailJS templates if needed
                                            placeholder="Enter your name"
                                            className="portal-input"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="portal-input-group">
                                    <label htmlFor="message">Project Details</label>
                                    <div className="input-wrapper-p">
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Describe your vision, specific dimensions, or material preferences..."
                                            rows="5"
                                            className="portal-textarea"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-portal-submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="btn-loading-text">Processing...</span>
                                    ) : (
                                        <>
                                            <MessageSquare size={18} /> <span>Send Inquiry via WhatsApp</span>
                                            <ChevronRight size={18} className="btn-arrow-p" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            {/* Background Decorative Accents */}
            <div className="contact-bg-blob blob-1"></div>
            <div className="contact-bg-blob blob-2"></div>
        </section>
    );
};

export default Contact;
