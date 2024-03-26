import { Button } from "flowbite-react";

export const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about me?</h2>
        <p className="text-gray-500 my-2">Let&apos;s checkout my projects</p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://github.com/AliARIOGLU?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Github
          </a>
        </Button>
      </div>
      <div className="flex-1 p-7">
        <img
          className="rounded-md"
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
        />
      </div>
    </div>
  );
};
