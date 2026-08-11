import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Starbucks Sales Manager | Full-Stack PostgreSQL App',
  description: 'Production-ready Starbucks sales management and order tracking application.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F7F8F9] antialiased">
        {children}
      </body>
    </html>
  );
}
