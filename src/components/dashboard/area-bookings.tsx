import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Delhi', value: 55 },
  { name: 'UP', value: 25 },
  { name: 'Mumbai', value: 45 },
  { name: 'Gujarat', value: 35 }
]

export function AreaBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Wise Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => `${value}%`}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Bar
                dataKey="value"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
                label={{ 
                  position: 'top',
                  formatter: (value: number) => `${value}%`,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
