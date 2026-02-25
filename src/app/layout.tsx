import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { QuickAddModal } from "@/components/shared/quick-add-modal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agenda 3.0",
  description: "The Ultimate AI Life & Study Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-background text-foreground antialiased`}>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex flex-1 flex-col pl-20 sm:pl-64 transition-all">
              <Header />
              <div className="flex-1 p-6 sm:p-10">
                {children}
              </div>
            </main>
            <QuickAddModal />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
