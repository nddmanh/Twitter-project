import React from 'react';

export default function PostItem() {
  return (
    <div className="post-item">
      <p className="post-content">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, cumque
        molestiae? Expedita cumque sunt rerum ipsa eos consequuntur porro
        accusamus. Provident consequuntur qui libero asperiores similique rerum
        numquam doloremque suscipit.
      </p>
      <div className="post-footer">
        <div className="post-infors">
          <span>Duc Manh</span>
          <span>Date: 10/7/2021</span>
        </div>
        <div className="post-edit-delete">
          <span>Edit</span>
          <span>Delete</span>
          <span className="delete-question">Are you sure?</span>
          <span>Yes</span>
          <span>No</span>
        </div>
      </div>
      <div className="post-edit-form">
        <form className="edit-form">
          <textarea
            name="content"
            type="text"
            id="content"
            className="content"
            placeholder="What's happending?"
            defaultValue={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quidem maiores eaque consequuntur magni, quo ducimus, doloremque repudiandae quis ut voluptas dolorum sed omnis nisi suscipit? Dolore recusandae consectetur iure.\n                            "
            }
          />
          <div className="btn-container">
            <button className="btn" type="button">
              Update
            </button>
            <button className="btn" type="button">
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
