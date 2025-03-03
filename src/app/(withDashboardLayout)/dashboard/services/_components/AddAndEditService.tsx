"use client";
import { EnaFileUpload, EnaForm, EnaInput } from "@/components/forms";
import { EnaMultiInput } from "@/components/forms/EnaMultiInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { useNotification } from "@/hooks/useNotification";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from "@/redux/api/adminApi/serviceApi/serviceApi";
import { addServiceSchema, editServiceSchema } from "@/schema/serviceSchema";
import { TError, TService } from "@/types";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";

interface AddAndEditServiceProps {
  defaultValues?: TService;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAndEditService = ({
  defaultValues,
  setIsOpen,
}: AddAndEditServiceProps) => {
  const isEditMode = !!defaultValues; // Check if we are editing
  const [
    createService,
    { isLoading: isCreating, isError, isSuccess, data, error },
  ] = useCreateServiceMutation();

  const [
    editService,
    {
      isLoading: uIsLoading,
      isError: uIsError,
      data: uData,
      error: uError,
      isSuccess: uIsSuccess,
    },
  ] = useUpdateServiceMutation();

  const handleSubmit = (formData: FieldValues) => {
    const bodyData = {
      ...formData,
      price: {
        basePrice: Number(formData.price.basePrice),
        customPricingAvailable: true,
        currency: formData.price.currency,
      },
    };

    const apiData = new FormData();
    if (formData.coverImage) {
      apiData.append("file", formData.coverImage);
    }
    apiData.append("data", JSON.stringify(bodyData));

    if (isEditMode) {
      console.log(bodyData);
      editService({ id: defaultValues?._id, body: apiData });
    } else {
      createService(apiData);
    }
  };

  useEffect(() => {
    if (isSuccess || uIsSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, uIsSuccess]);

  useNotification({
    isLoading: isCreating || uIsLoading,
    isError: isError || uIsError,
    isSuccess: isSuccess || uIsSuccess,
    data: data || uData,
    error: (error as TError) || (uError as TError),
  });

  return (
    <div>
      <EnaForm
        schema={isEditMode ? editServiceSchema : addServiceSchema}
        defaultValues={defaultValues || {}}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-5 mb-5">
          <EnaInput
            label="Service Title"
            name="title"
            placeholder="Enter title"
          />
          <EnaInput
            label="Service Category"
            name="serviceCategory"
            placeholder="Enter service category"
          />

          <EnaInput
            label="Base Price (USD)"
            name="price.basePrice"
            placeholder="7000"
            type="number"
          />
          <EnaInput label="Current" name="price.currency" placeholder="USD" />

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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {isEditMode ? "Update Service" : "Create Service"}
        </button>
      </EnaForm>
    </div>
  );
};

export default AddAndEditService;
