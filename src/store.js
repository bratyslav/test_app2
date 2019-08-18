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
      return {
        ...state,
        posts: state.posts
          .map(post => {
            if (post.id === action.value.id) {
              return {
                ...post,
                comments: [
                  ...post.comments,
                  action.value.comment
                ]
              }
            } else return post;
          })
      };

    default:
      return state;
  }
};

export const store = createStore(reducer, { posts: [] });