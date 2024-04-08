import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from 'state';
import { useNavigate } from 'react-router-dom';

import FlexBox from 'components/UI/FlexBox';
import logoLMnoname from '../../assets/images/logos/Logo_LightMode_WithoutName.png';
import logoDMnoname from '../../assets/images/logos/Logo_DarkMode_WithoutName.png';

import './NavBar.css';

import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AccountCircle,
  Message,
  DarkMode,
  LightMode,
  CircleNotifications,
  HelpCenter,
  Menu,
  Close,
} from '@mui/icons-material';

/**
 * Responsive navbar with user menu, theme toggle, and logout (Redux). (Mobile dropdown)
 *
 * @date 27/03/2024 - 00:46:45
 *
 * @returns {*}
 */
const NavBar = () => {
  //set the colours of the navBar
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.default;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  //check if screen is a mobile screen based on width length
  const isNotMobileScreen = useMediaQuery('(min-width: 1000px)');

  //dispatch actions from the redux store
  const dispatch = useDispatch();
  //navigate to different routes in app
  const navigate = useNavigate();
  //grab user information
  const user = useSelector((state) => state.user);

  //state to toggle mobile menu
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);

  //destructor elements of user
  const { firstName, lastName, _id } = user;

  return (
    <FlexBox padding="1rem 6%" backgroundColor={alt}>
      <FlexBox gap="0rem" padding='0rem'>
        <Typography
          color="primary"
          fontSize="clamp(2rem, 2.6rem, 3rem)"
          fontWeight="bold"
          onClick={() => navigate('/home')}
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          What's cookin
        </Typography>
      </FlexBox>

      {isNotMobileScreen ? (
        <>
          <div className="logo" style={{ justifyContent: 'center' }}>
            <img
              width="120"
              height="60"
              style={{ objectFit: 'cover' }}
              src={theme.palette.mode === 'dark' ? logoDMnoname : logoLMnoname}
              alt="logo"
            />
          </div>
          <FlexBox gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>
            <IconButton>
              <AccountCircle
                sx={{ fontSize: '25px' }}
                onClick={() => navigate(`/profile/${_id}`)}
              />
            </IconButton>
            <FormControl variant="standard" value={`${firstName} ${lastName}`}>
              <Select
                value={`${firstName} ${lastName}`}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  p: '0.25rem 1rem',
                  '& .MuiSvgIcon-root': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-seelct:focus': {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <option hidden value={`${firstName} ${lastName}`}>
                  <Typography>{`${firstName} ${lastName}`}</Typography>
                </option>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBox>
        </>
      ) : (
        <IconButton onClick={() => setIsMobileMenuShown(!isMobileMenuShown)}>
          <Menu />
        </IconButton>
      )}
      {!isNotMobileScreen && isMobileMenuShown && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxwidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuShown(!isMobileMenuShown)}
            >
              <Close />
            </IconButton>
          </Box>
          <FlexBox
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              sx={{ fontSize: '25px' }}
              onClick={() => dispatch(setMode())}
            >
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ fontSize: '25px', color: dark }} />
              )}
            </IconButton>
            <AccountCircle sx={{ fontSize: '25px' }} />
            <FormControl variant="standard" value={`${firstName} ${lastName}`}>
              <Select
                value={`${firstName} ${lastName}`}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  p: '0.25rem 1rem',
                  '& .MuiSvgIcon-root': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-seelct:focus': {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <option hidden value={`${firstName} ${lastName}`}>
                  <Typography>{`${firstName} ${lastName}`}</Typography>
                </option>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBox>
        </Box>
      )}
    </FlexBox>
  );
};

export default NavBar;
