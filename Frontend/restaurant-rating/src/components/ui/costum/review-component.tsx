"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export interface Review {
    username: string;
    restaurantName: string;
    ambienceRating: number;
    serviceRating: number;
    tasteRating: number;
    platingRating: number;
    locationRating: number;
    priceToValueRating: number;
    reviewText: string;
    images: string[];
}

interface ReviewProps {
  review: Review
}

export default function Component({ review }: ReviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const ratings = [
    { category: 'Ambience', value: review.ambienceRating },
    { category: 'Service', value: review.serviceRating },
    { category: 'Taste', value: review.tasteRating },
    { category: 'Plating', value: review.platingRating },
    { category: 'Location', value: review.locationRating },
    { category: 'Price to Value', value: review.priceToValueRating },
  ]

  const averageRating = (
    (review.ambienceRating +
      review.serviceRating +
      review.tasteRating +
      review.platingRating +
      review.locationRating +
      review.priceToValueRating) /
    6
  ).toFixed(1)

  return (
    <Card className="w-full mb-4">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/placeholder.svg" alt={review.username} />
          <AvatarFallback>{review.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{review.username}</h3>
          <p className="text-sm text-gray-500">{review.restaurantName}</p>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 font-medium">{averageRating}</span>
        </div>
      </CardHeader>
      <CardContent>
        {isExpanded && (
          <div className="mb-4">
            <p className="text-gray-700 mb-4">{review.reviewText}</p>
            <div className="grid grid-cols-2 gap-4">
              {ratings.map((rating) => (
                <div key={rating.category} className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">{rating.category}:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= rating.value ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpand}
          className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Show More
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}