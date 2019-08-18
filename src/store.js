import { createStore } from 'redux';
const SET_POSTS = 'setPosts';
const ADD_COMMENT = 'addComment';

export const setPosts = (value) => ({
  type: SET_POSTS,
  value
});

export const addComment = (value) => ({
  type: ADD_COMMENT,
  value
});

const reducer = (state, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.value
      };

    case ADD_COMMENT:
      console.log(state.posts.find(post => post.id === action.value.id).comments)
      return {
        ...state,
        posts: state.posts
          .map(post => post.id === action.value.id
            ? {
                ...post,
                comments: post.comments.push(action.value.comment)
              }

            : post
          )
      };

    default:
      return state;
  }
};

export const store = createStore(reducer, { posts: [] });