import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Layers, Zap, Heart, ShieldCheck } from 'lucide-react';
import './CSS/TrustFeatures.css';

const features = [
    {
        icon: Layers,
        title: 'Industrial Precision',
        desc: 'We use high-resolution industrial 3D printers to ensure every layer is perfect, from prototypes to décor.'
    },
    {
        icon: Zap,
        title: 'Eco-Friendly PLA',
        desc: 'Our primary material is high-grade PLA, which is biodegradable, durable, and comes in vibrant colors.'
    },
    {
        icon: Heart,
        title: 'Hand-Inspected',
        desc: 'Every piece is hand-finished and undergoes a rigorous quality check before it leaves our studio.'
    },
    {
        icon: ShieldCheck,
        title: 'Secure Ordering',
        desc: 'Order directly via WhatsApp for personalized support and real-time project updates.'
    }
];

const TrustFeatures = () => {
    const revealRef = useScrollReveal();

    return (
        <section className="trust-features">
            <div className="container" ref={revealRef}>
                <div className="features-grid-premium">
                    {features.map((feat, index) => {
                        const Icon = feat.icon;
                        return (
                            <div 
                                key={index} 
                                className={`feature-card-premium reveal-hidden reveal-stagger-${(index % 4) + 1}`}
                            >
                                <div className="feat-icon-wrap">
                                    <Icon size={24} />
                                </div>
                                <h3 className="feat-title">{feat.title}</h3>
                                <p className="feat-desc">{feat.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TrustFeatures;
