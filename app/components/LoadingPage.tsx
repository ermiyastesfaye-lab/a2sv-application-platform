import { RiLoader2Fill } from "react-icons/ri";
interface Props{
  message?: string
}
export default function LoadingPage({message}:Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <RiLoader2Fill className="animate-spin text-gray-500 text-4xl mb-4" />
      <p className="text-gray-600 font-medium">
        {message || "Loading, please wait..."}
      </p>
    </div>
  );
}
