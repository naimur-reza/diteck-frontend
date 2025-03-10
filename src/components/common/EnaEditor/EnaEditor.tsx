"use client"
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const EnaEditor = ({
    setDescription,
    defaultValue = "",
}: {
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    defaultValue?: string;
}) => {
    const [editorData, setEditorData] = useState(defaultValue);

    useEffect(() => {
        if (defaultValue) {
            setEditorData(defaultValue);
            setDescription(defaultValue);
        }
    }, [defaultValue, setDescription]);

    const handleEditorChange = (value: string) => {
        setEditorData(value);
        setDescription(value);
    };

    useEffect(() => {
        // Reset the editor's content when defaultValue changes
        setEditorData(defaultValue);
        setDescription(defaultValue);
    }, [defaultValue, setDescription]);

    const toolbarOptions = {
        toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean",],
        ],
    };

    return (
        <div className="App my-5">
            <ReactQuill
                value={editorData}
                onChange={handleEditorChange}
                modules={toolbarOptions}
                theme="snow"
            />
        </div>
    );
};

export default EnaEditor;