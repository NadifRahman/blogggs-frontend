import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function CreateBlog() {
  const { jwtToken } = useOutletContext();

  //state object that holds form data
  const [formData, setFormData] = useState({ title: '', text_content: '' });

  //true or false state if post is being uploaded
  const [uploading, setUploading] = useState(false);

  const [errorMessages, setErrorMessages] = useState(null); //array of strings or null

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUploading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/posts`,
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
        setErrorMessages['There was an issue, please try again later'];
        return;
      }

      //otherwise response was good
      const responseData = await response.json();
      setErrorMessages(null);
      navigate(`/blogpost/${responseData.postid}`);
    } catch (err) {
      setErrorMessages([
        'There was an issue connecting, please try again later',
      ]);
    } finally {
      setUploading(false);
    }
  };

  return jwtToken ? (
    <div className="container">
      <form onSubmit={handleSubmit} method="post">
        <div className="form-group p-2">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            required
            maxLength={25}
            name="title"
            id="title"
            placeholder="Enter the title of your blogpost"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-2">
          <label htmlFor="text_content">Text content:</label>
          <textarea
            className="form-control"
            name="text_content"
            id="text_content"
            cols="10"
            rows="25"
            required
            maxLength={4000}
            value={formData.text_content}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="btn btn-primary">Submit</button>
        {uploading && <div>Uploading...</div>}
      </form>
      {errorMessages && (
        <>
          {errorMessages.map((errorMessage) => (
            <div
              key={errorMessage}
              className="alert alert-warning"
              role="alert"
            >
              {errorMessage}
            </div>
          ))}
        </>
      )}
    </div>
  ) : (
    <div className="container">Please log in to create posts</div>
  );
}
