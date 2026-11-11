import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Skinly AI — Understand Your Skin, Naturally',
  description:
    'Platform analisis tipe kulit wajah dan edukasi skincare berbasis kecerdasan buatan dan literatur dermatologi terpercaya.',
  icons: {
    icon: '/assets/SkinlyAI_App_Icon.png',
    apple: '/assets/SkinlyAI_App_Icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FCF8F6] text-[#64424D] antialiased selection:bg-[#F3E3E7] selection:text-[#A4556B]">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
