import React from 'react';
import { connect } from 'react-redux';
import { addComment, editPost } from './store';
import CommentList from './CommentList';

class Post extends React.Component {
  state = {
    comment: '',
    edit: false,
    postTitle: '',
    postBody: ''
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

  editingPostTurnOn = () => {
    const { posts, match } = this.props;
    const post = posts.find(post => post.id == match.params.postId);
    this.setState({
        edit: true,
        postTitle: post.title,
        postBody: post.body
      });
  };

  sendEditedPost = (event) => {
    event.preventDefault();
    const { posts, match } = this.props;
    const { postTitle, postBody } = this.state;
    const post = posts.find(post => post.id == match.params.postId);
    

    this.props.editPost({
      ...post,
      title: postTitle,
      body: postBody
    });

    this.setState({ edit: false })
  };

  editPostTitle = (event) => {
    this.setState({ postTitle: event.target.value });
  };

  editPostBody = (event) => {
    this.setState({ postBody: event.target.value });
  };

  render() {
    const { comment, edit, postTitle, postBody } = this.state;
    const { posts, match } = this.props;
    const post = posts.find(post => post.id == match.params.postId);

    return (
      <div>
        <h1>{post.title}</h1>

        <div className="post">
          <div>
            {
              edit
              ? <form
                  onSubmit={this.sendEditedPost}
                  className="form__edit-post"
                >
                  <label>
                    Title:&nbsp;
                    <input
                      type="text"
                      value={postTitle}
                      onChange={this.editPostTitle}
                    />
                  </label>
                  <textarea value={postBody} onChange={this.editPostBody} />
                  <input type="submit" value="Save" />
                </form>

              : <div className="post__body">
                  <div>{post.body}</div>
                  <button onClick={this.editingPostTurnOn}>Edit</button>
                </div>
            }
          </div>
    
          <div>
            Author:&nbsp;
            {post.creator || 'unknown'}
          </div>
      
          <div>
            Publish date:&nbsp;
            {post.date ? post.date.slice(0, 10) : 'unknown'}
          </div>
    
          <CommentList comments={post.comments} />
    
          <form
            onSubmit={this.sendComment}
            className="form__send-comment"
          >
            <textarea onChange={this.recordComment} value={comment} />
            <input type="submit" value="Send Comment" />
          </form>
        </div>
      </div>
    );
  };
};

const mapState = (state) => ({
  posts: state.posts
});

const mapDispatch = (dispatch) => ({
  addComment: (value) => dispatch(addComment(value)),
  editPost: (value) => dispatch(editPost(value))
});

export default connect(mapState, mapDispatch)(Post);