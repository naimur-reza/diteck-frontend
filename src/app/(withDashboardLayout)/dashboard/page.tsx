"use client";
import { EnaForm, EnaInput, EnaSelect } from "@/components/forms";
import { FieldValues, useForm, } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import EnaCheckbox from "@/components/forms/EnaCheckbox";

const Dashboard = () => {
  const { control } = useForm({});

  const handleLogin = async (data: FieldValues) => {
    console.log(data);
  }

  return <div>
    <EnaForm onSubmit={handleLogin} defaultValues={{ email: "", terms: false }}>

      <EnaInput
        name="email"
        type="email"
        placeholder="Enter your email"
        className="mb-4"
      />


      <EnaSelect

        name="theme"
        options={[
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" },
          { value: "system", label: "System" },
        ]}
        placeholder="Select Theme"
        className="mb-4"
      />

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>


      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
      </RadioGroup>


      <EnaCheckbox name="terms" label="Accept terms and conditions" control={control} />

      <div>
        <button type="submit">
          Submit
        </button>
      </div>
    </EnaForm>
  </div>;
};
export default Dashboard;
