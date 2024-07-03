import React from 'react';
import { useParams } from 'react-router-dom';
export default function Blogpage() {
  const { postid } = useParams();

  return <div>{postid}</div>;
}
