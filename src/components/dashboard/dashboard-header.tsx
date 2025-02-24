import { MapPin } from 'lucide-react'

interface DashboardHeaderProps {
  name: string
  location: string
}

export function DashboardHeader({ name, location }: DashboardHeaderProps) {
  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold">
        Hello {name}! {greeting()}!
      </h1>
      <div className="flex items-center gap-1 text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>{location}</span>
      </div>
    </div>
  )
}
