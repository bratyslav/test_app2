import React from 'react';
import { connect } from 'react-redux';
import { addPost } from './store';
import { NavLink } from 'react-router-dom';

class PostList extends React.Component {
  state = {
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

    this.props.addPost({
      id: title + Math.floor(Math.random()*10),
      title: title,
      body: post,
      creator: creator,
      comments: [],
      date: this.getCurrentDate()
    })
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

  render() {
    const { post, title, creator } = this.state;

    return (
      this.props.posts ?

      <div>
        <h1>Latest Posts</h1>

        <form onSubmit={this.sendPost}>
          Title: <input type="text" onChange={this.recordPostTitle} value={title} />
          Author: <input type="text" onChange={this.recordPostCreator} value={creator} />
          <textarea onChange={this.recordPostBody} value={post} />
          <input type="submit" value="Submit" />
        </form>

        <ul>
          {
            this.props.posts.map(post => (
              <li key={post.id}>
                <h2>
                  <NavLink to={`/posts/${post.id}`}>
                    {post.title}
                  </NavLink>
                </h2>
  
                <div>
                  Author:&nbsp;
                  {post.creator || 'unknown'}
                </div>
  
                <div>
                  Publish date:&nbsp;
                  {post.date ? post.date.slice(0, 10) : 'unknown'}
                </div>
              </li>
            ))
          }
        </ul>
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