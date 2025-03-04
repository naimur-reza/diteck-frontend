import { TTeamMember } from "@/types";
import React from "react";
import ViewItemDetails from "../../../../../components/common/ViewItemDetails/ViewItemDetails";

const ViewMember = ({ member }: { member?: TTeamMember | null | undefined }) => {
    return (
        <div>
            <ViewItemDetails item={member} imageFields={["profilePhoto"]} />
        </div>
    );
};

export default ViewMember;
