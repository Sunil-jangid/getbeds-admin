import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

const stats = [
  {
    title: "Total No. of Users",
    value: "5,423",
    change: "+16%",
    trend: "up"
  },
  {
    title: "Total No. of Hospitals",
    value: "1,893",
    change: "-1%",
    trend: "down"
  },
  {
    title: "Total No. of Diagnostic Centres",
    value: "189",
    change: "+16%",
    trend: "up"
  }
]

export function Statistics() {
  return (
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="py-4">
            <div className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`flex items-center text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {stat.change} this month
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
