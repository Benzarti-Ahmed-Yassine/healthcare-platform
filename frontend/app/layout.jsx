import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from './components/Navigation';
import { AuthProvider } from './providers/AuthProvider';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: 'Healthcare Platform - Secure Medical Records on Hedera',
  description: 'Advanced decentralized healthcare platform with secure medical records, patient management, and blockchain-based audit trails on Hedera Hashgraph',
  keywords: 'healthcare, medical records, blockchain, hedera, patient management, security, HIPAA, GDPR',
  authors: [{ name: 'Healthcare Platform Team' }],
  creator: 'Healthcare Platform',
  publisher: 'Healthcare Platform',
  robots: 'index, follow',
  openGraph: {
    title: 'Healthcare Platform - Secure Medical Records',
    description: 'Advanced healthcare management with blockchain security',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="font-display antialiased">
        {/* Background Gradient Layer */}
        <div className="fixed inset-0 bg-gradient-to-br from-medical-50 via-health-50 to-care-50 
                        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -z-10" />
        
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden -z-10" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-medical-200/20 dark:bg-medical-800/10 
                          rounded-full blur-3xl animate-float" />
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-health-200/20 dark:bg-health-800/10 
                          rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-care-200/20 dark:bg-care-800/10 
                          rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* Main Application */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <AuthProvider>
            <Navigation />
            
            {/* Main Content Area */}
            <main className="flex-1 relative">
              {/* Content with proper spacing for navigation */}
              <div className="pt-4 pb-8">
                {children}
              </div>
            </main>
          </AuthProvider>
          
          {/* Footer */}
          <footer className="relative mt-auto border-t border-slate-200/20 dark:border-slate-700/20 
                           backdrop-blur-xl bg-white/5 dark:bg-slate-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-medical rounded-2xl flex items-center justify-center">
                      <span className="text-white text-xl">🏥</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                      Healthcare Platform
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Secure, decentralized healthcare management powered by Hedera Hashgraph
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">Platform</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li><a href="#" className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Patient Portal</a></li>
                    <li><a href="#" className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Healthcare Providers</a></li>
                    <li><a href="#" className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Medical Records</a></li>
                    <li><a href="#" className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Compliance</a></li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">Security</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li><a href="#" className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">HIPAA Compliance</a></li>
                    <li><a href="#" className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Security Reports</a></li>
                    <li><a href="#" className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Audit Logs</a></li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">Support</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li><a href="#" className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Documentation</a></li>
                    <li><a href="#" className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">API Reference</a></li>
                    <li><a href="#" className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Contact Us</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-200/20 dark:border-slate-700/20 
                            flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  © 2024 Healthcare Platform. All rights reserved. Powered by Hedera Hashgraph.
                </p>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                                 bg-health-100 text-health-800 dark:bg-health-800/20 dark:text-health-300">
                    🔒 HIPAA Compliant
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                                 bg-medical-100 text-medical-800 dark:bg-medical-800/20 dark:text-medical-300">
                    🌐 Hedera Testnet
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
        
        {/* Loading indicator for page transitions */}
        <div id="loading-indicator" className="hidden fixed top-0 left-0 w-full h-1 z-50">
          <div className="h-full bg-gradient-to-r from-medical-500 to-care-500 animate-pulse"></div>
        </div>
      </body>
    </html>
  );
}
