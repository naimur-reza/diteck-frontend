import ViewItemDetails from '@/components/common/ViewItemDetails/ViewItemDetails';
import { TProject } from '@/types';
import React from 'react';

const ViewProject = ({ project }: { project?: TProject | null | undefined }) => {
    return (
        <div>
            <ViewItemDetails item={project} imageFields={["thumbnail", "images"]} />
        </div>
    );
};

export default ViewProject;