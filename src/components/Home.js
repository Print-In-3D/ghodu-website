import React, { useEffect } from 'react';
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
