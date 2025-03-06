/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { TQuery } from "@/types";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Tag,
  AlertCircle,
  User,
} from "lucide-react";
import { format } from "date-fns";

const ViewQueryDetails = ({ item }: { item: TQuery }) => {
  // Format dates
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return dateString;
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "in progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "resolved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "medium":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-2xl font-bold">
              {item.fullName}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={getStatusColor(item.status)}>
                {item.status}
              </Badge>
              <Badge
                variant="outline"
                className={getPriorityColor(item.priority)}
              >
                {item.priority} Priority
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <a
                  href={`mailto:${item.email}`}
                  className="text-primary hover:underline"
                >
                  {item.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Phone:</span>
                <a href={`tel:${item.phoneNumber}`} className="hover:underline">
                  {item.phoneNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Preferred Contact:</span>
                <span>{item.contactMethod}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Location:</span>
                <span>{item.location}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Company Name:</span>
                <span>{item.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Website:</span>
                {item.website ? (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {item.website}
                  </a>
                ) : (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Facebook className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Facebook:</span>
                {item.facebookPage ? (
                  <a
                    href={item.facebookPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {item.facebookPage}
                  </a>
                ) : (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Products/Services:</span>
                <span>{item.whatTheySale}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Query Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Query Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Category:</span>
                <span>{item.queryCategory}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Language:</span>
                <span>{item.language}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <span className="font-medium">Budget Range:</span>
                <span>
                  {item.budgetRange.currency} {item.budgetRange.min} -{" "}
                  {item.budgetRange.max}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-medium">Client Message:</span>
              <p className="mt-2 whitespace-pre-line p-3 bg-muted rounded-md">
                {item.clientMessages}
              </p>
            </div>
          </div>

          <Separator />

          {/* Assignment & Resolution */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Assignment & Resolution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Assigned To:</span>
                <span>{item.assignedTo?.email || "Not assigned"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">User Role:</span>
                <span className="capitalize">
                  {item.assignedTo?.role || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <span className="font-medium">Resolution Notes:</span>
                {item.resolutionNotes ? (
                  <p>{item.resolutionNotes}</p>
                ) : (
                  <span className="text-muted-foreground">
                    No resolution notes
                  </span>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Dates & Timestamps */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Dates & Timestamps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Submission Date:</span>
                <span>{formatDate(item.submissionDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Created At:</span>
                <span>{formatDate(item.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Last Updated:</span>
                <span>{formatDate(item.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Query ID: {item._id}</span>
              <span>•</span>
              <span>Deleted: {item.isDeleted ? "Yes" : "No"}</span>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default ViewQueryDetails;
