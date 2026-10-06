/**
 * App Configuration for Frontend & Fullstack
 */

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  priceFormatted: string;
  description: string;
  image: string;
  features: string[];
  popular?: boolean;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  ctaText: string;
  serviceCategory?: string;
}

export interface GalleryItem {
  title: string;
  category: string;
  image: string;
  caption: string;
}

export interface TestimonialItem {
  name: string;
  location: string;
  service: string;
  quote: string;
  rating: number;
  date: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BusinessConfig {
  brandName: string;
  businessType: string;
  tagline: string;
  description: string;
  logo?: string;
  themeColor: {
    primary: string;
    accent: string;
    bgLight: string;
  };
  contact: {
    whatsapp: string;
    whatsappRaw: string;
    email: string;
    address: string;
    operatingHours: string;
    serviceAreas: Array<{ name: string; desc: string }>;
  };
  heroImage: string;
  banners: BannerItem[];
  products: ServiceItem[];
  gallery: GalleryItem[];
  testimonials: TestimonialItem[];
  faq: FaqItem[];
}

export { APP_CONFIG } from '../appConfig.js';
