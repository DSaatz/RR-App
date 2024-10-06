import { notFound } from 'next/navigation'
import StandardLayout from '@/components/ui/costum/standard-layout'
import Review from '@/components/ui/costum/review-component'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock user data
const mockUsers = {
  'johndoe': {
    username: 'johndoe',
    avatarUrl: '/placeholder.svg?height=128&width=128',
    reviews: [
      {
        id: 1,
        username: 'johndoe',
        avatar: '/placeholder.svg?height=50&width=50',
        title: 'Great Italian Place',
        averageRating: 4.5,
        reviewText: "This Italian restaurant is a hidden gem! The pasta was cooked to perfection, and the sauce was bursting with flavor. The ambiance was cozy and romantic, perfect for a date night. Service was attentive without being intrusive. Prices were reasonable for the quality of food. Highly recommend the tiramisu for dessert!",
        ratings: [
          { category: "Food", value: 5 },
          { category: "Service", value: 4 },
          { category: "Ambiance", value: 5 },
          { category: "Value", value: 4 }
        ]
      },
      {
        id: 2,
        username: 'johndoe',
        avatar: '/placeholder.svg?height=50&width=50',
        title: 'Disappointing Sushi Experience',
        averageRating: 2.5,
        reviewText: "I had high hopes for this sushi restaurant, but unfortunately, it fell short of expectations. The fish didn't taste very fresh, and the rice was a bit too sticky. The service was slow, and it took a long time to get our orders. The decor was nice, but that couldn't make up for the subpar food quality. Prices were also on the higher side, which didn't match the overall experience.",
        ratings: [
          { category: "Food", value: 2 },
          { category: "Service", value: 2 },
          { category: "Ambiance", value: 4 },
          { category: "Value", value: 2 }
        ]
      }
    ]
  },
  // Add more mock users as needed
}

export default function AccountPage({ params }: { params: { username: string } }) {
  const user = mockUsers[params.username]

  if (!user) {
    notFound()
  }

  return (
    <StandardLayout pageTitle={`${user.username}'s Profile`}>
      <div className="container mx-auto py-8">
        <Card className="w-full max-w-2xl mx-auto mb-8">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold text-green-700">{user.username}</CardTitle>
          </CardHeader>
        </Card>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Reviews by {user.username}</h2>
          {user.reviews.map((review) => (
            <Review key={review.id} {...review} />
          ))}
        </div>
      </div>
    </StandardLayout>
  )
}