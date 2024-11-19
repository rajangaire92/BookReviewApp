import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addBook,
  deleteBook,
  getAllBook,
  TaddBookInput,
  TaddBookOutput,
  TDeleteBookInput,
  TDeleteBookOutput,
  TGetAllBooksOutput,
  TUpdateBookInput,
  TUpdateBookOutput,
  updateBook,
} from "./fetch";

export const useAddBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<TaddBookOutput, Error, TaddBookInput>({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
    },
  });
};

export const useUpdateBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<TUpdateBookOutput, Error, TUpdateBookInput>({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export const useDeleteBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<TDeleteBookOutput, Error, TDeleteBookInput>({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export const useGetAllBookQuery = () => {
  return useQuery<TGetAllBooksOutput, Error>({
    queryKey: ["book"],
    queryFn: getAllBook,
  });
};