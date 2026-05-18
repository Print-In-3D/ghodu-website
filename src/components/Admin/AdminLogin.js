import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import '../CSS/Admin.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const { isBackendOnline } = useData();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isBackendOnline) {
                // Connect to Django server
                const response = await fetch('https://ayush1273.pythonanywhere.com/api/login/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    localStorage.setItem('admin_token', data.token);
                    localStorage.setItem('admin_username', data.username);
                    navigate('/admin');
                } else {
                    setError(data.error || 'Invalid administrator credentials');
                }
            } else {
                // Offline fallback mode for sandboxing
                if (username === 'admin' && password === 'admin123') {
                    localStorage.setItem('admin_token', 'offline_sandbox_token');
                    localStorage.setItem('admin_username', 'Sandbox Admin');
                    navigate('/admin');
                } else {
                    setError('Incorrect credentials. Try admin / admin123 (Offline Sandbox Mode)');
                }
            }
        } catch (err) {
            console.error("Login request error", err);
            setError('Connection failed. Verify if Django backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-wrapper">
            <div className="admin-login-card">
                <h1>Print-IN 3D</h1>
                <p>Administrator Control Studio</p>

                {error && <div className="login-error-box">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="login-form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            required
                            className="login-form-control"
                            placeholder="e.g. admin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="login-form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            className="login-form-control"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" disabled={loading} className="btn-admin-login">
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
