
import { useGetAllBookQuery } from "../../api/book/query";
import { ReviewSubmit } from "../review/create-review";



export const ListBookHome = () => {
  const { isLoading, data, isError, error } = useGetAllBookQuery();

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }
  if (isError) {
    return <div className="text-center text-red-500">{error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEEA] to-[#EBE3D5] p-10">
      <div className="text-center text-4xl font-bold mb-8 text-gray-800">
         Look through Books...
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {data?.data.map((book) => (
          <div
            className="group border border-gray-200 bg-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform ease-out duration-300 rounded-lg overflow-hidden"
            key={book._id}
          >
            {/* Card Header with Title and Author */}
            <div className="p-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
              <h2 className="text-2xl font-bold mb-2 group-hover:underline">
                {book.title}
              </h2>
              <p className="text-lg">{book.author}</p>
            </div>

            {/* Genre and Description */}
            <div className="p-5">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-200 text-sm rounded-full text-gray-700">
                  {book.genre}
                </span>
              </div>
              <p className="text-base text-gray-700 line-clamp-3 mb-4">
                {book.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center bg-gray-100 p-4">
          
              <ReviewSubmit book={book} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
