import { useDispatch, useSelector } from 'react-redux';
import { setShowAd } from 'state';

import NavBar from 'pages/navBar';
import User from 'components/UserFeed/User';
import Posting from 'components/UserFeed/Posting';
import Posts from 'components/UserFeed/Posts';
import FriendList from 'components/UserFeed/FriendList';
import Ad from 'components/UserFeed/Ad';

import {
  Box,
  useMediaQuery,
  Typography as Text,
  useTheme,
} from '@mui/material';
import { toast } from 'react-hot-toast';

/**
 * Renders the home page of the application. This page displays the navigation bar, user information, posting section, user feed, and friend list (on non-mobile screens).

 * @date 27/03/2024 - 00:42:13
 *
 * @returns {*}
 */
const HomePage = () => {
  //add themed styling for advert removal
  const { palette } = useTheme();
  const main = palette.neutral.main;
  //get state form redux store
  const dispatch = useDispatch();
  //get show ad mode from redux store
  const showAd = useSelector((state) => state.showAd);
  //check whether it is a mobile screen
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  //using useSelector, grab user state from reducer
  const { _id, picturePath } = useSelector((state) => state.user);
  const handleClick = () => {
    dispatch(setShowAd({ setTo: false }));
    toast.success('$1.99 successfully charged to credit card');
  };
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
          <Posts userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {showAd && (
              <>
                <Ad />
                <Box m="0.2rem 0" />
                <Text
                  color={main}
                  variant="h6"
                  fontWeight="100"
                  marginLeft="5%"
                  onClick={handleClick}
                  sx={{
                    '&:hover': {
                      color: palette.primary.light,
                      cursor: 'pointer',
                    },
                  }}
                >
                  Remove ad for $1.99/month?
                </Text>
                <Box m="2rem 0" />
              </>
            )}
            <FriendList userId={_id} isOtherProfile={false}/>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
