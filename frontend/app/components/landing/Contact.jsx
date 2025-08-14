'use client';

import { Mail, MapPin, Phone, Clock, Calendar, Heart } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100">Get in Touch</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Ready to take the next step in your healthcare journey? Contact us to schedule an appointment or get answers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="medical-card">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-medical-100 dark:bg-medical-900/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-medical-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-slate-600 dark:text-slate-300">123 Medical Center Drive<br/>Healthcare City, HC 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-care-100 dark:bg-care-900/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-care-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-slate-600 dark:text-slate-300">Main: (555) 123-4567<br/>Emergency: (555) 911-911</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-medical-100 dark:bg-medical-900/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-medical-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-slate-600 dark:text-slate-300">info@healthcare.com<br/>appointments@healthcare.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-care-100 dark:bg-care-900/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-care-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Hours</h4>
                    <p className="text-slate-600 dark:text-slate-300">Mon-Fri: 8:00 - 20:00<br/>Sat-Sun: 9:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="medical-card bg-gradient-to-r from-safety-100/40 to-warning-100/40 dark:from-slate-800/60 dark:to-slate-800/40 border-safety-200/40">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-7 h-7 text-safety-600" />
                <h3 className="text-xl font-semibold">Emergency Care</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6">For life-threatening emergencies, call 911 immediately or visit our emergency department which is open 24/7.</p>
              <button className="btn-danger w-full">Emergency Contact: (555) 911-911</button>
            </div>
          </div>

          {/* Simple form (non-functional placeholder) */}
          <div>
            <div className="medical-card">
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 focus-ring" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 focus-ring" placeholder="Enter your last name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input type="email" className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 focus-ring" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input type="tel" className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 focus-ring" placeholder="Enter your phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 focus-ring" placeholder="What is this regarding?" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea rows={5} className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 focus-ring resize-none" placeholder="Please describe your inquiry or concern..." />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button type="button" className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                  <button type="button" className="btn-secondary flex-1 flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
