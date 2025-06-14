import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { RootState } from "../../store/store";
import Post from "./Post";
import PostEditor from "./PostEditor";

import PostEditorSkeleton from "../Loaders/PostEditorSkeleton";

import PostSkeleton from "../Loaders/PostSkeleton";
import Login from "../Login/Login";

import Modal from "../common/Modal";
import { addPost } from "../../store/reducers/postsSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const { isLoggedIn, currentUser } = useSelector(
    (state: RootState) => state.login
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  const handlePublish = (content: string) => {
    // console.log("Publishing post:", content);
    dispatch(
      addPost({
        id: uuidv4(),
        content,
        createdAt: new Date().toISOString(),
        name: currentUser?.email || "Anonymous",
        profilePhoto: "",
      })
    );
  };

  const handleUnauthenticatedClick = () => {
    setIsModalOpen(true);
  };

  const handleFeedClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      handleUnauthenticatedClick();
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setIsModalOpen(false);
    }
  }, [isLoggedIn]);

  if (isLoading) {
    return (
      <div className="max-w-[600px] mx-auto py-6 overflow-y-auto flex flex-col gap-4">
        <PostEditorSkeleton />
        {/* Show 3 post skeletons */}
        {Array.from({ length: 3 }).map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div
        className="max-w-[600px] min-w-[200px] mx-auto py-6 overflow-y-auto flex flex-col gap-4"
        onClick={handleFeedClick}
      >
        <PostEditor onPublish={handlePublish} />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Login />
      </Modal>
    </>
  );
};

export default Feed;
