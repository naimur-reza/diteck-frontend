import { ButtonWithIcon } from "@/components/common";
import { PulseButton } from "@/components/ui";

const CareerCard = (job: {
  title: string;
  location: string;
  type: string;
  description: string;
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 ">
      <div className="flex items-center justify-between">
        <PulseButton buttonText={job.type} />
        <p className="text-gray-500">{job.location}</p>
      </div>
      <h3 className="text-3xl font-semibold mt-14">{job.title}</h3>

      <p className="mt-4 mb-6">{job.description}</p>
      <ButtonWithIcon text="Learn more" />
    </div>
  );
};

export default CareerCard;
