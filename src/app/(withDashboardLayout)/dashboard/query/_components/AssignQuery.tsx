"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNotification } from "@/hooks/useNotification";
import { useAssignQueryMutation } from "@/redux/api/adminApi/queryApi/queryApi";
import { useGetAllUserQuery } from "@/redux/api/adminApi/userApi/userApi";
import type { TError, TQuery } from "@/types";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AssignQuery = ({
  item,
  setIsQueryModal,
}: {
  item: TQuery;
  setIsQueryModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data, isLoading: isLoadingUsers } = useGetAllUserQuery([
    { name: "limit", value: 100 },
    { name: "page", value: 1 },
  ]);

  const [assignQuery, { isError, isLoading, isSuccess, data: aData, error }] =
    useAssignQueryMutation();
  const [assignEmail, setAssignEmail] = useState("");
  const [validationError, setValidationError] = useState("");

  const selectedOptions =
    data?.data?.map((item) => {
      return {
        value: item?.email,
        label: item?.name,
      };
    }) || [];

  const handleAssignUser = () => {
    setValidationError("");

    if (!data?.data?.length) {
      setValidationError("No users available to assign this query to");
      return;
    }

    // Check if an email has been selected
    if (!assignEmail) {
      setValidationError("Please select a user to assign this query to");
      return;
    }

    // Proceed with the assignment
    assignQuery({ queryId: item._id, data: { email: assignEmail } });
  };

  const handleSelectChange = (value: string) => {
    setAssignEmail(value);
    if (value) {
      setValidationError("");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsQueryModal(false);
    }
  }, [isSuccess, setIsQueryModal]);

  useNotification({
    isLoading,
    isError,
    isSuccess,
    data: aData,
    error: error as TError,
  });

  return (
    <Card className="w-full mx-auto">
      <CardContent className="space-y-4">
        {isLoadingUsers ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2">Loading users...</span>
          </div>
        ) : data?.data?.length === 0 ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No users available to assign this query to.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {validationError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full border border-gray-600">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {selectedOptions?.map((user) => (
                  <SelectItem key={user?.value} value={user?.value}>
                    {user?.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setIsQueryModal(false)}>
          Cancel
        </Button>
        <Button
          onClick={handleAssignUser}
          disabled={isLoading || isLoadingUsers || !data?.data?.length}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Assigning...
            </>
          ) : (
            "Assign"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssignQuery;
