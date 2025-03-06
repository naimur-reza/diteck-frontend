"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const inputStyle =
  "rounded px-4 py-3 rounded-2xl focus:outline-none w-full bg-white";

type WorkExperience = {
  company: string;
  role: string;
  duration: string;
};

type ApplicationFormData = {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  resumeLink: string;
  linkedInProfile: string;
  facebookProfile: string;
  portfolioLink: string;
  githubProfile: string;
  expectedSalary: number;
  currency: string;
  currentCompany: string;
  availableByDate: string;
  education: string;
  skills: string[];
  workExperience: WorkExperience[];
  preferredWorkingHours: string;
  applicationSource: string;
  reasonWeHireYou: string;
  coverLetter: string;
};

const ApplicationForm = ({
  jobId,
  jobTitle,
}: {
  jobId: string;
  jobTitle: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    defaultValues: {
      applicantName: "",
      applicantEmail: "",
      applicantPhone: "",
      resumeLink: "",
      linkedInProfile: "",
      facebookProfile: "",
      portfolioLink: "",
      githubProfile: "",
      expectedSalary: 0,
      currency: "USD",
      currentCompany: "",
      availableByDate: "",
      education: "",
      skills: [""],
      workExperience: [{ company: "", role: "", duration: "" }],
      preferredWorkingHours: "",
      applicationSource: "",
      reasonWeHireYou: "",
      coverLetter: "",
    },
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "workExperience",
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Filter out empty skills
      data.skills = data.skills.filter((skill) => skill.trim() !== "");

      // Filter out empty work experiences
      data.workExperience = data.workExperience.filter(
        (exp) =>
          exp.company.trim() !== "" ||
          exp.role.trim() !== "" ||
          exp.duration.trim() !== ""
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applications/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            jobId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error("Application submission error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold text-green-700 mb-3">
          Application Submitted!
        </h3>
        <p className="text-green-600 mb-4">
          Thank you for applying for the {jobTitle} position. We will review
          your application and get back to you soon.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
        >
          Apply for Another Position
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Personal Information
          </h3>

          <div>
            <label className="block text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              className={`${inputStyle} ${
                errors.applicantName
                  ? "border-red-500"
                  : "border border-gray-300"
              }`}
              placeholder="John Doe"
              {...register("applicantName", { required: "Name is required" })}
            />
            {errors.applicantName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.applicantName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              className={`${inputStyle} ${
                errors.applicantEmail
                  ? "border-red-500"
                  : "border border-gray-300"
              }`}
              placeholder="john@example.com"
              {...register("applicantEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.applicantEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.applicantEmail.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone Number *</label>
            <input
              type="tel"
              className={`${inputStyle} ${
                errors.applicantPhone
                  ? "border-red-500"
                  : "border border-gray-300"
              }`}
              placeholder="+1 (123) 456-7890"
              {...register("applicantPhone", {
                required: "Phone number is required",
              })}
            />
            {errors.applicantPhone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.applicantPhone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Resume Link *</label>
            <input
              type="url"
              className={`${inputStyle} ${
                errors.resumeLink ? "border-red-500" : "border border-gray-300"
              }`}
              placeholder="https://example.com/resume.pdf"
              {...register("resumeLink", {
                required: "Resume link is required",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Must be a valid URL",
                },
              })}
            />
            {errors.resumeLink && (
              <p className="text-red-500 text-sm mt-1">
                {errors.resumeLink.message}
              </p>
            )}
          </div>
        </div>

        {/* Professional Profiles */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Professional Profiles
          </h3>

          <div>
            <label className="block text-gray-700 mb-2">LinkedIn Profile</label>
            <input
              type="url"
              className={`${inputStyle} border border-gray-300`}
              placeholder="https://linkedin.com/in/johndoe"
              {...register("linkedInProfile")}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">GitHub Profile</label>
            <input
              type="url"
              className={`${inputStyle} border border-gray-300`}
              placeholder="https://github.com/johndoe"
              {...register("githubProfile")}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Portfolio Website
            </label>
            <input
              type="url"
              className={`${inputStyle} border border-gray-300`}
              placeholder="https://johndoe.dev"
              {...register("portfolioLink")}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Facebook Profile</label>
            <input
              type="url"
              className={`${inputStyle} border border-gray-300`}
              placeholder="https://facebook.com/johndoe"
              {...register("facebookProfile")}
            />
          </div>
        </div>
      </div>

      {/* Employment Information */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Employment Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">
              Current/Last Company
            </label>
            <input
              type="text"
              className={`${inputStyle} border border-gray-300`}
              placeholder="Tech Corp"
              {...register("currentCompany")}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2">
                Expected Salary *
              </label>
              <input
                type="number"
                className={`${inputStyle} ${
                  errors.expectedSalary
                    ? "border-red-500"
                    : "border border-gray-300"
                }`}
                placeholder="70000"
                {...register("expectedSalary", {
                  required: "Expected salary is required",
                  min: {
                    value: 1,
                    message: "Salary must be greater than 0",
                  },
                })}
              />
              {errors.expectedSalary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.expectedSalary.message}
                </p>
              )}
            </div>

            <div className="w-1/3">
              <label className="block text-gray-700 mb-2">Currency</label>
              <select
                className={`${inputStyle} border border-gray-300`}
                {...register("currency")}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
                <option value="AUD">AUD</option>
                <option value="INR">INR</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Available From *</label>
            <input
              type="date"
              className={`${inputStyle} ${
                errors.availableByDate
                  ? "border-red-500"
                  : "border border-gray-300"
              }`}
              {...register("availableByDate", {
                required: "Availability date is required",
              })}
            />
            {errors.availableByDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.availableByDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Preferred Working Hours
            </label>
            <input
              type="text"
              className={`${inputStyle} border border-gray-300`}
              placeholder="9 AM - 6 PM"
              {...register("preferredWorkingHours")}
            />
          </div>
        </div>
      </div>

      {/* Education & Skills */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Education & Skills
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Education *</label>
            <input
              type="text"
              className={`${inputStyle} ${
                errors.education ? "border-red-500" : "border border-gray-300"
              }`}
              placeholder="Bachelor's in Computer Science"
              {...register("education", { required: "Education is required" })}
            />
            {errors.education && (
              <p className="text-red-500 text-sm mt-1">
                {errors.education.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Application Source
            </label>
            <input
              type="text"
              className={`${inputStyle} border border-gray-300`}
              placeholder="LinkedIn, Job Board, Referral, etc."
              {...register("applicationSource")}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 mb-2">Skills *</label>
          <div className="space-y-3">
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  type="text"
                  className={`${inputStyle} border border-gray-300 flex-1`}
                  placeholder="e.g., JavaScript, React, Node.js"
                  {...register(`skills.${index}` as const)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (skillFields.length > 1) {
                      removeSkill(index);
                    }
                  }}
                  className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => appendSkill("")}
            className="mt-2 text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            + Add another skill
          </button>
        </div>
      </div>

      {/* Work Experience */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Work Experience
        </h3>

        {experienceFields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border border-gray-200 rounded-lg mb-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Experience #{index + 1}</h4>
              {experienceFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  className={`${inputStyle} border border-gray-300`}
                  placeholder="ABC Solutions"
                  {...register(`workExperience.${index}.company` as const)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  className={`${inputStyle} border border-gray-300`}
                  placeholder="Frontend Developer"
                  {...register(`workExperience.${index}.role` as const)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  className={`${inputStyle} border border-gray-300`}
                  placeholder="2 years"
                  {...register(`workExperience.${index}.duration` as const)}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            appendExperience({ company: "", role: "", duration: "" })
          }
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          + Add work experience
        </button>
      </div>

      {/* Additional Information */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Additional Information
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Why Should We Hire You? *
            </label>
            <textarea
              className={`${inputStyle} ${
                errors.reasonWeHireYou
                  ? "border-red-500"
                  : "border border-gray-300"
              } min-h-[100px]`}
              placeholder="Explain why you're a good fit for this position..."
              {...register("reasonWeHireYou", {
                required: "This field is required",
              })}
            ></textarea>
            {errors.reasonWeHireYou && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reasonWeHireYou.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Cover Letter</label>
            <textarea
              className={`${inputStyle} border border-gray-300 min-h-[150px]`}
              placeholder="Your cover letter..."
              {...register("coverLetter")}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-full text-white font-medium ${
            isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;
