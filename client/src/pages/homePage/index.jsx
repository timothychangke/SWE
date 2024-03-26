import { useSelector } from 'react-redux';

import NavBar from 'pages/navBar';
import User from 'components/UserFeed/User';
import Posting from 'components/UserFeed/Posting';
import Posts from 'components/UserFeed/Posts'
import FriendList from 'components/UserFeed/FriendList';

import { Box, useMediaQuery } from '@mui/material';

/**
 * Renders the home page of the application. This page displays the navigation bar, user information, posting section, user feed, and friend list (on non-mobile screens).

 * @date 27/03/2024 - 00:42:13
 *
 * @returns {*}
 */
const HomePage = () => {
  //check whether it is a mobile screen
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  //using useSelector, grab user state from reducer
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <User userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <Posting picturePath={picturePath} />
          <Posts userId={_id}/>
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%">
          <FriendList userId={_id}/></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
