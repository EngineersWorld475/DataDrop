import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

const Comment = ({ comment, onLike, onEdit }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  console.log(currentUser);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
        {isEditing ? (
          <>
            <Textarea
              className="w-full"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            ></Textarea>
            <div className="flex justify-end gap-2 text-xs my-1">
              <Button
                type="button"
                size="sm"
                color="success"
                onClick={handleSave}
                outline
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                color="failure"
                onClick={() => setIsEditing(false)}
                outline
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
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
              {currentUser &&
                (currentUser._id === comment._id || currentUser.isAdmin) && (
                  <button
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-green-500"
                  >
                    Edit
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
