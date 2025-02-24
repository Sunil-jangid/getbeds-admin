import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  metrics: {
    label: string
    value: string
    note?: string
  }[]
  additionalInfo?: string
}

export function ServiceCard({ title, description, metrics, additionalInfo }: ServiceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-1">
            <div className="text-sm text-muted-foreground">{metric.label}</div>
            <div className="text-2xl font-bold">{metric.value}</div>
            {metric.note && (
              <div className="text-xs text-muted-foreground">{metric.note}</div>
            )}
          </div>
        ))}
        {additionalInfo && (
          <div className="text-sm text-muted-foreground border-t pt-4">
            {additionalInfo}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
