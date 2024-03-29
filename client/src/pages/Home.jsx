import { Link } from "react-router-dom";
import { CallToAction } from "../components/CallToAction";
import { useGetPosts } from "../lib/queries";
import { HomePosts } from "../components/HomePosts";

const Home = () => {
  const { data, isLoading } = useGetPosts();

  return (
    <div>
      <div className="flex flex-col gap-6 px-3 p-28 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you&apos;ll find a variety of articles and tutorials on topics
          such as web development, software engineering, and programming
          languages.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <HomePosts posts={data?.posts} isLoading={isLoading} />
    </div>
  );
};

export default Home;
