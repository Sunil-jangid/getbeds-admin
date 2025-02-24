import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react"

const metrics = [
  {
    title: "Total Orders",
    value: "1,000",
    change: "+5%",
    trend: "up"
  },
  {
    title: "Medicines Sold",
    value: "300",
    change: "-12%",
    trend: "down"
  },
  {
    title: "Home Service",
    value: "8",
    change: "0.5%",
    trend: "neutral"
  }
]

export function PerformanceOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </div>
              <div className="text-2xl font-bold">
                {metric.value}
              </div>
              <div className={`flex items-center text-sm ${
                metric.trend === 'up' 
                  ? 'text-green-600' 
                  : metric.trend === 'down' 
                    ? 'text-red-600' 
                    : 'text-muted-foreground'
              }`}>
                {metric.trend === 'up' ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : metric.trend === 'down' ? (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                ) : (
                  <MinusIcon className="h-4 w-4 mr-1" />
                )}
                {metric.change} from yesterday
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
