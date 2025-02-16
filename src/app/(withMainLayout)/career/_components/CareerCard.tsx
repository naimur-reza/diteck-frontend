import { ButtonWithIcon } from "@/components/common";
import { PulseButton } from "@/components/ui";
import type React from "react";

interface CareerCardProps {
  title: string;
  location: string;
  type: string;
  description: string;
  openModal: () => void;
}

const CareerCard: React.FC<CareerCardProps> = ({
  title,
  type,
  description,
  location,
  openModal,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <PulseButton buttonText={type} />
        <p className="text-gray-500">{location}</p>
      </div>
      <h3 className="text-3xl font-semibold mt-14">{title}</h3>
      <p className="mt-4 mb-6">{description}</p>
      <ButtonWithIcon onClick={openModal} text="Learn more" />
    </div>
  );
};

export default CareerCard;
