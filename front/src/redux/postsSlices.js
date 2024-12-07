import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_URL = "http://localhost:3001/api/v1/posts"; // Replace with your API endpoint

// Fetch all posts from the API
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add a new post to the API
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async ({ title, content, userId }) => {
    const newPost = {
      title,
      content,
      userId,
      date: new Date().toISOString(),
      reactions: {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    };

    const response = await axios.post(API_URL, newPost);
    return response.data;
  }
);

// Update reactions for a post in the API
export const updateReaction = createAsyncThunk(
  "posts/updateReaction",
  async ({ postId, reaction }, { getState }) => {
    const post = getState().posts.posts.find((p) => p.id === postId);

    if (!post) throw new Error("Post not found");

    // Increment the reaction count locally
    const updatedReactions = {
      ...post.reactions,
      [reaction]: post.reactions[reaction] + 1,
    };

    // Send the updated reactions to the server
    const response = await axios.patch(`${API_URL}/${postId}`, {
      reactions: updatedReactions,
    });

    return { postId, updatedReactions };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle adding a new post
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      // Handle updating reactions
      .addCase(updateReaction.fulfilled, (state, action) => {
        const { postId, updatedReactions } = action.payload;
        const existingPost = state.posts.find((post) => post.id === postId);
        if (existingPost) {
          existingPost.reactions = updatedReactions; // Update reactions in the state
        }
      });
  },
});

// Selector to get all posts
export const selectAllPosts = (state) => state.posts.posts;

// Export the reducer
export default postsSlice.reducer;