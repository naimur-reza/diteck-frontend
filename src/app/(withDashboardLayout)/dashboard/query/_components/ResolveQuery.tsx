import ErrorMessage from "@/components/dashboard/ErrorMessage/ErrorMessage";
import { useNotification } from "@/hooks/useNotification";
import { useResolveQueryMutation } from "@/redux/api/adminApi/queryApi/queryApi";
import { TError, TQuery } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

const ResolveQuery = ({
  item,
  setIsResolveModal,
}: {
  item: TQuery;
  setIsResolveModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [resolveQuery, { isLoading, isError, isSuccess, error, data }] =
    useResolveQueryMutation();
  const [resolutionNotes, setResolutionNotes] = useState("");

  const handleResolveQuery = async () => {
    if (resolutionNotes.trim()) {
      await resolveQuery({ data: { resolutionNotes }, queryId: item._id });
    } else {
      toast.error("Please enter resolution notes");
    }
  };

  useNotification({
    isLoading,
    isSuccess,
    data,
    error: error as TError,
    isError,
  });
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Enter resolution notes..."
        value={resolutionNotes}
        onChange={(e) => setResolutionNotes(e.target.value)}
      />
      <div className="flex gap-2 mt-4">
        <button
          className="px-4 py-2 bg-primary cursor-pointer text-white rounded disabled:bg-gray-400"
          onClick={handleResolveQuery}
          disabled={isLoading}
        >
          {isLoading ? "Resolving..." : "Resolve"}
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
          onClick={() => setIsResolveModal(false)}
        >
          Cancel
        </button>
      </div>
      <ErrorMessage error={error as TError} />
    </div>
  );
};

export default ResolveQuery;
