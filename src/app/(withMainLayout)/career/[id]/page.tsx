"use client";

import type { THiring } from "@/types";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import ApplicationForm from "../_components/application-form";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetSingleHiringPostQuery } from "@/redux/api/adminApi/hiringApi/hiring.api";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CareerDetails = () => {
  const { id: slugParams } = useParams();
  const { data, isLoading, isError, error } = useGetSingleHiringPostQuery({
    id: slugParams,
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const verified = searchParams.get("verified");
  const jobId = searchParams.get("jobId");

  useEffect(() => {
    if (!email || verified !== "true" || !slugParams || !jobId) {
      toast.error("Unauthorized access");
      router.push("/");
    }
  }, [email, verified, router, slugParams, jobId]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center items-center">
        <div className="animate-pulse text-lg font-medium">
          Loading job details...
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError || !data?.data) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error
              ? `Failed to load job details: ${error.toString()}`
              : "Failed to load job details. Please try again later."}
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const hiringData: THiring = data?.data;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {hiringData.title}
            </h1>
            <p className="text-gray-600 mb-4">{hiringData.companyName}</p>

            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {hiringData.jobType}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {hiringData.jobNature}
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {hiringData.department}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-700">Location</h3>
                <p>{hiringData.location}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Salary Range</h3>
                <p>{hiringData.salaryRange}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Working Hours</h3>
                <p>{hiringData.workingHours}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Working Days</h3>
                <p>{hiringData.workingDays}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Experience</h3>
                <p>{hiringData.experience}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">
                  Application Deadline
                </h3>
                <p>
                  {new Date(
                    hiringData.applicationDeadline
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {hiringData.hiringImage && (
            <div className="w-full md:w-1/3">
              <Image
                src={hiringData.hiringImage || "/placeholder.svg"}
                alt={hiringData.title}
                width={500}
                height={500}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Job Description
          </h2>
          <p className="text-gray-700 mb-6 whitespace-pre-line">
            {hiringData.description}
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Requirements
          </h2>
          <ul className="list-disc pl-5 mb-6">
            {hiringData.requirements.map((req, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {req}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Responsibilities
          </h2>
          <ul className="list-disc pl-5 mb-6">
            {hiringData.responsibilities.map((resp, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {resp}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefits</h2>
          <ul className="list-disc pl-5 mb-6">
            {hiringData.benefits.map((benefit, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {benefit}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Skills Required
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {hiringData.skillsRequired.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Interview Process
          </h2>
          <ol className="list-decimal pl-5 mb-6">
            {hiringData.interviewRounds.map((round, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {round}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Apply for this Position
        </h2>
        <Suspense fallback={<div>Loading application form...</div>}>
          {jobId && email && (
            <ApplicationForm
              email={email}
              jobId={jobId as string}
              jobTitle={hiringData.title}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default CareerDetails;
