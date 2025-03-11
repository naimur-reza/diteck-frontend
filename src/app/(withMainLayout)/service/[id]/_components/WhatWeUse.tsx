import StackCard from '@/app/(withMainLayout)/project/[id]/_components/StackCard';
import { TService } from '@/types';
import React from 'react';
import { ServiceTitleAndDescription } from './ServiceTitleAndDescription';

const WhatWeUse = ({ service }: { service: TService }) => {
    const { animationLibrary, backendTech, componentLibrary, cssFramework, database, frontendTech, testing, relevantWorkSamples, paymentGateway, fileStorage } = service || {};

    return (
        <div className='mt-10'>
            <ServiceTitleAndDescription
                title="Technology Stack"
                description="We utilize a comprehensive and modern technology stack to build scalable, secure, and high-performance applications. Below is an overview of the tools and technologies we use."
            />
            <div className="mt-12 space-y-5">

                {/* Animation & Interactive Features */}
                <StackCard
                    title="Animation & Interactive Features"
                    items={animationLibrary}
                    description="We use advanced animation libraries to enhance user experience, improve engagement, and create visually appealing interactions."
                />

                {/* Frontend Technologies */}
                <StackCard
                    title="Frontend Technologies"
                    items={frontendTech}
                    description="Our frontend stack ensures a fast, responsive, and accessible user interface with a focus on performance and aesthetics."
                />

                {/* CSS Frameworks */}
                <StackCard
                    title="CSS Frameworks & Styling Tools"
                    items={cssFramework}
                    description="To maintain a consistent design system, we use powerful CSS frameworks that enable efficient styling and responsive layouts."
                />

                {/* Backend Technologies */}
                <StackCard
                    title="Backend Technologies"
                    items={backendTech}
                    description="Our backend infrastructure is designed for scalability, security, and efficiency, handling data processing, authentication, and API management."
                />

                {/* Databases */}
                <StackCard
                    title="Database Management"
                    items={database}
                    description="We implement robust database solutions to ensure high performance, data integrity, and efficient data retrieval for optimal application performance."
                />

                {/* Component Libraries */}
                <StackCard
                    title="UI Component Libraries"
                    items={componentLibrary}
                    description="We leverage UI component libraries to maintain design consistency, improve development speed, and ensure an intuitive user interface."
                />

                {/* Testing Frameworks */}
                <StackCard
                    title="Testing & Quality Assurance"
                    items={testing}
                    description="Our development process includes rigorous testing using unit, integration, and end-to-end testing methodologies to ensure reliability and performance."
                />

                {/* Deployment & Hosting */}
                <StackCard
                    title="Deployment & Hosting"
                    items={relevantWorkSamples}
                    description="We deploy applications on reliable cloud platforms to ensure seamless accessibility, high uptime, and efficient scaling for traffic demands."
                />

                {/* Payment Gateway Integration */}
                <StackCard
                    title="Payment Gateway Integration"
                    items={paymentGateway}
                    description="We integrate secure payment gateways to facilitate seamless online transactions while ensuring compliance with financial security standards."
                />

                {/* File Storage & Management */}
                <StackCard
                    title="File Storage & Management"
                    items={fileStorage}
                    description="We utilize cloud-based storage solutions to manage and securely store user files, ensuring accessibility and data protection."
                />
            </div>
        </div>
    );
};

export default WhatWeUse;
