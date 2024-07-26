import { Button, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardComp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const getAllUsers = async () => {
    try {
      const res = await fetch(`/api/user/getusers?limit=5`);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComments = async () => {
    try {
      const res = await fetch(`/api/comment/getComments?limit=5`);
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments);
        setTotalComments(data.totalComments);
        setLastMonthComments(data.lastMonthComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPosts = async () => {
    const res = await fetch(`/api/post/getPosts?limit=5`);
    const data = await res.json();
    if (res.ok) {
      setPosts(data.posts);
      setTotalPosts(data.totalPosts);
      setLastMonthPosts(data.lastMonthPosts);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      getAllUsers();
      getAllComments();
      getAllPosts();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 font-semibold text-sm">
            <h1 className="text-center p-2">Recent users</h1>
            <Button gradientDuoTone="purpleToPink" outline>
              <Link to={'/dashboard?tab=users'}>See al</Link>
            </Button>
          </div>
          <Table>
            <Table.Head className="text-center">
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => {
                return (
                  <Table.Body key={user._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          className="w-8 h-8 rounded-full bg-gray-500"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <h1 className="text-gray-800 dark:text-white">
                          {user.username}
                        </h1>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 font-semibold text-sm">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Button gradientDuoTone="purpleToPink" outline>
              <Link to={'/dashboard?tab=posts'}>See all</Link>
            </Button>
          </div>
          <Table>
            <Table.Head className="text-center">
              <Table.HeadCell>Post</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => {
                return (
                  <Table.Body key={post._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
                      <Table.Cell>
                        <img
                          src={post.image}
                          className="w-20 h-12 bg-gray-500"
                        />
                      </Table.Cell>
                      <Table.Cell className="text-gray-800 dark:text-white">
                        {post.title}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 font-semibold text-sm">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button gradientDuoTone="purpleToPink" outline>
              <Link to={'/dashboard?tab=comments'}>See al</Link>
            </Button>
          </div>
          <Table>
            <Table.Head className="text-center">
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => {
                return (
                  <Table.Body key={comment._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
                      <Table.Cell className="w-96">
                        <p className="line-clamp-2">{comment.content}</p>
                      </Table.Cell>
                      <Table.Cell>{comment.likes.length}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
