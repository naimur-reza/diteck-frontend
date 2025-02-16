import { ButtonWithIcon } from "@/components/common";

const CareerCard = (job: {
  title: string;
  location: string;
  type: string;
  description: string;
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 ">
      <h3 className="text-3xl font-semibold">{job.title}</h3>
      <p className="text-gray-500">{job.location}</p>
      <p className="text-gray-500">{job.type}</p>
      <p className="mt-4 mb-6">{job.description}</p>
      <ButtonWithIcon text="Learn more" />
    </div>
  );
};

export default CareerCard;
