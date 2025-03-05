import type { TReview } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Star, MapPin } from "lucide-react";
import Image from "next/image";
import { formatDateTime } from "@/utils";

const ViewReviews = ({ item }: { item: TReview }) => {
  return (
    <div className="bg-white w-full ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Client Review</h1>
        <Badge variant={getReviewStatusVariant(item.reviewStatus)}>
          {item.reviewStatus}
        </Badge>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        {item?.clientPhotoUrl && (
          <Image
            src={item.clientPhotoUrl || "/placeholder.svg"}
            alt={item.clientName}
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">{item.clientName}</h2>
          <p className="text-sm text-muted-foreground">{item.clientEmail}</p>
          <div className="flex items-center mt-1">
            <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-sm">{item.clientCountry}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">
            Organization
          </h3>
          <p>{item.clientOrganization}</p>
        </div>

        <div>
          <h3 className="font-medium text-sm text-muted-foreground">
            Service Used
          </h3>
          <p>{item.serviceUsed}</p>
        </div>

        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Rating</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-5 w-5 ${
                  index < item.starRating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 font-semibold">{item.starRating}/5</span>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Review</h3>
          <p className="whitespace-pre-line">{item.comment}</p>
        </div>

        {item.response && (
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">
              Response
            </h3>
            <p className="whitespace-pre-line">{item.response}</p>
          </div>
        )}

        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Tags</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {item.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <DateInfo label="Review Date" date={item.reviewDate} />
        <DateInfo label="Submission Date" date={item.submissionDate} />
        <DateInfo label="Created At" date={item.createdAt} />
        <DateInfo label="Updated At" date={item.updatedAt} />
      </div>
    </div>
  );
};

const DateInfo = ({ label, date }: { label: string; date: string }) => (
  <div>
    <h3 className="font-medium text-muted-foreground">{label}</h3>
    <p className="flex items-center">
      <CalendarIcon className="h-4 w-4 text-muted-foreground mr-1" />
      {formatDateTime(date)}
    </p>
  </div>
);

const getReviewStatusVariant = (
  status: string
): "default" | "destructive" | "outline" | "secondary" => {
  switch (status.toLowerCase()) {
    case "approved":
      return "default";
    case "pending":
      return "secondary";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
};

export default ViewReviews;
