import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex m-14 items-center flex-col gap-2">
      <h2 className="text-sm text-center md:text-2xl text-sky-300">
        Hmm...this page doesn&apos;t exist. Try searching for something else.
      </h2>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </div>
  );
};

export default NotFound;
