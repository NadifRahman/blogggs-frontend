import React from 'react';
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import logo from '../../../public/blogggs-logo.png';

export default function Home() {
  const [allPosts, setAllPosts] = useState([]); //by default, empty array
  const [loading, setLoading] = useState(true); //loading state is true by default
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchForItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/posts`,
          { mode: 'cors' }
        ); //make a get request to backend app

        if (!response.ok) {
          throw new Error(`Unable to fetch, status: ${response.status}`);
        }

        const responseData = await response.json();

        setAllPosts(responseData.posts);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage('There is a network error, please try again later');
        setAllPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchForItems();
  }, []);

  if (loading) {
    return <div>Loading...API may be waking up...Please wait</div>; //need to style these
  }

  if (errorMessage) {
    return (
      <div className="container">
        <div className="alert alert-warning mt-2" role="alert">
          {errorMessage}
        </div>
      </div>
    ); //need to style these
  }

  return (
    <div className="container-sm" style={{ maxWidth: '1000px' }}>
      <img
        src={logo}
        alt=""
        style={{
          maxWidth: '300px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        className="p-4"
      />
      {allPosts.map((post) => (
        <Link to={`/blogpost/${post._id}`} style={{ textDecoration: 'none' }}>
          <div className="card m-2 p-2">
            <h2 className="card-title">{post.title}</h2>
            <h4 className="card-subtitle">{`By: ${post.author_id.first_name} ${post.author_id.last_name}`}</h4>
            <h6 className="card-subtitle" style={{ color: 'gray' }}>
              {DateTime.fromISO(post.date_created).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </h6>
            <p className="card-text">
              {post.text_content.length < 400 //if blogpost text content is greater than 50, post only part of it
                ? post.text_content
                : post.text_content.substring(0, 400) + '...'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
