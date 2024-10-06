import StandardLayout from '@/components/ui/costum/standard-layout'
import AccountSettings from '@/components/ui/costum/account-settings'

export default function SettingsPage() {
  return (
    <StandardLayout pageTitle="Account Settings">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Settings</h1>
        <AccountSettings username="johndoe" avatarUrl="/placeholder.svg?height=128&width=128" />
      </div>
    </StandardLayout>
  )
}