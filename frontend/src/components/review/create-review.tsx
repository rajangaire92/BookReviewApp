import { Fragment, useState } from "react";
import { z } from "zod";
import { useAddReviewMutation } from "../../api/review/query";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorToast, successToast } from "../toaster";
import { TBook } from "../../api/book/fetch";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";


const submitReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  reviewText: z.string(),
});

export const ReviewSubmit = ({ book }: { book: TBook }) => {
  const [isOpen, setIsOpen] = useState(false);

  const addReviewMutation = useAddReviewMutation();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      rating: 0,
      reviewText: "",
    },
    resolver: zodResolver(submitReviewSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof submitReviewSchema>> = (
    data
  ) => {
    try {
      addReviewMutation.mutateAsync(
        {
          bookId: book._id,
          rating: data.rating,
          reviewText: data.reviewText,
        },
        {
          onSuccess() {
            successToast("Review submitted successfully");
            reset();
            setIsOpen(false);
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
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
      >
        Review Book
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                  >
                    Review Book
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-gray-800"
                    >
                      X
                    </button>
                  </DialogTitle>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className="space-y-4">
                      {/* <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="p-1"
                            onClick={() => {
                              setRating(star);
                              setValue("rating", star);
                            }}
                          >
                            {star <= rating ? (
                              <StarIconSolid className="h-6 w-6 text-yellow-400" />
                            ) : (
                              <StarIconOutline className="h-6 w-6 text-gray-300" />
                            )}
                          </button>
                        ))}
                      </div>
                      {errors.rating && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.rating.message}
                        </p>
                      )} */}

                      <textarea
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Write your review here..."
                        {...register("reviewText")}
                      />
                      {errors.reviewText && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.reviewText.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit Book
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};