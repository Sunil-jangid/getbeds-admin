import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const data = [
  { age: '17-20', expected: 65, actual: 45 },
  { age: '21-25', expected: 80, actual: 70 },
  { age: '26-30', expected: 90, actual: 85 },
  { age: '31-35', expected: 75, actual: 65 },
  { age: '36-40', expected: 60, actual: 50 },
  { age: '41-45', expected: 45, actual: 40 }
]

export function InventoryUtilization() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory v/s Utilization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="expected" 
                stroke="var(--primary)"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="var(--muted-foreground)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
