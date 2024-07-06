import React from 'react';
import { useState, useEffect } from 'react';

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
        setError(null);
      } catch (error) {
        setError(error.message);
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
    return <div>There has been an error</div>; //need to style these
  }

  return (
    <div className="container-sm" style={{ maxWidth: '1000px' }}>
      {allPosts.map((post) => (
        <div className="card m-2 p-2">
          <h3 className="card-title">{post.title}</h3>
          <h4 className="card-subtitle">{`By: ${post.author_id.first_name} ${post.author_id.last_name}`}</h4>
          <p className="card-text">
            {post.text_content.length < 400 //if blogpost text content is greater than 50, post only part of it
              ? post.text_content
              : post.text_content.substring(0, 400) + '...'}
          </p>
        </div>
      ))}
    </div>
  );
}
