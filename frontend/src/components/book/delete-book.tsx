import { useState } from "react";
import { useDeleteBookMutation } from "../../api/book/query";
import { errorToast, successToast } from "../toaster";

export const DeleteBook = ({ bookId }: { bookId: string }) => {
  const [isDelete, setIsDelete] = useState(false);
  const deleteBookMutation = useDeleteBookMutation();

  const checkDelete = async () => {
    if (isDelete) {
      return <div>deleting...</div>;
    }

    setIsDelete(true);
    try {
      await deleteBookMutation.mutateAsync(
        {
          bookId: bookId,
        },
        {
          onSuccess() {
            successToast("Book deleted successfully");
            location.reload();
          },
          onError(error) {
            console.error("error", error);
            errorToast(error.message);
          },
        }
      );
    } catch (error) {
      console.error("error", error);
      errorToast("Something went wrong");
    } finally {
      setIsDelete(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => checkDelete()}
        className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          isDelete ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isDelete}
      >
        {isDelete ? "Deleting..." : "Delete"}
      </button>
    </>
  );
};