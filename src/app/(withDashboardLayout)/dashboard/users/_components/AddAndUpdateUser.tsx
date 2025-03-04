"use client";
import {
  EnaFileUpload,
  EnaForm,
  EnaInput,
  EnaSelect,
} from "@/components/forms";

import { useNotification } from "@/hooks/useNotification";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from "@/redux/api/adminApi/serviceApi/serviceApi";
import { useCreateUserMutation } from "@/redux/api/adminApi/userApi/userApi";
import { updateUserSchema, userSchema } from "@/schema/userSchema";
import { TError, TService } from "@/types";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";

interface AddAndEditServiceProps {
  defaultValues?: TService;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAndUpdate = ({ defaultValues, setIsOpen }: AddAndEditServiceProps) => {
  const isEditMode = !!defaultValues; // Check if we are editing
  const [
    createUser,
    { isLoading: isCreating, isError, isSuccess, data, error },
  ] = useCreateUserMutation();

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
    console.log(formData);
    const bodyData = {
      ...formData,
    };
    const apiData = new FormData();
    if (formData.profilePhoto && formData.profilePhoto != undefined) {
      apiData.append("file", formData.profilePhoto);
    }
    apiData.append("data", JSON.stringify(bodyData));
    if (isEditMode) {
      console.log(bodyData);
      // editService({ id: defaultValues?._id, data: apiData });
    } else {
      createUser(apiData);
    }
  };

  useEffect(() => {
    if (isSuccess || uIsSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, uIsSuccess, setIsOpen]);

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
        schema={isEditMode ? updateUserSchema : userSchema}
        defaultValues={defaultValues || {}}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-5 mb-5">
          {/* Name */}
          <EnaInput
            label="Name"
            name="adminData.name"
            placeholder="Enter name"
          />

          {/* Password */}
          <EnaInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter user password"
          />

          {/* Email */}
          <EnaInput
            label="Email"
            name="adminData.email"
            type="email"
            placeholder="Enter email"
          />

          {/* Phone Number */}
          <EnaInput
            label="Phone"
            name="adminData.phoneNumber"
            placeholder="Enter phone number"
          />

          {/* Gender */}
          <EnaSelect
            label="Gender"
            name="adminData.gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            placeholder="Select Gender"
          />

          {/* Role Selection */}
          <EnaSelect
            onChange={(value) => {
              console.log(value);
            }}
            label="Role"
            name="adminData.role"
            options={[
              { value: "admin", label: "Admin" },
              { value: "manager", label: "Manager" },
            ]}
            placeholder="Select Role"
          />

          {/* City */}
          <EnaInput
            label="City"
            name="adminData.city"
            placeholder="Enter city name"
          />

          {/* Address */}
          <EnaInput
            label="Address"
            name="adminData.address"
            placeholder="Enter address"
          />

          {/* Profile Photo */}
          <div className="col-span-2">
            <EnaFileUpload
              label="Profile Photo"
              name="profilePhoto"
              accept="image/*"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {isEditMode ? "Update user" : "Create user"}
        </button>
      </EnaForm>
    </div>
  );
};

export default AddAndUpdate;
