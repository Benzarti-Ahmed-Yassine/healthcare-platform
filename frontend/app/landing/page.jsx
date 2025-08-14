'use client';

import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import Doctors from '../components/landing/Doctors';
import Testimonials from '../components/landing/Testimonials';
import Contact from '../components/landing/Contact';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Doctors />
      <Testimonials />
      <Contact />
    </div>
  );
}
