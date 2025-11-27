import type { Metadata, Viewport } from 'next';
import { Raleway } from 'next/font/google';
import type { FC, ReactNode } from 'react';
import { Toaster } from 'sonner';

import './globals.css';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

interface Props {
  children: ReactNode;
}

// eslint-disable-next-line new-cap
const raleway = Raleway({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-family',
});

export const metadata: Metadata = {
  description: `Tagarr: Better Tagging for Radarr and Sonarr`,
  title: {
    default: 'Tagarr',
    template: '%s | Tagarr',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
  width: 'device-width',
};

const RootLayout: FC<Props> = ({ children }) => (
  <html className={raleway.className} lang="en-AU">
    <body className="dark">
      <Toaster richColors />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="flex justify-center p-2">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </body>
  </html>
);

export default RootLayout;
