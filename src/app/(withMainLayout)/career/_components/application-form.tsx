"use client";

import ErrorMessage from "@/components/dashboard/ErrorMessage/ErrorMessage";
import { useNotification } from "@/hooks/useNotification";
import { useCreateJobApplicationMutation } from "@/redux/api/adminApi/jobApplicationApi/JobApplicationApi.api";
import type { TError } from "@/types";
import { ApplicationFormData } from "@/types/jopApplicationForm.types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const inputStyle =
  "rounded px-4 py-3 rounded-2xl focus:outline-none w-full bg-white";

const ApplicationForm = ({
  jobId,
  jobTitle,
  email,
}: {
  jobId: string;
  jobTitle: string;
  email: string;
}) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [applyJopApplication, { isError, isLoading, isSuccess, data, error }] =
    useCreateJobApplicationMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    defaultValues: {
      applicantName: "",
      applicantEmail: email || "",
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
      skills: [{ value: "" }],
      workExperience: [{ company: "", role: "", duration: "" }],
      preferredWorkingHours: "",
      applicationSource: "",
      reasonWeHireYou: "",
      coverLetter: "",
    },
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray<ApplicationFormData>({
    control,
    name: "workExperience",
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray<ApplicationFormData>({
    control,
    name: "skills",
  });

  const onSubmit = async (data: ApplicationFormData) => {
    // Filter out empty skills
    data.skills = data.skills.filter((skill) => skill.value.trim() !== "");

    // Filter out empty work experiences
    data.workExperience = data.workExperience.filter(
      (exp) =>
        exp.company.trim() !== "" &&
        exp.role.trim() !== "" &&
        exp.duration.trim() !== ""
    );

    const bodyData = {
      ...data,
      expectedSalary: Number(data?.expectedSalary),
      skills: data.skills.map((item) => item.value),
      jobId,
    };
    applyJopApplication(bodyData);
  };

  useEffect(() => {
    if (isSuccess) {
      setSubmitSuccess(true);
      reset();
    }
  }, [isSuccess, reset]);

  useNotification({
    isLoading: isLoading,
    isError: isError,
    isSuccess: submitSuccess,
    data: data || {},
    error: error as TError,
  });

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
        <Link href={"/career"}>
          <button
            // onClick={() => setSubmitSuccess(false)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
          >
            Apply for Another Position
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <label className="block text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                readOnly
                value={email}
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
                  errors.resumeLink
                    ? "border-red-500"
                    : "border border-gray-300"
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
              <label className="block text-gray-700 mb-2">
                LinkedIn Profile *
              </label>
              <input
                type="url"
                className={`${inputStyle} ${
                  errors.linkedInProfile
                    ? "border-red-500"
                    : "border border-gray-300"
                }`}
                placeholder="https://linkedin.com/in/johndoe"
                {...register("linkedInProfile", {
                  required: "LinkedIn profile is required",
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Must be a valid URL",
                  },
                })}
              />
              {errors.linkedInProfile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.linkedInProfile.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                GitHub Profile *
              </label>
              <input
                type="url"
                className={`${inputStyle} ${
                  errors.githubProfile
                    ? "border-red-500"
                    : "border border-gray-300"
                }`}
                placeholder="https://github.com/johndoe"
                {...register("githubProfile", {
                  required: "GitHub profile is required",
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Must be a valid URL",
                  },
                })}
              />
              {errors.githubProfile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.githubProfile.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Portfolio Website *
              </label>
              <input
                type="url"
                className={`${inputStyle} ${
                  errors.portfolioLink
                    ? "border-red-500"
                    : "border border-gray-300"
                }`}
                placeholder="https://johndoe.dev"
                {...register("portfolioLink", {
                  required: "Portfolio website is required",
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Must be a valid URL",
                  },
                })}
              />
              {errors.portfolioLink && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.portfolioLink.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Facebook Profile *
              </label>
              <input
                type="url"
                className={`${inputStyle} ${
                  errors.facebookProfile
                    ? "border-red-500"
                    : "border border-gray-300"
                }`}
                placeholder="https://facebook.com/johndoe"
                {...register("facebookProfile", {
                  required: "Facebook profile is required",
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Must be a valid URL",
                  },
                })}
              />
              {errors.facebookProfile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.facebookProfile.message}
                </p>
              )}
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
                Current/Last Company *
              </label>
              <input
                type="text"
                className={`${inputStyle} ${
                  errors.currentCompany
                    ? "border-red-500"
                    : "border border-gray-300"
                }`}
                placeholder="Tech Corp"
                {...register("currentCompany", {
                  required: "Current company is required",
                })}
              />
              {errors.currentCompany && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentCompany.message}
                </p>
              )}
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
              <label className="block text-gray-700 mb-2">
                Available From *
              </label>
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
                Preferred Working Hours *
              </label>
              <input
                type="text"
                className={`${inputStyle} ${
                  errors.preferredWorkingHours
                    ? "border-red-500"
                    : "border border-gray-300"
                }`}
                placeholder="9 AM - 6 PM"
                {...register("preferredWorkingHours", {
                  required: "Working hours are required",
                })}
              />
              {errors.preferredWorkingHours && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.preferredWorkingHours.message}
                </p>
              )}
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
                {...register("education", {
                  required: "Education is required",
                })}
              />
              {errors.education && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.education.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Application Source *
              </label>
              <input
                type="text"
                className={`${inputStyle} ${
                  errors.applicationSource
                    ? "border-red-500"
                    : "border border-gray-300"
                }`}
                placeholder="LinkedIn, Job Board, Referral, etc."
                {...register("applicationSource", {
                  required: "Application source is required",
                })}
              />
              {errors.applicationSource && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicationSource.message}
                </p>
              )}
            </div>
          </div>

          {/* skills */}
          <div className="mt-2">
            <h3 className="text-xl font-semibold text-gray-800">Skills *</h3>

            {skillFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center mt-2">
                <div className="flex-1">
                  <input
                    type="text"
                    className={`${inputStyle} ${
                      errors.skills?.[index]?.value
                        ? "border-red-500"
                        : "border border-gray-300"
                    }`}
                    placeholder="Enter skill"
                    {...register(`skills.${index}.value` as const, {
                      required:
                        index === 0 ? "At least one skill is required" : false,
                    })}
                  />
                  {errors.skills?.[index]?.value && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.skills[index].value.message}
                    </p>
                  )}
                </div>
                {skillFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => appendSkill({ value: "" })}
              className="text-primary cursor-pointer hover:text-primary/90 font-medium flex items-center mt-2"
            >
              + Add skills
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
                  <label className="block text-gray-700 mb-2">Company *</label>
                  <input
                    type="text"
                    className={`${inputStyle} ${
                      errors.workExperience?.[index]?.company
                        ? "border-red-500"
                        : "border border-gray-300"
                    }`}
                    placeholder="ABC Solutions"
                    {...register(`workExperience.${index}.company` as const, {
                      required:
                        index === 0 ? "Company name is required" : false,
                    })}
                  />
                  {errors.workExperience?.[index]?.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.workExperience[index].company.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Role *</label>
                  <input
                    type="text"
                    className={`${inputStyle} ${
                      errors.workExperience?.[index]?.role
                        ? "border-red-500"
                        : "border border-gray-300"
                    }`}
                    placeholder="Frontend Developer"
                    {...register(`workExperience.${index}.role` as const, {
                      required: index === 0 ? "Role is required" : false,
                    })}
                  />
                  {errors.workExperience?.[index]?.role && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.workExperience[index].role.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Duration *</label>
                  <input
                    type="text"
                    className={`${inputStyle} ${
                      errors.workExperience?.[index]?.duration
                        ? "border-red-500"
                        : "border border-gray-300"
                    }`}
                    placeholder="2 years"
                    {...register(`workExperience.${index}.duration` as const, {
                      required: index === 0 ? "Duration is required" : false,
                    })}
                  />
                  {errors.workExperience?.[index]?.duration && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.workExperience[index].duration.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              appendExperience({ company: "", role: "", duration: "" })
            }
            className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium flex items-center"
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
              <label className="block text-gray-700 mb-2">Cover Letter *</label>
              <textarea
                className={`${inputStyle} ${
                  errors.coverLetter
                    ? "border-red-500"
                    : "border border-gray-300"
                } min-h-[150px]`}
                placeholder="Your cover letter..."
                {...register("coverLetter", {
                  required: "Cover letter is required",
                })}
              ></textarea>
              {errors.coverLetter && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.coverLetter.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 rounded-full cursor-pointer text-white font-medium ${
              isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
      <ErrorMessage error={error as TError}></ErrorMessage>
    </div>
  );
};

export default ApplicationForm;
