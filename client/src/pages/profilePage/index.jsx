
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Navbar from '../navBar';
import FriendList from '../../components/UserFeed/FriendList';
import Posts from 'components/UserFeed/Posts';
import User from '../../components/UserFeed/User'

import { Box, useMediaQuery } from '@mui/material';

/**
 * A React component that renders a user's profile page. Fetches user data from a backend API using a GET request with authorization. 
 * Incorporates responsive layout adjustments for different screen sizes.
 * 
 * @date 27/03/2024 - 00:47:10
 *
 * @returns {*}
 */
const ProfilePage = () => {
  //adjust layout for mobile screens
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  //get the user id from the url of the webpage
  const { userId } = useParams();
  //get the token from the redux store
  const token = useSelector((state) => state.token);

  //create a user state
  const [user, setUser] = useState(null);

  //function to get the user from the backend
  const getUser = async () => {
    //make a api call to the backend to get the user information
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      //get method as we are getting the user information
      method: 'GET',
      //set authorisation header for verification
      headers: { Authorization: `Bearer ${token}` },
    });
    //store result from backend
    const data = await response.json();
    //set user state as data
    setUser(data);
  };
  //get the user when the page first reloads
  useEffect(() => {
    getUser();
  }, []); 

  //if user is non-existent, return nothing
  if (!user) return null;
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined} padding='2rem 0rem 2rem 2rem'>
          <User userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendList userId={userId} isOtherProfile={true}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
          style={{ paddingLeft: '2rem', paddingRight: 'rem' }}
        >
          <Posts userId={userId} isProfile/>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
