import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GetBeds Admin",
  description: "Admin dashboard for GetBeds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        {/* Mobile View Warning */}
        <div className="block lg:hidden min-h-screen flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-2xl font-semibold">This website works only on Desktop.</h1>
            <p className="mt-4 text-gray-600">
              Please open this site on a desktop device or increase your screen width.
            </p>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex min-h-screen w-full items-center justify-center">
          <div className="w-full max-w-7xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
