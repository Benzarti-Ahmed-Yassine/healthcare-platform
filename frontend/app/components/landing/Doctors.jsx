'use client';

import { Calendar, Star, Award, Users } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '15+ years',
    rating: 4.9,
    patients: 2500,
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=800&auto=format&fit=crop',
    description: 'Specialized in advanced cardiac procedures and heart disease prevention.'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    experience: '12+ years',
    rating: 4.8,
    patients: 1800,
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=800&auto=format&fit=crop',
    description: 'Expert in treating neurological disorders and brain-related conditions.'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    experience: '10+ years',
    rating: 4.9,
    patients: 3200,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop',
    description: 'Dedicated to providing comprehensive care for children and adolescents.'
  }
];

export default function Doctors() {
  return (
    <section id="doctors" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100">Meet Our Expert Doctors</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Our team of highly qualified medical professionals is committed to exceptional care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((d, index) => (
            <div key={d.id} className="card-doctor">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-soft">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-0 right-1/2 translate-x-16 bg-medical-600 text-white rounded-full p-2 shadow-lg">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{d.name}</h3>
                  <p className="text-medical-600 font-medium">{d.specialty}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{d.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">{d.rating}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-care-500 mr-1" />
                      <span className="font-semibold">{d.patients}+</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Patients</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Award className="w-4 h-4 text-medical-600 mr-1" />
                      <span className="font-semibold">{d.experience}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Experience</p>
                  </div>
                </div>

                <button className="btn-secondary w-full flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary text-base px-8 py-3">View All Doctors</button>
        </div>
      </div>
    </section>
  );
}
