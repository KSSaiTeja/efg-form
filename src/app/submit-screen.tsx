/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubmitScreenProps {
  formData: any;
}

export default function SubmitScreen({ formData }: SubmitScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Savart EFG Analysis Form
          </h1>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Form Submitted Successfully</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Thank you for completing the Savart EFG Analysis Form. Your
              responses have been recorded.
            </p>
            <p className="mt-4">
              We will review your information and get back to you soon.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
