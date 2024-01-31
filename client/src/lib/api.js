export const getUsers = async () => {
  try {
    const res = await fetch("/api/user/getusers?limit=5");
    const users = await res.json();

    if (!res.ok) {
      throw Error;
    }

    return users;
  } catch (error) {
    console.log("[GET_USERS_ERROR]", error);
  }
};

export const getPosts = async () => {
  try {
    const res = await fetch("/api/post/getposts?limit=5");
    const posts = await res.json();

    if (!res.ok) {
      throw Error;
    }

    return posts;
  } catch (error) {
    console.log("[GET_POSTS_ERROR]", error);
  }
};

export const getPostsById = async (id) => {
  try {
    const res = await fetch(`/api/post/getposts?userId=${id}`);
    const posts = await res.json();

    if (!res.ok) {
      throw Error;
    }

    return posts;
  } catch (error) {
    console.log("[GET_POSTS_BY_ID_ERROR]", error);
  }
};

export const getComments = async () => {
  try {
    const res = await fetch("/api/comment/getcomments?limit=5");
    const comments = await res.json();
    if (!res.ok) {
      throw Error;
    }

    return comments;
  } catch (error) {
    console.log("[GET_COMMENTS_ERROR]", error);
  }
};
