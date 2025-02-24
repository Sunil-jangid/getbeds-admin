import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "@/components/ui/chart"

const data = [
  { month: 'Jan', patients: 25 },
  { month: 'Feb', patients: 30 },
  { month: 'Mar', patients: 35 },
  { month: 'Apr', patients: 28 },
  { month: 'May', patients: 32 },
  { month: 'Jun', patients: 38 },
  { month: 'Jul', patients: 40 },
  { month: 'Aug', patients: 35 },
  { month: 'Sep', patients: 32 },
  { month: 'Oct', patients: 28 },
  { month: 'Nov', patients: 34 },
  { month: 'Dec', patients: 36 }
]

export function PatientInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          data={data}
          index="month"
          categories={['patients']}
          colors={["hsl(var(--primary))"]}
          valueFormatter={(value: number) => `${value}`}
          className="h-[300px]"
        />
      </CardContent>
    </Card>
  )
}
