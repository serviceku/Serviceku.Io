/**
 * Serviceku - World-Class Business Website
 * Jasa Service Elektronik Profesional Panggilan
 * Indramayu, Cirebon, & Majalengka
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { BannerSlider } from './components/BannerSlider';
import { ServiceCatalog } from './components/ServiceCatalog';
import { WhyUsSection } from './components/WhyUsSection';
import { GallerySection } from './components/GallerySection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AIConsultantModal } from './components/AIConsultantModal';
import { APP_CONFIG, ServiceItem, BannerItem } from './appConfig';
import { api, AdminUser } from './services/api';

export default function App() {
  // Services & Banners State
  const [services, setServices] = useState<ServiceItem[]>(APP_CONFIG.products);
  const [banners, setBanners] = useState<BannerItem[]>(APP_CONFIG.banners);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Admin Auth State
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string>('');
  const [adminUsername, setAdminUsername] = useState<string>('admin');

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Load initial data from server
  const loadData = useCallback(async () => {
    try {
      const [fetchedServices, fetchedBanners] = await Promise.all([
        api.getServices(),
        api.getBanners(),
      ]);
      if (fetchedServices && fetchedServices.length > 0) {
        setServices(fetchedServices);
      }
      if (fetchedBanners && fetchedBanners.length > 0) {
        setBanners(fetchedBanners);
      }
    } catch (err) {
      console.warn('Using local configuration data:', err);
    }
  }, []);

  // Check stored admin session on mount
  useEffect(() => {
    loadData();

    const savedToken = localStorage.getItem('sk_admin_token');
    const savedUser = localStorage.getItem('sk_admin_user');
    if (savedToken) {
      setAdminToken(savedToken);
      if (savedUser) setAdminUsername(savedUser);
      api.verifyToken(savedToken).then((valid) => {
        setIsAdmin(valid);
        if (!valid) {
          localStorage.removeItem('sk_admin_token');
          localStorage.removeItem('sk_admin_user');
        }
      });
    }
  }, [loadData]);

  // Auth Handlers
  const handleLoginSuccess = (token: string, user: AdminUser) => {
    setIsAdmin(true);
    setAdminToken(token);
    setAdminUsername(user.username);
    localStorage.setItem('sk_admin_token', token);
    localStorage.setItem('sk_admin_user', user.username);
    setIsDashboardOpen(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminToken('');
    localStorage.removeItem('sk_admin_token');
    localStorage.removeItem('sk_admin_user');
    setIsDashboardOpen(false);
  };

  const handleOpenAddService = () => {
    setEditingService(null);
    setIsDashboardOpen(true);
  };

  const handleEditService = (service: ServiceItem) => {
    setEditingService(service);
    setIsDashboardOpen(true);
  };

  const handleDeleteService = async (id: string) => {
    try {
      await api.deleteService(id, adminToken);
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1615] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#1A1615]">
      {/* 1. Header & Navigation */}
      <Navbar
        isAdmin={isAdmin}
        adminUsername={adminUsername}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onLogout={handleLogout}
        onOpenAiConsultant={() => setIsAiModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Top Slideshow Banner Infografis */}
        <BannerSlider
          banners={banners}
          isAdmin={isAdmin}
          onOpenAdminBanners={() => setIsDashboardOpen(true)}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('katalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Catalog of Services with Modern Cards & WhatsApp Order */}
        <ServiceCatalog
          services={services}
          isAdmin={isAdmin}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenDetail={(srv) => setDetailService(srv)}
          onOpenAddService={handleOpenAddService}
          onEditService={handleEditService}
          onDeleteService={handleDeleteService}
        />

        {/* 4. Why Us / Keunggulan Teknisi Serviceku */}
        <WhyUsSection />

        {/* 5. Wilayah Jangkauan Panggilan */}
        <ServiceAreaSection />

        {/* 6. Galeri Pengerjaan Teknisi */}
        <GallerySection />

        {/* 7. FAQ & Garansi */}
        <FaqSection />
      </main>

      {/* 9. Footer */}
      <Footer
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenAiConsultant={() => setIsAiModalOpen(true)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={detailService}
        onClose={() => setDetailService(null)}
      />

      {/* Admin Login Modal (with Eye Icon for Password) */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Admin Dashboard (Publish Services, Photos & Slideshow Banners) */}
      <AdminDashboard
        isOpen={isDashboardOpen}
        onClose={() => {
          setIsDashboardOpen(false);
          setEditingService(null);
        }}
        token={adminToken}
        adminUsername={adminUsername}
        services={services}
        banners={banners}
        onRefreshData={loadData}
        onLogout={handleLogout}
        initialEditingService={editingService}
      />

      {/* Google Gen AI Electronic Diagnosis Consultant Modal */}
      <AIConsultantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
}
