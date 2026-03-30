import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AboutClient from '@/components/AboutClient';
import Background from '@/components/Background';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import VisitorBehaviorTracker from '@/components/VisitorBehaviorTracker';

export default function Home() {
  return (
    <div className="min-h-screen">
      <VisitorBehaviorTracker />
      <Navigation />
      <Hero />
      <Background />
      <Skills />
      <Experience />
      <Services />
      <Portfolio />
      <AboutClient />
      <Contact />
      <Footer />
    </div>
  );
}
