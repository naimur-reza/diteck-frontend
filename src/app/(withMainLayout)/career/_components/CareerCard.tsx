"use client";

import { ButtonWithIcon } from "@/components/common";
import { PulseButton } from "@/components/ui";
import Modal from "@/components/ui/modal/Modal";
import { useModal } from "@/hooks/useModal";
import type { TError, THiring } from "@/types";
import { Briefcase, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRequestJobApplicationMutation } from "@/redux/api/adminApi/jobApplicationApi/JobApplicationApi.api";
import { useNotification } from "@/hooks/useNotification";

const CareerCard: React.FC<THiring> = ({
  _id,
  title,
  jobType,
  description,
  location,
  requirements,
  responsibilities,
  jobNature,
  workingHours,
  slug,
}) => {
  const [
    requestJobApplication,
    { isSuccess, isLoading, isError, data, error },
  ] = useRequestJobApplicationMutation();
  const { isOpen, openModal, closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const handleApplyClick = () => {
    setShowEmailInput(true);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    const res = await requestJobApplication({
      data: { email },
      jobId: _id,
    }).unwrap();
    if (res?.success) {
      closeModal();
      setEmailError("");
      router.push(
        `/career/verify?jobId=${_id}&email=${encodeURIComponent(
          email
        )}&slug=${slug}`
      );
    }
  };

  useNotification({
    isError,
    isLoading,
    isSuccess,
    data,
    error: error as TError,
  });
  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <PulseButton buttonText={jobType} />
        <p className="text-gray-500">{location}</p>
      </div>
      <h3 className="text-3xl font-semibold mt-14">{title}</h3>
      <p className="mt-4 mb-6">{description}</p>
      <ButtonWithIcon onClick={openModal} text="Learn more" />

      <Modal isOpen={isOpen} onClose={closeModal} title={title}>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span>{jobNature}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{workingHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{location}</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">{description}</p>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Key Responsibilities:</h3>
              <ul className="list-disc space-y-2 pl-5 text-gray-600">
                {responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Requirements:</h3>
              <ul className="list-disc space-y-2 pl-5 text-gray-600">
                {requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>

            <p className="pt-4 text-lg text-secondary">
              If you&lsquo;re passionate about designing exceptional digital
              experiences, we&lsquo;d love to hear from you!
            </p>
          </div>

          {!showEmailInput ? (
            <button
              onClick={handleApplyClick}
              className="mt-6 mb-4 w-full rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 cursor-pointer"
            >
              Apply Now
            </button>
          ) : (
            <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter your email to continue
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && (
                  <p className="text-sm text-red-500">{emailError}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
              >
                Continue
              </Button>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CareerCard;
