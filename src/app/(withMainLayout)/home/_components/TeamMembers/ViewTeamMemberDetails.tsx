"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TTeamMember } from "@/types";
import { Mail, Phone } from "lucide-react";
import React from "react";

const ViewTeamMemberDetails = ({
  singleData,
  setIsViewModal,
}: {
  singleData: TTeamMember;
  setIsViewModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-3">
          <AvatarImage
            className="object-cover"
            src={singleData.profilePhoto}
            alt={singleData.name}
          />
          <AvatarFallback>
            {singleData?.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{singleData?.name}</h2>
        <p className="text-muted-foreground">{singleData?.designation}</p>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{singleData.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{singleData.phoneNumber}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Team Role</h3>
        <p>{singleData.teamRole}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Bio</h3>
        <p className="text-sm text-muted-foreground">{singleData.bio}</p>
      </div>

      {singleData.skills && singleData.skills.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {singleData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h3 className="font-medium">Start Date</h3>
          <p className="text-muted-foreground">
            {new Date(singleData?.startDate).toLocaleDateString()}
          </p>
        </div>
        {singleData.endDate && (
          <div>
            <h3 className="font-medium">End Date</h3>
            <p className="text-muted-foreground">
              {new Date(singleData?.endDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      <div className="pt-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsViewModal(false)}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ViewTeamMemberDetails;
