import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { 
    Plus, 
    Edit, 
    Trash2, 
    X, 
    Upload, 
    Search
} from 'lucide-react';
import '../CSS/Admin.css';

const AdminProducts = () => {
    const { topicsData, subProductsMap, isBackendOnline, refreshData } = useData();
    const [selectedTopicId, setSelectedTopicId] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Form fields
    const [topic, setTopic] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState('');
    const [fullDetails, setFullDetails] = useState('');
    const [customizable, setCustomizable] = useState(false);
    const [customizationLabel, setCustomizationLabel] = useState('');
    const [customizationPlaceholder, setCustomizationPlaceholder] = useState('');

    // Dynamic Lists states
    const [features, setFeatures] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [specs, setSpecs] = useState([]); // Array of { key, value }
    const [images, setImages] = useState([]); // List of image paths/URLs
    const [imageUrlInput, setImageUrlInput] = useState('');

    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Flat list of products for the table
    const productsList = useMemo(() => {
        const list = [];
        Object.entries(subProductsMap).forEach(([topicId, products]) => {
            products.forEach(p => {
                const category = topicsData.find(t => t.id === Number(topicId));
                list.push({
                    ...p,
                    categoryName: category ? category.title : `Category #${topicId}`,
                    categoryId: Number(topicId)
                });
            });
        });
        return list;
    }, [subProductsMap, topicsData]);

    // Filtering & Searching
    const filteredProducts = useMemo(() => {
        return productsList.filter(p => {
            const matchesTopic = selectedTopicId === 'all' || p.categoryId === Number(selectedTopicId);
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  p.desc.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesTopic && matchesSearch;
        });
    }, [productsList, selectedTopicId, searchTerm]);

    const openCreateModal = () => {
        setEditingProduct(null);
        setTopic(topicsData[0]?.id || '');
        setName('');
        setPrice(0);
        setDesc('');
        setFullDetails('');
        setCustomizable(false);
        setCustomizationLabel('');
        setCustomizationPlaceholder('');
        setFeatures([]);
        setSpecs([{ key: 'material', value: 'PLA' }]);
        setImages([]);
        setError('');
        setModalOpen(true);
    };

    const openEditModal = (p) => {
        setEditingProduct(p);
        setTopic(p.categoryId);
        setName(p.name);
        setPrice(p.price);
        setDesc(p.desc);
        setFullDetails(p.fullDetails || '');
        setCustomizable(p.customizable || false);
        setCustomizationLabel(p.customizationLabel || '');
        setCustomizationPlaceholder(p.customizationPlaceholder || '');
        setFeatures(p.features || []);
        
        // Map specs dictionary to key-value array
        const specsArr = Object.entries(p.specs || {}).map(([key, value]) => ({ key, value }));
        setSpecs(specsArr.length > 0 ? specsArr : [{ key: 'material', value: '' }]);
        
        setImages(p.images || []);
        setError('');
        setModalOpen(true);
    };

    // Specs Builders Actions
    const addSpecRow = () => {
        setSpecs([...specs, { key: '', value: '' }]);
    };

    const removeSpecRow = (idx) => {
        const copy = [...specs];
        copy.splice(idx, 1);
        setSpecs(copy);
    };

    const handleSpecChange = (idx, field, value) => {
        const copy = [...specs];
        copy[idx][field] = value;
        setSpecs(copy);
    };

    // Features tags actions
    const addTag = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            e.preventDefault();
            const tag = tagInput.trim();
            if (tag && !features.includes(tag)) {
                setFeatures([...features, tag]);
                setTagInput('');
            }
        }
    };

    const removeTag = (idx) => {
        const copy = [...features];
        copy.splice(idx, 1);
        setFeatures(copy);
    };

    // Image URL uploader
    const addImageUrl = () => {
        const url = imageUrlInput.trim();
        if (url) {
            setImages([...images, url]);
            setImageUrlInput('');
        }
    };

    const removeImage = (idx) => {
        const copy = [...images];
        copy.splice(idx, 1);
        setImages(copy);
    };

    // Native direct upload endpoint integration
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!isBackendOnline) {
            alert('File uploads are disabled in Offline Static Sandbox Mode.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const response = await fetch('http://localhost:8000/api/upload/', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (response.ok && data.success) {
                setImages([...images, data.url]);
            } else {
                alert(data.error || 'Failed to upload image.');
            }
        } catch (err) {
            console.error("Upload error", err);
            alert("Upload failed. Verify server connections.");
        } finally {
            setUploading(false);
        }
    };

    // CRUD saving handler
    const handleSave = async (e) => {
        e.preventDefault();
        setError('');

        if (!isBackendOnline) {
            setError('Modifications are disabled in Offline Static Sandbox Mode.');
            return;
        }

        if (!name || !desc || !topic) {
            setError('Please fill in all required fields.');
            return;
        }

        setSaving(true);

        // Reassemble specifications back to object key-value dictionary
        const specsObj = {};
        specs.forEach(s => {
            const k = s.key.trim();
            const v = s.value.trim();
            if (k) specsObj[k] = v;
        });

        // Unique alphanumeric ID generators for new products (e.g. topicId-unique)
        const productStrId = editingProduct 
            ? editingProduct.id 
            : `${topic}-${Math.random().toString(36).substr(2, 5)}`;

        const payload = {
            product_id: productStrId,
            topic: Number(topic),
            name,
            price: Number(price),
            images,
            desc,
            full_details: fullDetails,
            specs: specsObj,
            features,
            customizable,
            customization_label: customizable ? customizationLabel : null,
            customization_placeholder: customizable ? customizationPlaceholder : null
        };

        try {
            let response;
            if (editingProduct && editingProduct.dbId) {
                // Update
                response = await fetch(`http://localhost:8000/api/products/${editingProduct.dbId}/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } else {
                // Create
                response = await fetch('http://localhost:8000/api/products/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }

            if (response.ok) {
                await refreshData();
                setModalOpen(false);
            } else {
                const data = await response.json();
                setError(data.detail || JSON.stringify(data) || 'Failed to save product.');
            }
        } catch (err) {
            console.error("Save product error", err);
            setError('Network error. Failed to save product.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (dbId, strId, prodName) => {
        if (!isBackendOnline) {
            alert('Modifications are disabled in Offline Static Sandbox Mode.');
            return;
        }

        if (window.confirm(`Are you sure you want to delete product "${prodName}" (#${strId})?`)) {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${dbId}/`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    await refreshData();
                } else {
                    alert('Failed to delete product.');
                }
            } catch (err) {
                console.error("Delete product error", err);
                alert('Network error. Failed to delete product.');
            }
        }
    };

    return (
        <div style={{ animation: 'modalSlideUp 0.4s ease' }}>
            {/* Header controls filter */}
            <div className="admin-panel-card" style={{ marginBottom: '24px', padding: '20px 24px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', flex: 1, minWidth: '280px' }}>
                        
                        {/* Search */}
                        <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--admin-text-muted)' }} />
                            <input 
                                type="text"
                                className="admin-form-control"
                                style={{ paddingLeft: '36px' }}
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Category filter */}
                        <select 
                            className="admin-form-control"
                            style={{ width: '200px' }}
                            value={selectedTopicId}
                            onChange={(e) => setSelectedTopicId(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            {topicsData.map(t => (
                                <option key={t.id} value={t.id}>{t.title}</option>
                            ))}
                        </select>
                    </div>

                    <button onClick={openCreateModal} className="admin-btn-action">
                        <Plus size={16} /> Add Product
                    </button>
                </div>
            </div>

            {/* Catalog Grid Table */}
            <div className="admin-panel-card">
                <div className="admin-panel-header">
                    <h2>Catalog List ({filteredProducts.length} items)</h2>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Ref ID</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Bespoke</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <img 
                                            src={p.images && p.images[0] ? p.images[0] : 'https://via.placeholder.com/100x100?text=Product'} 
                                            alt={p.name} 
                                            className="table-thumbnail"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/100x100?text=Product';
                                            }}
                                        />
                                    </td>
                                    <td style={{ fontWeight: 700, color: 'var(--admin-text-muted)' }}>{p.id}</td>
                                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                                    <td>
                                        <span className="badge-status active" style={{ background: '#EFF6FF', color: '#1E40AF' }}>{p.categoryName}</span>
                                    </td>
                                    <td style={{ fontWeight: 800 }}>₹{p.price === 0 ? 'Quote' : p.price}</td>
                                    <td>
                                        {p.customizable ? (
                                            <span className="badge-status active" style={{ background: '#ECFDF5', color: '#047857' }}>Personalized</span>
                                        ) : (
                                            <span className="badge-status inactive" style={{ background: '#F9FAFB', color: '#6B7280' }}>Standard</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button onClick={() => openEditModal(p)} className="btn-table-action edit" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                            {/* Safely pass database primary key ID and React string id */}
                                            <button onClick={() => handleDelete(p.dbId, p.id, p.name)} className="btn-table-action delete" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Large Edit Modal */}
            {modalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal" style={{ maxWidth: '800px' }}>
                        <div className="admin-modal-header">
                            <h3>{editingProduct ? `Edit Product — ${editingProduct.name}` : 'Create Product'}</h3>
                            <button onClick={() => setModalOpen(false)} className="btn-modal-close">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSave}>
                            <div className="admin-modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                {error && <div className="login-error-box" style={{ gridColumn: 'span 2' }}>{error}</div>}
                                
                                {/* Left column */}
                                <div>
                                    <div className="admin-form-group">
                                        <label>Category Category *</label>
                                        <select 
                                            className="admin-form-control"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                        >
                                            {topicsData.map(t => (
                                                <option key={t.id} value={t.id}>{t.title}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="admin-form-group">
                                        <label>Product Name *</label>
                                        <input 
                                            type="text" 
                                            required 
                                            className="admin-form-control" 
                                            placeholder="e.g. Low Poly Dino"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="admin-form-group">
                                        <label>Price (₹) *</label>
                                        <input 
                                            type="number" 
                                            required 
                                            min="0"
                                            className="admin-form-control" 
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '4px', display: 'block' }}>Enter 0 for WhatsApp Quote Items</span>
                                    </div>

                                    <div className="admin-form-group">
                                        <label>Short Description *</label>
                                        <textarea 
                                            required 
                                            className="admin-form-control" 
                                            rows="2"
                                            placeholder="Short summary displayed on list pages..."
                                            value={desc}
                                            onChange={(e) => setDesc(e.target.value)}
                                        />
                                    </div>

                                    <div className="admin-form-group">
                                        <label>Craftsmanship / Detailed Story (Optional)</label>
                                        <textarea 
                                            className="admin-form-control" 
                                            rows="4"
                                            placeholder="Complete backstory and parameters displayed on PDP details..."
                                            value={fullDetails}
                                            onChange={(e) => setFullDetails(e.target.value)}
                                        />
                                    </div>
                                    
                                    {/* Customization section */}
                                    <div className="admin-panel-card" style={{ padding: '16px', background: '#F8FAFC', border: '1px solid var(--admin-border)' }}>
                                        <div className="admin-form-group" style={{ marginBottom: '12px' }}>
                                            <label className="admin-checkbox-label">
                                                <input 
                                                    type="checkbox" 
                                                    checked={customizable}
                                                    onChange={(e) => setCustomizable(e.target.checked)}
                                                />
                                                Supports Personalization Studio
                                            </label>
                                        </div>

                                        {customizable && (
                                            <>
                                                <div className="admin-form-group" style={{ marginBottom: '12px' }}>
                                                    <label>Personalization Label</label>
                                                    <input 
                                                        type="text" 
                                                        className="admin-form-control"
                                                        placeholder="e.g. Enter callsigned engraving name"
                                                        value={customizationLabel}
                                                        onChange={(e) => setCustomizationLabel(e.target.value)}
                                                    />
                                                </div>
                                                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                                                    <label>Personalization Placeholder</label>
                                                    <input 
                                                        type="text" 
                                                        className="admin-form-control"
                                                        placeholder="e.g. GHOST-01 or J.K."
                                                        value={customizationPlaceholder}
                                                        onChange={(e) => setCustomizationPlaceholder(e.target.value)}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Right column */}
                                <div>
                                    {/* Specifications Builder */}
                                    <div className="admin-form-group">
                                        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            Technical Specifications
                                            <button type="button" onClick={addSpecRow} className="admin-btn-secondary" style={{ padding: '2px 8px', fontSize: '0.75rem' }}>
                                                + Add Spec
                                            </button>
                                        </label>
                                        
                                        <div style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid var(--admin-border)', padding: '8px', borderRadius: '4px', background: '#F8FAFC' }}>
                                            {specs.map((s, idx) => (
                                                <div key={idx} className="dynamic-list-row">
                                                    <input 
                                                        type="text" 
                                                        className="admin-form-control" 
                                                        style={{ height: '34px', fontSize: '0.8rem' }}
                                                        placeholder="e.g. material"
                                                        value={s.key}
                                                        onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                                                    />
                                                    <input 
                                                        type="text" 
                                                        className="admin-form-control" 
                                                        style={{ height: '34px', fontSize: '0.8rem' }}
                                                        placeholder="e.g. Pro PLA"
                                                        value={s.value}
                                                        onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                                                    />
                                                    <button type="button" onClick={() => removeSpecRow(idx)} className="btn-row-action delete" style={{ width: '34px', height: '34px' }}>
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            {specs.length === 0 && (
                                                <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', textAlign: 'center', margin: '10px 0' }}>No specs added yet.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Features Tags */}
                                    <div className="admin-form-group">
                                        <label>Signature Highlight Tags (Press Enter)</label>
                                        <div className="tag-input-container">
                                            {features.map((feat, idx) => (
                                                <span key={idx} className="tag-pill">
                                                    {feat}
                                                    <button type="button" onClick={() => removeTag(idx)}><X size={10} /></button>
                                                </span>
                                            ))}
                                            <input 
                                                type="text" 
                                                className="tag-input-field" 
                                                placeholder="Add feature and enter..."
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                onKeyDown={addTag}
                                            />
                                        </div>
                                    </div>

                                    {/* Media Manager */}
                                    <div className="admin-form-group">
                                        <label>Product Images</label>
                                        
                                        {/* Direct File Upload Drop Zone */}
                                        <div className="media-manager-box">
                                            <Upload size={24} style={{ color: 'var(--admin-text-muted)', marginBottom: '8px' }} />
                                            <p style={{ fontSize: '0.8rem', fontWeight: 600, margin: 0 }}>
                                                {uploading ? 'Uploading image...' : 'Click to Upload Local Image'}
                                            </p>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', margin: '4px 0 0 0' }}>Supports JPEG, PNG up to 5MB</p>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                className="media-upload-input" 
                                                disabled={uploading}
                                                onChange={handleFileUpload}
                                            />
                                        </div>

                                        {/* External Image URL adder fallback */}
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                            <input 
                                                type="text" 
                                                className="admin-form-control"
                                                style={{ height: '36px', fontSize: '0.8rem' }}
                                                placeholder="Or paste external image URL..."
                                                value={imageUrlInput}
                                                onChange={(e) => setImageUrlInput(e.target.value)}
                                            />
                                            <button type="button" onClick={addImageUrl} className="admin-btn-secondary" style={{ padding: '0 12px', height: '36px' }}>
                                                Add
                                            </button>
                                        </div>

                                        {/* Images Preview Grid */}
                                        <div className="media-preview-grid">
                                            {images.map((img, idx) => (
                                                <div key={idx} className="media-preview-card">
                                                    <img 
                                                        src={img} 
                                                        alt="preview"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://via.placeholder.com/80x80?text=Error';
                                                        }}
                                                    />
                                                    <button type="button" onClick={() => removeImage(idx)} className="btn-media-delete">
                                                        <Trash2 size={10} />
                                                    </button>
                                                    <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '0.6rem', textAlign: 'center' }}>#{idx+1}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="admin-modal-footer">
                                <button type="button" onClick={() => setModalOpen(false)} className="admin-btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" disabled={saving} className="admin-btn-action">
                                    {saving ? 'Saving...' : 'Save Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
