import React from 'react';
import './../css/Post.css';

import PostItem from './PostItem';

export default function Post() {
  return (
    <section className="post-section">
      <div className="post-list">

        <PostItem />

      </div>
    </section>
  )
}
