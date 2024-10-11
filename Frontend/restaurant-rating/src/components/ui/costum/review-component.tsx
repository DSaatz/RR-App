"use client"

//TODO: Add real date, update database accordignly etc.

import { useState } from 'react'
import { ChevronDown, ChevronUp, Star, MapPin, Clock } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    <Card className="w-full mb-6 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2 bg-gradient-to-r from-green-50 to-green-100">
        <Avatar className="w-16 h-16 border-2 border-green-500">
          <AvatarImage src="/placeholder.svg" alt={review.username} />
          <AvatarFallback className="bg-green-200 text-green-700">{review.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-green-800">{review.username}</h3>
          <p className="text-sm text-green-600 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {review.restaurantName}
          </p>
          <p className="text-xs text-green-500 flex items-center mt-1">
            <Clock className="w-3 h-3 mr-1" />
            Reviewed 2 days ago  
          </p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800 text-lg px-3 py-1">
          <Star className="w-5 h-5 text-yellow-400 fill-current inline mr-1" />
          {averageRating}
        </Badge>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-700 mb-4 line-clamp-3">{review.reviewText}</p>
        {isExpanded && (
          <div className="mb-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-4">
              {ratings.map((rating) => (
                <div key={rating.category} className="flex items-center bg-green-50 rounded-lg p-2">
                  <span className="text-sm font-medium text-green-700 mr-2">{rating.category}:</span>
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
          variant="outline"
          size="sm"
          onClick={toggleExpand}
          className="w-full mt-2 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
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