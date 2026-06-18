'use client';
import { useState } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import Cursor from '@/components/Cursor/Cursor';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Showcase from '@/components/Showcase/Showcase';
import Locations from '@/components/Locations/Locations';
import Services from '@/components/Services/Services';
import WhyChoose from '@/components/WhyChoose/WhyChoose';
import Gallery from '@/components/Gallery/Gallery';
import Testimonials from '@/components/Testimonials/Testimonials';
import Faq from '@/components/Faq/Faq';
import Cta from '@/components/Cta/Cta';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import FloatingButtons from '@/components/FloatingButtons/FloatingButtons';

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <Cursor />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Showcase />
        <Locations />
        <Services />
        <WhyChoose />
        <Gallery />
        <Testimonials />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
