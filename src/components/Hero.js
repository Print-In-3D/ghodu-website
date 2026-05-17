import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import './CSS/Hero.css';

const Hero = () => {
    const videos = [
        '/videos/hero-background1.mp4',
        '/videos/hero-background2.mp4',
        '/videos/hero-background3.mp4'
    ];
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.src = videos[currentVideoIndex];
            video.load();
        }
    }, [currentVideoIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const handleExploreClick = (e) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById('products');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section id="home" className="hero">
            <video
                ref={videoRef}
                className="hero-video"
                autoPlay
                muted
                loop={false}
                playsInline
                onEnded={handleVideoEnd}
            >
                Your browser does not support the video tag.
            </video>

            {/* Cinematic Lighting Layers */}
            <div className="hero-overlay-top"></div>
            <div className="hero-overlay-vignette"></div>
            <div className="hero-overlay-spotlight"></div>
            <div className="hero-overlay-grain"></div>

            <div className="container hero-container">
                <div className="hero-content-centered">
                    <div className="hero-reveal-wrap">
                        <h1 className="hero-title-cinematic">
                            Precision Meets<br />
                            <span className="hero-title-gradient">Creativity.</span>
                        </h1>
                    </div>

                    <div className="hero-reveal-wrap">
                        <p className="hero-desc-refined">
                            Crafting premium 3D-printed solutions for enthusiasts and professionals.
                            From bespoke décor to industrial prototypes, we bring your most complex ideas to life.
                        </p>
                    </div>

                    <div className="hero-cta-sequence">
                        <Link to="/#products" className="btn-cinematic-primary" onClick={handleExploreClick}>
                            <span>Explore Collection</span>
                            <ChevronRight size={18} />
                        </Link>
                        <Link to="/contact" className="btn-cinematic-secondary">
                            <span>Custom Commission</span>
                        </Link>
                    </div>

                    {/* Verified Trust Badges - Simplified */}
                    <div className="hero-trust-bar-minimal">
                        <div className="trust-item-mini">
                            <ShieldCheck size={14} />
                            <span>Pro-Grade Materials</span>
                        </div>
                        <div className="trust-item-mini">
                            <Truck size={14} />
                            <span>Nationwide Shipping</span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Hero;