export const PulseButton = ({
  color = "text-accent", // Default color
  bgColor = "text-transparent", // Default color
  buttonText,
  isAnimate = true,
  pulseBgColor = "bg-primary",
  isBorder = true,
}: {
  color?: string;
  bgColor?: string;
  buttonText: string;
  isAnimate?: boolean;
  isBorder?: boolean;
  pulseBgColor?: string;
}) => {
  return (
    <div
      className={`${
        isBorder && "border"
      } border-[#636EDF4D] w-fit rounded-[10px]  font-medium text-sm md:text-lg px-4 py-1.5 flex items-center gap-2 ${color} ${bgColor}`}
    >
      <span
        className={`w-2 h-2 rounded-[2px]  ${pulseBgColor} ${
          isAnimate ? "animate-pulse" : ""
        }`}
      ></span>
      {buttonText}
    </div>
  );
};
