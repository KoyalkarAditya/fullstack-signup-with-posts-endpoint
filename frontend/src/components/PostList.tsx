import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author: User;
}
interface User {
  name: string;
  email: string;
  profilePic: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/v1/posts`, {
        params: {
          page: currentPage,
          limit: limit,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      // Append fetched posts to the existing posts array
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);

      // Update current page and hasMore flag
      setCurrentPage((prevPage) => prevPage + 1);
      setHasMore(currentPage < response.data.meta.total_pages);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    }
  };

  // Fetch initial posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more posts to load</p>}
      >
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            {/* Display post title */}
            <h3 className="font-semibold text-lg">{post.title}</h3>

            {/* Display post content */}
            <p className="text-sm">{post.content}</p>

            {/* Display user information */}
            <div className="user-info mt-2">
              {/* Display user profile picture (if available) */}
              {post.author.profilePic && (
                <img
                  src={`data:image/jpeg;base64,${Buffer.from(
                    post.author.profilePic
                  ).toString("base64")}`}
                  alt={post.author.name}
                  className="user-profile-pic rounded-full"
                  width={40}
                  height={40}
                />
              )}

              {/* Display user name */}
              <span className="user-name ml-2">{post.author.name}</span>
            </div>

            <hr className="my-2" />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default PostList;
