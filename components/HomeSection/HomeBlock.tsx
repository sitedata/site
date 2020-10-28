import { Box, Center, Grid, Image, Heading } from '@chakra-ui/core';
import { useInView } from 'react-intersection-observer';
import { Button } from 'site/components';
import type { IHomeBlock } from './types';

const templates = {
  right: {
    base: `"title" "body" "button"`,
    lg: `"image title" "image body" "image button"`,
  },
  left: {
    base: `"title" "body" "button"`,
    lg: `"title image" "body image" "button image"`,
  },
};

const columns = { right: '0.5fr 1fr', left: '1fr 0.5fr' };

export const HomeBlock = (props: IHomeBlock) => {
  const { title, subtitle, imageUrl, body, buttonText, buttonLink, side } = props;
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '-150px' });
  return (
    <Grid
      gridColumnGap={{ base: 0, lg: 16, xl: 48 }}
      width="100%"
      gridTemplateColumns={{ base: '1fr', lg: columns[side] }}
      gridTemplateRows={{ base: '0.33fr 1fr 0.1fr', lg: '0.5fr 1fr 0.1fr' }}
      gridTemplateAreas={templates[side]}
      textAlign={side === 'left' ? 'right' : 'left'}>
      <Center
        ref={ref}
        boxSize="100%"
        gridArea="image"
        opacity={+inView}
        transition="opacity 0.2s ease-in 0.1s"
        display={{ base: 'none', lg: 'flex' }}>
        <Image boxSize="100%" src={imageUrl} />
      </Center>
      <Box gridArea="title">
        <Heading as="h3" fontSize={{ base: '2xl', lg: '4xl' }}>
          {title}
        </Heading>
        <Heading as="h4" fontSize={{ base: '1.5rem', lg: 'xl' }} fontWeight="light">
          {subtitle}
        </Heading>
      </Box>
      <Box whiteSpace="pre-line" fontSize="lg" gridArea="body">
        {body}
      </Box>
      <Box gridArea="button">
        <Button mx="unset" href={buttonLink} variant="heroPrimary">
          {buttonText}
        </Button>
      </Box>
    </Grid>
  );
};
