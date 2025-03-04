import React from "react";
import Image from "next/image";

interface ViewItemDetailsProps<T> {
    item?: T | null;
    excludeFields?: string[];
    imageFields?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ViewItemDetails = <T extends Record<string, any>>({
    item,
    excludeFields = ["_id", "isDeleted", "createdAt", "updatedAt", "slug", "createdby"],
    imageFields = [],
}: ViewItemDetailsProps<T>) => {
    if (!item) return <p>No data available.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-white shadow-md rounded-md">
            {Object.entries(item)
                .filter(([key]) => !excludeFields?.includes(key))
                .map(([key, value]) => (
                    <div key={key} className="mb-5">
                        <strong className="capitalize block mb-1">{key.replace(/([A-Z])/g, " $1")}:</strong>

                        {imageFields?.includes(key) && typeof value === "string" ? (
                            <div className="relative w-full h-auto">
                                <Image
                                    src={value}
                                    alt={key}
                                    width={500}
                                    height={300}
                                    layout="responsive"
                                    className="rounded-md border"
                                />
                            </div>
                        ) : Array.isArray(value) ? (
                            imageFields.includes(key) ? (
                                <div className="flex gap-2">
                                    {value.map((imgSrc, index) => (
                                        <div key={index} className="w-20 h-20 relative">
                                            <Image
                                                src={imgSrc}
                                                alt={`${key}-${index}`}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-md border"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <ul className="list-disc ml-5">
                                    {value.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            )
                        ) : typeof value === "object" && value !== null ? (
                            <ul className="list-disc ml-5">
                                {Object.entries(value).map(([subKey, subValue], index) => (
                                    <li key={index}>
                                        <strong className="capitalize">{subKey}:</strong> {String(subValue)}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span className="ml-2">{String(value)}</span>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default ViewItemDetails;
