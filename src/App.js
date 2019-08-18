import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { getPosts } from './API/data';
import { setPosts } from './store';
import './App.css';
import PostList from './PostList';
import Post from './Post';

class App extends Component {
  async componentDidMount() {
    const posts = await getPosts();

    this.props.setPosts(posts);
  };

  render() {
    return (
      <div>
        <HashRouter>
          <Route path="/" exact render={(props) => <PostList {...props} />} />
          <Route path="/posts/:postId" render={(props) => <Post {...props} />}  />
        </HashRouter>
      </div>
    );
  };
};

const mapDispatch = (dispatch) => ({
  setPosts: (value) => dispatch(setPosts(value))
});

export default connect(null, mapDispatch)(App);
