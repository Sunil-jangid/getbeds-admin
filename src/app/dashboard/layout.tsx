import { DashboardNavbar } from "@/components/dashboard/navbar";
import { Breadcrumb } from "@/components/dashboard/breadcrumb";
import Footer from "@/components/dashboard/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Shown on small screens (mobile/tablet) */}
      <div className="block lg:hidden w-screen h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-2xl font-semibold">This website works only on Desktop.</h1>
          <p className="mt-4 text-gray-600">Please use a desktop device or increase your browser width.</p>
        </div>
      </div>

      {/* Shown on desktop and larger screens */}
      <div className="hidden lg:flex min-h-screen flex-col bg-background">
        <DashboardNavbar />
        <Breadcrumb />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
