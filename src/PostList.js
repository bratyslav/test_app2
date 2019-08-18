import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class PostList extends React.Component {
  render() {
    return (
      this.props.posts ?

      <div>
        <h1>Latest Posts</h1>
  
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

export default connect(mapState, null)(PostList);