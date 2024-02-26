import { Button } from "flowbite-react";
import { BiError } from "react-icons/bi";
import { setSignoutSuccess } from "../redux/user/userActions";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-500">
      <div className="flex flex-col items-center gap-16 bg-slate-900 px-8 py-10 rounded-md">
        <BiError size={40} className="text-white" />
        <div className="flex flex-col text-center text-md lg:text-xl">
          <h1 className="text-2xl font-bold text-white">Error</h1>
          <p className="font-medium text-gray-400 text-balance">
            Something went wrong, but don&apos;t fret — it&apos;s not your
            fault.
          </p>
          <p className="text-gray-400 font-medium">Let&apos;s try again.</p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Button
            onClick={() => window.location.reload()}
            className="rounded-full bg-sky-500"
          >
            Refresh
          </Button>
          <Button
            onClick={() => setSignoutSuccess()}
            className="rounded-full bg-transparent border border-sky-500 text-white"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
