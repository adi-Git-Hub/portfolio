import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import FrozenBackground from "@/components/FrozenBackground";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticTargets from "@/components/MagneticTargets";
import SeasonProvider, {
  SEASON_BOOT_SCRIPT,
} from "@/components/SeasonProvider";
import LanguageProvider, {
  LANG_BOOT_SCRIPT,
} from "@/components/LanguageProvider";
import { asset } from "@/lib/asset";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Pande — Backend Developer | DevOps Engineer",
  description:
    "Portfolio of Aditya Pande — Backend Developer & DevOps Engineer. Interactive 3D mechanical keyboard experience built with Next.js, React Three Fiber, Docker, AWS, and Kubernetes.",
  authors: [{ name: "Aditya Pande" }],
  openGraph: {
    title: "Aditya Pande — Backend Developer | DevOps Engineer",
    description:
      "Interactive 3D developer portfolio showcasing production e-commerce backends, Kubernetes microservices, AWS cloud infrastructure, and DevOps pipelines.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Pande — Backend Developer | DevOps Engineer",
    description:
      "Interactive 3D developer portfolio showcasing production e-commerce backends, Kubernetes microservices, AWS cloud infrastructure, and DevOps pipelines.",
  },
  icons: {
    icon: [
      { url: asset("/favicon.ico") },
      { url: asset("/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
      { url: asset("/favicon-192x192.png"), sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: asset("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#060e1c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Run synchronously before hydration to apply the user's stored
            season + language — avoids a flash of the default values. */}
        <script dangerouslySetInnerHTML={{ __html: SEASON_BOOT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
      </head>
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <SeasonProvider>
            <FrozenBackground />
            <ScrollProgress />
            {children}
            <CustomCursor />
            <MagneticTargets />
          </SeasonProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
