import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'state';

import Friend from './Friend';
import Container from 'components/UI/Container';

import { Box, Typography as Text, useTheme } from '@mui/material';

//component that displays the friend list
/**
 * This React component, FriendList, fetches and displays a user's friend list. It retrieves the user ID via props, uses Redux to access the user's token and friend data, 
 * and leverages Material-UI for styling. Upon component rendering, it makes an API call to fetch friends' information and renders individual Friend components for each friend within a styled container.
 * 
 * @date 27/03/2024 - 01:03:04
 *
 * @param {{ userId: any; }} param0
 * @param {*} param0.userId
 * @returns {*}
 */
const FriendList = ({ userId, isOtherProfile }) => {
  //set color theme for friendlist
  const { palette } = useTheme();

  //get token from redux store
  const token = useSelector((state) => state.token);
  //get friends from redux store
  const friends = useSelector((state) => state.user.friends);

  //allow dispatch actions to be called
  const dispatch = useDispatch();

  //function to get a list of the users friends based on the user id
  const getFriends = async () => {
    //api call to backend
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        //get method to get friends
        method: 'GET',
        //authorisation header
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    //wait for data from the backend to come back
    const data = await response.json();
    //set friends in redux store
    dispatch(setFriends({ friends: data }));
  };

  //get friends everytime the page reloads
  useEffect(() => {
    getFriends();
  }, []);

  return (
    <Container>
      <Text
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem', ml: '1rem'}}
      >
        Friend List
      </Text>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => {
          return (
            <Friend
              key={friend._id}
              friendId={friend.id}
              firstName={friend.firstName}
              lastName={friend.lastName}
              userPicturePath={friend.picturePath}
              isOtherProfile={isOtherProfile}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default FriendList;
