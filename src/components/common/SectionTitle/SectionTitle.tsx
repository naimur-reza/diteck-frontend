import { PulseButton } from "@/components/ui";
import cn from "classnames";

export const SectionTitle = ({
  title,
  buttonText,
  description,
  rightText,
  color = "text-accent", // Default color
}: {
  title: string;
  buttonText: string;
  description?: string;
  rightText?: string;
  color?: string;
}) => {
  return (
    <section className="py-16">
      <div
        className={cn(
          "flex flex-col gap-4 md:grid md:items-center",
          rightText ? "md:grid-cols-7" : "md:grid-cols-5"
        )}
      >
        <div className="col-span-2">
          <PulseButton buttonText={buttonText} color={color} />
        </div>

        <div className={rightText ? "col-span-5" : "col-span-3 lg:pr-10"}>
          {rightText ? (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-center">
              <h2 className={`section-title col-span-3 ${color}`}>{title}</h2>
              <div className="lg:text-right col-span-2">
                <p className={`text-base w-4/5 md:pl-5 md:ml-auto ${color}`}>
                  {rightText}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <h2 className={`section-title ${color}`}>{title}</h2>
              {description && (
                <p className={`section-description ${color}`}>{description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
