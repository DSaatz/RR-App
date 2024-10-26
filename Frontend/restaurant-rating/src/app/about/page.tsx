import StandardLayout from "@/components/ui/costum/standard-layout";
import Link from "next/link";
import {Card} from "@/components/ui/card"; // Assuming you have a card component

export default function AboutPage() {
  return (
    <StandardLayout pageTitle="About">
      <div className="flex justify-center mt-6">
        <Card className="max-w-2xl p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">About this Project</h1>
          <p>
            This project came up as an idea from my friend David, who wanted a geolocation-based restaurant rating app that suited his needs.
          </p>
          <p>
            Since I wanted to improve my web development skills and learn new technologies, I decided to take on the challenge of creating this page.
          </p>
          <p>
            The app allows users to create and view detailed reviews of restaurants worldwide. Users can filter restaurants by categories and view them on an interactive map solving the age-old question of what to eat when going downtown.
          </p>
          <h3 className="text-lg font-semibold mt-4">Technologies used to create this full-stack project:</h3>
          <ul className="list-disc list-inside">
            <li>Frontend: NextJS, ShadCN, Leaflet/OpenStreetMap API, Tailwind CSS, TypeScript</li>
            <li>Backend: FastAPI, PostgreSQL, Firebase Auth, and possible future additions...</li>
          </ul>
          <p className="mt-4">
            If you like what you see or have any questions, feel free to use the{" "}
            <Link href="/contact" className="text-blue-500 hover:underline">
              Contact Form
            </Link>.
          </p>
        </Card>
      </div>
    </StandardLayout>
  );
}
