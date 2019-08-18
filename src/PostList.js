import React from 'react';
import { connect } from 'react-redux';
import { addPost } from './store';
import { NavLink } from 'react-router-dom';

class PostList extends React.Component {
  state = {
    addingPostFormIsVisible: false,
    post: '',
    title: '',
    creator: ''
  };

  getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }

  sendPost = (event) => {
    event.preventDefault();
    const { post, title, creator } = this.state;

    if (post.length !== 0 && title.length !== 0) {
      this.props.addPost({
        id: this.props.posts.length,
        title: title,
        body: post,
        creator: creator,
        comments: [],
        date: this.getCurrentDate()
      });
    };

    this.setState({
      addingPostFormIsVisible: false,
      post: '',
      title: '',
      creator: ''
    });
  };

  recordPostBody = (event) => {
    this.setState({ post: event.target.value });
  };

  recordPostTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  recordPostCreator = (event) => {
    this.setState({ creator: event.target.value });
  };

  getFormVisible = () => {
    this.setState({ addingPostFormIsVisible: true });
  };

  render() {
    const { post, title, creator, addingPostFormIsVisible } = this.state;

    return (
      this.props.posts ?

      <div>
        <h1>Latest Posts</h1>

        <ul className="post-list">
          {
            this.props.posts.map(post => (
              <li key={post.id}>
                <h2>
                  <NavLink
                    to={`/posts/${post.id}`}
                    className="post-header"
                  >
                    {post.title}
                  </NavLink>
                </h2>
  
                <div className="post-description">
                  Author:&nbsp;
                  {post.creator || 'unknown'}
                </div>
  
                <div className="post-description">
                  Publish date:&nbsp;
                  {post.date ? post.date.slice(0, 10) : 'unknown'}
                </div>
              </li>
            ))
          }
        </ul>

        <div>
          {
            addingPostFormIsVisible

            ? <form
                onSubmit={this.sendPost}
                className="form__add-new-post"
              >
                <label>
                  Title:&nbsp;
                  <input
                    type="text"
                    onChange={this.recordPostTitle}
                    value={title}
                  />
                </label>

                <label>
                  Author:&nbsp;
                  <input
                    type="text"
                    onChange={this.recordPostCreator}
                    value={creator}
                  />
                </label>

                <textarea onChange={this.recordPostBody} value={post} />

                <input type="submit" value="Submit" />
              </form>

            : <button
                onClick={this.getFormVisible}
                className="button__add-new-post"
              >
                Add New Post
              </button>
          }
        </div>
      </div>

      : <h1>Loader</h1>
    );
  }
};

const mapState = (state) => ({
  posts: state.posts
});

const mapDispatch = (dispatch) => ({
  addPost: (value) => dispatch(addPost(value))
});

export default connect(mapState, mapDispatch)(PostList);