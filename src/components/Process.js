import React from 'react';
import { Lightbulb, PenTool, Printer, PackageCheck } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './CSS/Process.css';

const processData = [
    {
        id: '01',
        title: 'Consultation & Idea',
        desc: 'Share your vision with us. We discuss your goals, requirements, and materials to ensure we fully understand what you need to bring your idea to life.',
        icon: Lightbulb
    },
    {
        id: '02',
        title: 'Digital Design',
        desc: 'Our experts translate your idea into a highly detailed 3D digital model, optimizing it for the perfect print structure and durability.',
        icon: PenTool
    },
    {
        id: '03',
        title: 'Precision Printing',
        desc: 'Using state-of-the-art 3D printers and premium PLA materials, we print your object layer by layer with meticulous attention to detail.',
        icon: Printer
    },
    {
        id: '04',
        title: 'Quality Check & Delivery',
        desc: 'Every item undergoes a strict quality check before being carefully packaged and shipped directly to your doorstep.',
        icon: PackageCheck
    }
];

const Process = () => {
    const revealRef = useScrollReveal();

    return (
        <section className="process">
            <div className="container">
                <div className="section-header center" style={{ textAlign: 'center', alignItems: 'center', marginBottom: '80px' }}>
                    <span className="eyebrow">How It Works</span>
                    <h2 className="heading-secondary">From Idea to Reality</h2>
                    <p className="section-desc" style={{ margin: '16px auto 0' }}>
                        A seamless, professional workflow designed to deliver the highest quality 3D prints directly to your door.
                    </p>
                </div>

                <div className="timeline-container reveal-hidden" ref={revealRef}>
                    <div className="timeline-line"></div>

                    {processData.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                                <div className="timeline-content glass-panel">
                                    <h3 className="timeline-title">{step.title}</h3>
                                    <p className="timeline-desc">{step.desc}</p>
                                </div>
                                <div className="timeline-node">
                                    <Icon size={20} className="timeline-icon" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Process;
