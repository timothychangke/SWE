import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';

import FlexBox from 'components/UI/FlexBox';
import Dropzone from 'react-dropzone';
import UserImage from 'components/UI/UserImage';
import Container from 'components/UI/Container';
import { toast } from 'react-hot-toast';

import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography as Text,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material';

/**
 * This React component, MyPostWidget, allows users to create social media posts. It leverages Redux to access user ID and token, Material-UI components for styling,
 * and a third-party library for drag-and-drop image uploads. The component provides sections for entering a post title, description, and optionally attaching an image.
 * Users can share their post upon filling in the required fields (title and description).
 *
 * @date 27/03/2024 - 01:04:49
 *
 * @export
 * @param {{ picturePath: any; }} param0
 * @param {*} param0.picturePath
 * @returns {*}
 */
export default function Posting({ picturePath }) {
  //grabbing of the color from the palette theme
  const { palette } = useTheme();
  //grab mediumMain palette
  const mediumMain = palette.neutral.mediumMain;
  //grab medium palette
  const medium = palette.neutral.medium;
  //check if it is a mobile screen
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');

  //grab the ID from the redux store
  const { _id } = useSelector((state) => state.user);
  //token to authorise user to call this api
  const token = useSelector((state) => state.token);

  //dispatch items from redux store
  const dispatch = useDispatch();

  //create state that indicates whether image dropdown is opened or not
  const [isImage, setIsImage] = useState(false);
  //create state for if they upload an image
  const [image, setImage] = useState(null);
  //create state of post content
  const [postDesciption, setPostDescription] = useState('');
  //create state of post content
  const [postHeader, setPostHeader] = useState('');

  
  
  
  //handle post data
  const sharePost = async () => {
    //have to use form data again as we are passing an image
    const formData = new FormData();
    //append user ID to formData
    formData.append('userId', _id);
    //append post header to formData
    formData.append('postHeader', postHeader);
    //append post description to formData
    formData.append('description', postDesciption);
    if (postDesciption && postDesciption.length > 200) {
      toast.error('Post description cannot exceed 200 characters.');
      return; // Exit the function to prevent further execution
    }
    if (image) {
      // Check if image name has a valid extension (.png, .jpg, .jpeg)
      if (!/\.(png|jpg|jpeg)$/i.test(image.name)) {
        toast.error('Image must be in .png, .jpg, or .jpeg format.');
        return; // Exit the function to prevent further execution
      }
  
      // append image to formData
      formData.append('picture', image);
      // append picture path to formData
      formData.append('picturePath', image.name);
    }
    //POST post to backend
    const response = await fetch(`http://localhost:3001/posts`, {
      //method is set to POST
      method: 'POST',
      //authorization with BEARER token
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    //async function to obtain post response
    const posts = await response.json();
    //if there was error in posts
    if (posts.error) {
      //push a toast error notification of the error message
      toast.error(posts.error);
    } else {
      toast.success('Successfully posted!')
      //dispatch setPost action to set new post
      dispatch(setPosts({ posts }));
      //reset image state back to null
      setImage(null);
      //reset post description state back to an empty string
      setPostDescription('');
      //reset post header state back to an empty string
      setPostHeader('');
    }
  };

  return (
    <Container>
      <FlexBox width="100%">
        <Text
          fontWeight="bold"
          fontSize="28px"
          color="primary"
          paddingBottom={'8px'}
          margin="auto"
        >
          GOOD FOOD MUST SHARE!
        </Text>
      </FlexBox>
      <Divider sx={{ margin: '0 0 1.25rem 0' }} />
      <FlexBox gap="1.5rem" paddingBottom="1rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="Food Post Title..."
          onChange={(e) => setPostHeader(e.target.value)}
          value={postHeader}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '0.6rem 2rem',
          }}
        />
      </FlexBox>
      <InputBase
        placeholder="Food Post Description..."
        onChange={(e) => setPostDescription(e.target.value)}
        value={postDesciption}
        sx={{
          width: '100%',
          backgroundColor: palette.neutral.light,
          borderRadius: '2rem',
          padding: '1.2rem 2rem',
        }}
      />
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            mulitple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBox>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBox>
                      <Text>{image.name}</Text>
                      <EditOutlined />
                    </FlexBox>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '15%' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBox>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: '1.25rem 0' }} />
      <FlexBox>
        <FlexBox gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Text
            color={mediumMain}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
          >
            Attach an Image
          </Text>
        </FlexBox>
        <Button
          disabled={!(postHeader && postDesciption)}
          onClick={sharePost}
          sx={{
            color: postHeader && postDesciption ? palette.background.alt : null,
            backgroundColor:
              postHeader && postDesciption
                ? palette.primary.main
                : palette.primary.light,
            borderRadius: '3rem',
          }}
        >
          POST
        </Button>
      </FlexBox>
    </Container>
  );
}
