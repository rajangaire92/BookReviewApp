import { env } from "../../config";

export type TBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;

};

export type TaddBookInput = {
  title: string;
  author: string;
  genre: string;
  description: string;

};

export type TaddBookOutput = {
  isSuccess: boolean;
  message: string;
  data: TBook;
};

export async function addBook(input: TaddBookInput): Promise<TaddBookOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/books/addBook`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: input.title,
      author: input.author,
      genre: input.genre,
      description: input.description,
   
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export type TUpdateBookInput = {
  bookId: string;
  title: string;
  author: string;
  genre: string;
  description: string;
};

export type TUpdateBookOutput = {
  message: string;
  isSuccess: boolean;
  data: TBook;
};

export async function updateBook(
  input: TUpdateBookInput
): Promise<TUpdateBookOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/books/${input.bookId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export type TGetAllBooksOutput = {
  message: string;
  isSuccess: boolean;
  data: TBook[];
};

export async function getAllBook(): Promise<TGetAllBooksOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/books/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export type TDeleteBookInput = {
  bookId: string;
};

export type TDeleteBookOutput = {
  message: string;
  isSuccess: boolean;
};

export async function deleteBook(
  input: TDeleteBookInput
): Promise<TDeleteBookOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/books/${input.bookId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}