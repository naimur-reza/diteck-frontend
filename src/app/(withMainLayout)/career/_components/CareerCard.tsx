import { ButtonWithIcon } from "@/components/common";
import { PulseButton } from "@/components/ui";
import Modal from "@/components/ui/modal/Modal";
import { useModal } from "@/hooks/useModal";
import { Briefcase, Clock, MapPin } from "lucide-react";
import type React from "react";

interface CareerCardProps {
  title: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const CareerCard: React.FC<CareerCardProps> = ({
  title,
  type,
  description,
  location,
  requirements,
  responsibilities,
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <PulseButton buttonText={type} />
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
              <span>Full time</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>09:00 am - 05:00pm</span>
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

          <button
            onClick={closeModal}
            className="mt-6 w-full rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
          >
            Apply Now
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CareerCard;
