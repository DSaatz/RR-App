"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "Ambience", key: "ambient" },
  { name: "Service", key: "service" },
  { name: "Taste", key: "taste" },
  { name: "Plating", key: "plating" },
  { name: "Location", key: "location" },
  { name: "Price to Value", key: "priceToValue" },
]

export default function ReviewForm() {
  const [ratings, setRatings] = useState<Record<string, number>>({})

  const handleRatingChange = (category: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [category]: rating }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">Rate Your Experience</CardTitle>
        <CardDescription>Share your thoughts about the restaurant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => (
          <div key={category.key} className="space-y-2">
            <Label htmlFor={category.key} className="text-sm font-medium text-green-700">
              {category.name}
            </Label>
            <StarRating
              id={category.key}
              rating={ratings[category.key] || 0}
              onRatingChange={(rating) => handleRatingChange(category.key, rating)}
            />
          </div>
        ))}
        <div className="space-y-2">
          <Label htmlFor="review" className="text-sm font-medium text-green-700">
            Your Review (Optional)
          </Label>
          <Textarea
            id="review"
            placeholder="Share your experience with this restaurant..."
            className="min-h-[100px] focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
          Submit Review
        </Button>
      </CardContent>
    </Card>
  )
}

function StarRating({ id, rating, onRatingChange }: { id: string; rating: number; onRatingChange: (rating: number) => void }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className={`focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-1 transition-colors ${
            star <= rating ? "text-yellow-400 hover:text-yellow-500" : "text-gray-300 hover:text-yellow-400"
          }`}
        >
          <Star className="w-6 h-6 fill-current" />
        </button>
      ))}
    </div>
  )
}