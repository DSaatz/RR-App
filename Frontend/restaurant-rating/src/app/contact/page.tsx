import StandardLayout from "@/components/ui/costum/standard-layout";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <StandardLayout pageTitle="Contact">
      <div className="flex justify-center mt-6">
        <Card className="max-w-2xl p-6 bg-white shadow-lg rounded-lg">
          <p className="mb-6 text-center">
            Here are the official channels through which you can reach out for any inquiries:
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <a href="mailto:saatzdominik@gmail.com" className="text-blue-500 hover:underline">
                saatzdominik@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Linkedin className="w-5 h-5 text-blue-600" />
              <Link href="https://de.linkedin.com/in/dominik-saatz" className="text-blue-500 hover:underline">
                LinkedIn
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Github className="w-5 h-5 text-gray-800" />
              <Link href="https://github.com/dsaatz" className="text-blue-500 hover:underline">
                GitHub
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </StandardLayout>
  );
}
