import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip 
} from 'recharts'

const data = [
  { name: 'Jan', value: 5000 },
  { name: 'Mar', value: 3000 },
  { name: 'May', value: 2000 },
  { name: 'Oct', value: 4000 },
]

const summaries = [
  {
    title: 'HOSPITALS',
    amount: '12,89,098',
    data: data
  },
  {
    title: 'AMBULANCE',
    amount: '89,098',
    data: data
  },
  {
    title: 'DIAGNOSTIC CENTRES',
    amount: '1,89,098',
    data: data
  }
]

export function RevenueSummaries() {
  return (
    <>
      {summaries.map((summary, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {summary.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{summary.amount}</div>
            <p className="text-xs text-muted-foreground">
              Monthly revenue generated
            </p>
            <div className="h-[80px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={summary.data}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
