import { useEffect, useRef } from 'react';

export const useScrollReveal = (options = { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }) => {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            },
            options
        );

        const currentRef = ref.current;
        if (currentRef) {
            // Only add if not already revealed
            if (!currentRef.classList.contains('reveal-active')) {
                currentRef.classList.add('reveal-hidden');
                observer.observe(currentRef);
            }
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [options]);

    return ref;
};
