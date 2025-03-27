
import React from "react";
import PostSuggestionItem from "./PostSuggestionItem";
import { useLinkedInPosts } from "./useLinkedInPosts";

const LinkedInPostSuggestionsList: React.FC = () => {
  const { 
    postSuggestions, 
    copiedPostId, 
    handleCopyPost, 
    toggleExpand 
  } = useLinkedInPosts();
  
  return (
    <div className="space-y-6">
      {postSuggestions.map((post) => (
        <PostSuggestionItem
          key={post.id}
          post={post}
          copiedPostId={copiedPostId}
          onToggleExpand={toggleExpand}
          onCopyPost={handleCopyPost}
        />
      ))}
    </div>
  );
};

export default LinkedInPostSuggestionsList;
