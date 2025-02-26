"use client";
import { EnaForm, EnaInput, EnaSelect } from "@/components/forms";
import { FieldValues, } from "react-hook-form";

const Dashboard = () => {

  const handleLogin = async (data: FieldValues) => {
    console.log(data);
  }

  return <div>
    <EnaForm onSubmit={handleLogin} defaultValues={{ email: "" }}>

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



      <button type="submit">
        Submit
      </button>
    </EnaForm>
  </div>;
};
export default Dashboard;
