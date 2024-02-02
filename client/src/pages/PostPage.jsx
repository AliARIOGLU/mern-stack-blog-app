import { useParams } from "react-router-dom";
import { Spinner, Alert } from "flowbite-react";
import { CallToAction } from "../components/CallToAction";
import { CommentSection } from "../components/CommentSection";
import { RecentArticles } from "../components/RecentArticles";

import { useGetPosts } from "../lib/queries";
import { SinglePost } from "../components/SinglePost";

const PostPage = () => {
  const { postSlug } = useParams();

  const { data, isLoading, isSuccess, isError, error } = useGetPosts(
    `slug=${postSlug}`
  );

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
        <Alert color="failure">{error.message}</Alert>
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      {isSuccess && (
        <>
          <SinglePost post={data.posts[0]} />
          <div className="max-w-4xl mx-auto w-full">
            <CallToAction />
          </div>
          <CommentSection postId={data.posts[0]._id} />
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
