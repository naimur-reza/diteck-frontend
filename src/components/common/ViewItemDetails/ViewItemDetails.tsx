import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ViewItemDetailsProps<T> {
    item?: T | null;
    excludeFields?: string[];
    imageFields?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ViewItemDetails = <T extends Record<string, any>>({
    item,
    excludeFields = ["_id", "isDeleted", "createdAt", "updatedAt", "slug", "createdBy"],
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

                        {/* ✅ Single Image Handling */}
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
                            // ✅ Array of Images Handling
                            imageFields.includes(key) && typeof value[0] === "string" ? (
                                <div className="flex flex-wrap gap-2">
                                    {value.map((imgSrc, index) => (
                                        <div key={index} className="w-24 h-24 relative">
                                            <Image
                                                src={imgSrc}
                                                alt={`${key}-${index}`}
                                                width={96}
                                                height={96}
                                                className="rounded-md border object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) :
                                // ✅ Array of Objects (like Work Experience)
                                typeof value[0] === "object" ? (
                                    <div className="space-y-2">
                                        {value.map((item, index) => (
                                            <div key={index} className="p-2 border rounded-md shadow-sm">
                                                {Object.entries(item).map(([subKey, subValue]) => (
                                                    <p key={subKey} className="text-sm">
                                                        <strong className="capitalize">{subKey}: </strong> {String(subValue)}
                                                    </p>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <ul className="list-disc ml-5">
                                        {value.map((item, index) => (
                                            <li key={index}>{String(item)}</li>
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
                        ) : typeof value === "string" && value.startsWith("http") ? (
                            <Link href={value} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-300">
                                {value}
                            </Link>
                        ) : typeof value === "number" ? (
                            <span className="ml-2">{value.toLocaleString()}</span>
                        ) : (
                            <span className="ml-2">{String(value)}</span>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default ViewItemDetails;
