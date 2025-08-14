'use client';

import { Calendar, Phone, Shield, Users, Heart, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-medical-50 via-health-50 to-care-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-full backdrop-blur">
              <Shield className="w-4 h-4 text-medical-600 mr-2" />
              <span className="text-medical-700 dark:text-medical-300 font-medium">Trusted Healthcare Platform</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900 dark:text-slate-100">
              Your Health is Our
              <span className="text-gradient"> Priority</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl">
              Connect with certified doctors, book appointments instantly, and receive world-class medical care from the comfort of your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary text-base flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>
              <button className="btn-secondary text-base flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                <span>Emergency Call</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-5 h-5 text-medical-600 mr-2" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">50K+</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Happy Patients</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="w-5 h-5 text-care-500 mr-2" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">200+</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Expert Doctors</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="w-5 h-5 text-medical-600 mr-2" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">24/7</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Support</p>
              </div>
            </div>
          </div>

          {/* Right - illustrative panel */}
          <div className="relative">
            <div className="glass-card p-6 md:p-10">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="medical-card">
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-care-500" />
                    <div>
                      <p className="font-semibold">Heart Rate</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Normal - 72 BPM</p>
                    </div>
                  </div>
                </div>
                <div className="medical-card">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-medical-600" />
                    <div>
                      <p className="font-semibold">Health Score</p>
                      <p className="text-sm text-health-600">Excellent - 95%</p>
                    </div>
                  </div>
                </div>
                <div className="chart-container sm:col-span-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Live vitals and KPIs</p>
                  <div className="mt-3 h-24 loading-skeleton" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
