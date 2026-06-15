
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase";

export const metadata: Metadata = {
  title: 'PaulMaker Stream | GTPS Livestream Promotion Service',
  description: 'Professional Growtopia Private Server livestream promotion. Boost your server exposure for only Rp10.000/Hour.',
  keywords: ['GTPS', 'Growtopia', 'Livestream', 'Promotion', 'PaulMaker'],
  icons: {
    icon: 'https://i.ibb.co.com/MxqSy3JY/Paul-Maker-Profile-Picture.png',
    shortcut: 'https://i.ibb.co.com/MxqSy3JY/Paul-Maker-Profile-Picture.png',
    apple: 'https://i.ibb.co.com/MxqSy3JY/Paul-Maker-Profile-Picture.png',
  },
  openGraph: {
    title: 'PaulMaker Stream',
    description: 'Professional GTPS Livestream Promotion Service',
    url: 'https://paulmaker.stream',
    siteName: 'PaulMaker Stream',
    type: 'website',
    images: [
      {
        url: 'https://i.ibb.co.com/MxqSy3JY/Paul-Maker-Profile-Picture.png',
        width: 512,
        height: 512,
        alt: 'PaulMaker Stream Logo',
      },
    ],
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D90429" />
      </head>
      <body className="font-body antialiased min-h-screen">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
