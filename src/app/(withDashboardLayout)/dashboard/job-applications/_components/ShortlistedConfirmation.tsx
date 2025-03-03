"use client";

import { useUpdateJobApplicationStatusMutation } from "@/redux/api/adminApi/jobApplicationApi/JobApplicationApi.api";
import type { TError, TJobApplication } from "@/types";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  AlertCircle,
  BriefcaseIcon,
  GraduationCapIcon,
  DollarSignIcon,
  CalendarIcon,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { useNotification } from "@/hooks/useNotification";

const ShortlistedConfirmation = ({
  item,
  setIsShortlistedModal,
}: {
  setIsShortlistedModal: Dispatch<SetStateAction<boolean>>;
  item: TJobApplication;
}) => {
  const [jobApplicationStatus, { isLoading, isError, isSuccess, data, error }] =
    useUpdateJobApplicationStatusMutation();

  const handleJobApplicationStatus = () => {
    const bodyData = {
      status: "shortlisted",
    };

    jobApplicationStatus({ id: item._id, data: bodyData });
  };

  const handleClose = () => {
    setIsShortlistedModal(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  useNotification({
    isError,
    isLoading,
    data,
    error: error as TError,
    isSuccess,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsShortlistedModal(false);
    }
  }, [isSuccess, setIsShortlistedModal]);

  return (
    <div className="w-full  mx-auto">
      <div className="relative pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(item.applicantName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{item.applicantName}</CardTitle>
            <CardDescription>
              {item.currentCompany
                ? `Currently at ${item.currentCompany}`
                : "No current company listed"}
            </CardDescription>
          </div>
        </div>
      </div>

      <Separator />

      <ScrollArea className="h-[280px] px-6 py-4">
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <BriefcaseIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm">Experience</h3>
              {item.workExperience && item.workExperience.length > 0 ? (
                <div className="space-y-2 mt-1">
                  {item.workExperience.slice(0, 2).map((exp, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{exp.role}</span> at{" "}
                      {exp.company}
                      <div className="text-xs text-muted-foreground">
                        {exp.duration}
                      </div>
                    </div>
                  ))}
                  {item.workExperience.length > 2 && (
                    <div className="text-xs text-muted-foreground">
                      +{item.workExperience.length - 2} more experiences
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No work experience listed
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <GraduationCapIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm">Education</h3>
              <p className="text-sm">
                {item.education || "No education listed"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <DollarSignIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm">Expected Salary</h3>
              <p className="text-sm">
                {item.expectedSalary
                  ? `${item.expectedSalary.toLocaleString()} ${
                      item.currency || ""
                    }`
                  : "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CalendarIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm">Availability</h3>
              <p className="text-sm">
                {item.availableByDate || "Not specified"}
              </p>
            </div>
          </div>

          {item.skills && item.skills.length > 0 && (
            <div>
              <h3 className="font-medium text-sm mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {item.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {item.applicationScore !== undefined && (
            <div className="mt-4">
              <h3 className="font-medium text-sm">Application Score</h3>
              <div className="flex items-center mt-1">
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{
                      width: `${Math.min(100, item.applicationScore)}%`,
                    }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-medium">
                  {item.applicationScore}%
                </span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <Separator />

      <div className="flex flex-col gap-4 pt-4">
        <div className="text-sm text-muted-foreground">
          Shortlisting this candidate will move them to the next stage of your
          recruitment process.
        </div>
        <div className="flex justify-between w-full">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleJobApplicationStatus}
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Shortlist Candidate"
            )}
          </Button>
        </div>

        {isError && (
          <div className="w-full mt-2 flex items-center gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" />
            <span>
              There was an error shortlisting this candidate. Please try again.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortlistedConfirmation;
