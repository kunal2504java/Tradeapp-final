import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import ServicesSection from '@/components/ServicesSection';
import CountdownSection from '@/components/CountdownSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CalculatorSection from '@/components/CalculatorSection';
import GrowthChartSection from '@/components/GrowthChartSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content - Offset for fixed header */}
      <main className="pt-32">
        {/* Hero Section */}
        <HeroSection />
        
        {/* About/Join Section */}
        <AboutSection />
        
        {/* Why Choose Us Section */}
        <WhyChooseSection />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Countdown/Token Sale Section */}
        <CountdownSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Calculator Section */}
        <CalculatorSection />
        
        {/* Growth Chart Section */}
        <GrowthChartSection />
        
        {/* Newsletter Section */}
        <NewsletterSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;