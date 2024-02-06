import { Spinner } from "flowbite-react";

// eslint-disable-next-line react/prop-types
export const LoadingArea = ({ size = "md" }) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Spinner size={size} />
    </div>
  );
};
