import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import CommentSection from '../general/CommentSection';

export default function Blogpage() {
  const { postid } = useParams();

  const [post, setPost] = useState(null); //by default, empty null
  const [loading, setLoading] = useState(true); //loading state is true by default
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/posts/${postid}`,
          { mode: 'cors' }
        );

        if (response.status === 404) {
          throw new Error('Blog post not found!');
        } else if (!response.ok) {
          throw new Error(
            'There was an issue with fetching the post, please try again later'
          );
        }

        //otherwise everything is ok
        const responseData = await response.json();

        setPost(responseData.post);
        setErrorMessage(null);
      } catch (err) {
        setErrorMessage(err.message);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) {
    return <div>Loading the page...please be patient</div>;
  } else if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="container">
      <div className="card m-2 p-4">
        <h1 className="card-title">{post.title}</h1>
        <h3 className="card-subtitle">{`By: ${post.author_id.first_name} ${post.author_id.last_name}`}</h3>
        <h6 className="card-subtitle" style={{ color: 'gray' }}>
          {DateTime.fromISO(post.date_created).toLocaleString(
            DateTime.DATETIME_MED
          )}
        </h6>
        <p className="card-text">{post.text_content}</p>
      </div>
      <CommentSection postid={postid}></CommentSection>
    </div>
  );
}
