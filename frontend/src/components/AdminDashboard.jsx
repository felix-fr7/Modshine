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
  Check,
  Sparkles,
  Layers,
  ShieldCheck,
  Award,
  CheckCircle2,
  Home,
  Briefcase,
  Key,
  CookingPot,
  Star,
  MessagesSquare,
  MapPin,
  Image as ImageIcon,
  ChevronRight,
  Eye,
  Sliders,
  Compass,
  Upload,
  Loader2
} from 'lucide-react';
import { apiUrl } from '../config/api.js';

// Cloudinary Image Field with direct upload, live preview & delete
function CloudinaryImageField({
  label = "Image URL / Path",
  value,
  onChange,
  uploadKey,
  uploadingKey,
  onUpload,
  onDelete,
  placeholder = "https://res.cloudinary.com/..."
}) {
  const isUploading = uploadingKey === uploadKey;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="font-bold text-slate-300 block text-xs">{label}</label>
        <span className="text-[10px] text-brand-primary font-medium flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" /> Cloudinary Enabled
        </span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
        />

        <label className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition border shrink-0 ${
          isUploading
            ? 'bg-slate-800 text-slate-400 border-slate-700 pointer-events-none'
            : 'bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border-brand-primary/30'
        }`}>
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              <span>Upload</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onUpload(file, onChange, uploadKey);
                e.target.value = '';
              }
            }}
          />
        </label>
      </div>

      {value && (
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <img
            src={value}
            alt="Preview"
            className="w-12 h-12 object-cover rounded-lg border border-slate-700 shrink-0"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-slate-300 truncate font-mono">{value}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> Ready
            </p>
          </div>
          <button
            type="button"
            onClick={() => onDelete(value, () => onChange(''))}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
            title="Delete / Remove image"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard({ onBackToSite, onRefreshData }) {
  // Navigation tabs:
  // 'overview', 'hero', 'about', 'services', 'categories', 'products', 'materials', 'process', 'testimonials', 'showroom', 'inquiries'
  const [activeTab, setActiveTab] = useState('hero');
  const [overview, setOverview] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msgAlert, setMsgAlert] = useState(null);
  const [uploadingKey, setUploadingKey] = useState(null);

  // Search & Filter state for products
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Inquiry Filter
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');

  // ================= MODAL STATES =================
  // 1. Product Modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'kitchen',
    categoryName: 'Modular Kitchen',
    image: '/assets/kitchen_island.jpg',
    featured: false,
    inStock: true,
    boardType: 'Action TESA HDHMR Boilo',
    brand: 'Action TESA',
    hardware: 'German Hettich / Ebco Soft Close',
    finish: 'Cashmere Anti-Fingerprint Matte',
    description: '',
  });

  // 2. Service Modal
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    image: '/assets/hero_living_room.jpg',
    icon: 'Home',
    deliverables: ''
  });

  // 3. Category Modal
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    image: '/assets/kitchen_island.jpg'
  });

  // 4. Testimonial Modal
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({
    id: '',
    name: '',
    location: 'Kovilpatti',
    project: 'Modular Kitchen & Wardrobe',
    rating: 5,
    text: '',
    date: 'Recent Execution',
    avatar: '/assets/page_5.jpg'
  });

  // 5. Material / Board Modal
  const [materialModalOpen, setMaterialModalOpen] = useState(false);
  const [editingMaterialIdx, setEditingMaterialIdx] = useState(null);
  const [materialForm, setMaterialForm] = useState({
    name: '',
    desc: '',
    tag: 'Action TESA'
  });

  // 6. Partner Brand Modal
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [editingBrandIdx, setEditingBrandIdx] = useState(null);
  const [brandForm, setBrandForm] = useState({
    name: '',
    category: '',
    badge: 'Certified',
    desc: ''
  });

  // 7. Process Step Modal
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [editingProcessIdx, setEditingProcessIdx] = useState(null);
  const [processForm, setProcessForm] = useState({
    step: '01',
    title: '',
    subtitle: '',
    description: '',
    timeline: 'Day 1 - 3',
    deliverable: '',
    highlight: 'Guaranteed'
  });

  // 8. Hero Highlight Pill Modal
  const [heroPillModalOpen, setHeroPillModalOpen] = useState(false);
  const [editingHeroPillIdx, setEditingHeroPillIdx] = useState(null);
  const [heroPillForm, setHeroPillForm] = useState({
    icon: 'ShieldCheck',
    title: '',
    subtitle: ''
  });

  // 9. About Gallery Item Modal
  const [aboutGalleryModalOpen, setAboutGalleryModalOpen] = useState(false);
  const [editingGalleryIdx, setEditingGalleryIdx] = useState(null);
  const [aboutGalleryForm, setAboutGalleryForm] = useState({
    url: '/assets/about_montage_1.jpg',
    title: '',
    category: 'Living Spaces',
    badge: 'Living Spaces',
    desc: ''
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
        resOver.json().catch(() => ({})),
        resProd.json().catch(() => []),
        resCats.json().catch(() => []),
        resInq.json().catch(() => []),
        resSet.json().catch(() => ({}))
      ]);

      setOverview(dataOver);
      if (Array.isArray(dataProd)) setProducts(dataProd);
      if (Array.isArray(dataCats)) setCategories(dataCats);
      if (Array.isArray(dataInq)) setInquiries(dataInq);
      if (dataSet && typeof dataSet === 'object') setSettings(dataSet);
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

  // Cloudinary direct file upload handler
  const handleCloudinaryFileUpload = async (file, onUploaded, key = 'image') => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      showNotification('Image size exceeds 10MB limit', 'warning');
      return;
    }
    setUploadingKey(key);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result;
          const res = await fetch(apiUrl('/api/upload'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64Data, folder: 'modshine' })
          });
          const data = await res.json();
          if (data.success && data.url) {
            onUploaded(data.url);
            showNotification('Image uploaded to Cloudinary successfully!');
          } else {
            showNotification(data.error || 'Cloudinary upload failed', 'warning');
          }
        } catch (uploadErr) {
          console.error('Upload failed:', uploadErr);
          showNotification('Failed to upload image to Cloudinary', 'warning');
        } finally {
          setUploadingKey(null);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('File reading failed:', err);
      setUploadingKey(null);
    }
  };

  // Cloudinary image delete handler
  const handleCloudinaryFileDelete = async (currentUrl, onCleared) => {
    if (!currentUrl) return;
    if (!window.confirm('Delete this image from Cloudinary?')) return;
    try {
      if (currentUrl.includes('cloudinary.com')) {
        await fetch(apiUrl('/api/upload/delete'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: currentUrl })
        });
      }
      onCleared();
      showNotification('Image removed!');
    } catch (err) {
      console.error('Failed to delete image:', err);
      onCleared();
    }
  };

  // Generic Save Settings Helper (updates backend + localStorage + parent App)
  const saveSettingsPayload = async (updatedSettings, successMsg = 'Changes saved successfully!') => {
    try {
      const res = await fetch(apiUrl('/api/settings'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings)
      });
      const data = await res.json().catch(() => ({}));
      const newSettings = data.settings || updatedSettings;
      setSettings(newSettings);
      try {
        localStorage.setItem('modshine_settings', JSON.stringify(newSettings));
      } catch (e) {}
      if (onRefreshData) onRefreshData();
      showNotification(successMsg);
      return true;
    } catch (err) {
      console.warn('Backend sync failed, saving locally:', err);
      setSettings(updatedSettings);
      try {
        localStorage.setItem('modshine_settings', JSON.stringify(updatedSettings));
      } catch (e) {}
      if (onRefreshData) onRefreshData();
      showNotification('Saved locally! Live site updated.', 'warning');
      return true;
    }
  };

  // ================= 1. HERO SECTION HANDLERS =================
  const handleSaveHeroFields = (e) => {
    e.preventDefault();
    if (!settings) return;
    saveSettingsPayload(settings, 'Hero Section updated successfully!');
  };

  const handleOpenAddHeroPill = () => {
    setEditingHeroPillIdx(null);
    setHeroPillForm({ icon: 'ShieldCheck', title: '', subtitle: '' });
    setHeroPillModalOpen(true);
  };

  const handleOpenEditHeroPill = (idx) => {
    const list = settings?.hero?.highlights || [];
    const item = list[idx];
    if (!item) return;
    setEditingHeroPillIdx(idx);
    setHeroPillForm({
      icon: item.icon || 'ShieldCheck',
      title: item.title || '',
      subtitle: item.subtitle || ''
    });
    setHeroPillModalOpen(true);
  };

  const handleSaveHeroPill = (e) => {
    e.preventDefault();
    const currentHighlights = [...(settings?.hero?.highlights || [])];
    const newPill = {
      id: editingHeroPillIdx !== null ? currentHighlights[editingHeroPillIdx]?.id || `h-${Date.now()}` : `h-${Date.now()}`,
      ...heroPillForm
    };

    if (editingHeroPillIdx !== null) {
      currentHighlights[editingHeroPillIdx] = newPill;
    } else {
      currentHighlights.push(newPill);
    }

    const updated = {
      ...settings,
      hero: {
        ...(settings?.hero || {}),
        highlights: currentHighlights
      }
    };
    saveSettingsPayload(updated, editingHeroPillIdx !== null ? 'Highlight pill updated!' : 'Highlight pill added!');
    setHeroPillModalOpen(false);
  };

  const handleDeleteHeroPill = (idx) => {
    if (!window.confirm('Delete this highlight pill?')) return;
    const currentHighlights = [...(settings?.hero?.highlights || [])];
    currentHighlights.splice(idx, 1);
    const updated = {
      ...settings,
      hero: {
        ...(settings?.hero || {}),
        highlights: currentHighlights
      }
    };
    saveSettingsPayload(updated, 'Highlight pill deleted!');
  };

  // ================= 2. ABOUT US HANDLERS =================
  const handleSaveAboutFields = (e) => {
    e.preventDefault();
    if (!settings) return;
    saveSettingsPayload(settings, 'About Us story and stats updated!');
  };

  const handleOpenAddAboutGallery = () => {
    setEditingGalleryIdx(null);
    setAboutGalleryForm({
      url: '/assets/about_montage_1.jpg',
      title: '',
      category: 'Living Spaces',
      badge: 'Living Spaces',
      desc: ''
    });
    setAboutGalleryModalOpen(true);
  };

  const handleOpenEditAboutGallery = (idx) => {
    const list = settings?.about?.showcaseGallery || [];
    const item = list[idx];
    if (!item) return;
    setEditingGalleryIdx(idx);
    setAboutGalleryForm({
      url: item.url || '/assets/about_montage_1.jpg',
      title: item.title || '',
      category: item.category || 'Living Spaces',
      badge: item.badge || 'Living Spaces',
      desc: item.desc || ''
    });
    setAboutGalleryModalOpen(true);
  };

  const handleSaveAboutGallery = (e) => {
    e.preventDefault();
    const currentList = [...(settings?.about?.showcaseGallery || [])];
    const newItem = {
      id: editingGalleryIdx !== null ? currentList[editingGalleryIdx]?.id || `g-${Date.now()}` : `g-${Date.now()}`,
      ...aboutGalleryForm
    };

    if (editingGalleryIdx !== null) {
      currentList[editingGalleryIdx] = newItem;
    } else {
      currentList.push(newItem);
    }

    const updated = {
      ...settings,
      about: {
        ...(settings?.about || {}),
        showcaseGallery: currentList
      }
    };
    saveSettingsPayload(updated, editingGalleryIdx !== null ? 'Gallery item updated!' : 'Gallery photo added!');
    setAboutGalleryModalOpen(false);
  };

  const handleDeleteAboutGallery = (idx) => {
    if (!window.confirm('Delete this gallery photo?')) return;
    const currentList = [...(settings?.about?.showcaseGallery || [])];
    currentList.splice(idx, 1);
    const updated = {
      ...settings,
      about: {
        ...(settings?.about || {}),
        showcaseGallery: currentList
      }
    };
    saveSettingsPayload(updated, 'Gallery photo deleted!');
  };

  // ================= 3. SERVICES HANDLERS =================
  const handleOpenAddService = () => {
    setEditingServiceId(null);
    setServiceForm({
      id: `service-${Date.now()}`,
      title: '',
      subtitle: 'Style • Durability • Efficiency',
      description: '',
      image: '/assets/hero_living_room.jpg',
      icon: 'Home',
      deliverables: 'Custom Design, Factory Joinery, On-Site Installation, 10-Year Warranty'
    });
    setServiceModalOpen(true);
  };

  const handleOpenEditService = (service) => {
    setEditingServiceId(service.id);
    const delivStr = Array.isArray(service.deliverables) ? service.deliverables.join(', ') : (service.deliverables || '');
    setServiceForm({
      id: service.id,
      title: service.title || '',
      subtitle: service.subtitle || '',
      description: service.description || '',
      image: service.image || '/assets/hero_living_room.jpg',
      icon: service.icon || 'Home',
      deliverables: delivStr
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    const currentServices = [...(settings?.services || [])];
    const parsedDeliverables = serviceForm.deliverables
      .split(',')
      .map(d => d.trim())
      .filter(Boolean);

    const newService = {
      id: editingServiceId || serviceForm.id || `service-${Date.now()}`,
      title: serviceForm.title,
      subtitle: serviceForm.subtitle,
      description: serviceForm.description,
      image: serviceForm.image,
      icon: serviceForm.icon,
      deliverables: parsedDeliverables
    };

    if (editingServiceId) {
      const idx = currentServices.findIndex(s => s.id === editingServiceId);
      if (idx !== -1) currentServices[idx] = newService;
      else currentServices.push(newService);
    } else {
      currentServices.push(newService);
    }

    const updated = { ...settings, services: currentServices };
    saveSettingsPayload(updated, editingServiceId ? 'Service updated successfully!' : 'New service added!');
    setServiceModalOpen(false);
  };

  const handleDeleteService = (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    const currentServices = (settings?.services || []).filter(s => s.id !== serviceId);
    const updated = { ...settings, services: currentServices };
    saveSettingsPayload(updated, 'Service deleted successfully!');
  };

  // ================= 4. CATEGORIES HANDLERS =================
  const handleOpenAddCategory = () => {
    setEditingCategoryId(null);
    setCategoryForm({
      name: '',
      slug: '',
      tagline: '',
      description: '',
      image: '/assets/kitchen_island.jpg'
    });
    setCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat) => {
    setEditingCategoryId(cat.id);
    setCategoryForm({
      name: cat.name || '',
      slug: cat.slug || '',
      tagline: cat.tagline || '',
      description: cat.description || '',
      image: cat.image || '/assets/kitchen_island.jpg'
    });
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      if (editingCategoryId) {
        const res = await fetch(apiUrl(`/api/categories/${editingCategoryId}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryForm)
        });
        const updatedCat = await res.json().catch(() => ({ ...categoryForm, id: editingCategoryId }));
        setCategories(prev => prev.map(c => c.id === editingCategoryId ? updatedCat : c));
        showNotification('Category updated successfully!');
      } else {
        const newCatPayload = {
          ...categoryForm,
          slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          itemCount: 0
        };
        const res = await fetch(apiUrl('/api/categories'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCatPayload)
        });
        const createdCat = await res.json().catch(() => ({ ...newCatPayload, id: `cat-${Date.now()}` }));
        setCategories(prev => [...prev, createdCat]);
        showNotification('New category added successfully!');
      }
      if (onRefreshData) onRefreshData();
      setCategoryModalOpen(false);
    } catch (err) {
      console.error('Failed to save category:', err);
      showNotification('Saved locally!', 'warning');
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await fetch(apiUrl(`/api/categories/${catId}`), { method: 'DELETE' });
      setCategories(prev => prev.filter(c => c.id !== catId));
      if (onRefreshData) onRefreshData();
      showNotification('Category deleted successfully!');
    } catch (err) {
      setCategories(prev => prev.filter(c => c.id !== catId));
      showNotification('Category deleted locally', 'warning');
    }
  };

  // ================= 5. PRODUCTS HANDLERS =================
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      title: '',
      category: categories[0]?.slug || 'kitchen',
      categoryName: categories[0]?.name || 'Modular Kitchen',
      image: '/assets/kitchen_island.jpg',
      featured: false,
      inStock: true,
      boardType: 'Action TESA HDHMR Boilo',
      brand: 'Action TESA',
      hardware: 'German Hettich / Ebco Soft Close',
      finish: 'Cashmere Anti-Fingerprint Matte',
      description: '',
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      title: prod.title || '',
      category: prod.category || 'kitchen',
      categoryName: prod.categoryName || 'Modular Kitchen',
      image: prod.image || '/assets/kitchen_island.jpg',
      featured: prod.featured || false,
      inStock: prod.inStock !== false,
      boardType: prod.boardType || 'Action TESA HDHMR Boilo',
      brand: prod.brand || 'Action TESA',
      hardware: prod.hardware || 'German Hettich / Ebco Soft Close',
      finish: prod.finish || 'Cashmere Anti-Fingerprint Matte',
      description: prod.description || '',
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        const res = await fetch(apiUrl(`/api/products/${editingProductId}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productForm)
        });
        const updated = await res.json().catch(() => ({ ...productForm, id: editingProductId }));
        setProducts(prev => prev.map(p => p.id === editingProductId ? updated : p));
        showNotification('Product updated successfully!');
      } else {
        const res = await fetch(apiUrl('/api/products'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productForm)
        });
        const created = await res.json().catch(() => ({ ...productForm, id: `prod-${Date.now()}` }));
        setProducts(prev => [created, ...prev]);
        showNotification('Product added successfully!');
      }
      if (onRefreshData) onRefreshData();
      setProductModalOpen(false);
    } catch (err) {
      console.error('Failed to save product:', err);
      showNotification('Product saved locally!', 'warning');
    }
  };

  const handleDeleteProduct = async (prodId) => {
    if (!window.confirm('Are you sure you want to delete this furniture product?')) return;
    try {
      await fetch(apiUrl(`/api/products/${prodId}`), { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p.id !== prodId));
      if (onRefreshData) onRefreshData();
      showNotification('Product deleted successfully!');
    } catch (err) {
      setProducts(prev => prev.filter(p => p.id !== prodId));
      showNotification('Product deleted locally', 'warning');
    }
  };

  // ================= 6. MATERIALS & BRANDS HANDLERS =================
  const handleOpenAddMaterial = () => {
    setEditingMaterialIdx(null);
    setMaterialForm({ name: '', desc: '', tag: 'Action TESA' });
    setMaterialModalOpen(true);
  };

  const handleOpenEditMaterial = (idx) => {
    const list = settings?.materials || [];
    const item = list[idx];
    if (!item) return;
    setEditingMaterialIdx(idx);
    setMaterialForm({ name: item.name || '', desc: item.desc || '', tag: item.tag || '' });
    setMaterialModalOpen(true);
  };

  const handleSaveMaterial = (e) => {
    e.preventDefault();
    const currentList = [...(settings?.materials || [])];
    const newItem = { id: `m-${Date.now()}`, ...materialForm };

    if (editingMaterialIdx !== null) currentList[editingMaterialIdx] = newItem;
    else currentList.push(newItem);

    const updated = { ...settings, materials: currentList };
    saveSettingsPayload(updated, editingMaterialIdx !== null ? 'Material board updated!' : 'New material added!');
    setMaterialModalOpen(false);
  };

  const handleDeleteMaterial = (idx) => {
    if (!window.confirm('Delete this material/board?')) return;
    const currentList = [...(settings?.materials || [])];
    currentList.splice(idx, 1);
    const updated = { ...settings, materials: currentList };
    saveSettingsPayload(updated, 'Material deleted!');
  };

  // Partner Brands Handlers
  const handleOpenAddBrand = () => {
    setEditingBrandIdx(null);
    setBrandForm({ name: '', category: '', badge: 'Certified', desc: '' });
    setBrandModalOpen(true);
  };

  const handleOpenEditBrand = (idx) => {
    const list = settings?.brands || [];
    const item = list[idx];
    if (!item) return;
    setEditingBrandIdx(idx);
    setBrandForm({
      name: item.name || '',
      category: item.category || '',
      badge: item.badge || 'Certified',
      desc: item.desc || ''
    });
    setBrandModalOpen(true);
  };

  const handleSaveBrand = (e) => {
    e.preventDefault();
    const currentList = [...(settings?.brands || [])];
    const newItem = { id: `b-${Date.now()}`, ...brandForm };

    if (editingBrandIdx !== null) currentList[editingBrandIdx] = newItem;
    else currentList.push(newItem);

    const updated = { ...settings, brands: currentList };
    saveSettingsPayload(updated, editingBrandIdx !== null ? 'Brand updated!' : 'New partner brand added!');
    setBrandModalOpen(false);
  };

  const handleDeleteBrand = (idx) => {
    if (!window.confirm('Delete this brand partner?')) return;
    const currentList = [...(settings?.brands || [])];
    currentList.splice(idx, 1);
    const updated = { ...settings, brands: currentList };
    saveSettingsPayload(updated, 'Brand partner deleted!');
  };

  // ================= 7. PROCESS STEPS HANDLERS =================
  const handleOpenAddProcess = () => {
    const currentLen = (settings?.processSteps || []).length;
    setEditingProcessIdx(null);
    setProcessForm({
      step: `0${currentLen + 1}`,
      title: '',
      subtitle: '',
      description: '',
      timeline: 'Day 1 - 5',
      deliverable: '',
      highlight: 'Guaranteed'
    });
    setProcessModalOpen(true);
  };

  const handleOpenEditProcess = (idx) => {
    const list = settings?.processSteps || [];
    const item = list[idx];
    if (!item) return;
    setEditingProcessIdx(idx);
    setProcessForm({
      step: item.step || `0${idx + 1}`,
      title: item.title || '',
      subtitle: item.subtitle || '',
      description: item.description || '',
      timeline: item.timeline || '',
      deliverable: item.deliverable || '',
      highlight: item.highlight || ''
    });
    setProcessModalOpen(true);
  };

  const handleSaveProcess = (e) => {
    e.preventDefault();
    const currentList = [...(settings?.processSteps || [])];
    const newItem = { id: `p-${Date.now()}`, ...processForm };

    if (editingProcessIdx !== null) currentList[editingProcessIdx] = newItem;
    else currentList.push(newItem);

    const updated = { ...settings, processSteps: currentList };
    saveSettingsPayload(updated, editingProcessIdx !== null ? 'Process step updated!' : 'New process stage added!');
    setProcessModalOpen(false);
  };

  const handleDeleteProcess = (idx) => {
    if (!window.confirm('Delete this process stage?')) return;
    const currentList = [...(settings?.processSteps || [])];
    currentList.splice(idx, 1);
    const updated = { ...settings, processSteps: currentList };
    saveSettingsPayload(updated, 'Process stage deleted!');
  };

  // ================= 8. TESTIMONIALS HANDLERS =================
  const handleOpenAddTestimonial = () => {
    setEditingTestimonialId(null);
    setTestimonialForm({
      id: `t-${Date.now()}`,
      name: '',
      location: 'Kovilpatti',
      project: 'Modular Kitchen & Wardrobe',
      rating: 5,
      text: '',
      date: 'Recent',
      avatar: '/assets/page_5.jpg'
    });
    setTestimonialModalOpen(true);
  };

  const handleOpenEditTestimonial = (item) => {
    setEditingTestimonialId(item.id);
    setTestimonialForm({
      id: item.id,
      name: item.name || '',
      location: item.location || 'Kovilpatti',
      project: item.project || '',
      rating: item.rating || 5,
      text: item.text || '',
      date: item.date || '',
      avatar: item.avatar || '/assets/page_5.jpg'
    });
    setTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e) => {
    e.preventDefault();
    const currentList = [...(settings?.testimonials || [])];
    const newItem = {
      id: editingTestimonialId || testimonialForm.id || `t-${Date.now()}`,
      ...testimonialForm
    };

    if (editingTestimonialId) {
      const idx = currentList.findIndex(t => t.id === editingTestimonialId);
      if (idx !== -1) currentList[idx] = newItem;
      else currentList.push(newItem);
    } else {
      currentList.push(newItem);
    }

    const updated = { ...settings, testimonials: currentList };
    saveSettingsPayload(updated, editingTestimonialId ? 'Review updated!' : 'New testimonial added!');
    setTestimonialModalOpen(false);
  };

  const handleDeleteTestimonial = (id) => {
    if (!window.confirm('Delete this customer review?')) return;
    const currentList = (settings?.testimonials || []).filter(t => t.id !== id);
    const updated = { ...settings, testimonials: currentList };
    saveSettingsPayload(updated, 'Review deleted!');
  };

  // ================= 9. SHOWROOM & FOOTER HANDLERS =================
  const handleSaveShowroomFields = (e) => {
    e.preventDefault();
    if (!settings) return;
    saveSettingsPayload(settings, 'Showroom contact details & footer updated!');
  };

  // ================= 10. INQUIRIES HANDLERS =================
  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      const res = await fetch(apiUrl(`/api/inquiries/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
        showNotification(`Lead status updated to ${status}`);
        if (onRefreshData) onRefreshData();
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead inquiry?')) return;
    try {
      const res = await fetch(apiUrl(`/api/inquiries/${id}`), { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
        showNotification('Lead deleted successfully');
        if (onRefreshData) onRefreshData();
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  // Filtered products
  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    const matchesSearch = !searchTerm ||
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtered inquiries
  const filteredInquiries = inquiries.filter(i => {
    if (inquiryStatusFilter === 'all') return true;
    return i.status === inquiryStatusFilter;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {msgAlert && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold border backdrop-blur-md animate-fadeIn ${
          msgAlert.type === 'warning'
            ? 'bg-amber-500/90 text-slate-950 border-amber-300'
            : 'bg-emerald-600/90 text-white border-emerald-400'
        }`}>
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{msgAlert.text}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Return to public website"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Website</span>
          </button>

          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
              Modshine <span className="text-gold-champagne font-normal text-sm sm:text-base">CMS Studio</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Refresh database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync Data</span>
          </button>

          <button
            onClick={onBackToSite}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-gold-primary to-gold-champagne text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </button>
        </div>
      </header>

      {/* Navigation Pills Bar */}
      <nav className="bg-slate-950/80 border-b border-slate-800 px-4 sm:px-8 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 sm:gap-2 sticky top-[57px] z-30 backdrop-blur-md">
        {[
          { id: 'hero', label: '1. Hero Section', icon: Sparkles },
          { id: 'about', label: '2. About Us', icon: Compass },
          { id: 'services', label: '3. Services', icon: Layers, count: (settings?.services || []).length },
          { id: 'categories', label: '4. Categories', icon: Sliders, count: categories.length },
          { id: 'products', label: '5. Catalog / Products', icon: Package, count: products.length },
          { id: 'materials', label: '6. Materials & Brands', icon: Award },
          { id: 'process', label: '7. Process Stages', icon: Clock, count: (settings?.processSteps || []).length },
          { id: 'testimonials', label: '8. Reviews', icon: Star, count: (settings?.testimonials || []).length },
          { id: 'showroom', label: '9. Showroom & Footer', icon: MapPin },
          { id: 'inquiries', label: '10. Leads Inbox', icon: Inbox, count: inquiries.filter(i => i.status === 'New').length, badgeColor: 'bg-rose-500' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-brand-primary text-white shadow-md border border-gold-champagne/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-gold-champagne" />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  tab.badgeColor ? `${tab.badgeColor} text-white` : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        
        {/* ======================================================== */}
        {/* TAB 1: HERO SECTION EDITOR                               */}
        {/* ======================================================== */}
        {activeTab === 'hero' && settings && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Hero Section Content</h2>
                <p className="text-xs text-slate-400 mt-1">Change headline, subtitle, buttons, hero showcase image, and trust highlights.</p>
              </div>
              <button
                onClick={handleSaveHeroFields}
                className="px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-medium text-white font-bold text-xs flex items-center gap-2 shadow-lg border border-gold-champagne/40"
              >
                <Save className="w-4 h-4 text-gold-champagne" />
                <span>Save Hero Changes</span>
              </button>
            </div>

            {/* Hero Main Fields Form */}
            <form onSubmit={handleSaveHeroFields} className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Top Motto Pill</label>
                  <input
                    type="text"
                    value={settings.hero?.motto || settings.motto || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      hero: { ...(settings.hero || {}), motto: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Statewide Coverage Tag</label>
                  <input
                    type="text"
                    value={settings.serviceCoverage || ''}
                    onChange={(e) => setSettings({ ...settings, serviceCoverage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Main Headline (First Line)</label>
                  <input
                    type="text"
                    value={settings.hero?.headline || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      hero: { ...(settings.hero || {}), headline: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Golden Highlight Text (Second Line)</label>
                  <input
                    type="text"
                    value={settings.hero?.highlightText || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      hero: { ...(settings.hero || {}), highlightText: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Sub-Headline / Description</label>
                  <textarea
                    rows={3}
                    value={settings.hero?.description || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      hero: { ...(settings.hero || {}), description: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Primary CTA Button Text</label>
                  <input
                    type="text"
                    value={settings.hero?.ctaText || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      hero: { ...(settings.hero || {}), ctaText: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <CloudinaryImageField
                    label="Hero Right Showcase Image"
                    value={settings.hero?.heroImage || ''}
                    uploadKey="hero"
                    uploadingKey={uploadingKey}
                    onUpload={handleCloudinaryFileUpload}
                    onDelete={handleCloudinaryFileDelete}
                    onChange={(newUrl) => setSettings({
                      ...settings,
                      hero: { ...(settings.hero || {}), heroImage: newUrl }
                    })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Hero Image Title</label>
                  <input
                    type="text"
                    value={settings.hero?.heroImageTitle || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      hero: { ...(settings.hero || {}), heroImageTitle: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Hero Image Badge</label>
                  <input
                    type="text"
                    value={settings.hero?.heroImageBadge || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      hero: { ...(settings.hero || {}), heroImageBadge: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>
            </form>

            {/* Hero Highlights Sub-Manager */}
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Hero Guarantee & Trust Pills</h3>
                  <p className="text-xs text-slate-400">Pills displayed right under the description (e.g. 10-Year Warranty, Hettich & Ebco, 450+ Homes)</p>
                </div>
                <button
                  onClick={handleOpenAddHeroPill}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gold-champagne font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Pill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(settings.hero?.highlights || []).map((pill, idx) => (
                  <div key={pill.id || idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-champagne bg-slate-800 px-2 py-0.5 rounded">
                        {pill.icon || 'ShieldCheck'}
                      </span>
                      <h4 className="font-bold text-xs text-white mt-1.5">{pill.title}</h4>
                      <p className="text-[11px] text-slate-400">{pill.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditHeroPill(idx)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteHeroPill(idx)}
                        className="p-1.5 rounded-lg hover:bg-red-950 text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: ABOUT US EDITOR                                   */}
        {/* ======================================================== */}
        {activeTab === 'about' && settings && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">About Us Section</h2>
                <p className="text-xs text-slate-400 mt-1">Update story paragraphs, numbers (450+ Homes, 15+ Years), and portfolio photo gallery.</p>
              </div>
              <button
                onClick={handleSaveAboutFields}
                className="px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-medium text-white font-bold text-xs flex items-center gap-2 shadow-lg border border-gold-champagne/40"
              >
                <Save className="w-4 h-4 text-gold-champagne" />
                <span>Save About Changes</span>
              </button>
            </div>

            {/* Story & Stats */}
            <form onSubmit={handleSaveAboutFields} className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">About Section Title</label>
                  <input
                    type="text"
                    value={settings.about?.title || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      about: { ...(settings.about || {}), title: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Story Paragraph 1</label>
                  <textarea
                    rows={3}
                    value={settings.about?.storyParagraphs?.[0] || ''}
                    onChange={(e) => {
                      const paras = [...(settings.about?.storyParagraphs || ['', ''])];
                      paras[0] = e.target.value;
                      setSettings({
                        ...settings,
                        about: { ...(settings.about || {}), storyParagraphs: paras }
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Story Paragraph 2</label>
                  <textarea
                    rows={3}
                    value={settings.about?.storyParagraphs?.[1] || ''}
                    onChange={(e) => {
                      const paras = [...(settings.about?.storyParagraphs || ['', ''])];
                      paras[1] = e.target.value;
                      setSettings({
                        ...settings,
                        about: { ...(settings.about || {}), storyParagraphs: paras }
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {/* Key Numbers */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Projects Completed Count</label>
                  <input
                    type="number"
                    value={settings.stats?.projectsCompleted || 450}
                    onChange={(e) => setSettings({
                      ...settings,
                      stats: { ...(settings.stats || {}), projectsCompleted: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Happy Families Count</label>
                  <input
                    type="number"
                    value={settings.stats?.happyFamilies || 420}
                    onChange={(e) => setSettings({
                      ...settings,
                      stats: { ...(settings.stats || {}), happyFamilies: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Years Experience</label>
                  <input
                    type="number"
                    value={settings.stats?.yearsExperience || 15}
                    onChange={(e) => setSettings({
                      ...settings,
                      stats: { ...(settings.stats || {}), yearsExperience: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Warranty Years</label>
                  <input
                    type="number"
                    value={settings.stats?.warrantyYears || 10}
                    onChange={(e) => setSettings({
                      ...settings,
                      stats: { ...(settings.stats || {}), warrantyYears: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>
            </form>

            {/* About Showcase Gallery Manager */}
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">About Showcase Photo Gallery</h3>
                  <p className="text-xs text-slate-400">Manage the 4 interactive portfolio images shown on the left of the About section.</p>
                </div>
                <button
                  onClick={handleOpenAddAboutGallery}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gold-champagne font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(settings.about?.showcaseGallery || []).map((img, idx) => (
                  <div key={img.id || idx} className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div className="relative h-36 bg-slate-950">
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-[10px] text-white px-2 py-0.5 rounded font-bold">
                        {img.badge}
                      </span>
                    </div>
                    <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-xs text-white line-clamp-1">{img.title}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{img.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEditAboutGallery(idx)}
                          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAboutGallery(idx)}
                          className="p-1.5 rounded-lg hover:bg-red-950 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SERVICES MANAGER                                  */}
        {/* ======================================================== */}
        {activeTab === 'services' && settings && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Core Interior Services</h2>
                <p className="text-xs text-slate-400 mt-1">Add, edit, or remove services displayed in the 4-card Services section.</p>
              </div>
              <button
                onClick={handleOpenAddService}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-primary to-gold-champagne text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(settings.services || []).map((s) => (
                <div key={s.id} className="rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col justify-between">
                  <div className="relative h-48 bg-slate-900">
                    <img src={s.image || '/assets/hero_living_room.jpg'} alt={s.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-brand-primary text-gold-champagne text-xs px-2.5 py-1 rounded-xl font-bold border border-gold-champagne/30">
                      {s.icon || 'Layers'}
                    </span>
                    <span className="absolute bottom-3 left-3 text-[11px] font-bold uppercase tracking-wider text-gold-champagne bg-slate-900/90 px-2.5 py-1 rounded-md">
                      {s.subtitle}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-bold text-white">{s.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
                      
                      {/* Deliverables tags */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {(Array.isArray(s.deliverables) ? s.deliverables : []).map((d, i) => (
                          <span key={i} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800">
                            • {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-900 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditService(s)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteService(s.id)}
                        className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CATEGORIES MANAGER                                */}
        {/* ======================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Furniture & Modular Categories</h2>
                <p className="text-xs text-slate-400 mt-1">Manage categories (Kitchen, Wardrobe, TV Unit, Partitions, Pooja Mandir, etc.)</p>
              </div>
              <button
                onClick={handleOpenAddCategory}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-primary to-gold-champagne text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col justify-between">
                  <div className="relative h-40 bg-slate-900">
                    <img src={cat.image || '/assets/kitchen_island.jpg'} alt={cat.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-slate-900/90 text-gold-champagne text-[11px] px-2.5 py-1 rounded-lg font-bold border border-slate-800">
                      Slug: {cat.slug}
                    </span>
                  </div>
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">{cat.name}</h3>
                      <p className="text-xs text-gold-champagne font-medium mt-0.5">{cat.tagline}</p>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1.5">{cat.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-900 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditCategory(cat)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: PRODUCTS / CATALOG                                */}
        {/* ======================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Product Catalog & Showcase</h2>
                <p className="text-xs text-slate-400 mt-1">All {products.length} catalog items across kitchens, wardrobes, TV units, and pooja mandirs.</p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-primary to-gold-champagne text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Furniture Item</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search products by title, category, or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-primary"
                />
              </div>

              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Products Table */}
            <div className="rounded-3xl border border-slate-800 overflow-hidden bg-slate-950 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Item</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Materials & Hardware</th>
                      <th className="py-3.5 px-4">Featured</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500">
                          No products found.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <img src={p.image || '/assets/kitchen_island.jpg'} alt={p.title} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-800" />
                            <div className="min-w-0">
                              <strong className="block text-white font-semibold truncate max-w-xs">{p.title}</strong>
                              <span className="text-[11px] text-slate-400 truncate max-w-xs block">{p.finish}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-gold-champagne">
                            {p.categoryName || p.category}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 max-w-xs">
                            <span className="text-white block font-medium">{p.boardType}</span>
                            <span className="text-[10px] text-slate-500">{p.hardware}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            {p.featured ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                ★ Featured
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-500">Standard</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
                                title="Edit Product"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
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

        {/* ======================================================== */}
        {/* TAB 6: MATERIALS & BRANDS                                */}
        {/* ======================================================== */}
        {activeTab === 'materials' && settings && (
          <div className="space-y-10 animate-fadeIn">
            {/* Section A: Certified Boards */}
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">1. Certified Boards & Substrates</h3>
                  <p className="text-xs text-slate-400">Core boards displayed under Materials section (HDHMR Boilo, BWP Marine, etc.)</p>
                </div>
                <button
                  onClick={handleOpenAddMaterial}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gold-champagne font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Board</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(settings.materials || []).map((m, idx) => (
                  <div key={m.id || idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {m.tag}
                      </span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenEditMaterial(idx)} className="p-1 rounded text-slate-400 hover:text-white">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteMaterial(idx)} className="p-1 rounded text-slate-400 hover:text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-white">{m.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section B: Partner Brands */}
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">2. Partner Engineering Brands</h3>
                  <p className="text-xs text-slate-400">Action TESA, Greenply, CenturyPly, Hettich, Ebco, Sleek</p>
                </div>
                <button
                  onClick={handleOpenAddBrand}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gold-champagne font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Partner Brand</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(settings.brands || []).map((b, idx) => (
                  <div key={b.id || idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-serif text-lg font-bold text-white">{b.name}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-champagne bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {b.badge}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-brand-primary">{b.category}</p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{b.desc}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-900 flex justify-end gap-1">
                      <button onClick={() => handleOpenEditBrand(idx)} className="p-1 rounded text-slate-400 hover:text-white">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteBrand(idx)} className="p-1 rounded text-slate-400 hover:text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: PROCESS STAGES                                    */}
        {/* ======================================================== */}
        {activeTab === 'process' && settings && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">6-Stage Process Workflow</h2>
                <p className="text-xs text-slate-400 mt-1">Manage the interactive stage-by-stage journey from Discovery to 45-Day Handover.</p>
              </div>
              <button
                onClick={handleOpenAddProcess}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-primary to-gold-champagne text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Stage</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(settings.processSteps || []).map((st, idx) => (
                <div key={st.id || idx} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold font-serif text-gold-champagne bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                        Stage {st.step}
                      </span>
                      <span className="text-[11px] text-slate-400">{st.timeline}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white">{st.title}</h3>
                    <p className="text-xs text-gold-dark font-medium">{st.subtitle}</p>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">{st.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-400 font-semibold truncate max-w-[150px]">
                      ✓ {st.deliverable}
                    </span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleOpenEditProcess(idx)} className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteProcess(idx)} className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: CUSTOMER TESTIMONIALS                             */}
        {/* ======================================================== */}
        {activeTab === 'testimonials' && settings && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Client Testimonials & Reviews</h2>
                <p className="text-xs text-slate-400 mt-1">Manage verified reviews from homeowners in Kovilpatti, Madurai, Tirunelveli, and Chennai.</p>
              </div>
              <button
                onClick={handleOpenAddTestimonial}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-primary to-gold-champagne text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Testimonial</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(settings.testimonials || []).map((t) => (
                <div key={t.id} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{t.text}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={t.avatar || '/assets/page_5.jpg'} alt={t.name} className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-700" />
                      <div className="min-w-0">
                        <strong className="block text-white text-xs font-semibold truncate">{t.name}</strong>
                        <span className="text-[10px] text-slate-400 block truncate">{t.location} • {t.project}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button onClick={() => handleOpenEditTestimonial(t)} className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteTestimonial(t.id)} className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 9: SHOWROOM & FOOTER SETTINGS                        */}
        {/* ======================================================== */}
        {activeTab === 'showroom' && settings && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Showroom & Footer Settings</h2>
                <p className="text-xs text-slate-400 mt-1">Update contact phone, address, working hours, announcement banner, and footer snippet.</p>
              </div>
              <button
                onClick={handleSaveShowroomFields}
                className="px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-medium text-white font-bold text-xs flex items-center gap-2 shadow-lg border border-gold-champagne/40"
              >
                <Save className="w-4 h-4 text-gold-champagne" />
                <span>Save Showroom Changes</span>
              </button>
            </div>

            <form onSubmit={handleSaveShowroomFields} className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Company Name</label>
                  <input
                    type="text"
                    value={settings.companyName || ''}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Brand Tagline</label>
                  <input
                    type="text"
                    value={settings.tagline || ''}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Primary Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={settings.phone || ''}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Secondary Phone</label>
                  <input
                    type="text"
                    value={settings.secondaryPhone || ''}
                    onChange={(e) => setSettings({ ...settings, secondaryPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Official Email</label>
                  <input
                    type="email"
                    value={settings.email || ''}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Instagram Handle</label>
                  <input
                    type="text"
                    value={settings.instagram || ''}
                    onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Full Showroom Address (Kovilpatti HQ)</label>
                  <input
                    type="text"
                    value={settings.address || ''}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Working Hours</label>
                  <input
                    type="text"
                    value={settings.workingHours || ''}
                    onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Announcement Banner (Top of page)</label>
                  <input
                    type="text"
                    value={settings.announcement || ''}
                    onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Footer About Snippet</label>
                  <textarea
                    rows={2}
                    value={settings.footer?.aboutSnippet || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      footer: { ...(settings.footer || {}), aboutSnippet: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 10: INQUIRIES & LEADS INBOX                          */}
        {/* ======================================================== */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Consultation Requests & Leads</h2>
                <p className="text-xs text-slate-400 mt-1">Review live inquiry submissions from website contact & booking forms.</p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {['all', 'New', 'Contacted', 'In-Progress', 'Completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setInquiryStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      inquiryStatusFilter === st
                        ? 'bg-brand-primary text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st === 'all' ? 'All Leads' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="rounded-3xl border border-slate-800 overflow-hidden bg-slate-950 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Client Name & Phone</th>
                      <th className="py-3.5 px-4">Service</th>
                      <th className="py-3.5 px-4">City</th>
                      <th className="py-3.5 px-4">Property / Note</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500">
                          No inquiries found.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <strong className="block text-white font-semibold">{inq.name}</strong>
                            <a href={`tel:${inq.phone}`} className="text-gold-champagne font-bold hover:underline flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              <span>{inq.phone}</span>
                            </a>
                            {inq.email && <span className="text-[10px] text-slate-500 block">{inq.email}</span>}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-200">
                            {inq.service}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">
                            {inq.city || 'Kovilpatti'}
                          </td>
                          <td className="py-3.5 px-4 max-w-xs text-slate-300">
                            <p className="line-clamp-2">{inq.message || inq.propertyType || 'Free consultation requested.'}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border focus:outline-none ${
                                inq.status === 'New'
                                  ? 'bg-rose-950/80 text-rose-300 border-rose-700'
                                  : inq.status === 'Contacted'
                                    ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                                    : inq.status === 'In-Progress'
                                      ? 'bg-blue-950/80 text-blue-300 border-blue-700'
                                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
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
                              className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

      </main>

      {/* ======================================================== */}
      {/* MODAL 1: PRODUCT ADD / EDIT                              */}
      {/* ======================================================== */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingProductId ? 'Edit Furniture Item' : 'Add New Furniture Item'}
              </h3>
              <button onClick={() => setProductModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Product Title</label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. Linear Luxe Island Modular Kitchen"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => {
                      const selCat = categories.find(c => c.slug === e.target.value);
                      setProductForm({
                        ...productForm,
                        category: e.target.value,
                        categoryName: selCat?.name || e.target.value
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <CloudinaryImageField
                    label="Product Display Image"
                    value={productForm.image}
                    uploadKey="product"
                    uploadingKey={uploadingKey}
                    onUpload={handleCloudinaryFileUpload}
                    onDelete={handleCloudinaryFileDelete}
                    onChange={(newUrl) => setProductForm({ ...productForm, image: newUrl })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Core Board Material</label>
                  <input
                    type="text"
                    value={productForm.boardType}
                    onChange={(e) => setProductForm({ ...productForm, boardType: e.target.value })}
                    placeholder="Action TESA HDHMR Boilo"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Hardware Grade</label>
                  <input
                    type="text"
                    value={productForm.hardware}
                    onChange={(e) => setProductForm({ ...productForm, hardware: e.target.value })}
                    placeholder="German Hettich Sensys Soft-Close"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-300 block">Finish & Texture</label>
                  <input
                    type="text"
                    value={productForm.finish}
                    onChange={(e) => setProductForm({ ...productForm, finish: e.target.value })}
                    placeholder="Cashmere Anti-Fingerprint Matte"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-300 block">Description & Client Benefits</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-semibold">
                    <input
                      type="checkbox"
                      checked={productForm.featured}
                      onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-brand-primary"
                    />
                    <span>Feature on Homepage Spotlight</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-primary hover:bg-brand-medium text-white font-bold"
                >
                  {editingProductId ? 'Update Product' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: SERVICE ADD / EDIT                              */}
      {/* ======================================================== */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 max-w-xl w-full p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingServiceId ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setServiceModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Service Title</label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="Residential Interior Design"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Subtitle Tag</label>
                  <input
                    type="text"
                    value={serviceForm.subtitle}
                    onChange={(e) => setServiceForm({ ...serviceForm, subtitle: e.target.value })}
                    placeholder="Comfort • Aesthetics • Practicality"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Icon</label>
                  <select
                    value={serviceForm.icon}
                    onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  >
                    <option value="Home">Home</option>
                    <option value="CookingPot">CookingPot (Kitchen)</option>
                    <option value="Briefcase">Briefcase (Commercial)</option>
                    <option value="Key">Key (Turnkey)</option>
                    <option value="Layers">Layers</option>
                  </select>
                </div>
              </div>

              <CloudinaryImageField
                label="Service Cover Image"
                value={serviceForm.image}
                uploadKey="service"
                uploadingKey={uploadingKey}
                onUpload={handleCloudinaryFileUpload}
                onDelete={handleCloudinaryFileDelete}
                onChange={(newUrl) => setServiceForm({ ...serviceForm, image: newUrl })}
              />

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Description</label>
                <textarea
                  rows={2}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Deliverables (comma separated)</label>
                <textarea
                  rows={2}
                  value={serviceForm.deliverables}
                  onChange={(e) => setServiceForm({ ...serviceForm, deliverables: e.target.value })}
                  placeholder="3D Floor Plan, Action TESA HDHMR, Hettich Hardware, 10-Year Warranty"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-primary hover:bg-brand-medium text-white font-bold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: CATEGORY ADD / EDIT                             */}
      {/* ======================================================== */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingCategoryId ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button onClick={() => setCategoryModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Category Name</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="Modular Kitchen"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Slug / Key</label>
                  <input
                    type="text"
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                    placeholder="kitchen"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Tagline</label>
                  <input
                    type="text"
                    value={categoryForm.tagline}
                    onChange={(e) => setCategoryForm({ ...categoryForm, tagline: e.target.value })}
                    placeholder="Modern | Functional | Timeless"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <CloudinaryImageField
                label="Category Banner Image"
                value={categoryForm.image}
                uploadKey="category"
                uploadingKey={uploadingKey}
                onUpload={handleCloudinaryFileUpload}
                onDelete={handleCloudinaryFileDelete}
                onChange={(newUrl) => setCategoryForm({ ...categoryForm, image: newUrl })}
              />

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Description</label>
                <textarea
                  rows={2}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-primary hover:bg-brand-medium text-white font-bold"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: TESTIMONIAL ADD / EDIT                          */}
      {/* ======================================================== */}
      {testimonialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingTestimonialId ? 'Edit Review' : 'Add Client Testimonial'}
              </h3>
              <button onClick={() => setTestimonialModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Client Name</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    placeholder="e.g. Dr. K. Senthil Kumar"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Location / City</label>
                  <input
                    type="text"
                    value={testimonialForm.location}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                    placeholder="Kovilpatti"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Project Scope</label>
                  <input
                    type="text"
                    value={testimonialForm.project}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, project: e.target.value })}
                    placeholder="Full 3 BHK Turnkey Interior"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Rating (Stars)</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  >
                    <option value="5">★★★★★ (5 Stars)</option>
                    <option value="4">★★★★☆ (4 Stars)</option>
                  </select>
                </div>
              </div>

              <CloudinaryImageField
                label="Client Photo / Avatar"
                value={testimonialForm.avatar}
                uploadKey="testimonial"
                uploadingKey={uploadingKey}
                onUpload={handleCloudinaryFileUpload}
                onDelete={handleCloudinaryFileDelete}
                onChange={(newUrl) => setTestimonialForm({ ...testimonialForm, avatar: newUrl })}
              />

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Review Feedback Text</label>
                <textarea
                  rows={3}
                  required
                  value={testimonialForm.text}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                  placeholder="Modshine transformed our home in Kovilpatti beyond expectations..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setTestimonialModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-primary hover:bg-brand-medium text-white font-bold"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: HERO HIGHLIGHT PILL ADD / EDIT                  */}
      {/* ======================================================== */}
      {heroPillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 max-w-md w-full p-6 space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingHeroPillIdx !== null ? 'Edit Guarantee Pill' : 'Add Guarantee Pill'}
              </h3>
              <button onClick={() => setHeroPillModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHeroPill} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Icon</label>
                <select
                  value={heroPillForm.icon}
                  onChange={(e) => setHeroPillForm({ ...heroPillForm, icon: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                >
                  <option value="ShieldCheck">ShieldCheck (Warranty)</option>
                  <option value="Award">Award (Brands)</option>
                  <option value="CheckCircle2">CheckCircle2 (Completed Homes)</option>
                  <option value="Clock">Clock (Timings)</option>
                  <option value="Sparkles">Sparkles (Luxury)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Title (e.g. 10-Year Warranty)</label>
                <input
                  type="text"
                  required
                  value={heroPillForm.title}
                  onChange={(e) => setHeroPillForm({ ...heroPillForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Subtitle (e.g. HDHMR & Marine)</label>
                <input
                  type="text"
                  required
                  value={heroPillForm.subtitle}
                  onChange={(e) => setHeroPillForm({ ...heroPillForm, subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setHeroPillModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-primary text-white font-bold"
                >
                  Save Pill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 6: ABOUT GALLERY ADD / EDIT                        */}
      {/* ======================================================== */}
      {aboutGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 max-w-md w-full p-6 space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingGalleryIdx !== null ? 'Edit Portfolio Photo' : 'Add Portfolio Photo'}
              </h3>
              <button onClick={() => setAboutGalleryModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAboutGallery} className="space-y-4 text-xs">
              <CloudinaryImageField
                label="Portfolio Photo"
                value={aboutGalleryForm.url}
                uploadKey="gallery"
                uploadingKey={uploadingKey}
                onUpload={handleCloudinaryFileUpload}
                onDelete={handleCloudinaryFileDelete}
                onChange={(newUrl) => setAboutGalleryForm({ ...aboutGalleryForm, url: newUrl })}
              />

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Photo Title</label>
                <input
                  type="text"
                  required
                  value={aboutGalleryForm.title}
                  onChange={(e) => setAboutGalleryForm({ ...aboutGalleryForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Category Label</label>
                  <input
                    type="text"
                    value={aboutGalleryForm.category}
                    onChange={(e) => setAboutGalleryForm({ ...aboutGalleryForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Badge Tag</label>
                  <input
                    type="text"
                    value={aboutGalleryForm.badge}
                    onChange={(e) => setAboutGalleryForm({ ...aboutGalleryForm, badge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Description / Details</label>
                <textarea
                  rows={2}
                  value={aboutGalleryForm.desc}
                  onChange={(e) => setAboutGalleryForm({ ...aboutGalleryForm, desc: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAboutGalleryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-primary text-white font-bold"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 7: BOARD / MATERIAL ADD / EDIT                     */}
      {/* ======================================================== */}
      {materialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 max-w-md w-full p-6 space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingMaterialIdx !== null ? 'Edit Material Board' : 'Add Material Board'}
              </h3>
              <button onClick={() => setMaterialModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMaterial} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Board Name</label>
                <input
                  type="text"
                  required
                  value={materialForm.name}
                  onChange={(e) => setMaterialForm({ ...materialForm, name: e.target.value })}
                  placeholder="HDHMR Boilo"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Brand Tag</label>
                <input
                  type="text"
                  required
                  value={materialForm.tag}
                  onChange={(e) => setMaterialForm({ ...materialForm, tag: e.target.value })}
                  placeholder="Action TESA"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Description</label>
                <textarea
                  rows={2}
                  required
                  value={materialForm.desc}
                  onChange={(e) => setMaterialForm({ ...materialForm, desc: e.target.value })}
                  placeholder="100% Waterproof high density boilo grade..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMaterialModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-primary text-white font-bold"
                >
                  Save Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 8: PARTNER BRAND ADD / EDIT                        */}
      {/* ======================================================== */}
      {brandModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 max-w-md w-full p-6 space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingBrandIdx !== null ? 'Edit Partner Brand' : 'Add Partner Brand'}
              </h3>
              <button onClick={() => setBrandModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBrand} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={brandForm.name}
                    onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                    placeholder="Hettich"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Badge</label>
                  <input
                    type="text"
                    value={brandForm.badge}
                    onChange={(e) => setBrandForm({ ...brandForm, badge: e.target.value })}
                    placeholder="Germany"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Category Label</label>
                <input
                  type="text"
                  required
                  value={brandForm.category}
                  onChange={(e) => setBrandForm({ ...brandForm, category: e.target.value })}
                  placeholder="German Hardware & Hinges"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Description</label>
                <textarea
                  rows={2}
                  value={brandForm.desc}
                  onChange={(e) => setBrandForm({ ...brandForm, desc: e.target.value })}
                  placeholder="Sensys soft-close dampers and InnoTech drawers..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBrandModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-primary text-white font-bold"
                >
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 9: PROCESS STAGE ADD / EDIT                        */}
      {/* ======================================================== */}
      {processModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 max-w-md w-full p-6 space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingProcessIdx !== null ? 'Edit Process Stage' : 'Add Process Stage'}
              </h3>
              <button onClick={() => setProcessModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProcess} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Step Number</label>
                  <input
                    type="text"
                    required
                    value={processForm.step}
                    onChange={(e) => setProcessForm({ ...processForm, step: e.target.value })}
                    placeholder="01"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Timeline (Duration)</label>
                  <input
                    type="text"
                    value={processForm.timeline}
                    onChange={(e) => setProcessForm({ ...processForm, timeline: e.target.value })}
                    placeholder="Day 1 - 3"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Stage Title</label>
                <input
                  type="text"
                  required
                  value={processForm.title}
                  onChange={(e) => setProcessForm({ ...processForm, title: e.target.value })}
                  placeholder="Discovery & Consultation"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Stage Subtitle</label>
                <input
                  type="text"
                  value={processForm.subtitle}
                  onChange={(e) => setProcessForm({ ...processForm, subtitle: e.target.value })}
                  placeholder="Talk to our Interior Designer"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Description</label>
                <textarea
                  rows={2}
                  value={processForm.description}
                  onChange={(e) => setProcessForm({ ...processForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Deliverable</label>
                <input
                  type="text"
                  value={processForm.deliverable}
                  onChange={(e) => setProcessForm({ ...processForm, deliverable: e.target.value })}
                  placeholder="Lifestyle Analysis & Blueprint"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProcessModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-primary text-white font-bold"
                >
                  Save Stage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
