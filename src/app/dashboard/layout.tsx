import { DashboardNavbar } from "@/components/dashboard/navbar"
import { Breadcrumb } from "@/components/dashboard/breadcrumb"

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
    </div>
  )
}
