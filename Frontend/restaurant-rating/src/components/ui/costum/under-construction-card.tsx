import { HardHat } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UnderConstructionCardProps {
  title: string
  description?: string
}

export default function UnderConstructionCard({ title, description }: UnderConstructionCardProps) {
  return (
    <Card className="w-full bg-green-50 border-green-200">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <HardHat className="w-10 h-10 text-green-600" />
        <CardTitle className="text-xl font-bold text-green-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-green-600">
          {description || "This feature is under construction and will be available soon!"}
        </p>
        <div className="mt-4 flex justify-center">
          <div className="w-full max-w-xs bg-green-200 h-2 rounded-full overflow-hidden">
            <div className="w-1/3 bg-green-600 h-full rounded-full animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}