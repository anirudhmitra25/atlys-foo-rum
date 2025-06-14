import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../../types.ts/post";
import profile1 from "../../assets/profile_1.jpg";
import profile2 from "../../assets/profile_2.jpg";
import profile3 from "../../assets/profile_3.jpg";

// Initial state
const initialState = {
  posts: [
    {
      id: "1",
      name: "John Doe",
      content:
        "Just finished reading a great book on React development. The concepts around hooks and state management are fascinating!",
      createdAt: "2024-01-15T10:30:00.000Z",
      profilePhoto: profile1,
      isLiked: true,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      content:
        "Beautiful sunset today! Sometimes you just need to take a moment to appreciate the simple things in life. 🌅",
      createdAt: "2024-01-14T18:45:00.000Z",
      profilePhoto: profile2,
      isLiked: false,
    },
    {
      id: "3",
      name: "Mike Chen",
      content:
        "Working on a new TypeScript project with Redux Toolkit. The developer experience is so much better than the old Redux setup!",
      createdAt: "2024-01-13T14:20:00.000Z",
      profilePhoto: profile3,
      isLiked: false,
    },
  ] as Post[],
};

// Create slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    likePost: (
      state,
      action: PayloadAction<{
        id: string;
        isLiked: boolean;
      }>
    ) => {
      const { id, isLiked } = action.payload;

      let post = state.posts.find((post: Post) => post.id === id);
      if (post) post.isLiked = isLiked;
    },
  },
});

// Export actions
export const { addPost, likePost } = postsSlice.actions;

// Export reducer
export default postsSlice.reducer;
