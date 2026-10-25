import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  Inbox,
  Settings as SettingsIcon,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Clock,
  Phone,
  ExternalLink,
  RefreshCw,
  X,
  Save,
  ArrowLeft,
  Search,
  Filter,
  Check
} from 'lucide-react';
import { apiUrl } from '../config/api.js';

export default function AdminDashboard({ onBackToSite, onRefreshData }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'inquiries', 'settings'
  const [overview, setOverview] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msgAlert, setMsgAlert] = useState(null);

  // Product modal state (Add / Edit)
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'kitchen',
    categoryName: 'Modular Kitchen',
    priceRange: '₹1,50,000 - ₹2,80,000',
    image: '/assets/kitchen_island.jpg',
    featured: false,
    inStock: true,
    boardType: 'Action TESA HDHMR Boilo',
    brand: 'Action TESA',
    hardware: 'German Hettich / Ebco Soft Close',
    finish: 'Cashmere Anti-Fingerprint Matte',
    description: '',
  });

  // Fetch all admin data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [resOver, resProd, resCats, resInq, resSet] = await Promise.all([
        fetch(apiUrl('/api/overview')),
        fetch(apiUrl('/api/products')),
        fetch(apiUrl('/api/categories')),
        fetch(apiUrl('/api/inquiries')),
        fetch(apiUrl('/api/settings'))
      ]);

      const [dataOver, dataProd, dataCats, dataInq, dataSet] = await Promise.all([
        resOver.json(),
        resProd.json(),
        resCats.json(),
        resInq.json(),
        resSet.json()
      ]);

      setOverview(dataOver);
      setProducts(dataProd);
      setCategories(dataCats);
      setInquiries(dataInq);
      setSettings(dataSet);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNotification = (text, type = 'success') => {
    setMsgAlert({ text, type });
    setTimeout(() => setMsgAlert(null), 4000);
  };

  // 1. Product Handlers
  const openAddProductModal = () => {
    setEditingProductId(null);
    setProductForm({
      title: '',
      category: 'kitchen',
      categoryName: 'Modular Kitchen',
      priceRange: '₹1,50,000 - ₹2,80,000',
      image: '/assets/kitchen_island.jpg',
      featured: false,
      inStock: true,
      boardType: 'Action TESA HDHMR Boilo',
      brand: 'Action TESA',
      hardware: 'German Hettich / Ebco Soft Close',
      finish: 'Cashmere Anti-Fingerprint Matte',
      description: 'Custom engineered modular design manufactured with precision joinery.',
    });
    setProductModalOpen(true);
  };

  const openEditProductModal = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      title: prod.title || '',
      category: prod.category || 'kitchen',
      categoryName: prod.categoryName || 'Modular Kitchen',
      priceRange: prod.priceRange || '',
      image: prod.image || '/assets/kitchen_island.jpg',
      featured: !!prod.featured,
      inStock: prod.inStock !== false,
      boardType: prod.boardType || '',
      brand: prod.brand || '',
      hardware: prod.hardware || '',
      finish: prod.finish || '',
      description: prod.description || '',
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const url = editingProductId ? apiUrl(`/api/products/${editingProductId}`) : apiUrl('/api/products');
      const method = editingProductId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      });

      if (res.ok) {
        showNotification(editingProductId ? 'Design updated successfully!' : 'New design added to live website!');
        setProductModalOpen(false);
        fetchData();
        if (onRefreshData) onRefreshData();
      } else {
        showNotification('Failed to save design', 'error');
      }
    } catch (err) {
      showNotification('Error saving product', 'error');
    }
  };

  const handleDeleteProduct = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(apiUrl(`/api/products/${id}`), { method: 'DELETE' });
      if (res.ok) {
        showNotification('Product deleted successfully');
        fetchData();
        if (onRefreshData) onRefreshData();
      }
    } catch (err) {
      showNotification('Error deleting product', 'error');
    }
  };

  // 2. Inquiry Handlers
  const handleUpdateInquiryStatus = async (id, newStatus) => {
    try {
      const res = await fetch(apiUrl(`/api/inquiries/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        showNotification(`Lead marked as ${newStatus}`);
        fetchData();
      }
    } catch (err) {
      showNotification('Failed to update lead status', 'error');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      const res = await fetch(apiUrl(`/api/inquiries/${id}`), { method: 'DELETE' });
      if (res.ok) {
        showNotification('Inquiry deleted');
        fetchData();
      }
    } catch (err) {
      showNotification('Failed to delete inquiry', 'error');
    }
  };

  // 3. Settings Handler
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(apiUrl('/api/settings'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        showNotification('Studio showroom settings updated successfully!');
        if (onRefreshData) onRefreshData();
      }
    } catch (err) {
      showNotification('Failed to update settings', 'error');
    }
  };

  // 4. Reset Seed Data
  const handleResetDefaults = async () => {
    if (!window.confirm('Reset all designs and settings back to original PDF presentation showcase?')) return;
    try {
      const res = await fetch(apiUrl('/api/seed'), { method: 'POST' });
      if (res.ok) {
        showNotification('Database reset to original PDF portfolio showcase!');
        fetchData();
        if (onRefreshData) onRefreshData();
      }
    } catch (err) {
      showNotification('Failed to reset defaults', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">

      {/* Admin Top Header */}
      <header className="bg-brand-darkest text-white border-b border-brand-medium/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={onBackToSite}
                className="p-1.5 sm:p-2 rounded-lg bg-brand-primary/80 hover:bg-brand-primary text-gold-champagne transition-colors flex items-center gap-1 sm:gap-1.5 text-xs font-semibold"
                title="Back to live website"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="inline sm:hidden text-[11px]">Site</span>
                <span className="hidden sm:inline">Back to Live Website</span>
              </button>
              <div className="h-6 w-px bg-brand-medium/40"></div>
              <h1 className="font-serif text-base sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5 sm:gap-2.5">
                <img
                  src="/assets/Logo.jpg"
                  alt="Modshine Logo"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain bg-white p-0.5 border border-white/20 shrink-0"
                />
                <span className="hidden xs:inline">Modshine Interior</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-sans font-semibold tracking-wider px-1.5 sm:px-2 py-0.5 rounded bg-gold-primary text-brand-darkest truncate max-w-[120px] sm:max-w-none">
                  Admin Panel
                </span>
              </h1>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <span className="hidden md:inline px-3 py-1 rounded-full bg-brand-dark border border-brand-medium text-emerald-200">
                DB Engine: <strong>{overview?.databaseMode || 'Active'}</strong>
              </span>
              <button
                onClick={handleResetDefaults}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium transition-colors flex items-center gap-1.5"
                title="Restore default presentation showcase"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Defaults</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {msgAlert && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn ${msgAlert.type === 'error' ? 'bg-red-600 text-white' : 'bg-emerald-700 text-white'
          }`}>
          <Check className="w-4 h-4" />
          <span>{msgAlert.text}</span>
        </div>
      )}

      {/* Main Body Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Furniture Designs</span>
              <Package className="w-4 h-4 text-brand-primary" />
            </div>
            <p className="text-3xl font-serif font-bold text-slate-900">{products.length}</p>
            <p className="text-[11px] text-emerald-600 font-medium">Live in Website Catalog</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Customer Leads</span>
              <Inbox className="w-4 h-4 text-gold-rich" />
            </div>
            <p className="text-3xl font-serif font-bold text-slate-900">{inquiries.length}</p>
            <p className="text-[11px] text-amber-600 font-medium">
              {inquiries.filter(i => i.status === 'New').length} New Uncontacted
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">In-Progress Projects</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-3xl font-serif font-bold text-slate-900">
              {inquiries.filter(i => i.status === 'In-Progress').length + 3}
            </p>
            <p className="text-[11px] text-blue-600 font-medium">3D Walkthrough / Factory Stage</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Completed Handover</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-3xl font-serif font-bold text-slate-900">450+</p>
            <p className="text-[11px] text-emerald-600 font-medium">100% Client Satisfaction</p>
          </div>
        </div>

        {/* Tab Navigation (Horizontally swipeable on mobile) */}
        <div className="flex border-b border-slate-200 gap-4 overflow-x-auto scrollbar-none whitespace-nowrap pb-1">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-2 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'products'
              ? 'border-brand-primary text-brand-primary'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <Package className="w-4 h-4" />
            <span>Furniture & Modular Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 px-2 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all relative ${activeTab === 'inquiries'
              ? 'border-brand-primary text-brand-primary'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Customer Leads / Inquiries ({inquiries.length})</span>
            {inquiries.some(i => i.status === 'New') && (
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-2 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'settings'
              ? 'border-brand-primary text-brand-primary'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Showroom & Contact Settings</span>
          </button>
        </div>

        {/* ================= TAB 1: PRODUCTS / FURNITURE ================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold font-serif text-slate-900">Active Modular Furniture Collection</h2>
                <p className="text-xs text-slate-500">Add, edit, or remove designs displayed on the customer landing page.</p>
              </div>
              <button
                onClick={openAddProductModal}
                className="px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-semibold tracking-wide flex items-center gap-2 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Furniture Design</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Design Item</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Core Board / Brand</th>
                      <th className="py-3.5 px-4">Estimated Range</th>
                      <th className="py-3.5 px-4">Featured</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.title}
                              className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                            <div>
                              <strong className="block text-slate-900 font-semibold">{prod.title}</strong>
                              <span className="text-[11px] text-slate-400 line-clamp-1">{prod.description}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-brand-primary">
                            {prod.categoryName || prod.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-800">{prod.boardType || 'HDHMR Boilo'}</p>
                          <p className="text-[10px] text-slate-400">{prod.brand || 'Action TESA'}</p>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {prod.priceRange || 'Custom'}
                        </td>
                        <td className="py-3 px-4">
                          {prod.featured ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                              Featured
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Standard</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditProductModal(prod)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-brand-primary"
                              title="Edit Design"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.title)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"
                              title="Delete Design"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: INQUIRIES / LEADS ================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900">Customer Leads & Consultation Bookings</h2>
              <p className="text-xs text-slate-500">Live requests submitted by visitors on the landing page contact form.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Client Name & Contact</th>
                      <th className="py-3.5 px-4">Service Required</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4">Target Budget</th>
                      <th className="py-3.5 px-4">Message / Requirements</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No inquiries received yet. Submit one from the landing page contact form to see it here!
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <strong className="block text-slate-900 font-semibold">{inq.name}</strong>
                            <a href={`tel:${inq.phone}`} className="text-brand-primary font-bold hover:underline flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              <span>{inq.phone}</span>
                            </a>
                            {inq.email && <span className="text-[10px] text-slate-400 block">{inq.email}</span>}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">
                            {inq.service}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {inq.city || 'Kovilpatti'}
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-700">
                            {inq.budget || 'Custom'}
                          </td>
                          <td className="py-3.5 px-4 max-w-xs text-slate-600 line-clamp-2">
                            {inq.message || 'Free design consultation requested.'}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                              className={`px-2.5 py-1 rounded text-[11px] font-bold border focus:outline-none ${inq.status === 'New'
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : inq.status === 'Contacted'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : inq.status === 'In-Progress'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                }`}
                            >
                              <option value="New">🔴 New</option>
                              <option value="Contacted">🟡 Contacted</option>
                              <option value="In-Progress">🔵 In-Progress</option>
                              <option value="Completed">🟢 Completed</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: SHOWROOM SETTINGS ================= */}
        {activeTab === 'settings' && settings && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900">Showroom & Company Information</h2>
              <p className="text-xs text-slate-500">Update contact numbers, Kovilpatti address, announcement banner, and working hours.</p>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Company Name</label>
                  <input
                    type="text"
                    value={settings.companyName || ''}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Brand Tagline</label>
                  <input
                    type="text"
                    value={settings.tagline || ''}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Primary Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={settings.phone || ''}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Secondary Phone</label>
                  <input
                    type="text"
                    value={settings.secondaryPhone || ''}
                    onChange={(e) => setSettings({ ...settings, secondaryPhone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block">Office & Studio Address (from PDF)</label>
                  <input
                    type="text"
                    value={settings.address || ''}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block">Top Announcement Banner</label>
                  <input
                    type="text"
                    value={settings.announcement || ''}
                    onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block">Studio Working Hours</label>
                  <input
                    type="text"
                    value={settings.workingHours || ''}
                    onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-semibold tracking-wide flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Showroom Settings</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </main>

      {/* ================= MODAL: ADD / EDIT PRODUCT ================= */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                {editingProductId ? 'Edit Modular Design' : 'Add New Furniture Design'}
              </h3>
              <button
                onClick={() => setProductModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Title */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block">Design Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Minimalist Fluted Louver TV Unit"
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => {
                      const catSlug = e.target.value;
                      const catObj = categories.find(c => c.slug === catSlug);
                      setProductForm({
                        ...productForm,
                        category: catSlug,
                        categoryName: catObj ? catObj.name : catSlug
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Estimated Budget Range</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹1,40,000 - ₹2,50,000"
                    value={productForm.priceRange}
                    onChange={(e) => setProductForm({ ...productForm, priceRange: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {/* Image Path / URL */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block">Image Path or URL</label>
                  <input
                    type="text"
                    required
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                    <span className="text-slate-400">Quick presets:</span>
                    <button type="button" onClick={() => setProductForm({ ...productForm, image: '/assets/kitchen_island.jpg' })} className="text-brand-primary underline">Kitchen</button>
                    <button type="button" onClick={() => setProductForm({ ...productForm, image: '/assets/wardrobe_sage_green.jpg' })} className="text-brand-primary underline">Wardrobe</button>
                    <button type="button" onClick={() => setProductForm({ ...productForm, image: '/assets/tv_unit_fluted_marble.jpg' })} className="text-brand-primary underline">TV Unit</button>
                    <button type="button" onClick={() => setProductForm({ ...productForm, image: '/assets/partition_wooden_slat.jpg' })} className="text-brand-primary underline">Partition</button>
                    <button type="button" onClick={() => setProductForm({ ...productForm, image: '/assets/pooja_unit_backlit.jpg' })} className="text-brand-primary underline">Pooja</button>
                    <button type="button" onClick={() => setProductForm({ ...productForm, image: '/assets/bedroom_twin_luxury.jpg' })} className="text-brand-primary underline">Bedroom</button>
                  </div>
                </div>

                {/* Board Type */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Core Board Substrate</label>
                  <input
                    type="text"
                    value={productForm.boardType}
                    onChange={(e) => setProductForm({ ...productForm, boardType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {/* Brand */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Plywood / Board Brand</label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {/* Hardware */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Hardware / Sliders</label>
                  <input
                    type="text"
                    value={productForm.hardware}
                    onChange={(e) => setProductForm({ ...productForm, hardware: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {/* Finish */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Surface Finish</label>
                  <input
                    type="text"
                    value={productForm.finish}
                    onChange={(e) => setProductForm({ ...productForm, finish: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {/* Featured checkbox */}
                <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="featCheck"
                    checked={productForm.featured}
                    onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-primary"
                  />
                  <label htmlFor="featCheck" className="text-xs font-semibold text-slate-800">
                    Feature this design prominently on the home landing page
                  </label>
                </div>

                {/* Description */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block">Description</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary"
                  ></textarea>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-semibold"
                >
                  Save Design
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
