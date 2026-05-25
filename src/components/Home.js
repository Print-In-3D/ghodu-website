import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from './Hero';
import BestSellers from './BestSellers';
import Products from './Products';
import Process from './Process';
import FAQ from './FAQ';
import Contact from './Contact';
import TrustFeatures from './TrustFeatures';

const Divider = () => (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 20px', background: 'var(--color-bg-main)' }}>
        <div style={{ width: '100%', maxWidth: '1200px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)' }}></div>
    </div>
);

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main style={{ overflowX: 'hidden' }}>
            <Helmet>
                <title>Print-IN 3D | Premium 3D Printing Service & Custom Gifts India</title>
                <meta name="description" content="Print-IN 3D is India's leading online 3D printing service. We offer high-quality custom 3D printing, rapid industrial prototyping, personalized gifts, custom keychains, home decor, and bespoke design. Quick shipping pan-India!" />
                <meta name="keywords" content="3d printing, 3d printing service, online 3d printing india, custom 3d printing, 3d printing shop, buy 3d printed gifts, custom keychains, rapid prototyping india, print in 3d" />
                <meta property="og:title" content="Print-IN 3D | Premium 3D Printing Service & Custom Gifts India" />
                <meta property="og:description" content="Print-IN 3D is India's leading online 3D printing service. We offer high-quality custom 3D printing, rapid industrial prototyping, personalized gifts, custom keychains, home decor, and bespoke design. Quick shipping pan-India!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.printin3d.in/" />
                <meta property="og:image" content="https://www.printin3d.in/favicon.webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Print-IN 3D | Premium 3D Printing Service & Custom Gifts India" />
                <meta name="twitter:description" content="Print-IN 3D is India's leading online 3D printing service. We offer high-quality custom 3D printing, rapid industrial prototyping, personalized gifts, custom keychains, home decor, and bespoke design. Quick shipping pan-India!" />
                <meta name="twitter:image" content="https://www.printin3d.in/favicon.webp" />
            </Helmet>
            <Hero />
            <TrustFeatures />
            <BestSellers />
            <Divider />
            <Products />

            <Divider />
            <FAQ />
            <Contact />
        </main>
    );
};

export default Home;
