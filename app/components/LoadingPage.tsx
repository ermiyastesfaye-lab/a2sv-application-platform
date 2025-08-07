import { RiLoader2Fill } from "react-icons/ri";
export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <RiLoader2Fill className="animate-spin text-gray-500 text-4xl mb-4" />
      <p className="text-gray-600 text-lg font-medium">
        Loading, please wait...
      </p>
    </div>
  );
}
