import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';
const Home = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const res = await fetch(`api/post/getposts`);
      const data = await res.json();
      console.log(data.posts);
      if (res.ok) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <div className="min-h-screen">
      <div className="flex flex-col px-3 p-28 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to DataDrop</h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-3">
          Here you will find a variety of articles and tutorials on topics such
          as web development, software engineering and programming languages.{' '}
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 hover:underline font-bold"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="flex flex-col max-w-6xl mx-auto p-3 gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl text-center font-semibold">Recent Posts</h2>

            <div className="flex flex-wrap gap-4">
              {posts &&
                posts.map((post) => {
                  return <PostCard key={post._id} post={post} />;
                })}
            </div>
            <Link
              to={'/search'}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
