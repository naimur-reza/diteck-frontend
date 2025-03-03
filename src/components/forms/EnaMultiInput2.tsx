import React, { useState } from "react";

interface MultiInput2Props {
    label?: string;
    placeholder?: string;
    onChange?: (items: string[]) => void;
}

const EnaMultiInput2: React.FC<MultiInput2Props> = ({
    label = "",
    placeholder = "Type something and press Enter...",
    onChange,
}) => {
    const [items, setItems] = useState<string[]>([]);

    // Handle input on Enter key
    const handleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const value = event.currentTarget.value.trim();
            if (value && !items.includes(value)) {
                const updatedItems = [...items, value];
                setItems(updatedItems);
                onChange?.(updatedItems); // Notify parent component
            }
            event.currentTarget.value = "";
        }
    };

    // Remove an item from the list
    const removeItem = (itemToRemove: string) => {
        const updatedItems = items.filter((item) => item !== itemToRemove);
        setItems(updatedItems);
        onChange?.(updatedItems); // Notify parent component
    };

    return (
        <div>
            {label && <label className="block text-sm font-medium">{label} (Press Enter to Add)</label>}
            <input
                type="text"
                placeholder={placeholder}
                onKeyDown={handleInput}
                className="mt-2 w-full rounded border p-2 focus:outline-0"
            />
            <div className="mt-2 flex flex-wrap gap-2">
                {items.map((item) => (
                    <span key={item} className="flex items-center gap-2 rounded-md bg-gray-200 px-3 py-1 text-sm">
                        {item}
                        <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeItem(item)}
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default EnaMultiInput2;