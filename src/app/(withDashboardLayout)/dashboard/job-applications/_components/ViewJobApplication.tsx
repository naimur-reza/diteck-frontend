import { TJobApplication } from "@/types";
import React from "react";
import ViewItemDetails from "../../../../../components/common/ViewItemDetails/ViewItemDetails";

const ViewJobApplication = ({ job: job }: { job?: TJobApplication | null | undefined }) => {
    return (
        <div>
            <ViewItemDetails item={job} imageFields={[""]} />
        </div>
    );
};

export default ViewJobApplication;
