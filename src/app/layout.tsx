import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://joshua-ibrahim.vercel.app";
};

const siteDescription =
  "Full Stack Software Developer specializing in Next.js, React, Golang, and PHP. I architect scalable backend systems, resilient microservices, and high-performance user interfaces.";
const siteTitle = "Joshua Ibrahim — Full Stack Software Developer & Systems Engineer";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: siteTitle,
    template: "%s | Joshua Ibrahim",
  },
  description: siteDescription,
  keywords: [
    "Joshua Ibrahim",
    "Software Developer",
    "Full Stack Engineer",
    "Systems Engineer",
    "Next.js",
    "React",
    "Golang",
    "PHP",
    "Portfolio",
    "Abuja Nigeria",
  ],
  authors: [{ name: "Joshua Ibrahim" }],
  creator: "Joshua Ibrahim",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Joshua Ibrahim",
    images: [
      {
        url: "/images/joshua-portrait.jpg",
        width: 768,
        height: 1024,
        alt: "Joshua Ibrahim — Full Stack Software Developer",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/joshua-portrait.jpg"],
    creator: "@naytdgreat",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakartaSans.variable} font-sans scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && supportDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased selection:bg-[#FF6B2B] selection:text-white">
        {children}
      </body>
    </html>
  );
}
