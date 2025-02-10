import cn from "classnames";

export const SectionTitle = ({
  title,
  buttonText,
  description,
  rightText,
}: {
  title: string;
  buttonText: string;
  description?: string;
  rightText?: string;
}) => {
  return (
    <section className="py-16">
      <div
        className={cn(
          "flex flex-col gap-8 md:grid md:items-center",
          rightText ? "md:grid-cols-7" : "md:grid-cols-5"
        )}
      >
        <div className="col-span-2">
          <div className="border border-accent w-fit rounded-[10px] text-accent font-medium text-sm md:text-lg px-4 py-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-[2px] bg-primary animate-pulse"></span>
            {buttonText}
          </div>
        </div>

        <div className={rightText ? "col-span-5" : "col-span-3 md:pr-10"}>
          {rightText ? (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <h2 className="section-title col-span-3">{title}</h2>
              <div className="lg:text-right col-span-2">
                <p className="text-base w-4/5 md:pl-5 md:ml-auto">
                  {rightText}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <h2 className="section-title">{title}</h2>
              {description && (
                <p className="section-description">{description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
