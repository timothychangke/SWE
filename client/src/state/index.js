import { createSlice } from '@reduxjs/toolkit';

//state accessible throughout the entire application
/**
 * This code sets the initial state for your Redux application. It defines properties for theme (mode), user information (user), authentication token (token),
 * and post information (posts). The initial theme is light mode, no user is logged in (user is null), and there's no authentication token (token is null).
 * Additionally, no posts are loaded initially (posts is an empty array).
 *
 * @date 27/03/2024 - 00:47:43
 *
 * @type {{ mode: string; user: any; token: any; posts: {}; }}
 */
const initialState = {
  //light mode or dark mode
  mode: 'light',
  //show add mode
  showAd: true,
  //user information
  user: null,
  //auth token
  token: null,
  //post information
  posts: [],
};

//the boilerplate code
/**
 * This code creates a Redux slice named authSlice to manage application state. It defines reducers for actions that update various state properties:
 * theme, user information (upon login), authentication token, friend list (for logged-in users), and post information (fetching and updating individual posts).
 *
 * @date 27/03/2024 - 00:47:43
 *
 * @type {*}
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  //actions that modify the global state
  reducers: {
    setMode: (state) => {
      //toggle between light mode and dark mode
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    //toggle mode back to light mode on logout
    setModeOnLogout: (state) => {
      state.mode = 'light';
    },
    setShowAd: (state, action) => {
      state.showAd = action.payload.setTo;
    },
    setLogin: (state, action) => {
      //set user state
      state.user = action.payload.user;
      //set token state
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      //remove user state information
      state.user = null;
      //remove user token information
      state.token = null;
    },
    setFriends: (state, action) => {
      //check if user exists
      if (state.user) {
        //set user friends state
        state.user.friends = action.payload.friends;
      } else {
        console.error("user's friends do not exist");
      }
    },
    setPosts: (state, action) => {
      //set user posts as posts state
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      if (action.payload.type == 'DELETE') {
        const filteredPosts = state.posts.filter(
          (post) => post._id !== action.payload.post._id,
        );
        state.posts = filteredPosts;
        return;
      }
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

/**
 * This code destructures the `actions` object from the `authSlice` reducer. It extracts specific actions for easier usage throughout the application.
 * These actions allow you to modify the Redux state by toggling theme mode (`setMode`), setting user information and token upon login (`setLogin`),
 * clearing them upon logout (`setLogout`), updating a user's friend list (`setFriends`), managing post information (`setPosts`), and updating individual posts (`setPost`).
 *
 * @date 27/03/2024 - 00:47:43
 *
 * @type {*}
 */
export const {
  setMode,
  setModeOnLogout,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setShowAd,
} = authSlice.actions;
export default authSlice.reducer;
