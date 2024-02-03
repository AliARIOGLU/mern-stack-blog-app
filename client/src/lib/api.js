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

export const getPostsById = async (id, limit) => {
  try {
    const res = await fetch(`/api/post/getposts?userId=${id}&limit=${limit}`);
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

export const getCommentsById = async (id) => {
  try {
    const res = await fetch(`/api/comment/getpostcomments/${id}`);
    const comments = await res.json();

    if (!res.ok) {
      throw Error;
    }

    return comments;
  } catch (error) {
    console.log("[GET_COMMENTS_BY_ID_ERROR]", error);
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

export const signin = async (formData) => {
  try {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    console.log("[SIGN_IN_ERROR]", error);
    throw new Error(error);
  }
};

export const signup = async (formData) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    console.log("[SIGN_UP_ERROR]", error);
    throw new Error(error);
  }
};

export const createPost = async (postData) => {
  try {
    const res = await fetch("/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    console.log("[CREATE_POST_ERROR]", error);
    throw new Error(error);
  }
};

export const createComment = async (data) => {
  try {
    const res = await fetch(`/api/comment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: data.content,
        userId: data.userId,
        postId: data.postId,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    console.log("[CREATE_COMMENT_ERROR]", error);
    throw new Error(error);
  }
};

export const editComment = async (comment) => {
  try {
    const res = await fetch(`/api/comment/editComment/${comment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comment.content }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    console.log("[EDIT_COMMENT_ERROR]", error);
    throw new Error(error);
  }
};

export const deleteComment = async (id) => {
  try {
    const res = await fetch(`/api/comment/deleteComment/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    console.log("[DELETE_COMMENT_ERROR]", error);
    throw new Error(error);
  }
};

export const likeComment = async (id) => {
  try {
    const res = await fetch(`/api/comment/likeComment/${id}`, {
      method: "PUT",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    console.log("[COMMENT_LIKE_ERROR]", error);
    throw new Error(error);
  }
};

export const deletePost = async (postId, userId) => {
  try {
    const res = await fetch(`/api/post/deletepost/${postId}/${userId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    console.log("[DELETE_POST_ERROR]", error);
    throw new Error(error);
  }
};
