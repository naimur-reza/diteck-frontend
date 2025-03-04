import { THiring } from "@/types";
import React from "react";
import ViewItemDetails from "../../../../../components/common/ViewItemDetails/ViewItemDetails";

const ViewHiring = ({ hiring }: { hiring?: THiring | null | undefined }) => {
    return (
        <div>
            <ViewItemDetails
                item={hiring}
                imageFields={["hiringImage"]}
            />
        </div>
    );
};

export default ViewHiring;
