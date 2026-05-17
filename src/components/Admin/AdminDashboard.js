import React, { useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { 
    FolderKanban, 
    ShoppingBag, 
    Sparkles, 
    Activity,
    ArrowRight
} from 'lucide-react';
import '../CSS/Admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { topicsData, subProductsMap, isBackendOnline } = useData();

    const stats = useMemo(() => {
        const totalCategories = topicsData.length;
        const allProducts = Object.values(subProductsMap).flat();
        const totalProducts = allProducts.length;
        const customizableProducts = allProducts.filter(p => p.customizable).length;
        
        return {
            totalCategories,
            totalProducts,
            customizableProducts
        };
    }, [topicsData, subProductsMap]);

    return (
        <div style={{ animation: 'modalSlideUp 0.4s ease' }}>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--admin-text-main)' }}>Welcome to Control Studio</h2>
                <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.95rem' }}>Monitor your catalog statistics and keep your physical collections updated in real-time.</p>
            </div>

            {/* Stats grid */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="stat-info">
                        <h3>Categories</h3>
                        <span className="stat-value">{stats.totalCategories}</span>
                    </div>
                    <div className="stat-icon-wrap primary">
                        <FolderKanban size={24} />
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="stat-info">
                        <h3>Total Products</h3>
                        <span className="stat-value">{stats.totalProducts}</span>
                    </div>
                    <div className="stat-icon-wrap success">
                        <ShoppingBag size={24} />
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="stat-info">
                        <h3>Bespoke Creas</h3>
                        <span className="stat-value">{stats.customizableProducts}</span>
                    </div>
                    <div className="stat-icon-wrap warning">
                        <Sparkles size={24} />
                    </div>
                </div>
            </div>

            {/* Welcome banner / Server alert */}
            <div className="admin-panel-card" style={{ padding: '28px', background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', color: '#FFFFFF', border: 'none' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px', color: '#FFFFFF' }}>
                            {isBackendOnline ? '🔗 Live Django Backend Connected' : '🚧 Running in Sandbox Demo Mode'}
                        </h3>
                        <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '600px', margin: 0 }}>
                            {isBackendOnline 
                                ? 'Database operations are synchronizing perfectly. Any changes made to categories, product descriptions, prices, specs or features will propagate live to all customers instantly.'
                                : 'The Django backend server is currently offline. You are browsing static catalog entries. In sandbox mode, modifications will remain localized to the current browser tab and will reset upon page reload.'
                            }
                        </p>
                    </div>
                    <div className={`admin-status-indicator ${isBackendOnline ? 'online' : 'offline'}`} style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                        <Activity size={16} />
                        <span>{isBackendOnline ? 'Django Online' : 'Sandbox Active'}</span>
                    </div>
                </div>
            </div>

            {/* Quick links card */}
            <div className="admin-panel-card">
                <div className="admin-panel-header">
                    <h2>Quick Catalog Links</h2>
                </div>
                <div style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <button onClick={() => navigate('/admin/categories')} className="admin-btn-secondary" style={{ padding: '12px 24px' }}>
                        Manage Categories <ArrowRight size={16} />
                    </button>
                    <button onClick={() => navigate('/admin/products')} className="admin-btn-action" style={{ padding: '12px 24px' }}>
                        Add/Edit Products <ArrowRight size={16} />
                    </button>
                    <button onClick={() => navigate('/')} className="admin-btn-secondary" style={{ padding: '12px 24px', background: '#F8FAFC' }}>
                        View Live Website <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
