"use client";
import { EnaFileUpload, EnaForm, EnaInput } from "@/components/forms";
import { EnaMultiInput } from "@/components/forms/EnaMultiInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { addServiceSchema } from "@/schema/serviceSchema";
import { FieldValues } from "react-hook-form";

const AddService = () => {
  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="">
      <EnaForm
        schema={addServiceSchema}
        defaultValues={{}}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-5 mb-5">
          <EnaInput
            label="Service Title"
            name="title"
            placeholder="Enter title"
          />

          <EnaInput
            label="Base Price (USD)"
            name="price"
            placeholder="7000"
            type="number"
          />

          <EnaMultiInput
            label="Features"
            helperText="Add multiple features"
            name="features"
            placeholder="Enter a feature"
          />

          <EnaInput
            label="Turnaround Time"
            name="turnAroundTime"
            placeholder="e.g., 3-6 weeks"
          />

          <EnaMultiInput
            label="Frontend Technologies"
            helperText="List the frontend frameworks used"
            name="frontendTech"
            placeholder="Enter frontend tech"
          />

          <EnaMultiInput
            label="CSS Frameworks"
            helperText="List the CSS frameworks used"
            name="cssFramework"
            placeholder="Enter CSS framework"
          />

          <EnaMultiInput
            label="Component Libraries"
            helperText="List the UI component libraries"
            name="componentLibrary"
            placeholder="Enter component library"
          />

          <EnaMultiInput
            label="Animation Libraries"
            helperText="List animation libraries used"
            name="animationLibrary"
            placeholder="Enter animation library"
          />

          <EnaMultiInput
            label="File Storage Options"
            helperText="List storage services used"
            name="fileStorage"
            placeholder="Enter storage service"
          />

          <EnaMultiInput
            label="Backend Technologies"
            helperText="List the backend frameworks"
            name="backendTech"
            placeholder="Enter backend tech"
          />

          <EnaMultiInput
            label="Databases"
            helperText="List databases used"
            name="database"
            placeholder="Enter database"
          />

          <EnaMultiInput
            label="Payment Gateways"
            helperText="List supported payment gateways"
            name="paymentGateway"
            placeholder="Enter payment gateway"
          />

          <EnaMultiInput
            label="Testing Tools"
            helperText="List testing frameworks used"
            name="testing"
            placeholder="Enter testing tool"
          />

          <EnaMultiInput
            label="Relevant Work Samples"
            helperText="Add links to previous projects"
            name="relevantWorkSamples"
            placeholder="Enter project URL"
          />

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
        <button>submit</button>
      </EnaForm>
    </div>
  );
};

export default AddService;
