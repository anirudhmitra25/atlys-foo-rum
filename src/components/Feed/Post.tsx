import React, { useState } from "react";
import { Card } from "../common";
import Button from "../common/Button";
import type { Post as PostType } from "../../types.ts/post";
import profileUnknown from "../../assets/profile_unknown.png";
import commentsIcon from "../../assets/comments.svg";
import sendIcon from "../../assets/send.svg";
import Like from "../SVG/like";
import { formatTimeAgo } from "../../helper/dateUtils";
import { likePost } from "../../store/reducers/postsSlice";
import { useDispatch } from "react-redux";

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(
      likePost({
        id: post.id,
        isLiked: !post.isLiked,
      })
    );
    setIsAnimating(true);

    if (!post.isLiked) {
      setShowHearts(true);
      // Hide hearts after animation
      setTimeout(() => setShowHearts(false), 1000);
    }

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNotImplemented = (feature: string) => {
    alert(`${feature} function not implemented`);
  };

  return (
    <Card className="p-2 pb-3 mb-6 bg-[#00000008] !shadow-none cursor-pointer">
      <div className="flex gap-4 bg-white p-3 shadow-[0px_4px_9px_0px_#0000000D] rounded-2xl border border-[#0000001A] transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-[0px_8px_25px_0px_#00000015]">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <img
            src={post.profilePhoto || profileUnknown}
            alt={post.name}
            className="w-11 h-11 rounded-lg object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col items-start gap-1 mb-3">
            <h3 className="text-gray-900 font-semibold">{post.name}</h3>
            <span className="text-gray-400 text-xs">
              {formatTimeAgo(new Date(post.createdAt))}
            </span>
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <div className="flex items-start gap-3">
              <p className="text-gray-700 text-base leading-6">
                {post.content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 mx-3 mt-3 relative">
        <div className="relative">
          <Button
            type="TERTIARY"
            onClick={handleLike}
            className={`flex items-center gap-2 !p-2 !text-gray-500 hover:!text-gray-700 hover:!bg-white hover:shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 rounded-lg
            ${
              post.isLiked
                ? "!text-red-500 !bg-red-50 shadow-lg shadow-red-200/50"
                : "!text-gray-500 hover:!text-red-400 hover:!bg-red-50"
            }
              ${isAnimating ? "animate-bounce scale-125" : "hover:scale-110"}
            `}
          >
            <div
              className={`transition-all duration-200 ${
                isAnimating ? "animate-pulse" : ""
              }`}
            >
              <Like color={post.isLiked ? "#EF4444" : "#2F384C"} />
            </div>
          </Button>

          {/* Floating Hearts Animation */}
          {showHearts && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 animate-ping">
                <span className="text-red-500 text-sm animate-bounce">❤️</span>
              </div>
              <div className="absolute -top-4 left-1/4 transform -translate-x-1/2 animate-pulse delay-100">
                <span className="text-pink-500 text-xs animate-bounce">💖</span>
              </div>
              <div className="absolute -top-3 right-1/4 transform translate-x-1/2 animate-pulse delay-200">
                <span className="text-red-400 text-xs animate-bounce">💕</span>
              </div>
            </div>
          )}

          {/* Ripple Effect */}
          {isAnimating && (
            <div className="absolute inset-0 rounded-lg">
              <div className="absolute inset-0 bg-red-400 rounded-lg opacity-20 animate-ping"></div>
              <div className="absolute inset-0 bg-red-300 rounded-lg opacity-10 animate-ping delay-75"></div>
            </div>
          )}
        </div>

        <Button
          type="TERTIARY"
          onClick={() => handleNotImplemented("Comment")}
          className="flex items-center gap-2 !p-2 !text-gray-500 hover:!text-gray-700 hover:!bg-white hover:shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 rounded-lg"
        >
          <img src={commentsIcon} alt="Comment" className="w-5 h-5" />
        </Button>
        <Button
          type="TERTIARY"
          onClick={() => handleNotImplemented("Send")}
          className="flex items-center gap-2 !p-2 !text-gray-500 hover:!text-gray-700 hover:!bg-white hover:shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 rounded-lg"
        >
          <img src={sendIcon} alt="Send" className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
};

export default Post;
