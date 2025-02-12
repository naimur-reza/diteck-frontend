export const PulseButton = ({
  color = "text-accent", // Default color
  buttonText,
}: {
  color?: string;
  buttonText: string;
}) => {
  return (
    <div
      className={`border border-[#636EDF4D] w-fit rounded-[10px]  font-medium text-sm md:text-lg px-4 py-1.5 flex items-center gap-2 ${color}`}
    >
      <span className="w-2 h-2 rounded-[2px]  bg-primary animate-pulse"></span>
      {buttonText}
    </div>
  );
};
