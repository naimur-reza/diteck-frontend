import React from "react";
import Image from "next/image";

interface ItemDetailsProps<T> {
    item?: T | null;
    excludeFields?: string[];
    imageFields?: string[]; // Fields to be treated as images
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ItemDetails = <T extends Record<string, any>>({
    item,
    excludeFields = ["_id", "isDeleted", "createdAt", "updatedAt"],
    imageFields = [],
}: ItemDetailsProps<T>) => {
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
                        ) : (
                            <span className="ml-2">{typeof value === "object" ? JSON.stringify(value) : value}</span>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default ItemDetails;
