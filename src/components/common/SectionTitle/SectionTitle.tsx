"use client";

import { ScrollFadeIn } from "@/components/shared/animations";
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
          <ScrollFadeIn>
            <PulseButton buttonText={buttonText} color={color} />
          </ScrollFadeIn>
        </div>

        <div className={rightText ? "col-span-5" : "col-span-3 lg:pr-10"}>
          {rightText ? (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-center">
              <ScrollFadeIn delay={0.2} className="col-span-3">
                <h2 className={`section-title ${color}`}>{title}</h2>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.3} className="lg:text-right col-span-2">
                <p className={`text-base w-4/5 md:pl-5 md:ml-auto ${color}`}>
                  {rightText}
                </p>
              </ScrollFadeIn>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <ScrollFadeIn delay={0.2}>
                <h2 className={`section-title ${color}`}>{title}</h2>
              </ScrollFadeIn>
              {description && (
                <ScrollFadeIn delay={0.3}>
                  <p className={`section-description ${color}`}>
                    {description}
                  </p>
                </ScrollFadeIn>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
