import type { TService } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock, DollarSign } from "lucide-react";
import Image from "next/image";
import { formatDateTime } from "@/utils";

const ViewService = ({ service }: { service?: TService }) => {
  if (!service) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">No service selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{service.title}</h1>
        <Badge
          variant={
            service.status.toLowerCase() === "active" ? "default" : "secondary"
          }
        >
          {service.status}
        </Badge>
      </div>

      <div className="bg-white  rounded-lg ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {service.photo && (
              <Image
                src={service.photo || "/placeholder.svg"}
                alt={service.title}
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-64"
              />
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Price</h2>
              <p className="text-2xl font-bold flex items-center gap-1">
                <DollarSign className="h-6 w-6" />
                {service.price.basePrice} {service.price.currency}
              </p>
              {service.price.customPricingAvailable && (
                <p className="text-sm text-muted-foreground mt-1">
                  Custom pricing available
                </p>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Turnaround Time</h2>
              <p className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                {service.turnAroundTime}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Category</h2>
              <Badge variant="outline">{service.serviceCategory}</Badge>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="whitespace-pre-line">{service.description}</p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            {service?.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TechSection
            title="Frontend Technologies"
            items={service.frontendTech}
          />
          <TechSection title="CSS Frameworks" items={service.cssFramework} />
          <TechSection
            title="Component Libraries"
            items={service.componentLibrary}
          />
          <TechSection
            title="Animation Libraries"
            items={service.animationLibrary}
          />
          <TechSection title="File Storage" items={service.fileStorage} />
          <TechSection
            title="Backend Technologies"
            items={service.backendTech}
          />
          <TechSection title="Databases" items={service.database} />
          <TechSection
            title="Payment Gateways"
            items={service.paymentGateway}
          />
          <TechSection title="Testing" items={service.testing} />
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Relevant Work Samples</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* {service?.relevantWorkSamples?.map(
              (sample, index) =>
                sample && (
                  <Image
                    key={index}
                    src={sample || "/placeholder.svg"}
                    alt={`Work sample ${index + 1}`}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                )
            )} */}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Service Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Created At
              </h3>
              <p className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                {formatDateTime(service.createdAt)}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Last Updated
              </h3>
              <p className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                {formatDateTime(service.updatedAt)}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Service ID
              </h3>
              <p className="font-mono text-sm">{service._id}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Slug
              </h3>
              <p className="font-mono text-sm">{service.slug}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechSection = ({ title, items }: { title: string; items: string[] }) => (
  <div className="space-y-2">
    <h3 className="font-semibold">{title}</h3>
    {items.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge key={index} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>
    ) : (
      <p className="text-sm text-muted-foreground">None specified</p>
    )}
  </div>
);

export default ViewService;
