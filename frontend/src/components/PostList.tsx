import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LazyLoadedImage from "./Image";
import { AppBar } from "./AppBar";
import { checkTokenExpiry } from "./CheckTokenExpiry";

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

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    checkTokenExpiry();
  }, []);
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    navigate("/signup");
  }
  const fetchPosts = async (newPage: number) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/posts?page=${newPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;

      if (newPage === 1) {
        setPosts(data.posts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      }

      setPage(newPage);
      setHasMore(newPage < data.meta.total_pages);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (isNearBottom && hasMore && !loading) {
        fetchPosts(page + 1);
      } else if (isNearBottom && !hasMore) {
        setPage(1);
        fetchPosts(1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore, page]);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);
  const renderImage = (profilePic: string | undefined) => {
    if (!profilePic) return null;
    return <LazyLoadedImage src={profilePic} alt="Profile" />;
  };

  return (
    <div className="m-5">
      <AppBar />
      <div className="container mx-auto p-4 mb-10">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            className="border-b py-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="mb-2">{post.content}</p>
            <p className="text-sm text-gray-600">
              <strong>Author:</strong> {post.author.name}
            </p>
            {renderImage(post.author.profilePic)}
          </motion.div>
        ))}
        {loading && <p className="text-center mt-4">Loading more posts...</p>}
      </div>
    </div>
  );
}

export default Posts;
