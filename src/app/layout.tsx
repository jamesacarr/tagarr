import type { Metadata, Viewport } from 'next';
import { Raleway } from 'next/font/google';
import type { FC, ReactNode } from 'react';

import './globals.css';

import { Header } from '@/components/header';
import { Toasts } from '@/components/toasts';

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
      <div className="[--header-height:calc(--spacing(14))] flex flex-col">
        <Header />
        <main className="flex justify-center p-8">
          <Toasts />
          {children}
        </main>
      </div>
    </body>
  </html>
);

export default RootLayout;
