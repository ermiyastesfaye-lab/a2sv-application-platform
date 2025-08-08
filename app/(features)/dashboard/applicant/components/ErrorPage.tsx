import { BiSolidErrorAlt } from "react-icons/bi";
interface ErrorPageProps {
  message?: string;
}

export default function ErrorPage({ message }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-red-500 text-4xl mb-4">
        <BiSolidErrorAlt />
      </div>
      <h2 className="text-xl font-semibold mb-2">
        Oops! Something went wrong.
      </h2>
      <p className="text-gray-600 max-w-md">
        {message ||
          "We encountered an unexpected error. Please try again later."}
      </p>
    </div>
  );
}
