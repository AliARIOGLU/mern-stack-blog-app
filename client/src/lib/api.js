// Query APIs

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

export const getUserById = async (id) => {
  try {
    const res = await fetch(`/api/user/${id}`);
    const user = await res.json();
    if (!res.ok) {
      throw Error;
    }

    return user;
  } catch (error) {
    console.log("[GET_USER_BY_ID_ERROR]", error);
  }
};

export const getPosts = async (query) => {
  try {
    const res = await fetch(`/api/post/getposts?${query ? query : ""}`);
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

// Mutation APIs

export const signout = async () => {
  try {
    const res = await fetch("/api/user/signout", {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) {
      throw Error;
    }

    return data;
  } catch (error) {
    console.log("[SIGN_OUT_ERROR]", error);
  }
};
