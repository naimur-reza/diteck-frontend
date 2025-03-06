import { THiring } from "@/types";
import Image from "next/image";
import { Suspense } from "react";

const CareerDetails = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/hiring-post/get-single-post/${id}`,
    {
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch career details");
  }

  const data = await response.json();
  const hiringData: THiring = data?.data;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className=" p-6 mb-8">
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

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Apply for this Position
        </h2>
        <Suspense fallback={<div>Loading application form...</div>}>
          {/* <ApplicationForm jobId={id} jobTitle={hiringData.title} /> */}
        </Suspense>
      </div>
    </div>
  );
};

export default CareerDetails;
