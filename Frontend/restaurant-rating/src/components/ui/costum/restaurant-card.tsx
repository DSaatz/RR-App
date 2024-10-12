import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface RestaurantCardProps {
  id: string;
  name: string;
  rating: number;
  distance: number;
}

export default function RestaurantCard({ id, name, rating, distance }: RestaurantCardProps) {
  return (
    <Card id={id} className="overflow-hidden">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-gray-500">{distance.toFixed(1)} km</span>
        </div>
      </CardContent>
    </Card>
  )
}