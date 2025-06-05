import { DashboardNavbar } from "@/components/dashboard/navbar"
import { Breadcrumb } from "@/components/dashboard/breadcrumb"
import Footer from "@/components/dashboard/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardNavbar />
      <Breadcrumb />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
