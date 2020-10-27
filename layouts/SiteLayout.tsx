import dynamic from 'next/dynamic';
import { useBreakpointValue } from '@chakra-ui/core';
import { Banner, CallToAction, DControls, DHeader, Footer, MHeader } from 'site/components';
import { SyncedStyleProvider } from 'site/context';
import { useMobile } from 'site/hooks';
import { Wrapper, Root, Main } from './common';

import type { BoxProps, SiteLayoutProps } from './types';

const Stars = dynamic<BoxProps>(() => import('site/components').then(i => i.Stars));

export const SiteLayout = (props: SiteLayoutProps) => {
  const { children, footerGroups, actions } = props;
  const isMobile = useMobile();
  const bp = useBreakpointValue({ base: 'Base', md: 'Medium', lg: 'Large', xl: 'X-Large' });
  if (process.env.NODE_ENV === 'development' && typeof bp !== 'undefined') {
    console.log(
      `%cBreakpoint%c${bp}`,
      'background: pink; color: black; padding: 0.5rem; font-size: 0.75rem;',
      'background: black; color: pink; padding: 0.5rem; font-size: 0.75rem; font-weight: bold;',
    );
  }

  return (
    <Wrapper>
      <SyncedStyleProvider>
        {isMobile ? <MHeader /> : <DHeader />}
        <Main>
          <Root>{children}</Root>
        </Main>
        <CallToAction actions={actions} />
        <Footer groups={footerGroups} />
        {!isMobile && <DControls />}
      </SyncedStyleProvider>
      <Stars />
      <Banner />
    </Wrapper>
  );
};
