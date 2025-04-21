import { App } from '@_app/';
import { Metadata } from 'next';

const URL = process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Агрегатор авто',
  description: 'See auto aggregator',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
    shortcut: '/favicon.png',
  },
  openGraph: {
    url: URL,
    siteName: 'Auto Aggregator',
    images: [
      {
        url: `${URL}/og-img.png`,
        width: 1630,
        height: 1630,
        alt: 'Logo',
      },
    ],
    type: 'website',
  },
};

export default App;
