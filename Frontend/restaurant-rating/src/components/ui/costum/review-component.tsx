"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface Rating {
  category: string
  value: number
}

interface ReviewProps {
  username: string
  avatar: string
  title: string
  averageRating: number
  reviewText: string
  ratings: Rating[]
}

export default function Review({
  username,
  avatar,
  title,
  averageRating,
  reviewText,
  ratings
}: ReviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <Card className="w-full mb-4">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatar} alt={username} />
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{username}</h3>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 font-medium">{averageRating.toFixed(1)}</span>
        </div>
      </CardHeader>
      <CardContent>
        {isExpanded && (
          <div className="mb-4">
            <p className="text-gray-700 mb-4">{reviewText}</p>
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