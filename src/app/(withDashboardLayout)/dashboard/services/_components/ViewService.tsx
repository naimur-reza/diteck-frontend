import ViewItemDetails from '@/components/common/ViewItemDetails/ViewItemDetails';
import { TService } from '@/types';
import React from 'react';

const ViewService = ({ service }: { service?: TService | null | undefined }) => {
    return (
        <div>
            <ViewItemDetails item={service} imageFields={["photo"]} />
        </div>
    );
};

export default ViewService;