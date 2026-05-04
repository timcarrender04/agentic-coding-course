import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { fontSans, fontMono } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: "Instructor Board",
    template: `%s · Instructor Board`,
  },
  description:
    "Live classroom dashboard — instructor cockpit, projector view, and student companion.",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f7f9fb" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-[var(--color-board)] text-[var(--color-ink)] font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
