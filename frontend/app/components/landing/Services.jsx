'use client';

import { Heart, Brain, Bone, Eye, Baby, Stethoscope } from 'lucide-react';

const services = [
  { icon: Heart, title: 'Cardiology', description: 'Comprehensive heart care with advanced diagnostics and treatment.' , color: 'text-safety-500'},
  { icon: Brain, title: 'Neurology', description: 'Care for brain, spine, and nervous system disorders.' , color: 'text-care-500'},
  { icon: Bone, title: 'Orthopedics', description: 'Bones, joints, muscles, and sports injuries.' , color: 'text-medical-600'},
  { icon: Eye, title: 'Ophthalmology', description: 'Vision care, correction and surgery.' , color: 'text-health-600'},
  { icon: Baby, title: 'Pediatrics', description: 'Healthcare for infants, children and adolescents.' , color: 'text-warning-600'},
  { icon: Stethoscope, title: 'General Medicine', description: 'Primary healthcare and preventive care.' , color: 'text-medical-600'},
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white/60 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100">Our Medical Services</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We provide comprehensive healthcare services with state-of-the-art technology and experienced professionals.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={s.title} className="medical-card group hover:scale-[1.02]">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-medical-100 dark:bg-medical-900/20 group-hover:scale-110 transition-transform">
                  <s.icon className={`w-8 h-8 ${s.color}`} />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{s.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{s.description}</p>
              </div>
              <div className="flex items-center text-medical-600 dark:text-medical-300 font-medium">
                <span>Learn More</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
