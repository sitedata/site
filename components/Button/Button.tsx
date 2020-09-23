import * as React from 'react';
import { forwardRef } from 'react';
import NextLink from 'next/link';
import { Button as ChakraButton } from '@chakra-ui/core';
import { useLinkType } from 'site/hooks';

import type { ButtonProps, ButtonLinkElement } from './types';

const BaseButton = forwardRef<ButtonLinkElement, ButtonProps>((props, ref) => (
  <ChakraButton as="a" ref={ref} px={3} py={1} lineHeight={1.5} borderRadius="lg" {...props} />
));

const ExternalButton = forwardRef<ButtonLinkElement, ButtonProps>((props, ref) => {
  const { href = '#', ...rest } = props;
  return (
    <NextLink href={href}>
      <BaseButton ref={ref} href={href} target="_blank" rel="noopener noreferrer" {...rest} />
    </NextLink>
  );
});

export const Button = forwardRef<ButtonLinkElement, ButtonProps>((props, ref) => {
  let { href = '#', ...rest } = props;
  if (typeof rest.children === 'string') {
    rest = { ...rest, 'aria-label': rest.children };
  }
  const { isExternal, target } = useLinkType(href);
  let Component = BaseButton;

  if (isExternal) {
    Component = ExternalButton;
  }
  return <Component href={target} ref={ref} {...rest} />;
});
