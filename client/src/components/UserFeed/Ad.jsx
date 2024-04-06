import { Typography as Text, useTheme } from '@mui/material';
import FlexBox from 'components/UI/FlexBox';
import Container from 'components/UI/Container';

const Ad = () => {
  //add themed styling for advert
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <Container>
      <FlexBox>
        <Text color={dark} variant="h10" fontWeight="200">
          Sponsored
        </Text>
      </FlexBox>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/ad1.png"
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBox>
        <Text color={main}>IronClad steakhouse</Text>
        <Text color={medium}>3 River Valley Road</Text>
      </FlexBox>
      <Text color={medium} m="0.5rem 0">
        The Ironclad: Downtown's finest steaks. Aged beef, perfect cuts,
        extensive wines. Unforgettable elegance, unparalleled flavor.
      </Text>
    </Container>
  );
};

export default Ad;
