import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joshua Ibrahim — Full Stack Software Developer & Systems Engineer",
  description:
    "Portfolio of Joshua Ibrahim — Experienced Software Developer specializing in Next.js, React, Golang, PHP, and modern web architectures. Based in Abuja, Nigeria.",
  keywords: [
    "Joshua Ibrahim",
    "Software Developer",
    "Full Stack Engineer",
    "Next.js",
    "React",
    "Golang",
    "PHP",
    "Portfolio",
    "Abuja Nigeria",
  ],
  authors: [{ name: "Joshua Ibrahim" }],
  openGraph: {
    title: "Joshua Ibrahim — Full Stack Software Developer",
    description:
      "Experienced Software Developer building scalable, high-performance web systems and applications.",
    type: "website",
    url: "https://joshua-ibrahim.dev",
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
