import React from 'react';
import { connect } from 'react-redux';
import { addComment } from './store';
import CommentList from './CommentList';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  };

  recordComment = (event) => {
    this.setState({ comment: event.target.value });
  };

  sendComment = (event) => {
    event.preventDefault();
    const { comment } = this.state;

    this.props.addComment({
      id: this.props.posts.find(post => post.id == this.props.match.params.postId).id,
      comment: {
        id: comment + Math.floor(Math.random()*10),
        body: comment
      }
    });

    this.setState({ comment: '' })
  };

  render() {
    const { comment } = this.state;
    const post = this.props.posts.find(post => post.id == this.props.match.params.postId)

    return (
      <div>
        <h1>{post.title}</h1>
  
        <div>{post.body}</div>
  
        <div>
          Author:&nbsp;
          {post.creator || 'unknown'}
        </div>
    
        <div>
          Publish date:&nbsp;
          {post.date ? post.date.slice(0, 10) : 'unknown'}
        </div>
  
        <CommentList comments={post.comments} />
  
        <form onSubmit={this.sendComment}>
          <textarea onChange={this.recordComment} value={comment} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };
};

const mapState = (state) => ({
  posts: state.posts
});

const mapDispatch = (dispatch) => ({
  addComment: (value) => dispatch(addComment(value))
});

export default connect(mapState, mapDispatch)(Post);