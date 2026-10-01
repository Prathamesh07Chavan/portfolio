import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Prathamesh Chavan | Animated 3D Personal Portfolio',
  description:
    '3D Personal Portfolio of Prathamesh Chavan — Data Analytics & Computer Engineering Specialist featuring interactive R3F procedural scenes, analytics dashboards, Python data science projects, and business intelligence solutions.',
  keywords: [
    'Prathamesh Chavan',
    'Data Analytics',
    'Data Science',
    'Power BI',
    'Python',
    'SQL',
    '3D Portfolio',
    'React Three Fiber',
    'Next.js 16',
    'Tailwind CSS',
  ],
  authors: [{ name: 'Prathamesh Chavan' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#05070E',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="bg-[#05070E] text-gray-100 antialiased selection:bg-accentCyan selection:text-black">
        {children}
      </body>
    </html>
  );
}
