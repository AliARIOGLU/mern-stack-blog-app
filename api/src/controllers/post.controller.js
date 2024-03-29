import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";
import { getMonthsData } from "../utils/getMonthsDate.js";

export const create = async (req, res, next) => {
  const { title, content } = req.body;

  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post!"));
  }

  if (!title || !content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    let totalPosts;

    if (req.query.userId) {
      totalPosts = await Post.countDocuments({
        userId: req.query.userId,
      });
    } else {
      totalPosts = await Post.countDocuments({});
    }

    const { startOfThisMonth, startsOfLastMonth } = getMonthsData();

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: startsOfLastMonth, $lt: startOfThisMonth },
    });

    const thisMonthPosts = await Post.countDocuments({
      createdAt: { $gte: startOfThisMonth },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
      thisMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { userId, postId } = req.params;

  if (!req.user.isAdmin || req.user.id !== userId) {
    return next(errorHandler(403, "You are not allowed to delete this post!"));
  }

  try {
    await Post.findByIdAndDelete(postId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const { userId, postId } = req.params;
  const { title, content, category, image } = req.body;

  if (!req.user.isAdmin || req.user.id !== userId) {
    return next(errorHandler(403, "You are not allowed to delete this post!"));
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title,
          content,
          category,
          image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
