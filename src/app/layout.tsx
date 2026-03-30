import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import * as Sentry from "@sentry/nextjs";

// Add or edit your "generateMetadata" to include the Sentry trace data:
export function generateMetadata(): Metadata {
  return {
    title: "Horizon",
    description: "Horizon is a modern banking platform for everyone.",
    icons: {
      icon: "/icons/logo.svg",
    },
    other: {
      ...Sentry.getTraceData(),
    },
  };
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

// export const metadata: Metadata = {
//   title: "Horizon",
//   description: "Horizon is a modern banking platform for everyone.",
//   icons: {
//     icon: "/icons/logo.svg",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
