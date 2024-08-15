import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comment.length > 200) {
        return;
      }
      const res = await fetch(`/api/comment/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: comment,
          userId: currentUser._id,
          postId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const getComments = async () => {
    try {
      const res = await fetch(`/api/comment/getPostComments/${postId}`);
      if (res.ok) {
        const data = await res.json();

        setComments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        getComments();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mx-auto">
      {currentUser ? (
        <div className="flex flex-row gap-3 mt-2 text-gray-500">
          <p>Signed in as:</p>
          <img
            className="w-6 h-6 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={'/dashboard?tab=profile'}
            className=" text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex flex-row gap-3 text-sm text-teal-500 py-3 ">
          You must be sign in to comment
          <Link to={'/sign-in'} className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-tl-3xl rounded-br-3xl p-3 my-3"
        >
          <Textarea
            type="text"
            placeholder="Add a comment"
            rows="3"
            maxLength={150}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-sm">
              {150 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {' '}
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-3">No comments yet!</p>
      ) : (
        <>
          <div className="flex flex-row justify-center items-center gap-2">
            <p>Comments</p>
            <div className="border border-gray-500 py-0.5 px-2 text-sm rounded-full">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => {
            return (
              <Comment
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
export default CommentSection;
