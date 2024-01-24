import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner, Button, Alert } from "flowbite-react";
import { CallToAction } from "../components/CallToAction";
import { CommentSection } from "../components/CommentSection";
import { RecentArticles } from "../components/RecentArticles";

const FETCH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);
  const { postSlug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setStatus(FETCH_STATUS.LOADING);

        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (res.ok) {
          setPost(data.posts[0]);
          setStatus(FETCH_STATUS.SUCCESS);
        }
      } catch (error) {
        setStatus(FETCH_STATUS.ERROR);
        setError(error.message);
      }
    };

    if (postSlug) {
      fetchPost();
    }
  }, [postSlug]);

  const isLoading = status === FETCH_STATUS.LOADING;
  const isError = status === FETCH_STATUS.ERROR;
  const isSuccess = status === FETCH_STATUS.SUCCESS;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert color="failure">{error}</Alert>
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      {isSuccess && (
        <>
          <h1 className="text-3xl text-center p-3 mt-10 font-serif max-w-2xl mx-auto lg:text-4xl">
            {post.title}
          </h1>
          <Link
            to={`/search?category=${post.category}`}
            className="self-center mt-5"
          >
            <Button color="gray" pill size="xs">
              {post.category}
            </Button>
          </Link>
          <img
            src={post.image}
            alt={post.title}
            className="mt-10 p-3 max-h-[600px] w-full object-cover"
          />
          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs ">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">
              {(post.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>
          <div
            className="p-3 max-w-2xl mx-auto w-full post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <div className="max-w-4xl mx-auto w-full">
            <CallToAction />
          </div>
          <CommentSection postId={post._id} />

          <div className="flex flex-col items-center justify-center mb-5">
            <h1 className="text-xl mt-5">Recent articles</h1>
            <RecentArticles />
          </div>
        </>
      )}
    </main>
  );
};

export default PostPage;
