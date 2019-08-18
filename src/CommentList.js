import React from 'react';

const CommentList = ({ comments }) => {
  console.log(comments)
  return (
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
  )
};

export default CommentList;