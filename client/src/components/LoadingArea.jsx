import { Spinner } from "flowbite-react";

// eslint-disable-next-line react/prop-types
export const LoadingArea = ({ size = "md", ...props }) => {
  return (
    <div
      className="min-h-screen w-full flex justify-center items-center"
      {...props}
    >
      <Spinner size={size} />
    </div>
  );
};
