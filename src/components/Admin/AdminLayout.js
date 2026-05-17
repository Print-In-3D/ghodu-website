import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { 
    LayoutDashboard, 
    FolderKanban, 
    ShoppingBag, 
    LogOut,
    Menu,
    Activity
} from 'lucide-react';
import '../CSS/Admin.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isBackendOnline } = useData();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [adminName, setAdminName] = useState('Administrator');

    useEffect(() => {
        // Simple client-side route protection
        const token = localStorage.getItem('admin_token');
        const user = localStorage.getItem('admin_username');
        if (!token) {
            navigate('/admin/login');
        } else if (user) {
            setAdminName(user);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_username');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, exact: true },
        { path: '/admin/categories', label: 'Categories', icon: <FolderKanban size={18} /> },
        { path: '/admin/products', label: 'Products', icon: <ShoppingBag size={18} /> },
    ];

    const isTabActive = (item) => {
        if (item.exact) {
            return location.pathname === item.path;
        }
        return location.pathname.startsWith(item.path) && location.pathname !== '/admin';
    };

    return (
        <div className="admin-wrapper">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="admin-brand">
                    <span className="brand-dot"></span>
                    Print-IN 3D Admin
                </div>
                <nav className="admin-nav">
                    {navItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                navigate(item.path);
                                setSidebarOpen(false);
                            }}
                            className={`admin-nav-item ${isTabActive(item) ? 'active' : ''}`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className="admin-sidebar-footer">
                    <button onClick={handleLogout} className="admin-nav-item" style={{ color: '#F87171' }}>
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <div className="admin-main">
                {/* Header Topbar */}
                <header className="admin-topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button 
                            className="btn-table-action desktop-only" 
                            style={{ display: 'none' }} /* responsive toggle handle */
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <Menu size={20} />
                        </button>
                        <h1 className="admin-topbar-title">Control Studio</h1>
                    </div>

                    <div className="admin-topbar-right">
                        <div className={`admin-status-indicator ${isBackendOnline ? 'online' : 'offline'}`}>
                            <Activity size={12} />
                            <span>{isBackendOnline ? 'Live Django Server' : 'Offline Static Sandbox'}</span>
                        </div>
                        <div className="admin-user-profile">
                            <span className="admin-avatar">{adminName[0].toUpperCase()}</span>
                            <span>{adminName}</span>
                        </div>
                    </div>
                </header>

                {/* Dashboard view body */}
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
