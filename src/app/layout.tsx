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
      <body className={inter.className}>
        <div className="block lg:hidden w-screen h-screen flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-2xl font-semibold">This website works only on Desktop.</h1>
            <p className="mt-4 text-gray-600">Please open this site on a desktop device or increase your screen width.</p>
          </div>
        </div>
        <div className="hidden lg:block">{children}</div>
      </body>
    </html>
  );
}
