import React from 'react';

const StackCard = ({ title, description, items }: { title: string, description?: string, items?: string[] }) => {
    return (
        <div className="grid md:grid-cols-[2fr_4fr] gap-x-20 border-t py-10">
            <div>
                <h4 className="font-medium text-[30px] lg:text-[42px] leading-[42px]">
                    {title}
                </h4>
            </div>
            <div>
                <p className="text-[20px] text-light pb-5">
                    {description}
                </p>
                <ul>
                    {items?.map(
                        (item, idx) => (
                            <li
                                key={idx}
                                className="border-t py-3 text-[20px] font-medium"
                            >
                                <span>{item}</span>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};

export default StackCard;