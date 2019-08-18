import React from 'react';

const CommentList = ({ comments }) => (
  <div>
    {
      comments ?

      comments.map(comment => (
        <div key={comment.id} style={{ 'padding': '10px' }}>
          {comment.body}
        </div>
      ))

      : 'No Comments'
    }
  </div>
);

export default CommentList;