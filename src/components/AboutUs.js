import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
    Target, 
    Zap, 
    Heart, 
    CheckCircle2, 
    MessageSquare, 
    Box, 
    Search, 
    Truck,
    ArrowRight
} from 'lucide-react';
import './CSS/AboutUs.css';

const AboutUs = () => {
    const revealRef = useScrollReveal();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="about-page-premium" ref={revealRef}>
            {/* ── Cinematic Hero ── */}
            <header className="about-hero reveal-hidden">
                <div className="container">
                    <span className="about-eyebrow">The Studio</span>
                    <h1 className="about-title-main">Crafting the Future,<br/>One Layer at a Time.</h1>
                    <p className="about-subtitle">
                        Where engineering precision meets artistic vision. We don't just print objects; 
                        we manufacture memories and prototypes with industrial-grade passion.
                    </p>
                </div>
                <div className="about-hero-glow"></div>
            </header>

            {/* ── Mission Manifesto ── */}
            <section className="about-manifesto reveal-hidden reveal-stagger-1">
                <div className="container">
                    <div className="manifesto-box glass-panel">
                        <h2 className="manifesto-title">Our Manifesto</h2>
                        <p className="manifesto-text">
                            At Print-IN 3D Creations, we believe that 3D printing should be accessible to 
                            every dreamer, designer, and collector. Our mission is to bridge the gap 
                            between digital imagination and physical reality through sustainable materials 
                            and professional-grade additive manufacturing.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="about-why-us">
                <div className="container">
                    <div className="section-header-centered reveal-hidden">
                        <span className="header-eyebrow">The Print-IN Difference</span>
                        <h2 className="section-title-premium">Why Creators Choose Us</h2>
                    </div>

                    <div className="why-grid-premium">
                        <div className="why-card reveal-hidden reveal-stagger-1">
                            <div className="why-icon-wrap"><Target size={24} /></div>
                            <h3>Artisan Precision</h3>
                            <p>Every print is hand-inspected and post-processed to ensure the highest quality finish and structural integrity.</p>
                        </div>
                        <div className="why-card reveal-hidden reveal-stagger-2">
                            <div className="why-icon-wrap"><Zap size={24} /></div>
                            <h3>Rapid Prototyping</h3>
                            <p>From custom keychains to industrial parts, our streamlined workflow ensures a 5-7 day delivery pan-India.</p>
                        </div>
                        <div className="why-card reveal-hidden reveal-stagger-3">
                            <div className="why-icon-wrap"><Heart size={24} /></div>
                            <h3>Sustainable Logic</h3>
                            <p>We primarily use premium PLA—a biodegradable, corn-starch based material that is as eco-friendly as it is durable.</p>
                        </div>
                        <div className="why-card reveal-hidden reveal-stagger-4">
                            <div className="why-icon-wrap"><CheckCircle2 size={24} /></div>
                            <h3>Human-First Support</h3>
                            <p>No bots. Every project is discussed directly via WhatsApp with our lead engineers for 100% satisfaction.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Our Process ── */}
            <section className="about-process-visual">
                <div className="container">
                    <div className="process-visual-grid">
                        <div className="process-info-side reveal-hidden">
                            <span className="header-eyebrow">Workflow</span>
                            <h2 className="section-title-premium">From Sketch to Substance</h2>
                            <p className="process-desc">
                                We've perfected the 3D manufacturing pipeline to make customization 
                                effortless for our clients.
                            </p>
                            <div className="process-steps-premium">
                                <div className="p-step">
                                    <div className="p-num">01</div>
                                    <div className="p-content">
                                        <h4>Consultation</h4>
                                        <p>Reviewing your design and selecting the perfect material.</p>
                                    </div>
                                </div>
                                <div className="p-step">
                                    <div className="p-num">02</div>
                                    <div className="p-content">
                                        <h4>Optimization</h4>
                                        <p>Slicing and prepping files for maximum detail and strength.</p>
                                    </div>
                                </div>
                                <div className="p-step">
                                    <div className="p-num">03</div>
                                    <div className="p-content">
                                        <h4>Manufacturing</h4>
                                        <p>Printing your vision layer-by-layer in our high-precision studio.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="process-visual-side reveal-hidden reveal-stagger-1">
                            <div className="visual-box glass-panel">
                                <div className="visual-icon-row">
                                    <Search size={32} />
                                    <ArrowRight />
                                    <Box size={32} />
                                    <ArrowRight />
                                    <Truck size={32} />
                                </div>
                                <p>End-to-End Excellence</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="about-cta reveal-hidden">
                <div className="container">
                    <div className="cta-box-premium glass-panel">
                        <h2>Ready to print the future?</h2>
                        <p>Explore our collection or start a custom project today.</p>
                        <div className="cta-btns">
                            <a href="/#products" className="btn-about-primary">Explore Products</a>
                            <a href="#!" onClick={(e) => { e.preventDefault(); window.open('https://wa.me/917043591952', '_blank'); }} className="btn-about-secondary">
                                <MessageSquare size={18} /> Chat with Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
