import React from 'react';
import './../css/Form.css';

export default function Form() {
  return (
    <section className="form-section">
      <form action className="form">
        <textarea
          name="content"
          type="text"
          id="content"
          className="content"
          placeholder="What's happending?"
          defaultValue={""}
        />
        <button className="btn" type="button">
          Tweet
        </button>
      </form>
    </section>

  )
}
