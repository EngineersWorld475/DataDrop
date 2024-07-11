import React, { useEffect, useState } from 'react';
import moment from 'moment';
const Comment = ({ comment }) => {
  const [user, setUser] = useState({});
  console.log('user', user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="flex p-4 border-b flex-row dark:border-gray-600 text-sm gap-2">
      <div className="flex-shrink-0">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user && user.profilePicture}
          alt={user && user.username}
        />
      </div>
      <div className="items-center mb-1">
        <div className="flex-1">
          <span className="font-bold mr-1 text-xm truncate">
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className="ml-1 text-xs text-gray-600">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-400 pt-1">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
