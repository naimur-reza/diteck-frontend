"use client";
import { TeamMemberCard } from "@/components/ui";
import Modal from "@/components/ui/modal/Modal";
import { TTeamMember } from "@/types";
import React, { useState } from "react";
import ViewTeamMemberDetails from "./ViewTeamMemberDetails";

const TeamMemberContainer = ({ teamsArray }: { teamsArray: TTeamMember[] }) => {
  const [isViewModal, setIsViewModal] = useState(false);
  const [singleData, SetSingleData] = useState<TTeamMember | null>();

  const handleModal = (item: TTeamMember) => {
    setIsViewModal(true);
    SetSingleData(item);
  };
  return (
    <div className="relative">
      <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {teamsArray && teamsArray.length > 0 ? (
          teamsArray.map((item, idx) => (
            <TeamMemberCard handleModal={handleModal} key={idx} item={item} />
          ))
        ) : (
          <p className="text-center text-gray-500">No team member available</p>
        )}
      </div>
      <Modal
        isOpen={isViewModal}
        onClose={() => setIsViewModal(false)}
        title="Member info"
      >
        <ViewTeamMemberDetails
          singleData={singleData as TTeamMember}
          setIsViewModal={setIsViewModal}
        />
      </Modal>
    </div>
  );
};

export default TeamMemberContainer;
