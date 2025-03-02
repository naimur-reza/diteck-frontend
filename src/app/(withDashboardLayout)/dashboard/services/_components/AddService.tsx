"use client";
import { EnaFileUpload, EnaForm, EnaInput } from "@/components/forms";
import { EnaMultiInput } from "@/components/forms/EnaMultiInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { FieldValues } from "react-hook-form";

const AddService = () => {
  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="">
      <EnaForm
        defaultValues={{
          title: "",
          price: "",
          currency: "USD",
          features: [],
          description: "",
          turnAroundTime: "",
          frontendTech: [],
          cssFramework: [],
          componentLibrary: [],
          animationLibrary: [],
          fileStorage: [],
          backendTech: [],
          database: [],
          paymentGateway: [],
          testing: [],
          relevantWorkSamples: [],
          serviceCategory: "E-Commerce",
        }}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-5 mb-5">
          {/* Service Title */}
          <EnaInput
            label="Service Title"
            name="title"
            placeholder="Enter title"
          />

          {/* Base Price */}
          <EnaInput
            label="Base Price (USD)"
            name="price"
            placeholder="7000"
            type="number"
          />

          {/* Features */}
          <EnaMultiInput
            label="Features"
            helperText="Add multiple features"
            name="features"
            placeholder="Enter a feature"
          />

          {/* Turnaround Time */}
          <EnaInput
            label="Turnaround Time"
            name="turnAroundTime"
            placeholder="e.g., 3-6 weeks"
          />

          {/* Frontend Technologies */}
          <EnaMultiInput
            label="Frontend Technologies"
            helperText="List the frontend frameworks used"
            name="frontendTech"
            placeholder="Enter frontend tech"
          />

          {/* CSS Frameworks */}
          <EnaMultiInput
            label="CSS Frameworks"
            helperText="List the CSS frameworks used"
            name="cssFramework"
            placeholder="Enter CSS framework"
          />

          {/* Component Libraries */}
          <EnaMultiInput
            label="Component Libraries"
            helperText="List the UI component libraries"
            name="componentLibrary"
            placeholder="Enter component library"
          />

          {/* Animation Libraries */}
          <EnaMultiInput
            label="Animation Libraries"
            helperText="List animation libraries used"
            name="animationLibrary"
            placeholder="Enter animation library"
          />

          {/* File Storage */}
          <EnaMultiInput
            label="File Storage Options"
            helperText="List storage services used"
            name="fileStorage"
            placeholder="Enter storage service"
          />

          {/* Backend Technologies */}
          <EnaMultiInput
            label="Backend Technologies"
            helperText="List the backend frameworks"
            name="backendTech"
            placeholder="Enter backend tech"
          />

          {/* Databases */}
          <EnaMultiInput
            label="Databases"
            helperText="List databases used"
            name="database"
            placeholder="Enter database"
          />

          {/* Payment Gateways */}
          <EnaMultiInput
            label="Payment Gateways"
            helperText="List supported payment gateways"
            name="paymentGateway"
            placeholder="Enter payment gateway"
          />

          {/* Testing Tools */}
          <EnaMultiInput
            label="Testing Tools"
            helperText="List testing frameworks used"
            name="testing"
            placeholder="Enter testing tool"
          />

          {/* Relevant Work Samples */}
          <EnaMultiInput
            label="Relevant Work Samples"
            helperText="Add links to previous projects"
            name="relevantWorkSamples"
            placeholder="Enter project URL"
          />

          {/* Description */}
          <div className="col-span-2">
            <EnaTextArea
              name="description"
              placeholder="Describe the service"
            />
          </div>
          <div className="col-span-2">
            <EnaFileUpload
              label="Cover Image"
              name="coverImage"
              accept="image/*"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover cursor-pointer"
        >
          Create Service
        </button>
      </EnaForm>
    </div>
  );
};

export default AddService;
