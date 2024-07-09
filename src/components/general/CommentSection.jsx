import React from 'react';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DateTime } from 'luxon';

export default function CommentSection({ postid }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true); //loading state is true by default
  const [errorMessage, setErrorMessage] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const { jwtToken } = useOutletContext();

  const [formData, setFormData] = useState({ comment_string: '' });

  function handleChange(e) {
    setFormData({ comment_string: `${e.target.value}` });
    console.log(formData);
  }

  async function handleSubmit(e) {
    console.log(e.target);
    e.preventDefault();
    setLoading(true); //set to true to cause loading state

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/comments/${postid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(formData),
          mode: 'cors',
        }
      );

      if (!response.ok) {
        alert('Unable to create post');
        setLoading(false); //set loading to false
        return;
      }

      //otherwise response was ok and comment was created

      //this triggers reloading comments from useEffect
      setReloadTrigger((reloadTrigger) => !reloadTrigger);
      setFormData({ comment_string: '' });
    } catch (error) {
      alert('There was a network error, try again later');
    }
    {
    }
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/comments/${postid}`,
          { mode: 'cors' }
        );

        if (response.status === 404) {
          throw new Error('Blogpost does not exist');
        } else if (!response.ok) {
          throw new Error(
            'There was some error from fetching the comments, try again later'
          );
        }

        const responseData = await response.json();
        setComments(responseData.comments);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message);
        setComments(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [reloadTrigger]);

  if (loading) {
    return <div className="">Loading...please wait</div>;
  } else if (errorMessage) {
    return <div className="">{errorMessage}</div>;
  }

  return (
    <div className="card card m-2 p-4">
      {!jwtToken ? (
        <div className="">Please log in</div>
      ) : (
        <div className="card">
          <form action="" method="post" onSubmit={handleSubmit}>
            <div className="form-group p-2">
              <label htmlFor="comment_string" className="my-2">
                Type your comment:{' '}
              </label>
              <textarea
                className="form-control my-2"
                name="comment_string"
                id="comment_string"
                cols="30"
                rows="2"
                required
                maxLength={250}
                value={formData.comment_string}
                onChange={handleChange}
              ></textarea>
              <button className="btn btn-primary my-2">Submit</button>
            </div>
          </form>
        </div>
      )}
      {comments.map((comment) => (
        <div className="card p-2">
          <h5 className="card-title">{`By: ${comment.author_id.first_name} ${comment.author_id.last_name}`}</h5>
          <h6 className="card-subtitle">
            {DateTime.fromISO(comment.date_created).toLocaleString(
              DateTime.DATETIME_MED
            )}
          </h6>
          <p className="card-text">{comment.comment_string}</p>
        </div>
      ))}
    </div>
  );
}
