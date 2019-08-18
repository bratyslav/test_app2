import { createStore } from 'redux';
const SET_POSTS = 'setPosts';
const ADD_COMMENT = 'addComment';
const ADD_POST = 'addPost';
const EDIT_POST = 'editPost';

export const setPosts = (value) => ({
  type: SET_POSTS,
  value
});

export const addComment = (value) => ({
  type: ADD_COMMENT,
  value
});

export const addPost = (value) => ({
  type: ADD_POST,
  value
});

export const editPost = (value) => ({
  type: EDIT_POST,
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
              if (post.comments) {
                return {
                  ...post,
                  comments: [
                    ...post.comments,
                    action.value.comment
                  ]
                }
              } else return {
                ...post,
                comments: [
                  action.value.comment
                ]
              };
            } else return post;
          })
      };

    case ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          action.value
        ]
      };

    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.value.id) {
            return action.value;
          } else return post;
        })
      }

    default:
      return state;
  }
};

export const store = createStore(reducer, { posts: [] });