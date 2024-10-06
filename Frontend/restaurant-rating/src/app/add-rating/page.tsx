import StandardLayout from '@/components/ui/costum/standard-layout'
import ReviewForm from '@/components/ui/costum/review-form'

export default function AddRatingPage() {
  return (
    <StandardLayout pageTitle="Add a Rating">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Rate Your Experience</h1>
        <ReviewForm />
      </div>
    </StandardLayout>
  )
}