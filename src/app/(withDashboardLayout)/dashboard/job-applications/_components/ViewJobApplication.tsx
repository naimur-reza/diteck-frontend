/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TJobApplication } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  DollarSign,
  ExternalLink,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

const ViewJobApplication = ({ job }: { job?: TJobApplication }) => {
  if (!job) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">No job application selected</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div></div>
        <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>
      </div>

      <div className="w-full p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Applicant Information</h2>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Name
              </h3>
              <p className="text-lg font-medium">{job.applicantName}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Application ID
              </h3>
              <p className="font-mono text-sm">{job._id}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Job ID
              </h3>
              <p className="font-mono text-sm">{job.jobId}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Application Score
              </h3>
              <p className="text-lg font-medium">{job.applicationScore}/100</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${job.applicantEmail}`}
                  className="text-primary hover:underline"
                >
                  {job.applicantEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${job.applicantPhone}`}
                  className="hover:underline"
                >
                  {job.applicantPhone}
                </a>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Online Profiles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {job.resumeLink && (
                <ProfileLink label="Resume" url={job.resumeLink} />
              )}
              {job.linkedInProfile && (
                <ProfileLink label="LinkedIn" url={job.linkedInProfile} />
              )}
              {job.facebookProfile && (
                <ProfileLink label="Facebook" url={job.facebookProfile} />
              )}
              {job.portfolioLink && (
                <ProfileLink label="Portfolio" url={job.portfolioLink} />
              )}
              {job.githubProfile && (
                <ProfileLink label="GitHub" url={job.githubProfile} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Employment Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Expected Salary
              </h3>
              <p className="text-lg font-medium flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {job.expectedSalary} {job.currency}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Current Company
              </h3>
              <p>{job.currentCompany || "Not specified"}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Available From
              </h3>
              <p className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                {formatDate(job.availableByDate)}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Preferred Working Hours
              </h3>
              <p>{job.preferredWorkingHours}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Education & Skills</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Education
              </h3>
              <p className="whitespace-pre-line">{job.education}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
        {job.workExperience.length > 0 ? (
          <div className="space-y-4">
            {job.workExperience.map((exp, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{exp.role}</h3>
                  <Badge variant="outline">{exp.duration}</Badge>
                </div>
                <p className="text-muted-foreground">{exp.company}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No work experience provided</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Why We Should Hire</h2>
          <p className="whitespace-pre-line">{job.reasonWeHireYou}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Cover Letter</h2>
          <p className="whitespace-pre-line">{job.coverLetter}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Application Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">
              Submission Date
            </h3>
            <p>{formatDate(job.submissionDate)}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">
              Application Source
            </h3>
            <p>{job.applicationSource}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">
              Status
            </h3>
            <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileLink = ({ label, url }: { label: string; url: string }) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted transition-colors"
    >
      <ExternalLink className="h-4 w-4 text-muted-foreground" />
      <span>{label}</span>
    </Link>
  );
};

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "outline";
    case "reviewing":
      return "secondary";
    case "interviewed":
      return "default";
    case "hired":
      return "default";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
};

export default ViewJobApplication;
