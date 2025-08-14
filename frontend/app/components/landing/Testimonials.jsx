'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Jennifer Martinez',
    role: 'Patient',
    rating: 5,
    comment: "Exceptional care and professionalism. Dr. Johnson helped me through my heart condition with such compassion and expertise.",
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'David Thompson',
    role: 'Patient',
    rating: 5,
    comment: 'The online consultation system is fantastic! I was able to get medical advice quickly without leaving my home.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Maria Garcia',
    role: 'Patient',
    rating: 5,
    comment: 'Outstanding pediatric care for my daughter. The whole experience was comfortable and stress-free.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-r from-medical-100/40 to-health-100/40 dark:from-slate-800/40 dark:to-slate-700/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100">What Our Patients Say</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Here's what our satisfied patients have to say about their experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={t.id} className="medical-card group hover:scale-[1.02]">
              <div className="mb-6">
                <Quote className="w-8 h-8 text-medical-600/70" />
              </div>
              <div className="flex items-center mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">"{t.comment}"</p>
              <div className="flex items-center">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover mr-4 shadow-md" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">{t.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-medical-600">4.9/5</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Average Rating</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-care-600">50,000+</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Happy Patients</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-medical-600">200+</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Expert Doctors</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-health-600">24/7</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
