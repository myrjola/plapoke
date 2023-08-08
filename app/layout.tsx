import "#/styles/globals.css";
import { Metadata } from "next";
import Footer from "#/app/Footer";

export const metadata: Metadata = {
  title: {
    default: "Next.js App Router",
    template: "%s | Next.js App Router",
  },
  description:
    "A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body className="h-full">
        <div className="h-full flex flex-col">
          <main className="flex-1 bg-slate-50">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
