import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

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
        <div className="flex items-center pt-2 text-xs max-w-fit gap-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              'text-green-500'
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                ' ' +
                (comment.numberOfLikes === 1 ? 'like' : 'likes')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
