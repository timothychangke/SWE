import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'state';
import { useNavigate } from 'react-router-dom';

import FlexBox from 'components/UI/FlexBox';
import UserImage from 'components/UI/UserImage';

import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography as Text, useTheme } from '@mui/material';

//Friend component
/**
 * This React component, `Friend`, renders information for a user's friend. It retrieves friend data (ID, name, profile picture path) as props, leverages Redux to access user ID,
 * token, and friend list, and utilizes Material-UI components for styling. The component displays the friend's profile picture, name,
 * and a button to add/remove them from the friend list using the friend status and an API call upon clicking the button.
 *
 * @date 27/03/2024 - 01:01:30
 *
 * @param {{ friendId: any; firstName: any; lastName: any; userPicturePath: any; }} param0
 * @param {*} param0.friendId
 * @param {*} param0.firstName
 * @param {*} param0.lastName
 * @param {*} param0.userPicturePath
 * @returns {*}
 */
const Friend = ({
  friendId,
  firstName,
  lastName,
  userPicturePath,
  isOtherProfile,
}) => {
  //get access to the palette via useTheme
  const { palette } = useTheme();
  //set colors of the friend component
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;

  //get user id from the redux store
  const { _id } = useSelector((state) => state.user);
  //get token from redux store
  const token = useSelector((state) => state.token);
  //get the firends array from the user object in state
  const friends = useSelector((state) => state.user.friends);

  //const get state from redux store
  const dispatch = useDispatch();
  //navigate allows the navigation to other links
  const navigate = useNavigate();

  //boolean variable to check if a user is a friend
  const isFriend = friends.find((friend) => friend.id === friendId);

  //api call to change the friend status (add if not already friend and remove if already friend)
  const changeFriendStatus = async () => {
    //have to pass into the url the id of the current user and the id of the friend
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        //patch method as partial modifications are applied
        method: 'PATCH',
        headers: {
          //include authorization header
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    //save the data recieved into a variable
    const data = await response.json();
    //dispatch the setFriends action to save the updated friends list
    dispatch(setFriends({ friends: data }));
  };
  return (
    <FlexBox>
      <FlexBox gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            //refresh the page after navigation
            navigate(0);
          }}
        >
          <Text
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {`${firstName} ${lastName}`}
          </Text>
        </Box>
      </FlexBox>
      {!isOtherProfile && _id !== friendId && (
        <IconButton
          onClick={() => changeFriendStatus()}
          sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBox>
  );
};

export default Friend;
