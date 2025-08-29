import React from 'react';
import GraphicDesignHero from '../Graphics design/GraphicDesignHero';
import AboutGraphicDesign from '../Graphics design/AboutGraphicDesign';
import GraphicDesignServices from '../Graphics design/GraphicDesignServices';
import PortfolioGallery from '../Graphics design/PortfolioGallery';
import DesignOrderForm from '../Graphics design/DesignOrderForm';
import HeroSection from '../Graphics design/HeroSection';
import ServicesSection from '../Graphics design/ServicesSection';
import StudentDashboard from '../Graphics design/StudentDashboard';


export default function GraphicDesignPage() {
  return (
    <div>
      <GraphicDesignHero />
      <AboutGraphicDesign />
      <GraphicDesignServices />
      <PortfolioGallery />
      <DesignOrderForm />
      <HeroSection />
      <ServicesSection />
      <StudentDashboard />
    </div>
  );
}
