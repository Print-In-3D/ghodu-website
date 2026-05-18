import React, { createContext, useContext, useState, useEffect } from 'react';
import { topicsData as staticTopics, subProductsMap as staticSubProducts } from '../data/productsData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [topicsData, setTopicsData] = useState(staticTopics);
    const [subProductsMap, setSubProductsMap] = useState(staticSubProducts);
    const [loading, setLoading] = useState(true);
    const [isBackendOnline, setIsBackendOnline] = useState(false);

    const refreshData = async () => {
        try {
            const topicsRes = await fetch('https://ayush1273.pythonanywhere.com/api/topics/');
            const productsRes = await fetch('https://ayush1273.pythonanywhere.com/api/products/');

            if (topicsRes.ok && productsRes.ok) {
                const topics = await topicsRes.json();
                const products = await productsRes.json();

                // Sort topics by id to preserve design layout order
                const sortedTopics = topics.sort((a, b) => a.id - b.id);
                setTopicsData(sortedTopics);

                // Group products by their category (topic ID)
                const mappedProducts = {};

                // Initialize keys for all topics to avoid empty lists throwing undefined errors
                sortedTopics.forEach(t => {
                    mappedProducts[t.id] = [];
                });

                products.forEach(p => {
                    const topicId = p.topic;
                    if (!mappedProducts[topicId]) {
                        mappedProducts[topicId] = [];
                    }

                    mappedProducts[topicId].push({
                        id: p.product_id, // "2-1" string format used by react components
                        dbId: p.id,       // keep actual database integer ID for edit/delete requests
                        topicId: topicId,
                        name: p.name,
                        price: p.price,
                        images: p.images || [],
                        desc: p.desc,
                        fullDetails: p.full_details || '',
                        specs: p.specs || {},
                        features: p.features || [],
                        customizable: p.customizable,
                        customizationLabel: p.customization_label,
                        customizationPlaceholder: p.customization_placeholder
                    });
                });

                setSubProductsMap(mappedProducts);
                setIsBackendOnline(true);
                console.log("🚀 Catalog loaded dynamically from Django Backend!");
            } else {
                throw new Error("API returned non-OK status code");
            }
        } catch (err) {
            console.warn("⚠️ Django backend offline. Falling back to static productsData.js safely.", err);
            setTopicsData(staticTopics);
            setSubProductsMap(staticSubProducts);
            setIsBackendOnline(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <DataContext.Provider value={{ topicsData, subProductsMap, loading, isBackendOnline, refreshData }}>
            {children}
        </DataContext.Provider>
    );
};
