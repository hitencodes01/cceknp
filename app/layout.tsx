import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/lib/scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "  Centre for Computer Education (CCE) Kanpur | Best Computer Centre in Kanpur",
  description: "Centre for Computer Education (CCE), Kanpur offers professional computer courses, programming training, web development, software development, and career-focused education near Ramadevi, Kanpur.",
  icons: "/logo.jpeg",
  keywords: ["CCE Kanpur", "Centre for Computer Education", "Computer Institute Kanpur", "Programming Classes Kanpur", "Computer Courses Near Ramadevi", "Web Development Course Kanpur", "Software Training Kanpur"],
  authors: [{ name: "CCE Kanpur", url: "cceknp@gmail.com" }],
  applicationName: "Centre for Computer Education Kanpur",
  openGraph: {
    type: "website",
    countryName: "India",
    siteName: "Centre for Computer Education (CCE) Kanpur",
    url: "https://ccekanpur.in/",
    description: "Centre for Computer Education (CCE), Kanpur offers professional computer courses, programming training, web development, software development, and career-focused education near Ramadevi, Kanpur.",
    emails: ["cceknp@gmail.com"],
    images: ["https://ccekanpur.in/logo.jpeg", "https://ccekanpur.in/CCC.jpeg", "https://ccekanpur.in/OLevel.jpeg", "https://ccekanpur.in/DCA.jpeg", "https://ccekanpur.in/C.jpeg", "https://ccekanpur.in/PGDCA.jpeg", "https://ccekanpur.in/Java.jpeg", "https://ccekanpur.in/Python.jpeg", "https://ccekanpur.in/JavaBCA.png", "https://ccekanpur.in/PythonBCA.jpeg"]
  }
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
    >
      <body className="min-h-full flex flex-col"><ScrollToTop />{children}</body>
    </html>
  );
}
