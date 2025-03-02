import { EnaFileUpload, EnaForm, EnaInput } from "@/components/forms";
import EnaMultiInput from "@/components/forms/EnaMultiInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { FieldValues } from "react-hook-form";

const AddService = () => {
  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <EnaForm defaultValues={{}} onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5 mb-5">
          <EnaInput name="title" placeholder="Service Title" />
          <div className="col-span-2">
            <EnaFileUpload
              name="file"
              label="upload image"
              accept="image/*"
            ></EnaFileUpload>
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
