import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, TextInput } from "flowbite-react";

import { OAuth } from "../components/OAuth";
import { useSignUp } from "../lib/mutations";
import { LoadingArea } from "../components/LoadingArea";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { mutateAsync, isPending, error } = useSignUp();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await mutateAsync(formData);

    if (res) {
      navigate("/sign-in");
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-5 p-3 max-w-3xl h-[500px] mx-auto flex-col md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Codex&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="John Doe"
                id="username"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="johndoe@gmail.com"
                id="email"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="*********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <LoadingArea size="sm" className="h-auto" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error.message}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
