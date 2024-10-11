import { notFound } from 'next/navigation';
import StandardLayout from '@/components/ui/costum/standard-layout';
import Review, { Review as ReviewType } from '@/components/ui/costum/review-component';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getReviewsByUsername } from '@/lib/APIHelpers';
import { getReviewsAsReviewArray } from '@/lib/reviewHelpers';

export default async function AccountPage({ params }: { params: { username: string } }) {
  const { username } = params;

  // Fetch user reviews by username and pass the result to getReviewsAsReviewArray  
  const reviews = await getReviewsAsReviewArray(getReviewsByUsername, username);
  console.log('Formatted Reviews:', reviews); // Log to check if reviews are formatted properly
  
  if (!reviews || reviews.length === 0) {
    return notFound(); // Trigger 404 page if no reviews found
  }

  return (
    <StandardLayout pageTitle={`${username}'s Profile`}>
      <div className="container mx-auto py-8">
        <Card className="w-full max-w-2xl mx-auto mb-8">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src="/placeholder.svg" alt={username} />
              <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold text-green-700">{username}</CardTitle>
          </CardHeader>
        </Card>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Reviews by {username}</h2>
          {reviews.map((review: ReviewType) => (
            <Review key={`${review.username}-${review.restaurantName}`} review={review} />
          ))}
        </div>
      </div>
    </StandardLayout>
  );
}